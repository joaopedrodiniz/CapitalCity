class JogadorController {
    comprarCidade(jogador, cidade) {
        if (!jogador || !cidade) {
            throw new Error('Jogador ou cidade inválidos');
        }

        if (cidade.proprietario) {
            throw new Error('Cidade já possui proprietário');
        }

        return jogador.comprarCidade(cidade);
    }

    pagarAluguel(jogador, valorAluguel, proprietario) {
        if (jogador.pagarAluguel(valorAluguel)) {
            proprietario.dinheiro += valorAluguel;
            return true;
        }
        return false;
    }
}

module.exports = JogadorController;
