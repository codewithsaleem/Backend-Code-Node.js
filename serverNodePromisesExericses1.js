const { json } = require("body-parser");
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

function writeJson() {
    let data = JSON.stringify(courseData);
    fs.promises.writeFile(fname, data)
        .then(() => console.log("Write success"))
        .catch((err) => console.log(err));
}

function enrollNewStudent() {
    let name = readline.question("Enter the name of student : ")
    let age = readline.question("Enter the age : ")
    let newStudent = { name: name, age: age };
    fs.promises.readFile(fname, "utf8")
        .then((data) => {
            let obj = JSON.parse(data);
            obj.students.push(newStudent);
            let data1 = JSON.stringify(obj);
            fs.promises.writeFile(fname, data1)
                .then(() => console.log("New Student enrolled"))
        })
        .catch((err) => console.log(err))
}

function readJSON() {
    fs.promises.readFile(fname, "utf8")
        .then((data) => {
            console.log("In string format : ", data);
            let obj = JSON.parse(data);
            console.log(obj)
        })
        .catch((err) => console.log(err))
}

let option = readline.question("Enter Option 1:Write 2:Enroll Student 3:Read ....")
switch (option) {
    case "1": writeJson(); break;
    case "2": enrollNewStudent(); break;
    case "3": readJSON(); break;
}