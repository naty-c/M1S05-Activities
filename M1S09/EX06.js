//CRUD
const express = require("express")

const app = express()

//Lista de usuários simulando um 'banco de dados'
let users = [];

//Middleware para validar
app.use(express.json());

//CREATE
app.post('/users', (req, res) => {
    const newUser = req.body;
    newUser.id = users.length + 1;
    users.push(newUser);
    res.status(201).send('Hooray! New user added');
})

//READ
app.get('/', (req, res) => {
    res.json("Mission accomplished!");
})

app.get('/users', (req, res) => {
    res.json(users);
})

app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const usuario = users.find(user => user.id === userId);
    if (!usuario) {
        res.status(404).send('Sorry! User not found');
    }   else {
        res.json(usuario);
    }
})

//UPDATE
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const newInfo = req.body;
    const index = users.findIndex(user => user.id === parseInt(id));
    if (index === -1) {
        res.status(404).send('Sorry! User not found');
        return;
    }   
        users[index] = { ...users[index], ...newInfo };
        res.status(200).json({ message: 'Hooray! Update completed', user: users[index] });
})

//DELETE
app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const index = users.findIndex(user => user.id === userId);
    if (index === -1) {
        res.status(404).send('Ops! Missing user, try again')
    }   else {
        users.splice(index, 1);
        res.status(200).send('Done! User excluded for good');
    }
})

app.listen(3000, function(){
    console.log("Rolling!!!")
 })