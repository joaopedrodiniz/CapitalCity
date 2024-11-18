const express = require('express');
const jogoRoutes = require('./routes/JogoRoutes.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/jogo', jogoRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});