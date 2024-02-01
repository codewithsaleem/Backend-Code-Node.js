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

//import mobiles array:-------------
let {mobilesData} = require("./serverNodeMobileData.js");

app.get("/mobiles", function(req, res) {
    let brandName = req.query.brandName;
    let color = req.query.color;
    let ramSize = req.query.ramSize;
    let romSize = req.query.romSize;

    let arr1 = mobilesData;

    if (brandName) {
        arr1 = arr1.filter((mobile) => mobile.brand === brandName);
    }

    if (color) {
        arr1 = arr1.filter((mobile) => mobile.colors.includes(color));
    }

    if (ramSize) {
        arr1 = arr1.filter((mobile) => mobile.RAM.includes(ramSize));
    }

    if (romSize) {
        arr1 = arr1.filter((mobile) => mobile.ROM.includes(romSize));
    }

    res.send(arr1);
});


app.get("/mobiles/:name", function(req, res) {
   let name = req.params.name;
   let mobile = mobilesData.find((m1) => m1.name === name);
   mobile ? res.send(mobile) : res.send("Error");
});
