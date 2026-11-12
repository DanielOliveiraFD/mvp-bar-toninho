// Dados simulados
let clientes = [
    { id: 1, nome: "João Silva", saldo: 45.00 },
    { id: 2, nome: "Maria Souza", saldo: 0.00 }
];
let clienteAtual = null;
let tipoLancamento = 'compra';

// Elementos
const listaClientesEl = document.getElementById('lista-clientes');
const buscaClienteEl = document.getElementById('busca-cliente');

// --- ECRÃ 1: LISTA E BUSCA ---
function renderizarClientes(filtro = '') {
    listaClientesEl.innerHTML = '';
    const clientesFiltrados = clientes.filter(c => c.nome.toLowerCase().includes(filtro.toLowerCase()));
    
    clientesFiltrados.forEach(cliente => {
        const li = document.createElement('li');
        li.className = 'cliente-item';
        
        const formatacaoSaldo = cliente.saldo > 0 ? 'texto-vermelho' : 'texto-cinza';
        
        li.innerHTML = `
            <span>${cliente.nome} — <span class="${formatacaoSaldo}">R$ ${cliente.saldo.toFixed(2).replace('.', ',')}</span></span>
            <span class="seta">></span>
        `;
        li.onclick = () => abrirTelaLancamento(cliente);
        listaClientesEl.appendChild(li);
    });
}
buscaClienteEl.addEventListener('input', (e) => renderizarClientes(e.target.value));

// --- ECRÃ 2: LANÇAMENTO ---
function abrirTelaLancamento(cliente) {
    clienteAtual = cliente;
    document.getElementById('nome-cliente-lancamento').innerText = cliente.nome;
    document.getElementById('valor-lancamento').value = '';
    selecionarTipo('compra');
    
    mudarTela('tela-menu', 'tela-lancamento');
    setTimeout(() => document.getElementById('valor-lancamento').focus(), 100);
}

document.getElementById('btn-voltar-lancamento').addEventListener('click', () => mudarTela('tela-lancamento', 'tela-menu'));
document.getElementById('btn-cancelar-lancamento').addEventListener('click', () => mudarTela('tela-lancamento', 'tela-menu'));

// Controlo dos botões de Compra/Pagamento
const btnCompra = document.getElementById('btn-tipo-compra');
const btnPagamento = document.getElementById('btn-tipo-pagamento');

function selecionarTipo(tipo) {
    tipoLancamento = tipo;
    if (tipo === 'compra') {
        btnCompra.classList.add('ativo');
        btnPagamento.classList.remove('ativo');
    } else {
        btnPagamento.classList.add('ativo');
        btnCompra.classList.remove('ativo');
    }
}

btnCompra.addEventListener('click', () => selecionarTipo('compra'));
btnPagamento.addEventListener('click', () => selecionarTipo('pagamento'));

// Confirmar Lançamento
document.getElementById('btn-confirmar-lancamento').addEventListener('click', () => {
    const valor = parseFloat(document.getElementById('valor-lancamento').value.replace(',', '.'));
    if (isNaN(valor) || valor <= 0) {
        alert("Insira um valor válido.");
        return;
    }
    
    if (tipoLancamento === 'compra') {
        clienteAtual.saldo += valor;
    } else {
        clienteAtual.saldo -= valor;
        if(clienteAtual.saldo < 0) clienteAtual.saldo = 0;
    }
    
    abrirTelaResultado(valor, tipoLancamento);
});

// --- ECRÃ 3: RESULTADO ---
function abrirTelaResultado(valorLancado, tipo) {
    document.getElementById('res-saldo').innerText = `R$ ${clienteAtual.saldo.toFixed(2).replace('.', ',')}`;
    document.getElementById('titulo-historico').innerText = `Histórico Recente de ${clienteAtual.nome}`;
    
    const dataAtual = new Date().toLocaleDateString('pt-PT');
    const rotuloTipo = tipo === 'compra' ? 'Compra' : 'Pagamento';
    document.getElementById('linha-historico').innerText = `${dataAtual} — ${rotuloTipo}: R$ ${valorLancado.toFixed(2).replace('.', ',')}`;
    
    mudarTela('tela-lancamento', 'tela-resultado');
}

document.getElementById('btn-voltar-inicio').addEventListener('click', () => {
    renderizarClientes(buscaClienteEl.value); 
    mudarTela('tela-resultado', 'tela-menu');
});

// Função Auxiliar de Navegação
function mudarTela(idOcultar, idMostrar) {
    document.getElementById(idOcultar).classList.replace('ativa', 'oculta');
    document.getElementById(idMostrar).classList.replace('oculta', 'ativa');
}

// Inicializa
renderizarClientes();