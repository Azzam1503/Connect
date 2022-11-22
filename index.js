const express = require('express');
const cookieParser = require('cookie-parser');
const port = 8000;
const expressLayout = require('express-ejs-layouts');
const app = express();
const db = require('./config/mongoose');

//Used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-startegy');
const MongoStore = require('connect-mongo');


// app.use(sassMiddleware({
//     src: './assets/scss',
//     dest: './assets/css',
//     debug: true,
//     outputStyle: 'extended',
//     prefix: '/css'
// }));


app.use(express.urlencoded());  
app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayout);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


//Setup the view Engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name: "Connect",
    //Todo change the secret before the deployment
    secret: "Blah something",
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000*60*100)
    },
    store: MongoStore.create({
        mongoUrl: "mongodb://127.0.0.1:27017/codeial_db",
        autoRemove: 'disabled'
    },
    function(err){
        console.log(err || "connect-mongodb setup ok");
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);


// Use express Router
app.use('/', require('./routes'));
 
app.listen(port, function(err){
    if(err){
        console.log(`Error: ${err}`);
    }

    console.log(`Connected with the server: ${port}`)
})