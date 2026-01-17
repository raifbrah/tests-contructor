export interface Test {
  id: number;
  name: string;
  author_id?: number;
  complete_user_id?: number;
  created_at: number;
  questions: Question[];
  participants: number[];
  passed_at?: number;
  result?: string;
}

export interface Question {
  id: number;
  description: string;
  type: 'multiple' | 'single';
  group_answer: string | null;
  order: number;
  theUserAnsweredCorrectly: boolean;
  answers: Answer[];
}

export interface Answer {
  id: number;
  value: string;
  correct: boolean;
  checked: boolean;
}
