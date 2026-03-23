const express = require('express');
const router = express.Router();
const db = require('../db');

// 🔐 LOGIN PELO NOME
router.post('/login', (req, res) => {
  const { nome, senha } = req.body;

  console.log('📩 Recebido:', nome, senha);

  const sql = `
    SELECT id, nome, tipo
    FROM usuarios
    WHERE nome = ? AND senha = ? AND ativo = true
  `;

  db.query(sql, [nome, senha], (err, result) => {
    if (err) {
      console.error('❌ Erro SQL:', err);
      return res.status(500).json({ success: false });
    }

    console.log('📦 Resultado:', result);

    if (result.length > 0) {
      res.json({ success: true, usuario: result[0] });
    } else {
      res.json({ success: false });
    }
  });
});

// 📋 LISTAR USUÁRIOS
router.get('/usuarios', (req, res) => {
  db.query(
    'SELECT id, nome, tipo FROM usuarios',
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
});

// ➕ CRIAR USUÁRIO
router.post('/usuarios', (req, res) => {
  const { nome, senha, tipo } = req.body;

  db.query(
    'INSERT INTO usuarios (nome, senha, tipo) VALUES (?, ?, ?)',
    [nome, senha, tipo],
    err => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Usuário criado!' });
    }
  );
});

// 🗑️ DELETAR USUÁRIO
router.delete('/usuarios/:id', (req, res) => {
  const { id } = req.params;

  db.query(
    'DELETE FROM usuarios WHERE id = ?',
    [id],
    err => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Usuário removido!' });
    }
  );
});

module.exports = router;