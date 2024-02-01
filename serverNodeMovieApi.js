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
        "GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD"
    );
    next();
});
const port = 2410;
app.listen(port, () => console.log(`Node app listening on port ${port}`));

let { movies, users } = require("./serverNodeMovieData.js");
// let baseURL = "https://us-central1-bkyow-22da6.cloudfunctions.net/app";


app.get("/movies", function (req, res) {
    let city = req.params.city;
    let { q, lang, format, genre } = req.query;
    let arr = movies;

    if (q) arr = arr.filter((ele) => ele.title === q);
    if (lang) arr = arr.filter((ele) => ele.language === lang);
    if (format) arr = arr.filter((ele) => ele.format === format);
    if (genre) arr = arr.filter((ele) => ele.genre === genre);

    res.send(arr)
})

//login:----
app.post("/login", function (req, res) {
    let body = req.body;
    let verifyEmailPass = users.find((ele) => ele.email === body.email);
    console.log(verifyEmailPass)

    if (verifyEmailPass) {
        res.send(verifyEmailPass);
    } else {
        res.status(404).send("Invalid Credentials. Login again!!!")
    }
})
app.get("/loginDetails", function(req, res) {
    res.send(users)
})