// require express for setting up the express server
const express = require('express');

// require path
const path = require('path');

// using express
const app = express();

// set up the port number
const port = 8000;

    // importing the DataBase
const db = require('./config/mongoose');

// importng the Schema For tasks
const  Task  = require('./models/todo');

//set up the view engine
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));

// to use encrypted data
app.use(express.urlencoded())

// using static files
app.use(express.static('assets')); 


// use for local server without database
// var todolist = [

// {
//     description: "this is my first task",
//     category: "Personal",
//     date: "12/02/2022"
// },
// {
//     description: "this is my first task",
//     category: "Personal",
//     date: "12/02/2022"
// },
// {
//     description: "this is my first task",
//     category: "Personal",
//     date: "12/02/2022"
// },
// {
//     description: "this is my first task",
//     category: "Personal",
//     date: "12/02/2022"
// },
// {
//     description: "this is my first task",
//     category: "Personal",
//     date: "12/02/2022"
// },

// ]


// rendering the App Page
app.get('/',function(req,res){
Task.find({}, function(err, task){
    if(err){
        console.log('Error in fetching tasks from db');
        return;
    }

    return res.render('home', {
        title: "TODO App",
        todo_list: task
    });
}
)});

// creating Tasks
app.post('/create-todo',function(req,res){ 
    Task.create({
        description: req.body.description,
        category: req.body.category,
        date: req.body.date
        }, function(err, newtask){
        if(err){console.log('error in creating task', err); return;}
    
        return res.redirect('back');

    });
});


// deleting Tasks
app.get('/delete-tasks', function(req, res){
    // get the id from query
    var id = req.query;

    // checking the number of tasks selected to delete
    var count = Object.keys(id).length;
    for(let i=0; i < count ; i++){
        
        // finding and deleting tasks from the DB one by one using id
        Task.findByIdAndDelete(Object.keys(id)[i], function(err){
        if(err){
            console.log('error in deleting task');
            }
        })
    }
    return res.redirect('back'); 
});


// make the app to listen on asigned port number
app.listen(port , function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
    }

    console.log(`Server is running on port : ${port}`);
})