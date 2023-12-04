const cadastroDespesa = async () => {
    try {
        const despesas = {
            descricao : document.getElementById('input_descricao').value,           
            valor_total : parseInt(document.getElementById('input_valor').value),
            prazo : parseInt(document.getElementById('input_prazo').value)
        }
        if (despesas.descricao == '') {
          throw new Error("Descrição da Despesa deve ser preenchida")
      } else if (despesas.valor_total) {
          throw new Error("Valor da despesa deve ser maior que 0,1")
      }else if (despesas.prazo == '') {
        throw new Error("Preencha uma data de vencimento")
    } 


        selecionarTodosCheckboxes();
        redirecionarConcluir();
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
function selecionarTodosCheckboxes() {
  var checkboxes = document.querySelectorAll('[type="checkbox"]');
  checkboxes.forEach(function (checkbox) {
    checkbox.checked = true;
  });
}

window.onload = function () {
  document.getElementById("input_descricao").focus();
};
function cancelar(){
  location.href='despesas_gerais.html'
}
function redirecionarInicio(event) {
  event.preventDefault();
  window.location.replace("principal_adm.html");
}

function redirecionarDespesa(event) {
  event.preventDefault();
  window.location.replace("despesas_gerais.html");
}