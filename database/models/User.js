const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username : {
        type:String,
        required: [true , 'Please provide your username']
    },
    email : {
        type: String,
        required:  [true,'Please provide your email'],
        unique: true
    },
    password:{
        type:String,
        required:[true,'Please provide your password']
    } 
})

UserSchema.pre('save',function(next){
    const user = this;
   // console.log(user);

    bcrypt.hash(user.password, 10,(error, encrypted)=> {
        user.password = encrypted;
     //   console.log(user.password);
        next();
    })
})



module.exports = mongoose.model('User',UserSchema)