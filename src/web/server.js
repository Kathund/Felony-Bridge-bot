const express = require("express");
const server = express();

function start() {
  server.listen(1439, () => {
    console.log("Web Server is Ready!");
  });
}

server.all("/", (req, res) => {
  res.send(` `);
});

module.exports = { start };

