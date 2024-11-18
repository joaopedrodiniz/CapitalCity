class Jogador {
    constructor(nome, dinheiroInicial = 1000) {
        this.id = Date.now() + Math.random();
        this.nome = nome;
        this.dinheiro = dinheiroInicial;
        this.propriedades = [];
        this.posicaoAtual = 0;
        this.falido = false;
    }

    rolarDado() {
        return Math.floor(Math.random() * 6) + 1;
    }

    mover(casas) {
        this.posicaoAtual = (this.posicaoAtual + casas) % 10;
        return this.posicaoAtual;
    }

    comprarCidade(cidade) {
        if (this.dinheiro >= cidade.valorCompra) {
            this.dinheiro -= cidade.valorCompra;
            this.propriedades.push(cidade);
            cidade.proprietario = this;
            return true;
        }
        return false;
    }
}

module.exports = Jogador;
