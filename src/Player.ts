import Card from "./Card"
import { shuffle } from "./helpers"

export default class Player {
  name: string
  drawPile: Card[]
  discardPile: Card[]

  constructor(name: string, drawPile: Card[]) {
    this.name = name
    this.drawPile = drawPile
    this.discardPile = []
  }

  drawCard = (): Card => {
    if (this.drawPile.length === 0) {
      this.drawPile = shuffle(this.discardPile)
      this.discardPile = []
    }

    const drawnCard = this.drawPile.pop()

    if (drawnCard === undefined) {
      // Check this to make TypeScript happy
      throw new Error("Drawn card was undefined");
    }

    return drawnCard
  }

  discardCard = (card: Card) => {
    this.discardPile.push(card)
  }

  hasLost = () => {
    return this.drawPile.length === 0 && this.discardPile.length === 0
  }
}