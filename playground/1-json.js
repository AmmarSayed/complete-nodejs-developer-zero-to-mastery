const fs = require("fs");

// Getting a binary data
const dataBuffer = fs.readFileSync("./data.json");
// converting the binary data into string then into JSON
const useData = JSON.parse(dataBuffer.toString());

// change the data
useData.name = "Ammar";
useData.age = 34;
// Writing the data to the file again
fs.writeFileSync("./data.json", JSON.stringify(dataJSON));
