class GerenciadorPropriedades {
    melhorarPropriedade(cidade) {
        if (cidade.nivelMelhoria < 3) {
            cidade.nivelMelhoria++;
            cidade.valorAluguel *= 2;
            return {
                sucesso: true,
                novoNivel: cidade.nivelMelhoria,
                novoValorAluguel: cidade.valorAluguel
            };
        }
        return {
            sucesso: false,
            mensagem: 'Limite máximo de melhorias atingido'
        };
    }

    transferirPropriedade(cidadeAtual, novoProprietario) {
        cidadeAtual.proprietario = novoProprietario;
        novoProprietario.propriedades.push(cidadeAtual);
        return {
            sucesso: true,
            mensagem: 'Propriedade transferida com sucesso'
        };
    }

    protegerPropriedade(cidade) {
        cidade.estaProtegida = true;
        return {
            sucesso: true,
            mensagem: 'Cidade protegida'
        };
    }

    sediarOlimpiadas(cidade) {
        cidade.sediarOlimpiadas();
        return {
            sucesso: true,
            valorAluguel: cidade.valorAluguel
        };
    }
}

module.exports = {
    RegrasDaPartida,
    GerenciadorFinanceiro,
    GerenciadorPropriedades
};