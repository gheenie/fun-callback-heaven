#!/usr/bin/env node
// Tells terminal to use node to execute this file.

const projectGenerator = require('./challenges/2-project-generator');
// For sending commands to CLI; async version.
const exec = require('child_process').exec;

const projectName = '/home/gk/northcoders-de/fun-callback-heaven/generatedTest';

projectGenerator(projectName, function() {});

//exec(`npm install --only=dev --prefix ${projectName}`, function() {});

const cliArgs = process.argv;
const lengthCliArgs = cliArgs.length;

if (lengthCliArgs > 2) {
    console.log(cliArgs[lengthCliArgs - 2], cliArgs[lengthCliArgs - 1]);
    // Add to github remote, ASYNCHRONOUSLY.
}

// npm install -g PATH_TO/fun-callback-heaven/
// MUST HAVE -g AND ENDING / 

// npm list -g to check

// npm uninstall -g be-callback-heaven
