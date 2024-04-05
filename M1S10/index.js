const express = require('express');
const app = express();
const PORT = 3333;

// Importa array com lista de tarefas para simular o banco de dados
let tasks = require('./data');

// Middleware para trabalhar com JSON
app.use(express.json());

// Middleware de autenticação
app.use('/tasks', authenticate);

//Rota raiz para o endereço base do servidor
app.get('/', (req, res) => {
    res.json("Success!");
});


// Verifica se a string é uma data válida no formato YYYY-MM-DD
function isValidDate(dateString) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateString);
}

//Middleware para validar os dados das tarefas 
function validateTaskData(req, res, next) {
    const { title, description, deadline } = req.body;

    // Verifica se os campos obrigatórios estão presentes e no formato correto
    if (!title || !description || !isValidDate(deadline)) {
        return res.status(400).send('Uh oh! Invalid data! Please, try again.');
    }

    next(); // Passa para o próximo middleware ou rota
}


function isValidToken(token) {
    return token === "solo_leveling";
}

// Middleware de autenticação para proteger as rotas
function authenticate(req, res, next) {
    // Verifica se o token de autenticação está no cabeçalho da requisição
    const token = req.headers.authorization;
    
    // Se não houver token ou se o token for inválido, retorna erro
    if (!token || !isValidToken(token)) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    
    // Se o token for válido, avança para a próxima rota
    next();
}


// (C) CREATE - Rota para criar uma nova tarefa
app.post('/tasks', validateTaskData, (req, res) => {
    const newTask = req.body;
    
    newTask.id = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
    
    tasks.push(newTask);
    res.status(201).send('Task added successfully!');
})

// (R) READ - Rota para listar todas as tarefas, com paginação
app.get('/tasks', (req, res) => {
    const page = parseInt(req.query.page) || 1; // Página atual
    const pageSize = parseInt(req.query.pageSize) || 3; // Nº de tarefas por página

    if (page && pageSize) {
        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;

        const paginatedTasks = tasks.slice(startIndex, endIndex);

    return res.json({
        tasks: paginatedTasks,
        currentPage: page,
        pageSize: pageSize,
        totalPages: Math.ceil(tasks.length / pageSize)
    });
}

    res.json(tasks);
});

// (R) READ - Rota para listar uma tarefa pelo ID
app.get('/tasks/:id', (req, res) => {
 const { id } = req.params;
 const task = tasks.find(task => task.id === parseInt(id));
 if (!task) {
     return res.status(404).send('Task not found.');
}
 res.json(task);
})

// (U) UPDATE - Rota para atualizar uma tarefa pelo ID
app.put('/tasks/:id', validateTaskData, (req, res) => {
    const { id } = req.params;
    const newData = req.body;
    
    const index = tasks.findIndex(task => task.id === parseInt(id));
    
    if (index === -1) {
        return res.status(404).send('Ops! Task not found.');
    }
    tasks[index] = { ...tasks[index], ...newData };
    res.status(200).send('Task updated successfully!');
})

// (D) DELETE - Rota para deletar uma tarefa existente pelo ID
app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const index = tasks.findIndex(task => task.id === parseInt(id));

    if (index === -1) {
        return res.status(404).send('Ops! Task not found.');
    }
    tasks.splice(index, 1);

    res.status(200).send('Task is no longer available!');
})


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

