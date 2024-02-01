let express = require("express");
let passport = require("passport");
let LocalStrategy = require("passport-local");
let { users, orders } = require("./serverNodeMidlleware2CookiesData.js")

let app = express();
app.use(express.json());
app.use(function (req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept",
   )
   res.header(
      "Access-Control-Allow-Methods",
      "PUT, POST, GET, DELETE, OPTIONS"
   )
   next();
})

app.use(passport.initialize());
app.listen(2410, () => console.log("Node app listening on 2410"));

let strategyAll = new LocalStrategy(function (username, password, done) {
   console.log("In LocalStrategy-All", username, password);
   let user1 = users.find((u) => u.name === username && u.password === password);
   console.log("user", user1);
   if (!user1) {
      return done(null, false, { message: "Incorrect username or password" });
   } else {
      return done(null, user1);
   }
})
let strategyAdmin = new LocalStrategy(function (username, password, done) {
   console.log("In LocalStrategy-Admin", username, password);
   let user1 = users.find((u) => u.name === username && u.password === password);
   console.log("user", user1);
   if (!user1) {
      return done(null, false, { message: "Incorrect username or password" });
   }
   else if (user1.role !== "admin") {
      return done(null, false, { message: "You do not have admin role" })
   }
   else {
      done(null, user1);
   }
})
passport.use("roleAll", strategyAll);
passport.use("roleAdmin", strategyAdmin);


app.post("/user", function (req, res) {
   let { username, password } = req.body;
   let user = users.find((u) => u.name === username && u.password === password);
   if (user) {
      let payload = { id: user.id };
      res.send(payload);
   } else {
      res.sendStatus(401);
   }
})

app.get("/user", passport.authenticate("roleAll", { session: false }), function (req, res) {
   console.log("In GET /user :  ", req.user);
   res.send(req.user);
})

app.get("/myOrders", passport.authenticate("roleAll", { session: false }), function (req, res) {
   console.log("In GET /myOrders :  ", req.user);
   let order1 = orders.filter((ele) => ele.userId === req.user.id);
   res.send(order1)
})

app.get("/allOrders", passport.authenticate("roleAdmin", { session: false }), function (req, res) {
   console.log("In GET /allOrders :  ", req.user);
   res.send(orders)
})

