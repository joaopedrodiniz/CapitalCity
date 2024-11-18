class Cidade {
    constructor(nome, valorCompra) {
        this.id = Date.now() + Math.random();
        this.nome = nome;
        this.proprietario = null;
        this.valorCompra = valorCompra;
        this.valorAluguel = valorCompra * 0.1;
        this.nivelMelhoria = 0;
        this.olimpiadasSediadas = false;
        this.estaProtegida = false;
    }

    melhorar() {
        if (this.nivelMelhoria < 3) {
            this.nivelMelhoria++;
            this.valorAluguel *= 2;
            return true;
        }
        return false;
    }

    sediarOlimpiadas() {
        this.olimpiadasSediadas = true;
        this.valorAluguel *= 2;
    }

    proteger() {
        this.estaProtegida = true;
    }
}