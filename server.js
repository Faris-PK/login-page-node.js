const express = require('express');
const app = express();
const path = require('path')
//const bodyparser = require('body-parser')
const session = require('express-session');
const {v4:uuid4} = require('uuid');
const router = require('./router');
const nocache = require('nocache')


const port = process.env.PORT||3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.set('view engine', 'ejs');

//load static asset

app.use('/static',express.static(path.join(__dirname,'public')));
//app.set('views', path.join(__dirname, 'views'));
app.use(nocache());
app.use(session({
    secret:uuid4(),
    resave:false,
    saveUninitialized:true
}))


app.use('/route',router);


//home route
app.get('/',(req,res)=>{
    
        res.render("base", { title: "Login system" });
    
})

app.listen(port,()=>console.log('server http://localhost:3000'))