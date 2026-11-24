const fs = require("fs");

// Read file (synchronous)
const content = fs.readFileSync("exercises/dennismungai55/hello.js", "utf-8");

console.log("File contents:");
console.log(content);

// Read file (asynchronous)
fs.readFile("exercises/dennismungai55/hello.js", "utf-8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log("Asynchronous reading:");
  console.log(data);
});

// Write file
fs.writeFileSync("output.txt", "Hello, World!");

console.log("File created successfully!");

const path = require("path");

console.log("Joined path:");

console.log(path.join(__dirname, "files", "data.json"));

console.log("File extension:");

console.log(path.extname("photo.jpg"));
