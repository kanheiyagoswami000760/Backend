const fs = require("fs");
// console.log(fs);

const readTodo = function() {
    const data = fs.readFileSync("todos.json","utf-8");
    return JSON.parse(data);
}

console.log(readTodo());