const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

if (!usuario) {
  window.location.href = "index.html";
}

document.getElementById("nomeUsuario").innerText = usuario.nome;

document.getElementById("logout").addEventListener("click", () => {
  localStorage.removeItem("usuarioLogado");
  window.location.href = "index.html";
});