const cadastrar = async () => {
     const dados = {
        nome: document.getElementById("usuario").value,
        email: document.getElementById("email").value,
        senha: document.getElementById("senha").value
    }

    console.log(dados)
    try {
        if (dados.nome == '') {
            throw new Error("Nome deve ser preenchido")
        } else if (dados.nome.length < 2) {
            throw new Error("Nome deve conter pelo menos 3 caracteres")
        } else if (dados.email == '') {
            throw new Error("Email deve ser preenchido")
        } else if (dados.senha == '') {
            throw new Error("Senha deve ser preenchida")
        }
        else {
            const status = await fetch('http://127.0.0.1:3000/usuarios', {
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
                alert(`[${status.status}] ${status.mensagem}`)
                location.href = '../../index.html'
            } else {
                // alert(`[${status.status}] ${status.mensagem}`)
                throw new Error(status.mensagem)
            }
        }
            
    } catch (error) {
        alert(error.message)
    }
}
