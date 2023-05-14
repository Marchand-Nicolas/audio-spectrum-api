const formidable = require("formidable");
const config = require("../utils/config.json");

const form = formidable();
form.uploadDir = "requests/files";
form.parse(req, function (err, fields, data) {
  const file = data.file;
  if (!file) return;
  if (err) console.log("some error", err);
  else {
    const name =
      file.newFilename +
      "." +
      file.originalFilename.split(".")[
        file.originalFilename.split(".").length - 1
      ];
    const path = file.filepath;
    fs.renameSync(path, form.uploadDir + "/" + name);
    res.writeHead(200, config.headers);
    res.end(`{ "result": true, "name":"${name}" }`);
  }
});
