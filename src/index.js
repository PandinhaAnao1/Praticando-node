import express from 'express'
const app = express()
const porta = 5000;
import conectaNabaseDedados from './config/dbConnect.js';
import filme from './models/filme.js';

const conexao = conectaNabaseDedados();


app.get('/',async(req,res)=>{
    try{
        const filmes = await filme.find();
        res.status(200).send(filmes)
    }catch(erro){
        res.status(500).send(`Erro na requesição ${erro}`)
    }
});

app.post('/', async(req,res)=>{
    try{
        const novFilm =  req
        const filmeAcadast = {...novFilm};
        console.log(novFilm)
        const criado = await filme.create(filmeAcadast);
          res.status(200).json({
            mensage:"Filme cadastrado com sucesso",
            filme: criado
        });
    }catch(erro){
        res.status(500).json({
            mensage:"Não foi possivel cadastrar o livro!!",
            Erro:erro
        });
    };

});
app.listen(porta, ()=>{
    console.log('O servidor esta rodando na porta '+porta)
});