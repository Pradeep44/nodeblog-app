const bcrypt = require('bcrypt')
const User = require('../database/models/User')

module.exports =(req,res) =>{
    const {email,password} = req.body;
     //try to find user
    User.findOne({email:email },(error,user)=>{
        if(user){
    //compare user password
            bcrypt.compare(password,user.password,(error, same)=>{
             if (same) {
                 req.session.userId = user._id;//store user session 
                 res.redirect('/');
             }else{
                 res.redirect('/auth/login');
             }
            })
        }
        else{
            res.redirect('/auth/login');
        }
    })

    //if user password is correct,then login user
   
    //else redirect user back
    
}