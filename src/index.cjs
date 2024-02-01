#!/usr/bin/env node

const { program } = require("commander");
const fs = require("fs");
const { exec } = require("child_process");

program.argument("<package-name>");
program.parse();

const packageName = program.args[0];
console.log(`Trying to publish "${packageName}" package`);

const packageJson = {
  name: packageName,
  version: "0.0.0-dev",
  private: false,
};

if (!fs.existsSync("./tmp")) {
  fs.mkdirSync("./tmp");
}

fs.writeFileSync("./tmp/package.json", JSON.stringify(packageJson));
exec("cd tmp && npm publish", (err, stdout) => {
  if (err) {
    console.error(err);
  }
  console.log(stdout);
});
