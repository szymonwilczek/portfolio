import { DebugScene } from "@/components/3d/DebugScene";

export default function DebugPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-card p-4 md:p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex mb-8">
        <h1 className="text-4xl font-bold text-slate-900">
          <span className="text-red-600">DEBUG</span>
        </h1>
      </div>
      <div className="w-full max-w-4xl h-[600px] rounded-xl border border-slate-200 bg-white/50 shadow-xl overflow-hidden relative">
        <DebugScene />
      </div>
    </main>
  );
}
