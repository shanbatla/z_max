/**
* Usage:
*
* Requires Node v6.x or higher.
*
* Within the terminal, navigate to the directory where this file is and run - node index.js.
*
* You can enter the number of players as an argument to the Blackjack class.
*/

/**
* Variable declarations
*/
const names = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];
const suits = ['Hearts','Diamonds','Spades','Clubs'];


/**
* Class representing a card.
*/
class Card {
  /**
  * Create a card.
  * @param {number} value - The value of of the card.
  * @param {string} name - The name of the card.
  * @param {string} suit - The suit of the card.
  */
  constructor(value, name, suit) {
    this.value = value;
    this.name = name;
    this.suit = suit;
  }
}


/**
* Class representing a deck.
*/
class Deck {
  /**
  * Create a card.
  * @param {array} names - Names array rerpesenting the name of the cards.
  * @param {array} suites - Suites array representing the suites of the cards.
  * @param {array} cards - Array representing the deck of cards to be used in the game.
  */
  constructor(names, suits, cards = []) {
    this.names = names;
    this.suits = suits;
    this.cards = cards;
  }

  /**
  * Create the deck of cards - populates the cards array with each card.
  */
  createDeck() {
    for(var s = 0; s < this.suits.length; s++) {
      for(var n = 0; n < this.names.length; n++) {
        let count = n;
        if(count >= 10) {
          count = 10;
        } else {
          count++;
        }
          this.cards.push(new Card(count, this.names[n], this.suits[s]));
      }
    }
  }

  /**
  * Shuffle the deck of cards.
  * @param {array} deck - the deck that was created by createDeck.
  */
  shuffleDeck(deck) {
    for(let i = this.cards.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [this.cards[i - 1], this.cards[j]] = [this.cards[j], this.cards[i - 1]];
    }
  }
}


/**
* Class representing a player.
*/
class Player {
  /**
  * Create a player.
  * @param {object} card1 - The first card that is dealt to the player.
  * @param {object} card2 - The second card that is dealt to the player.
  * @param {number} total - The total of both cards that are dealt to the player.
  */
  constructor(card1, card2, total = 0) {
    this.card1 = card1;
    this.card2 = card2;
    this.total = total;
  }
}


/**
* Class representing the user.
* @extends Player
*/
class User extends Player {
  /**
  * Create the user.
  * @param {object} card1 - The first card that is dealt to the player.
  * @param {object} card2 - The second card that is dealt to the player.
  * @param {number} total - The total of both cards that are dealt to the player.
  */
  constructor(card1, card2, total = 0) {
    super(card1, card2, total);
  }

  /**
  * Add the values for the cards and populate the string that will show in the terminal.
  */
  flipCards() {
    this.total = this.card1.value + this.card2.value;
    console.log(`Your hand: ${this.card1.name} of ${this.card1.suit}, ${this.card2.name} of ${this.card2.suit} (total = ${this.total})`);
  }
}


/**
* Class representing the opponent(s).
* @extends Player
*/
class Opponent extends Player {
  /**
  * Create the opponent.
  * @param {object} card1 - The first card that is dealt to the player.
  * @param {object} card2 - The second card that is dealt to the player.
  * @param {number} total - The total of both cards that are dealt to the player.
  */
  constructor(card1, card2, playerId, total = 0) {
    super(card1, card2, total);
    this.playerId = playerId;
  }

  /**
  * Add the values for the cards and populate the string that will show in the terminal.
  */
  flipCards() {
    this.total = this.card1.value + this.card2.value;
    console.log(`Player ${this.playerId}'s hand: ${this.card1.name} of ${this.card1.suit}, ${this.card2.name} of ${this.card2.suit} (total = ${this.total})`);
  }
}


/**
* Class representing the dealer.
* @extends Player
*/
class Dealer extends Player {
  /**
  * Create the dealer.
  * @param {object} card1 - The first card that is dealt to the player.
  * @param {object} card2 - The second card that is dealt to the player.
  * @param {number} total - The total of both cards that are dealt to the player.
  */
  constructor(card1, card2, total = 0) {
    super(card1, card2, total);
  }

  /**
  * Add the values for the cards and populate the string that will show in the terminal.
  */
  flipCards() {
    this.total = this.card1.value + this.card2.value;
    console.log(`Dealer's hand: ${this.card1.name} of ${this.card1.suit}, ${this.card2.name} of ${this.card2.suit} (total = ${this.total})`);
  }
}


/**
* Class representing a game of blackjack.
*/
class Blackjack {
  /**
  * Create the blackjack game.
  * @param {number} numOfPlayers - The number of opponents that will be in the game.
  * @param {array} players - Each player will be populated in this array and passed onto the method that declares the winner.
  */
  constructor(numOfPlayers, players = []) {
    this.numOfPlayers = numOfPlayers;
    this.players = players;
  }

  /**
  * Declare the winner of the game.
  * @param {array} playersArray - The array of players.
  */
  declareWinner(playerArray) {
    let winner;
    let hiScore = 0;
    let scores = [];

    playerArray.forEach(function(player) {
      if(player.total > hiScore) {
        hiScore = player.total;
        winner = player;
      }
      scores.push(player.total);
    });

    scores.sort((a, b) => b - a);

    if(scores[0] === scores[1]) {
      console.log('Its a tie! Play again!');
    } else {
      if(winner instanceof User) {
        console.log('You won!');
      } else if(winner instanceof Opponent) {
        console.log(`Player ${winner.playerId} won!`);
      } else if(winner instanceof Dealer) {
        console.log('Dealer won!');
      }
    }
  }

  /**
  * Initializes the game.
  */
  play() {
    const newDeck = new Deck(names, suits);
    newDeck.createDeck();
    newDeck.shuffleDeck();

    const user = new User(newDeck.cards.shift(), newDeck.cards.shift());
    user.flipCards();
    this.players.push(user);

    if(this.numOfPlayers > 0) {
      for(var k = 1; k <= this.numOfPlayers; k++) {
        const player = new Opponent(newDeck.cards.shift(), newDeck.cards.shift(), k);
        player.flipCards();
        this.players.push(player);
      }
    }

    const dealer = new Dealer(newDeck.cards.shift(), newDeck.cards.shift());
    dealer.flipCards();
    this.players.push(dealer);

    this.declareWinner(this.players);
  }
}


let newGame = new Blackjack(4);
newGame.play();