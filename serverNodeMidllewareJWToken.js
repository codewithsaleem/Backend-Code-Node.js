const express = require("express");
let app = express();
app.use(express.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept",
    );
    res.header("Access-Control-Allow-Credentials", true);
    next();
});
const port = 2410;
app.listen(port, () => console.log(`Node app listening on port ${port}`));

const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use("/myOrders",authenticateToken)
const jwt = require("jsonwebtoken");
const jwt_key = "secretkey237483";
const jwtExpiryTime = 300;
let { users, orders } = require("./serverNodeMidlleware2CookiesData.js");
let cookieName = "jwtToken";

function authenticateToken(req, res, next) {
    console.log("In Midlleware authentication");
    const token = req.cookies[cookieName]
    console.log("Token : ", token);
    if (!token) res.status(401).send("Please login first");
    else {
        jwt.verify(token, jwt_key, function (err, data) {
            if (err) res.status(403).send(err);
            else {
                console.log(data);
                req.user = data.user;
                next();
            }
        })
    }
}
app.post("/login", function (req, res) {
    let { name, password } = req.body;
    let user = users.find((u) => u.name === name && u.password === password);
    if (user) {
        const token = jwt.sign({ user }, jwt_key, {
            algorithm: "HS256",
            expiresIn: jwtExpiryTime,
        });
        res.cookie(cookieName, token);
        res.send("Login successful!");
    } else {
        res.status(401).send("Login failed");
    }
})

app.get("/myOrders", function (req, res) {
    console.log("In GET /muOrders")
    let order1 = orders.filter((ord) => ord.userId === req.user.id);
    res.send(order1);
});

app.get("/info", function (req, res) {
    res.send("Hello. Welcome to the tutorial");
})