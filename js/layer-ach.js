addLayer("achlayer small", {// Add a * small* to generate a slightly different layer
    name: "sideLayerach",
    position: -1,
    row: 100,
    symbol() {return (options.ch || modInfo.languageMod==false) ? '↓ 成就 ↓' : '↓ layer 1 ↓'},
    symbolEN() {return (options.ch || modInfo.languageMod==false) ? '↓ 成就 ↓' : '↓ layer 1 ↓'},
    nodeStyle: {"font-size": "15px", "text-center": "center", "height": "30px"},
    startData() { return {
        unlocked: true,
        small: true,
        points: new Decimal(0),// This actually does nothing, but you have to write this. (Unless you want add something in this layer. #Todo, might change that later.)
    }},
    color: "#fefefe",
    type: "none",
    tooltip(){return false},
    layerShown(){return layerDisplayTotal(['A'])},// If any layer in the array is unlocked, it will returns true. Otherwise it will return false.
	tabFormat: [
        ["display-text", function() { return getPointsDisplay() }]
    ],
})

addLayer("A", {
    name: "Achievement", // This is optional, only used in a few places, If absent it just uses the layer id
    symbol: "成就", // This appears on the layer's node. Default is the id with the first letter capitalized
    symbolEN: "Achievement", // The second name of this appears on the layer's node ( If you open otherLanguageMod )
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#FFE125",
    requires: new Decimal(0), // Can be a function that takes requirement increases into account
    resource: "成就", // Name of prestige currency
    resourceEN: "prestige points", // The second name of prestige currency ( If you open otherLanguageMod )
    //baseResource: "逊", // Name of resource prestige is based on
    //baseResourceEN: "points", // The second name of resource prestige is based on ( If you open otherLanguageMod )
    //baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(64).pow(player.CB.points)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 100, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [],
    achievements: {
        11: {
            name: "The Start",
            tooltip:"获得 1 逊",
            done() {return player.points.gte(1)},
            onComplete() {player.A.points = player.A.points.add(1)},
        },
        12: {
            name: "10 Xuns",
            tooltip:"获得 10 逊",
            done() {return player.points.gte(10)},
            onComplete() {player.A.points = player.A.points.add(1)},
        },
        13: {
            name: "100 Xuns",
            tooltip:"获得 100 逊",
            done() {return player.points.gte(100)},
            onComplete() {player.A.points = player.A.points.add(1)},
        },
        14: {
            name: "10000 Xuns",
            tooltip:"获得 10000 逊",
            done() {return player.points.gte(10000)},
            onComplete() {player.A.points = player.A.points.add(1)},
        },
        15: {
            name: "1e6 Xuns",
            tooltip:"获得 1e6 逊",
            done() {return player.points.gte(1e6)},
            onComplete() {player.A.points = player.A.points.add(1)},
        },
        16: {
            name: "1e8 Xuns",
            tooltip:"获得 1e8 逊",
            done() {return player.points.gte(1e8)},
            onComplete() {player.A.points = player.A.points.add(1)},
        },
        17: {
            name: "1e10 Xuns",
            tooltip:"获得 1e10 逊",
            done() {return player.points.gte(1e10)},
            onComplete() {player.A.points = player.A.points.add(1)},
        },
        41: {
            name: "Passive Generation",
            tooltip:"xps达到1",
            done() {return getPointGen().gte(1)},
            onComplete() {player.A.points = player.A.points.add(1)},
        },
        42: {
            name: "10 Xuns Per Second",
            tooltip:"xps达到10",
            done() {return getPointGen().gte(10)},
            onComplete() {player.A.points = player.A.points.add(1)},
        },
        43: {
            name: "100 Xuns Per Second",
            tooltip:"xps达到100",
            done() {return getPointGen().gte(100)},
            onComplete() {player.A.points = player.A.points.add(1)},
        },
        44: {
            name: "10000 Xuns Per Second",
            tooltip:"xps达到10000",
            done() {return getPointGen().gte(10000)},
            onComplete() {player.A.points = player.A.points.add(1)},
        },
        45: {
            name: "1e6 XPS",
            tooltip:"xps达到1000000",
            done() {return getPointGen().gte(1000000)},
            onComplete() {player.A.points = player.A.points.add(1)},
        },
        46: {
            name: "1e7 XPS",
            tooltip:"xps达到10000000",
            done() {return getPointGen().gte(10000000)},
            onComplete() {player.A.points = player.A.points.add(1)},
        },
        47: {
            name: "1e8 XPS",
            tooltip:"xps达到100000000",
            done() {return getPointGen().gte(100000000)},
            onComplete() {player.A.points = player.A.points.add(1)},
        },
        71: {
            name: "10 Character 1",
            tooltip:"拥有10个角色1",
            done() {return getBuyableAmount('X', 11).gt(9)},
            onComplete() {player.A.points = player.A.points.add(1)},
        },
        72: {
            name: "50 Character 1",
            tooltip:"拥有50个角色1",
            done() {return getBuyableAmount('X', 11).gt(49)},
            onComplete() {player.A.points = player.A.points.add(1)},
        },
        73: {
            name: "100 Character 1",
            tooltip:"拥有100个角色1",
            done() {return getBuyableAmount('X', 11).gt(99)},
            onComplete() {player.A.points = player.A.points.add(1)},
        },
        81: {
            name: "10 Character 2",
            tooltip:"拥有10个角色2",
            done() {return getBuyableAmount('X', 12).gt(9)},
            onComplete() {player.A.points = player.A.points.add(1)},
        },
        82: {
            name: "50 Character 2",
            tooltip:"拥有50个角色2",
            done() {return getBuyableAmount('X', 12).gt(49)},
            onComplete() {player.A.points = player.A.points.add(1)},
        },
        83: {
            name: "100 Character 2",
            tooltip:"拥有100个角色2",
            done() {return getBuyableAmount('X', 12).gt(99)},
            onComplete() {player.A.points = player.A.points.add(1)},
        },
        91: {
            name: "10 Character 3",
            tooltip:"拥有10个角色3",
            done() {return getBuyableAmount('X', 13).gt(9)},
            onComplete() {player.A.points = player.A.points.add(1)},
        },
        92: {
            name: "50 Character 3",
            tooltip:"拥有50个角色3",
            done() {return getBuyableAmount('X', 13).gt(49)},
            onComplete() {player.A.points = player.A.points.add(1)},
        },
        93: {
            name: "100 Character 3",
            tooltip:"拥有100个角色3",
            done() {return getBuyableAmount('X', 13).gt(99)},
            onComplete() {player.A.points = player.A.points.add(1)},
        },
        101: {
            name: "10 Character 4",
            tooltip:"拥有10个角色4",
            done() {return getBuyableAmount('X', 14).gt(9)},
            onComplete() {player.A.points = player.A.points.add(1)},
        },
        102: {
            name: "50 Character 4",
            tooltip:"拥有50个角色4",
            done() {return getBuyableAmount('X', 14).gt(49)},
            onComplete() {player.A.points = player.A.points.add(1)},
        },
        111: {
            name: "10 Character 5",
            tooltip:"拥有10个角色5",
            done() {return getBuyableAmount('X', 15).gt(9)},
            onComplete() {player.A.points = player.A.points.add(1)},
        },
        112: {
            name: "50 Character 5",
            tooltip:"拥有50个角色5",
            done() {return getBuyableAmount('X', 15).gt(49)},
            onComplete() {player.A.points = player.A.points.add(1)},
        },
        121: {
            name: "10 Character 6",
            tooltip:"拥有10个角色6",
            done() {return getBuyableAmount('X', 21).gt(9)},
            onComplete() {player.A.points = player.A.points.add(1)},
        },
        131: {
            name: "10 Character 7",
            tooltip:"拥有10个角色7",
            done() {return getBuyableAmount('X', 22).gt(9)},
            onComplete() {player.A.points = player.A.points.add(1)},
        },
        141: {
            name: "10 Character 8",
            tooltip:"拥有10个角色8",
            done() {return getBuyableAmount('X', 23).gt(9)},
            onComplete() {player.A.points = player.A.points.add(1)},
        },
        151: {
            name: "10 Character 9",
            tooltip:"拥有10个角色9",
            done() {return getBuyableAmount('X', 24).gt(9)},
            onComplete() {player.A.points = player.A.points.add(1)},
        },
        161: {
            name: "10 Character 10",
            tooltip:"拥有10个角色10",
            done() {return getBuyableAmount('X', 25).gt(9)},
            onComplete() {player.A.points = player.A.points.add(1)},
        },
        321: {
            name: "A Boost",
            tooltip:"拥有1个角色提升",
            done() {return player.CB.points.gte(1)},
            onComplete() {player.A.points = player.A.points.add(1)},
        },
        322: {
            name: "Two Boosts",
            tooltip:"拥有2个角色提升",
            done() {return player.CB.points.gte(2)},
            onComplete() {player.A.points = player.A.points.add(1)},
        },
        323: {
            name: "3 Boosts",
            tooltip:"拥有3个角色提升",
            done() {return player.CB.points.gte(3)},
            onComplete() {player.A.points = player.A.points.add(1)},
        },
        331: {
            name: "The Power of Ach",
            tooltip:"购买'Ach Boost'升级",
            done() {return hasUpgrade('X', 264)},
            onComplete() {player.A.points = player.A.points.add(1)},
        },
        332: {
            name: "Self Boost",
            tooltip:"购买'A little fast'升级",
            done() {return hasUpgrade('X', 266)},
            onComplete() {player.A.points = player.A.points.add(1)},
        },
        341: {
            name: "Next Layer",
            tooltip:"获得 1 俊",
            done() {return player.J.points.gte(1)},
            onComplete() {player.A.points = player.A.points.add(1)},
        },
    },
    layerShown(){return true},
})