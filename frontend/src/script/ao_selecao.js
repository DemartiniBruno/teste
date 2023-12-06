const validar_relacao = async () => {
  const relacao = await fetch(`http://127.0.0.1:3000/relacao`, {
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
                
              location.href = './principal_adm.html'

            } else {
                // REDIRECIONAR PARA TELA DE SELEÇÃO
                location.href = './subgrupo.html'
            }
        }
}

const acessar_subgrupo = async () => {
    const codigo_subgrupo = {
        codigo_acesso: document.getElementById('input_entrar').value
    }

    try {

        const status = await fetch('http://127.0.0.1:3000/grupos/acessar/', {
            method: "POST",
            body: JSON.stringify(codigo_subgrupo),
            headers: {
              "Content-Type": "application/json",
              "Authorization": localStorage.token
            }
    
          })
            .then(async function (dados) {
              return dados.json()
            })
            .then(async function (dados_convertidos) {
              return dados_convertidos
            })

        if(status.status==200){
            alert(status.mensagem)
            location.href = './subgrupo.html'

        } else {
            throw new Error(status.mensagem)
        }
    } catch (error) {
        alert(error.message)
    }

}