import { Icon } from '@iconify/react';
import { useLocation, useNavigate } from 'react-router-dom';

const NAV_ITEMS = [
  { path: '/', label: 'Map', icon: 'solar:map-bold-duotone' },
  { path: '/social', label: 'Social', icon: 'solar:users-group-rounded-bold-duotone' },
];

const AppBottomNav = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="shrink-0 flex items-center bg-background/95 backdrop-blur-sm border-t border-border px-4 pb-6 pt-2">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.path;
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex-1 flex flex-col items-center gap-1 py-2 transition-all active:scale-90 ${
              isActive ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <Icon icon={item.icon} width={26} />
            <span className="text-xs font-semibold">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default AppBottomNav;
