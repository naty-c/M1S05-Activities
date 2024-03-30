const express = require("express")

const app = express()


app.get("/produto/:id", function(req, res){
    const id = req.params.id;
    res.send(`O ID do produto é ${id}.`);
    // ou res.json({ message: `O ID do produto é ${id}.`})
})


app.listen(3000, function(){
    console.log("Servidor Rodando!!!")
 })