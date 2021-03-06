const cDSA = {}

cDSA.statusEffects = [{
		id: "prone",
		label: "CONDITION.prone",
		icon: "icons/svg/falling.svg",
		description: "CONDITIONDESCRIPTION.prone",
		flags: {
			cDSA: {
				"value": null,
				"editable": true,
				"impact": null
			}
		}
	},
	{
		id: "unconscious",
		label: "CONDITION.unconscious",
		icon: "icons/svg/unconscious.svg",
		description: "CONDITIONDESCRIPTION.unconscious",
		flags: {
			cDSA: {
				"value": null,
				"editable": true,
				"impact": null
			}
		}
	},
	{
		id: "rooted",
		label: "CONDITION.rooted",
		icon: "icons/svg/net.svg",
		description: "CONDITIONDESCRIPTION.rooted",
		flags: {
			cDSA: {
				"value": null,
				"editable": true,
				"impact": null
			}
		}
	},
	{
		id: "fixated",
		label: "CONDITION.fixated",
		icon: "icons/svg/padlock.svg",
		description: "CONDITIONDESCRIPTION.fixated",
		flags: {
			cDSA: {
				"value": null,
				"editable": true,
				"impact": null
			}
		}
	},
	{
		id: "surprised",
		label: "CONDITION.surprised",
		icon: "icons/svg/hazard.svg",
		description: "CONDITIONDESCRIPTION.surprised",
		flags: {
			cDSA: {
				"value": null,
				"editable": true,
				"impact": null
			}
		}
	},
	{
		id: "blind",
		label: "CONDITION.blind",
		icon: "icons/svg/blind.svg",
		description: "CONDITIONDESCRIPTION.blind",
		flags: {
			cDSA: {
				"value": null,
				"editable": true,
				"impact": null
			}
		}
	},
	{
		id: "poisoned",
		label: "CONDITION.poisoned",
		icon: "icons/svg/poison.svg",
		description: "CONDITIONDESCRIPTION.poisoned",
		flags: {
			cDSA: {
				"value": null,
				"editable": true,
				"impact": null
			}
		}
	},
	{
		id: "sick",
		label: "CONDITION.sick",
		icon: "icons/svg/biohazard.svg",
		description: "CONDITIONDESCRIPTION.sick",
		flags: {
			cDSA: {
				"value": null,
				"editable": true,
				"impact": null
			}
		}
	},
	{
		id: "deaf",
		label: "CONDITION.deaf",
		icon: "icons/svg/deaf.svg",
		description: "CONDITIONDESCRIPTION.deaf",
		flags: {
			cDSA: {
				"value": null,
				"editable": true,
				"impact": null
			}
		}
	},
	{
		id: "burning",
		label: "CONDITION.burning",
		icon: "icons/svg/fire.svg",
		description: "CONDITIONDESCRIPTION.burning",
		flags: {
			cDSA: {
				"value": null,
				"editable": true,
				"impact": null
			}
		}
	},
	{
		id: "invisible",
		label: "CONDITION.invisible",
		icon: "icons/svg/circle.svg",
		description: "CONDITIONDESCRIPTION.invisible",
		flags: {
			cDSA: {
				"value": null,
				"editable": true,
				"impact": null
			}
		}
	},
	{
		id: "constricted",
		label: "CONDITION.constricted",
		icon: "icons/svg/cave.svg",
		description: "CONDITIONDESCRIPTION.constricted",
		flags: {
			cDSA: {
				"value": null,
				"editable": true,
				"impact": null
			}
		}
	},
	{
		id: "bloodrush",
		label: "CONDITION.bloodrush",
		icon: "icons/svg/bones.svg",
		description: "CONDITIONDESCRIPTION.bloodrush",
		flags: {
			cDSA: {
				"value": null,
				"editable": true,
				"impact": null
			}
		}
	},
	{
		id: "mute",
		label: "CONDITION.mute",
		icon: "icons/svg/silenced.svg",
		description: "CONDITIONDESCRIPTION.mute",
		flags: {
			cDSA: {
				"value": null,
				"editable": true,
				"impact": null
			}
		}
	},
	{
		id: "incapacitated",
		label: "CONDITION.incapacitated",
		icon: "icons/svg/sleep.svg",
		description: "CONDITIONDESCRIPTION.incapacitated",
		flags: {
			cDSA: {
				"value": null,
				"editable": true,
				"impact": null
			}
		}
	},
	{
		id: "encumbered",
		label: "CONDITION.encumbered",
		icon: "icons/svg/anchor.svg",
		description: "CONDITIONDESCRIPTION.encumbered",
		flags: {
			cDSA: {
				"value": 1,
				"editable": false,
				"impact": "-1",
				"max": 4
			}
		}
	},
	{
		id: "stunned",
		label: "CONDITION.stunned",
		icon: "icons/svg/daze.svg",
		description: "CONDITIONDESCRIPTION.stunned",
		flags: {
			cDSA: {
				"value": 1,
				"editable": true,
				"impact": "-1",
				"max": 4
			}
		}
	},
	{
		id: "raptured",
		label: "CONDITION.raptured",
		icon: "icons/svg/ice-aura.svg",
		description: "CONDITIONDESCRIPTION.raptured",
		flags: {
			cDSA: {
				"value": 1,
				"editable": true,
				"impact": "-1",
				"max": 4
			}
		}
	},
	{
		id: "feared",
		label: "CONDITION.feared",
		icon: "icons/svg/terror.svg",
		description: "CONDITIONDESCRIPTION.feared",
		flags: {
			cDSA: {
				"value": 1,
				"editable": true,
				"impact": "-1",
				"max": 4
			}
		}
	},
	{
		id: "paralysed",
		label: "CONDITION.paralysed",
		icon: "icons/svg/paralysis.svg",
		description: "CONDITIONDESCRIPTION.paralysed",
		flags: {
			cDSA: {
				"value": 1,
				"editable": true,
				"impact": "-1",
				"max": 4
			}
		}
	},
	{
		id: "inpain",
		label: "CONDITION.inpain",
		icon: "icons/svg/blood.svg",
		description: "CONDITIONDESCRIPTION.inpain",
		flags: {
			cDSA: {
				"value": 1,
				"editable": true,
				"impact": "-1",
				"max": 4
			}
		}
	},
	{
		id: "confused",
		label: "CONDITION.confused",
		icon: "icons/svg/stoned.svg",
		description: "CONDITIONDESCRIPTION.confused",
		flags: {
			cDSA: {
				"value": 1,
				"editable": true,
				"impact": "-1",
				"max": 4
			}
		}
	}

]


