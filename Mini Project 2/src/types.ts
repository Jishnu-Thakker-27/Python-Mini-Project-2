export type Theme = 'light' | 'dark';

export type Screen = 'auth' | 'quiz' | 'rankings';

export interface QuizOption {
  letter: 'A' | 'B' | 'C' | 'D';
  text: string;
}

export interface Question {
  id: number;
  domain: string;
  category: string;
  question: string;
  difficulty: 'Standard Difficulty' | 'Advanced Difficulty' | 'Expert Difficulty';
  options: QuizOption[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  hint: {
    title: string;
    description: string;
    formula?: string;
  };
  pointsReward: number;
}

export interface Contender {
  rank: number;
  name: string;
  avatarUrl: string;
  quizzes: number;
  accuracy: number;
  points: number;
  tier: string;
  isUser?: boolean;
}

export interface UserStats {
  name: string;
  email: string;
  title: string;
  rank: number;
  points: number;
  streak: number;
  quizzesTaken: number;
  weeklyGoal: {
    completed: number;
    total: number;
  };
  accuracy: number;
  avatarUrl: string;
  pastQuizzes: Array<{
    title: string;
    timeAgo: string;
    score: string;
    totalQuestions: number;
    correctCount: number;
  }>;
}
