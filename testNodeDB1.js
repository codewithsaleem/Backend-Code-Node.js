let mysql = require("mysql");
let connData = {
    host: "localhost",
    user: "root",
    password: "",
    database: "testDB",
}

function showAllProducts() {
    let connection = mysql.createConnection(connData);
    let sql = "SELECT * FROM products";
    connection.query(sql, function (err, result) {
        if (err) console.log(err);
        else console.log(result);
    })
}

function showProductByName(name) {
    let connection = mysql.createConnection(connData);
    let sql = "SELECT * FROM products WHERE prod=?";
    connection.query(sql, name, function (err, result) {
        if (err) console.log(err);
        else console.log(result);
    })
}

function showProductByCategory(name) {
    let connection = mysql.createConnection(connData);
    let sql = "SELECT * FROM products WHERE category=?";
    connection.query(sql, name, function (err, result) {
        if (err) console.log(err);
        else console.log(result);
    })
}

function showProductsByPriceGreaterThan(price) {
    let connection = mysql.createConnection(connData);
    let sql = "SELECT * FROM products WHERE price > ?";
    connection.query(sql, price, function (err, result) {
        if (err) console.log(err);
        else console.log(result);
    })
}

function insertNewProduct(params) {
    let connection = mysql.createConnection(connData);
    let sql = "INSERT INTO products (prod, price, quantity, category) VALUES (?,?,?,?)";
    connection.query(sql, params, function(err, result) {
        if (err) console.log(err);
        else console.log(result);
    })
}

function insertMultipleProducts(params) {
    let connection = mysql.createConnection(connData);
    let sql = "INSERT INTO products (prod, price, quantity, category) VALUES ?";
    connection.query(sql, [params], function(err, result) {
        if (err) console.log(err);
        else console.log(result);
    })
}

function changeInQuantity(id, quantity) {
    let connection = mysql.createConnection(connData);
    let sql = "UPDATE products SET quantity=? WHERE id=?";
    connection.query(sql, [quantity, id], function(err, result) {
        if (err) console.log(err);
        else console.log(result);
    })
}

function decreaseInQuantityBy1(id) {
    let connection = mysql.createConnection(connData);
    let sql = "UPDATE products SET quantity=quantity-1 WHERE id=?";
    connection.query(sql, id, function(err, result) {
        if (err) console.log(err);
        else console.log(result);
    })
}

function resetDataDelete() {
    let connection = mysql.createConnection(connData);
    let sql = "DELETE FROM products";
    connection.query(sql, function(err, result) {
        if (err) console.log(err);
        else console.log(result);
    })
}


 showAllProducts();
// showProductByName("Pepsi");
// showProductByCategory("Food");
// showProductsByPriceGreaterThan(30);
// insertNewProduct(["Pizza", 50, 5, "Beverages"]);
// insertMultipleProducts([["Burger", 88, 8, "Beverages"], ["Chilli", 60, 4, "Beverages"]]);
// changeInQuantity(1, 1000000);
// decreaseInQuantityBy1(1);
// resetDataDelete();