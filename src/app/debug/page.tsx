import { DebugScene } from "@/components/3d/DebugScene";

export default function DebugPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <div className="w-full max-w-4xl h-[600px] rounded-xl border border-slate-200 shadow-xl overflow-hidden relative">
        <DebugScene />
      </div>
    </main>
  );
}
