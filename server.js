const app = require('./src/index.js');

const porta = 3036;
app.listen(porta,()=>{
    console.log('Estou ovindo na porta '+porta);
})
