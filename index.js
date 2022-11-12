const express = require('express');
const port = 8000;

const app = express();

// Use express Router
app.use('/', require('./routes'));

//Setup the view Engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function(err){
    if(err){
        console.log(`Error: ${err}`);
    }

    console.log(`Connected with the server: ${port}`)
})