import Card from "./Card"
import { shuffle } from "./helpers"

export default class Deck {
  cards: Card[]

  constructor(initialCards?: Card[]) {
    if (initialCards !== undefined) {
      this.cards = initialCards
    } else {
      this.cards = []
      for (let i = 0; i < 4; i++) {
        for (let i = 1; i < 11; i++) {
          this.cards.push(new Card(i))
        }
      }
    }
  }

  shuffle = () => {
    this.cards = shuffle(this.cards)
  }

  getCards = (n: number): Card[] => {
    if (n > this.cards.length) {
      throw new Error(`No enough cards! Trying to draw ${n} cards but the deck has only ${this.cards.length} cards.`)
    }

    return this.cards.splice(0, n)
  }
}
