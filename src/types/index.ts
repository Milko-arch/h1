export interface Question {
  id: number;
  questionNumber: number;
  unitId: number;
  question: string;
  questionEs?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  funFact: string;
  category: string;
  audioText: string;
}

export interface LessonSlide {
  id: string;
  title: string;
  titleEs?: string;
  conceptEn: string;
  conceptEs?: string;
  imageEmoji: string;
  graphicType: 'compare' | 'timeline' | 'facts' | 'interactive-card' | 'mini-quiz';
  details: {
    highlight: string;
    points: string[];
    interactiveTask?: {
      instruction: string;
      options: { text: string; isCorrect: boolean; feedback: string }[];
    };
    chartItems?: { label: string; value: string; color: string; icon: string }[];
  };
}

export interface UnitGraphic {
  type: 'comparison' | 'timeline' | 'map' | 'diagram' | 'cards' | 'banner';
  title: string;
  description: string;
  iconName: string;
  highlightText?: string;
  visualData?: Array<{
    label: string;
    value: string | number;
    sublabel?: string;
    color?: string;
    icon?: string;
  }>;
}

export interface Unit {
  id: number;
  number: number;
  worldId: number;
  title: string;
  titleEs: string;
  emoji: string;
  color: string;
  description: string;
  keyPoints: string[];
  graphic: UnitGraphic;
  slides?: LessonSlide[];
  questionIds: number[];
}

export interface World {
  id: number;
  title: string;
  subtitle: string;
  themeColor: string;
  bgGradient: string;
  unitIds: number[];
}

export interface UserProgress {
  studentName?: string;
  hearts: number;
  maxHearts: number;
  confites: number; // 🍬 Moneda virtual
  xp: number;
  streak: number;
  streakHistory: boolean[]; // Mon to Sun active flags
  lastActiveDate: string;
  unlockedUnitId: number;
  unitStars: Record<number, number>; // unitId -> stars (1-3)
  completedQuestions: number[]; // question IDs
  completedLessons: number[]; // unit IDs where interactive lesson was completed
  unlockedAvatars: string[];
  currentAvatar: string;
  unlockedThemes: string[];
  currentTheme: string;
  streakFreeze: number;
  openedChests: number[]; // world IDs
  stickers: string[]; // unlocked sticker IDs
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  check: (progress: UserProgress) => boolean;
}