cDSA.effectTextStyle = CONFIG.canvasTextStyle.clone();
cDSA.effectTextStyle.fontSize = "30";
cDSA.effectTextStyle.fontFamily = "GentiumBasic"

cDSA.knownShortcuts = {}

cDSA.defaultWeapon = {
	name: "default",
	type: "meleeweapon",
	data: {
		data: {
			reach: {
				value: "short"
			},
			damage: {
				value: "1d6"
			},
			atmod: {
				value: 0,
				offHandMod: 0
			},
			pamod: {
				value: 0,
				offHandMod: 0
			},
			guidevalue: {
				value: "ge/kk"
			},
			damageThreshold: {
				value: "5000"
			},
			worn: {
				offhand: false
			}
		}
	}
}

cDSA.characteristics = {
	"mu": "CHAR.MU",
	"kl": "CHAR.KL",
	"in": "CHAR.IN",
	"ch": "CHAR.CH",
	"ff": "CHAR.FF",
	"ge": "CHAR.GE",
	"ko": "CHAR.KO",
	"kk": "CHAR.KK"
};

cDSA.equipmentTypes = {
	"misc": "Equipment.misc",
	"clothes": "Equipment.clothes",
	"tools": "Equipment.tools",
	"light": "Equipment.light",
	"healing": "Equipment.healing",
	"bags": "Equipment.bags",
	"wealth": "Equipment.wealth",
	"writing": "Equipment.writing",
	"alchemy": "Equipment.alchemy",
	"service": "Equipment.service",
	"luxus": "Equipment.luxus",
	"blessed": "Equipment.blessed"
};

cDSA.narrowSpaceModifiers = {
	"weaponshort": {
		"attack": 0,
		"parry": 0,
		"label": "NarrowSpaceModifiers.weapon.short"
	},
	"weaponmedium": {
		"attack": -4,
		"parry": -4,
		"label": "NarrowSpaceModifiers.weapon.medium"
	},
	"weaponlong": {
		"attack": -8,
		"parry": -8,
		"label": "NarrowSpaceModifiers.weapon.long"
	},
	"shieldshort": {
		"attack": -2,
		"parry": -2,
		"label": "NarrowSpaceModifiers.shield.short"
	},
	"shieldmedium": {
		"attack": -4,
		"parry": -3,
		"label": "NarrowSpaceModifiers.shield.medium"
	},
	"shieldlong": {
		"attack": -6,
		"parry": -4,
		"label": "NarrowSpaceModifiers.shield.long"
	}
}

