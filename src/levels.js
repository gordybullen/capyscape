const levels = {
  1: {
    numFarmers: 1,
    farmerSpeedMultiplier: 1,
    numBushes: 0,
    corndogsAdded: 0,
    menuTitle:
      "You made it out of this pasture, but the farmers are still looking for you!",
    menuText:
      "Hint: Farmers love corndogs. Make sure to place strategic corndogs to slow a farmer in his tracks!",
  },
  2: {
    numFarmers: 2,
    farmerSpeedMultiplier: 1.5,
    numBushes: 2,
    corndogsAdded: 3,
    menuTitle: "You made it out of this pasture, but the farmers are still looking for you!",
    menuText:
      "Hint: Farmers love corndogs. Make sure to place strategic corndogs to slow a farmer in his tracks",
  },
  3: {
    numFarmers: 3,
    farmerSpeedMultiplier: 1.75,
    numBushes: 3,
    corndogsAdded: 1,
    menuTitle: "Watch out, Farmer Ats' is gathering his friends!",
    menuText:
      "Hint: Try not get stuck in corner! Give yourself some escape routes.",
  },
};

export default levels;
