const http = require("http");
const router = require("./utils/router");
const dotenv = require("dotenv");
dotenv.config();

const server = http.createServer(function (req, res) {
  router(req, res);
});
server.listen(process.env.port, process.env.IP, () => {
  console.log("Spectre Audio API started");
});
