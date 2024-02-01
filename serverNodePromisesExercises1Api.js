let express = require("express");
let app = express();
app.use(express.json());
let fs = require("fs");
let readline = require("readline-sync");
let fname = "./serverNodeJSON.json";
let courseData = {
    course: "Node.js",
    students: [
        { name: "Jack", age: 25 },
        { name: "Steve", age: 26 },
        { name: "Anna", age: 27 },
    ]
}

app.use(function (req, res, next) {
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

//Task1.1 e(1)
app.get("/svr/resetData", function (req, res) {
    let data = JSON.stringify(courseData);
    fs.promises.writeFile(fname, data)
        .then(() => res.send("Data in file is reset!!!"))
        .catch((err) => res.status(404).send(err));
})

//Task1.1 e(2)
app.get("/svr/students", function (req, res) {
    fs.promises.readFile(fname, "utf8")
        .then((content) => {
            let data = JSON.parse(content);
            res.send(data);
        })
        .catch((err) => res.status(404).send(err));
})

//Task1.1 e(3)
app.get("/svr/students/:id", function (req, res) {
    let id = +req.params.id;

    fs.promises.readFile(fname, "utf8")
        .then((content) => {
            let data = JSON.parse(content);
            if (id <= data.students.length && id > 0) {
                res.send(data.students[id - 1]);
            } else {
                res.status(404).send("No such students found to thid id")
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Internal Server Error");
        });
});

//Task1.1 e(4)
app.get("/svr/students/course/:name", function (req, res) {
    let name = req.params.name;

    fs.promises.readFile(fname, "utf8")
        .then((content) => {
            let data = JSON.parse(content);
            let filt = data.course === name;
            if (filt) {
                res.send(data.course);
            } else {
                res.status(404).send("No such courses found to this name")
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Internal Server Error");
        });
});

//Task1.1 e(5)
app.post("/svr/students", function (req, res) {
    let body = req.body;

    fs.promises.readFile(fname, "utf8")
        .then((content) => {
            let data = JSON.parse(content);
            let newStudent = { ...body };
            data.students.push(newStudent);
            console.log(data)
            res.send(newStudent);
        })
        .catch((err) => res.status(500).send("IInternal server error"))
});

//Task1.1 e(6)
app.put("/svr/students/:id", function (req, res) {
    const id = +req.params.id;
    const body = req.body;

    fs.promises.readFile(fname, "utf8")
        .then((content) => {
            const data = JSON.parse(content);
            if (id <= data.students.length && id > 0) {
                const updatedStudent = { ...data.students[id - 1], ...body };
                data.students[id - 1] = updatedStudent;
                console.log(data)
                fs.promises.writeFile(fname, JSON.stringify(data), "utf8")
                    .then(() => {
                        res.send(updatedStudent);
                    })
                    .catch((writeErr) => {
                        console.error(writeErr);
                        res.status(500).send("Error writing to file");
                    });
            } else {
                res.status(404).send("No such student found for this id");
            }
        })
        .catch((readErr) => {
            console.error(readErr);
            res.status(500).send("Internal Server Error");
        });
});

//Task1.1 e(7)
app.delete("/svr/students/:id", function (req, res) {
    const id = +req.params.id;

    fs.promises.readFile(fname, "utf8")
        .then((content) => {
            const data = JSON.parse(content);
            if (id <= data.students.length && id > 0) {
                const updatedStudent = data.students.splice(id - 1, 1);
                console.log(updatedStudent)
                fs.promises.writeFile(fname, JSON.stringify(data), "utf8")
                    .then(() => {
                        res.send(updatedStudent);
                    })
                    .catch((writeErr) => {
                        console.error(writeErr);
                        res.status(500).send("Error writing to file");
                    });
            } else {
                res.status(404).send("No such student found for this id");
            }
        })
        .catch((readErr) => {
            console.error(readErr);
            res.status(500).send("Internal Server Error");
        });
});

