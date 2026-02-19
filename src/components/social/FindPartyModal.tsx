import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import { mockPartyMatch, vibeColors, vibeLabels } from '@/data/mockData';

interface Props {
  open: boolean;
  onClose: () => void;
  onStartChat: () => void;
}

const FindPartyModal = ({ open, onClose, onStartChat }: Props) => {
  const modal = (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="modal-root"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-end"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="relative w-full bg-card border-t border-border rounded-t-2xl p-6 pb-10"
          >
            {/* Handle */}
            <div className="w-10 h-1 bg-muted rounded-full mx-auto mb-5" />

            <div className="flex items-center gap-2 mb-1">
              <Icon icon="solar:users-group-rounded-bold" className="text-primary" width={22} />
              <h2 className="text-lg font-bold">Party Found!</h2>
            </div>

            {/* Rationale */}
            <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
              {mockPartyMatch.rationale}
            </p>

            {/* Party members */}
            <div className="flex flex-col gap-3 mb-6">
              {mockPartyMatch.members.map((member) => (
                <div key={member.id} className="flex items-center gap-3 bg-muted rounded-xl px-4 py-3">
                  <div
                    className="w-10 h-10 rounded-full overflow-hidden border-2 shrink-0"
                    style={{ borderColor: vibeColors[member.vibe] }}
                  >
                    <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">{member.name}</span>
                      {member.isMentor && (
                        <span className="text-xs bg-accent/20 text-accent px-1.5 py-0.5 rounded font-mono font-bold">
                          MENTOR
                        </span>
                      )}
                    </div>
                    <span
                      className="text-xs font-mono font-bold"
                      style={{ color: vibeColors[member.vibe] }}
                    >
                      {vibeLabels[member.vibe]} · LVL {member.level}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
                    <Icon icon="solar:sword-bold" width={14} />
                    {member.sharedQuests}
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-3.5 rounded-full border border-border text-sm font-semibold text-muted-foreground active:scale-95 transition-transform"
              >
                Cancel
              </button>
              <button
                onClick={onStartChat}
                className="flex-1 py-3.5 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform"
              >
                <Icon icon="solar:chat-round-bold" width={18} />
                Start Party Chat
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );

  return createPortal(modal, document.body);
};

export default FindPartyModal;
