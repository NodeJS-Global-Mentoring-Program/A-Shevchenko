var fs = require('fs');
var csv = require('csvtojson');

var csvFilePath = './basic/csv/task2.csv';

fs.readFile(csvFilePath, (err, fileData) => {
    if (err) {
        throw err;
    }

    csv().fromString(fileData.toString()).then(function(data) {
        var newData = data.map(el => JSON.stringify(el)).join('\n');
    
        fs.writeFile('./basic/csv/task2new.csv', newData, function(err) {
            if (err) {
                throw err;
            }
        });
    });
});