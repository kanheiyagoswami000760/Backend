const http=require("http");
const fs=require("fs");

const server = http.createServer((req,res)=>{
    const date = new Date().toString();
    const log = req.method;
    const path=req.url;

    const logfile=date+" "+log+" "+path+"\n";
    fs.appendFile("log.txt",logfile,()=>{

    })
    
    res.end("server is runing");
})
server.listen(3000,()=>{
    console.log("server runing on  3000");
})