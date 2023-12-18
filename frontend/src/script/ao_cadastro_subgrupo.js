function adicionarInput() {
    var container = document.getElementById("container");
    var grupos = document.querySelectorAll(".input-group");
    var ultimoGrupo = grupos[grupos.length - 1];

    var nome = ultimoGrupo.querySelector(".nome").value;
    var descricao = ultimoGrupo.querySelector(".descricao").value;

    if (nome && descricao) {
      var novoInputGroup = document.createElement("div");
      novoInputGroup.classList.add("input-group");
      // <button id="admin-button" onclick="setarComoAdmin(this)">🏡</button>
      novoInputGroup.innerHTML = `
      <input type="checkbox" class="admin-button">
      <input type="text" class="nome" placeholder="Nome do Apto.">
      <input type="text" class="descricao" placeholder="Descrição">
      <button class="add-btn" onclick="adicionarInput()">&#43;</button><br>
    `;
      container.appendChild(novoInputGroup);
      container.scrollTop = container.scrollHeight; // Scroll para a última adição
    } else {
      alert(
        "Por favor, preencha todos os campos antes de adicionar um novo apartamento."
      );
    }
  }

  async function concluir() {
    const grupo_json = []
    var grupos = document.querySelectorAll(".input-group");
    var todosPreenchidos = true;

    grupos.forEach(function (grupo) {
      var nome = grupo.querySelector(".nome").value;
      var descricao = grupo.querySelector(".descricao").value;
      var btn_admin = grupo.querySelector(".admin-button")

      if (!nome || !descricao) {
        todosPreenchidos = false;
      } else{
        if(btn_admin.checked==true){
          grupo_json.push({
            nome:nome,
            descricao:descricao,
            permissao_adm:true
          })
        } else{
          grupo_json.push({
            nome:nome,
            descricao:descricao,
          })
        }
      }
    });

    if (todosPreenchidos) {

      const status = await fetch(`http://127.0.0.1:3000/grupos/${localStorage.grupo_id}/subgrupos/`, {
            method: "POST",
            body: JSON.stringify(grupo_json),
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

      //CRIAR A VALIDAÇÃO DE SE OS GRUPOS FORAM CADASTRADOS OU DEU PROBLEMA 

      alert("Apartamentos adicionados com sucesso!");

      location.replace("principal_adm.html")
    } else {
      alert("Por favor, preencha todos os campos antes de confirmar.");
    }
  }
