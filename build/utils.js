const path = require("path");
const glob = require("glob");
const fs = require("fs");

const __wd = path.resolve(__dirname, "../");

module.exports = {
  getEntry(globPath) {
    const chunks = {};
    glob.sync(globPath).forEach((chunkPath) => {
      const chunkName = chunkPath.replace(/\.\/src\/pages\//, "");
      if (fs.existsSync(path.join(__wd, chunkPath, "index.js")))
        chunks[chunkName] = {
          entry: path.join(__wd, chunkPath),
          template: fs.existsSync(path.join(__wd, chunkPath, "index.html"))
            ? path.join(__wd, chunkPath, "index.html")
            : path.join(__wd, "public/index.html"),
          filename: `${chunkName}.html`,
        };
    });
    return chunks;
  },
};
``;
