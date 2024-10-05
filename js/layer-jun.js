addLayer("2layer small", {// Add a * small* to generate a slightly different layer
    name: "sideLayer2",
    position: -1,
    row: 3,
    symbol() {return (options.ch || modInfo.languageMod==false) ? '↓ 层级 2 ↓' : '↓ layer 2 ↓'},
    symbolEN() {return (options.ch || modInfo.languageMod==false) ? '↓ 层级 2 ↓' : '↓ layer 2 ↓'},
    nodeStyle: {"font-size": "15px", "text-center": "center", "height": "30px"},
    startData() { return {
        unlocked: true,
        small: true,
        points: new Decimal(0),// This actually does nothing, but you have to write this. (Unless you want add something in this layer. #Todo, might change that later.)
    }},
    color: "#fefefe",
    type: "none",
    tooltip(){return false},
    layerShown(){return layerDisplayTotal(['J'])},// If any layer in the array is unlocked, it will returns true. Otherwise it will return false.
	tabFormat: [
        ["display-text", function() { return getPointsDisplay() }]
    ],
})

addLayer("J", {
    name: "jun", // This is optional, only used in a few places, If absent it just uses the layer id
    symbol: "俊", // This appears on the layer's node. Default is the id with the first letter capitalized
    symbolEN: "Jun", // The second name of this appears on the layer's node ( If you open otherLanguageMod )
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#Ffe125",
    requires: new Decimal(1e12), // Can be a function that takes requirement increases into account
    resource: "俊", // Name of prestige currency
    resourceEN: "prestige points", // The second name of prestige currency ( If you open otherLanguageMod )
    baseResource: "逊", // Name of resource prestige is based on
    baseResourceEN: "points", // The second name of resource prestige is based on ( If you open otherLanguageMod )
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    resetDescription: "转生以获得 ",
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = n(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [],
    tabFormat: [
        ["display-text", function() { return getPointsDisplay() }],
        "main-display",
        "prestige-button",
    ],
    layerShown(){return player.J.unlocked||hasMilestone('CB', 2)},
})