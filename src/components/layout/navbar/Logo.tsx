import { Sparkles } from "lucide-react";

export const Logo = () => {
  return (
    <div className="flex items-center gap-2 font-bold text-xl">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <Sparkles className="h-5 w-5" />
      </div>
      <span className="font-outfit tracking-wide">Wolfie</span>
    </div>
  );
};
