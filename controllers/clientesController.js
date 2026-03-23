const db = require("../db");

exports.listarClientes = (req, res) => {
  const sql = "SELECT * FROM clientes ORDER BY nome";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json(result);
  });
};


exports.buscarClientes = (req, res) => {
  const { nome, cpf, modelo_carro, placa_carro } = req.query;

  let sql = "SELECT * FROM clientes WHERE 1=1";
  const params = [];

  if (nome) {
    sql += " AND nome LIKE ?";
    params.push(`%${nome}%`);
  }

  if (cpf) {
    sql += " AND cpf LIKE ?";
    params.push(`%${cpf}%`);
  }

  if (modelo_carro) {
    sql += " AND modelo_carro LIKE ?";
    params.push(`%${modelo_carro}%`);
  }

  if (placa_carro) {
    sql += " AND placa_carro LIKE ?";
    params.push(`%${placa_carro}%`);
  }

  db.query(sql, params, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json(result);
  });
};

exports.editarCliente = (req, res) => {
  const { id } = req.params;
  const { nome, cpf, email, telefone, modelo_carro, placa_carro } = req.body;

  const sql = `
    UPDATE clientes SET
      nome = ?,
      cpf = ?,
      email = ?,
      telefone = ?,
      modelo_carro = ?,
      placa_carro = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [nome, cpf, email, telefone, modelo_carro, placa_carro, id],
    (err) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.json({ message: "Cliente atualizado com sucesso!" });
    }
  );
};
