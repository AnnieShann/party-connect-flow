import { Icon } from '@iconify/react';
import { vibeColors, vibeLabels } from '@/data/mockData';
import type { Connection } from '@/types/social';

interface Props {
  connection: Connection;
  onClick: () => void;
}

const ConnectionCard = ({ connection, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 bg-card rounded-xl px-4 py-3.5 border border-border active:scale-[0.98] transition-transform text-left"
    >
      {/* Avatar */}
      <div
        className="w-12 h-12 rounded-full overflow-hidden border-2 shrink-0"
        style={{ borderColor: vibeColors[connection.vibe] }}
      >
        <img src={connection.photo} alt={connection.name} className="w-full h-full object-cover" />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="font-semibold text-sm truncate">{connection.name}</span>
          {connection.isMentor && (
            <span className="shrink-0 text-xs bg-accent/20 text-accent px-1.5 py-0.5 rounded font-mono font-bold">
              MENTOR
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span
            className="text-xs font-mono font-bold"
            style={{ color: vibeColors[connection.vibe] }}
          >
            {vibeLabels[connection.vibe]}
          </span>
          <span className="text-xs text-muted-foreground font-mono">LVL {connection.level}</span>
        </div>
      </div>

      {/* Shared quests + chevron */}
      <div className="flex flex-col items-end gap-1 shrink-0">
        <div className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
          <Icon icon="solar:sword-bold" className="text-primary" width={13} />
          <span>{connection.sharedQuests}</span>
        </div>
        <span className="text-xs text-muted-foreground">{connection.lastSeen}</span>
      </div>

      <Icon icon="solar:alt-arrow-right-linear" className="text-muted-foreground shrink-0" width={16} />
    </button>
  );
};

export default ConnectionCard;
