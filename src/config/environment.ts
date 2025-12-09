export type TimePreset = "dawn" | "city" | "sunset" | "night";

export interface EnvConfig {
  preset: TimePreset;
  sunIntensity: number;
  sunPosition: [number, number, number];
  envIntensity: number;
  ambientIntensity: number;
}

export const getEnvironmentConfig = (date: Date = new Date()): EnvConfig => {
  const hour = date.getHours();

  // night (21:00 - 05:00)
  if (hour >= 21 || hour < 5) {
    return {
      preset: "night",
      sunIntensity: 0.4,
      sunPosition: [4, 10, -6],
      envIntensity: 0.5,
      ambientIntensity: 0.1,
    };
  }

  // dawn (05:00 - 09:00)
  if (hour >= 5 && hour < 9) {
    return {
      preset: "dawn",
      sunIntensity: 0.7,
      sunPosition: [10, 2, 0],
      envIntensity: 0.1,
      ambientIntensity: 0.4,
    };
  }

  // sunset (18:00 - 21:00)
  if (hour >= 18 && hour < 21) {
    return {
      preset: "sunset",
      sunIntensity: 0.9,
      sunPosition: [-10, 2, 0],
      envIntensity: 0.5,
      ambientIntensity: 0.4,
    };
  }

  // day (09:00 - 18:00)
  return {
    preset: "city",
    sunIntensity: 1.2,
    sunPosition: [4, 10, 6],
    envIntensity: 0.6,
    ambientIntensity: 0.5,
  };
};
