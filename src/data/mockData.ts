import type { Player, Connection, Conversation, PartyMatch, QuestUnlock, BulletinPost, ActiveParty } from '@/types/social';

export const vibeColors: Record<string, string> = {
  creator: 'hsl(11 100% 64%)',
  fixer: 'hsl(217 91% 60%)',
  connector: 'hsl(43 96% 56%)',
  competitor: 'hsl(330 81% 60%)',
};

export const vibeLabels: Record<string, string> = {
  creator: 'Creator',
  fixer: 'Fixer',
  connector: 'Connector',
  competitor: 'Competitor',
};

export const maya: Player = {
  id: 'maya',
  name: 'Maya Chen',
  photo: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Maya&backgroundColor=b6e3f4',
  vibe: 'creator',
  level: 7,
  xp: 340,
  maxXp: 500,
  coins: 1250,
};

export const connections: Connection[] = [
  {
    id: 'alex',
    name: 'Alex Rivera',
    photo: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Alex&backgroundColor=d1d4f9',
    vibe: 'fixer',
    level: 9,
    sharedQuests: 4,
    isMentor: true,
    lastSeen: '2h ago',
    metThrough: 'ConEd Grid Challenge',
    metThroughType: 'quest',
  },
  {
    id: 'sam',
    name: 'Sam Torres',
    photo: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Sam&backgroundColor=c0aede',
    vibe: 'connector',
    level: 6,
    sharedQuests: 2,
    isMentor: false,
    lastSeen: '5h ago',
    metThrough: 'Sustainability Simulation',
    metThroughType: 'simulation',
  },
  {
    id: 'jordan',
    name: 'Jordan Kim',
    photo: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Jordan&backgroundColor=ffd5dc',
    vibe: 'competitor',
    level: 11,
    sharedQuests: 7,
    isMentor: true,
    lastSeen: 'Yesterday',
    metThrough: 'MakerLab Sprint',
    metThroughType: 'quest',
  },
  {
    id: 'priya',
    name: 'Priya Nair',
    photo: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Priya&backgroundColor=b6e3f4',
    vibe: 'creator',
    level: 5,
    sharedQuests: 1,
    isMentor: false,
    lastSeen: '3d ago',
    metThrough: 'Sustainability Simulation',
    metThroughType: 'simulation',
  },
  {
    id: 'felix',
    name: 'Felix Braun',
    photo: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Felix&backgroundColor=d1d4f9',
    vibe: 'fixer',
    level: 8,
    sharedQuests: 3,
    isMentor: false,
    lastSeen: '1d ago',
    metThrough: 'ConEd Grid Challenge',
    metThroughType: 'quest',
  },
];

export const partyMembers = connections.slice(0, 3);

export const mockPartyMatch: PartyMatch = {
  id: 'party-1',
  members: [connections[0], connections[1], connections[2]],
  rationale:
    "Alex brings Fixer precision, Sam bridges groups as Connector, and Jordan's Competitor drive keeps the team pushing further. A well-balanced trio for your next quest.",
};

export const mockActiveParty: ActiveParty = {
  name: 'ConEd Quest Squad',
  sharedQuests: ['ConEd Grid Challenge', 'North District Mapping'],
  completedSimulations: ['Sustainability Simulation', 'Urban Planning Sim'],
  nextSuggestedQuest: 'MakerLab Internship Sprint',
};

export const questUnlocks: QuestUnlock[] = [
  { id: 'qu1', title: 'ConEd Grid Challenge', locked: false },
  { id: 'qu2', title: 'North District Mapping', locked: false },
  { id: 'qu3', title: 'Advanced Energy Audit', locked: true, unlockCondition: 'Complete Sustainability Simulation to Unlock' },
  { id: 'qu4', title: 'MakerLab Internship Sprint', locked: true, unlockCondition: 'Complete MakerLab Sprint Quest to Unlock' },
];

export const bulletinPosts: BulletinPost[] = [
  { id: 'bp1', text: 'Aisha shared resources for ConEd', time: '10m ago', icon: 'solar:document-bold' },
  { id: 'bp2', text: '3 students discussed MakerLab Internship', time: '1h ago', icon: 'solar:chat-round-bold' },
  { id: 'bp3', text: 'Jordan posted a tip for the Grid Challenge', time: '2h ago', icon: 'solar:lightbulb-bold' },
  { id: 'bp4', text: 'New Sustainability Simulation guide dropped', time: '3h ago', icon: 'solar:star-bold' },
];


export const conversations: Conversation[] = [
  {
    id: 'conv-party',
    type: 'party',
    name: 'Party Chat 🔥',
    participants: ['alex', 'sam', 'jordan'],
    lastMessage: "Jordan: Let's hit the north district next",
    lastTime: '2m ago',
    unread: 3,
    messages: [
      { id: 'm1', senderId: 'jordan', text: 'yo everyone ready?', timestamp: '10:02' },
      { id: 'm2', senderId: 'alex', text: 'Checking the map now', timestamp: '10:03' },
      { id: 'm3', senderId: 'sam', text: 'I scouted two quests near the library!', timestamp: '10:05' },
      { id: 'm4', senderId: 'maya', text: 'On my way 🚀', timestamp: '10:06' },
      { id: 'm5', senderId: 'jordan', text: "Let's hit the north district next", timestamp: '10:08' },
    ],
  },
  {
    id: 'conv-alex',
    type: 'dm',
    name: 'Alex Rivera',
    photo: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Alex&backgroundColor=d1d4f9',
    lastMessage: 'Nice work on the quest!',
    lastTime: '1h ago',
    unread: 0,
    messages: [
      { id: 'm1', senderId: 'alex', text: 'Hey Maya! Saw you completed the Design Sprint', timestamp: '09:15' },
      { id: 'm2', senderId: 'maya', text: 'Yeah! That was a tough one 😅', timestamp: '09:17' },
      { id: 'm3', senderId: 'alex', text: 'Nice work on the quest!', timestamp: '09:18' },
    ],
  },
  {
    id: 'conv-sam',
    type: 'dm',
    name: 'Sam Torres',
    photo: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Sam&backgroundColor=c0aede',
    lastMessage: 'Want to team up tomorrow?',
    lastTime: '3h ago',
    unread: 1,
    messages: [
      { id: 'm1', senderId: 'sam', text: 'Hey! I found a new quest cluster near campus', timestamp: '07:30' },
      { id: 'm2', senderId: 'maya', text: 'Oh nice, what kind?', timestamp: '07:45' },
      { id: 'm3', senderId: 'sam', text: 'Want to team up tomorrow?', timestamp: '07:46' },
    ],
  },
  {
    id: 'conv-jordan',
    type: 'dm',
    name: 'Jordan Kim',
    photo: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Jordan&backgroundColor=ffd5dc',
    lastMessage: 'GG 🏆',
    lastTime: 'Yesterday',
    unread: 0,
    messages: [
      { id: 'm1', senderId: 'maya', text: 'That was so close at the end!', timestamp: 'Yesterday 18:00' },
      { id: 'm2', senderId: 'jordan', text: 'GG 🏆', timestamp: 'Yesterday 18:01' },
    ],
  },
];
