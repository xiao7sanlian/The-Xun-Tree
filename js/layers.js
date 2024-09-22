addLayer("1layer small", {// Add a * small* to generate a slightly different layer
    name: "sideLayer1",
    position: -1,
    row: 1,
    symbol() {return (options.ch || modInfo.languageMod==false) ? '↓ 层级 1 ↓' : '↓ layer 1 ↓'},
    symbolEN() {return (options.ch || modInfo.languageMod==false) ? '↓ 层级 1 ↓' : '↓ layer 1 ↓'},
    nodeStyle: {"font-size": "15px", "text-center": "center", "height": "30px"},
    startData() { return {
        unlocked: true,
        small: true,
        points: new Decimal(0),// This actually does nothing, but you have to write this. (Unless you want add something in this layer. #Todo, might change that later.)
    }},
    color: "#fefefe",
    type: "none",
    tooltip(){return false},
    layerShown(){return layerDisplayTotal(['X','CB'])},// If any layer in the array is unlocked, it will returns true. Otherwise it will return false.
	tabFormat: [
        ["display-text", function() { return getPointsDisplay() }]
    ],
})

addLayer("X", {
    name: "xun", // This is optional, only used in a few places, If absent it just uses the layer id
    symbol: "逊", // This appears on the layer's node. Default is the id with the first letter capitalized
    symbolEN: "Xun", // The second name of this appears on the layer's node ( If you open otherLanguageMod )
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#FFFFFF",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "逊", // Name of prestige currency
    resourceEN: "prestige points", // The second name of prestige currency ( If you open otherLanguageMod )
    baseResource: "逊", // Name of resource prestige is based on
    baseResourceEN: "points", // The second name of resource prestige is based on ( If you open otherLanguageMod )
    //baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    devSpeedCal() {//我也不知道为什么放这里
	    let dev=n(1)
	    if (isEndgame()) dev=n(0)
	    return dev
	   },
    update(){
        player.X.points = player.points
        player.devSpeed = tmp.X.devSpeedCal
    },
    doReset(resettingLayer){
        if (resettingLayer == 'CB') layerDataReset('X', [])
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [],
    layerShown(){return true},
    clickables: {
        11: {
            display() {return "点击以获得 "+tmp.X.Xunonclick+" 逊"},
            canClick() {return true},
            onClick() {player.points=player.points.add(tmp.X.Xunonclick)}
        }
    },
    buyables: {
        11: {
            title:"角色 1",
            cost(x) { return new Decimal(1.15).pow(x).times(6) },
            display() { return format(tmp.X.Character1Prod)+"逊/s<br>购买了"+getBuyableAmount(this.layer, this.id)+"次<br>消耗："+format(this.cost()) },
            canAfford() { return player.points.gte(this.cost()) },
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        12: {
            title:"角色 2",
            cost(x) { return new Decimal(1.15).pow(x).times(50) },
            display() { return format(tmp.X.Character2Prod)+"逊/s<br>购买了"+getBuyableAmount(this.layer, this.id)+"次<br>消耗："+format(this.cost()) },
            canAfford() { return player.points.gte(this.cost()) },
            unlocked() {return n(getBuyableAmount(this.layer, 11)).gte(1)},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        13: {
            title:"角色 3",
            cost(x) { return new Decimal(1.15).pow(x).times(500) },
            display() { return format(tmp.X.Character3Prod)+"逊/s<br>购买了"+getBuyableAmount(this.layer, this.id)+"次<br>消耗："+format(this.cost()) },
            canAfford() { return player.points.gte(this.cost()) },
            unlocked() {return n(getBuyableAmount(this.layer, 12)).gte(1)},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        14: {
            title:"角色 4",
            cost(x) { return new Decimal(1.15).pow(x).times(8000) },
            display() { return format(tmp.X.Character4Prod)+"逊/s<br>购买了"+getBuyableAmount(this.layer, this.id)+"次<br>消耗："+format(this.cost()) },
            canAfford() { return player.points.gte(this.cost()) },
            unlocked() {return n(getBuyableAmount(this.layer, 13)).gte(1)},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        15: {
            title:"角色 5",
            cost(x) { return new Decimal(1.15).pow(x).times(100000) },
            display() { return format(tmp.X.Character5Prod)+"逊/s<br>购买了"+getBuyableAmount(this.layer, this.id)+"次<br>消耗："+format(this.cost()) },
            canAfford() { return player.points.gte(this.cost()) },
            unlocked() {return n(getBuyableAmount(this.layer, 14)).gte(1)},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        21: {
            title:"角色 6",
            cost(x) { return new Decimal(1.15).pow(x).times(1000000) },
            display() { return format(tmp.X.Character6Prod)+"逊/s<br>购买了"+getBuyableAmount(this.layer, this.id)+"次<br>消耗："+format(this.cost()) },
            canAfford() { return player.points.gte(this.cost()) },
            unlocked() {return n(getBuyableAmount(this.layer, 15)).gte(1)},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        22: {
            title:"角色 7",
            cost(x) { return new Decimal(1.15).pow(x).times(7.5e6) },
            display() { return format(tmp.X.Character7Prod)+"逊/s<br>购买了"+getBuyableAmount(this.layer, this.id)+"次<br>消耗："+format(this.cost()) },
            canAfford() { return player.points.gte(this.cost()) },
            unlocked() {return n(getBuyableAmount(this.layer, 21)).gte(1)&&hasMilestone('CB', 0)},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        23: {
            title:"角色 8",
            cost(x) { return new Decimal(1.15).pow(x).times(6e7) },
            display() { return format(tmp.X.Character8Prod)+"逊/s<br>购买了"+getBuyableAmount(this.layer, this.id)+"次<br>消耗："+format(this.cost()) },
            canAfford() { return player.points.gte(this.cost()) },
            unlocked() {return n(getBuyableAmount(this.layer, 22)).gte(1)&&hasMilestone('CB', 0)},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
    },
    upgrades: {
        11: {
            title: "角色1升级 I",
            description: "角色1生产x2",
            cost: new Decimal(100),
            unlocked() {return getBuyableAmount(this.layer, 11).gt(9)},
            onPurchase() {player.points = player.points.sub(100)},
        },
        12: {
            title: "角色1升级 II",
            description: "角色1生产x2",
            cost: new Decimal(1500),
            unlocked() {return getBuyableAmount(this.layer, 11).gt(24)},
            onPurchase() {player.points = player.points.sub(1500)},
        },
        13: {
            title: "角色1升级 III",
            description: "角色1生产x2",
            cost: new Decimal(6000),
            unlocked() {return getBuyableAmount(this.layer, 11).gt(49)},
            onPurchase() {player.points = player.points.sub(6000)},
        },
        14: {
            title: "角色1升级 IV",
            description: "角色1生产x2",
            cost: new Decimal(8000000),
            unlocked() {return getBuyableAmount(this.layer, 11).gt(99)},
            onPurchase() {player.points = player.points.sub(8000000)},
        },
        21: {
            title: "角色2升级 I",
            description: "角色2生产x2",
            cost: new Decimal(1000),
            unlocked() {return getBuyableAmount(this.layer, 12).gt(9)},
            onPurchase() {player.points = player.points.sub(1000)},
        },
        22: {
            title: "角色2升级 II",
            description: "角色2生产x2",
            cost: new Decimal(15000),
            unlocked() {return getBuyableAmount(this.layer, 12).gt(24)},
            onPurchase() {player.points = player.points.sub(15000)},
        },
        23: {
            title: "角色2升级 III",
            description: "角色2生产x2",
            cost: new Decimal(120000),
            unlocked() {return getBuyableAmount(this.layer, 12).gt(49)},
            onPurchase() {player.points = player.points.sub(120000)},
        },
        31: {
            title: "角色3升级 I",
            description: "角色3生产x2",
            cost: new Decimal(10000),
            unlocked() {return getBuyableAmount(this.layer, 13).gt(9)},
            onPurchase() {player.points = player.points.sub(10000)},
        },
        32: {
            title: "角色3升级 II",
            description: "角色3生产x2",
            cost: new Decimal(200000),
            unlocked() {return getBuyableAmount(this.layer, 13).gt(24)},
            onPurchase() {player.points = player.points.sub(200000)},
        },
        33: {
            title: "角色3升级 III",
            description: "角色3生产x2",
            cost: new Decimal(1500000),
            unlocked() {return getBuyableAmount(this.layer, 13).gt(49)},
            onPurchase() {player.points = player.points.sub(1500000)},
        },
        41: {
            title: "角色4升级 I",
            description: "角色4生产x2",
            cost: new Decimal(150000),
            unlocked() {return getBuyableAmount(this.layer, 14).gt(9)},
            onPurchase() {player.points = player.points.sub(150000)},
        },
        42: {
            title: "角色4升级 II",
            description: "角色4生产x2",
            cost: new Decimal(500000),
            unlocked() {return getBuyableAmount(this.layer, 14).gt(24)},
            onPurchase() {player.points = player.points.sub(500000)},
        },
        51: {
            title: "角色5升级 I",
            description: "角色5生产x2",
            cost: new Decimal(1000000),
            unlocked() {return getBuyableAmount(this.layer, 15).gt(9)},
            onPurchase() {player.points = player.points.sub(1000000)},
        },
        61: {
            title: "角色6升级 I",
            description: "角色6生产x2",
            cost: new Decimal(5000000),
            unlocked() {return getBuyableAmount(this.layer, 21).gt(9)},
            onPurchase() {player.points = player.points.sub(5000000)},
        },
        261: {
            title: "A Boost",
            description: "解锁角色提升",
            cost() {a = new Decimal(1000000)
                if (hasMilestone('CB', 0)) a = n(0)
                    return a
            },
            unlocked() {return getBuyableAmount(this.layer, 21).gt(0)},
            onPurchase() {if (!hasMilestone('CB', 0))player.points = player.points.sub(1000000)
            },
        },
    },
    Multtoallchars() {a = n(1)
        a = a.times(tmp.CB.effect)
        return a
    },
    Character1Prod() {a = n(0.1)
        a = a.times(tmp.X.Multtoallchars)
        if (hasUpgrade('X', 11)) a = a.times(2)
        if (hasUpgrade('X', 12)) a = a.times(2)
        if (hasUpgrade('X', 13)) a = a.times(2)
        if (hasUpgrade('X', 14)) a = a.times(2)
        return a
    },
    Character2Prod() {a = n(1)
        a = a.times(tmp.X.Multtoallchars)
        if (hasUpgrade('X', 21)) a = a.times(2)
        if (hasUpgrade('X', 22)) a = a.times(2)
        if (hasUpgrade('X', 23)) a = a.times(2)
        return a
    },
    Character3Prod() {a = n(5)
        a = a.times(tmp.X.Multtoallchars)
        if (hasUpgrade('X', 31)) a = a.times(2)
        if (hasUpgrade('X', 32)) a = a.times(2)
        if (hasUpgrade('X', 33)) a = a.times(2)
        return a
    },
    Character4Prod() {a = n(20)
        a = a.times(tmp.X.Multtoallchars)
        if (hasUpgrade('X', 41)) a = a.times(2)
        if (hasUpgrade('X', 42)) a = a.times(2)
        return a
    },
    Character5Prod() {a = n(100)
        a = a.times(tmp.X.Multtoallchars)
        if (hasUpgrade('X', 51)) a = a.times(2)
        return a
    },
    Character6Prod() {a = n(500)
        a = a.times(tmp.X.Multtoallchars)
        if (hasUpgrade('X', 61)) a = a.times(2)
        return a
    },
    Character7Prod() {a = n(1200)
        a = a.times(tmp.X.Multtoallchars)
        return a
    },
    Character8Prod() {a = n(5000)
        a = a.times(tmp.X.Multtoallchars)
        return a
    },
    Xunonclick() {a = n(0.1)
        if (hasMilestone('CB', 0)) a = a.times(10)
        return a
    },
})

addLayer("CB", {
    name: "characterboost", // This is optional, only used in a few places, If absent it just uses the layer id
    symbol: "角色提升", // This appears on the layer's node. Default is the id with the first letter capitalized
    symbolEN: "Character Boost", // The second name of this appears on the layer's node ( If you open otherLanguageMod )
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#FFFFFF",
    requires: new Decimal(1048576), // Can be a function that takes requirement increases into account
    resource: "角色提升", // Name of prestige currency
    resourceEN: "prestige points", // The second name of prestige currency ( If you open otherLanguageMod )
    baseResource: "逊", // Name of resource prestige is based on
    baseResourceEN: "points", // The second name of resource prestige is based on ( If you open otherLanguageMod )
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(64).pow(player.CB.points)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    effect() {a = n(2).pow(player.CB.points)
        return a
    },
    effectDescription() {a = '使角色生产x'+format(tmp.CB.effect)
        return a
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [],
    tabFormat: [
        ["display-text", function() { return getPointsDisplay() }],
        "main-display",
        "prestige-button",
        ["display-text",
            function() { a = '角色提升将会重置所有角色、升级和逊。<br>在1角色提升时，使点击获得逊x10，升级"A boost"不再消耗逊，并解锁2个新的角色。<br>'
                if (hasMilestone('CB', 0)) a = a + '在2角色提升时，<s>解锁2个新的角色与更多的升级</s>到达Endgame。'
                return a
             }],
    ],
    milestones: {
        0: {
            requirementDescription: "1 角色提升",
            effectDescription: "点击获得逊x10，并解锁2个新的角色",
            done() { return player.CB.points.gte(1) },
        }
    },
    layerShown(){return player.CB.unlocked||hasUpgrade('X', 261)},
})