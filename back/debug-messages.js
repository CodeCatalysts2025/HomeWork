const mongoose = require('mongoose');
const { Types } = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://codecatalysts2025_db_user:CodeC%40t%40lysts2025@cluster0.zqrxblc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
  content: { type: String, required: true, trim: true },
  isGeneralChat: { type: Boolean, default: false },
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);

async function debugMessages() {
  try {
    console.log('=== DEBUGGING MESSAGES ===');
    
    // Get all messages
    const allMessages = await Message.find().exec();
    console.log(`Total messages in DB: ${allMessages.length}`);
    
    if (allMessages.length > 0) {
      console.log('\n=== ALL MESSAGES ===');
      allMessages.forEach((msg, index) => {
        console.log(`Message ${index + 1}:`);
        console.log(`  ID: ${msg._id}`);
        console.log(`  Sender: ${msg.sender}`);
        console.log(`  Receiver: ${msg.receiver}`);
        console.log(`  Content: ${msg.content}`);
        console.log(`  Created: ${msg.createdAt}`);
        console.log('');
      });
      
      // Test the specific query
      const userId1 = allMessages[0].sender.toString();
      const userId2 = allMessages[0].receiver.toString();
      
      console.log(`=== TESTING QUERY FOR ${userId1} and ${userId2} ===`);
      
      const filter = {
        $or: [
          { sender: new Types.ObjectId(userId1), receiver: new Types.ObjectId(userId2) },
          { sender: new Types.ObjectId(userId2), receiver: new Types.ObjectId(userId1) }
        ]
      };
      
      console.log('Filter:', JSON.stringify(filter, null, 2));
      
      const result = await Message.find(filter).exec();
      console.log(`Query result: ${result.length} messages`);
      
      if (result.length > 0) {
        console.log('Found messages:', result.map(msg => ({
          id: msg._id,
          sender: msg.sender,
          receiver: msg.receiver,
          content: msg.content
        })));
      }
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    mongoose.connection.close();
  }
}

debugMessages();