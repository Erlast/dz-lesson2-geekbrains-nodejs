/**
 * Created by Женя on 26.02.2016.
 */
var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin, // ввод из стандартного потока
    output: process.stdout // вывод в стандартный поток
});
var dealer = {value: 0}, you = {value: 0};
var deck = [];

function in_array(value, array) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] == value) return true;
    }
    return false;
}
function Shuffle(max) {
    num = Math.random() * max;
    return Math.round(num) + 1;
}
function GetSuit() {
    suit = Shuffle(4);

    switch (suit) {
        case 1 :
            return "Пик";
        case 2 :
            return "Треф";
        case 3 :
            return "Бубен";
        default:
            return "Червей";
    }
}
function CardName(card) {
    switch (card) {
        case 1  :
            return "Туз";
        case 11 :
            return "Валет";
        case 12 :
            return "Дама";
        case 13 :
            return "Король";
        default :
            return card;
    }
}
function CardValue(card, who) {
    if (card == 1) {
        if (who == "You" && you.value > 10) {
            return 1;
        }
        else return 11;
    }
    if (card > 10) return 10;
    return card;
}
function DrawCard(who) {
    card = Shuffle(12);
    suit = GetSuit();
    if (in_array(CardName(card) + " " + suit, deck)) {
        DrawCard(who);
    }
    deck.push(CardName(card) + " " + suit);
    console.log(CardName(card) + " " + suit);
    return CardValue(card, who);
}
function NewGame() {
    dealer.value = 0;
    you.value = 0;
    deck = [];
    console.log("Игра началась!\n");
    console.log("Карта сдающего");
    dealer.value = dealer.value + DrawCard("Dealer");
    console.log("\nВаши карты");
    you.value = you.value + DrawCard("You") + DrawCard("You");
    console.log("\nОчков у сдающего: " + dealer.value);
    console.log("Ваши очки: " + you.value + "\n");
    secondMenu();
}
function Dealer() {
    console.log("\nСдающий тянет карты: ");
    while (dealer.value < 17) {
        dealer.value = dealer.value + DrawCard("Dealer");
        console.log("\nОчков у сдающего: " + dealer.value);
    }
}
function Player() {
    console.log("Ваша карта");
    you.value = you.value + DrawCard("You");
    console.log("Итого очков: " + you.value);
    if (you.value < 21) {
        secondMenu();
    }
    if (you.value > 21) {
        console.log("Вы проиграли!");
        menu();
    }
}
function Declare() {
    if (dealer.value > 21) {
        console.log("Вы выиграли!");
    }
    else if (you.value > dealer.value) {
        console.log("Вы выиграли!");
    }
    else if (dealer.value == you.value) {
        console.log("Вы проиграли");
    }
    else {
        console.log("Вы проиграли");
    }
    menu();
}
function menu() {
    rl.question('1. Новая игра\n2. Выход\n', function (answer) {
        switch (answer) {
            case "1":
                NewGame();
                break;
            case "2":
                rl.close();
                break;
            default:
                menu();
        }
    });
}
function secondMenu() {
    rl.question('1.Тянуть карту\n2.Мне хватит\n3.Выход\n', function (answer) {
        switch (answer) {
            case "1":
                Player();
                break;
            case "2":
                Dealer();
                Declare();
                break;
            case "3":
                menu();
                break;
            default:
                secondMenu();
        }

    });

}

menu();