import express from "express";
import user from "./usersRoutes";
const router = express();

router.use("/user", user);
    
export default router