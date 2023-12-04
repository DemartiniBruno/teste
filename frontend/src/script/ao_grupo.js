const get_subgrupo = async () => {
    try {
        const teste = () => {
            console.log('teste')
        }

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
            if (relacao.permissao_adm) {
                const grupo = await fetch(`http://127.0.0.1:3000/grupos/${subgrupo.grupo_id}/`, {
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

                console.log(grupo)
                
                const titulo_grupo = document.createElement("h1")
                titulo_grupo.innerText = grupo[0].nome
                document.querySelector(".nome_grupo").appendChild(titulo_grupo)


                grupo[0].subgrupos.forEach(element => {

                    // RENDERIZAR OS APARTAMENTOS AQUI
                    const bloco = document.createElement("div")
                    bloco.setAttribute("class", "bloco_apartamento")
                    const apartamento = document.createElement("h2")
                    apartamento.innerText = element.nome
                    const descricao = document.createElement("p")
                    descricao.innerText = element.descricao

                    const btn_abrir = document.createElement("button")
                    btn_abrir.setAttribute("class", "btn_abrir")
                    btn_abrir.setAttribute("id", element.id)
                    btn_abrir.addEventListener("click",function(){
                        // REDIRECIONAR PARA O SUBGRUPO DE ACORDO COM O ID DO BOTÃO+
                    })
                    btn_abrir.innerText = "abrir"

                    bloco.appendChild(apartamento)
                    bloco.appendChild(descricao)
                    bloco.appendChild(btn_abrir)

                    document.getElementById("apartamentos").appendChild(bloco)
                });

            } else {
                // REDIRECIONAR PARA TELA DE SELEÇÃO
                location.href = './subgrupo.html'
            }
        } else {
            // REDIRECIONAR PARA TELA DE SELEÇÃO
            location.href = './selecao.html'
        }

    } catch (error) {
        alert(error.message)
    }
}