const cadastrar = async ()  => {
    const dados = {
        nome: document.getElementById("usuario").value, 
        email:document.getElementById("email").value, 
        senha:document.getElementById("senha").value
    }

    await fetch('http://127.0.0.1:3000/usuarios', {
        method: "POST",
        body: JSON.stringify(dados),
        headers:{
            "Content-Type": "application/json",
        }
        
    })
        .then(async function (dados) {
            return dados.json()
        })
        .then(function (dados_teste) {
            console.log(dados_teste)
        })

}
