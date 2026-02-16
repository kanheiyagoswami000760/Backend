const http = require("http");

const server = http.createServer((req, res) => {
    const method = req.method;
    const url = req.url;

    
    console.log(url, method);

    if (method === "GET" && url === "/") {
        res.end("hills");
    } 
});

server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
