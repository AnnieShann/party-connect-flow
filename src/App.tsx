import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import SocialPage from "./pages/SocialPage";
import NotFound from "./pages/NotFound";
import AppBottomNav from "./components/AppBottomNav";

const queryClient = new QueryClient();

const AppShell = () => {
  const { pathname } = useLocation();
  const showNav = pathname === '/' || pathname === '/social';

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex-1 overflow-hidden">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/social" element={<SocialPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {showNav && <AppBottomNav />}
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
