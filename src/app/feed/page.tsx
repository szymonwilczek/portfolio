import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SpotifyNowPlaying } from "@/components/feed/SpotifyNowPlaying";
import { WakaTimeStats } from "@/components/feed/WakaTimeStats";
import { GitHubHeatmap } from "@/components/feed/GitHubHeatmap";

export const metadata: Metadata = {
  title: "Feed | Szymon Wilczek",
  description: "What I'm currently listening to, coding stats, and tech stack.",
};

export default function FeedPage() {
  return (
    <main className="mx-auto mb-8 -mt-10 bg-background px-6 md:px-12 transition-colors duration-300 z-0">
      <div className="max-w-3xl mx-auto space-y-12">
        <div
          className="space-y-2 animate-in slide-in-from-bottom-8 fade-in duration-700"
          style={{ animationFillMode: "both" }}
        >
          <Button variant="ghost" asChild className="-ml-4 text-muted-foreground">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Link>
          </Button>
          <h1 className="text-4xl md:text-5xl font-bold font-outfit tracking-tight">
            Feed <span className="text-muted-foreground">/ Activity</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Real-time glimpse into what I&apos;m listening to and what I&apos;m coding.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-bottom-8 fade-in duration-500 delay-200" style={{ animationFillMode: "both" }}>
          <SpotifyNowPlaying />
          <WakaTimeStats />
        </div>

        <div className="animate-in slide-in-from-bottom-8 fade-in duration-500 delay-300" style={{ animationFillMode: "both" }}>
          <GitHubHeatmap />
        </div>
      </div>
    </main>
  );
}
