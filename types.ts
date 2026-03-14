export enum Phase {
  GATE = 'GATE',
  QUIZ = 'QUIZ',
  LOADING = 'LOADING',
  REVEAL = 'REVEAL',
}

export interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    trait: string;
  }[];
}

export interface Character {
  id: string;
  name: string;
  poem: string;
  tags: string[];
  description: string;
  color: string;
  imageUrl?: string;
}

export interface GameState {
  phase: Phase;
  answers: Record<number, string>;
  result: Character | null;
}
