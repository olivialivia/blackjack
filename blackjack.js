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

class Player {
    constructor(name) {
        this.hand = [];
        this.name = name;
        this.stick = false;
        this.score = 0;
    }

    drawCard(deck) {
        let newCard = deck.draw();
        this.hand.push(newCard);
        this.score += newCard.value;
    }

    // can I draw function
}

class GameLogic {
    constructor() {
        this.deck = new Deck();
        this.players = [new Player("player1"), new Player("player2")];
        this.turn = 0;
        this.deck.shuffle();
    }

    currentPlayer() {
        return this.players[this.turn];
    }

    stick() {
        let player = this.currentPlayer();
        player.stick = true;
        this.nextTurn();
    }

    hit() {
        let player = this.currentPlayer();
        player.drawCard(this.deck);
        this.nextTurn();
        // current player to draw card, called when button pressed
        // call nextturn
    }

    nextTurn() {
        this.turn += 1;
        document.getElementById("pturn").textContent = "Player 2 turn";
        document.getElementById("p1").textContent = "Player 1: " + this.players[0].score;

        if (this.turn === this.players.length) {
            this.turn -= this.players.length;
            document.getElementById("pturn").textContent = "Player 1 turn";
            document.getElementById("p2").textContent = "Player 2: " + this.players[1].score;
        }

        let isGameOver = true;

        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i].stick === false) {
                isGameOver = false;
                break;
            }
        }

        if (isGameOver) {
            this.gameOver();
        }
    }

    gameOver() {
        let winmessage = document.querySelector("h2");
        let winners = [];
        let winningScore = 0; // the highest score of the game
        // for each player:
        // - is their score > winningScore AND <= 21? NO: skip them. YES: set winningScore = players[i].score; Remove all winners and add players[i] as sole winner.
        // - is their score == winningScore? YES: add players[i] to the winners array.
        // After you have looked at all players, winningScore = the highest VALID score in the game and winner contains the winning players.

        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i].score > winningScore && this.players[i].score <= 21) {
                winningScore = this.players[i].score;
                winners = [];
                winners.push(this.players[i]);
            } else if (this.players[i].score === winningScore) {
                winners.push(this.players[i]);
            }
        }
        console.log(winners);
        console.log(winningScore);

        if (winners.length > 1) {
            let firstWinners = winners.slice(0, winners.length - 1);
            let lastWinner = winners[winners.length - 1];
            winmessage.textContent =
                "Congratulations " +
                firstWinners
                    .map((person) => {
                        return person.name;
                    })
                    .join(",") +
                " and " +
                lastWinner.name +
                ". You have won the game!";
        } else if (winners.length === 1) {
            winmessage.textContent = "Congratulations " + winners[0].name + ". You have won the game!";
        } else {
            winmessage.textContent = "Sorry, no winners this time. Try again!";
        }

        //button gamelogic.resetGame();
    }

    resetGame() {
        gamelogic = new GameLogic();
        document.getElementById("p1").textContent = "Player 1: ";
        document.getElementById("p2").textContent = "Player 2: ";
        document.querySelector("h2").textContent = "";
    }
}

let gamelogic = new GameLogic();
let player1 = gamelogic.players[0];
let player2 = gamelogic.players[1];

document.getElementById("stick").addEventListener("click", gamelogic.stick.bind(gamelogic));
document.getElementById("hit").addEventListener("click", gamelogic.hit.bind(gamelogic));

/*
deck.cards.forEach(function (card) {
    console.log(card.toString());
});

console.log(deck.cards.length); 
*/
