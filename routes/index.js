const express = require('express');
const router = express.Router();

const todos = require("../data/todos");

const error = require("../utilities/error");

router.get("/todo", (req,res) => {
    // res.send("Todo list Accessed")
    console.log("Todos:", todos);
    // res.json(todos)
    res.render("index", {todos})

})



module.exports = router