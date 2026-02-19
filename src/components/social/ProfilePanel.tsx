import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import { vibeColors, vibeLabels } from '@/data/mockData';
import type { Connection } from '@/types/social';

interface Props {
  connection: Connection | null;
  onClose: () => void;
}

const ProfilePanel = ({ connection, onClose }: Props) => {
  return (
    <AnimatePresence>
      {connection && (
        <motion.div
          key="profile"
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          className="absolute inset-0 z-30 bg-background flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 pt-14 pb-4 border-b border-border">
            <button onClick={onClose} className="active:scale-90 transition-transform">
              <Icon icon="solar:alt-arrow-left-bold" className="text-foreground" width={24} />
            </button>
            <span className="font-bold text-base">Profile</span>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Avatar + name */}
            <div className="flex flex-col items-center gap-3 pt-2">
              <div
                className="w-24 h-24 rounded-full overflow-hidden border-4"
                style={{ borderColor: vibeColors[connection.vibe] }}
              >
                <img src={connection.photo} alt={connection.name} className="w-full h-full object-cover" />
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <h2 className="text-xl font-bold">{connection.name}</h2>
                  {connection.isMentor && (
                    <span className="text-xs bg-accent/20 text-accent px-2 py-0.5 rounded font-mono font-bold">
                      MENTOR
                    </span>
                  )}
                </div>
                <span
                  className="text-sm font-mono font-bold"
                  style={{ color: vibeColors[connection.vibe] }}
                >
                  {vibeLabels[connection.vibe]} · Level {connection.level}
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-card rounded-xl p-4 border border-border text-center">
                <div className="text-2xl font-bold font-mono text-primary">{connection.level}</div>
                <div className="text-xs text-muted-foreground mt-1">Level</div>
              </div>
              <div className="bg-card rounded-xl p-4 border border-border text-center">
                <div className="text-2xl font-bold font-mono text-primary">{connection.sharedQuests}</div>
                <div className="text-xs text-muted-foreground mt-1">Shared Quests</div>
              </div>
            </div>

            {/* Vibe badge */}
            <div className="bg-card rounded-xl p-4 border border-border">
              <div className="text-xs text-muted-foreground mb-2 font-mono uppercase tracking-wider">Vibe</div>
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: vibeColors[connection.vibe] }}
                />
                <span className="font-semibold" style={{ color: vibeColors[connection.vibe] }}>
                  {vibeLabels[connection.vibe]}
                </span>
              </div>
            </div>

            {/* Send message CTA */}
            <button className="w-full py-3.5 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform">
              <Icon icon="solar:chat-round-bold" width={18} />
              Send Message
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProfilePanel;
