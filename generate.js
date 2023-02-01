#!/usr/bin/env node
// Tells terminal to use node to execute this file.

const projectGenerator = require('./challenges/2-project-generator');
// To send commands to CLI.
import { execSync } from 'child_process';

//const projectName = process.argv.slice(-1)[0];
const projectName = '/home/gk/northcoders-de/fun-callback-heaven/generatedTest';

projectGenerator(projectName, function() {});

execSync('npm install --dev', { encoding: 'utf-8' });

// npm install -g PATH_TO/fun-callback-heaven/
// WITH THE / AT THE END

// npm list -g to check

// npm uninstall -g be-callback-heaven
