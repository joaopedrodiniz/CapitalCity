class MapaController {
    constructor(mapa) {
        this.mapa = mapa;
    }

    obterInformacoesCasa(posicao) {
        const casa = this.mapa.obterCasa(posicao);
        return {
            tipo: casa.tipo,
            cidade: casa.cidade ? {
                nome: casa.cidade.nome,
                proprietario: casa.cidade.proprietario?.nome || 'Disponível',
                valorCompra: casa.cidade.valorCompra,
                valorAluguel: casa.cidade.valorAluguel
            } : null
        };
    }
}

module.exports = {
    JogoController,
    JogadorController,
    MapaController
};