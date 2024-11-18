class RegrasDaPartida {
    verificarAcaoCasa(jogo, jogador, casa) {
        switch (casa.tipo) {
            case 'Olimpiadas':
                return this.tratarOlimpiadas(jogador);
            case 'CentrodeNegocios':
                return this.tratarCentrodeNegocios(jogo, jogador);
            case 'Cidade':
                return this.tratarCidade(jogo, jogador, casa);
            default:
                return { sucesso: true, mensagem: 'Nenhuma ação especial' };
        }
    }

    tratarOlimpiadas(jogador) {
        const cidadesDisponiveis = jogador.propriedades
            .filter(cidade => !cidade.olimpiadasSediadas);
        
        return {
            sucesso: true,
            mensagem: 'Olimpíadas disponíveis',
            cidadesDisponiveis
        };
    }

    tratarCentrodeNegocios(jogo, jogadorAtual) {
        return {
            sucesso: true,
            mensagem: 'Ações do Centro de Negócios disponíveis',
            acoes: [
                'Proteger Cidade', 
                'Atacar Cidade', 
                'Sediar Olimpíadas', 
                'Perder Dinheiro'
            ],
            outrosJogadores: jogo.jogadores.filter(j => j !== jogadorAtual)
        };
    }

    tratarCidade(jogo, jogador, casa) {
        const cidade = casa.cidade;
        
        if (!cidade.proprietario) {
            return {
                sucesso: true,
                mensagem: 'Cidade disponível para compra',
                valorCompra: cidade.valorCompra
            };
        }

        if (cidade.proprietario !== jogador) {
            return {
                sucesso: false,
                mensagem: 'Pagamento de Aluguel',
                valorAluguel: cidade.valorAluguel,
                proprietario: cidade.proprietario
            };
        }

        return { 
            sucesso: true, 
            mensagem: 'Sua própria cidade' 
        };
    }
}