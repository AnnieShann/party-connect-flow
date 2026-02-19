import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import { connections, maya, vibeColors } from '@/data/mockData';
import FindPartyModal from '@/components/social/FindPartyModal';
import ConnectionCard from '@/components/social/ConnectionCard';
import ProfilePanel from '@/components/social/ProfilePanel';
import MessagesTab from '@/components/social/MessagesTab';
import type { Connection } from '@/types/social';

type Tab = 'party' | 'connections' | 'messages';

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'party', label: 'Find Party', icon: 'solar:users-group-rounded-bold' },
  { id: 'connections', label: 'Connections', icon: 'solar:link-bold' },
  { id: 'messages', label: 'Messages', icon: 'solar:chat-round-bold' },
];

const SocialPage = () => {
  const [tab, setTab] = useState<Tab>('party');
  const [partyModalOpen, setPartyModalOpen] = useState(false);
  const [selectedConnection, setSelectedConnection] = useState<Connection | null>(null);
  const [partyFormed, setPartyFormed] = useState(false);
  const [openPartyChat, setOpenPartyChat] = useState(false);

  const handleStartPartyChat = () => {
    setPartyFormed(true);
    setPartyModalOpen(false);
    setOpenPartyChat(true);
    setTab('messages');
  };

  return (
    <div className="h-full w-full bg-background flex flex-col overflow-hidden">
      {/* Top bar */}
      <div className="shrink-0 px-4 pt-12 pb-3 flex items-center gap-3 border-b border-border">
        <div
          className="w-10 h-10 rounded-full overflow-hidden border-2 shrink-0"
          style={{ borderColor: vibeColors[maya.vibe] }}
        >
          <img src={maya.photo} alt="You" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <h1 className="font-bold text-base">Social Hub</h1>
          <p className="text-xs text-muted-foreground font-mono">
            LVL {maya.level} · {connections.length} connections
          </p>
        </div>
        {partyFormed && (
          <div className="flex items-center gap-1.5 bg-accent/20 text-accent px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-xs font-bold font-mono">Party Active</span>
          </div>
        )}
      </div>

      {/* Segmented control */}
      <div className="shrink-0 flex gap-1 p-3 border-b border-border">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all ${
              tab === t.id
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon icon={t.icon} width={15} />
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          {/* ─── Find Party ─── */}
          {tab === 'party' && (
            <motion.div
              key="party"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-6 gap-6"
            >
              {/* Illustration ring */}
              <div className="relative w-40 h-40 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping" style={{ animationDuration: '3s' }} />
                <div className="absolute inset-4 rounded-full border-2 border-primary/30" />
                <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center">
                  <Icon icon="solar:users-group-rounded-bold" className="text-primary" width={36} />
                </div>
              </div>

              <div className="text-center">
                <h2 className="text-xl font-bold mb-2">Ready to Party Up?</h2>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                  We'll match you with 2–3 compatible peers based on your vibe, quests, and goals.
                </p>
              </div>

              {partyFormed ? (
                <div className="w-full max-w-xs">
                  <div className="flex items-center gap-2 bg-accent/10 border border-accent/30 text-accent rounded-xl px-4 py-3 mb-3">
                    <Icon icon="solar:check-circle-bold" width={18} />
                    <span className="text-sm font-semibold">Party formed! Check Messages.</span>
                  </div>
                  <button
                    onClick={() => { setPartyFormed(false); setOpenPartyChat(false); }}
                    className="w-full py-3 rounded-full border border-border text-sm font-semibold text-muted-foreground active:scale-95 transition-transform"
                  >
                    Disband Party
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setPartyModalOpen(true)}
                  className="w-full max-w-xs py-4 bg-primary text-primary-foreground rounded-full font-bold text-base flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-lg"
                >
                  <Icon icon="solar:magic-stick-3-bold" width={20} />
                  Find Party
                </button>
              )}
            </motion.div>
          )}

          {/* ─── Connections ─── */}
          {tab === 'connections' && (
            <motion.div
              key="connections"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 overflow-y-auto p-4 space-y-2"
            >
              <p className="text-xs text-muted-foreground font-mono px-1 mb-3">
                {connections.length} people you've connected with
              </p>
              {connections.map((c) => (
                <ConnectionCard
                  key={c.id}
                  connection={c}
                  onClick={() => setSelectedConnection(c)}
                />
              ))}
            </motion.div>
          )}

          {/* ─── Messages ─── */}
          {tab === 'messages' && (
            <motion.div
              key="messages"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex flex-col"
            >
              <MessagesTab highlightPartyChat={openPartyChat} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Profile panel overlay (over connections tab) */}
        <ProfilePanel
          connection={selectedConnection}
          onClose={() => setSelectedConnection(null)}
        />
      </div>

      {/* Find Party modal */}
      <FindPartyModal
        open={partyModalOpen}
        onClose={() => setPartyModalOpen(false)}
        onStartChat={handleStartPartyChat}
      />
    </div>
  );
};

export default SocialPage;
