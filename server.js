const express = require('express');
const app= express();
const bodyParser = require('body-parser');
const port = 3000;


app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json({ extended: true }));
app.use(express.static('public'));



app.set('view engine', 'ejs');
const indexRoutes = require('./routes/index');
const activity = require("./routes/activity");
const error = require("./utilities/error");


app.use('/',indexRoutes)
app.use('/activity',activity)


app.get ("/",(req,res) => {
    res.send("Welcome to Node JS Project")
})

app.use((req, res, next) => {
    next(error(404, "Resource Not Found"));
  });
  

  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ error: err.message });
  });

app.listen(port,() => {
    console.log(`Server listening on port: ${port}.`);
})