const defaultUsernames = [
    "SpiceMaverick", "ChefWhiskers", "SizzleWiz", "SaltBaeWannabe", "PanFlipperPro",
    "GarlicGuru", "TasteTornado", "FryingNinja", "LadleLegend", "BasilBandit",
    "DoughDaredevil", "TheSauceBoss", "VeggieVanquisher", "CrispyCraver", "SautéSultan",
    "ChopChopChamp", "GravyGiggles", "OmeletteOverlord", "SpiceSprinkler", "PepperPirate",
    "ButterBandit", "WhiskWarrior", "FlavorFanatic", "StirFrySensei", "GriddleGuru",
    "BBQBuff", "NoodleNinja", "MeatballMaster", "SaladSorcerer", "TheGravyTrain",
    "DoughDominator", "KitchenWhiz", "WokWizard", "EggcellentChef", "CaramelConqueror",
    "FlambéFiend", "HerbHero", "SauceSlayer", "TaterTamer", "PestoPirate",
    "CurryCommander", "ToastTitan", "RollingPinRogue", "ChilliChiller", "OvenObsession",
    "GrillGuardian", "ForkFiesta", "YumYumYeti", "BrunchBandit", "PepperPrince",
    "PastryPilot", "SpoonfulSorcery", "OvenOverlord", "ToastTyrant", "SpiceSprout",
    "MixMasterChef", "TheFlavourFreak", "GravyGoblin", "ChopsterChef", "DoughDisaster",
    "SugarSlinger", "FryFanatic", "SnackSorcerer", "SkilletShaman", "NoodleNibbler",
    "SimmerSensei", "PancakePirate", "QuirkyQuiche", "OvenOperator", "ButterBuffet",
    "TastyTwister", "MunchMaster", "ButterballBoss", "ForkFlirt", "ChopstickChampion",
    "BasilBeast", "GrillGhoul", "PuddingPirate", "ToastedTitan", "SpatulaSamurai",
    "ChefSnackAttack", "GarlicGoblin", "OmeletOracle", "HerbHavoc", "PanPerfectionist",
    "SaladSmuggler", "Grillzilla", "RoastRascal", "WaffleWarlord", "CulinaryCrusher",
    "SauceSlinger", "HungryHustler", "FlavorFreak", "GarnishGoddess", "KebabKing",
    "ChefKaleidoscope", "FoodieFrenzy", "SimmerSavvy", "FlavorFool", "TheMunchMystic"
];

const pickRandomUserName = (): string => {
    return defaultUsernames[Math.floor(Math.random() * defaultUsernames.length)];
}

export default pickRandomUserName;