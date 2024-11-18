const express = require('express');
const { 
    JogoController, 
    JogadorController, 
    MapaController 
} = require('../controllers');

const router = express.Router();
const jogoController = new JogoController();
const jogadorController = new JogadorController();

// Criar novo jogo
router.post('/novo', (req, res) => {
    try {
        const { jogadores } = req.body;
        const jogo = jogoController.criarNovoJogo(jogadores);
        res.status(201).json({
            mensagem: 'Jogo criado com sucesso',
            jogoId: jogo.id,
            jogadores: jogo.jogadores.map(j => ({
                nome: j.nome,
                dinheiro: j.dinheiro
            }))
        });
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
});

// Executar turno
router.post('/turno', (req, res) => {
    try {
        const resultado = jogoController.executarTurno();
        res.status(200).json(resultado);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

// Comprar cidade
router.post('/comprar-cidade', (req, res) => {
    try {
        const { jogadorId, cidadeId } = req.body;
        // Lógica de buscar jogador e cidade
        const resultado = jogadorController.comprarCidade(jogador, cidade);
        res.status(200).json({
            sucesso: resultado,
            mensagem: resultado 
                ? 'Cidade comprada com sucesso' 
                : 'Não foi possível comprar a cidade'
        });
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
});

// Informações da casa
router.get('/casa/:posicao', (req, res) => {
    try {
        const posicao = parseInt(req.params.posicao);
        const mapaController = new MapaController(jogoController.jogoEmAndamento.mapa);
        const informacoes = mapaController.obterInformacoesCasa(posicao);
        res.status(200).json(informacoes);
    } catch (error) {
        res.status(404).json({ erro: error.message });
    }
});

// Pagar aluguel
router.post('/pagar-aluguel', (req, res) => {
    try {
        const { jogadorId, valorAluguel, proprietarioId } = req.body;
        // Lógica de buscar jogadores
        const resultado = jogadorController.pagarAluguel(jogador, valorAluguel, proprietario);
        res.status(200).json({
            sucesso: resultado,
            mensagem: resultado 
                ? 'Aluguel pago com sucesso' 
                : 'Não foi possível pagar o aluguel'
        });
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
});

module.exports = router;