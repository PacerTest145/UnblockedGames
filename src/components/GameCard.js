import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

export const GameCard = ({ game, onPlay }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="h-full"
    >
      <Card className="overflow-hidden h-full flex flex-col border border-border bg-card hover:border-primary/50 transition-all duration-300 rounded-2xl group cursor-pointer" onClick={() => onPlay(game)}>
        {game.thumbnail && (
          <div className="relative h-[160px] overflow-hidden bg-zinc-800">
            <img
              src={game.thumbnail}
              alt={game.title}
              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        )}
        <CardHeader className="p-6 flex-1 flex flex-col justify-between">
          <div>
            <CardTitle className="text-xl font-bold tracking-tight mb-2">{game.title}</CardTitle>
            <div className="flex items-center justify-between text-sm text-secondary-foreground">
              <span>{game.category}</span>
            </div>
          </div>
          <div className="mt-4">
            <Button 
              size="sm" 
              className="w-full bg-primary text-white hover:bg-primary/90 font-bold text-xs py-2 rounded-xl"
            >
              PLAY NOW
            </Button>
          </div>
        </CardHeader>
      </Card>
    </motion.div>
  );
};
