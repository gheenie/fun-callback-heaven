const fs = require('fs');

function projectGenerator(projectName, cb) {
    let fd = fs.mkdir(projectName, { recursive: true }, cb);

    /*fs.open('mynewfile2.txt', 'w', function (err, file) {
        if (err) throw err;
        console.log('Saved!');
    });*/
}

module.exports = projectGenerator;
