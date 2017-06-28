const express = require('express')
const app = express()
const mustache = require('mustache-express')
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs-extra')
const models = require('./models')

app.engine('mustache', mustache())
app.set('view engine', 'mustache')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))

app.listen(3000, function(){
  console.log("GOOD TO GO!!");
})

app.get('/', function(req, res){
  models.Task.findAll({where:{completed:false}})
    .then(function(tasks2){
      var incompleteTasks = tasks2
      models.Task.findAll({where:{completed:true}})
      .then(function(tasks3){
        var completedTasks = tasks3
        res.render('index', {tasks: incompleteTasks,
                completedTasks: completedTasks})
      })
  })
})
app.post('/complete', function (req, res){
    models.Task.findOne({
        where:{name: req.body.done}
            }).then( function(task){
                task.update({completed: true})
                    }).then( function(){
                        res.redirect('/')
        })

});
app.post('/delete', function (req, res){
    models.Task.findAll({
        where: {completed: true}
    }).then( function(tasks){
        for (var i = 0; i < tasks.length; i++){
            tasks[i].destroy()
        }
    })
    res.redirect('/')
});

app.post('/', function(req, res){
    var task = models.Task.build({
        name: req.body.task,
        completed: false
    });
    task.save()
    res.redirect('/')

});
// app.post('/', function(req, res){
//     var task = models.Task.build({
//       name: req.body.task,
//       completed: false
//     })
// })
//
// app.post('/complete', function(req, res){
//     models.Task.findOne({
//       where: {name: req.body.done}
//     }).then( function(task){
//       task.update({completed:true})
//     }).then(function(){
//       res.redirect('/')
// })
//
// app.post('/delete', function(req, res){
//   models.Task.findAll({where:{compelted:true}})
//     .then(function(tasks){
//       for (var i = 0; i < tasks.length; i++) {
//         tasks[i].destroy().then(function(){
//             res.redirect('/')
//           })
//         }
// })
