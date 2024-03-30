const express = require("express")

const app = express()


app.use((req, res, next) => {
    const agora = new Date();
    console.log(`${req.method} ${req.url} ${agora.toLocaleString()}`);
    next();
})


app.listen(3000, function(){
    console.log("Servidor Rodando!!!")
 })