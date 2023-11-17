const logar = async () => {
    const dados = {
       email: document.getElementById("email").value,
       senha: document.getElementById("senha").value
   }

   console.log(dados)
   try {
       if (dados.email == '') {
           throw new Error("Email deve ser preenchido")
        } else if (dados.senha == '') {
            throw new Error("Senha deve ser preenchida")
        } else {
           const status = await fetch('http://127.0.0.1:3000/login', {
               method: "POST",
               body: JSON.stringify(dados),
               headers: {
                   "Content-Type": "application/json",
               }

           })
               .then(async function (dados) {

                   return dados.json()
               })
               .then(async function (dados_convertidos) {
                    console.log('entrou 2')
                   return dados_convertidos
               })
            
            console.log(status)
           if (status.status === 200) {
               location.href = './src/pages/tela_selecao.html'
           } else {
               // alert(`[${status.status}] ${status.mensagem}`)
               throw new Error(status.mensagem)
           }
       }
           
   } catch (error) {
       alert(error.message)
   }
}
