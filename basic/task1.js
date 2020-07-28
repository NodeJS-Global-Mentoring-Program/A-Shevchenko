var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

rl.on('line', function(val) {
    console.log(val.split('').reverse().join('') + '\n');
});