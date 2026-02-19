import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import { vibeColors, vibeLabels, discoverPeople } from '@/data/mockData';
import type { DiscoverFilter, DiscoverPerson } from '@/types/social';

const FILTERS: { id: DiscoverFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'peers', label: 'Peers' },
  { id: 'mentors', label: 'Mentors' },
  { id: 'nearby', label: 'Nearby' },
];

const roleIcon: Record<string, string> = {
  Peer: 'solar:user-bold',
  Mentor: 'solar:star-bold',
  'Career Coach': 'solar:case-round-bold',
};

interface PersonCardProps {
  person: DiscoverPerson;
  onConnect: (id: string) => void;
  onInvite: (id: string) => void;
  connected: boolean;
}

const PersonCard = ({ person, onConnect, onInvite, connected }: PersonCardProps) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -6 }}
    transition={{ duration: 0.18 }}
    className="bg-card border border-border rounded-2xl p-4 flex flex-col gap-3"
  >
    {/* Top row */}
    <div className="flex items-start gap-3">
      <div
        className="w-12 h-12 rounded-full overflow-hidden border-2 shrink-0"
        style={{ borderColor: vibeColors[person.vibe] }}
      >
        <img src={person.photo} alt={person.name} className="w-full h-full object-cover" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
          <span className="font-semibold text-sm">{person.name}</span>
          {person.role !== 'Peer' && (
            <span className="text-xs bg-accent/15 text-accent px-1.5 py-0.5 rounded font-mono font-bold leading-none">
              {person.role.toUpperCase()}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 mb-1">
          <div className="flex items-center gap-1">
            <Icon icon={roleIcon[person.role]} width={11} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{person.role}</span>
          </div>
          <span className="text-muted-foreground/40 text-xs">·</span>
          <span
            className="text-xs font-mono font-bold"
            style={{ color: vibeColors[person.vibe] }}
          >
            {vibeLabels[person.vibe]}
          </span>
          <span className="text-xs text-muted-foreground font-mono">LVL {person.level}</span>
        </div>

        {/* Shared trait */}
        <div className="flex items-center gap-1">
          <Icon icon="solar:diploma-bold" width={11} className="text-primary shrink-0" />
          <span className="text-xs text-muted-foreground truncate">{person.sharedTrait}</span>
        </div>
      </div>
    </div>

    {/* Distance + actions */}
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
        <Icon icon="solar:map-point-bold" width={12} className="shrink-0" />
        {person.distance}
      </div>
      <div className="flex-1" />

      {connected ? (
        <span className="flex items-center gap-1 text-xs font-semibold text-accent font-mono px-3 py-1.5">
          <Icon icon="solar:check-circle-bold" width={14} />
          Connected
        </span>
      ) : (
        <>
          <button
            onClick={() => onInvite(person.id)}
            className="text-xs font-semibold border border-border rounded-full px-3 py-1.5 text-foreground active:scale-95 transition-transform"
          >
            Invite to Party
          </button>
          <button
            onClick={() => onConnect(person.id)}
            className="text-xs font-bold bg-primary text-primary-foreground rounded-full px-3 py-1.5 active:scale-95 transition-transform"
          >
            Connect
          </button>
        </>
      )}
    </div>
  </motion.div>
);

interface Props {
  onConnected: (id: string) => void;
}

const DiscoverTab = ({ onConnected }: Props) => {
  const [filter, setFilter] = useState<DiscoverFilter>('all');
  const [connectedIds, setConnectedIds] = useState<Set<string>>(new Set());
  const [invitedIds, setInvitedIds] = useState<Set<string>>(new Set());

  const handleConnect = (id: string) => {
    setConnectedIds((prev) => new Set([...prev, id]));
    onConnected(id);
  };

  const handleInvite = (id: string) => {
    setInvitedIds((prev) => new Set([...prev, id]));
  };

  const filtered = discoverPeople.filter((p) => {
    if (filter === 'peers') return p.role === 'Peer';
    if (filter === 'mentors') return p.role === 'Mentor' || p.role === 'Career Coach';
    if (filter === 'nearby') return parseFloat(p.distance) < 2;
    return true;
  });

  const peers = filtered.filter((p) => p.role === 'Peer');
  const mentors = filtered.filter((p) => p.role !== 'Peer');

  return (
    <div className="absolute inset-0 overflow-y-auto">
      <div className="p-4 space-y-5">

        {/* Filters */}
        <div className="flex gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                filter === f.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Peers section */}
        {peers.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground font-mono px-1 uppercase tracking-wider">
              Recommended Peers
            </p>
            <AnimatePresence mode="popLayout">
              {peers.map((p) => (
                <PersonCard
                  key={p.id}
                  person={p}
                  connected={connectedIds.has(p.id)}
                  onConnect={handleConnect}
                  onInvite={handleInvite}
                />
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Mentors section */}
        {mentors.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 px-1">
              <Icon icon="solar:star-bold" className="text-accent" width={14} />
              <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
                Mentors & Coaches
              </p>
            </div>
            <AnimatePresence mode="popLayout">
              {mentors.map((p) => (
                <PersonCard
                  key={p.id}
                  person={p}
                  connected={connectedIds.has(p.id)}
                  onConnect={handleConnect}
                  onInvite={handleInvite}
                />
              ))}
            </AnimatePresence>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-12 text-center">
            <Icon icon="solar:users-group-rounded-bold" className="text-muted-foreground" width={40} />
            <p className="text-sm text-muted-foreground">No people found for this filter.</p>
          </div>
        )}

        {/* Invited toast hint */}
        <AnimatePresence>
          {invitedIds.size > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-card border border-border shadow-lg rounded-full px-4 py-2 flex items-center gap-2 z-50"
            >
              <Icon icon="solar:users-group-rounded-bold" className="text-primary" width={15} />
              <span className="text-xs font-semibold">Party invite sent!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DiscoverTab;
