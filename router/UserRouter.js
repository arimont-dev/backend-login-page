import express from "express"

// controller
import ctl from "../controllers/UserController.js"

// middleware de autenticação
import AuthMiddleware from "../middlewares/AuthMiddleware.js"

const router = express.Router()

// lista todos os usuários
router.get("/read", ctl.read)
// cria um usuários
router.post("/create", ctl.create)

export default router
