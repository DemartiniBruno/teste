const get_subgrupo = async () => {
    try {

        const dados_grupo = await fetch('http://127.0.0.1:3000/grupos/1/subgrupos/', {
            headers: {
                // "Content-Type": "application/json",
                "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7ImlkIjoxLCJub21lIjoiYnJ1bm8iLCJlbWFpbCI6ImJydW5vQHRlc3RlLmNvbSIsInNlbmhhIjoiJDJiJDEwJGV6a1Q3TjZDUG9JL3RTdC4zQ3NLSS4xdGhPZ1dYNVJweldEUjBSRXFjbjFvWUdRTlBIWHBDIiwiY3JlYXRlZEF0IjoiMjAyMy0wOS0yNVQxODo0NDowMC44MDJaIiwidXBkYXRlZEF0IjoiMjAyMy0wOS0yNVQxODo0NDowMC44ODZaIiwiZGVsZXRlZEF0IjpudWxsfSwiaWF0IjoxNjk1NzI4MzA5fQ.S-5N1B5eOGdchcki10DdmJGLYwvAMK0ILzhKeMHz9C0"
            }

        })
            .then(async function (dados) {

                return dados.json()
            })
            .then(async function (dados_convertidos) {
                return dados_convertidos[0].subgrupos
            })

        dados_grupo.forEach(element => {
            const bloco = document.createElement("div")
            bloco.setAttribute("class", "bloco_apartamento")
            const apartamento = document.createElement("h2")
            // apartamento.setAttribute("value", element.nome)
            apartamento.innerText = element.nome
            const descricao = document.createElement("p")
            descricao.innerText = element.descricao

            const btn_abrir = document.createElement("input")
            btn_abrir.setAttribute("type", "button")
            btn_abrir.setAttribute("class", "btn_abrir")
            btn_abrir.value = "abrir"
            btn_abrir.disabled = true

            if (element.er_usuario_do_subgrupos != 0) {
                btn_abrir.disabled = false
            }

            bloco.appendChild(apartamento)
            bloco.appendChild(descricao)
            bloco.appendChild(btn_abrir)

            document.getElementById("apartamentos").appendChild(bloco)

        });

        dados_grupo.forEach(element => {
            element.er_usuario_do_subgrupos.forEach(element => {
                if (element.permissao_adm == true) {
                    const btn = document.querySelectorAll(".btn_abrir")
                    btn.forEach(element=>{
                        element.disabled=false
                    })
                }

            })
        });

    } catch (error) {
        alert(error.message)
    }
}