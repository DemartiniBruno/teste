const carregar_desesas_grupo = async () => {
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

    console.log(relacao)

    if (relacao) {
        const subgrupo = await fetch(`http://127.0.0.1:3000/grupos/subgrupo/${relacao.subgrupo_id}`, {
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

        console.log(subgrupo)

        if (relacao.permissao_adm) {
            const despesas = await fetch(`http://127.0.0.1:3000/despesas/grupo/${subgrupo.grupo_id}/`, {
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

            console.log(despesas)
            despesas.forEach(element => {
                console.log(element)
                const titulo_descricao = document.createElement("tr")
                titulo_descricao.innerText = element.descricao
                titulo_descricao.setAttribute("class", "descricao_despesa")

                const valor_total = document.createElement("p")
                valor_total.innerText = `R$${element.valor_total}`
                valor_total.setAttribute("class", "valor_despesa")
                // FORMATAR O VALOR TOTAL PARA FICAR COMO R$

                const descricao_despesa = document.createElement("tr")
                descricao_despesa.appendChild(titulo_descricao)
                const valor_despesa = document.createElement("tr")
                valor_despesa.appendChild(valor_total)


                document.querySelector(".descricao").appendChild(descricao_despesa)
                document.querySelector(".valor").appendChild(valor_despesa)
            });

        } else {

            // SEGUNDO IF

        }

    } else {

        // PRIMEIRO IF

    }
}
function redirecionarInicio(event) {
    event.preventDefault();
    window.location.replace("principal_adm.html");
  }

  function redirecionarDespesa(event) {
    event.preventDefault();
    window.location.replace("cadastro_despesas.html");
  }