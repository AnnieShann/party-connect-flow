export type Vibe = 'creator' | 'fixer' | 'connector' | 'competitor';

export interface Player {
  id: string;
  name: string;
  photo: string;
  vibe: Vibe;
  level: number;
  xp: number;
  maxXp: number;
  coins: number;
  bio?: string;
}

export interface Connection {
  id: string;
  name: string;
  photo: string;
  vibe: Vibe;
  level: number;
  sharedQuests: number;
  isMentor: boolean;
  lastSeen: string;
  metThrough?: string;       // quest or simulation name
  metThroughType?: 'quest' | 'simulation';
}

export interface QuestUnlock {
  id: string;
  title: string;
  locked: boolean;
  unlockCondition?: string;
}

export interface BulletinPost {
  id: string;
  text: string;
  time: string;
  icon: string;
}

export interface ActiveParty {
  name: string;
  sharedQuests: string[];
  completedSimulations: string[];
  nextSuggestedQuest: string;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  type: 'dm' | 'party';
  name: string;
  photo?: string;
  participants?: string[];
  lastMessage: string;
  lastTime: string;
  unread: number;
  messages: Message[];
}

export interface PartyMatch {
  id: string;
  members: Connection[];
  rationale: string;
}
