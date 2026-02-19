import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import { connections, maya, vibeColors, mockPartyMatch, mockActiveParty, questUnlocks, bulletinPosts } from '@/data/mockData';
import FindPartyModal from '@/components/social/FindPartyModal';
import ConnectionCard from '@/components/social/ConnectionCard';
import ProfilePanel from '@/components/social/ProfilePanel';
import MessagesTab from '@/components/social/MessagesTab';
import DiscoverTab from '@/components/social/DiscoverTab';
import type { Connection } from '@/types/social';


type Tab = 'party' | 'connections' | 'messages' | 'discover';

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'party', label: 'Party', icon: 'solar:users-group-rounded-bold' },
  { id: 'discover', label: 'Discover', icon: 'solar:compass-bold' },
  { id: 'connections', label: 'Network', icon: 'solar:link-bold' },
  { id: 'messages', label: 'Messages', icon: 'solar:chat-round-bold' },
];

const SocialPage = () => {
  const [tab, setTab] = useState<Tab>('party');
  const [partyModalOpen, setPartyModalOpen] = useState(false);
  const [selectedConnection, setSelectedConnection] = useState<Connection | null>(null);
  const [partyFormed, setPartyFormed] = useState(false);
  const [openPartyChat, setOpenPartyChat] = useState(false);
  const [extraConnections, setExtraConnections] = useState(0);

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
            LVL {maya.level} · {connections.length + extraConnections} connections
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
              className="absolute inset-0 overflow-y-auto"
            >
              <div className="flex flex-col items-center p-6 gap-6">
                {/* Illustration ring */}
                <div className="relative w-40 h-40 flex items-center justify-center shrink-0">
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
                  <div className="w-full max-w-xs flex flex-col gap-3">
                    <div className="flex items-center gap-2 bg-accent/10 border border-accent/30 text-accent rounded-xl px-4 py-3">
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

                {/* ── Active Party Panel ── */}
                {partyFormed && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="w-full max-w-xs flex flex-col gap-3"
                  >
                    {/* Party header */}
                    <div className="bg-card border border-border rounded-2xl p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Icon icon="solar:fire-bold" className="text-primary" width={18} />
                        <span className="font-bold text-sm">{mockActiveParty.name}</span>
                        <span className="ml-auto flex items-center gap-1.5 bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                          <span className="text-xs font-mono font-bold">Active</span>
                        </span>
                      </div>

                      {/* Shared quests */}
                      <div className="mb-3">
                        <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-1.5">Shared Quests</p>
                        <div className="flex flex-col gap-1">
                          {mockActiveParty.sharedQuests.map((q) => (
                            <div key={q} className="flex items-center gap-2 text-xs">
                              <Icon icon="solar:sword-bold" className="text-primary shrink-0" width={12} />
                              <span className="text-foreground/80">{q}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Completed simulations */}
                      <div className="mb-3">
                        <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-1.5">Completed Simulations</p>
                        <div className="flex flex-col gap-1">
                          {mockActiveParty.completedSimulations.map((s) => (
                            <div key={s} className="flex items-center gap-2 text-xs">
                              <Icon icon="solar:diploma-bold" className="text-accent shrink-0" width={12} />
                              <span className="text-foreground/80">{s}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Next suggested quest */}
                      <div className="bg-primary/8 border border-primary/20 rounded-xl px-3 py-2.5 flex items-center gap-2">
                        <Icon icon="solar:map-arrow-right-bold" className="text-primary shrink-0" width={15} />
                        <div>
                          <p className="text-xs text-muted-foreground font-mono">Next Suggested Quest</p>
                          <p className="text-xs font-semibold text-foreground">{mockActiveParty.nextSuggestedQuest}</p>
                        </div>
                      </div>
                    </div>

                    {/* Party members row */}
                    <div className="flex items-center gap-2">
                      {mockPartyMatch.members.map((m) => (
                        <div key={m.id} className="flex items-center gap-1.5 bg-card border border-border rounded-full px-2.5 py-1.5">
                          <div className="w-5 h-5 rounded-full overflow-hidden border shrink-0" style={{ borderColor: vibeColors[m.vibe] }}>
                            <img src={m.photo} alt={m.name} className="w-full h-full object-cover" />
                          </div>
                          <span className="text-xs font-medium">{m.name.split(' ')[0]}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
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
              className="absolute inset-0 overflow-y-auto"
            >
              <div className="p-4 space-y-4">
                {/* Connection list */}
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground font-mono px-1">
                    {connections.length} people you've connected with
                  </p>
                  {connections.map((c) => (
                    <ConnectionCard
                      key={c.id}
                      connection={c}
                      onClick={() => setSelectedConnection(c)}
                    />
                  ))}
                </div>

                {/* ── Quest Unlocks ── */}
                <div>
                  <div className="flex items-center gap-2 px-1 mb-3">
                    <Icon icon="solar:lock-keyhole-minimalistic-bold" className="text-primary" width={16} />
                    <h3 className="font-bold text-sm">Quest Unlocks</h3>
                  </div>
                  <div className="flex flex-col gap-2">
                    {questUnlocks.map((q) => (
                      <div
                        key={q.id}
                        className={`flex items-center gap-3 rounded-xl px-4 py-3 border ${
                          q.locked
                            ? 'bg-muted/40 border-border/50'
                            : 'bg-card border-border'
                        }`}
                      >
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                          q.locked ? 'bg-muted' : 'bg-primary/10'
                        }`}>
                          <Icon
                            icon={q.locked ? 'solar:lock-keyhole-bold' : 'solar:sword-bold'}
                            className={q.locked ? 'text-muted-foreground' : 'text-primary'}
                            width={16}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-semibold truncate ${q.locked ? 'text-muted-foreground' : 'text-foreground'}`}>
                            {q.title}
                          </p>
                          {q.locked && q.unlockCondition && (
                            <p className="text-xs text-muted-foreground mt-0.5">{q.unlockCondition}</p>
                          )}
                          {!q.locked && (
                            <p className="text-xs text-primary font-mono mt-0.5">Unlocked</p>
                          )}
                        </div>
                        {q.locked && (
                          <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full font-mono shrink-0">🔒 Locked</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Community Insights ── */}
                <div>
                  <div className="flex items-center gap-2 px-1 mb-3">
                    <Icon icon="solar:users-group-rounded-bold" className="text-primary" width={16} />
                    <h3 className="font-bold text-sm">Community Insights</h3>
                  </div>
                  <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4" style={{ scrollbarWidth: 'none' }}>
                    {bulletinPosts.map((post) => (
                      <div
                        key={post.id}
                        className="flex-shrink-0 w-52 bg-card border border-border rounded-xl p-3.5 flex flex-col gap-2"
                      >
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Icon icon={post.icon} className="text-primary" width={15} />
                        </div>
                        <p className="text-xs leading-relaxed text-foreground">{post.text}</p>
                        <p className="text-xs text-muted-foreground font-mono mt-auto">{post.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {tab === 'discover' && (
            <motion.div
              key="discover"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0"
            >
              <DiscoverTab onConnected={() => setExtraConnections((n) => n + 1)} />
            </motion.div>
          )}

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
