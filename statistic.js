/**
 * Created by Женя on 20.02.2016.
 */
var argv = require('minimist')(process.argv.slice(2));
var fs = require('fs');
process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
});

fs.readFile(argv._[0], function (err, data) {
    if (err) throw err;
    var text = data.toString();
    var lines = text.split('\n');
    var i = 0;
    var j = 0;
    lines.forEach(function (line) {
        if (line != "") {
            if (line == "+") {
                i++;
            } else {
                j++;
            }
        }
    });
    console.log("Количество сыграных партий " + (lines.length - 1));
    console.log("Выиграно партий " + i);
    console.log("Проиграно партий " + j);
    console.log(Math.ceil((i * 100) / (lines.length - 1)) + "% / " + (100 - Math.ceil((i * 100) / (lines.length - 1))) + "%");
    console.log("Наибольшее количестов выигрешей подряд " + countMaxLength("+", lines));
    console.log("Наибольшее количестов проигрышей подряд " + countMaxLength("-", lines));
});

function countMaxLength(str, arr) {
    var count = 0;
    var tmp_count = 0;
    arr.forEach(function (line) {
        if (line == str) {
            count++;
        } else {
            if (count >= tmp_count)
                tmp_count = count;
            count = 0;
        }
    });
    return tmp_count;
}

