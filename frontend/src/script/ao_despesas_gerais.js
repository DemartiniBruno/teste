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
        
        if(subgrupo.permissao_adm){
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

            // AGORA COM O GRUPO FAZER O FECTH PARA CONSULTAR AS DESPESAS DO GRUPO

        } else {

            // SEGUNDO IF

        }
        
    } else {

        // PRIMEIRO IF

    }
}