import { Loader2 } from "lucide-react";

export function Loader() {
  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-card/80 backdrop-blur-sm transition-all duration-500">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-sm font-medium text-muted-foreground animate-pulse">
          Loading the world...
        </p>
      </div>
    </div>
  );
}
