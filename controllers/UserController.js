import UserModel from "../model/UserModel.js"


export default class UserController {
    static async read(req, res) {

        try {
            const user = await UserModel.read()
            console.log("usuarios lidos")


            if (user.length !== 0) {
                res.status(200).json({
                    sucesso: true,
                    mensagem: "Usuarios lidos com sucesso",
                    dados: user
                })
            }

            res.status(200).json({
                sucesso: false,
                mensagem: "Nenhum usuario encontrado!",
                dados: user
            })

        } catch (e) {
            res.status(500).json({
                sucesso: false,
                mensagem: "erro interno do servidor.",
                erro: e.message
            })
        }
    }

    static async create() {
        
    }
}