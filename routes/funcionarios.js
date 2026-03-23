const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", (req, res) => {
  const { nome, email, telefone, cpf, funcao } = req.body;

  const sql = `
    INSERT INTO funcionarios (nome, email, telefone, cpf, funcao)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [nome, email, telefone, cpf, funcao], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Funcionário cadastrado!" });
  });
});

module.exports = router;