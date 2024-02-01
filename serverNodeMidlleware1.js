// const express = require("express");
// let app = express();
// app.use(express.json());

// let mysql = require("mysql");
// let connData = {
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "testDB"
// }
// const Connection = mysql.createConnection(connData);

// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     res.header("Access-Control-Allow-Credentials", true);
//     next();
// })

// // //Task1.1:---
// // app.use(sayHello);
// // app.use(showUrlMethod);
// // app.use("/orders", showBody);
// // app.use(insertUser);
// // app.use(sayBye);

// //Task1.2:---
// app.use(showURLAndMethod);

// //Task1.3:---
// app.use(createTable);
// app.use(insertRequestToDB);

// let port = 2410;
// app.listen(port, () => console.log(`Node app listening on port ${port}`));

// //Task1.3:---
// //Connection to the database:----
// function createTable(req, res, next) {
//     let sql = "CREATE TABLE allRequests (id INT AUTO_INCREMENT PRIMARY KEY, url VARCHAR(255), method VARCHAR(255))";
//     Connection.query(sql, function (err, result) {
//         if (err) res.status(404).send(err);
//         else next();
//     });
// }

// function insertRequestToDB(req, res, next) {
//     console.log("Sql")

//     req.allRequestsArray.map((ele) => {
//         const{url, method} = ele;
//         let sql = "INSERT INTO allRequests (url, method) VALUES (?, ?)";
//         Connection.query(sql, [url, method], function (err, result) {
//             if (err) res.status(404).send(err);
//         });
//     })
//     next();
// }

// app.get("/allRequestsFromDB", function (req, res) {
//     let sql = "SELECT * FROM allRequests";
//     Connection.query(sql, function (err, result) {
//         if (err) res.status(404).send(err);
//         else res.send(result);
//     });
// });

// // //function Task1.1:---
// // function sayHello(req, res, next) {
// //     console.log("Hello: New Request Recieved");
// //     next();
// // }
// // function sayBye(req, res, next) {
// //     console.log("Bye : Midlleware over");
// //     next();
// // }
// // function showUrlMethod(req, res, next) {
// //     console.log(`url: ${req.url}  method: ${req.method}`)
// //     next();
// // }
// // function showBody(req, res, next) {
// //     console.log(`Body: ${JSON.stringify(req.body)}`);
// //     next();
// // }
// // function insertUser(req, res, next) {
// //     req.user = { name: "Temp", role: "Guest" };
// //     console.log(`Inserted in req.user : ${JSON.stringify(req.user)}`);
// //     next();
// // }

// // Array to store request information
// const allRequestsArray = [];

// //Task1.2:---
// function showURLAndMethod(req, res, next) {
//     pageInfo = { url: req.url, method: req.method };
//     allRequestsArray.push(pageInfo);
//     req.allRequestsArray = allRequestsArray;
//     req.pageInfo = pageInfo;
//     next();
// }




// // //url Task1.1:----
// // app.get("/products", function (req, res) {
// //     console.log("In the route : GET /products")
// //     res.send({ route: "/products", user: req.user });
// // })
// // app.get("/orders", function (req, res) {
// //     console.log("In the route : GET /orders");
// //     res.send({ route: "/orders", user: req.user });
// // })
// // app.post("/orders", function (req, res) {
// //     console.log("In the route : POST /orders");
// //     res.send({ route: "/orders", data: req.body, user: req.user });
// // })

// //url Task1.2:---
// app.get("/allRequests", function (req, res) {
//     console.log("In the route: GET /allRequests");
//     res.send(allRequestsArray)
// })


const express = require("express");
const mysql = require("mysql");
const app = express();
app.use(express.json());
const allRequestsArray = [];

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "testDB",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed: ", err);
  } else {
    console.log("Connected to the database");
    // Create the allRequests table if it doesn't exist
    db.query(
      "CREATE TABLE IF NOT EXISTS allRequests (id INT AUTO_INCREMENT PRIMARY KEY, url VARCHAR(255), method VARCHAR(255))",
      (err) => {
        if (err) {
          console.error("Error creating table: ", err);
        } else {
          console.log("Table created or already exists");
        }
      }
    );
  }
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(showURLAndMethod);
app.use(insertRequestToDB);

const port = 2410;
app.listen(port, () => console.log(`Node app listening on port ${port}`));

function showURLAndMethod(req, res, next) {
  const pageInfo = { url: req.url, method: req.method };
  allRequestsArray.push(pageInfo)
  req.pageInfo = pageInfo;
  next();
}

function insertRequestToDB(req, res, next) {
  const { url, method } = req.pageInfo;
  db.query("INSERT INTO allRequests (url, method) VALUES (?, ?)", [url, method], (err) => {
    if (err) {
      console.error("Error inserting request into the database: ", err);
    }
    next();
  });
}

app.get("/allRequestsFromDB", (req, res) => {
  db.query("SELECT * FROM allRequests", (err, results) => {
    if (err) {
      console.error("Error fetching requests from the database: ", err);
      res.status(500).send("Internal Server Error");
    } else {
      res.send(results);
    }
  });
});

app.get("/allRequests", function (req, res) {
    console.log("In the route: GET /allRequests");
    res.send(allRequestsArray)
})