const express = require("express");
const bcrypt = require("bcryptjs");
const app = express();
app.use(express.json());

// Enable CORS for all routes
const cors = require('cors');
app.use(cors());

//Database MongoDB Connection:-
const mongoDB = require("./serverNodeFoodDelieveryDB.js");
mongoDB();

//Middleware:-
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS",
    );
    next();
})

const port = 2450;
app.listen(port, () => console.log(`Node app listening on port ${port}`));

const User = require("./serverNodeFoodDelieverySchema.js");
const Cart = require("./serverNodeFoodDelieverySchemaCart.js");


//RESTapi's for user:-
app.post("/user", async function (req, res) {
    let body = req.body;

    //Secure Password in hashing form:-
    let salt = await bcrypt.genSalt(10);
    let securePass = await bcrypt.hash(body.password, salt);

    try {
        User.create({
            name: body.name,
            location: body.location,
            email: body.email,
            password: securePass
        })
        res.json({ success: true })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false });
    }
})
app.post("/loginuser", async function (req, res) {
    let body = req.body;
    try {
        let userData = await User.findOne({ email: body.email });

        if (!userData) {
            return res.status(400).send("Invalid Credentials!!")
        }
        let pwdCompare = await bcrypt.compare(body.password, userData.password);
        console.log(pwdCompare)
        if (!pwdCompare) {
            return res.status(400).send("Invalid Credentials!!");
        } else {
            return res.send(body);
        }
    }
    catch (error) {
        res.status(400).send("Invalid Credentials!!");
    }
})

//REST Api's for food data and category:-
app.get("/foodData", async function (req, res) {
    const { food_items, food_category } = await mongoDB();

    try {
        res.send([food_items, food_category])
    } catch (error) {
        res.json({ success: false })
    }
})

//REST Api's for cart:-
app.post("/cart", async function (req, res) {
    let body = req.body;
    console.log(body)
    try {
        Cart.create({
            name: body.name,
            CategoryName: body.CategoryName,
            img: body.img,
            qty: body.qty,
            size: body.size,
            price: body.price,
            description: body.description
        })
        res.json({ success: true })
    } catch (error) {
        res.json({ success: false })
    }
})