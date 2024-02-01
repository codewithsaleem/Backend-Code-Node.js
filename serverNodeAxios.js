//ND-B1#5:- Task 1.1 (a, b)
var express = require("express");
let app = express();
let fs = require("fs");
let fname = "serverNodeJSON.json";
const bodyParser = require('body-parser');
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
app.use(showURLAndMethod)
const port = 2410;
app.listen(port, () => console.log(`Node app listening pon port ${port}`))
let baseURL = "https://repo-8qu2.onrender.com/productServer";
let baseURL1 = "https://repo-8qu2.onrender.com/messageServer";
let baseURL2 = "https://repo-8qu2.onrender.com/studentServer";
let axios = require("axios");
const { error } = require("console");


app.get("/myserver/customers", function (req, res) {
    axios.get(baseURL + "/customers")
        .then(function (response) {
            console.log(response);
            res.send(response.data)
        })
        .catch(function (error) {
            if (error.response) {
                let { status, statusText } = error.response;
                console.log(status, statusText);
                res.status(status).send(statusText);
            } else {
                res.status(404).send(error);
            }
        })
})

app.get("/myserver/products", function (req, res) {
    axios.get(baseURL + "/products")
        .then(function (response) {
            console.log(response);
            res.send(response.data);
        })
        .catch(function (error) {
            if (error.response) {
                let { status, statusText } = error.response;
                res.status(status).send(statusText);
            } else {
                res.status(404).send(error);
            }
        })
})

app.get("/myserver/orders", function (req, res) {
    let { cust, prod } = req.query;
    let params = {};
    if (cust) params.cust = cust;
    if (prod) params.prod = prod;

    axios.get(baseURL + "/orders", { params: params })
        .then(function (response) {
            res.send(response.data);
        })
        .catch(function (error) {
            if (error.response) {
                let { status, statusText } = error.response;
                res.status(status).send(statusText);
            } else {
                res.status(404).send(error);
            }
        })
})

app.post("/myserver/orders", function (req, res) {
    let body = req.body;

    axios.post(baseURL + "/orders", body)
        .then(function (response) {
            res.send(response.data);
        })
        .catch(function (error) {
            if (error.response) {
                let { status, statusText } = error.response;
                res.status(status).send(statusText);
            } else {
                res.status(404).send(error);
            }
        })
})

app.get("/myserver/orders/customer/:cust", function (req, res) {
    let { cust } = req.params;

    axios.get(`${baseURL}/orders/customer/${cust}`)
        .then(function (response) {
            res.send(response.data);
        })
        .catch(function (error) {
            if (error.response) {
                let { status, statusText } = error.response;
                res.status(status).send(statusText);
            } else {
                res.status(404).send(error);
            }
        })
})

app.get("/myserver/orders/product/:prod", function (req, res) {
    let { prod } = req.params;

    axios.get(`${baseURL}/orders/product/${prod}`)
        .then(function (response) {
            res.send(response.data);
        })
        .catch(function (error) {
            if (error.response) {
                let { status, statusText } = error.response;
                res.status(status).send(statusText);
            } else {
                res.status(404).send(error);
            }
        })
})


app.post("/myserver2/login", function (req, res) {
    let body = req.body;

    axios.post(baseURL1 + "/login", body)
        .then(function (response) {
            res.send("" + response.data);//convert into string 
        })
        .catch(function (error) {
            if (error.response) {
                let { status, statusText } = error.response;
                res.status(status).send(statusText);
            } else {
                res.status(404).send(error);
            }
        })
})

app.get("/myserver2/messages", function (req, res) {
    let token = req.header("authorization") || "dummyvalue";

    axios.get(baseURL1 + "/messages", { headers: { authorization: token } })
        .then((response) => {
            res.send(response.data);
        })
        .catch((error) => {
            if (error.response) {
                let { status, statusText } = error.response;
                res.status(status).send(statusText);
            } else {
                res.status(404).send(error);
            }
        })
})

app.post("/myserver2/messages", function (req, res) {
    let token = req.header("authorization");
    if (!token) res.status(401).send("No token found. Provide a valid token")
    else {
        let body = req.body;
        axios.post(baseURL1 + "/messages", body, { headers: { authorization: token } })
            .then((response) => {
                res.send(response.data);
            })
            .catch((error) => {
                if (error.response) {
                    let { status, statusText } = error.response;
                    res.status(status).send(statusText);
                } else {
                    res.status(404).send(error);
                }
            })
    }
})


app.get("/myserver3/getToken", function (req, res) {
    let token = req.header("authorization");
    if (!token) res.status(401).send("No token found. Provide a valid token")
    else {
        axios.get(baseURL2 + "/getToken", { headers: { authorization: token } })
            .then((response) => {
                res.send("" + response.data);//convert into string
            })
            .catch((error) => {
                if (error.response) {
                    let { status, statusText } = error.response;
                    res.status(status).send(statusText);
                } else {
                    res.status(404).send(error);
                }
            })
    }
})

