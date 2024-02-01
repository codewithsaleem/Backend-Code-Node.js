// let fs = require("fs");

// async function readStat(filename) {
//     try {
//         let data = await fs.promises.readFile(filename, "utf8");
//         console.log(data);
//     } catch (err) {
//         console.log(err)
//     }
// }
// async function writeStat(filename, txt) {
//     try {
//         await fs.promises.writeFile(filename, txt);
//         console.log("write success");
//     } catch (err) {
//         console.log(err);
//     }
// }
// async function getStat(filename) {
//     try{
//         let status = await fs.promises.stat(filename);
//         console.log(status);
//     }catch(err) {
//         console.log(err);
//     }
// }
// async function checkAccess(filename) {
//     try{
//         await fs.promises.access(filename);
//         console.log("File Exists");
//     }catch(err) {
//         console.log("File doesn't Exists");
//     }
// }
// async function appendStat(filename, txt) {
//     try {
//         fs.promises.appendFile(filename, txt);
//         console.log("append success");
//     } catch (err) {
//         console.log(err);
//     }
// }

// let fname = "./serverNodeFile.txt";
// readStat(fname);
// // writeStat(fname, "pqrst");
// // getStat(fname);
// // checkAccess(fname);
// // appendStat(fname, "samjam");






// //Task3.1(b)
// let fs = require("fs");
// let readLine = require("readline-sync");
// let fname = "./serverNodeFile.txt";

// let txt = readLine.question("Enter text to be appended : ");

// async function getAppend(fname, txt) {
//     try {
//         await fs.promises.appendFile(fname, txt);
//         console.log("Append success!!!");
//         let data = await fs.promises.readFile(fname, "utf8")
//         console.log(data)
//     } catch (err) {
//         console.log(err);
//     }
// }

// getAppend(fname, txt);







// //Task3.1(c)
// let fs = require("fs");
// let readLine = require("readline-sync");
// let fname = readLine.question("Enter file to be appended : ");
// let txt = readLine.question("Enter text to be appended : ");

// async function getAppend(fname, txt) {
//     try {
//         await fs.promises.access(fname);
//         console.log("File exists!!!");
//         try {
//             let data = await fs.promises.readFile(fname, "utf8")
//             console.log("Before appended :: ", data)

//             await fs.promises.appendFile(fname, txt);
//             console.log("Append success!!!");
//             let data1 = await fs.promises.readFile(fname, "utf8")
//             console.log("After appended :: ", data1)
//         } catch (err) {
//             console.log(err)
//         }
//     } catch (err) {
//         await fs.promises.writeFile(fname, txt);
//         console.log("Write success!!!");
//         let data2 = await fs.promises.readFile(fname, "utf8")
//         console.log(data2)
//     }
// }

// getAppend(fname, txt);





// //Task3.1(d)
// let fs = require("fs");
// let readline = require("readline-sync");
// let fname = "./serverNodeJSON.json";
// let courseData = {
//     course: "Node.js",
//     students: [
//         { name: "Jack", age: 25 },
//         { name: "Steve", age: 26 },
//         { name: "Anna", age: 27 },
//     ]
// }

// async function writeJson() {
//     try {
//         let str = JSON.stringify(courseData);
//         await fs.promises.writeFile(fname, str);
//         console.log("written success");
//     } catch (err) {
//         console.log(err);
//     }
// }
// async function enrollNewStudent() {
//     let name = readline.question("Enter name of the student : ");
//     let age = readline.question("Enter age of the student : ");
//     let newStudent = { name, age };

//     try {
//         let data1 = await fs.promises.readFile(fname, "utf8");
//         let obj = JSON.parse(data1);
//         obj.students.push(newStudent);

//         let data2 = JSON.stringify(obj);
//         await fs.promises.writeFile(fname, data2);
//         console.log("student enrolled");
//     } catch (err) {
//         console.log(err);
//     }
// }
// async function readJson() {
//     try{
//         let data3 = await fs.promises.readFile(fname, "utf8");
//         let obj = JSON.parse(data3);
//         console.log(obj);
//     }catch(err) {
//         console.log(err);
//     }
// }

// let option = readline.question("Enter 1:Reset 2:Enroll new student 3:Read...");
// switch(option) {
//     case "1" : writeJson(); break;
//     case "2" : enrollNewStudent(); break;
//     case "3" : readJson(); break;
// }




