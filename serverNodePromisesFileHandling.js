let fs = require("fs");

function getStat(filename) {
    fs.promises
        .stat(filename)
        .then((content) => console.log(content))
        .catch((err) => console.log(err));
}
function getAccess(filename) {
    fs.promises.access(filename).then(() => console.log("Exists")).catch(() => console.log("Does not exists"));
}
function getRead(filename) {
    fs.promises
        .readFile(filename, "utf8")
        .then((content) => console.log("Read File : ", content))
        .catch((err) => console.log(err));
}
function getWrite(filename, data) {
    fs.promises.writeFile(filename, data).catch(() => console.log(err));
}
function getAppend(filename, data) {
    fs.promises.appendFile(filename, data).catch(() => console.log(err));
}

let fname = "./serverNodeFile.txt";
// getStat(fname);
// getAccess(fname);
getRead(fname);
// getWrite(fname, "Hi Saleem")
// getAppend(fname, "I am from ")