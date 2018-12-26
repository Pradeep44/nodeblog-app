const express = require('express');
//const path = require('path');
const mongoose = require('mongoose');
const expressEdge = require('express-edge');
const bodyParser = require('body-parser');
//const Post = require('./database/models/Post')
const fileUpload = require('express-fileupload');
const expressSession = require('express-session');
const connectMongo = require('connect-mongo');
const connectFLash = require('connect-flash');
const edge = require('edge.js');


const createPostController = require('./controllers/createPost')
const homePageController = require('./controllers/homePage')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const createUserController = require('./controllers/createUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');
const logoutController = require('./controllers/logout');



const app = new express();
mongoose.connect(process.env.DB_URI)

const validateCreatePostMiddleware = require('./middleware/storePost')
const mongoStore = connectMongo(expressSession);
const auth = require('./middleware/auth');
const redirectIfAuthenticated= require('./middleware/redirectIfAuthenticated');

app.use(express.static('public'));
app.use(expressEdge);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload());
app.use(expressSession({
    secret : process.env.EXPRESS_SESSION_KEY,
    store: new mongoStore({
        mongooseConnection : mongoose.connection
    })
}))
app.use(connectFLash());
app.use('*', (req, res, next)=>{
    edge.global('auth', req.session.userId);
    next();
})




//app.use('/posts/store',validateCreatePostMiddleware);
//app.use('/posts/new', auth);

app.set('views',`${__dirname}/views`);

app.get('/',homePageController);

// app.get('/about',(req,res)=>{
//         res.render('about');
//     // res.sendFile(path.resolve(__dirname, 'pages/about.html'));
// })

app.get('/post/:id',getPostController
    //res.sendFile(path.resolve(__dirname, 'pages/post.html'));
    )

app.get('/posts/new', auth, createPostController);

// app.get('/contact',(req,res)=>{
//    res.render('contact');
//     // res.sendFile(path.resolve(__dirname, 'pages/contact.html'));
// })

app.post('/posts/store', auth, validateCreatePostMiddleware,storePostController);
app.get('/auth/login',redirectIfAuthenticated,loginController);
app.post('/users/login' ,redirectIfAuthenticated,loginUserController);
app.post('/users/register', redirectIfAuthenticated,storeUserController);
app.get('/auth/register', redirectIfAuthenticated,createUserController);
app.get('/auth/logout' , auth, logoutController);
app.use((req,res)=>{ res.render('not-found')});


app.listen(4000, ()=>{
    console.log('Listening on port 4000');
})