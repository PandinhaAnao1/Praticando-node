//Importa o mongoose
import mongoose from "mongoose";

//Modelo de documento para o mongo
const filmeSchema = new mongoose.Schema({
    id:{type:mongoose.Schema.Types.ObjectId},
    titulo:{type:String,required:true},
    duracao:{type:Number},
    Idademin:{type:Number}
    },
    {
        versionKey:false
    }
    );


//Cria um modelo para ser usado no banco de dados
const filme = mongoose.model("filmes",filmeSchema);

//exporta o dado filme
export default filme;
