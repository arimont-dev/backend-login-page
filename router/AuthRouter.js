import express from "express"
const router = express.Router()

// controller
import ctl from "../controllers/AuthController.js"

router.post("/login", ctl.login)
router.post("/register", ctl.login)

export default router