module.exports = (req,res) => {
   console.log(req.session.registrationErrors);
    res.render('register',{
        errors : req.flash('registrationErrors'), //req.session.registrationErrors
        data: req.flash('data')[0]
    });
}