const crucible = [
    "crucible",
    //Game Modes
    "breakthrough",
    "clash",
    "control",
    "countdown",
    "elimination",
    "lockdown",
    "mayhem",
    "momentum Control",
    "rumble",
    "scorched",
    "survival",
    "trials of Osiris",
];
const destinations = [
    "edz",
    "cosmodrome",
    "nessus",
    "dreaming city",
    "throne world",
    "europa",
    "derelict leviathan",
];
const playlists = [
    "vanguard",
    "dares of eternity",
    "empire hunt",
    "lost sector",
    "gambit",
];
const enemies = [
    "guardians",
    "opponents",
    "targets",
    "fallen",
    "cabal",
    "scorn",
    "hive",
    "taken",
];
const damageTypes = [
    "arc",
    "solar",
    "void",
    "stasis",
    "grenade",
    "meele",
    "super",
    "finisher",
    "precision",
];
const weapons = [
    //Primary
    "auto rifle",
    "bow",
    "handcannon",
    "pulse rifle",
    "scout rifle",
    "sidearm",
    "submachine gun",
    //Special
    "fusion rifle",
    "shotgun",
    "sniper rifle",
    "trace rifle",
    "glaive",
    //Heavy
    "grenade launcher",
    "linear fusion rifle",
    "machine gun",
    "rocket launcher",
    "sword",
];

export default [
    ...destinations,
    ...playlists,
    ...damageTypes,
    ...enemies,
    ...crucible,
    ...weapons,
];

export const duplicateTags = {
    grenade: "grenade launcher",
    sniper: "sniper rifle", //in some cases only sniper is used
};
