const prompt = require('prompt-sync')();

const numeros = [2, 5, 8, 12, 15];

const pares = numeros.filter(num => {
    if(num % 2 == 0) {
        return true
    }
})

console.log(pares);
