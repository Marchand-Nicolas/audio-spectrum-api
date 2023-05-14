const fs = require("fs");
const path = require("path");
const config = require("./config.json");

function router(req, res) {
  const url = req.url;
  const absolutePath = process.cwd();
  try {
    if (url.startsWith("/post/"))
      eval(fs.readFileSync(path.join(absolutePath, `/requests${url}.js`)) + "");
    if (url.startsWith("/files/"))
      fs.readFile(path.join(absolutePath, `/requests${url}`), (err, data) => {
        if (err) {
          console.log(err);
          res.writeHead(404, config.headers);
          res.end();
        } else {
          res.writeHead(200, config.headers);
          res.end(data);
        }
      });
  } catch (e) {
    console.log(e + "\n lineNumber : " + e.lineNumber);
    res.writeHead(404);
    res.end();
  }
}

module.exports = router;
