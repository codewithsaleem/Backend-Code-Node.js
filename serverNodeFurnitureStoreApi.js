let express = require("express");
let app = express();
app.use(express.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header(
        "Access-Control-Allow-Methods",
        "POST, GET, DELETE, PUT, PATCH, HEAD, OPTIONS"
    );
    next();
})
const port = 2410;
app.listen(port, () => console.log(`Node app listening on port ${port}`));
let { furnitureArray } = require("./serverNodeFurnitureStoreData.js");
let loginData = [];
let newProduct = [];
let cartProd = [];
let cart1Prod = []

//url:--------------
app.get("/allProducts", function (req, res) {
    let category = req.query.category;
    let arr = furnitureArray;
    if (category) arr = arr.filter((ele) => ele.category === category);
    res.send(arr);
})
app.post("/allProducts", function (req, res) {
    let body = req.body;
    let newItem = { ...body };
    furnitureArray.push(newItem);
    console.log("upd", furnitureArray.length, newItem)

    res.send(newItem);
})

app.get("/products", function (req, res) {
    res.send(newProduct);
})
app.post("/products", function (req, res) {
    let body = req.body;
    let newItem = { ...body };

    if (newProduct.length === 0) {
        newProduct.push(newItem);
    } else {
        // If there's already an item, replace it with the new one
        newProduct[0] = newItem;
    }
    res.send(newItem);
});

app.put("/products/:index", function (req, res) {
    let index = +req.params.index;
    let body = req.body;
    if (index >= 0) {
        let updatedProduct = { ...body };
        newProduct[index] = updatedProduct;
        res.send(updatedProduct);
    }
    else res.status(404).send("No product found");
})
app.delete("/product/:id", function (req, res) {
    let id = req.params.id;
    let index = newProduct.findIndex((ele) => ele.prodCode === id)
    if (index >= 0) {
        let deletedProduct = newProduct.splice(index, 1);
        res.send(deletedProduct);
    }
    else res.status(404).send("No product found");
})
app.get("/products/:index", function (req, res) {
    let updatedProd = newProduct[+index]
    res.send(updatedProd);
})


//register:----
app.post("/register", function (req, res) {
    let body = req.body;
    loginData.push(body);
    res.send(body);
})
//login:----
app.post("/login", function (req, res) {
    let body = req.body;
    let verifyEmailPass = loginData.find((ele) => ele.email === body.email && ele.password === body.password);

    if (verifyEmailPass) {
        res.send(verifyEmailPass);
    } else {
        res.status(404).send("Invalid Credentials. Login again!!!")
    }
})

//cart:---
app.get("/cart", function (req, res) {
    res.send(cartProd);
})


// Function to update quantities for a given product and ingredient
function updateQuantities(product, ingredientName, action) {
    let ingredientIndex = product.ingredients.findIndex(ingredient => ingredient.ingName === ingredientName);
     let fnd  = furnitureArray.find((ele) => ele.prodCode === product.prodCode)
    if (ingredientIndex !== -1) {
        if (action === "increment") {
            product.ingredients[ingredientIndex].qty += fnd.ingredients[ingredientIndex].qty;
        } else if (action === "decrement") {
            product.ingredients[ingredientIndex].qty -= fnd.ingredients[ingredientIndex].qty;
            if (product.ingredients[ingredientIndex].qty === 0) {
                product.ingredients.splice(ingredientIndex, 1);
            }
        }
    }
}

app.post("/cart", function (req, res) {
    let body = req.body;
    // Check if an order with the same ID already exists
    let existingOrderIndex = cartProd.findIndex(item => item.prodCode === body.prodCode);

    if (existingOrderIndex !== -1) {
        // Order already exists in the cart
        cartProd[existingOrderIndex].qty += 1;
        updateQuantities(cartProd[existingOrderIndex], "Chair", "increment");
        updateQuantities(cartProd[existingOrderIndex], "Dining Table", "increment");
        updateQuantities(cartProd[existingOrderIndex], "Sofa", "increment");
        updateQuantities(cartProd[existingOrderIndex], "Bench", "increment");
        // Add more ingredients if needed

        res.send(cartProd[existingOrderIndex]);
    } else {
        // Order does not exist in the cart, add it with quantity 1
        cartProd.push({ ...body, qty: 1 });
        res.send({ ...body, qty: 1 });
    }
});

app.delete("/cart/:id", function (req, res) {
    console.log(cartProd);
    let id = req.params.id;
    let index = cartProd.findIndex((ele) => ele.prodCode === id);

    if (index !== -1) {
        let deletedProduct = cartProd[index];
        
        // Decrease the overall quantity of the order
        deletedProduct.qty -= 1;

        // Update the quantity of specific ingredients
        updateQuantities(deletedProduct, "Chair", "decrement");
        updateQuantities(deletedProduct, "Dining Table", "decrement");
        updateQuantities(deletedProduct, "Sofa", "decrement");
        updateQuantities(deletedProduct, "Bench", "decrement");
        // Add more ingredients if needed

        // If the overall quantity becomes 0, remove the entire order from the cart
        if (deletedProduct.qty === 0) {
            cartProd.splice(index, 1);
            res.send(deletedProduct);
        } else {
            res.send(deletedProduct);
        }
    } else {
        res.status(404).send("No product found");
    }
});


app.post("/cart1", function (req, res) {
    let body = req.body;
    // Check if an order with the same ID already exists
    let existingOrderIndex = cartProd.findIndex(item => item.prodCode === body.prodCode);

    if (existingOrderIndex !== -1) {
        cart1Prod.push({ ...body, qty: 1 });
        res.send({ ...body, qty: 1 });
    }
})
