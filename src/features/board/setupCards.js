import { nanoid } from "nanoid"

const emojis = [
  0x1f9a8,
  0x1f47e,
  0x1f47b,
  0x1f4a9,
  0x1f916,
  0x1f921,
  0x1f62d,
  0x1f631,
  0x1f525,
  0x1f340,
  0x1f419,
  0x1f988,
  0x1f995,
  0x1f3b1,
  0x1f4a3,
  0x1f608,
  0x1f621,
  0x1f680,
]

function shuffle(cards) {
  let input = cards
  let i = cards.length - 1

  while (i >= 0) {
    let randomIndex = ~~(Math.random() * (i + 1))
    ;[input[randomIndex], input[i]] = [input[i], input[randomIndex]]
    i--
  }
  // console.log("shuffled cards", input)
  return input
}

export function setupCards() {
  const cards = [...emojis].reduce((acc, codepoint) => {
    acc.push({ id: nanoid(), content: String.fromCodePoint(codepoint), codepoint })
    acc.push({ id: nanoid(), content: String.fromCodePoint(codepoint), codepoint })
    return acc
  }, [])

  return shuffle(cards)
}

// const emojis = [
//   0x1f600,
//   0x1f604,
//   0x1f34a,
//   0x1f344,
//   0x1f37f,
//   0x1f363,
//   0x1f370,
//   0x1f355,
//   0x1f354,
//   0x1f35f,
//   0x1f6c0,
//   0x1f48e,
//   0x1f5fa,
//   0x23f0,
//   0x1f579,
//   0x1f4da,
//   0x1f431,
//   0x1f42a,
//   0x1f439,
//   0x1f424,
// ]
// export const emojiMap = {
//   skunk: 0x1f9a8,
//   alienMonster: 0x1f47e,
//   ghost: 0x1f47b,
//   poo: 0x1f4a9,
//   robot: 0x1f916,
//   clown: 0x1f921,
//   cryingFace: 0x1f62d,
//   fearFace: 0x1f631,
//   fire: 0x1f525,
//   highVoltage: 0x26a1,
//   snowman: 0x26c4,
//   fourLeafClover: 0x1f340,
//   octopus: 0x1f419,
//   shark: 0x1f988,
//   sauropod: 0x1f995,
//   eightBall: 0x1f3b1,
//   bomb: 0x1f4a3,
//   devilFace: 0x1f608,
//   angryFace: 0x1f621,
//   rocket: 0x1f680,
// }
