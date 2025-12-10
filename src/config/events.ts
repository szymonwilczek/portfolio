export type EventType = {
  id: string;
  name: string;
  start: { m: number; d: number };
  end: { m: number; d: number };
};

export const DEFAULT_EVENT = "NONE";

export const EVENTS: EventType[] = [
  // 8.01
  {
    id: "BIRTHDAY",
    name: "Urodziny",
    start: { m: 1, d: 8 },
    end: { m: 1, d: 8 },
  },

  // 2025: 27.02
  {
    id: "FAT_THURSDAY",
    name: "Tłusty Czwartek",
    start: { m: 2, d: 27 },
    end: { m: 2, d: 27 },
  },

  // 14.02
  {
    id: "VALENTINES",
    name: "Walentynki",
    start: { m: 2, d: 14 },
    end: { m: 2, d: 14 },
  },

  // 8.03
  {
    id: "WOMENS_DAY",
    name: "Dzień Kobiet",
    start: { m: 3, d: 8 },
    end: { m: 3, d: 8 },
  },

  // 19-21.04
  {
    id: "EASTER",
    name: "Wielkanoc",
    start: { m: 4, d: 19 },
    end: { m: 4, d: 21 },
  },

  // 1-3.05
  {
    id: "MAY_DAY",
    name: "Majówka",
    start: { m: 5, d: 1 },
    end: { m: 5, d: 3 },
  },

  // 30-31.10
  {
    id: "HALLOWEEN",
    name: "Halloween",
    start: { m: 10, d: 30 },
    end: { m: 10, d: 31 },
  },

  // 2.11
  {
    id: "ALL_SAINTS",
    name: "Zaduszki",
    start: { m: 11, d: 2 },
    end: { m: 11, d: 2 },
  },

  // 11.11
  {
    id: "INDEPENDENCE",
    name: "Niepodległość",
    start: { m: 11, d: 11 },
    end: { m: 11, d: 11 },
  },

  // 6.12
  {
    id: "SANTA",
    name: "Mikołajki",
    start: { m: 12, d: 6 },
    end: { m: 12, d: 6 },
  },

  // 10-24.12
  {
    id: "CHRISTMAS",
    name: "Święta",
    start: { m: 12, d: 10 },
    end: { m: 12, d: 24 },
  },

  // 31.12 - 2.01
  {
    id: "NEW_YEAR",
    name: "Sylwester",
    start: { m: 12, d: 31 },
    end: { m: 12, d: 31 },
  },
  {
    id: "NEW_YEAR",
    name: "Nowy Rok",
    start: { m: 1, d: 1 },
    end: { m: 1, d: 2 },
  },
];

export const getActiveEvent = (date: Date = new Date()): string => {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const found = EVENTS.find(
    (e) =>
      month === e.start.m &&
      day >= e.start.d &&
      month === e.end.m &&
      day <= e.end.d,
  );

  return found ? found.id : DEFAULT_EVENT;
};

export const getBonsaiSeason = (date: Date = new Date()) => {
  const month = date.getMonth() + 1;
  if (month >= 3 && month <= 5) return "SPRING";
  if (month >= 6 && month <= 8) return "SUMMER";
  if (month >= 9 && month <= 11) return "AUTUMN";
  return "WINTER";
};
