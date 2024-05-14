const User = require('../models/user')
// const {isLoggedIn, ValidateCamp, isAuthor} = require('../middleware');

module.exports.renderReg = async (req,res)=>{
    const allUsers = await User.find({}).populate()
    // console.log(allUsers)
    res.send({users : allUsers});
    // res.send({express:'./Users/register'});
}
module.exports.renderUser = async (req,res)=>{
    const user = await User.findById(req.body.id).populate({path:'issues'}).populate({path:'contributed'});
    // console.log(req.body);
    // console.log(user);
    res.send({user : user});
}
module.exports.renderProf = async (req,res)=>{
    const name = req.body.name.replace("%20", " ");
    const user = await User.findOne({username:name}).populate({path:'issues'}).populate({path:'contributed'});
    // console.log(user);
    // console.log(name);
    // console.log("prof");
    res.send({user : user});
}
module.exports.renderGUser = async (req,res)=>{
    // console.log("query is", req.query);
    // console.log(String(req.query.gid));
    const GUser = await User.findOne({googleId:req.query.gid})
    // console.log(allUsers)
    // if(allUsers.length>0) res.send({user : allUsers[0]});
    // else res.send({user : []});
    res.send({user : GUser});
    // res.send({express:'./Users/register'});
}

module.exports.Register = async (req,res)=>{
    // console.log("Register");
    try{
    const {username,password,desk} = req.body;
    // console.log(req.body)
    const user = new User({username, desk, contributed:[],issues:[]});
    const registeredUser = await User.register(user,password);
    console.log("Logged")
    req.login(registeredUser,err=>{
        // console.log("user: ",req.user)
        if(err) return next(err);
        // req.flash('success',`Welcome to social media ${username}!`);
        // console.log(req)
        // console.log(req.loggedInUser)
        res.json({log: true, loggedInUser : req.user})
        // res.redirect('/Threads');
    })    
}
catch(e){
    console.log(e)
    console.log("failure")
    // req.flash('error',e.message);
    res.send({log: false, loggedInUser : false})
    // res.redirect('/register')
}
}

module.exports.renderLogin = (req,res)=>{
    // res.render('./users/login');
}

module.exports.login = async (req,res)=>{
    // console.log("Succesfully in")
    // req.flash('success',`Welcome back, ${req.body.username}`)
    const redUrl = req.session.returnTo || '/threads'
    delete req.session.returnTo;
    res.json({log:true, loggedInUser : req.user})
    // res.redirect(redUrl)
}

module.exports.googleLogin = async (req,res)=>{
    // console.log("Succesfully in")
    // req.flash('success',`Welcome back, ${req.body.username}`)
    const redUrl = req.session.returnTo || '/threads'
    delete req.session.returnTo;
    res.json({log:true, loggedInUser : req.user})
    // res.redirect(redUrl)
}

module.exports.logout = (req,res)=>{
    req.logout();
    // req.flash('success', 'Successfully logged out')
    res.send({loggedInUser : req.loggedInUser})
} 