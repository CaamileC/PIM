document.getElementById("loginRestrito").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = e.target.nome.value;
  const senha = e.target.senha.value;

  const res = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, senha })
  });

  const data = await res.json();

  if (data.success && data.usuario.tipo === "admin") {
    localStorage.setItem("usuario", JSON.stringify(data.usuario));
    window.location.href = "cadastro-funcionario.html";
  } else {
    alert("Acesso negado. Apenas administradores.");
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
