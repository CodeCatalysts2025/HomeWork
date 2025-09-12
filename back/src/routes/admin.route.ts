import { Router } from "express";
import { CreateTeacher, getAllUsers } from "../controllers/admin";

const adminRouter = Router();

adminRouter.post("/create-teacher", CreateTeacher);
adminRouter.get("/get-all-users", getAllUsers);

export default adminRouter;
