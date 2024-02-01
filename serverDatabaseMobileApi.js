// let express = require("express");
// let app = express();

// let cors = require("cors");

// app.use(express.json());
// app.use(cors());

// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"); // Corrected the method names
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); // Corrected "Control-Type" to "Content-Type"
//     next();
// })



// const port = 2410;
// app.listen(port, () => console.log(`Node app listening on port ${port}`));

// // //Connection to the database:----
// // let mysql = require("mysql");
// // let connData = {
// //     host: "localhost",
// //     user: "root",
// //     password: "",
// //     database: "testDB",
// // }

// // app.get("/svr/mobiles", function (req, res) {
// //     let brand = req.query.brand;
// //     let RAM = req.query.RAM;
// //     let ROM = req.query.ROM;
// //     let OS = req.query.OS;

// //     let brandList = brand ? brand.split(",") : [];
// //     let ramList = RAM ? RAM.split(",") : [];
// //     let romList = ROM ? ROM.split(",") : [];
// //     let osList = OS ? OS.split(",") : [];


// //     let Connection = mysql.createConnection(connData);

// //     let conditions = [];

// //     if (brandList.length > 0) {
// //         conditions.push(`brand IN ('${brandList.join("','")}')`);
// //     }
// //     if (ramList.length > 0) {
// //         conditions.push(`RAM IN ('${ramList.join("','")}')`);
// //     }
// //     if (romList.length > 0) {
// //         conditions.push(`ROM IN ('${romList.join("','")}')`);
// //     }
// //     if (osList.length > 0) {
// //         conditions.push(`OS IN ('${osList.join("','")}')`);
// //     }

// //     let whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

// //     let sql = `SELECT * FROM mobiles1 ${whereClause}`;

// //     Connection.query(sql, function (err, result) {
// //         if (err) res.status(404).send(err);
// //         else res.send(result);
// //     });
// // });

// // app.get("/svr/mobiles/:id", function (req, res) {
// //     let id = +req.params.id;
// //     let body = req.body;
// //     let Connection = mysql.createConnection(connData);
// //     let sql = "SELECT * FROM mobiles1 WHERE id=?";

// //     Connection.query(sql, id, function (err, result) {
// //         if (err) res.status(404).send(err);
// //         else res.send(result);
// //     })
// // })

// // app.put("/svr/mobiles/:id", function (req, res) {
// //     let id = +req.params.id;
// //     let body = req.body;
// //     let Connection = mysql.createConnection(connData);
// //     let sql = "UPDATE mobiles1 SET name=?, price=?, brand=?, RAM=?, ROM=?, OS=? WHERE id=?";
// //     let values = [body.name, body.price, body.brand, body.RAM, body.ROM, body.OS, id];

// //     Connection.query(sql, values, function (err, result) {
// //         if (err) res.status(404).send(err);
// //         else res.send(result);
// //     })
// // })

// // app.post("/svr/mobiles", function (req, res) {
// //     let body = req.body;
// //     let connection = mysql.createConnection(connData);
// //     let sql = "INSERT INTO mobiles1 (name, price, brand, RAM, ROM, OS) VALUES (?,?,?,?,?,?)";
// //     let values = [body.name, body.price, body.brand, body.RAM, body.ROM, body.OS];

// //     connection.query(sql, values, function (err, content) {
// //         if (err) res.status(404).send(err);
// //         else {
// //             res.send(content);
// //         }
// //     })
// // })

// // app.delete("/svr/mobiles/:id", function (req, res) {
// //     let id = +req.params.id;

// //     let Connection = mysql.createConnection(connData);
// //     let sql = "DELETE FROM mobiles1 WHERE id=?";

// //     Connection.query(sql, id, function (err, result) {
// //         if (err) res.status(404).send(err);
// //         else res.send(result);
// //     })
// // })












































// //Connection to the supbase with postgres:-----------------------------------------------------------------------------
// const { Client } = require("pg");
// const client = new Client({
//     user: "postgres",
//     password: "Saleem@0786",
//     database: "postgres",
//     port: 5432,
//     host: "db.kzusjuxduqlvldremfxg.supabase.co",
//     ssl: { rejectUnauthorized: false },
// });
// client.connect(function (res, err) {
//     console.log(`Connect!!!`);
// });


// app.get("/svr/mobiles", function (req, res, next) {
//     let brand = req.query.brand;
//     let ram = req.query.ram;
//     let rom = req.query.rom;
//     let os = req.query.os;

//     let brandList = brand ? brand.split(",") : [];
//     let ramList = ram ? ram.split(",") : [];
//     let romList = rom ? rom.split(",") : [];
//     let osList = os ? os.split(",") : [];


//     // let Connection = mysql.createConnection(connData);

//     let conditions = [];

//     if (brandList.length > 0) {
//         conditions.push(`brand IN ('${brandList.join("','")}')`);
//     }
//     if (ramList.length > 0) {
//         conditions.push(`ram IN ('${ramList.join("','")}')`);
//     }
//     if (romList.length > 0) {
//         conditions.push(`rom IN ('${romList.join("','")}')`);
//     }
//     if (osList.length > 0) {
//         conditions.push(`os IN ('${osList.join("','")}')`);
//     }

//     let whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

