/**
 * User: EVGENIA
 * Mail: bunny9@bk.ru
 * Date: 13.02.2016
 * Time: 22:21
 */
var readline = require('readline');
var argv = require('minimist')(process.argv.slice(2));
var fs = require('fs');
var rl = readline.createInterface({
    input: process.stdin, // ввод из стандартного потока
    output: process.stdout // вывод в стандартный поток
});

console.log("Угадай число 1 или 2?");
console.log("Для выхода из игры нажмите 0");
var number=0;

rl.on('line', function (cmd) {
    number = (Math.floor(Math.random() * (2 - 1 + 1)) + 1);
    if (cmd == 1 || cmd == 2) {
        fs.open(argv._[0],'a+',0777, function(err, file_handle) {
            if (err) throw err;
            if (number == cmd) {
                console.log('Поздравляю вы угадали ');
                fs.write(file_handle, '+\n', null, 'ascii', function(err) {
                    if (err) throw err;
                });
            } else {
                console.log("К сожалению вы не угадали");
                fs.write(file_handle, '-\n', null, 'ascii', function(err) {
                    if (err) throw err;
                });
            }

        });
    } else {
        if (cmd == 0) {
            rl.close();
        } else {
            console.log("Неверное значение.");
        }
    }
});

