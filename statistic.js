/**
 * Created by Женя on 20.02.2016.
 */
var argv = require('minimist')(process.argv.slice(2));
var fs = require('fs');
process.on('uncaughtException', function(err) {
    console.log('Caught exception: ' + err);
});
fs.open(argv._[0], "r", 0644, function (err, file_handle) {

    if (err) throw err;
    fs.readFile(file_handle, function (err, data) {
        if (err) throw err;
        var text = data.toString();
        var lines = text.split('\n');
        var i = 0;
        var j = 0;
        var tmp_count_plus = 0;
        var tmp_count_minus = 0;
        var count_minus = 0;
        var count_plus = 0;

        var results = {};
        console.log("Количество сыграных партий " + (lines.length - 1));
        lines.forEach(function (line) {

            if (line != "") {
                if (line == "+") {
                    i++;
                    count_plus++;
                } else {
                    if (count_plus >= tmp_count_plus)
                        tmp_count_plus = count_plus;
                    count_plus = 0;
                }
                if (line == "-") {
                    j++;
                    count_minus++;
                }
                else {
                    if (count_minus >= tmp_count_minus)
                        tmp_count_minus = count_minus;
                    count_minus = 0;
                }
            }


        });
        console.log("Выиграно партий " + i);
        console.log("Проиграно партий " + j);
        console.log(((i * 100) / (lines.length - 1)) + "% / " + (100 - ((i * 100) / (lines.length - 1))) + "%");
        console.log("Наибольшее количестов выигрешей подряд " + tmp_count_plus);
        console.log("Наибольшее количестов проигрышей подряд " + tmp_count_minus);


    });

});