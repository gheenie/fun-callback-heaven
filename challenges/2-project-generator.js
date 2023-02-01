const fs = require('fs');

function projectGenerator(projectName, cb) {
  fs.mkdir(projectName, { recursive: true }, cb);

  fs.writeFile(`${projectName}/index.js`, '', cb);

  fs.writeFile(`${projectName}/.gitignore`, 'node_modules', cb);

  fs.mkdir(`${projectName}/spec`, { recursive: true }, cb);

  fs.writeFile(`${projectName}/spec/index.test.js`, '', cb);

  fs.writeFile(`${projectName}/README.md`, `# ${projectName}`, cb);

  fs.mkdir(`${projectName}/.git`, { recursive: true }, cb);

  fs.writeFile(`${projectName}/.eslintrc.json`, ``, cb);

  const contents = `{
    "name": "be-callback-heaven",
    "version": "1.0.0",
    "description": "go to the northcoders l2c app for todays sprint...",
    "main": "index.js",
    "scripts": {
      "test": "jest",
      "generate": "node ./generate.js",
      "remove-project": "node ./remove-project.js"
    },
    "repository": {
      "type": "git",
      "url": "git+https://github.com/northcoders/BE-callback-heaven.git"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "bugs": {
      "url": "https://github.com/northcoders/BE-callback-heaven/issues"
    },
    "homepage": "https://github.com/northcoders/BE-callback-heaven#readme",
    "devDependencies": {
      "jest": "^27.5.1",
      "jest-extended": "^1.1.0"
    }
  }`;
  fs.writeFile(`${projectName}/package.json`, contents, cb);
}

module.exports = projectGenerator;
