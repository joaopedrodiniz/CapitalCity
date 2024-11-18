const readline = require('readline');
const { Jogo, Jogador } = require('../models/Jogo');
const RegrasDaPartida = require('../services/RegrasDaPartida');

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
        console.log("\n=== Bem-vindo ao Capital City ===");
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
                console.log("\nJogadores criados com sucesso!");
                this.jogar();
            }
        };

        perguntarNome(0);
    }

    mostrarEstadoJogador(jogador) {
        console.log(`\n--- Status do Jogador: ${jogador.nome} ---`);
        console.log(`Dinheiro: R$ ${jogador.dinheiro}`);
        console.log(`Propriedades: ${jogador.propriedades.map(p => p.nome).join(', ') || "Nenhuma"}`);
        console.log("---------------------------------------");
    }

    mostrarMapa() {
        console.log("\n--- Mapa Atual ---");
        const mapa = this.jogo.mapa.obterTodasCidades();
        mapa.forEach((casa, index) => {
            if (casa.tipo === "Cidade") {
                console.log(`${index}: ${casa.nome} (Compra: R$ ${casa.cidade.valorCompra}, Aluguel: R$ ${casa.cidade.valorAluguel}, Coordenadas: X:${casa.coordenadas.x}, Y:${casa.coordenadas.y})`);
            } else {
                console.log(`${index}: ${casa.nome} (Tipo Especial: ${casa.tipo}, Coordenadas: X:${casa.coordenadas.x}, Y:${casa.coordenadas.y})`);
            }
        });
    }

    jogar() {
        const jogadorAtual = this.jogo.jogadores[this.jogo.jogadorAtual];
        this.mostrarEstadoJogador(jogadorAtual);

        this.rl.question('Escolha uma ação:\n1. Rolar Dado\n2. Mostrar Mapa\nOpção: ', (opcao) => {
            switch (opcao.trim()) {
                case '1':
                    this.rolarDado(jogadorAtual);
                    break;
                case '2':
                    this.mostrarMapa();
                    this.jogar();
                    break;
                default:
                    console.log("Opção inválida. Tente novamente.");
                    this.jogar();
            }
        });
    }

    rolarDado(jogadorAtual) {
        console.log(`\n--- Turno de ${jogadorAtual.nome} ---`);
        const valorDado = jogadorAtual.rolarDado();
        console.log(`Você tirou ${valorDado} no dado.`);

        jogadorAtual.mover(valorDado);
        console.log(`Você está na casa ${jogadorAtual.posicaoAtual}`);

        const casa = this.jogo.mapa.obterCasa(jogadorAtual.posicaoAtual);
        const acaoCasa = this.regrasDaPartida.verificarAcaoCasa(this.jogo, jogadorAtual, casa);

        if (casa.tipo === "Olimpiadas") {
            console.log("Você chegou a um evento das Olimpíadas!");
            const cidadesDisponiveis = jogadorAtual.propriedades.filter(cidade => !cidade.olimpiadasSediadas);
            if (cidadesDisponiveis.length > 0) {
                console.log("Escolha uma de suas cidades para sediar as Olimpíadas:");
                cidadesDisponiveis.forEach((cidade, index) => {
                    console.log(`${index + 1}: ${cidade.nome}`);
                });
                this.rl.question("Digite o número da cidade: ", (indice) => {
                    const cidadeEscolhida = cidadesDisponiveis[parseInt(indice) - 1];
                    cidadeEscolhida.sediarOlimpiadas();
                    console.log(`${cidadeEscolhida.nome} agora está sediando as Olimpíadas!`);
                    this.proximoTurno();
                });
            } else {
                console.log("Você não tem cidades disponíveis para sediar as Olimpíadas.");
                this.proximoTurno();
            }
        } else if (casa.tipo === "CentrodeNegocios") {
            console.log("Você está no Centro de Negócios! Escolha uma ação estratégica.");
            console.log("1. Proteger uma cidade\n2. Melhorar uma cidade");
            this.rl.question("Escolha: ", (opcao) => {
                // Lógica para proteger ou melhorar cidades
                this.proximoTurno();
            });
        } else {
            console.log(`Casa: ${casa.tipo}`);
            console.log(acaoCasa.mensagem);

            if (acaoCasa.valorAluguel) {
                console.log(`Aluguel a pagar: R$ ${acaoCasa.valorAluguel}`);
            }

            this.proximoTurno();
        }
    }

    proximoTurno() {
        const vencedor = this.jogo.verificarFimDeJogo();

        if (vencedor) {
            console.log(`\n🏆 Vencedor: ${vencedor.nome} 🏆`);
            this.rl.close();
        } else {
            this.jogo.proximoTurno();
            this.jogar();
        }
    }
}

// Iniciar o jogo
const jogoCliInstance = new JogoCLI();
jogoCliInstance.iniciar();

module.exports = JogoCLI;
