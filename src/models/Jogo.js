const Mapa = require('./Mapa');
const Jogador = require('./Jogador');
const Cidade = require('./Cidade')

class Jogo {
    constructor(jogadores) {
        this.id = Date.now() + Math.random();
        this.jogadores = jogadores;
        this.mapa = new Mapa();
        this.jogadorAtual = 0;
        this.rodada = 0;
    }

    iniciarJogo() {
        this.rodada = 1;
    }

    proximoTurno() {
        const jogadorAtual = this.jogadores[this.jogadorAtual];
        const valorDado = jogadorAtual.rolarDado();
        jogadorAtual.mover(valorDado);

        const casaAtual = this.mapa.obterCasa(jogadorAtual.posicaoAtual);
        if (casaAtual.tipo === 'Cidade' && casaAtual.cidade.proprietario === null) {
            jogadorAtual.comprarCidade(casaAtual.cidade);
        }

        this.jogadorAtual = (this.jogadorAtual + 1) % this.jogadores.length;

        if (this.jogadorAtual === 0) {
            this.rodada++;
        }
    }

    verificarFimDeJogo() {
        const jogadoresAtivos = this.jogadores.filter(j => !j.falido);
        return jogadoresAtivos.length === 1 ? jogadoresAtivos[0] : null;
    }
}

module.exports = { Jogador, Cidade, Mapa, Jogo };
