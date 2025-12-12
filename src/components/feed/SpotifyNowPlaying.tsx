"use client";

import { useEffect, useState, useCallback, useMemo, memo } from "react";
import Image from "next/image";
import { Music, Pause, Heart, Guitar, Headphones } from "lucide-react";

interface FavoriteArtist {
  name: string;
  imageUrl: string;
  url: string;
  genres: string[];
}

interface SpotifyTrack {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  songUrl: string;
  progressMs: number;
  durationMs: number;
  genres: string[];
  favoriteArtist: FavoriteArtist | null;
  topGenre: string | null;
  recentlyPlayedCount: number;
}

function formatTime(ms: number) {
  const seconds = Math.floor(ms / 1000);
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

const LoadingSkeleton = memo(function LoadingSkeleton() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 bg-foreground/20 animate-pulse rounded-md" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-foreground/20 animate-pulse rounded w-3/4" />
          <div className="h-3 bg-foreground/20 animate-pulse rounded w-1/2" />
        </div>
      </div>
      <div className="h-1.5 bg-foreground/20 animate-pulse rounded-full" />
    </div>
  );
});

const IdleState = memo(function IdleState({
  favoriteArtist
}: {
  favoriteArtist?: FavoriteArtist | null
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 bg-muted/50 rounded-md flex items-center justify-center">
          <Pause className="h-5 w-5 text-muted-foreground" />
        </div>
        <div className="flex-1">
          <p className="font-medium text-sm text-foreground">Not Playing</p>
          <p className="text-xs text-muted-foreground">Spotify is idle</p>
        </div>
      </div>

      {favoriteArtist && <FavoriteArtistLink artist={favoriteArtist} />}
    </div>
  );
});

const FavoriteArtistLink = memo(function FavoriteArtistLink({
  artist
}: {
  artist: FavoriteArtist
}) {
  return (
    <div className="pt-2 border-t border-border/50">
      <a
        href={artist.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 group"
      >
        <Heart className="h-3.5 w-3.5 text-red-400 flex-shrink-0" />
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
          Favorite:
        </span>
        {artist.imageUrl && (
          <div className="relative w-5 h-5 rounded-full overflow-hidden border border-border/50">
            <Image
              src={artist.imageUrl}
              alt={artist.name}
              fill
              className="object-cover"
              sizes="20px"
            />
          </div>
        )}
        <span className="text-xs font-medium text-foreground group-hover:text-primary transition-colors truncate">
          {artist.name}
        </span>
      </a>
    </div>
  );
});

const UserStats = memo(function UserStats({
  topGenre,
  recentlyPlayedCount,
}: {
  topGenre: string | null;
  recentlyPlayedCount: number;
}) {
  if (!topGenre && !recentlyPlayedCount) return null;

  return (
    <div className="flex flex-col items-start gap-4 text-[10px] text-muted-foreground">
      {topGenre && (
        <div>
          <div className="flex items-center text-center gap-2 group">
            <Guitar className="h-3.5 w-3.5 text-orange-400 flex-shrink-0" />
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
              Vibing to:
            </span>
            <span className="text-xs font-medium text-foreground group-hover:text-primary transition-colors truncate">
              {topGenre}
            </span>
          </div>
        </div>
      )}
      {recentlyPlayedCount > 0 && (
        <div className="flex items-center text-center gap-2 group">
          <Headphones className="h-3.5 w-3.5 text-purple-400 flex-shrink-0" />
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
            Recently Played:
          </span>
          <span className="text-xs font-medium text-foreground group-hover:text-primary transition-colors truncate">
            {recentlyPlayedCount} tracks
          </span>
        </div>
      )}
    </div>
  );
});

export function SpotifyNowPlaying() {
  const [track, setTrack] = useState<SpotifyTrack | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [localProgress, setLocalProgress] = useState(0);

  const fetchNowPlaying = useCallback(async () => {
    try {
      const res = await fetch("/api/spotify/now-playing");
      if (res.ok) {
        const data = await res.json();
        setTrack(data);
        if (data.progressMs) {
          setLocalProgress(data.progressMs);
        }
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 30000);
    return () => clearInterval(interval);
  }, [fetchNowPlaying]);

  useEffect(() => {
    if (!track?.isPlaying) return;

    const interval = setInterval(() => {
      setLocalProgress((prev) => {
        const next = prev + 1000;
        return next > (track.durationMs || 0) ? track.durationMs : next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [track?.isPlaying, track?.durationMs]);

  const progressPercent = useMemo(() =>
    track?.durationMs ? Math.min((localProgress / track.durationMs) * 100, 100) : 0,
    [localProgress, track?.durationMs]
  );

  const formattedProgress = useMemo(() => formatTime(localProgress), [localProgress]);
  const formattedDuration = useMemo(() => formatTime(track?.durationMs || 0), [track?.durationMs]);

  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Music className="h-4 w-4 text-green-500" />
          <h3 className="font-bold font-outfit text-xs uppercase tracking-widest text-muted-foreground">
            {track?.isPlaying ? "Now Playing" : "Last Played"}
          </h3>
        </div>
      </div>

      {loading ? (
        <LoadingSkeleton />
      ) : error || !track || !track.title ? (
        <IdleState favoriteArtist={track?.favoriteArtist} />
      ) : (
        <div className="space-y-3">
          <a
            href={track.songUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 group"
          >
            <div className="relative w-14 h-14 rounded-md overflow-hidden border border-border/50 shadow-sm bg-foreground/20 flex-shrink-0">
              {track.albumImageUrl ? (
                <Image
                  src={track.albumImageUrl}
                  alt={track.album || "Album cover"}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="56px"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Music className="h-5 w-5 text-muted-foreground" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm text-foreground truncate group-hover:text-primary transition-colors">
                {track.title}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {track.artist}
              </p>
              {track.genres.length > 0 && (
                <p className="text-[10px] text-muted-foreground/60 truncate mt-0.5">
                  {track.genres.join(" • ")}
                </p>
              )}
            </div>
          </a>

          <div className="space-y-1">
            <div className="h-1.5 bg-foreground/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 rounded-full"
                style={{
                  width: `${progressPercent}%`,
                  transition: "width 1s linear",
                }}
              />
            </div>

            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>{formattedProgress}</span>
              <span>{formattedDuration}</span>
            </div>
          </div>

          {track.favoriteArtist && (
            <FavoriteArtistLink artist={track.favoriteArtist} />
          )}

          <UserStats
            topGenre={track.topGenre}
            recentlyPlayedCount={track.recentlyPlayedCount}
          />
        </div>
      )}
    </div>
  );
}
