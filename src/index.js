//Importa o express
import express from 'express'

//Cria um instancia do express
const app = express()

//Porta
const porta = 3000;

//Busca modulo que conecta na base de dados
import conectaNabaseDedados from './config/dbConnect.js';

//Busca modelo Schema do banco
import filme from './models/filme.js';

//Midleware
app.use(express.json());

//Cria conecxão entre a api e o banco de dados
const conexao = conectaNabaseDedados();


//Busca todos os Filme 
app.get('/',async(req,res)=>{
    try{
        const filmes = await filme.find();
        res.status(200).send(filmes)
    }catch(erro){
        res.status(500).send(`Erro na requesição ${erro}`)
    }
});

//Lista filme por id 
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

//Casdastra filme
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

//Atualizar Filme
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

//Deleta filme
app.delete('/',async(req,res)=>{
    try{   
        const ide = req.body._id; 
        const autorDeletado = await filme.findByIdAndDelete(ide);
        res.status(200).json({autorDeletado});
    }catch (erro){
        res.status(500).json({
        mensage:`${erro.mensage} falha na requisição!`
            });
        }
});

//Disponibiliza o server
app.listen(porta, ()=>{
    console.log('O servidor esta rodando na porta '+porta)
});