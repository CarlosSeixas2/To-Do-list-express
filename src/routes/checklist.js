const express = require('express');

const router = express.Router();

const Checklist = require('../models/checklist');

router.get('/', async(req, res) => {
    try {
        let checklist = await Checklist.find({});
        // res.status(200).json(checklist);
        res.status(200).render('checklists/index', { checklists: checklist });
    } catch (error) {
        // res.status(422).json(error);
        res.status(200).render('pages/error', { error: "Erro ao exibir as Listas" });
    }
});

router.post('/', async(req, res) => {
    let { name } = req.body.checklist;
    // let checklist = new Checklist({name})

    try {
        let checklist = await Checklist.create({ name })
        // res.status(200).json(checklist);
        res.redirect('/checklists');
    } catch (error) {
    //    res.status(422).json(error);
        res.status(422).render('checklists/new', { checklists: {... checklist, error}});
    }

});

router.get('/new', async(req, res) => {
    try {
        let checklist = new Checklist();
        res.status(200).render('checklists/new', {checklists: checklist});
    } catch (error) {
        res.status(500).render('pages/error', { errors: 'Erro ao carregar o Formulário'});
    }
});

router.get('/:id/edit', async(req, res) => {
    try {
        let checklist = await Checklist.findById(req.params.id);
        res.status(200).render('checklists/edit', {checklist: checklist});
    } catch (error) {
        res.status(500).render('pages/error', { error: 'Erro ao exibir a edição das tarefas'});
    }
});

router.get('/:id', async(req, res) => {
    try {
        let checklist = await Checklist.findById(req.params.id).populate('tasks');
        // res.status(200).json(checklist);
        res.status(200).render('checklists/show', { checklists: checklist });
    } catch (error) {
        // res.status(422).json(error);
        res.status(200).render('pages/error', { error: "Erro ao exibir as Listas de Tarefas" });
    }
});

router.put('/:id', async(req, res) => {
    let { name } = req.body.checklist;
    let checklist = await Checklist.findById(req.params.id);
    
    try {
        //Esse New: True é para retornar o objeto já atualizado
        await checklist.updateOne({ name });
        res.redirect('/checklists');
    } catch (error) {
        let errors = error.errors;
        res.status(422).render('checklists/edit', {checklists: {...checklist, errors}});
    }
});

router.delete('/:id', async(req, res) => {
    try {
        let checklist = await Checklist.findByIdAndRemove(req.params.id);
        res.redirect('/checklists')
    } catch (error) {
        res.status(200).render('pages/error', { error: "Erro ao deletar a Listas de Tarefas" });
    }
});

module.exports = router;