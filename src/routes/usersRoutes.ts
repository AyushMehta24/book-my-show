import express from "express";
import { createUser, deleteUser, getAllUser, updateUser } from "../controllers/usersController";
import { createUserValidate, updateUserValidate } from "../middlewares/userValidator";
const user = express();


user.get("/getuser", getAllUser);
user.post("/create" ,createUserValidate, createUser);
user.put("/update/:id",updateUserValidate, updateUser);
user.delete("/delete/:id", deleteUser);

export default user