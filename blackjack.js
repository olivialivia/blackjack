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

    shuffle() {
        for (let i = 0; i < 100; i++) {
            let randomIndex = Math.floor(Math.random() * this.cards.length);
            let randomIndex2 = Math.floor(Math.random() * this.cards.length);

            let temp = this.cards[randomIndex];
            this.cards[randomIndex] = this.cards[randomIndex2];
            this.cards[randomIndex2] = temp;
        }
    }

    draw() {
        let drawnCard = this.cards.pop();
        return drawnCard;
    }
}

let deck = new Deck();

class Player {
    constructor(name) {
        this.hand = [];
        this.name = name;
        this.stick = false;
        this.score = 0;
    }

    drawCard() {
        let newCard = deck.draw();
        this.hand.push(newCard);
        this.score += newCard.value;
    }
}

class GameLogic {
    constructor() {
        this.deck = new Deck();
        this.players = [new Player("player1"), new Player("player2")];
        this.turn = 0;
    }

    turns
    stick
    win/lose

}

// Functions

deck.cards.forEach(function (card) {
    console.log(card.toString());
});

console.log(deck.cards.length);
