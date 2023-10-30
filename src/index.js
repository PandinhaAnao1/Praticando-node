const express = require('express')
const app = express()

app.get('/',(req,res)=>{
    res.send('Voce realizou um get na rota /')
});

export default app;