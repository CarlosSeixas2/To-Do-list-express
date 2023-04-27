const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('<h1>Minha Lista de Tarefas</h1>')
});

app.get('/json', (req, res) => {
    res.json({
        name: "Houston",
        task: "Arrumar a Casa",
        done: false
    });
})

app.listen(5000, () =>{
    console.log("Server Iniciado!")
});