const logar = async () => {
    const dados = {
        email: document.getElementById("email").value,
        senha: document.getElementById("senha").value
    }

    try {
        if (dados.email == '') {
            throw new Error("Email deve ser preenchido")
        } else if (dados.senha == '') {
            throw new Error("Senha deve ser preenchida")
        } else {
            const status = await fetch('http://127.0.0.1:3000/login', {
                method: "POST",
                body: JSON.stringify(dados),
                headers: {
                    "Content-Type": "application/json",
                }

            })
                .then(async function (dados) {

                    return dados.json()
                })
                .then(async function (dados_convertidos) {
                    return dados_convertidos
                })

            if (status.status === 200) {
                window.localStorage.setItem('token', status.token)

                const relacao = await fetch('http://127.0.0.1:3000/relacao', {
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": localStorage.token
                    }
                })
                    .then(async function (dados) {

                        return dados.json()
                    })
                    .then(async function (dados_convertidos) {

                        return dados_convertidos
                    })

                if (relacao) {
                    if (relacao.permissao_adm) {
                        location.href = './src/pages/principal_adm.html'
                    } else {
                        location.href = './src/pages/subgrupo.html'
                    }
                } else {
                    location.href = './src/pages/selecao.html'

                }
            } else {
                throw new Error(status.mensagem)
            }
        }

    } catch (error) {
        alert(error.message)
    }
}
