import prisma from "../config/prisma.js"
import bcrypt from "bcrypt"


export default class UserModel {
    // lista os usuários do banco
    static async read() {

        const res = await prisma.usuarios.findMany({
            select: {
                id: true,
                nome: true
            }
        })

        return res

    }

    // lista os usuários do banco
    static async readById(id) {

        const res = await prisma.usuarios.findFirst({
            where: {
                id: id
            },
            select: {
                id: true,
                nome: true,
                tipo: true
            }
        })

        return res

    }

    static async verificarEmail(email) {
        try {

            const res = await prisma.usuarios.findFirst({
                where: {
                    email: email
                }, select: {
                    id: true
                }
            })

            if (!res) {
                return ({
                    sucesso: false,
                    mensagem: "email não encontrado",
                    erro: res
                })
            }

            return ({
                sucesso: true,
                mensagem: "email verificado com sucesso",
                dados: res
            })

        } catch (e) {
            return ({
                sucesso: false,
                mensagem: "erro interno do servidor.",
                erro: e.message
            })

        }
    }

    static async verificarSenha(id, senha) {
        try {



            const senhaOri = await prisma.usuarios.findFirst({
                where: {
                    id: id
                }, select: {
                    senha: true
                }
            })



            const comparacao = await bcrypt.compare(senha, senhaOri.senha)

            if (comparacao === false)
                return ({
                    sucesso: false,
                    mensagem: "senha incorreta"
                })

            return ({
                sucesso: true,
                mensagem: "senha verificada com sucesso"
            })

        }

        catch (e) {
            return ({
                sucesso: false,
                mensagem: "erro interno do servidor.",
                erro: e.message
            })
        }

    }

}