// //Task3.1(e)
// //(i)
// let express = require("express");
// let fs = require("fs");
// let app = express();
// app.use(express.json());
// let fname = "./serverNodeJSON.json";
// let courseData = {
//     course: "Node.js",
//     students: [
//         { name: "Jack", age: 25 },
//         { name: "Steve", age: 26 },
//         { name: "Anna", age: 27 },
//     ]
// }

// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept"
//     )
//     res.header(
//         "Access-Control-Allow-Methods",
//         "PUT, POST, GET, DELETE, OPTIONS, PATCH"
//     )
//     next();
// })
// const port = 2410;
// app.listen(port, () => console.log(`node app listening on port ${port}`));

// app.get("/svr/resetData", async function (req, res) {
//     try {
//         await writeStat(fname, courseData);
//         res.send("write success");
//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// });
// app.get("/svr/students", async function (req, res) {
//     try {
//         await readStat(fname, courseData);
//         res.send(courseData);
//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// });
// app.post("/svr/students", async function (req, res) {
//     let body = req.body;
//     try {
//         let courseData1 = await readStat(fname, courseData);
//         let updatedStudent = { ...body };
//         courseData1.students.push(updatedStudent)
//         res.send(updatedStudent);
//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// });
// app.get("/svr/students/:id", async function (req, res) {
//     let id = +req.params.id;
//     try {
//         const courseData1 = await readStat(fname);
//         console.log(courseData1)

//         if (id <= courseData.students.length && id > 0) {
//             res.send(courseData.students[id - 1]);
//         } else {
//             res.status(404).send("No student found with this ID");
//         }
//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// });
// app.get("/svr/students/course/:name", async function (req, res) {
//     let name = req.params.name;
//     console.log(name)
//     try {
//         const courseData1 = await readStat(fname);

//         let fnd = courseData1.course === name;
//         if (fnd) {
//             res.send(courseData1.course);
//         } else {
//             res.status(404).send("No student found with this name");
//         }
//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// });
// app.put("/svr/students/:id", async function (req, res) {
//     let id = +req.params.id;
//     let body = req.body;

//     try {
//         const courseData1 = await readStat(fname);
//         if (id <= courseData1.students.length && id > 0) {
//             let updatedStudent = { ...courseData1.students[id - 1], ...body };
//             courseData1.students[id - 1] = updatedStudent;
//             res.send(updatedStudent);
//         } else {
//             res.status(404).send("No student found with this name");
//         }
//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// });
// app.delete("/svr/students/:id", async function (req, res) {
//     let id = +req.params.id;

//     try {
//         const courseData1 = await readStat(fname);
//         if (id <= courseData1.students.length && id > 0) {
//             let updatedStudent = courseData1.students.splice(id - 1, 1);
//             res.send(updatedStudent);
//         } else {
//             res.status(404).send("No student found with this name");
//         }
//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// });


// async function readStat(filename) {
//     let data = await fs.promises.readFile(filename, "utf8")
//     return JSON.parse(data)
// }
// async function writeStat(filename, txt) {
//     let data = JSON.stringify(txt);
//     await fs.promises.writeFile(filename, data);
// }





// //Task4.1
// let fs = require("fs");
// let readline = require("readline-sync");
// let fname = "./serverNodeJSON.json";
// let courseData = {
//     course: "Node.js",
//     students: [
//         { name: "Jack", age: 25 },
//         { name: "Steve", age: 26 },
//         { name: "Anna", age: 27 },
//     ]
// }

// async function writeJson() {
//     try {
//         let str = 0;
//         await fs.promises.writeFile(fname, str.toString());
//         console.log(str);
//     } catch (err) {
//         console.log(err);
//     }
// }

// async function readJson() {
//     try {
//         let data3 = await fs.promises.readFile(fname, "utf8");
//         let obj = JSON.parse(data3);
//         console.log(obj);
//     } catch (err) {
//         console.log(err);
//     }
// }
// async function add2() {
//     try {
//         let data3 = await fs.promises.readFile(fname, "utf8");
//         let obj = parseInt(data3);
//         await fs.promises.writeFile(fname, (obj + 2).toString());
//     } catch (err) {
//         console.log(err);
//     }
// }
// async function add3() {
//     try {
//         let data3 = await fs.promises.readFile(fname, "utf8");
//         let obj = parseInt(data3);
//         await fs.promises.writeFile(fname, (obj + 3).toString());
//     } catch (err) {
//         console.log(err);
//     }
// }



