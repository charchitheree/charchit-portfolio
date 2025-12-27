import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalMusicPlayer from "@/components/GlobalMusicPlayer";
import Index from "./pages/Index";
import SearchResults from "./pages/SearchResults";
import WikipediaPage from "./pages/WikipediaPage";
import MangaReader from "./pages/MangaReader";
import DoodlePage from "./pages/DoodlePage";
import FeedbackPage from "./pages/FeedbackPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <GlobalMusicPlayer />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/wiki/charchit-sharma" element={<WikipediaPage />} />
          <Route path="/manga" element={<MangaReader />} />
          <Route path="/doodle" element={<DoodlePage />} />
          <Route path="/voices" element={<FeedbackPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