cDSA.moneyNames = {
	"D": "Money-D",
	"S": "Money-S",
	"H": "Money-H",
	"K": "Money-K"
}

cDSA.rangeMods = {
	"short": {
		"damage": 1,
		"attack": 2
	},
	"medium": {
		"damage": 0,
		"attack": 0
	},
	"long": {
		"damage": -1,
		"attack": -2
	},
	"rangesense": {
		"damage": -1,
		"attack": -1
	}
}

cDSA.regnerationCampLocations = {
	"0": "regnerationCampLocations.normal",
	"-1": "regnerationCampLocations.bad",
	"1": "regnerationCampLocations.good"
}

cDSA.regenerationInterruptOptions = {
	"0": "regenerationInterruptOptions.none",
	"-1": "regenerationInterruptOptions.small",
	"-2": "regenerationInterruptOptions.big"
}

cDSA.targetMomevementOptions = {
	"0": "rangeMovementOptions.SLOW",
	"-2": "rangeMovementOptions.FAST",
	"2": "rangeMovementOptions.STATIONARY",
}

cDSA.shooterMovementOptions = {
	"0": "rangeMovementOptions.SHOOTERSTATIONARY",
	"-2": "rangeMovementOptions.SHOOTERMOVING",
	"-4": "rangeMovementOptions.SHOOTERRUNNING"
}

cDSA.mountedRangeOptions = {
	"0": "mountedRangeOptions.STATIONARY",
	"-4": "mountedRangeOptions.SCHRITT",
	"-8": "mountedRangeOptions.GALOPP",
}
cDSA.aimOptions = {
	"0": "aimOptions.0",
	"2": "aimOptions.1",
	"4": "aimOptions.2"
}

cDSA.traitCategories = {
	"meleeAttack": "closeCombatAttacks",
	"rangeAttack": "rangeCombatAttacks",
	"armor": "armor",
	"general": "general",
	"familiar": "familiar"
}

cDSA.ritualLocationModifiers = {
	"-": 0,
	"RITUALMODIFIER.holysite": 1,
	"RITUALMODIFIER.wrongsite": -3
}

cDSA.ritualTimeModifiers = {
	"-": 0,
	"RITUALMODIFIER.matchingConstellation": 1,
	"RITUALMODIFIER.wrongConstellation": -1
}

cDSA.ceremonyLocationModifiers = {
	"-": 0,
	"CEREMONYMODIFIER.holysite": 2,
	"CEREMONYMODIFIER.temple": 1,
	"CEREMONYMODIFIER.otherTemple": -1,
	"CEREMONYMODIFIER.enemyGod": -2,
	"CEREMONYMODIFIER.archDemon": -3,
	"CEREMONYMODIFIER.nameless": -4,
	"CEREMONYMODIFIER.nemesis": -5
}

