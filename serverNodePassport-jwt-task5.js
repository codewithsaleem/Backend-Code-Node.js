let express = require("express");
let passport = require("passport");
let jwt = require("jsonwebtoken");
let JWTStrategy = require("passport-jwt").Strategy;
let ExtractJWT = require("passport-jwt").ExtractJwt;

let app = express();
app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    )
    // res.header("Access-Control-Expose-Headers", "Authorization");
    // res.header("Access-Control-Expose-Headers", "X-Auth-Token");
    // res.header("Access-Control-Expose-Headers");
    res.header(
        "Access-Control-Allow-Methods",
        "PUT, POST, GET, DELETE, OPTIONS"
    )
    next();
})
app.use(passport.initialize());
app.listen(2410, () => console.log("Node app listening on 2410"));

let employee = [
    { empCode: 1451, name: "Jack", department: "Finance", designation: "Manager", salary: 52500, gender: "Male" },
    { empCode: 1029, name: "Steve", department: "Technology", designation: "Manager", salary: 71000, gender: "Male" },
    { empCode: 1891, name: "Anna", department: "HR", designation: "Manager", salary: 55100, gender: "Female" },
    { empCode: 1322, name: "Kathy", department: "Operations", designation: "Manager", salary: 49200, gender: "Female" },
    { empCode: 1367, name: "Bob", department: "Marketing", designation: "Manager", salary: 39000, gender: "Male" },
    { empCode: 1561, name: "George", department: "Finance", designation: "Trainee", salary: 22500, gender: "Male" },
    { empCode: 1777, name: "Harry", department: "Technology", designation: "Trainee", salary: 31000, gender: "Male" },
    { empCode: 1606, name: "Julia", department: "HR", designation: "Manager", Trainee: 25100, gender: "Female" },
    { empCode: 1509, name: "Kristina", department: "Operations", designation: "Trainee", salary: 19200, gender: "Female" },
    { empCode: 1533, name: "William", department: "Marketing", designation: "Trainee", salary: 16200, gender: "Male" },
    { empCode: 1161, name: "Stephen", department: "Finance", designation: "VP", salary: 82500, gender: "Male" },
    { empCode: 1377, name: "Winston", department: "Technology", designation: "VP", salary: 91000, gender: "Male" },
    { empCode: 1206, name: "Victoria", department: "HR", designation: "Manager", VP: 65100, gender: "Female" },
    { empCode: 1809, name: "Pamela", department: "Operations", designation: "VP", salary: 78600, gender: "Female" },
    { empCode: 1033, name: "Tim", department: "Marketing", designation: "VP", salary: 66800, gender: "Male" },
    { empCode: 1787, name: "Peter", department: "Technology", designation: "Manager", salary: 47400, gender: "Male" },
    { empCode: 1276, name: "Barbara", department: "Technology", designation: "Trainee", salary: 21800, gender: "Female" },
    { empCode: 1859, name: "Donna", department: "Operations", designation: "Trainee", salary: 21900, gender: "Female" },
    { empCode: 1874, name: "Igor", department: "Operations", designation: "Manager", salary: 48300, gender: "Male" },
]


const params = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: "jwtsecret23647832",
}
const jwtExpirySeconds = 300;
let strategyAll = new JWTStrategy(
    params, function (token, done) {
        console.log("In JWTStrategy-All", token);
        let emp1 = employee.find((u) => u.empCode === token.empCode);
        console.log("emp1", emp1);
        if (!emp1) {
            return done(null, false, { message: "Incorrect username or password" });
        } else {
            return done(null, emp1);
        }
    })
passport.use("roleAll", strategyAll);

app.post("/emp", function (req, res) {
    let { empCode, name } = req.body;
    let emp = employee.find((u) => u.empCode === +empCode && u.name === name);
    if (emp) {
        let payload = { empCode: emp.empCode };
        let token = jwt.sign(payload, params.secretOrKey, {
            algorithm: "HS256",
            expiresIn: jwtExpirySeconds,
        });
        // res.setHeader("Authorization", token);
        // res.setHeader("X-Auth-Token", token);
        res.send(token);
    } else {
        res.sendStatus(401);
    }
})
app.get("/myDetails", passport.authenticate("roleAll", { session: false }), function (req, res) {
    console.log("In GET /user :  ", req.user);
    res.send(req.user);
})

app.get("/myJuniors", passport.authenticate("roleAll", { session: false }), function (req, res) {
    let user = employee.find((ele) => ele.empCode === req.user.empCode);
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

let allRequestsArray = [];
app.get("/tracker", passport.authenticate("roleAll", { session: false }), function (req, res) {
    if (!req.user) {
        let tracker = { user: "Guest", url: "/tracker", date: Date.now() };
        allRequestsArray.push(tracker);
        res.cookie("tracker", tracker);
        res.send(allRequestsArray);
    } else {
        let name = req.user.name;
        let tracker = { user: name, url: "/tracker", date: Date.now() };
        allRequestsArray.push(tracker);
        res.cookie("tracker", tracker);
        res.send(allRequestsArray);
    }
});