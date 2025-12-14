export const NODE_GROUPS = {
  // constant elements
  BONSAI: ["bonsai_pot", "bonsai_soil", "bonsai_trunk", "bonsai_leaves"],

  // events
  SANTA: ["mikolaj_hat"],
  CHRISTMAS: ["choinka", "choinka_star"],
  NEW_YEAR: ["sylwester_whistle", "sylwester_fireworks"],
  BIRTHDAY: ["urodziny_hat", "cake"],
  VALENTINES: ["walentynki_heart"],
  FAT_THURSDAY: ["donuts"],
  WOMENS_DAY: ["flowers"],
  EASTER: ["wielkanoc_basket"],
  MAY_DAY: ["majowka"],
  HALLOWEEN: ["halloween_pumpkin"],
  INDEPENDENCE: ["polish_flag"],
};

export const isNodeInGroup = (nodeName: string, groupKeys: string[]) => {
  return groupKeys.some((key) => nodeName.startsWith(key));
};
