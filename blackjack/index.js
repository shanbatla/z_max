const names = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];
const suits = ['Hearts','Diamonds','Spades','Clubs'];

class Card {
  constructor(value, name, suit) {
    this.value = value;
  	this.name = name;
  	this.suit = suit;
  }
}

class Deck {
  constructor(names, suits, cards = []) {
    this.names = names;
    this.suits = suits;
    this.cards = cards;
  }

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

  shuffleDeck(deck) {
    for(let i = this.cards.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [this.cards[i - 1], this.cards[j]] = [this.cards[j], this.cards[i - 1]];
    }
  }

}

class Player {
  constructor(card1, card2, total = 0) {
    this.card1 = card1;
    this.card2 = card2;
    this.total = total;
  }
}

class User extends Player {
  constructor(card1, card2, total = 0) {
    super(card1, card2, total);
  }

  flipCards() {
    console.log(`Your hand: ${this.card1.name} of ${this.card1.suit}, ${this.card2.name} of ${this.card2.suit} (total = ${this.card1.value + this.card2.value})`);
    this.total = this.card1.value + this.card2.value;
  }
}

class Opponent extends Player {
  constructor(card1, card2, playerNum, total = 0) {
    super(card1, card2, total);
    this.playerNum = playerNum;
  }

  flipCards() {
    console.log(`Player ${this.playerNum}'s hand: ${this.card1.name} of ${this.card1.suit}, ${this.card2.name} of ${this.card2.suit} (total = ${this.card1.value + this.card2.value})`);
    this.total = this.card1.value + this.card2.value;
  }
}

class Dealer extends Player {
  constructor(card1, card2, total = 0) {
    super(card1, card2, total);
  }

  flipCards() {
    console.log(`Dealer's hand: ${this.card1.name} of ${this.card1.suit}, ${this.card2.name} of ${this.card2.suit} (total = ${this.card1.value + this.card2.value})`);
    this.total = this.card1.value + this.card2.value;
  }
}

class Blackjack {
  constructor(numOfPlayers) {
    this.numOfPlayers = numOfPlayers;
  }

  play() {
    const newDeck = new Deck(names, suits);
    newDeck.createDeck();
    newDeck.shuffleDeck();

    const user = new User(newDeck.cards.shift(), newDeck.cards.shift());
    user.flipCards();

    if(this.numOfPlayers > 0) {
      for(var k = 1; k <= this.numOfPlayers; k++) {
        const player = new Opponent(newDeck.cards.shift(), newDeck.cards.shift(), k);
        player.flipCards();
      }
    }

    const dealer = new Dealer(newDeck.cards.shift(), newDeck.cards.shift());
    dealer.flipCards();
  }
}


let newGame = new Blackjack(2);
newGame.play();