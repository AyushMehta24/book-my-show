import express from "express";
import user from "./usersRoutes";
import theater from "./theaterRoutes";
import screen from "./screenRoutes";
const router = express();

router.use("/user", user);
router.use("/theater", theater);
router.use("/screen", screen);
    
export default router