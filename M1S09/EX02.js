const express = require("express")

const app = express()


app.get("/sobre",function(req, res){
    res.send("Minha primeira aplicação de servidor para o FMT :)")
 })
 
 app.get("/contato",function(req, res){
    res.send("Dúvidas? Sugestões? Um cafezinho? Entre em contato comigo!")
 })
 

app.listen(3000, function(){
    console.log("Servidor Rodando!!!")
 })