// let option = readline.question("Enter 1:Reset 2:add2 3:Read 4:add3...");
// switch (option) {
//     case "1": writeJson(); break;
//     case "2": add2(); break;
//     case "3": readJson(); break;
//     case "4": add3(); break;
// }





// //Task4.2
// const fs = require("fs");
// const readline = require("readline-sync");

// const fname = "./serverFile.json";

// async function getPoints() {
//     const points = [{ x: 2, y: 3 }, { x: -4, y: 10 }, { x: 0, y: 0 }, { x: 6, y: -1 }];
//     await fs.promises.writeFile(fname, JSON.stringify(points))
//     console.log("Points array created/reset : ", points);
// }

// async function readPoints() {
//     let data = await fs.promises.readFile(fname, "utf8")
//     console.log(JSON.parse(data))
// }

// async function addPoint() {
//     const x = readline.question("Enter x coordinate: ");
//     const y = readline.question("Enter y coordinate: ");

//     try {
//         const data = await fs.promises.readFile(fname, "utf8");
//         const points = JSON.parse(data);

//         const newPoint = { x: parseInt(x), y: parseInt(y) };
//         points.push(newPoint);

//         await fs.promises.writeFile(fname, JSON.stringify(points));
//         console.log("Point added:", newPoint);
//     } catch (error) {
//         console.error("Error:", error.message);
//     }
// }

// let option = readline.question("Enter 1: Create/Reset 2: Read 3: Add a Point...");
// switch (option) {
//     case "1": getPoints(); break;
//     case "2": readPoints(); break;
//     case "3": addPoint(); break;
//     default: console.log("Invalid option");
// }







//Task4.3
let express = require("express");
let fs = require("fs");
let app = express();
app.use(express.json());
let fname = "./serverNodeJSON.json";
let courseData = [
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
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    )
    res.header(
        "Access-Control-Allow-Methods",
        "PUT, POST, GET, DELETE, OPTIONS, PATCH"
    )
    next();
})
const port = 2410;
app.listen(port, () => console.log(`node app listening on port ${port}`));

app.get("/resetData", async function (req, res) {
    try {
        await writeStat(fname, courseData);
        res.send("write success");
    } catch (err) {
        res.status(500).send(err.message);
    }
});
app.get("/students", async function (req, res) {
    try {
        await readStat(fname, courseData);
        res.send(courseData);
    } catch (err) {
        res.status(500).send(err.message);
    }
});
app.post("/students", async function (req, res) {
    let body = req.body;
    try {
        let courseData1 = await readStat(fname, courseData);
        let updatedStudent = { id: body.id, ...body };
        courseData.push(updatedStudent)
        res.send(updatedStudent);
    } catch (err) {
        res.status(500).send(err.message);
    }
});
app.get("/students/:id", async function (req, res) {
    let id = req.params.id;
    try {
        const courseData1 = await readStat(fname);
        let fnd = courseData1.find((ele) => ele.id === id)
        if (fnd) {
            res.send(fnd);
        } else {
            res.status(404).send("No student found with this ID");
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});
app.put("/students/:id", async function (req, res) {
    let id = req.params.id;
    let body = req.body;

    try {
        const courseData1 = await readStat(fname);
        let index = courseData1.findIndex((ele) => ele.id === id)
        if (index >= 0) {
            let updatedStudent = { ...body };
            courseData[index] = updatedStudent;
            res.send(updatedStudent);
        } else {
            res.status(404).send("No student found with this ID");
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});
app.delete("/students/:id", async function (req, res) {
    let id = req.params.id;

    try {
        const courseData1 = await readStat(fname);
        let index = courseData1.findIndex((ele) => ele.id === id)
        if (index >= 0) {
            let updatedStudent = courseData.splice(index, 1);
            res.send(updatedStudent);
        } else {
            res.status(404).send("No student found with this name");
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});


async function readStat(filename) {
    let data = await fs.promises.readFile(filename, "utf8")
    return JSON.parse(data)
}
async function writeStat(filename, txt) {
    let data = JSON.stringify(txt);
    await fs.promises.writeFile(filename, data);
}


