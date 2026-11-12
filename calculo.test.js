const { calcularNovoSaldo } = require('./calculo');

describe('Testes Unitários - Lógica de Saldo', () => {
    test('Deve adicionar o valor da compra ao saldo atual', () => {
        expect(calcularNovoSaldo(50, 20, 'compra')).toBe(70);
    });

    test('Deve abater o valor do pagamento do saldo atual', () => {
        expect(calcularNovoSaldo(50, 20, 'pagamento')).toBe(30);
    });

    test('O saldo não pode ficar negativo após pagamento maior que a dívida', () => {
        expect(calcularNovoSaldo(10, 20, 'pagamento')).toBe(0);
    });

    test('Deve lançar um erro se o valor for zero ou negativo', () => {
        expect(() => calcularNovoSaldo(50, -10, 'compra')).toThrow("Valor inválido");
    });
});