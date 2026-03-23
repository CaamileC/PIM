document.getElementById("formCliente").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const data = {
    nome: form.nome.value,
    cpf: form.cpf.value,
    email: form.email.value,
    telefone: form.telefone.value,
    modelo_carro: form.modelo_carro.value,
    placa_carro: form.placa_carro.value
  };

  const res = await fetch("http://localhost:3000/clientes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (res.ok) {
    alert("Cliente cadastrado com sucesso!");
    form.reset();
  } else {
    alert("Erro ao cadastrar cliente");
  }
});

const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');

menuToggle.addEventListener('click', () => {
  sidebar.classList.toggle('closed');
});

const themeToggle = document.getElementById('themeToggle');

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeToggle.textContent =
    document.body.classList.contains('dark') ? '☀️' : '🌙';
});

const cadastroToggle = document.getElementById("cadastroToggle");

cadastroToggle.addEventListener("click", () => {
  cadastroToggle.parentElement.classList.toggle("open");
});