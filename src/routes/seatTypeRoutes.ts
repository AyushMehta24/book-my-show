import express from "express";
import { createSeatType, updateSeatType } from "../controllers/seatTypeController";
import { createSeatTypeValidate, updateSeatTypeValidate } from "../middlewares/saetTypeValidator";
const seatType = express();


// user.get("/getuser", getAllUser);
seatType.post("/create",createSeatTypeValidate,createSeatType);
seatType.put("/update/:id",updateSeatTypeValidate, updateSeatType);
// seatType.delete("/delete/:id", deleteseatType);

export default seatType