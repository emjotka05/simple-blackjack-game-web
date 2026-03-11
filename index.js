let player = {
    name: "Player",
    chips: 200
}

let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let bet = 20;
let gameStarted = false;

let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")

function updateChips() {
    playerEl.textContent = player.name + ": $" + player.chips;
}

updateChips();

function getRandomCard() {
    let randomNumber = Math.floor( Math.random()*13 ) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}

function startGame() {
    if(gameStarted == false){
        gameStarted = true
        if (player.chips < bet) {
            messageEl.textContent = "Not enough chips! You are now Homeless!";
            gameStarted = false
            return;
        }

        isAlive = true
        hasBlackJack = false
    
        player.chips -= bet;
        updateChips();

        let firstCard = getRandomCard()
        let secondCard = getRandomCard()
        cards = [firstCard, secondCard]
        sum = firstCard + secondCard
        renderGame()
    }
    
}

function renderGame() {
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }
    
    sumEl.textContent = "Sum: " + sum
    
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "You've got Blackjack! You win double!"
        hasBlackJack = true
        isAlive = false
        player.chips += (bet * 2.5);
        updateChips();
        gameStarted = false
    } else {
        message = "Bust! You take the L!"
        isAlive = false
        gameStarted = false
    }
    
    messageEl.textContent = message
}

function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderGame()        
    }
}

function stand() {
    if (isAlive === true && hasBlackJack === false) {
        isAlive = false;

        let dealerScore = Math.floor(Math.random() * 7) + 16; 

        if (dealerScore > 21) {
            message = `Dealer busted with ${dealerScore}. You win!`;
            player.chips += (bet * 2);
            gameStarted = false
        } else if (dealerScore > sum) {
            message = `Dealer has ${dealerScore}. You lose!`;
            gameStarted = false
        } else if (dealerScore < sum) {
            message = `Dealer has ${dealerScore}. You win!`;
            player.chips += (bet * 2);
            gameStarted = false
        } else {
            message = `Dealer has ${dealerScore}. It's a draw!`;
            player.chips += bet;
            gameStarted = false
        }
        
        messageEl.textContent = message;
        updateChips();
    }
}