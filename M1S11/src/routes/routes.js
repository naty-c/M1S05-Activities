const { Router } = require('express'); 

const routes = new Router(); 

const { Op } = require('sequelize');

const Aluno = require('../models/Aluno');
const Curso = require('../models/Curso');
const Professor = require('../models/Professor');


////CRUD ALUNOS

//Endpoint POST Alunos
routes.post('/alunos', async (req, res) => {

    try {

        const nome = req.body.nome;
        const data_nascimento = req.body.data_nascimento;
        const celular = req.body.celular;

        if(!nome) {
            return res.status(400).json({message: 'O nome é obrigatório'});
        }

        if(!data_nascimento) {
            return res.status(400).json({message: 'A data de nascimento é obrigatória'});
        }

        if(!data_nascimento.match(/\d{4}-\d{2}-\d{2}/gm)) { //Validar formato da data
            return res.status(400).json({
                message: 'A data de nascimento não está no formato correto'});
        }

        const aluno = await Aluno.create({
                nome: nome,
                data_nascimento: data_nascimento,
                celular: celular
            })  
        res.status(201).json(aluno);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({error: 'Não foi possível cadastrar o aluno.' });
    }
});


//Endpoint GET Alunos [listar todos]
routes.get('/alunos', async (req, res) => {
    const alunos = await Aluno.findAll();
    res.json(alunos);
    });


//Endpoint PUT Alunos
routes.put('/alunos/:id', async (req, res) => {
    const alunoId = req.params.id;
    const data = req.body;

    try {

        const [alunoAtualizado] = await Aluno.update(
            data,
            { where: {id: alunoId} }
    );

    if (!alunoAtualizado) {
        return res.status(404).json({ error: 'Aluno não encontrado' });
    }

    res.status(200).json({ message: 'Informações do aluno atualizadas com sucesso' });

    } catch (error) {
        console.error('Erro ao atualizar informações do aluno', error);
        res.status(500).json({ error: 'Erro ao atualizar informações do aluno' });
    }
});


//Endpoint DELETE Alunos
routes.delete('/alunos/:id', async (req, res) => {
    const { id } = req.params;

    const aluno = await Aluno.findByPk(id);

    if (!aluno) {
        return res.status(404).json({ message: "Aluno não encontrado." });
    }

    await aluno.destroy();

    return res.status(204).json({});
});


////CRUD CURSOS

// (C) CREATE - Endpoint POST Cursos
routes.post('/cursos', async (req, res) => {

    try {

        const nome = req.body.nome;
        const duracao_horas = req.body.duracao_horas;

        if(!nome) {
            return res.status(400).json({message: 'O nome é obrigatório'});
        }

        if(!duracao_horas) {
            return res.status(400).json({
                message: 'A duração do curso é obrigatória'});
        }

        if(!(duracao_horas >= 20 && duracao_horas <= 500)) {
            return res.status(400).json({
                message: 'A duração do curso deve ter entre 20 e 500 horas'});
        }

        const curso = await Curso.create({
            nome: nome,
            duracao_horas: duracao_horas
        })  
        res.status(201).json(curso);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({error: 'Não foi possível cadastrar o curso.' });
    }
});


//(R) READ - Endpoint GET Cursos com filtro [nome e duração]
routes.get('/cursos', async (req, res) => {
    let where = {};
    
        if(req.query.nome) {
            where.nome = { [Op.iLike]: `%${req.query.nome}%` };
        }

        if (req.query.duracao_horas) {
            where.duracao_horas = req.query.duracao_horas;
        }

        try {
            const cursos = await Curso.findAll({
                where,
            });
        if (cursos.length === 0) {
            throw new Error("Nenhum curso encontrado com a duração informada");
        }
        res.json(cursos);
        } catch (error) {
            res.status(404).json({ message: error.message} );
        }
    });


//(D) UPDATE - Endpoint PUT Cursos
routes.put('/cursos/:id', async (req, res) => {
    const id = req.params.id;

    const curso = await Curso.findByPk(id);

    if (!curso) {
        return res.status(404).json({ message: "Curso não encontrado." });
    }

    curso.update(req.body);

    await curso.save();

    res.json(curso);
});

//(U) UPDATE - Endpoint PUT Cursos mais completo
// routes.put('/cursos/:id', async (req, res) => {
//     const cursoId = req.params.id;
//     const data = req.body;

//     try {

//         const [cursoAtualizado] = await Curso.update(
//             data,
//             { where: {id: cursoId} }
//     );

//     if (!cursoAtualizado) {
//         return res.status(404).json({ error: 'Curso não encontrado' });
//     }

//     res.status(200).json({ message: 'Curso atualizado com sucesso' });

//     } catch (error) {
//         console.error('Erro ao atualizar o curso', error);
//         res.status(500).json({ error: 'Erro ao atualizar curso' });
//     }
// });

//(U) UPDATE - Endpoint PUT Cursos alternativo

// routes.put('/cursos/:id', async (req, res) => {
//     const { id } = req.params;
//     const { nome, duracao_horas } = req.body;

//     if (!nome || !duracao_horas) {
//         return res.status(400).json({ message: "Dados inválidos." });
//     }

//     const curso = await Curso.findByPk(id);

//     if (!curso) {
//         return res.status(404).json({ message: "Curso não encontrado." });
//     }

//     curso.nome = nome;
//     curso.duracao_horas = duracao_horas;
//     await curso.save();

//     return res.status(200).json(curso);
// });


//(D) DELETE - Endpoint DELETE Cursos
routes.delete('/cursos/:id', async (req, res) => {
    const { id } = req.params;

    const curso = await Curso.findByPk(id);

    if (!curso) {
        return res.status(404).json({ message: "Curso não encontrado." });
    }

    await curso.destroy();

    return res.status(204).json({});
});


////CRUD PROFESSORES

//Endpoint POST Professores
routes.post('/professores', async (req, res) => {

    const { nome, area_atuacao, email } = req.body;
    
    try {
        const professor = await Professor.create({
            nome: nome,
            area_atuacao: area_atuacao,
            email: email
        });
        res.status(201).json(professor);

    } catch (error) {
        res.status(400).json({ message: "Erro ao adicionar professor", error: error.message })
    }
});  


//Endpoint GET Professores
routes.get('/professores', async (req, res) => {
    const professores = await Professor.findAll();
    res.json(professores);
});

//Endpoint PUT Professores
routes.put('/professores/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, area_atuacao, email } = req.body;

    if (!nome || !area_atuacao || !email) {
        return res.status(400).json({ message: "Dados inválidos." });
    }

    const professor = await Professor.findByPk(id);

    if (!professor) {
        return res.status(404).json({ message: "Professor não encontrado." });
    }

    professor.nome = nome;
    professor.area_atuacao = area_atuacao;
    professor.email = email;
    await professor.save();

    return res.status(200).json(professor);
});

//Endpoint DELETE Professores
routes.delete('/professores/:id', async (req, res) => {
    const { id } = req.params;

    const professor = await Professor.findByPk(id);

    if (!professor) {
        return res.status(404).json({ message: "Professor não encontrado." });
    }

    await professor.destroy();

    return res.status(204).json({});
});

module.exports = routes
