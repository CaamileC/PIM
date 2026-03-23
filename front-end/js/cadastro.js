const lista = document.getElementById("listaUsuarios");
const form = document.getElementById("formUsuario");

function carregarUsuarios() {
  fetch("http://localhost:3000/usuarios")
    .then(res => res.json())
    .then(usuarios => {
      lista.innerHTML = "";
      usuarios.forEach(u => {
        lista.innerHTML += `
          <li>
            ${u.nome} (${u.tipo})
            <button onclick="excluir(${u.id})">Excluir</button>
          </li>
        `;
      });
    });
}

form.addEventListener("submit", e => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const senha = document.getElementById("senha").value;
  const tipo = document.getElementById("tipo").value;

  fetch("http://localhost:3000/usuarios", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, senha, tipo })
  }).then(() => {
    form.reset();
    carregarUsuarios();
  });
});

function excluir(id) {
  fetch(`http://localhost:3000/usuarios/${id}`, {
    method: "DELETE"
  }).then(carregarUsuarios);
}

carregarUsuarios();