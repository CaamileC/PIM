const express = require("express");
const router = express.Router();
const db = require("../db");
const clientesController = require("../controllers/clientesController");

/* ===============================
   CADASTRO DE CLIENTE (JÁ EXISTENTE)
   =============================== */
router.post("/", (req, res) => {
  const { nome, cpf, email, telefone, modelo_carro, placa_carro } = req.body;

  const sql = `
    INSERT INTO clientes 
    (nome, cpf, email, telefone, modelo_carro, placa_carro)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [nome, cpf, email, telefone, modelo_carro, placa_carro],
    (err) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.json({ message: "Cliente cadastrado com sucesso!" });
    }
  );
});

/* ===============================
   CONSULTA / BUSCA / EDIÇÃO
   =============================== */
router.get("/", clientesController.listarClientes);
router.get("/buscar", clientesController.buscarClientes);
router.put("/:id", clientesController.editarCliente);

module.exports = router;
