import { useState, useMemo } from "react";
import gamesData from "./data/games.json";
import { GameCard } from "./components/GameCard";
import { GamePlayer } from "./components/GamePlayer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { AnimatePresence } from "motion/react";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeGame, setActiveGame] = useState(null);

  const games = gamesData;

  const categories = useMemo(() => {
    const cats = new Set(games.map((g) => g.category));
    return Array.from(cats);
  }, [games]);

  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = !selectedCategory || game.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [games, searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground flex flex-col">
      {/* Header */}
      <header className="h-[72px] shrink-0 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-10 h-full flex items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <div className="text-2xl font-extrabold tracking-tighter">
              BIG P <span className="text-primary">GAMES</span>
            </div>
          </div>

          <div className="flex-1 max-w-[400px] relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-foreground" />
            <Input
              placeholder="Search unblocked games..."
              className="pl-11 bg-card border-border h-11 rounded-xl text-sm focus-visible:ring-1 focus-visible:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary-foreground text-xs font-mono">/</span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-secondary-foreground">
          </nav>
        </div>
      </header>

      <div className="flex-1 flex container mx-auto">
        {/* Sidebar */}
        <aside className="w-[240px] shrink-0 border-r border-border p-10 hidden lg:block">
          <span className="text-[11px] font-bold uppercase tracking-widest text-secondary-foreground mb-6 block">
            Categories
          </span>
          <nav className="flex flex-col gap-1">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`flex items-center gap-3 py-2.5 text-[15px] transition-colors ${
                selectedCategory === null ? "text-primary font-semibold" : "text-foreground hover:text-primary"
              }`}
            >
              <div className={`w-1.5 h-1.5 rounded-full ${selectedCategory === null ? "bg-primary" : "bg-transparent"}`} />
              All Games
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex items-center gap-3 py-2.5 text-[15px] transition-colors ${
                  selectedCategory === cat ? "text-primary font-semibold" : "text-foreground hover:text-primary"
                }`}
              >
                <div className={`w-1.5 h-1.5 rounded-full ${selectedCategory === cat ? "bg-primary" : "bg-transparent"}`} />
                {cat}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-10 overflow-y-auto">
          <h2 className="text-3xl font-bold mb-8">
            {selectedCategory || (searchQuery ? `Search: ${searchQuery}` : "All Games")}
          </h2>

          {/* Games Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredGames.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  onPlay={setActiveGame}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Empty State */}
          {filteredGames.length === 0 && (
            <div className="py-20 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No games found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or category filters.
              </p>
              <Button
                variant="link"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory(null);
                }}
                className="mt-2"
              >
                Clear all filters
              </Button>
            </div>
          )}
        </main>
      </div>

      {/* Game Player Modal */}
      <GamePlayer
        game={activeGame}
        onClose={() => setActiveGame(null)}
      />
    </div>
  );
}
