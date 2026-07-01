// importa as dependencias
import jwt from "jsonwebtoken"

// essa é a função de autenticação
export default function AuthMiddleware(req, res, next) {

    // recupera o token do cabeçalho authorization
    const authHeader = req.headers['authorization']

    // dividimos o formato da string "Bearer <TOKEN>"
    const token = authHeader && authHeader.split(' ')[1]

    // se não houver token, barra a entrada
    if (!token) {
        return res.status(401).json({
            sucesso: false,
            mensagem: "Acesso negado. Token não fornecido."
        })
    }

    try {

    // verifica e decodifica o token utilizando a chave secreta
    const verified = jwt.verify(token, process.env.JWT_SECRET)

    // injeta os dados do usuario dentro do objeto req
    // assim as proximas funções terá acesso a quem está logado
    req.user = verified

    // deixa a requisição prosseguir para a próxima rota
    next()

    } catch (e) {

        // caso o token for expirado ou inválido retorna aqui.
        return res.status(403).json({
            sucesso: false,
            mensagem: "Token inválido ou expirado."
        })

    }
}