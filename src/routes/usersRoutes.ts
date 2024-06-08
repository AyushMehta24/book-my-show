import express from "express";
import { createUser, deleteUser, getAllUser, updateUser } from "../controllers/usersController";
const user = express();


user.get("/getuser", getAllUser);
user.post("/create", createUser);
user.put("/update/:id", updateUser);
user.delete("/delete/:id", deleteUser);

export default user