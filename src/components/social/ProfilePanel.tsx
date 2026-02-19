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

          {/* Stats row */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-card rounded-xl p-3 border border-border text-center">
                <div className="text-xl font-bold font-mono text-primary">{connection.level}</div>
                <div className="text-xs text-muted-foreground mt-0.5">Level</div>
              </div>
              <div className="bg-card rounded-xl p-3 border border-border text-center">
                <div className="text-xl font-bold font-mono text-primary">{connection.sharedQuests}</div>
                <div className="text-xs text-muted-foreground mt-0.5">Shared</div>
              </div>
              <div className="bg-card rounded-xl p-3 border border-border text-center">
                <div className="text-xs font-bold font-mono text-foreground mt-1">{connection.lastSeen}</div>
                <div className="text-xs text-muted-foreground mt-0.5">Last seen</div>
              </div>
            </div>

            {/* Vibe + Met through */}
            <div className="bg-card rounded-xl p-4 border border-border space-y-3">
              <div>
                <div className="text-xs text-muted-foreground mb-1.5 font-mono uppercase tracking-wider">Vibe</div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ background: vibeColors[connection.vibe] }}
                  />
                  <span className="font-semibold text-sm" style={{ color: vibeColors[connection.vibe] }}>
                    {vibeLabels[connection.vibe]}
                  </span>
                </div>
              </div>

              {connection.metThrough && (
                <div>
                  <div className="text-xs text-muted-foreground mb-1.5 font-mono uppercase tracking-wider">
                    {connection.metThroughType === 'simulation' ? 'Completed Together' : 'Met Through'}
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon
                      icon={connection.metThroughType === 'simulation' ? 'solar:diploma-bold' : 'solar:sword-bold'}
                      className="text-primary shrink-0"
                      width={15}
                    />
                    <span className="text-sm font-semibold text-foreground">{connection.metThrough}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Shared progression */}
            <div className="bg-card rounded-xl p-4 border border-border">
              <div className="text-xs text-muted-foreground mb-3 font-mono uppercase tracking-wider">Shared Progression</div>
              <div className="flex flex-col gap-2">
                {Array.from({ length: connection.sharedQuests }).slice(0, 3).map((_, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <Icon icon="solar:sword-bold" className="text-primary shrink-0" width={12} />
                    <span className="text-foreground/70">
                      {['ConEd Grid Challenge', 'North District Mapping', 'MakerLab Sprint', 'Sustainability Sim'][i % 4]}
                    </span>
                  </div>
                ))}
                {connection.sharedQuests > 3 && (
                  <p className="text-xs text-muted-foreground font-mono">+{connection.sharedQuests - 3} more</p>
                )}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-2">
              <button className="w-full py-3.5 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform">
                <Icon icon="solar:chat-round-bold" width={18} />
                Send Message
              </button>
              <button className="w-full py-3 rounded-full border border-border text-sm font-semibold text-foreground flex items-center justify-center gap-2 active:scale-95 transition-transform">
                <Icon icon="solar:users-group-rounded-bold" width={16} />
                Quest Together
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProfilePanel;
