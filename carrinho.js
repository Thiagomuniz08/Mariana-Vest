document.addEventListener('DOMContentLoaded', () => {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const carrinhoDiv = document.getElementById('carrinho');

    if (carrinho.length === 0) {
        carrinhoDiv.innerHTML = '<p>Seu carrinho está vazio.</p>';
    } else {
        carrinhoDiv.innerHTML = carrinho.map((produto, index) => `
            <div class="card">
                <h3>${produto.nome}</h3>
                <img src="${produto.imagem}" alt="${produto.nome}">
                <p>Preço: R$ ${produto.preco.toFixed(2)}</p>
                <button onclick="removerDoCarrinho(${index})">Remover</button>
            </div>
        `).join('');
    }
});

function removerDoCarrinho(index) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.splice(index, 1);
    localStorage.setItem('carrinho', JSON.stringify(carrinho)); 
    location.reload(); 
}