app.get("/myserver3/students", function (req, res) {
    let token = req.header("authorization");
    if (!token) res.status(401).send("No token found. Provide a valid token")
    else {
        axios.get(baseURL2 + "/students", { headers: { authorization: token } })
            .then((response) => {
                res.send(response.data);
            })
            .catch((error) => {
                if (error.response) {
                    let { status, statusText } = error.response;
                    res.status(status).send(statusText);
                } else {
                    res.status(404).send(error);
                }
            })
    }
})

app.get("/myserver3/students/:id", function (req, res) {
    let id = +req.params.id;
    let token = req.header("authorization");
    if (!token) res.status(401).send("No token found. Provide a valid token")
    else {
        axios.get(`${baseURL2}/students/${id}`, { headers: { authorization: token } })
            .then((response) => {
                res.send(response.data);
            })
            .catch((error) => {
                if (error.response) {
                    let { status, statusText } = error.response;
                    res.status(status).send(statusText);
                } else {
                    res.status(404).send(error);
                }
            })
    }
})

app.get("/myserver3/students/course/:name", function (req, res) {
    let name = req.params.name;
    let token = req.header("authorization");
    if (!token) res.status(401).send("No token found. Provide a valid token")
    else {
        axios.get(`${baseURL2}/students/course/${name}`, { headers: { authorization: token } })
            .then((response) => {
                res.send(response.data);
            })
            .catch((error) => {
                if (error.response) {
                    let { status, statusText } = error.response;
                    res.status(status).send(statusText);
                } else {
                    res.status(404).send(error);
                }
            })
    }
})

app.post("/myserver3/students", function (req, res) {
    let body = req.body;
    let token = req.header("authorization");
    if (!token) res.status(401).send("No token found. Provide a valid token")
    else {
        axios.post(baseURL2 + "/students", body, { headers: { authorization: token } })
            .then((response) => {
                res.send(response.data);
            })
            .catch((error) => {
                if (error.response) {
                    let { status, statusText } = error.response;
                    res.status(status).send(statusText);
                } else {
                    res.status(404).send(error);
                }
            })
    }
})

app.put("/myserver3/students/:id", function (req, res) {
    let id = +req.params.id;
    let body = req.body;
    let token = req.header("authorization");
    if (!token) res.status(401).send("No token found. Provide a valid token")
    else {
        axios.put(`${baseURL2}/students/${id}`, body, { headers: { authorization: token } })
            .then((response) => {
                res.send(response.data);
            })
            .catch((error) => {
                if (error.response) {
                    let { status, statusText } = error.response;
                    res.status(status).send(statusText);
                } else {
                    res.status(404).send(error);
                }
            })
    }
})

app.delete("/myserver3/students/:id", function (req, res) {
    let id = +req.params.id;
    let token = req.header("authorization");
    if (!token) res.status(401).send("No token found. Provide a valid token")
    else {
        axios.delete(`${baseURL2}/students/${id}`, { headers: { authorization: token } })
            .then((response) => {
                res.send(response.data);
            })
            .catch((error) => {
                if (error.response) {
                    let { status, statusText } = error.response;
                    res.status(status).send(statusText);
                } else {
                    res.status(404).send(error);
                }
            })
    }
})








// Task:2.2:-
let allRequestsArray = [];
function showURLAndMethod(req, res, next) {
    const pageInfo = { method: req.method, url: req.url, body: req.body };
    allRequestsArray.push(pageInfo)
    req.pageInfo = pageInfo;
    next();
}

app.get('/testServer/allRequests', function (req, res) {
    fs.promises.readFile(fname, 'utf8')
        .then((content) => {
            let logData = JSON.parse(content);
            logData.push(allRequestsArray);
            res.send(allRequestsArray)
        })
        .catch((err) => res.status(500).send(err));
});

app.get('/testServer/allRequests/:method', (req, res) => {
    const requestedMethod = req.params.method

    // Read the log file
    fs.promises.readFile(fname, 'utf8')
        .then((content) => {
            const logData = JSON.parse(content);

            // Filter log data based on the requested method
            const filteredData = logData.filter((entry) => entry.method === requestedMethod);

            res.send(filteredData);
        })
        .catch((err) => res.status(500).send(err));
});







// POST endpoint to handle API requests from the React app
app.post("/myServer/apiRequest", async function (req, res) {
    const { method, fetchURL, data } = req.body;
    console.log(method, fetchURL, data)

    await axios.post(fetchURL, { method: method, url: fetchURL, data: data })
        .then((resp) => {
            // Log the request information
            allRequestsArray.push({
                method: 'POST',
                url: '/myServer/apiRequest',
                body: req.body,
                response: apiResponse.data,
            });
            res.json({ response: apiResponse.data });
        })
        .catch((error) => {
            if (error.response) {
                let { status, statusText } = error.response;
                res.status(status).send(statusText);
            } else {
                res.status(404).send(error);
            }
        })
});
