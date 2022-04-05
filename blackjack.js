class Card {
    constructor(suit, number, value, symbol) {
        this.suit = suit;
        this.number = number;
        this.value = value;
        this.symbol = symbol;
    }
    toString() {
        return this.number + " of " + this.suit;
    }

    render() {
        let renderP = document.createElement("p");

        const symbol = {
            spade: "♠",
            diamond: "♦",
            heart: "♥",
            club: "♣",
            joker: "🃏",
        };

        const mySymbol = symbol[this.suit];

        if (this.suit === "diamond" || this.suit === "heart") {
            renderP.style.color = "red";
        }

        renderP.textContent = this.number + mySymbol;

        renderP.setAttribute("class", "cardDesign");

        return renderP;
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
    constructor(name, computer) {
        this.hand = [];
        this.name = name;
        this.stick = false;
        this.computer = computer;
        this.score = 0;
    }

    drawCard(deck) {
        let newCard = deck.draw();
        this.hand.push(newCard);
        this.score += newCard.value;
    }

    shouldDraw() {
        if (this.score >= 17) {
            return false;
        }
        return true;
    }
    // can I draw function
}

class GameLogic {
    constructor() {
        this.deck = new Deck();
        this.players = [new Player("Bob"), new Player("Amanda"), new Player("Grinch", true)];
        this.turn = -1;
        this.deck.shuffle();
        this.nextTurn();
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
    }

    nextTurn() {
        this.turn += 1;
        if (this.turn === this.players.length) {
            this.turn -= this.players.length;
        }
        document.getElementById("pturn").textContent = "Player " + this.currentPlayer().name + " turn";

        // reset everything

        const table = document.getElementById("table");
        while (table.hasChildNodes()) {
            table.removeChild(table.firstChild);
        }
        

        // update the UI: player set score, render hand

        for (let i = 0; i < this.players.length; i++) {
            let playerDiv = document.createElement("div");
            playerDiv.setAttribute("class", "players");
            let nameTag = document.createElement("h4");
            nameTag.textContent = "Player " + this.players[i].name + (this.players[i].stick ? " ✖" : "");
            let scoreP = document.createElement("p");
            scoreP.textContent = this.players[i].score;
            let handDiv = document.createElement("div");
            handDiv.setAttribute("class", "hand");

            table.appendChild(playerDiv);
            playerDiv.appendChild(nameTag);
            playerDiv.appendChild(scoreP);
            playerDiv.appendChild(handDiv);

            for (let j = 0; j < this.players[i].hand.length; j++) {
                let renderCard = this.players[i].hand[j].render();
                handDiv.appendChild(renderCard);
            }
        }


        let isGameOver = true;

        for (let j = 0; j < this.players.length; j++) {
            if (this.players[j].stick === false) {
                isGameOver = false;
                break;
            }
        }

        if (isGameOver) {
            this.gameOver();
        } else {
            if (this.currentPlayer().stick) {
                this.nextTurn();
            } else if (this.currentPlayer().computer) {
                setTimeout(() => {
                    if (this.currentPlayer().shouldDraw()) {
                        this.hit();
                    } else {
                        this.stick();
                    }
                }, 2000);
            }
        }
    }

    gameOver() {
        let winmessage = document.querySelector("h2");
        let winners = []; // to contain the winning player/s
        let winningScore = 0; // the highest score of the game

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
        console.log(document.getElementById("restartbtn").style.display);
        document.getElementById("restartbtn").style.display = "";
    }

    resetGame() {
        gamelogic = new GameLogic();
        document.getElementById("restartbtn").style.display = "none";
        document.getElementById("endmessage").style.display = "none";
    }
}

let gamelogic = new GameLogic();

document.getElementById("stick").addEventListener("click", () => {
    if (gamelogic.currentPlayer().computer) {
        return;
    }
    gamelogic.stick();
});
document.getElementById("hit").addEventListener("click", () => {
    if (gamelogic.currentPlayer().computer) {
        return;
    }
    gamelogic.hit();
});
document.getElementById("restartbtn").addEventListener("click", () => {
    gamelogic.resetGame();
});
document.getElementById("restartbtn").style.display = "none";

/*
deck.cards.forEach(function (card) {
    console.log(card.toString());
});

let player1 = gamelogic.players[0];
let player2 = gamelogic.players[1];

console.log(deck.cards.length); 
*/
