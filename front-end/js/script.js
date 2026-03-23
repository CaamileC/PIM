document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const senha = document.getElementById("senha").value;

  if (!nome || !senha) {
    alert("Preencha nome e senha");
    return;
  }

  fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ nome, senha })
  })
    .then(res => res.json())
    .then(data => {
    if (data.success) {
      localStorage.setItem(
        "usuarioLogado",
        JSON.stringify(data.usuario)
      );
      window.location.href = "dashboard.html";
    } else {
      alert("Usuário ou senha incorretos");
    }
  })
    .catch(() => {
      alert("Erro ao conectar com o servidor");
    });
});