import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Maximize2, X } from "lucide-react";
import { useState } from "react";

export function GamePlayer({ game, onClose }) {
  const [isFullScreen, setIsFullScreen] = useState(false);

  if (!game) return null;

  const toggleFullScreen = () => {
    const iframe = document.getElementById("game-iframe");
    if (iframe) {
      if (!isFullScreen) {
        if (iframe.requestFullscreen) {
          iframe.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
      setIsFullScreen(!isFullScreen);
    }
  };

  return (
    <Dialog open={!!game} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl w-[95vw] h-[85vh] p-0 overflow-hidden flex flex-col bg-black border-primary/20">
        <DialogHeader className="p-4 border-b border-white/10 flex flex-row items-center justify-between space-y-0 bg-zinc-950">
          <div>
            <DialogTitle className="text-white flex items-center gap-2">
              {game.title}
            </DialogTitle>
            <DialogDescription className="text-zinc-400 text-xs">
              {game.category} • {game.tags.join(", ")}
            </DialogDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleFullScreen}
              className="text-zinc-400 hover:text-white hover:bg-white/10"
            >
              <Maximize2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-zinc-400 hover:text-white hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>
        <div className="flex-1 bg-zinc-900 relative">
          <iframe
            id="game-iframe"
            src={game.iframeUrl}
            className="w-full h-full border-none"
            allow="autoplay; fullscreen; keyboard"
            title={game.title}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
