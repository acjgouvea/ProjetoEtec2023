// script.js

// Função para salvar os produtos no localStorage
function salvarProdutos(produtos) {
    localStorage.setItem('produtos', JSON.stringify(produtos));
}

// Função para obter os produtos do localStorage
function obterProdutos() {
    return JSON.parse(localStorage.getItem('produtos')) || [];
}

// Função para adicionar um novo produto
function adicionarProduto(produto) {
    let produtos = obterProdutos();
    produtos.push(produto);
    salvarProdutos(produtos);
}

// Função para atualizar um produto existente
function atualizarProduto(codigo, novoProduto) {
    let produtos = obterProdutos();
    let produtoIndex = produtos.findIndex(p => p.codigo === codigo);
    if (produtoIndex !== -1) {
        produtos[produtoIndex] = novoProduto;
        salvarProdutos(produtos);
    }
}

// Função para excluir um produto
function excluirProduto(codigo) {
    let produtos = obterProdutos();
    produtos = produtos.filter(produto => produto.codigo !== codigo);
    salvarProdutos(produtos);
}

// Função para exibir os produtos na tela
function exibirProdutos() {
    let produtos = obterProdutos();
    let lista = document.getElementById('produtoLista');
    lista.innerHTML = produtos.map(produto => `
        <div>
            ${produto.codigo} - ${produto.nome} - ${produto.tipo} - ${produto.valor} - ${produto.quantidade}
            <button onclick="preencherFormulario('${produto.codigo}')">Editar</button>
            <button onclick="excluirProduto('${produto.codigo}'); exibirProdutos();">Excluir</button>
        </div>
    `).join('');
}

// Função para preencher o formulário com os dados de um produto para edição
function preencherFormulario(codigo) {
    let produtos = obterProdutos();
    let produto = produtos.find(p => p.codigo === codigo);
    if (produto) {
        document.getElementById('codigoProduto').value = produto.codigo;
        document.getElementById('nomeProduto').value = produto.nome;
        document.getElementById('tipoProduto').value = produto.tipo;
        document.getElementById('valorProduto').value = produto.valor;
        document.getElementById('quantidadeProduto').value = produto.quantidade;
    }
}

// Função para manipular o envio do formulário
document.getElementById('formCadastro').onsubmit = function (event) {
    event.preventDefault();

    var codigo = document.getElementById('codigoProduto').value;
    var nome = document.getElementById('nomeProduto').value;
    var tipo = document.getElementById('tipoProduto').value;
    var valor = document.getElementById('valorProduto').value;
    var quantidade = document.getElementById('quantidadeProduto').value;

    if (this.dataset.editing === "true") {
        atualizarProduto(codigo, {
            codigo,
            nome,
            tipo,
            valor,
            quantidade
        });
        this.dataset.editing = "false";
    } else {
        adicionarProduto({
            codigo,
            nome,
            tipo,
            valor,
            quantidade
        });
    }

    exibirProdutos();
    this.reset();
};

// Inicializar a lista de produtos ao carregar a página
document.addEventListener('DOMContentLoaded', exibirProdutos);