import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Maximize2, Minimize2, X, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";

export function GamePlayer({ game, onClose }) {
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  if (!game) return null;

  const toggleFullScreen = async () => {
    const iframe = document.getElementById("game-iframe");
    if (!iframe) return;

    try {
      if (!document.fullscreenElement) {
        if (iframe.requestFullscreen) {
          await iframe.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        }
      }
    } catch (error) {
      console.warn("Fullscreen operation failed:", error);
    }
  };

  const openInNewTab = () => {
    window.open(game.iframeUrl, '_blank', 'noopener,noreferrer');
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
              onClick={openInNewTab}
              title="Open in new tab"
              className="text-zinc-400 hover:text-white hover:bg-white/10"
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleFullScreen}
              className="text-zinc-400 hover:text-white hover:bg-white/10"
            >
              {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
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
            allow="autoplay; fullscreen; picture-in-picture; cross-origin-isolated"
            referrerPolicy="no-referrer"
            title={game.title}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
