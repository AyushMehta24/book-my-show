import express from "express";
import { createSeatType, updateSeatType } from "../controllers/seatTypeController";
const seatType = express();


// user.get("/getuser", getAllUser);
seatType.post("/create", createSeatType);
seatType.put("/update/:id", updateSeatType);
// seatType.delete("/delete/:id", deleteseatType);

export default seatType