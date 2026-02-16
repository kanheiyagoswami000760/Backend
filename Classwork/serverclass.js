const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
    const method = req.method;
    const url = req.url;

    const user = {
        name: "kanheiya",
        age: 20,
    };

    
    if (method === "GET" && url === "/") {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(user));
    }

    
    else if (method === "POST" && url === "/data") {
        let body = "";

        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", () => {
            fs.appendFile("./file.txt", body, (err) => {
                res.writeHead(201, "data created successfully",);
                res.end("");
            });
        });
    }
});

server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
