let express = require("express");
let app = express();
app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELTE, HEAD",
    )
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Control-Type, Accept"
    )
    next();
})

const port = 2410;
app.listen(port, () => console.log(`Node app listening on port ${port}`));

let {students} = require("./serverStudentsData.js");

let fs = require("fs");
let fname = "serverStudentsDataJSON.json";

app.get("/svr/resetData", function(req, res) {
   let data = JSON.stringify(students);
   fs.writeFile(fname, data, function(err) {
    if (err) res.status(404).send(err);
    else res.send("Data in file is reset")
   })
});

app.get("/svr/students", function(req, res) {
    fs.readFile(fname, "utf8", function(err, content) {
        if (err) res.status(404).send(err);
        else {
            let studentsArray = JSON.parse(content)
            res.send(studentsArray)
        }
    })
})

app.get("/svr/students/:id", function(req, res) {
    let id = +req.params.id;
    fs.readFile(fname, "utf8", function(err, content) {
        if (err) res.status(404).send(err);
        else {
            let studentsArray = JSON.parse(content);
            let student = studentsArray.find((ele) => ele.id === id);
            if (student){
                res.send(student);
            } else{
                res.status(404).send("No Student found!");
            }
        }
    })
})

app.get("/svr/students/course/:name", function(req, res) {
    let name = req.params.name;
    fs.readFile(fname, "utf8", function(err, content) {
        if (err) res.status(404).send(err);
        else {
            let studentsArray = JSON.parse(content);
            let filterStudents = studentsArray.filter((ele) => ele.course === name);
            if(filterStudents){
                res.send(filterStudents);
            }else{
                res.status(404).send("No Filter found!");
            }
        }
    })
});

app.post("/svr/students", function(req, res) {
    let body = req.body;
    fs.readFile(fname, "utf8", function(err, content) {
        if (err) res.status(404).send(err);
        else {
            let studentsArray = JSON.parse(content);
            let maxId = studentsArray.reduce((acc, curr) => (curr.id > 0 ? curr.id : acc), 0);
            let newId = maxId + 1;
            let newStudent = {...body, id:newId};
            students.push(newStudent);
            let data1 = JSON.stringify(students);
            fs.writeFile(fname, data1, function(err) {
                if(err) res.status(404).send(err);
                else res.send(newStudent);
            })
        }
    })
})

app.put("/svr/students/:id", function(req, res) {
    let body = req.body;
    let id = +req.params.id;
    fs.readFile(fname, "utf8", function(err, content) {
        if (err) res.status(404).send(err);
        else {
            let studentsArray = JSON.parse(content);
            let index = studentsArray.findIndex((ele) => ele.id === id);
            if (index>=0){
                let updatedStudent = {...students[index], ...body};
                students[index] = updatedStudent;
                let data1 = JSON.stringify(students);
                fs.writeFile(fname, data1, function(err) {
                    if (err) res.status(404).send(err);
                    else{
                       res.send(updatedStudent);
                    }
                })
            } else{
                res.status(404).send("No Student found!");
            }
        }
    })
})


app.delete("/svr/students/:id", function(req, res) {
    let id = +req.params.id;
    fs.readFile(fname, "utf8", function(err, content) {
        if (err) res.status(404).send(err);
        else {
            let studentsArray = JSON.parse(content);
            let index = studentsArray.findIndex((ele) => ele.id === id);
            if (index>=0){
                let updatedStudent = students.splice(index, 1);
                students[index] = updatedStudent;
                let data1 = JSON.stringify(students);
                fs.writeFile(fname, data1, function(err) {
                    if (err) res.status(404).send(err);
                    else{
                       res.send(updatedStudent);
                    }
                })
            } else{
                res.status(404).send("No Student found!");
            }
        }
    })
})
