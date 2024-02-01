let express = require("express");
let app = express();
app.use(express.json());


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELTE, HEAD",
    )
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Control-Type, Accept"
    )
    next();
})

const port = 2410;
app.listen(port, () => console.log(`Node app listening on port ${port}`));

let {customers} = require("./serverCustomerData.js");

let fs = require("fs");
let fname = "serverStudentsDataJSON.json";

app.get("/svr/resetData", function(req, res) {
   let data = JSON.stringify(customers);
   fs.writeFile(fname, data, function(err) {
    if (err) res.status(404).send(err);
    else res.send("Data in file is reset")
   })
});

app.get("/svr/customers", function(req, res) {
    fs.readFile(fname, "utf8", function(err, content) {
        if (err) res.status(404).send(err);
        else 
        {
            let customerArray = JSON.parse(content);
            res.send(customerArray)
        }
    })
})

app.post("/svr/customers", function(req, res) {
    let body = req.body;
    fs.readFile(fname, "utf8", function(err, content) {
        if (err) res.status(404).send(err);
        else 
        {
            let newCustomer = {...body};
            customers.push(newCustomer);
            res.send(newCustomer);
        }
    })
});

app.put("/svr/customers/:id", function(req, res) {
     let id = req.params.id;
     let body = req.body;

     fs.readFile (fname, "utf8", function(err, content) {
         if (err) res.status(404).send(err);
         else {
            let customerArray = JSON.parse(content);
            let index = customerArray.findIndex((ele) => ele.id === id);
            if (index>=0) {
                let updatedCustomer = {...customerArray[index], ...body};
                customers[index] = updatedCustomer;
                let data1 = JSON.stringify(students);
                fs.writeFile(fname, data1, function(err) {
                    if (err) res.status(404).send(err);
                    else{
                       res.send(updatedCustomer);
                    }
                })
            }else {
                res.send("No such Customer found!");
            }
         }
     })
})

app.delete("/svr/customers/:id", function(req, res) {
    let id = req.params.id;
    let body = req.body;

    fs.readFile (fname, "utf8", function(err, content) {
        if (err) res.status(404).send(err);
        else {
           let customerArray = JSON.parse(content);
           let index = customerArray.findIndex((ele) => ele.id === id);
           if (index>=0) {
               let deletedCustomer = customerArray.splice(index, 1);
    
               let data1 = JSON.stringify(customers);
                fs.writeFile(fname, data1, function(err) {
                    if (err) res.status(404).send(err);
                    else{
                       res.send(deletedCustomer);
                    }
                })
           }else {
               res.send("No such Customer found!");
           }
        }
    })
})