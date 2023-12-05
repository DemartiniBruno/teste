const get_despesasApartamento = async () => {

    try {
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

            var subgrupo

            if (relacao.permissao_adm) {

                console.log(localStorage.grupo_id)
                subgrupo = await fetch(`http://127.0.0.1:3000/grupos/subgrupo/${localStorage.grupo_id}`, {
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
                           
            } else {
                subgrupo = await fetch(`http://127.0.0.1:3000/grupos/subgrupo/${relacao.subgrupo_id}`, {
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
            }




            console.log(subgrupo)

            // RENDERIZAR O SUBGRUPO AQUI
            // const titulo_subgrupo = document.createElement("h1")
            // titulo_subgrupo.innerText = subgrupo.nome

            const descricao_subgrupo = document.createElement("p")
            descricao_subgrupo.innerText = subgrupo.descricao

            const codigo_acesso = document.createElement("p")
            codigo_acesso.innerText = subgrupo.codigo_acesso

            const despesas_container = document.createElement("div")
            despesas_container.setAttribute("id", "despesas_container")

            // document.getElementById("titulo_subgrupo").appendChild(titulo_subgrupo)
            document.getElementById("titulo_subgrupo").innerText = `${subgrupo.nome} - ${subgrupo.descricao}`
            // document.getElementById("subgrupo").appendChild(descricao_subgrupo)
            // document.getElementById("subgrupo").appendChild(codigo_acesso)

            const despesas = await fetch(`http://127.0.0.1:3000/despesas/${subgrupo.id}`, {
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

            // despesas.forEach(element => {
            //     // RENDERIZAÇÃO DA DESPESA]
            //     console.log(element)
            //     const despesa = document.createElement("div")
            //     despesa.setAttribute("id", element.id)

            //     const titulo_despesa = document.createElement("p")
            //     titulo_despesa.innerText = element.descricao

            //     const numero_de_parcelas = document.createElement("p")
            //     numero_de_parcelas.innerText = element.descricao

            //     const valor_total = document.createElement("p")
            //     valor_total.innerText = element.valor_total

            //     const data_vencimento = document.createElement("p")
            //     data_vencimento.innerText = element.data_vencimento

            //     despesa.appendChild(titulo_despesa)
            //     despesa.appendChild(numero_de_parcelas)
            //     despesa.appendChild(valor_total)
            //     despesa.appendChild(data_vencimento)

            //     despesas_container.appendChild(despesa)

            // });

            // document.getElementById("subgrupo").appendChild(despesas_container)

        } else {




            location.href = './selecao.html'





        }
    } catch (error) {

        alert(error.message)

    }


}