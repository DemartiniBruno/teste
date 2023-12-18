async function processarFormulario(event) {
    event.preventDefault();

    const grupo = {
        nome: document.getElementById("nome").value,
        descricao: document.getElementById("descricao").value,
    }

    if (grupo.nome && grupo.descricao) {

        const status = await fetch('http://127.0.0.1:3000/grupos', {
            method: "POST",
            body: JSON.stringify(grupo),
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
        localStorage.setItem('grupo_id', status.grupo_id)

        if (status.status == 200) {
            alert(status.mensagem)
            redirecionar()
        }
    }

}

function gerarApartamento() {
    // Lógica para gerar um apartamento
    alert("Apartamento gerado com sucesso!");
    redirecionar(); // Chama a função de redirecionamento após gerar o apartamento
}

function redirecionar() {
    window.location.replace("cadastro_subgrupo.html");
}