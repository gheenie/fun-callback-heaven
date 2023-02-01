#!/usr/bin/env node
// Tells terminal to use node to execute this file.

const projectGenerator = require('./challenges/2-project-generator');
// To send commands to CLI.
const exec = require('child_process').exec;

//const projectName = process.argv.slice(-1)[0];
const projectName = '/home/gk/northcoders-de/fun-callback-heaven/generatedTest';

projectGenerator(projectName, function() {});

exec(`npm install --only=dev --prefix ${projectName}`, function() {});

// npm install -g PATH_TO/fun-callback-heaven/
// WITH THE -g AND THE / AT THE END

// npm list -g to check

// npm uninstall -g be-callback-heaven
