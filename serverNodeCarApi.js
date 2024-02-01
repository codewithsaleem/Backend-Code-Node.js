let express = require("express");
let app = express();

app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD",
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

const port = 2410;
app.listen(port, () => console.log(`Listening on port ${port}`));

//import car array:----------------
let { cars, carMaster } = require("./serverNodeCarData.js");

app.get("/carMaster", function (req, res) {
    console.log("inside car master")
    res.send(carMaster);
});

app.get("/cars", function (req, res) {
    let fuel = req.query.fuel;
    let type = req.query.type;
    let minPrice = +req.query.minPrice;
    let maxPrice = +req.query.maxPrice;

    let sort = req.query.sort;

    let fnd1 = carMaster.filter((ele) => ele.fuel === "Diesel")
    let fnd2 = carMaster.filter((ele) => ele.fuel === "Petrol")
    let fnd3 = carMaster.filter((ele) => ele.type === "Hatchback")
    let fnd4 = carMaster.filter((ele) => ele.type === "Sedan")

    let fnd5 = cars.filter((ele) => fnd1.find((md1) => md1.model === ele.model));
    let fnd6 = cars.filter((ele) => fnd2.find((md1) => md1.model === ele.model));
    let fnd7 = cars.filter((ele) => fnd3.find((md1) => md1.model === ele.model));
    let fnd8 = cars.filter((ele) => fnd4.find((md1) => md1.model === ele.model));

    let arr1 = cars;

    if (fuel === "Diesel") arr1 = fnd5;
    if (fuel === "Petrol") arr1 = fnd6;
    if (type === "Hatchback") arr1 = fnd7;
    if (type === "Sedan") arr1 = fnd8;
    if (minPrice) arr1 = arr1.filter((ele) => ele.price >= minPrice);
    if (maxPrice) arr1 = arr1.filter((ele) => ele.price <= maxPrice);

    if (sort === "kms") arr1.sort((k1, k2) => (+k1.kms) - (k2.kms));
    if (sort === "price") arr1.sort((k1, k2) => (+k1.price) - (k2.price));
    if (sort === "year") arr1.sort((k1, k2) => (+k1.year) - (k2.year));
    
    res.send(arr1);
});

app.get("/cars/:id", function (req, res) {
    let id = req.params.id;
    let arr1 = cars;
    let fnd = cars.find((ele) => ele.id === id);

    res.send(fnd);
})

app.post("/cars", function (req, res) {
    let body = req.body;

    let updatedCar = { ...body };
    cars.push(updatedCar);
    res.send(updatedCar);
});

app.put("/cars/:id", function (req, res) {
    let id = req.params.id;
    let body = req.body;

    let index = cars.findIndex((ele) => ele.id === id);
    if (index >= 0) {
        let updateCar = { id: id, ...body };
        cars[index] = updateCar;
        res.send(updateCar);
    } else {
        res.status(404).send("No car found");
    }
});

app.delete("/cars/:id", function (req, res) {
    let id = req.params.id;
    let body = req.body;

    let index = cars.findIndex((ele) => ele.id === id);
    if (index >= 0) {
        let deletedCar = cars.splice(index, 1);
        res.send(deletedCar);
    } else {
        res.status(404).send("No car found");
    }
})


