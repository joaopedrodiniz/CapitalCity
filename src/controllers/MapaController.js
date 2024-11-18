const { Mapa } = require('../models/Mapa');

class MapaController {
    constructor(mapa) {
        this.mapa = mapa;
    }

    listarCidades() {
        return this.mapa.obterTodasCidades().map(casa => ({
            nome: casa.nome,
            valorCompra: casa.cidade.valorCompra,
            valorAluguel: casa.cidade.valorAluguel,
            proprietario: casa.cidade.proprietario?.nome || 'Disponível'
        }));
    }

    detalhesCidade(nomeCidade) {
        const cidade = this.mapa.obterTodasCidades()
            .find(casa => casa.nome === nomeCidade);
        
        return cidade ? {
            nome: cidade.nome,
            tipo: cidade.tipo,
            valorCompra: cidade.cidade.valorCompra,
            valorAluguel: cidade.cidade.valorAluguel,
            coordenadas: cidade.coordenadas
        } : null;
    }
}

module.exports = { Mapa, MapaController };