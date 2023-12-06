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

            // RENDERIZANDO SUBGRUPO
            const descricao_subgrupo = document.createElement("p")
            descricao_subgrupo.innerText = subgrupo.descricao

            const codigo_acesso = document.createElement("p")
            codigo_acesso.innerText = subgrupo.codigo_acesso

            const despesas_container = document.createElement("div")
            despesas_container.setAttribute("id", "despesas_container")

            document.getElementById("titulo_subgrupo").innerText = `${subgrupo.nome} - ${subgrupo.descricao}`

            // CONSULTANDO DESPESAS
            var despesas
            if (relacao.permissao_adm) {

                // VERIFICAR SE O .grupo_id ESTA CORRETO (DEVERIA SER SUBGRUPO)
                despesas = await fetch(`http://127.0.0.1:3000/despesas/${localStorage.grupo_id}`, {
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
                
                //FAZER UM FETCH PARA PEGAR O VALOR DAS DESPESAS

                //FAZER UM FETCH PARA PEGAR O VALOR_RATEADO PELO localStorage.grupo_id
                

            } else {
                console.log('entrei no else')
                despesas = await fetch(`http://127.0.0.1:3000/despesas/${subgrupo.id}`, {
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

                
                //FAZER UM FETCH PARA PEGAR O VALOR DAS DESPESAS

                //FAZER UM FETCH PARA PEGAR O VALOR_RATEADO PELO subgrupo.id
            }

            console.log(despesas)
            // RENDERIZAÇÃO DA DESPESA

            var valor_total_geral = 0

            despesas.forEach(element => {

                console.log(element)
                valor_total_geral = parseFloat(valor_total_geral)+parseFloat(element.valor_total)

                const despesa = document.createElement("tr")
                despesa.setAttribute("class", "row_informacoes")

                const titulo_despesa = document.createElement("td")
                titulo_despesa.innerText = element.descricao
                titulo_despesa.setAttribute("style", "width: 50%")

                const valor_total = document.createElement("td")
                valor_total.innerText = element.valor_total
                valor_total.setAttribute("style", "width: 25%")
                
                const valor_rateado = document.createElement("td")
                valor_rateado.innerText = element.er_subgrupos_pagantes[0].valor_rateado
                valor_rateado.setAttribute("style", "width: 25%")

                despesa.appendChild(titulo_despesa)
                despesa.appendChild(valor_total)
                despesa.appendChild(valor_rateado)

                // document.getElementById("despesas_container").appendChild(despesa)
                document.querySelector(".table_visualizacao").appendChild(despesa)
                // console.log(document.querySelector(".table_visualizacao"))
            });

            // VALOR TOTAL GERAL
            console.log(valor_total_geral)
            const var_total_geral = document.createElement("p")
            var_total_geral.innerText = valor_total_geral
            document.querySelector(".table_visualizacao").appendChild(var_total_geral)
            

        } else {




            location.href = './selecao.html'





        }
    } catch (error) {

        alert(error.message)

    }


}