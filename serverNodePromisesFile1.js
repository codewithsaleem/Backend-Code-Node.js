// let fs = require("fs");
// let fname = "./serverNodeFile1.txt";
// let readline = require("readline-sync");

// function getStat() {
//     let data = 0; // Set an initial value for data
//     fs.promises.writeFile(fname, data.toString())
//         .then(() => console.log(data))
//         .catch((err) => console.log(err));
// }

// function readStat() {
//     fs.promises.readFile(fname, "utf8")
//         .then((content) => console.log(content))
//         .catch((err) => console.log(err));
// }

// function add2() {
//     fs.promises.readFile(fname, "utf8")
//         .then((content) => {
//             let data = parseInt(content)
//             fs.promises.writeFile(fname, (data + 2).toString())
//                 .then(() => console.log(data))
//                 .catch((err) => console.log(err));
//         })
//         .catch((err) => console.log(err));
// }

// function add3() {
//     fs.promises.readFile(fname, "utf8")
//         .then((content) => {
//             let data = parseInt(content)
//             fs.promises.writeFile(fname, (data + 3).toString())
//                 .then(() => console.log(data))
//                 .catch((err) => console.log(err));
//         })
//         .catch((err) => console.log(err));
// }

// let option = readline.question("Enter 1:Create/Rese 2:Read 3:Add2 4:Add3...");
// switch (option) {
//     case "1": getStat(); break;
//     case "2": readStat(); break;
//     case "3": add2(); break;
//     case "4": add3(); break;
// }









// const fs = require("fs");
// const readline = require("readline-sync");

// const fname = "./serverFile.json";

// function getPoints() {
//     const points = [{ x: 2, y: 3 }, { x: -4, y: 10 }, { x: 0, y: 0 }, { x: 6, y: -1 }];
//     fs.promises.writeFile(fname, JSON.stringify(points))
//         .then(() => console.log("Points array created/reset : ", points))
//         .catch((err) => console.log(err));
// }

// function readPoints() {
//     fs.promises.readFile(fname, "utf8")
//         .then((content) => console.log(JSON.parse(content)))
//         .catch((err) => console.log(err));
// }

// function addPoint() {
//     const x = readline.question("Enter x coordinate: ");
//     const y = readline.question("Enter y coordinate: ");

//     fs.promises.readFile(fname, "utf8")
//         .then((content) => {
//             const points = JSON.parse(content);
//             const newPoint = { x: parseInt(x), y: parseInt(y) };
//             points.push(newPoint);

//             fs.promises.writeFile(fname, JSON.stringify(points))
//                 .then(() => console.log("Point added:", newPoint))
//                 .catch((err) => console.log(err));
//         })
//         .catch((err) => console.log(err));
// }

// let option = readline.question("Enter 1: Create/Reset 2: Read 3: Add a Point...");
// switch (option) {
//     case "1": getPoints(); break;
//     case "2": readPoints(); break;
//     case "3": addPoint(); break;
//     default: console.log("Invalid option");
// }





let express = require("express");
let app = express();
app.use(express.json());
let fs = require("fs");
let readline = require("readline-sync");
let fname = "./serverNodeJSON.json";
let customers = [
    { id: "DFI61", name: "Vishal", city: "Delhi", age: 27, gender: "Male", payment: "Credit Card" },
    { id: "JUW88", name: "Amit", city: "Noida", age: 49, gender: "Male", payment: "Debit Card" },
    { id: "KPW09", name: "Pradeep", city: "Gurgaon", age: 21, gender: "Male", payment: "Wallet" },
    { id: "ABR12", name: "Rohit", city: "Jaipur", age: 34, gender: "Male", payment: " Debit Card" },
    { id: "BR451", name: "Preeti", city: "Delhi", age: 29, gender: "Female", payment: "Credit Card" },
    { id: "MKR52", name: "Neha", city: "Noida", age: 42, gender: " Female ", payment: "Debit Card" },
    { id: "BTT66", name: "Swati", city: "Gurgaon", age: 24, gender: " Female ", payment: "Wallet" },
    { id: "CDP09", name: "Meghna", city: "Jaipur", age: 38, gender: " Female ", payment: " Debit Card" },
    { id: "KK562", name: "Irfan", city: "Delhi", age: 25, gender: "Male", payment: "Credit Card" },
    { id: "LPR34", name: "Gagan", city: "Noida", age: 51, gender: " Female ", payment: "Debit Card" },
    { id: "MQC11", name: "John", city: "Gurgaon", age: 24, gender: "Male", payment: "Wallet" },
    { id: "AXY22", name: "Gurmeet", city: "Jaipur", age: 31, gender: "Male", payment: " Debit Card" }
]

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


//Task2.3
app.get("/resetData", function (req, res) {
    let data = JSON.stringify(customers);
    fs.promises.writeFile(fname, data)
        .then(() => res.send("Data in file is reset!!!"))
        .catch((err) => res.status(404).send(err));
})
app.get("/customers", function (req, res) {
    fs.promises.readFile(fname, "utf8")
        .then((content) => {
            let data = JSON.parse(content);
            res.send(data);
        })
        .catch((err) => res.status(404).send(err));
})
app.post("/customers", function (req, res) {
    let body = req.body;

    fs.promises.readFile(fname, "utf8")
        .then((content) => {
            let data = JSON.parse(content);
            let newStudent = { ...body };
            data.push(newStudent);
            console.log(data)
            res.send(newStudent);
        })
        .catch((err) => res.status(500).send("Internal server error"))
});
app.put("/customers/:id", function (req, res) {
    const id = req.params.id;
    const body = req.body;

    fs.promises.readFile(fname, "utf8")
        .then((content) => {
            const data = JSON.parse(content);
            let index = data.findIndex((ele) => ele.id === id)
            if (index >= 0) {
                const updatedStudent = { id: id, ...body };
                data[index] = updatedStudent;
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
app.delete("/customers/:id", function (req, res) {
    const id = req.params.id;

    fs.promises.readFile(fname, "utf8")
        .then((content) => {
            const data = JSON.parse(content);
            let index = data.findIndex((ele) => ele.id === id)
            if (index >= 0) {
                const deletedCustomers = data.splice(index, 1);

                let data1 = JSON.stringify(customers);
                fs.promises.writeFile(fname, data1, "utf8")
                    .then(() => {
                        res.send(deletedCustomers);
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


