import Card from "./Card";
import Deck from "./Deck";
import Player from "./Player";

interface Options {
  shuffle?: boolean,
  initialCards?: Card[]
}

export default class CardGame {
  deck: Deck
  players: Player[]
  winPile: Card[]
  winner: Player

  p1: Player
  p2: Player

  constructor({shuffle = true, initialCards}: Options = {}) {
    if (initialCards && initialCards.length % 2 !== 0) {
      throw new Error("Uneven amount of initial cards!")
    }

    // Create deck
    this.deck = new Deck(initialCards)
    this.winPile = []

    // Shuffle deck
    if (shuffle) {
      this.deck.shuffle()
    }
    
    // Create players
    const cardsPerPlayer = this.deck.cards.length / 2
    this.p1 = new Player("Player 1", this.deck.getCards(cardsPerPlayer))
    this.p2 = new Player("Player 2", this.deck.getCards(cardsPerPlayer))
  }

  playerHasLost = (): boolean => {
    if (this.p1.hasLost()) {
      this.winner = this.p2
      return true
    }

    if (this.p2.hasLost()) {
      this.winner = this.p1
      return true
    }
    
    return false
  }

  compareCards = (c1: Card, c2: Card): Card | undefined => {
    if (c1.value > c2.value) {
      return c1
    } 
    
    if (c1.value < c2.value) {
      return c2
    }
    
    // Cards are equal
    return undefined
  }

  returnWinCards = (p: Player) => {
    console.log(`${p.name} wins this round`)

    for (const card of this.winPile) {
      p.discardCard(card)
    }

    this.winPile = []
  }

  playRound = () => {
    const c1 = this.p1.drawCard()
    console.log(`${this.p1.name} (${this.p1.drawPile.length + 1} cards): ${c1.value}`)

    const c2 = this.p2.drawCard()
    console.log(`${this.p2.name} (${this.p2.drawPile.length + 1} cards): ${c2.value}`)

    // Add cards to win pile
    this.winPile.push(c1, c2)

    const winningCard = this.compareCards(c1, c2)
    if (winningCard) {
      // If there was a winner return cards to winning player
      if (winningCard === c1) {
        this.returnWinCards(this.p1)
      } else {
        this.returnWinCards(this.p2)
      }
    } else {
      // There was no winning card
      // Leave the drawn cards on the winPile and distribute later
      console.log("No winner in this round")
    }

    console.log()
  }

  start = () => {
    while (!this.playerHasLost()) {
      this.playRound()
    }

    console.log(`${this.winner.name} wins the game!`)
  }
}




