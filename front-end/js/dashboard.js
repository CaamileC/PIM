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
