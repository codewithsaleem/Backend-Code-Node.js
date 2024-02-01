let mysql = require("mysql");
let connData = {
    host: "localhost",
    user: "root",
    password: "",
    database: "testDB",
};

function showAllPersons() {
    let connection = mysql.createConnection(connData);
    //console.log("inside",connection)
    let sql = "SELECT * FROM persons";
    connection.query(sql, function (err, result) {
        console.log(sql)
        if (err) console.log(err);
        else console.log(result);
    })
}

function showPersonByName(name) {
    let connection = mysql.createConnection(connData);
    let sql = "SELECT * FROM persons WHERE name=?";
    connection.query(sql, name, function (err, result) {
        if (err) console.log(err);
        else console.log(result);
    })
}

function insertPerson(params) {
    let connection = mysql.createConnection(connData);
    let sql = "INSERT INTO persons (name, age) VALUES (?, ?)";
    connection.query(sql, params, function (err, result) {
        if (err) console.log(err);
        else {
            console.log("Insert id is : ", result.insertId);
            let sql2 = "SELECT * FROM persons";
            connection.query(sql2, function (err, result) {
                if (err) console.log(err);
                else console.log(result);
            })
        }
    })
}

function insertMultiplePerson(params) {
    let connection = mysql.createConnection(connData);
    let sql = "INSERT INTO persons(name, age) VALUES ?";
    connection.query(sql, [params], function (err, result) {
        if (err) console.log(err);
        else console.log(result);
    })
}

function incrementAge(id) {
    let connection = mysql.createConnection(connData);
    let sql = "UPDATE persons SET age = age + 5 WHERE id=?";
    connection.query(sql, id, function (err, result) {
        if (err) console.log(err);
        else console.log(result);
    })
}

function resetData() {
    let connection = mysql.createConnection(connData);
    let sql = "DELETE FROM persons";
    connection.query(sql, function (err, result) {
        if (err) console.log(err);
        else {
            console.log("Successfully deleted : Affected rows:", result.affectedRows);
            let {persons} = require("./testNodeData.js");
            let arr = persons.map((ele) => [ele.name, ele.age]);
            let sql2 = "INSERT INTO persons(name, age) VALUES ?";
            connection.query(sql2, [arr], function(err, result) {
                if (err) console.log(err);
                else console.log("Successfully Inserted : Affected rows:", result.affectedRows);
            })
        }
    })
}

showAllPersons();
// showPersonByName("Jack");
// insertPerson(["David", 38]);
// insertMultiplePerson([["Jimmy", 45], ["Mike", 43], ["Ricky", 15]]);
// incrementAge(3);
//  resetData();