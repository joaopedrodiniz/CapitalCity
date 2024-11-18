const cidadesData = require('../data/cidades.json');

class Mapa {
    constructor() {
        this.casas = [];
        this.inicializarMapa();
    }

    inicializarMapa() {
        this.casas = cidadesData.cidades.map(cidade => ({
            id: cidade.id,
            nome: cidade.nome,
            tipo: cidade.tipo,
            cidade: cidade.tipo === 'Cidade' ? {
                nome: cidade.nome,
                valorCompra: cidade.valorCompra,
                valorAluguel: cidade.valorAluguel,
                proprietario: null
            } : null,
            coordenadas: cidade.coordenadas
        }));
    }

    obterCasa(posicao) {
        return this.casas[posicao] || null;
    }

    obterTodasCidades() {
        return this.casas.filter(casa => casa.tipo === 'Cidade');
    }
}

module.exports = Mapa