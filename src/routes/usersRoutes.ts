import express from "express";
import { createUser, getAllUser, updateUser } from "../controllers/usersController";
const user = express();


user.get("/getuser", getAllUser);
user.post("/create", createUser);
user.put("/update/:id", updateUser);

export default user