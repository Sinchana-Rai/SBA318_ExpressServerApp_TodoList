const express = require('express');
const router = express.Router();

const todos = [ {
    "id": '1', "task": "Buy Groceries"
}]

router.get("/todo", (req,res) => {
    res.send("Todo list Accessed")
 
})

module.exports = router