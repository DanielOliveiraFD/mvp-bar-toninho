// Dados simulados
let clientes = [
    { id: 1, nome: "João Silva", saldo: 45.00 },
    { id: 2, nome: "Maria Oliveira", saldo: 12.50 },
    { id: 3, nome: "Marcos (Mecânico)", saldo: 0.00 }
];
let clienteAtual = null;

// Elementos
const listaClientesEl = document.getElementById('lista-clientes');
const buscaClienteEl = document.getElementById('busca-cliente');

// --- TELA 1: LISTA E BUSCA ---
function renderizarClientes(filtro = '') {
    listaClientesEl.innerHTML = '';
    const clientesFiltrados = clientes.filter(c => c.nome.toLowerCase().includes(filtro.toLowerCase()));
    
    clientesFiltrados.forEach(cliente => {
        const li = document.createElement('li');
        li.className = 'cliente-item';
        li.innerHTML = `<span>${cliente.nome}</span> <span class="texto-vermelho">R$ ${cliente.saldo.toFixed(2)}</span>`;
        li.onclick = () => abrirTelaLancamento(cliente);
        listaClientesEl.appendChild(li);
    });
}
buscaClienteEl.addEventListener('input', (e) => renderizarClientes(e.target.value));

// --- TELA 2: LANÇAMENTO ---
function abrirTelaLancamento(cliente) {
    clienteAtual = cliente;
    document.getElementById('nome-cliente-lancamento').innerText = cliente.nome;
    document.getElementById('valor-lancamento').value = '';
    
    mudarTela('tela-menu', 'tela-lancamento');
    setTimeout(() => document.getElementById('valor-lancamento').focus(), 100); // Foco automático para agilidade
}

document.getElementById('btn-voltar-lancamento').addEventListener('click', () => mudarTela('tela-lancamento', 'tela-menu'));

document.getElementById('btn-confirmar-lancamento').addEventListener('click', () => {
    const valor = parseFloat(document.getElementById('valor-lancamento').value);
    if (isNaN(valor) || valor <= 0) {
        alert("Insira um valor válido maior que zero.");
        return;
    }
    clienteAtual.saldo += valor; // Atualiza o saldo
    abrirTelaResultado(valor);
});

// --- TELA 3: RESULTADO ---
function abrirTelaResultado(valorLancado) {
    document.getElementById('res-nome').innerText = clienteAtual.nome;
    document.getElementById('res-valor').innerText = `+ R$ ${valorLancado.toFixed(2)}`;
    document.getElementById('res-saldo').innerText = `R$ ${clienteAtual.saldo.toFixed(2)}`;
    
    mudarTela('tela-lancamento', 'tela-resultado');
}

document.getElementById('btn-voltar-inicio').addEventListener('click', () => {
    renderizarClientes(buscaClienteEl.value); // Atualiza a lista
    mudarTela('tela-resultado', 'tela-menu');
});

// Função Auxiliar de Navegação
function mudarTela(idOcultar, idMostrar) {
    document.getElementById(idOcultar).classList.replace('ativa', 'oculta');
    document.getElementById(idMostrar).classList.replace('oculta', 'ativa');
}

// Inicializa
renderizarClientes();

// Registra o Service Worker (PWA Offline)
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then(() => console.log('Service Worker Registrado'));
}