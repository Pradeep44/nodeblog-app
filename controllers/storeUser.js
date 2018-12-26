const User = require('../database/models/User')


module.exports =(req,res) => {
   // console.log(req.body);
    User.create(req.body,(error, user) =>{
        if(error){
          //  console.log(Object.keys(error.errors).map ( keys =>error.errors[keys].message ));
          const registrationErrors = Object.keys(error.errors).map(keys => error.errors[keys].message);  
          //req.session.registrationErrors = registrationErrors;
          req.flash('registrationErrors', registrationErrors)
          req.flash('data',req.body);
          
          return res.redirect('/auth/register');
        }
        res.redirect('/');
    })
}