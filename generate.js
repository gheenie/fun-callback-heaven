#!/usr/bin/env node
// Tells terminal to use node to execute this file.

const projectGenerator = require('./challenges/2-project-generator');

//const projectName = process.argv.slice(-1)[0];
const projectName = '/home/gk/northcoders-de/fun-callback-heaven/generatedTest';

projectGenerator(projectName, function() {});
