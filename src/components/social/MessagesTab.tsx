import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import { conversations, maya, vibeColors } from '@/data/mockData';
import type { Conversation } from '@/types/social';

interface Props {
  highlightPartyChat?: boolean;
}

const MessagesTab = ({ highlightPartyChat }: Props) => {
  const [active, setActive] = useState<Conversation | null>(
    highlightPartyChat ? conversations[0] : null
  );
  const [draft, setDraft] = useState('');

  return (
    <div className="relative flex-1 overflow-hidden flex flex-col">
      {/* Conversation list */}
      <AnimatePresence initial={false}>
        {!active && (
          <motion.div
            key="list"
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="absolute inset-0 overflow-y-auto p-4 space-y-2"
          >
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setActive(conv)}
                className="w-full flex items-center gap-3 bg-card rounded-xl px-4 py-3.5 border border-border active:scale-[0.98] transition-transform text-left"
              >
                {conv.type === 'party' ? (
                  <div className="w-12 h-12 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center shrink-0">
                    <Icon icon="solar:users-group-rounded-bold" className="text-primary" width={22} />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-border shrink-0">
                    <img src={conv.photo} alt={conv.name} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-semibold text-sm">{conv.name}</span>
                    <span className="text-xs text-muted-foreground shrink-0">{conv.lastTime}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{conv.lastMessage}</p>
                </div>
                {conv.unread > 0 && (
                  <span className="shrink-0 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                    {conv.unread}
                  </span>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* DM detail view */}
      <AnimatePresence initial={false}>
        {active && (
          <motion.div
            key="detail"
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="absolute inset-0 flex flex-col bg-background"
          >
            {/* Chat header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border shrink-0">
              <button onClick={() => setActive(null)} className="active:scale-90 transition-transform">
                <Icon icon="solar:alt-arrow-left-bold" className="text-foreground" width={22} />
              </button>
              {active.type === 'party' ? (
                <div className="w-9 h-9 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
                  <Icon icon="solar:users-group-rounded-bold" className="text-primary" width={18} />
                </div>
              ) : (
                <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-border">
                  <img src={active.photo} alt={active.name} className="w-full h-full object-cover" />
                </div>
              )}
              <span className="font-bold text-sm flex-1">{active.name}</span>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {active.messages.map((msg) => {
                const isMe = msg.senderId === 'maya';
                return (
                  <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${
                        isMe
                          ? 'bg-primary text-primary-foreground rounded-br-sm'
                          : 'bg-muted text-foreground rounded-bl-sm'
                      }`}
                    >
                      {!isMe && active.type === 'party' && (
                        <div
                          className="text-xs font-bold mb-1"
                          style={{ color: vibeColors['connector'] }}
                        >
                          {msg.senderId.charAt(0).toUpperCase() + msg.senderId.slice(1)}
                        </div>
                      )}
                      <p>{msg.text}</p>
                      <p className={`text-xs mt-1 ${isMe ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}>
                        {msg.timestamp}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Input */}
            <div className="shrink-0 px-4 py-3 border-t border-border flex items-center gap-3">
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Message..."
                className="flex-1 bg-muted rounded-full px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground"
              />
              <button
                disabled={!draft.trim()}
                className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-40 active:scale-90 transition-transform"
              >
                <Icon icon="solar:plain-bold" width={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MessagesTab;
