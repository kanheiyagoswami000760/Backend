const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {

  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;
  const method = req.method;

  if (method === "GET" && pathname === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    return res.end("Welcome to Notes API");
  }

 
  else if (method === "GET" && pathname === "/notes") {

    const id = url.searchParams.get("id");

    fs.readFile("notes.json", "utf8", (err, data) => {
      if (err) {
        res.writeHead(500);
        return res.end("Error reading notes");
      }

      const notes = JSON.parse(data || "[]");

      res.writeHead(200, { "Content-Type": "application/json" });

      if (id) {
        const note = notes.find(n => String(n.id) === String(id));
        return res.end(JSON.stringify(note || {}));
      } else {
        return res.end(JSON.stringify(notes));
      }
    });
  }

  
  else if (method === "POST" && pathname === "/notes") {

    let body = "";

    req.on("data", chunk => {
      body += chunk;
    });

    req.on("end", () => {

      const newNote = JSON.parse(body);

      fs.readFile("notes.json", "utf8", (err, data) => {

        const notes = data ? JSON.parse(data) : [];

        notes.push(newNote);

        fs.writeFile("notes.json", JSON.stringify(notes, null, 2), () => {
          res.writeHead(201, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Note added" }));
        });

      });

    });
  }


  else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Route Not Found");
  }

});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
