let express = require("express");
let app = express();

app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})

const port = 2410;
app.listen(port, () => console.log(`Listening on port ${port}`));

//import products array:-----------------------
let { products } = require("./serverNodeProductData.js");

app.get("/products", function (req, res) {

    let category = req.query.category;
    let maxprice = +req.query.maxprice;
    let maxqty = +req.query.maxqty;
    let minqty = +req.query.minqty;

    let arr1 = products;
    if (category) {
        arr1 = arr1.filter((p1) => p1.category === category);
    }
    if (maxprice) {
        arr1 = arr1.filter((p1) => p1.price <= maxprice);
    }
    if (maxqty) {
        arr1 = arr1.filter((p1) => p1.quantity <= maxqty);
    }
    if (minqty) {
        arr1 = arr1.filter((p1) => p1.quantity >= minqty);
    }

    res.send(arr1);
});

app.get("/products/:prodname", function (req, res) {
    let prodname = req.params.prodname;
    const product = products.filter((ele) => ele.prod === prodname);
    res.send(product);
});

app.get("/products/category/:catname", function (req, res) {
    let catname = req.params.catname;
    const arr1 = products.filter((ele) => ele.category === catname);
    res.send(arr1);
});

app.get("/products/order/:field", function (req, res) {
    let field = req.params.field;

    let arr1 = products;
    if (field === "price") arr1 = arr1.sort((p1, p2) => (+p1.price) - (p2.price));
    if (field === "quantity") arr1 = arr1.sort((p1, p2) => (+p1.quantity) - (p2.quantity));
    if (field === "value") arr1 = arr1.sort((p1, p2) => (+p1.price * p1.quantity) - (p2.price * p2.quantity));

    res.send(arr1);
})

app.post("/products", function(req, res) {
    let body = req.body;

    let maxId = products.reduce((acc, curr) => (curr.id >= acc ? curr.id : acc), 0);
    let newId = maxId + 1;
    let newProduct = {id:newId, ...body}
    products.push(newProduct);
    res.send(newProduct);
});

app.put("/products/:prodname", function(req, res) {
    let prodname = req.params.prodname;
    let body = req.body;

    let index = products.findIndex((ele) => ele.prod === prodname);
    if(index>=0){
        let updatedProduct = {...body};
        products[index] = updatedProduct;
        res.send(updatedProduct);
    }else{
        res.status(404).send("No products found");
    }
});

app.delete("/products/:prodname", function(req, res) {
    let prodname = req.params.prodname;

    let index = products.findIndex((ele) => ele.prod === prodname);
    if(index>=0) {
        let deletedProd = products.splice(index, 1);
        res.send(deletedProd);
    }else{
        res.status(404).send("No students found");
    }
});

