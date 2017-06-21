const express = require('express')
const app = express()
const mustache = require('mustache-express')
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs-extra')

app.engine('mustache', mustache())
app.set('view engine', 'mustache')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))

app.listen(3000, function(){
  console.log("GOOD TO GO!!");
})


const todos = ["Wash the car"]
for (var i = 0; i < todos.length; i++) {
  var task = todos[i]
}
const dones = ["Fix the sink"]
for (var i = 0; i < dones.length; i++) {
  var done = dones[i]
}

app.get('/index', function(req, res){

  res.render('index', {todos: todos,
  task: task,
  done: done})
})

app.post('/index', function(req, res){
  todos.push(req.body.todo)
  dones.push(req.body.task)

  res.redirect('/index')
})