cDSA.advancementCosts = {
	"A": [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
	"B": [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28],
	"C": [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42],
	"D": [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56],
	"E": [15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180],
}

cDSA.hooks = {}

cDSA.startXP = {
	"900": "EXP.inexperienced",
	"1000": "EXP.average",
	"1100": "EXP.experienced",
	"1200": "EXP.competent",
	"1400": "EXP.masterful",
	"1700": "EXP.brillant",
	"2100": "EXP.legendary"
}

cDSA.helpContent = [{
		name: "pay",
		command: "/pay [0-9]+",
		example: "/pay 5.03",
	}, {
		name: "getPaid",
		command: "/getPaid [0-9]+",
		example: "/getPaid 5.03",
	},
	{
		name: "quickAbility",
		command: "/sk [a-z]*, /sp [a-z]*, /li [a-z]*, /at [a-z]*, /pa [a-z]*",
		example: "/sk betören",
	},
	{
		name: "conditions",
		command: "/conditions",
		example: "/conditions"
	},
	{
		name: "tables",
		command: "/tables",
		example: "/tables"
	},
	{
		name: "request",
		command: "/rq",
		example: "/rq betören"
	}
]

cDSA.ceremonyTimeModifiers = {
	"-": 0,
	"CEREMONYMODIFIER.monthGod": 1,
	"CEREMONYMODIFIER.celebration": 2,
	"CEREMONYMODIFIER.namelessDays": -5
}

cDSA.mageLevels = {
	"mundane": "mundane",
	"clerical": "clerical",
	"magical": "magical"
}

cDSA.specialAbilityCategories = {
	"general": "general",
	"Combat": "Combat",
	"fatePoints": "fatePoints",
	"magical": "magical",
	"clerical": "clerical",
	"language": "language",
	"animal": "animal",
	"staff": "traditionArtifact"
}

cDSA.dieColors = {
	"dodge": "ge"
}

cDSA.addvantageRules = {}
cDSA.removevantageRules = {}
cDSA.vantagesNeedingAdaption = {}

cDSA.addAbilityRules = {}
cDSA.removeAbilityRules = {}
cDSA.AbilitiesNeedingAdaption = {}

cDSA.rangeWeaponModifiers = {
	"short": "RangeMod.short",
	"medium": "RangeMod.medium",
	"long": "RangeMod.long",
	"rangesense": "RangeMod.rangesense"
}

cDSA.meleeRangesArray = [
	"short",
	"medium",
	"long"
]

cDSA.meleeRanges = {
	"short": "Range-short",
	"medium": "Range-medium",
	"long": "Range-long"
};

cDSA.weapontypes = {
	"melee": "meleeweapon",
	"range": "rangeweapon"
}

cDSA.ammunitiongroups = {
	"-": "-",
	"arrow": "arrow",
	"bolt": "bolt",
	"bullet": "bullet",
	"stone": "stone",
	"dart": "dart"
}

cDSA.combatskillsGuidevalues = {
	"ff": "CHAR.FF",
	"ge": "CHAR.GE",
	"kk": "CHAR.KK",
	"ge/kk": "CHAR.GEKK"
}

cDSA.skillDifficultyModifiers = {
	"eeasy": 5,
	"veasy": 3,
	"easy": 1,
	"challenging": 0,
	"difficult": -1,
	"hard": -3,
	"vhard": -5
}

cDSA.magicResistanceModifiers = {
	"-": "-",
	"SK": "soulpower",
	"ZK": "toughness"
}

cDSA.sizeCategories = {
	"tiny": "SIZE.tiny",
	"small": "SIZE.small",
	"average": "SIZE.average",
	"big": "SIZE.big",
	"giant": "SIZE.giant"
}

cDSA.tokenSizeCategories = {
	"tiny": 0.5,
	"small": 0.8,
	"average": 1,
	"big": 2,
	"giant": 4
}

cDSA.rangeSizeCategories = {
	"tiny": "RANGESIZE.tiny",
	"small": "RANGESIZE.small",
	"average": "RANGESIZE.average",
	"big": "RANGESIZE.big",
	"giant": "RANGESIZE.giant"
}

cDSA.shieldSizes = {
	"short": "SIZE.small",
	"medium": "SIZE.average",
	"long": "SIZE.big"
}

cDSA.rangeSizeModifier = {
	"tiny": -8,
	"small": -4,
	"average": 0,
	"big": 4,
	"giant": 8
}

cDSA.rangeVision = {
	"0": "VisionDisruption.step0",
	"-2": "VisionDisruption.step1",
	"-4": "VisionDisruption.step2",
	"-6": "VisionDisruption.step3",
	"-5000": "VisionDisruption.step4"
}


cDSA.attributeDifficultyModifiers = {
	"eeasy": 6,
	"veasy": 4,
	"easy": 2,
	"challenging": 0,
	"difficult": -2,
	"hard": -4,
	"vhard": -6
}

cDSA.skillDifficultyLabels = {
	"eeasy": "Skill-eeasy",
	"veasy": "Skill-veasy",
	"easy": "Skill-easy",
	"challenging": "Skill-challenging",
	"difficult": "Skill-difficult",
	"hard": "Skill-hard",
	"vhard": "Skill-vhard"
}

cDSA.attributeDifficultyLabels = {
	"eeasy": "Attribute-eeasy",
	"veasy": "Attribute-veasy",
	"easy": "Attribute-easy",
	"challenging": "Attribute-challenging",
	"difficult": "Attribute-difficult",
	"hard": "Attribute-hard",
	"vhard": "Attribute-vhard"
}

cDSA.skillGroups = {
	"body": "SKILL.body",
	"social": "SKILL.social",
	"knowledge": "SKILL.knowledge",
	"trade": "SKILL.trade",
	"nature": "SKILL.nature"
};

cDSA.skillBurdens = {
	"yes": "yes",
	"no": "no",
	"maybe": "maybe"
}

cDSA.StFs = {
	"A": "A",
	"B": "B",
	"C": "C",
	"D": "D"
}

export default cDSA