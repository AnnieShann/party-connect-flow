import { Icon } from '@iconify/react';

const Index = () => {
  return (
    <div className="h-full w-full bg-background flex flex-col items-center justify-center gap-6 p-6">
      <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center">
        <Icon icon="solar:map-bold-duotone" className="text-primary" width={40} />
      </div>
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Game Map</h1>
        <p className="text-sm text-muted-foreground">
          Your quest map would appear here.{' '}
          <span className="text-primary font-semibold">Navigate to Social →</span>
        </p>
      </div>
    </div>
  );
};

export default Index;
