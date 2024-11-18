const readline = require('readline');
const { Jogo, Jogador } = require('../models/Jogo');
const { RegrasDaPartida } = require('../services/RegrasDaPartida');

class JogoCLI {
    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this.jogo = null;
        this.regrasDaPartida = new RegrasDaPartida();
    }

    iniciar() {
        this.rl.question('Quantos jogadores? ', (quantidade) => {
            this.criarJogadores(parseInt(quantidade));
        });
    }

    criarJogadores(quantidade) {
        const jogadores = [];
        
        const perguntarNome = (indice) => {
            if (indice < quantidade) {
                this.rl.question(`Nome do jogador ${indice + 1}: `, (nome) => {
                    jogadores.push(new Jogador(nome));
                    perguntarNome(indice + 1);
                });
            } else {
                this.jogo = new Jogo(jogadores);
                this.jogar();
            }
        };

        perguntarNome(0);
    }

    jogar() {
        const jogadorAtual = this.jogo.jogadores[this.jogo.jogadorAtual];
        
        console.log(`\n--- Turno de ${jogadorAtual.nome} ---`);
        console.log(`Dinheiro: R$ ${jogadorAtual.dinheiro}`);
        
        this.rl.question('Pressione ENTER para rolar o dado', () => {
            const valorDado = jogadorAtual.rolarDado();
            console.log(`Você tirou ${valorDado} no dado`);
            
            jogadorAtual.mover(valorDado);
            console.log(`Você está na casa ${jogadorAtual.posicaoAtual}`);
            
            const casa = this.jogo.mapa.obterCasa(jogadorAtual.posicaoAtual);
            const acaoCasa = this.regrasDaPartida.verificarAcaoCasa(this.jogo, jogadorAtual, casa);
            
            console.log(`Casa: ${casa.tipo}`);
            console.log(acaoCasa.mensagem);
            
            this.proximoTurno();
        });
    }

    proximoTurno() {
        const vencedor = this.jogo.verificarFimDeJogo();
        
        if (vencedor) {
            console.log(`\n🏆 Vencedor: ${vencedor.nome} 🏆`);
            this.rl.close();
            return;
        }
        
        this.jogo.proximoTurno();
        this.jogar();
    }
}

// Iniciar o jogo
const jogoCliInstance = new JogoCLI();
jogoCliInstance.iniciar();

module.exports = JogoCLI;