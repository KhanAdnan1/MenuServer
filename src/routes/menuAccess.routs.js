import  express from "express";
import { getMenu } from "../controllers/menuAccess.controller.js";


const router = express.Router();

router.get('/menu/:restaurantId', getMenu)

export default router;