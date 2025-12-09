import { Button } from "@/components/ui/button";
import { Scene } from "@/components/3d/Scene";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4 md:p-24 transition-colors duration-300">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex mb-8">
        <h1 className="text-4xl font-bold text-foreground">
          Wolfie <span className="text-primary">Portfolio 3D</span>
        </h1>
      </div>

      <div className="w-full max-w-2xl h-[500px] rounded-xl border border-border bg-card/50 shadow-xl overflow-hidden relative">
        <Scene />
      </div>

      <div className="mt-8 text-muted-foreground text-center max-w-md">
        <p>Model wygenerowany w Blenderze, wczytany przez React Three Fiber.</p>
        <p className="text-xs mt-2">Kompresja Draco aktywna.</p>
      </div>
    </main>
  );
}
