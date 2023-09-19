import { nanoid } from "nanoid"

import type { Cards } from "./types"

const emojis = [
  0x1f9a8, 0x1f47e, 0x1f47b, 0x1f4a9, 0x1f916, 0x1f921, 0x1f62d, 0x1f631, 0x1f525,
  0x1f340, 0x1f419, 0x1f988, 0x1f995, 0x1f3b1, 0x1f4a3, 0x1f608, 0x1f621, 0x1f680,
]

function shuffle(cards: Cards) {
  let [input, i] = [cards, cards.length - 1]
  let randomIndex: number

  while (i >= 0) {
    randomIndex = ~~(Math.random() * (i + 1))
    ;[input[randomIndex], input[i]] = [input[i], input[randomIndex]]
    i--
  }

  return input
}

export function setupCards() {
  const cards = emojis.reduce((acc, codepoint) => {
    acc.push({ id: nanoid(), content: String.fromCodePoint(codepoint), codepoint })
    acc.push({ id: nanoid(), content: String.fromCodePoint(codepoint), codepoint })
    return acc
  }, [] as Cards)

  return shuffle(shuffle(cards))
}
