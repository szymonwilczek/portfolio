import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Portfolio 3D <span className="text-blue-600">Next.js</span>
        </h1>
      </div>

      <div className="my-8">
        <Button size="lg">Start Experience</Button>
      </div>

      <div className="w-full h-[500px] bg-slate-200 rounded-xl border border-slate-300 flex items-center justify-center text-slate-500">
        Canvas 3D
      </div>
    </main>
  );
}
