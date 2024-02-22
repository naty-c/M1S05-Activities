const prompt = require('prompt-sync')();

const numerosOrdenados = [12, 15, 8, 2, 5];
    numerosOrdenados.sort(function (a, b) {
        return a - b;
    });
    console.log(numerosOrdenados);