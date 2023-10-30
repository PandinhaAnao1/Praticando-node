import mongoose from "mongoose";

async function conectaNabaseDedados(){
    mongoose.connect("mongodb+srv://adim:adm123@cluster0.bbfhhi3.mongodb.net/?retryWrites=true&w=majority");
    return mongoose.connection;
};


export default conectaNabaseDedados;

