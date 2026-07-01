import UserModel from "../model/UserModel.js"
import jwt from "jsonwebtoken"
import env from "dotenv/config"

export default class AuthController {
    static async login(req, res) {

        try {

            const { email, senha } = req.body


            
            if (!email || email.trim() === '') { // remove os espaços e verifica se a caixa de email não está vazia
                return res.status(400).json({
                    sucesso: false,
                    tipo: "email",
                    mensagem: "O Email é Obrigatório",
                    erro: "Email Obrigatório"
                })
               
            }


            if (!senha || senha.trim() === '') { // remove os espaços e verifica se a caixa de senha não está vazia
                return res.status(400).json({
                    sucesso: false,
                    tipo: "senha",
                    mensagem: "A Senha é Obrigatório",
                    erro: "Senha Obrigatório"
                })
            }

            const verificaEmail = await UserModel.verificarEmail(email)

            if (verificaEmail.sucesso === false) {
                return res.status(400).json({
                    sucesso: false,
                    tipo: "email",
                    mensagem: verificaEmail.mensagem
                })
            }

            const verificaSenha = await UserModel.verificarSenha(verificaEmail.dados.id, senha)


            if(verificaSenha.sucesso === false){
                return res.status(400).json({
                    sucesso: false,
                    tipo: "senha",
                    mensagem: verificaSenha.mensagem
                })
            }

            const usuario = await UserModel.readById(verificaEmail.dados.id)


            const payload = {
                id: usuario.id,
                nome: usuario.nome,
                tipo: usuario.tipo
            }

            const token = jwt.sign(payload, process.env.CHAVE_SECRETA, {expiresIn: process.env.expiresIn })


            return res.status(200).json({
                sucesso: true,
                mensagem: `Logado com sucesso, Bem vindo de volta ${usuario.nome}`,
                token: token
            })

        } catch (e) {
            console.log(e.message)
            res.status(500).json({
                sucesso: false,
                mensagem: "erro interno do servidor.",
                erro: e.message
            })
        }

    }

    static async register() {

    }
}