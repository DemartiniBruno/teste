const cadastroDespesa = async () => {
    try {
        const despesas = {
            descricao : document.getElementById('descricao').value,           
            valor_total : parseInt(document.getElementById('valor_total').value),
            numero_de_parcelas : parseInt(document.getElementById('numero_de_parcelas').value)
        }
        console.log(despesas)
        const despesa = await fetch('http://127.0.0.1:3000/despesas', {
            method: "POST",
            body: JSON.stringify(despesas),
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

    } catch (error) {
        
    }
}