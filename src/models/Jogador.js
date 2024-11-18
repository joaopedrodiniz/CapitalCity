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

    pagarAluguel(valor) {
        if (this.dinheiro >= valor) {
            this.dinheiro -= valor;
            return true;
        }
        return this.venderPropriedadesParaPagar(valor);
    }

    venderPropriedadesParaPagar(valorDevido) {
        const propriedadesOrdenadas = this.propriedades
            .sort((a, b) => a.valorCompra - b.valorCompra);
        
        for (let propriedade of propriedadesOrdenadas) {
            this.dinheiro += propriedade.valorCompra;
            this.propriedades = this.propriedades.filter(p => p !== propriedade);
            
            if (this.dinheiro >= valorDevido) {
                return true;
            }
        }

        this.falido = true;
        return false;
    }
}
