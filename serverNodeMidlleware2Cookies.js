var express = require("express");
var app = express();
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
app.use(cookieParser("abcdef-3477819"));

let { laptops, mobiles, users } = require("./serverNodeMidlleware2CookiesData.js");
let { employee } = require("./serverNodeMidlleware2CookiesData2.js");
const allRequestsArray = [];


app.get("/viewPage", function (req, res) {
    let name = req.signedCookies.name;
    let counter = req.signedCookies.counter;
    console.log(name);
    if (!name) {
        res.cookie("name", "Guest", { maxAge: 50000, signed: true });
        res.cookie("counter", 1, { maxAge: 50000, signed: true });
        res.send("Cookie Set");
    } else {
        res.cookie("counter", +counter + 1, { signed: true });
        res.send(`Cookie recvd for name:${name} counter: ${counter}`);
    }
})
app.get("/tracker", function (req, res) {
    // Check if the user cookie exists
    if (!req.cookies.user) {
        let tracker = { user: "Guest", url: "/tracker", date: Date.now() };
        allRequestsArray.push(tracker);
        res.cookie("tracker", tracker);
        res.send(allRequestsArray);
    } else {
        let name = req.cookies.user.name;
        let tracker = { user: name, url: "/tracker", date: Date.now() };
        allRequestsArray.push(tracker);
        res.cookie("tracker", tracker);
        res.send(allRequestsArray);
    }
});

app.post("/viewPage", function (req, res) {
    let { name } = req.body;
    res.cookie("name", name, { maxAge: 50000, signed: true });
    res.cookie("counter", 1, { maxAge: 50000, signed: true });
    res.send(`Cookie set with name: ${name}`);
})
app.delete("/viewPage", function (req, res) {
    res.clearCookie("name");
    res.clearCookie("counter");
    res.send("Cookie deleted");
})

app.get("/mobiles", function (req, res) {
    let userData = req.signedCookies.userData;
    if (!userData) {
        userData = { user: "Guest", pages: [] };
    }
    userData.pages.push({ url: "/mobiles", date: Date.now() });
    res.cookie("userData", userData, { maxAge: 30000, signed: true });
    res.send(mobiles);
})
app.post("/login", function (req, res) {
    let { name, empCode } = req.body;
    let user = employee.find((ele) => ele.name === name && ele.empCode === +empCode);
    if (!user) res.status(401).send("Login failed");
    else {
        res.cookie("user", user);
        res.send("Login success");
    }
})
app.get("/logout", function (req, res) {
    res.clearCookie("empcode");
    res.send("Cookies cleared!");
})

app.get("/myDetails", function (req, res) {
    let empcode = req.cookies.user;

    // Check if empcode is present in signed cookies
    if (!empcode) {
        res.status(401).send("Unauthorized");
        return;
    }

    // Convert empcode to number for comparison
    empcode = +empcode;

    let userDetails = employee.find((ele) => ele.name === empcode);
    if (!userDetails) {
        res.status(404).send("Not Found!");
    } else {
        res.send(userDetails);
    }
});

app.get("/company", function (req, res) {
    res.cookie("empcode");
    res.send("Welcome");
})

// GET /myJuniors
app.get("/myJuniors", function (req, res) {
    let empcode = req.signedCookies.empcode;

    // Check if empcode is present in signed cookies
    if (!empcode) {
        res.status(401).send("Unauthorized");
        return;
    }

    // Convert empcode to number for comparison
    empcode = +empcode;

    let user = employee.find((ele) => ele.empCode === empcode);
    if (!user) {
        res.status(404).send("Not Found!");
    } else {
        const juniors = employee.filter((emp) => {
            if (user.designation === "VP") {
                return emp.designation === "Manager" || emp.designation === "Trainee";
            } else if (user.designation === "Manager") {
                return emp.designation === "Trainee";
            } else {
                return false;
            }
        });
        res.send(juniors);
    }
});