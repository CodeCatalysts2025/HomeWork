// generateTranslationsMultilang.js
import fs from "fs";
import path from "path";
import parser from "@babel/parser";
import traverse from "@babel/traverse";
import OpenAI from "openai";
import dotenv from "dotenv";
import cliProgress from "cli-progress";

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Таргет хэлнүүд
const targetLangs = ["mn", "ja"]; // "en" нэмэх шаардлагагүй, учир нь анхны text = en
const maxRetries = 3;

// Batch/Concurrency тохиргоо
const batchSize = 15;
const concurrency = 3;

// Скан хийх фолдерууд
const foldersToScan = [
  path.join(process.cwd(), "src/app"),
  path.join(process.cwd(), "src/components"),
];

const output = {};
let counter = 1;

// Фолдер рекурсивоор явах
function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith(".tsx") || fullPath.endsWith(".ts")) {
      extractText(fullPath);
    }
  }
}

// JSX/Text extract
function extractText(filePath) {
  const code = fs.readFileSync(filePath, "utf-8");
  let ast;
  try {
    ast = parser.parse(code, {
      sourceType: "module",
      plugins: ["typescript", "jsx"],
    });
  } catch (err) {
    console.error("Parse error in", filePath, err.message);
    return;
  }

  traverse.default(ast, {
    JSXText({ node }) {
      const text = node.value.trim();
      if (text && !Object.values(output).includes(text)) {
        const key = `text_${counter++}`;
        output[key] = text;
      }
    },
    JSXAttribute({ node }) {
      if (
        node.name &&
        ["placeholder", "alt", "title"].includes(node.name.name) &&
        node.value &&
        node.value.type === "StringLiteral"
      ) {
        const text = node.value.value.trim();
        if (text && !Object.values(output).includes(text)) {
          const key = `text_${counter++}`;
          output[key] = text;
        }
      }
    },
  });
}

// OpenAI руу batch хүсэлт илгээх
async function translateBatch(texts, lang, attempt = 1) {
  try {
    const prompt = `Translate the following text into ${lang}.
Always output the translation, even if the word looks common in English.
Do NOT keep the English word if ${lang} has an equivalent.
Keep numbers, symbols, slashes (/), %, +, !, and emojis unchanged.
Text: "${texts}"`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // хурдан, хямд
      messages: [{ role: "user", content: prompt }],
      temperature: 0,
    });

    return JSON.parse(completion.choices[0].message.content);
  } catch (err) {
    if (err.status === 429 && attempt <= maxRetries) {
      console.warn(`429 rate limit. Retrying ${attempt}/${maxRetries}...`);
      await new Promise((r) => setTimeout(r, 10000 * attempt));
      return translateBatch(texts, lang, attempt + 1);
    }
    throw err;
  }
}

// Multilang JSON үүсгэх
async function generateMultilang() {
  // Фолдеруудаас текст extract хийх
  foldersToScan.forEach((folder) => {
    if (fs.existsSync(folder)) walkDir(folder);
    else console.warn("Folder not found:", folder);
  });

  const keys = Object.keys(output);
  const result = {};
  const progressBar = new cliProgress.SingleBar(
    {},
    cliProgress.Presets.shades_classic
  );
  progressBar.start(keys.length * targetLangs.length, 0);

  // Batch-ээр орчуулах
  for (let i = 0; i < keys.length; i += batchSize) {
    const batchKeys = keys.slice(i, i + batchSize);
    const batchTexts = batchKeys.map((k) => output[k]);

    await Promise.all(
      targetLangs.map(async (lang) => {
        try {
          const translations = await translateBatch(batchTexts, lang);
          batchKeys.forEach((key, idx) => {
            if (!result[key]) result[key] = { en: output[key] };
            result[key][lang] = translations[idx] || output[key];
          });
        } catch (err) {
          console.error(`❌ Batch translation error in ${lang}:`, err.message);
          batchKeys.forEach((key) => {
            if (!result[key]) result[key] = { en: output[key] };
            result[key][lang] = output[key];
          });
        }
        progressBar.increment(batchKeys.length);
      })
    );
  }

  progressBar.stop();
  fs.writeFileSync(
    "translations_multilang.json",
    JSON.stringify(result, null, 2)
  );
  console.log("🎉 translations_multilang.json generated!");
}

generateMultilang();
