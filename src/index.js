import express from 'express'
const app = express()
const porta = 3000;
import conectaNabaseDedados from './config/dbConnect.js';
import filme from './models/filme.js';

app.use(express.json());
const conexao = conectaNabaseDedados();


app.get('/',async(req,res)=>{
    try{
        const filmes = await filme.find();
        res.status(200).send(filmes)
    }catch(erro){
        res.status(500).send(`Erro na requesição ${erro}`)
    }
});

app.get('/:id',async(res,req)=>{
    try{
        const indenficador = req.body.id;
        const bucado = await filme.findById(indenficador);
        res.status(204).json({
            mesage:"Filme encontrado com sucesso!",
            Filme:bucado
        });
    }catch(erro){
        res.status(500).json({
            mensaga:"Não foi possivel encontrar o _id: "+req.body.id,
            Error:erro

        });
    };
});

app.post('/', async(req,res)=>{
    try{
        const filmeAcadast = req.body;
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

app.put('/',async(req,res)=>{
    try{
        const dados = req.body;
        const atualizar = await filme.updateOne(req.body.id,dados);
        res.status(200).json({
            mensage:"Filme atualizado com sucesso",
            filme: dados
        });
    }catch(erro){
        res.status(500).json({
            mensage:"Não foi possivel atualizar o livro!!",
            Erro:erro
        });
    };
});

app.delete('/',async(req,res)=>{
    try{
        const corpo = req.body;
        const deletado = await filme.deleteOne(corpo);
        res.satus(200).json({
            mensage:"Filme deletado com sucesso",
            filme: dados
    });
    }catch(erro){
        res.status(500).json({
            mensage:"Não foi possivel deletar o livro!!",
            Erro:erro
        });
    };
});


app.listen(porta, ()=>{
    console.log('O servidor esta rodando na porta '+porta)
});