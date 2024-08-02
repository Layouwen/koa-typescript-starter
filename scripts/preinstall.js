const fs = require('node:fs');
const path = require('node:path');

const dockerImagesDir = path.resolve(__dirname, '../docker-images');
const pkgDir = path.resolve(__dirname, '../pkg');

const dirs = [dockerImagesDir, pkgDir];

dirs.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
});
