const express = require('express');
const router = express.Router();
const session = require("express-session");
const credential = {
    email: "faripk369@gmail.com",
    password: "12345"
};

// Login user
router.post('/login', (req, res) => {
    if (req.body.email == credential.email && req.body.password == credential.password) {
        req.session.user = req.body.email;
        res.redirect('/route/dashboard'); // Redirect to the dashboard route
    } else {
        if(req.body.email != credential.email){
            res.render('base', { message: "Enter a valid mail" });}
            else if(req.body.password != credential.password){
                res.render('base', { message: "Enter a valid password" });
            }
    }
});

// Route for dashboard
router.get('/dashboard', (req,res) => {
    if (req.session.user) {
        res.render('dashboard',{user:req.session.user});
    } else {
        res.render("base")
    }
});

//route for logout

router.get('/logout',(req,res)=>{
   req.session.destroy((err)=>{
    if(err){
        res.send('error')
    }else{
        res.render('base',{title:"Express",logout:"Logout Successfully"})
    }
   }) 
})

module.exports = router;
