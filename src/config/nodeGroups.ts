export const NODE_GROUPS = {
  // constant elements
  BONSAI: ["bonsai_pot", "bonsai_soil", "bonsai_trunk", "bonsai_leaves"],
  DEFAULT_GLASSES: [
    "glasses_l_frame",
    "glasses_r_frame",
    "glasses_bridge",
    "glasses_r_arm",
    "glasses_l_arm",
  ],

  // events
  SANTA: ["mikolaj_hat", "Cube015"],

  CHRISTMAS: [
    "choinka",
    "choinka_pot",
    "choinka_star",
    "choinka_bombki",
    "Cube049",
    "Cube067",
  ],

  NEW_YEAR: [
    "sylwester_glasses",
    "sylwester_whistle",
    "sylwester_fireworks",
    "sylwester_fireworks_box",
    "Cube173",
    "Cube396",
    "Cube389",
  ],

  BIRTHDAY: ["urodziny_hat", "Cube539"],

  VALENTINES: ["walentynki_heart"],

  FAT_THURSDAY: ["czwartek_donuty", "czwartek_plate", "Cube1153"],

  WOMENS_DAY: ["flower_", "flowers_", "Cube1560", "Cube1591", "Cube1522"],

  EASTER: [
    "wielkanoc_basket",
    "wielkanoc_grass",
    "wielkanoc_eggs",
    "Cube1873",
    "Cube1890",
  ],

  MAY_DAY: ["majowka_", "Cube1951", "Cube1961", "Cube1977", "Cube1982"],

  HALLOWEEN: ["halloween_pumpkin", "halloween_jack", "Cube010"],

  INDEPENDENCE: ["polish_flag", "Cube139"],
};

export const isNodeInGroup = (nodeName: string, groupKeys: string[]) => {
  return groupKeys.some((key) => nodeName.startsWith(key));
};
