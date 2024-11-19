const express = require('express');
const router = express.Router();

const todos = require("../data/todos");
const users = require("../data/users");

const error = require("../utilities/error");


router.get("/users", (req, res) => {
    console.log(`Task with user listing.`);
    
    const { name, username, email } = req.query;

    let filteredUsers = Array.isArray(users) ? users : [];

    console.log(`inside users`);

    if (name) {
        filteredUsers = filteredUsers.filter((user) =>
            user.name.toLowerCase().includes(name.toLowerCase())
        );
    }
    if (username) {
        filteredUsers = filteredUsers.filter((user) =>
            user.username.toLowerCase().includes(username.toLowerCase())
        );
    }
    if (email) {
        filteredUsers = filteredUsers.filter((user) =>
            user.email.toLowerCase().includes(email.toLowerCase())
        );
    }

    res.render("users", { users: filteredUsers });
});

router.get("/todo", (req,res) => {
    console.log(`Task with todo listing.`);
    res.render("index", {todos})
})


router.get("/new", (req, res) => {
    res.render("new")
})

router.post("/new", (req , res) => {
    const body = req.body
    const newTask = {
        id: todos.length +1,
        task: body.todo
    }
        todos.push(newTask)

    console.log({body})
    res.redirect("/todo")
})

router.get("/edit/:id", (req, res) => {
    const params = req.params
    const todoData  = todos.filter(todo => todo.id == params.id)
    res.render("edit", {todo:todoData[0]})
})

router.get("/delete/:id", (req, res) => {
    const params = req.params
    const todoData  = todos.filter(todo => todo.id == params.id)
    res.render("delete", {todo:todoData[0]})
})

router.post("/edit/:id", (req, res) => {
    const params = req.params
    const body = req.body
    const index  = todos.findIndex(el => el.id == params.id)
    console.log({index})
    if(index != -1){
        todos[index].task = body.todo
        console.log(`Edited task with ID: ${id}`);
    }
    else{
        console.log(`Task with ID: ${id} not found.`);
    }
    res.redirect("/todo")
})

router.post("/delete/:id", (req, res) => {
    const { id } = req.params;
    const index = todos.findIndex(el => el.id == id); 

    if (index !== -1) {
        todos.splice(index, 1); 
        console.log(`Deleted task with ID: ${id}`);
    } else {
        console.log(`Task with ID: ${id} not found.`);
    }

    res.redirect("/todo"); 
});




module.exports = router