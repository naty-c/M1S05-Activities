// const prompt = require('prompt-sync')();

// const numeros = [2, 5, 8, 12, 15];

// for (let i = 0; i < numeros.length; i++) {
//     console.log(numeros[i]);
//   }
  

const prompt = require('prompt-sync')();

const numeros = [];

for (let i = 0; i < 5; i++) {
  const numero = parseInt(prompt(`Digite o ${i + 1}º número: `));
  numeros.push(numero);
}

for (let i = 0; i < numeros.length; i++) {
  console.log(`Número ${i + 1}: ${numeros[i]}`);
}
