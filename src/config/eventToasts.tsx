import {
  Gift, Heart, Egg, Flame, Ghost, Flag, Snowflake, Cake, Donut,
  PartyPopper, CalendarDays, Flower2, Utensils
} from "lucide-react";

export type ToastPalette = {
  bg: string;
  text: string;
  border: string;
  muted: string;
}

export type EventToastConfig = {
  title: string;
  description: string;
  icon: React.ReactNode;
  palette: {
    light: ToastPalette;
    dark: ToastPalette;
  }
};

const DEFAULT_PALETTE = {
  light: { bg: "#ffffff", text: "#09090b", border: "#e4e4e7", muted: "#71717a" },
  dark: { bg: "#020817", text: "#f8fafc", border: "#1e293b", muted: "#94a3b8" }
};

export const EVENT_TOASTS: Record<string, EventToastConfig> = {
  "SANTA": {
    title: "Ho Ho Ho!",
    description: "Santa Claus is visiting! Were you nice this year?",
    icon: <Gift className="h-5 w-5 text-red-600 dark:text-red-400" />,
    palette: {
      light: { bg: "#fef2f2", text: "#991b1b", border: "#fecaca", muted: "#b91c1c" },
      dark: { bg: "#450a0a", text: "#fef2f2", border: "#7f1d1d", muted: "#fecaca" }
    }
  },
  "CHRISTMAS": {
    title: "Merry Christmas!",
    description: "Enjoy the festive atmosphere and the decorated tree!",
    icon: <Snowflake className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
    palette: {
      light: { bg: "#eff6ff", text: "#1e3a8a", border: "#bfdbfe", muted: "#2563eb" },
      dark: { bg: "#172554", text: "#eff6ff", border: "#1e40af", muted: "#bfdbfe" }
    }
  },
  "NEW_YEAR": {
    title: "Happy New Year!",
    description: "Let's celebrate with champagne and fireworks!",
    icon: <PartyPopper className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />,
    palette: {
      light: { bg: "#fefce8", text: "#854d0e", border: "#fef08a", muted: "#a16207" },
      dark: { bg: "#422006", text: "#fefce8", border: "#a16207", muted: "#fef08a" }
    }
  },
  "BIRTHDAY": {
    title: "Happy Birthday To Me!",
    description: "It's a special day for me! Enjoy the cake!",
    icon: <Cake className="h-5 w-5 text-pink-500" />,
    palette: {
      light: { bg: "#fdf2f8", text: "#be185d", border: "#fbcfe8", muted: "#db2777" },
      dark: { bg: "#500724", text: "#fdf2f8", border: "#9d174d", muted: "#fbcfe8" }
    }
  },
  "VALENTINES": {
    title: "Happy Valentine's Day!",
    description: "Love is in the air. Enjoy the romantic mood.",
    icon: <Heart className="h-5 w-5 text-rose-500" />,
    palette: {
      light: { bg: "#fff1f2", text: "#be123c", border: "#fda4af", muted: "#e11d48" },
      dark: { bg: "#4c0519", text: "#fff1f2", border: "#9f1239", muted: "#fda4af" }
    }
  },
  "FAT_THURSDAY": {
    title: "It's Fat Thursday!",
    description: "Time to eat some delicious donuts! 🍩",
    icon: <Donut className="h-5 w-5 text-orange-500" />,
    palette: {
      light: { bg: "#fff7ed", text: "#9a3412", border: "#fed7aa", muted: "#ea580c" },
      dark: { bg: "#431407", text: "#fff7ed", border: "#9a3412", muted: "#fed7aa" }
    }
  },
  "WOMENS_DAY": {
    title: "Happy Women's Day!",
    description: "Best wishes and beautiful tulips for every lady!",
    icon: <Flower2 className="h-5 w-5 text-red-400" />,
    palette: {
      light: { bg: "#fff1f2", text: "#be123c", border: "#fda4af", muted: "#e11d48" },
      dark: { bg: "#4c0519", text: "#fff1f2", border: "#9f1239", muted: "#fda4af" }
    }
  },
  "EASTER": {
    title: "Happy Easter!",
    description: "Look for colorful eggs hidden around!",
    icon: <Egg className="h-5 w-5 text-green-500" />,
    palette: {
      light: { bg: "#f0fdf4", text: "#15803d", border: "#86efac", muted: "#16a34a" },
      dark: { bg: "#052e16", text: "#f0fdf4", border: "#14532d", muted: "#86efac" }
    }
  },
  "MAY_DAY": {
    title: "Happy Long Weekend!",
    description: "It\'s Majówka time! Enjoy the grill and the vibes!",
    icon: <Flame className="h-5 w-5 text-orange-600" />,
    palette: {
      light: { bg: "#fff7ed", text: "#c2410c", border: "#fdba74", muted: "#ea580c" },
      dark: { bg: "#431407", text: "#fff7ed", border: "#9a3412", muted: "#fdba74" }
    }
  },
  "HALLOWEEN": {
    title: "Spooky Halloween!",
    description: "Watch out for ghosts and pumpkins! 🎃",
    icon: <Ghost className="h-5 w-5 text-orange-600 dark:text-orange-400" />,
    palette: {
      light: { bg: "#fff7ed", text: "#7c2d12", border: "#fed7aa", muted: "#ea580c" },
      dark: { bg: "#431407", text: "#fff7ed", border: "#9a3412", muted: "#fdba74" }
    }
  },
  "INDEPENDENCE": {
    title: "Poland Independence Day",
    description: "Celebrating freedom with white and red accents.",
    icon: <Flag className="h-5 w-5 text-red-600" />,
    palette: {
      light: { bg: "#fff1f2", text: "#be123c", border: "#fda4af", muted: "#e11d48" },
      dark: { bg: "#4c0519", text: "#fff1f2", border: "#9f1239", muted: "#fda4af" }
    }
  },
};
