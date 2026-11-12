// Isolamos a lógica matemática para permitir o Teste Unitário
function calcularNovoSaldo(saldoAtual, valor, tipo) {
    if (isNaN(valor) || valor <= 0) {
        throw new Error("Valor inválido");
    }
    
    if (tipo === 'compra') {
        return saldoAtual + valor;
    } else {
        let novoSaldo = saldoAtual - valor;
        return novoSaldo < 0 ? 0 : novoSaldo;
    }
}

module.exports = { calcularNovoSaldo };