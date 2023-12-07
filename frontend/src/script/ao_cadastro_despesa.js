const cadastroDespesa = async () => {
  try {
    var teste2 = []
    const teste = document.querySelectorAll(".inp")
    teste.forEach((element) => {
      teste2.push({
        subgrupo_id: element.value,
        pagante: element.value
      })
    })
    console.log(teste2)
    const despesas = {
      descricao: document.getElementById('input_descricao').value,
      valor_total: parseFloat(document.getElementById('input_valor').value),
      // valor_total: document.getElementById('input_valor').value,
      prazo: document.getElementById('input_prazo').value,
      subgrupos_pagantes: teste2
    }


    // console.log(despesas.subgrupos_pagantes)
    // despesas.subgrupos_pagantes.forEach((element)=>{
    //   console.log(element.value)
    //   console.log(element.checked)
    // })

    // console.log(despesas.valor_total)
    // console.log(Date(despesas.prazo
    // var nova_data = new Date(despesas.prazo)
    // console.log(nova_data)
    // console.log(despesas.prazo)
    if (despesas.descricao == '') {
      throw new Error("Descrição da Despesa deve ser preenchida")
    } else if (isNaN(despesas.valor_total)) {
      throw new Error("Valor da despesa deve ser maior que 0,1")
    } else if (despesas.prazo == '') {
      throw new Error("Preencha uma data de vencimento")
    } else {
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

      if (despesa.status == 200) {
        alert(despesa.mensagem)
        location.href = 'despesas_gerais.html'

      }
    }
    if (cadastroDespesa) {
      //caso deu certo o cadastro ele redireciona para a tela de listagem de despesas
    }

    // selecionarTodosCheckboxes();
    // redirecionarConcluir();



  } catch (error) {
    alert(error.message)
  }
}

const carrega_subgrupos = async () => {
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

      grupo[0].subgrupos.forEach(element => {

        // RENDERIZAR OS APARTAMENTOS AQUI
        console.log(element.nome)
        const new_input = document.createElement("div")
        new_input.setAttribute("class", "checkboxItem")

        const inp = document.createElement("input")
        inp.setAttribute("class", "inp")
        inp.setAttribute("type", "checkbox")
        inp.setAttribute("value", element.id)
        // inp.setAttribute("value", "teste")
        const label = document.createElement("label")
        label.innerText = element.nome

        new_input.appendChild(inp)
        new_input.appendChild(label)

        document.getElementById("checkbox_container").appendChild(new_input)
      });

    } else {
      // REDIRECIONAR PARA TELA DE SELEÇÃO
      location.href = './subgrupo.html'
    }
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
function cancelar() {
  location.href = 'despesas_gerais.html'
}
function redirecionarInicio(event) {
  event.preventDefault();
  window.location.replace("principal_adm.html");
}

function redirecionarDespesa(event) {
  event.preventDefault();
  window.location.replace("despesas_gerais.html");
}