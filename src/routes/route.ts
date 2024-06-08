import express from "express";
import user from "./usersRoutes";
import theater from "./theaterRoutes";
import screen from "./screenRoutes";
import seatType from "./seatTypeRoutes";
const router = express();

router.use("/user", user);
router.use("/theater", theater);
router.use("/screen", screen);
router.use("/seattype", seatType);
    
export default router