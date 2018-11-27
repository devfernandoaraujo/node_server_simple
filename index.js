const express = require('express');

const app = express();

//Setting the server date
app.use((req,res,next)=> {

    res.setHeader('x-server-date', new Date());
    return Date();
});


//Creating routes
app.get('/',(req,res,next)=>{
    return res.send("Hello, I am a webserver!");
});

//Throw examples
app.get('/throw',(req,res,next)=>{
    throw new Error('Something is wrong.');
});

app.get('/next',(req,res,next)=>{
    setTimeout(()=>{
        //throw new Error('Something is wrong.');
        next(new Error('Something is wrong.'));
    },1000);
    //next(new Error('Something is wrong.'));
});
//End throw examples

app.get('/time',(req,res,next)=>{
    return res.send(new Date().toString());
});

app.get('/hello',(req,res,next)=>{
    if(!req.query.name){
        return res.status(400).end();
    }
    return res.send(`Hello ${req.query.name}`);
});

app.get('/user/:name',(req,res,next)=>{
    return res.send(`User prifile ${req.params.name}`)
});

app.listen(3000,function(){
    console.log("Server listening on port 3000");
});
