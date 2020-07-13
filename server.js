const express = require("express");
const server = express();
const postsRouter = require("./posts/posts-router.js");

server.get("/", (req, res) => {
    res.send(`
    
    <p>Welcome to my API</p>
  `);
});


server.use(express.json());
server.use("/api/posts", postsRouter);

module.exports = server;