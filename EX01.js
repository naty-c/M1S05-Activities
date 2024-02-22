// const prompt = require('prompt-sync')();

// const frutas = ["Maçã", "Morango", "Pêssego"];
//     console.log(frutas[1]);

const prompt = require('prompt-sync')();

const frutas = [];
    
for (let i = 0; i < 3; i++) {
    const fruta = prompt(`Digite o nome da ${i + 1}ª fruta: `);
    frutas.push(fruta);
}
    
const segundaFruta = frutas[1];
    console.log(`A segunda fruta é: ${segundaFruta}`);
    