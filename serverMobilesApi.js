let express = require("express");
let app = express();
app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, DELETE, OPTIONS, PUT, PATCH, HEAD"
    )
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    )
    next();
});

const port = 2410;
app.listen(port, () => console.log(`Listening app on Port ${port}`));

//database method:---
let mysql = require("mysql");
let connData = {
    host: "localhost",
    user: "root",
    password: "",
    database: "testDB",
}

app.get("/svr/mobiles", function(req, res) {
    let connection = mysql.createConnection(connData);
    let sql = "SELECT * FROM mobiles";
    connection.query(sql, function(err, content) {
        if (err) res.status(404).send(err);
        else {
            res.send(content);
        }
    })
})

app.get("/svr/mobiles/:id", function(req, res) {
    let id = +req.params.id;
    let connection = mysql.createConnection(connData);
    let sql = `SELECT * FROM mobiles WHERE id =${id}`
    connection.query(sql, function(err, content) {
        if (err) res.status(404).send(err);
        else {
            if (content.length > 0){
                const mobile = content[0];
                res.send(mobile);
            }
            else {
                res.status(404).send("No mobile found!");
            }
        }
    })
})

app.get("/svr/mobile/:brand", function(req, res) {
    let brand = req.params.brand;
    let connection = mysql.createConnection(connData);
    let sql = `SELECT * FROM mobiles WHERE brand ='${brand}'`;
    
    connection.query(sql, function(err, content) {
        if (err) res.status(404).send(err);
        else {
            if (content.length > 0){
                const mobile = content[0];
                res.send(content);
            }
            else {
                res.status(404).send("No mobile brand found!");
            }
        }
    })
})

app.post("/svr/mobiles", function(req, res) {
    let body = req.body;
    let connection = mysql.createConnection(connData);
    let sql = "INSERT INTO mobiles (brand, model, price) VALUES (?,?,?)";
    let values = [body.brand, body.model, body.price];

    connection.query(sql, values, function(err, content) {
        if (err) res.status(404).send(err);
        else {
            res.send(content);
        }
    })
})

app.put("/svr/mobiles/:id", function(req, res) {
    let id = +req.params.id;
    let body = req.body; 
    let connection = mysql.createConnection(connData);
    let sql = "UPDATE mobiles SET brand=?, model=?, price=? WHERE id=?";
    let values = [body.brand, body.model, body.price, id];

    connection.query(sql, values, function(err, content) {
        if (err) {
            res.status(404).send(err);
        } else {
            res.send(content);
        }
    });
});

app.delete("/svr/mobiles/:id", function(req, res) {
    let id = +req.params.id;
    let connection = mysql.createConnection(connData);
    let sql = `DELETE FROM mobiles WHERE id = ${id}`;
    
    connection.query(sql, function(err, content) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(content);
        }
    });
});

app.get("/svr/resetData", function(req, res) {
    let connection = mysql.createConnection(connData);
    let sql = "DELETE FROM mobiles";
    
    connection.query(sql, function(err, content) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send("Data Reset Successful!!!!!");
        }
    });
})
