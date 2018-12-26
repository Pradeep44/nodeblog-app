const mongoose = require('mongoose');

const Post = require('./database/models/Post')

mongoose.connect('mongodb://localhost/node-js-test-blog')

// Post.find({},(error, posts)=>{
//     console.log(error,posts);
// })

// Post.findById("5c138c85223f1515e09f1a16",(error, posts)=>{
//     console.log(error,posts);
// })

Post.findByIdAndUpdate("5c138c85223f1515e09f1a16",{
    title:'This is updated title.'
},(error,post)=>{
    console.log(error,post);
})
// Post.create({
//     title:'My second blog post',
//     description:'Blog post Descr is foonna samama',
//     content:'This is content second of thr new post recently updated.'
// },(error, post)=>{
//     console.log(error, post)
// })