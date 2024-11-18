const { Jogo, Jogador } = require('../models/Jogo');

class JogoController {
    constructor() {
        this.jogoEmAndamento = null;
    }

    criarNovoJogo(nomesJogadores) {
        const jogadores = nomesJogadores.map(nome => new Jogador(nome));
        this.jogoEmAndamento = new Jogo(jogadores);
        this.jogoEmAndamento.iniciarJogo();
        return this.jogoEmAndamento;
    }

    executarTurno() {
        if (!this.jogoEmAndamento) {
            throw new Error('Nenhum jogo em andamento');
        }

        this.jogoEmAndamento.proximoTurno();
        
        const vencedor = this.jogoEmAndamento.verificarFimDeJogo();
        if (vencedor) {
            return {
                status: 'Jogo Finalizado',
                vencedor: vencedor.nome
            };
        }

        return {
            status: 'Turno Executado',
            jogadorAtual: this.jogoEmAndamento.jogadores[this.jogoEmAndamento.jogadorAtual],
            rodada: this.jogoEmAndamento.rodada
        };
    }
}

module.exports = JogoController;