const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");

menuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("closed");
});

const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent =
    document.body.classList.contains("dark") ? "☀️" : "🌙";
});

const cadastroToggle = document.getElementById("cadastroToggle");

cadastroToggle.addEventListener("click", () => {
  cadastroToggle.parentElement.classList.toggle("open");
});

const inputBusca = document.getElementById("busca");
const filtro = document.getElementById("filtro");
const lista = document.getElementById("listaClientes");

/* ===== BUSCAR CLIENTES ===== */
async function buscarClientes() {
  const termo = inputBusca.value.trim();
  const tipo = filtro.value;

  let url = "http://localhost:3000/clientes";
  if (termo) {
    url = `http://localhost:3000/clientes/buscar?${tipo}=${encodeURIComponent(termo)}`;
  }

  const response = await fetch(url);
  const clientes = await response.json();

  lista.innerHTML = "";

  clientes.forEach(cliente => {
    lista.innerHTML += `
      <div class="card-cliente">
        <div class="info">
          <strong>${cliente.nome}</strong>
          <span>CPF: ${cliente.cpf}</span>
          <span>Tel: ${cliente.telefone}</span>
        </div>
        <button onclick='abrirModal(${JSON.stringify(cliente)})'>✏️</button>
      </div>
    `;
  });
}

inputBusca.addEventListener("input", buscarClientes);
filtro.addEventListener("change", buscarClientes);

/* ===== MODAL ===== */
const modal = document.getElementById("modalEditar");

function abrirModal(cliente) {
  modal.style.display = "flex";

  document.getElementById("editId").value = cliente.id;
  document.getElementById("editNome").value = cliente.nome;
  document.getElementById("editCpf").value = cliente.cpf;
  document.getElementById("editEmail").value = cliente.email;
  document.getElementById("editTelefone").value = cliente.telefone;
  document.getElementById("editModelo").value = cliente.modelo_carro;
  document.getElementById("editPlaca").value = cliente.placa_carro;
}

function fecharModal() {
  modal.style.display = "none";
}

/* ===== SALVAR EDIÇÃO ===== */
async function salvarEdicao() {
  const id = document.getElementById("editId").value;

  const data = {
    nome: document.getElementById("editNome").value,
    cpf: document.getElementById("editCpf").value,
    email: document.getElementById("editEmail").value,
    telefone: document.getElementById("editTelefone").value,
    modelo_carro: document.getElementById("editModelo").value,
    placa_carro: document.getElementById("editPlaca").value
  };

  await fetch(`http://localhost:3000/clientes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  fecharModal();
  buscarClientes();
}

buscarClientes();