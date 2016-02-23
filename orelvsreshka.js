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
var number = 0;

rl.on('line', function (cmd) {
    number = Math.ceil(Math.random() * 2);
    if (parseInt(cmd) === 1 || parseInt(cmd) === 2) {
        if (number === parseInt(cmd)) {
            console.log('Поздравляю вы угадали ');
            fs.appendFile(argv._[0], '+\n', null, 'ascii', function (err) {
                if (err) throw err;
            });
        } else {
            console.log("К сожалению вы не угадали");
            fs.appendFile(argv._[0], '-\n', null, 'ascii', function (err) {
                if (err) throw err;
            });
        }
    } else {
        if (parseInt(cmd) === 0) {
            rl.close();
        } else {
            console.log("Неверное значение.");
        }
    }
});

