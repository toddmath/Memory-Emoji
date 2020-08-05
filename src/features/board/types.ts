export interface Card {
  id: string
  content: string
  codepoint: number
}

export type Cards = Array<Card>
export type GameStatus = "stopped" | "running" | "victory"
