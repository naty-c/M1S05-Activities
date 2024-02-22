const prompt = require('prompt-sync')();

const numeros = [2, 5, 8, 12, 15];

const soma = numeros.reduce((soma, valores) => soma + valores, 0);
console.log(soma);