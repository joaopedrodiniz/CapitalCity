class Mapa {
    constructor() {
        this.casas = [];
        this.inicializarMapa();
    }

    inicializarMapa() {
        const tiposCasas = [
            'Cidade', 'CentrodeNegocios', 'Olimpiadas', 
            'Cidade', 'Cidade', 'CentrodeNegocios', 
            'Cidade', 'Cidade', 'Olimpiadas', 'Cidade'
        ];

        this.casas = tiposCasas.map((tipo, index) => ({
            id: index,
            tipo: tipo,
            cidade: tipo === 'Cidade' ? new Cidade(`Cidade ${index}`, 100 * (index + 1)) : null
        }));
    }

    obterCasa(posicao) {
        return this.casas[posicao];
    }
}