//     let sql = `SELECT * FROM mobiles ${whereClause}`;

//     client.query(sql, function (err, result) {
//         if (err) { res.status(400).send(err); }
//         res.send(result.rows);
//         client.end();
//     });
// });

// app.get("/svr/mobiles/:id", function (req, res) {
//     let id = +req.params.id;
    
//     // let Connection = mysql.createConnection(connData);
//     let sql = `SELECT * FROM mobiles WHERE id=${id}`;

//     client.query(sql, function (err, result) {
//         if (err) { res.status(400).send(err); }
//         res.send(result.rows);
//         client.end();
//     });
// });


// app.put("/svr/mobiles/:id", function (req, res) {
//     const id = +req.params.id;
//     const body = req.body;
//     const sql = 'UPDATE mobiles SET name=$1, price=$2, brand=$3, ram=$4, rom=$5, os=$6 WHERE id=$7';
//     const values = [body.name, body.price, body.brand, body.RAM, body.ROM, body.OS, id];

//     client.query(sql, values, function (err, result) {
//         if (err) {
//             res.status(400).send(err);
//         } else {
//             res.send("Record updated successfully");
//         }
//         // Do not close the connection here; it may be used for other requests.
//     });
// });

// app.post("/svr/mobiles", function (req, res) {
//     const body = req.body;
//     const sql = "INSERT INTO mobiles (name, price, brand, ram, rom, os) VALUES ($1, $2, $3, $4, $5, $6)";
//     const values = [body.name, body.price, body.brand, body.RAM, body.ROM, body.OS];

//     client.query(sql, values, function (err, result) {
//         if (err) {
//             res.status(400).send(err);
//         } else {
//             res.send("Data posted successfully");
//         }
//         // Do not close the connection here; it may be used for other requests.
//     });
// });


// app.delete("/svr/mobiles/:id", function (req, res) {
//     let id = +req.params.id;

//     let Connection = mysql.createConnection(connData);
//     let sql = `DELETE FROM mobiles WHERE id=${id}`;

//     client.query(sql, function (err, result) {
//         if (err) { res.status(400).send(err); }
//         res.send("Deleted successfully");
//         client.end();
//     });
// });

// // //:--------------------------------------------------------------------------------------------------------------------------













const express = require("express");
const app = express();
const cors = require("cors");
const { Client } = require("pg");

app.use(express.json());
app.use(cors());

const client = new Client({
    user: "postgres",
    password: "Saleem@0786",
    database: "postgres",
    port: 5432,
    host: "db.kzusjuxduqlvldremfxg.supabase.co",
    ssl: { rejectUnauthorized: false },
});

client.connect(function (err) {
    if (err) {
        console.error("Error connecting to PostgreSQL:", err);
    } else {
        console.log("Connected to PostgreSQL");
    }
});

const port = 2410;
app.listen(port, () => console.log(`Node app listening on port ${port}`));

app.get("/svr/mobiles", function (req, res) {
    const brand = req.query.brand;
    const ram = req.query.ram;
    const rom = req.query.rom;
    const os = req.query.os;

    const brandList = brand ? brand.split(",") : [];
    const ramList = ram ? ram.split(",") : [];
    const romList = rom ? rom.split(",") : [];
    const osList = os ? os.split(",") : [];

    const conditions = [];

    if (brandList.length > 0) {
        conditions.push(`brand IN ('${brandList.join("','")}')`);
    }
    if (ramList.length > 0) {
        conditions.push(`ram IN ('${ramList.join("','")}')`);
    }
    if (romList.length > 0) {
        conditions.push(`rom IN ('${romList.join("','")}')`);
    }
    if (osList.length > 0) {
        conditions.push(`os IN ('${osList.join("','")}')`);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
    const sql = `SELECT * FROM mobiles ${whereClause}`;

    client.query(sql, function (err, result) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.send(result.rows);
        }
    });
});

app.get("/svr/mobiles/:id", function (req, res) {
    const id = +req.params.id;
    const sql = `SELECT * FROM mobiles WHERE id = $1`;

    client.query(sql, [id], function (err, result) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.send(result.rows);
        }
    });
});

app.put("/svr/mobiles/:id", function (req, res) {
    const id = +req.params.id;
    const body = req.body;
    const sql = 'UPDATE mobiles SET name=$1, price=$2, brand=$3, ram=$4, rom=$5, os=$6 WHERE id=$7';
    const values = [body.name, body.price, body.brand, body.ram, body.rom, body.os, id];

    client.query(sql, values, function (err, result) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.send("Record updated successfully");
        }
    });
});

app.post("/svr/mobiles", function (req, res) {
    const body = req.body;
    const sql = "INSERT INTO mobiles (name, price, brand, ram, rom, os) VALUES ($1, $2, $3, $4, $5, $6)";
    const values = [body.name, body.price, body.brand, body.ram, body.rom, body.os];

    client.query(sql, values, function (err, result) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.send("Data posted successfully");
        }
    });
});

app.delete("/svr/mobiles/:id", function (req, res) {
    const id = +req.params.id;
    const sql = `DELETE FROM mobiles WHERE id = $1`;

    client.query(sql, [id], function (err, result) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.send("Deleted successfully");
        }
    });
});