class Card {
    constructor(suit, number, value, image) {
        this.suit = suit;
        this.number = number;
        this.value = value;
        this.image = image;
    }
    toString() {
        return this.number + " of " + this.suit;
    }
}

class Deck {
    constructor() {
        this.cards = [];
        let suits = ["spade", "heart", "diamond", "club"];
        let numbers = ["A", "K", "Q", "J", "10", "9", "8", "7", "6", "5", "4", "3", "2"];
        let values = [11, 10, 10, 10, 10, 9, 8, 7, 6, 5, 4, 3, 2];

        for (let i = 0; i < suits.length; i++) {
            for (let j = 0; j < numbers.length; j++) {
                let card = new Card(suits[i], numbers[j], values[j]);
                this.cards.push(card);
            }
        }
    }
}

let deck = new Deck();

function shuffle() {
    for (i = 0; i < 100; i++) {
        let randomIndex = Math.floor(Math.random() * deck.cards.length);
        let randomIndex2 = Math.floor(Math.random() * deck.cards.length);

        let temp = deck.cards[randomIndex];
        deck.cards[randomIndex] = deck.cards[randomIndex2];
        deck.cards[randomIndex2] = temp;
    }
}

function draw() {
    let drawnCard = deck.cards.pop();
    return drawnCard;
}

deck.cards.forEach(function (card) {
    console.log(card.toString());
});

console.log(deck.cards.length);
