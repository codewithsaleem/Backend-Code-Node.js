//ND-B1#5:- Task 1.1 (c)
var express = require("express");
let app = express();
app.use(express.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    )
    res.header(
        "Access-Control-Allow-Methods",
        "PUT, POST, GET, DELETE, OPTIONS, PATCH, HEAD"
    )
    next();
})
const port = 2410;
app.listen(port, () => console.log(`Node app listening pon port ${port}`))
let baseURL = "https://repo-8qu2.onrender.com/productServer";
let axios = require("axios");


app.get("/myserver/customers", async function (req, res) {
    try {
        let response = await axios.get(baseURL + "/customers");
        console.log(response);
        res.send(response.data)
    } catch (error) {
        if (error.response) {
            let { status, statusText } = error.response;
            console.log(status, statusText);
            res.status(status).send(statusText);
        } else {
            res.status(404).send(error);
        }
    }
})

app.get("/myserver/products", async function (req, res) {
    try {
        let response = await axios.get(baseURL + "/products");
        console.log(response);
        res.send(response.data)
    } catch (error) {
        if (error.response) {
            let { status, statusText } = error.response;
            console.log(status, statusText);
            res.status(status).send(statusText);
        } else {
            res.status(404).send(error);
        }
    }
})

app.get("/myserver/orders", async function (req, res) {
    let { cust, prod } = req.query;
    let params = {};
    if (cust) params.cust = cust;
    if (prod) params.prod = prod;

    try {
        let response = await axios.get(baseURL + "/orders", { params: params });
        console.log(response);
        res.send(response.data)
    } catch (error) {
        if (error.response) {
            let { status, statusText } = error.response;
            console.log(status, statusText);
            res.status(status).send(statusText);
        } else {
            res.status(404).send(error);
        }
    }

})

app.post("/myserver/orders", async function (req, res) {
    let body = req.body;
    try {
        let response = await axios.post(baseURL + "/orders", body);
        console.log(response);
        res.send(response.data)
    } catch (error) {
        if (error.response) {
            let { status, statusText } = error.response;
            console.log(status, statusText);
            res.status(status).send(statusText);
        } else {
            res.status(404).send(error);
        }
    }
})

app.get("/myserver/orders/customer/:cust", async function (req, res) {
    let { cust } = req.params;

    try {
        let response = await axios.get(`${baseURL}/orders/customer/${cust}`)
        res.send(response.data);
    } catch (error) {
        if (error.response) {
            let { status, statusText } = error.response;
            res.status(status).send(statusText);
        } else {
            res.status(404).send(error);
        }
    }
})

app.get("/myserver/orders/product/:prod", async function (req, res) {
    let { prod } = req.params;

    try {
        let response = await axios.get(`${baseURL}/orders/product/${prod}`)
        res.send(response.data);
    } catch (error) {
        if (error.response) {
            let { status, statusText } = error.response;
            res.status(status).send(statusText);
        } else {
            res.status(404).send(error);
        }
    }
})