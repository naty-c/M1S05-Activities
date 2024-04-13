const express = require("express")

const app = express()

app.use(express.static('public')); 
//Retorna a imagem salva na pasta public em http://localhost:3000/images/solo_leveling.jpg

app.listen(3000, function(){
    console.log("Servidor Rodando!!!")
 })