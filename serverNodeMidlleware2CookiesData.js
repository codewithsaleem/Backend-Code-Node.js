let users = [
    {
        id:1,
        name:"John",
        password:"john",
        role:"admin",
    },
    {
        id:2,
        name:"Sarah",
        password:"sarah",
        role:"user",
    },
    {
        id:3,
        name:"George",
        password:"george",
        role:"user",
    },
];
let orders = [
    {orderId: 1, userId: 1, qty:10, value:55},
    {orderId: 2, userId: 2, qty:15, value:58},
    {orderId: 3, userId: 3, qty:17, value:52},
    {orderId: 4, userId: 1, qty:12, value:50},
    {orderId: 5, userId: 1, qty:11, value:51},
    {orderId: 6, userId: 2, qty:16, value:53},
    {orderId: 7, userId: 2, qty:19, value:58},
    {orderId: 8, userId: 1, qty:11, value:59},
];
let mobiles = ["Apple iPhone 11", "Samsung Galaxy 9", "Google Pixel 4"];
let laptops = ["HP 2305X", "Dell Inspiron 312X", "Macbook Air"];
let offers = ["5% of on mobiles", "8% cashback on laptops"];

module.exports = {users, mobiles, laptops, offers, orders};