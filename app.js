import express from "express"
import dotenv from "dotenv/config"
import cors from "cors"

// importando Rotas
import UserRouter from "./router/UserRouter.js"
import AuthRouter from "./router/AuthRouter.js"



// iniciando o express no "app"
const app = express()
app.use(express.json())
app.use(cors())


// url das APIS
app.use("/api/user", UserRouter)
app.use("/api/auth", AuthRouter)

app.get("/")

app.listen(process.env.PORT, () => {
    console.log(`servidor rodando http://localhost:${process.env.PORT}`)
})