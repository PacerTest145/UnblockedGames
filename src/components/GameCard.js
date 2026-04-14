import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

export const GameCard = ({ game, onPlay }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="overflow-hidden h-full flex flex-col border border-border bg-card hover:border-primary/50 transition-all duration-300 rounded-2xl group">
        <div className="relative h-[140px] overflow-hidden bg-zinc-800 flex items-center justify-center">
          <img
            src={game.thumbnail}
            alt={game.title}
            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button 
              size="sm" 
              onClick={() => onPlay(game)} 
              className="bg-primary text-white hover:bg-primary/90 font-bold text-xs px-4 py-2 rounded-md"
            >
              PLAY
            </Button>
          </div>
        </div>
        <CardHeader className="p-5 space-y-1">
          <CardTitle className="text-base font-semibold tracking-tight">{game.title}</CardTitle>
          <div className="flex items-center justify-between text-xs text-secondary-foreground">
            <span>{game.category}</span>
            <span className="flex items-center gap-1">
              <span className="text-yellow-500">★</span> 4.8/5
            </span>
          </div>
        </CardHeader>
      </Card>
    </motion.div>
  );
};
