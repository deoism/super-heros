const http = require('http');
const express = require('express');
const fs = require("fs");
const hostname = "localhost";
const port = 3000;
const app = express();

const handlebars = require("express-handlebars")
.create({ defaultLayout: 'main' });

app.engine('handlebars', handlebars.engine);

app.set('view engine', 'handlebars');

app.set('port',process.env.PORT || 3000);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
    // Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
    // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
    console.log(__dirname+ '/index.html');
  
  })
  app.get('/begining', (req, res) => {
    res.sendFile(__dirname + '/begining.html')
    // Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
    // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
  
  })
    app.get('/middle', (req, res) => {
    res.sendFile(__dirname + '/middle.html')
    // Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
    // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
  
  })
    app.get('/end', (req, res) => {
    res.sendFile(__dirname + '/end.html')
    // Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
    // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
  
  })
     console.log(__dirname);

app.get('/home', (request, response) => {
    response.render('layouts/home');
});

app.get('/about', (request, response) => {
    response.render('layouts/about');
}); 

app.use((request, response) => {
    response.status(404);
    response.render('layouts/404');
});



app.listen(app.get("port"),()=>{
    console.log(
        "Express started on http://localhost:" +
        app.get("port") +
        "; press Ctrl-C to terminate. "
    );
});
  