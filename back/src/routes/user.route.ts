import { Router } from "express";
import { CreateUser } from "../controllers/user";
import { GetUserById } from "../controllers/user/get-user";
import { GetUsers } from "../controllers/user/get-users";

const userRouter = Router();

userRouter.post("/", CreateUser).get("/:id", GetUserById).get("/", GetUsers);

export default userRouter;
