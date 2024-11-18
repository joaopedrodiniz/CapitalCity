class GerenciadorFinanceiro {
    static calcularTransacao(jogador, valor, tipoTransacao) {
        switch (tipoTransacao) {
            case 'COMPRA':
                return this.processarCompra(jogador, valor);
            case 'ALUGUEL':
                return this.processarPagamentoAluguel(jogador, valor);
            case 'PENALIDADE':
                return this.processarPenalidade(jogador, valor);
            default:
                throw new Error('Tipo de transação inválido');
        }
    }

    static processarCompra(jogador, valor) {
        if (jogador.dinheiro >= valor) {
            jogador.dinheiro -= valor;
            return { 
                sucesso: true, 
                saldoRestante: jogador.dinheiro 
            };
        }
        return { 
            sucesso: false, 
            mensagem: 'Saldo insuficiente' 
        };
    }

    static processarPagamentoAluguel(jogador, valor) {
        if (jogador.dinheiro >= valor) {
            jogador.dinheiro -= valor;
            return { 
                sucesso: true, 
                saldoRestante: jogador.dinheiro 
            };
        }
        return { 
            sucesso: false, 
            mensagem: 'Necessário vender propriedades' 
        };
    }

    static processarPenalidade(jogador, valor) {
        jogador.dinheiro -= valor;
        return { 
            sucesso: true, 
            saldoRestante: jogador.dinheiro 
        };
    }
}