const prompt = require('prompt-sync')();

// EX01 Classe
class Produto {
    nome;
    preco;
    quantidade;

// EX02 Constructor
constructor(valorNome, valorPreco, valorQuantidade) {
    this.nome = valorNome;
    this.preco = valorPreco;
    this.quantidade = valorQuantidade;
    }

// EX03 Método Vender
Vender(quantidadeVendidade) {
    if(quantidadeVendidade > this.quantidade) {
        console.log("Ops! Não há mais estoque disponível.")
        console.log(`Há apenas ${this.quantidade} unidades de ${this.nome} para venda neste momento`)
        return
    }
    this.quantidade -= quantidadeVendidade
    }

// EX04 Método Repor
Repor(quantidadeReposta) {
    this.quantidade += quantidadeReposta
    }

// EX05 Método Mostrar Estoque
MostrarEstoque() {
    console.log(`O produto ${this.nome} custa R$ ${this.preco} e conta com ${this.quantidade} unidades disponíveis`)
    }

// EX06 Método Atualizar Preço
AtualizarPreco(novoValor) {
    this.preco = novoValor
    console.log(`Preço Atualizado! A partir de agora, o produto ${this.nome} custa R$ ${this.preco}`)
    }
}

// TESTE
let tofu = new Produto("Tofu", 10, 50)
console.log(tofu)

tofu.Vender(80)
tofu.Repor(10)
tofu.MostrarEstoque()
tofu.AtualizarPreco(15)


// EX07 Classe Pessoa
class Pessoa {
    nome;
    idade;
    profissao;

constructor(nome, idade, profissao) {
    this.nome = nome;
    this.idade = idade;
    this.profissao = profissao;
    }
}

// EX08 Herança Classe Cliente
class Cliente extends Pessoa {
    telefone;
    email;
    clienteDesde;

constructor(nome, idade, profissao, telefone, email, clienteDesde) {
    super(nome, idade, profissao);
    this.telefone = telefone;
    this.email = email;
    this.clienteDesde = clienteDesde;
    }
}

// TESTE 02
const clienteNaty = new Cliente("Natália", 28, "Jornalista", "4899999999", "naty@email.com", "2008-08-28")
console.log(clienteNaty)