import { NextResponse } from "next/server";

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const SPOTIFY_REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT =
  "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED_ENDPOINT =
  "https://api.spotify.com/v1/me/player/recently-played";

// Masayoshi Takanaka
const FAVORITE_ARTIST_ID = "2Ex4vjQ6mSh5woTlDWto6d";

async function getAccessToken() {
  const basic = Buffer.from(
    `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`,
  ).toString("base64");

  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: SPOTIFY_REFRESH_TOKEN!,
    }),
  });

  const data = await response.json();

  if (data.error) {
    console.error("Spotify token error:", data);
    throw new Error(data.error_description || data.error);
  }

  return data;
}

async function fetchFavoriteArtist(accessToken: string) {
  try {
    const res = await fetch(
      `https://api.spotify.com/v1/artists/${FAVORITE_ARTIST_ID}`,
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );

    if (res.status === 200) {
      const artist = await res.json();
      return {
        name: artist.name,
        imageUrl: artist.images?.[1]?.url || artist.images?.[0]?.url,
        url: artist.external_urls?.spotify,
        genres: artist.genres?.slice(0, 3) || [],
      };
    }
  } catch {
    // ignore
  }
  return null;
}

async function fetchArtistGenres(accessToken: string, artistId: string) {
  try {
    const res = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (res.status === 200) {
      const artist = await res.json();
      return artist.genres || [];
    }
  } catch {
    // ignore
  }
  return [];
}

async function fetchRecentlyPlayedCount(accessToken: string) {
  try {
    const res = await fetch(`${RECENTLY_PLAYED_ENDPOINT}?limit=50`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (res.status === 200) {
      const data = await res.json();
      const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
      const count =
        data.items?.filter(
          (item: any) => new Date(item.played_at).getTime() > oneDayAgo,
        ).length || 0;
      return count;
    }
  } catch {
    // ignore
  }
  return 0;
}

export async function GET() {
  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
    return NextResponse.json(
      { isPlaying: false, error: "Spotify not configured" },
      { status: 200 },
    );
  }

  try {
    const { access_token } = await getAccessToken();

    const [favoriteArtist, recentlyPlayedCount] = await Promise.all([
      fetchFavoriteArtist(access_token),
      fetchRecentlyPlayedCount(access_token),
    ]);

    const nowPlayingRes = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    if (nowPlayingRes.status === 200) {
      const data = await nowPlayingRes.json();

      if (data.is_playing && data.item) {
        const artistId = data.item.artists?.[0]?.id;
        const genres = artistId
          ? await fetchArtistGenres(access_token, artistId)
          : [];

        const topGenre = genres.length > 0 ? genres[0] : null;

        return NextResponse.json({
          isPlaying: true,
          title: data.item.name,
          artist: data.item.artists
            .map((a: { name: string }) => a.name)
            .join(", "),
          album: data.item.album.name,
          albumImageUrl: data.item.album.images[0]?.url,
          songUrl: data.item.external_urls.spotify,
          progressMs: data.progress_ms || 0,
          durationMs: data.item.duration_ms || 0,
          genres: genres.slice(0, 3),
          favoriteArtist,
          topGenre,
          recentlyPlayedCount,
        });
      }
    }

    const recentRes = await fetch(`${RECENTLY_PLAYED_ENDPOINT}?limit=1`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    if (recentRes.status === 200) {
      const data = await recentRes.json();
      const track = data.items?.[0]?.track;

      if (track) {
        const artistId = track.artists?.[0]?.id;
        const genres = artistId
          ? await fetchArtistGenres(access_token, artistId)
          : [];

        const topGenre = genres.length > 0 ? genres[0] : null;

        return NextResponse.json({
          isPlaying: false,
          title: track.name,
          artist: track.artists.map((a: { name: string }) => a.name).join(", "),
          album: track.album.name,
          albumImageUrl: track.album.images[0]?.url,
          songUrl: track.external_urls.spotify,
          progressMs: 0,
          durationMs: track.duration_ms || 0,
          genres: genres.slice(0, 3),
          favoriteArtist,
          topGenre,
          recentlyPlayedCount,
        });
      }
    }

    return NextResponse.json({
      isPlaying: false,
      favoriteArtist,
      topGenre: null,
      recentlyPlayedCount,
    });
  } catch (error) {
    console.error("Spotify API error:", error);
    return NextResponse.json(
      { isPlaying: false, error: "Failed to fetch" },
      { status: 200 },
    );
  }
}
