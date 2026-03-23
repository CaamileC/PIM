const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/users');
const clientesRoutes = require('./routes/clientes');
const funcionariosRoutes = require('./routes/funcionarios');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// rotas
app.use('/', userRoutes);
app.use('/clientes', clientesRoutes);
app.use('/funcionarios', funcionariosRoutes);

app.listen(port, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${port}`);
});
