const express = require('express');
const app= express();
const bodyParser = require('body-parser');
const port = 3000;


app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json({ extended: true }));
app.use(express.static('public'));



app.set('view engine', 'ejs');
const indexRoutes = require('./routes/index');
const error = require("./utilities/error");


app.use('/',indexRoutes)


app.get ("/",(req,res) => {
    res.send("Welcome to Node JS Project")
})

app.listen(port,() => {
    console.log("Server is running at port: " + port);
})