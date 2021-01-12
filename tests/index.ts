import { expect } from "chai";

import Deck from "../src/Deck";
import Player from "../src/Player";
import CardGame from "../src/CardGame";
import Card from "../src/Card";

const getDiffRatio = (arr1: any[], arr2: any[]) => {
  let different = 0
  for (let i = 0; i < arr1.length; i++) {
    const x1 = arr1[i]
    const x2 = arr2[i]
    if (x1 !== x2) {
      different += 1
    }
  }
  return different / arr1.length
}

describe("Tests for Task 1", () => {
  it("A new deck should contain 40 cards", () => {
    const deck = new Deck()
    expect(deck.cards.length).to.equal(40)
  })

  it("A shuffle function should shuffle a deck", () => {
    const deck = new Deck()
    const cardsCopy = [...deck.cards]

    // Before shuffle they are equal
    const oldDiffRatio = getDiffRatio(deck.cards, cardsCopy)
    expect(oldDiffRatio).to.equal(0)

    deck.shuffle()

    // After shuffle at least 75% of the cards should be in a different order
    const newDiffRatio = getDiffRatio(deck.cards, cardsCopy)
    expect(newDiffRatio).to.be.greaterThan(0.75)

    // I was confused with the hint and didn't know how else to check if the shuffle was successful
  })
})

describe("Tests for Task 2", () => {
  it("If a player with an empty draw pile tries to draw a card, the discard pile is shuffled into the draw pile", () => {
    const deck = new Deck()
    const p = new Player("Player 1", deck.getCards(20))

    for (let i = 0; i < 20; i++) {
      const card = p.drawCard()
      p.discardCard(card)
    }

    expect(p.drawPile.length).to.equal(0)
    expect(p.discardPile.length).to.equal(20)

    const prevDiscardPile = [...p.discardPile]

    const drawnCard = p.drawCard()

    // Check length of the piles
    expect(p.drawPile.length).to.equal(19)
    expect(p.discardPile.length).to.equal(0)

    // Check that the order of the draw pile is different from the previous discard pile
    const drawPileBeforeDraw = [drawnCard, ...p.drawPile]
    // After shuffle at least 75% of the cards should be in a different order
    const diffRatio = getDiffRatio(prevDiscardPile, drawPileBeforeDraw)
    expect(diffRatio).to.be.greaterThan(0.75)
  })
})

describe("Tests for Task 3", () => {
  it("When comparing two cards, the higher card should win", () => {
    // Test by simulating a round
    const initialCards = [
      new Card(1), // Player 1
      new Card(2), // Player 1
      new Card(3), // Player 2
      new Card(4), // Player 2
    ]
    const cardGame = new CardGame({
      shuffle: false, // No shuffeling so that cards stay in order
      initialCards
    })

    // Check for correct player state
    expect(cardGame.p1.drawPile.length).to.equal(2)
    expect(cardGame.p1.discardPile.length).to.equal(0)

    expect(cardGame.p2.drawPile.length).to.equal(2)
    expect(cardGame.p2.discardPile.length).to.equal(0)

    // Play normal round
    cardGame.playRound()

    // Player 2 must have won and player 1 must have lost
    expect(cardGame.p1.drawPile.length).to.equal(1)
    expect(cardGame.p1.discardPile.length).to.equal(0)

    expect(cardGame.p2.drawPile.length).to.equal(1)
    expect(cardGame.p2.discardPile.length).to.equal(2)
  })

  it("When comparing two cards of the same value, the winner of the next round should win 4 cards.", () => {
    // Test by simulating a round
    const initialCards = [
      new Card(1), // Player 1
      new Card(4), // Player 1
      new Card(3), // Player 2
      new Card(4), // Player 2
    ]
    const cardGame = new CardGame({
      shuffle: false, // No shuffeling so that cards stay in order
      initialCards
    })

    // Check for correct player state
    expect(cardGame.p1.drawPile.length).to.equal(2)
    expect(cardGame.p1.discardPile.length).to.equal(0)

    expect(cardGame.p2.drawPile.length).to.equal(2)
    expect(cardGame.p2.discardPile.length).to.equal(0)

    // Play normal round
    cardGame.playRound()

    // Cards must have been equal and therefore win pile should contain 2 cards
    expect(cardGame.winPile.length).to.equal(2)

    expect(cardGame.p1.drawPile.length).to.equal(1)
    expect(cardGame.p1.discardPile.length).to.equal(0)

    expect(cardGame.p2.drawPile.length).to.equal(1)
    expect(cardGame.p2.discardPile.length).to.equal(0)

    // Play normal round
    cardGame.playRound()

    // Player 2 must have won all 4 cards
    expect(cardGame.winPile.length).to.equal(0)

    expect(cardGame.p1.drawPile.length).to.equal(0)
    expect(cardGame.p1.discardPile.length).to.equal(0)

    expect(cardGame.p2.drawPile.length).to.equal(0)
    expect(cardGame.p2.discardPile.length).to.equal(4)
  })
})