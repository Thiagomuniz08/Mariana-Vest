const uri = './assets/loja.json';
var produtos = [];

fetch(uri)
    .then(resp => resp.json())
    .then(resp => { produtos = resp; })
    .then(() => mostrarCards());

function mostrarCards() {
    const main = document.querySelector('main');
    produtos.forEach((p, index) => {
        main.innerHTML += `
        <div class="card">
            <h3>${p.nome}</h3>
            <img src="${p.imagem}" alt="${p.nome}">
            <p>Preço: R$ ${p.preco.toFixed(2)}</p>
            <button onclick="mostrarDetalhes(${index})">Detalhes</button>
            <button onclick="adicionarAoCarrinho(${index})">Adicionar ao Carrinho</button>
        </div>
        `;
    });
}

function mostrarDetalhes(index) {
    const produto = produtos[index];
    const modal = document.getElementById('modal');
    document.getElementById('modal-img').src = produto.imagem;
    document.getElementById('modal-img').alt = produto.nome;
    document.getElementById('modal-nome').textContent = produto.nome;
    document.getElementById('modal-desc').textContent = produto.descricao || 'Sem descrição disponível.';
    document.getElementById('modal-preco').textContent = `Preço: R$ ${produto.preco.toFixed(2)}`;
    document.getElementById('modal-frete').textContent = produto.frete ? `Frete: R$ ${produto.frete.toFixed(2)}` : 'Frete grátis!';
    modal.classList.remove('hidden');
}

function adicionarAoCarrinho(index) {
    const produto = produtos[index];
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || []; 
    carrinho.push(produto);
    localStorage.setItem('carrinho', JSON.stringify(carrinho)); 
    alert(`${produto.nome} foi adicionado ao carrinho!`);
}

document.querySelector('.fechar').addEventListener('click', () => {
    document.getElementById('modal').classList.add('hidden');
});