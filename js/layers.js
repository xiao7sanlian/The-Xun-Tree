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
        skill1acttime: n(0),
        skill1cooldown: n(0),
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
    update(diff){
        player.X.points = player.points
        player.devSpeed = tmp.X.devSpeedCal
        if (player.X.skill1acttime.gt(0)) player.X.skill1acttime = player.X.skill1acttime.sub(diff)
        if (player.X.skill1acttime.lt(0)) {player.X.skill1acttime = n(0)
            player.X.skill1cooldown = n(600)}
        if (player.X.skill1cooldown.gt(0)) player.X.skill1cooldown = player.X.skill1cooldown.sub(diff)
            if (player.X.skill1cooldown.lt(0)) player.X.skill1cooldown = n(0)
    },
    doReset(resettingLayer){
        layerDataReset('X', [])
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [],
    layerShown(){return true},
    clickables: {
        11: {
            display() {return "点击以获得 "+format(tmp.X.Xunonclick)+" 逊"},
            canClick() {return true},
            onClick() {player.points=player.points.add(tmp.X.Xunonclick)}
        },
        12: {
            title:'增加生产',
            display() {return "使角色生产x1.5<br>剩余时间："+format(player.X.skill1acttime)+"s<br>冷却时间："+format(player.X.skill1cooldown)+"s"},
            unlocked() {return hasUpgrade('X', 263)},
            canClick() {return hasUpgrade('X', 263)&&player.X.skill1acttime.lte(0)&&player.X.skill1cooldown.lte(0)},
            onClick() {player.X.skill1acttime = n(10)}
        },
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
        24: {
            title:"角色 9",
            cost(x) { return new Decimal(1.15).pow(x).times(1e9) },
            display() { return format(tmp.X.Character9Prod)+"逊/s<br>购买了"+getBuyableAmount(this.layer, this.id)+"次<br>消耗："+format(this.cost()) },
            canAfford() { return player.points.gte(this.cost()) },
            unlocked() {return n(getBuyableAmount(this.layer, 23)).gte(1)&&hasMilestone('CB', 1)},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        25: {
            title:"角色 10",
            cost(x) { return new Decimal(1.15).pow(x).times(1e10) },
            display() { return format(tmp.X.Character10Prod)+"逊/s<br>购买了"+getBuyableAmount(this.layer, this.id)+"次<br>消耗："+format(this.cost()) },
            canAfford() { return player.points.gte(this.cost()) },
            unlocked() {return n(getBuyableAmount(this.layer, 24)).gte(1)&&hasMilestone('CB', 1)},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        31: {
            title:"角色 11",
            cost(x) { return new Decimal(1.15).pow(x).times(5e11) },
            display() { return format(tmp.X.Character11Prod)+"逊/s<br>购买了"+getBuyableAmount(this.layer, this.id)+"次<br>消耗："+format(this.cost()) },
            canAfford() { return player.points.gte(this.cost()) },
            unlocked() {return n(getBuyableAmount(this.layer, 25)).gte(1)&&hasMilestone('CB', 2)},
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
        24: {
            title: "角色2升级 IV",
            description: "角色2生产x2",
            cost: new Decimal(15000000),
            unlocked() {return getBuyableAmount(this.layer, 12).gt(99)},
            onPurchase() {player.points = player.points.sub(15000000)},
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
        34: {
            title: "角色3升级 IV",
            description: "角色3生产x2",
            cost: new Decimal(1e9),
            unlocked() {return getBuyableAmount(this.layer, 13).gt(99)},
            onPurchase() {player.points = player.points.sub(1e9)},
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
        43: {
            title: "角色4升级 III",
            description: "角色4生产x2",
            cost: new Decimal(10000000),
            unlocked() {return getBuyableAmount(this.layer, 14).gt(49)},
            onPurchase() {player.points = player.points.sub(10000000)},
        },
        51: {
            title: "角色5升级 I",
            description: "角色5生产x2",
            cost: new Decimal(1000000),
            unlocked() {return getBuyableAmount(this.layer, 15).gt(9)},
            onPurchase() {player.points = player.points.sub(1000000)},
        },
        52: {
            title: "角色5升级 II",
            description: "角色5生产x2",
            cost: new Decimal(6500000),
            unlocked() {return getBuyableAmount(this.layer, 15).gt(24)},
            onPurchase() {player.points = player.points.sub(6500000)},
        },
        53: {
            title: "角色5升级 III",
            description: "角色5生产x2",
            cost: new Decimal(120000000),
            unlocked() {return getBuyableAmount(this.layer, 15).gt(49)},
            onPurchase() {player.points = player.points.sub(120000000)},
        },
        61: {
            title: "角色6升级 I",
            description: "角色6生产x2",
            cost: new Decimal(5000000),
            unlocked() {return getBuyableAmount(this.layer, 21).gt(9)},
            onPurchase() {player.points = player.points.sub(5000000)},
        },
        62: {
            title: "角色6升级 II",
            description: "角色6生产x2",
            cost: new Decimal(75000000),
            unlocked() {return getBuyableAmount(this.layer, 21).gt(24)},
            onPurchase() {player.points = player.points.sub(75000000)},
        },
        71: {
            title: "角色7升级 I",
            description: "角色7生产x2",
            cost: new Decimal(60000000),
            unlocked() {return getBuyableAmount(this.layer, 22).gt(9)},
            onPurchase() {player.points = player.points.sub(60000000)},
        },
        72: {
            title: "角色7升级 II",
            description: "角色7生产x2",
            cost: new Decimal(500000000),
            unlocked() {return getBuyableAmount(this.layer, 22).gt(24)},
            onPurchase() {player.points = player.points.sub(500000000)},
        },
        81: {
            title: "角色8升级 I",
            description: "角色8生产x2",
            cost: new Decimal(500000000),
            unlocked() {return getBuyableAmount(this.layer, 23).gt(9)},
            onPurchase() {player.points = player.points.sub(500000000)},
        },
        82: {
            title: "角色8升级 II",
            description: "角色8生产x2",
            cost: new Decimal(4e9),
            unlocked() {return getBuyableAmount(this.layer, 23).gt(24)},
            onPurchase() {player.points = player.points.sub(4e9)},
        },
        91: {
            title: "角色9升级 I",
            description: "角色9生产x2",
            cost: new Decimal(5e9),
            unlocked() {return getBuyableAmount(this.layer, 24).gt(9)},
            onPurchase() {player.points = player.points.sub(5e9)},
        },
        101: {
            title: "角色10升级 I",
            description: "角色10生产x2",
            cost: new Decimal(5e10),
            unlocked() {return getBuyableAmount(this.layer, 25).gt(9)},
            onPurchase() {player.points = player.points.sub(5e10)},
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
        262: {
            title: "Click Boost",
            description: "点击获得1%每秒获取的逊",
            cost() {a = new Decimal(10000)
                    return a
            },
            unlocked() {return hasMilestone('CB', 1)},
            onPurchase() {player.points = player.points.sub(10000)
            },
        },
        263: {
            title: "A Skill",
            description: "解锁“增加生产”技能：<br>接下来10s内，所有角色生产x1.5，冷却600s",
            cost() {a = new Decimal(1000000)
                    return a
            },
            unlocked() {return hasMilestone('CB', 1)},
            onPurchase() {player.points = player.points.sub(1000000)
            },
        },
        264: {
            title: "Ach Boost",
            description: "每个成就使角色生产+1%",
            cost() {a = new Decimal(7500000)
                    return a
            },
            unlocked() {return hasMilestone('CB', 1)},
            effect() {
                return player.A.points.times(0.01).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            onPurchase() {player.points = player.points.sub(7500000)
            },
        },
        265: {
            title: "It's to slow",
            description: "每个购买的角色使角色生产+0.1%",
            cost() {a = new Decimal(1e10)
                    return a
            },
            unlocked() {return hasMilestone('CB', 2)},
            effect() {
                return tmp.X.allCharacter.times(0.001).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            onPurchase() {player.points = player.points.sub(1e10)
            },
        },
        266: {
            title: "A little fast",
            description: "从1逊开始，逊数量每x10，角色生产+10%",
            cost() {a = new Decimal(3e10)
                    return a
            },
            unlocked() {return hasMilestone('CB', 2)},
            effect() {a = player.points.log(10).times(0.1).add(1)
                if (a.lt(1)) a = n(1)
                return a
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            onPurchase() {player.points = player.points.sub(3e10)
            },
        },
    },
    Multtoallchars() {a = n(1)
        a = a.times(tmp.CB.effect)
        if (player.X.skill1acttime.gt(0)) a = a.times(1.5)
        if (hasUpgrade('X', 264)) a = a.times(upgradeEffect(this.layer, 264))
        if (hasUpgrade('X', 265)) a = a.times(upgradeEffect(this.layer, 265))
        if (hasUpgrade('X', 266)) a = a.times(upgradeEffect(this.layer, 266))
        if (hasUpgrade('J', 11)) a = a.times(upgradeEffect('J', 11))
        if (hasUpgrade('J', 21)) a = a.times(upgradeEffect('J', 21))
        if (hasUpgrade('J', 22)) a = a.times(upgradeEffect('J', 22))
        if (hasUpgrade('J', 31)) a = a.times(upgradeEffect('J', 31))
        if (hasUpgrade('J', 32)) a = a.times(upgradeEffect('J', 32))
        if (hasUpgrade('J', 34)) a = a.times(upgradeEffect('J', 34))
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
        if (hasUpgrade('X', 24)) a = a.times(2)
        return a
    },
    Character3Prod() {a = n(5)
        a = a.times(tmp.X.Multtoallchars)
        if (hasUpgrade('X', 31)) a = a.times(2)
        if (hasUpgrade('X', 32)) a = a.times(2)
        if (hasUpgrade('X', 33)) a = a.times(2)
        if (hasUpgrade('X', 34)) a = a.times(2)
        return a
    },
    Character4Prod() {a = n(20)
        a = a.times(tmp.X.Multtoallchars)
        if (hasUpgrade('X', 41)) a = a.times(2)
        if (hasUpgrade('X', 42)) a = a.times(2)
        if (hasUpgrade('X', 43)) a = a.times(2)
        return a
    },
    Character5Prod() {a = n(100)
        a = a.times(tmp.X.Multtoallchars)
        if (hasUpgrade('X', 51)) a = a.times(2)
        if (hasUpgrade('X', 52)) a = a.times(2)
        if (hasUpgrade('X', 53)) a = a.times(2)
        return a
    },
    Character6Prod() {a = n(500)
        a = a.times(tmp.X.Multtoallchars)
        if (hasUpgrade('X', 61)) a = a.times(2)
        if (hasUpgrade('X', 62)) a = a.times(2)
        return a
    },
    Character7Prod() {a = n(1200)
        a = a.times(tmp.X.Multtoallchars)
        if (hasUpgrade('X', 71)) a = a.times(2)
        if (hasUpgrade('X', 72)) a = a.times(2)
        return a
    },
    Character8Prod() {a = n(5000)
        a = a.times(tmp.X.Multtoallchars)
        if (hasUpgrade('X', 81)) a = a.times(2)
        if (hasUpgrade('X', 82)) a = a.times(2)
        return a
    },
    Character9Prod() {a = n(20000)
        a = a.times(tmp.X.Multtoallchars)
        if (hasUpgrade('X', 91)) a = a.times(2)
        return a
    },
    Character10Prod() {a = n(60000)
        a = a.times(tmp.X.Multtoallchars)
        if (hasUpgrade('X', 101)) a = a.times(2)
        return a
    },
    Character11Prod() {a = n(250000)
        a = a.times(tmp.X.Multtoallchars)
        return a
    },
    Xunonclick() {a = n(0.1)
        if (hasMilestone('CB', 0)) a = a.times(10)
        if (hasUpgrade('X', 262)) a = a.add(getPointGen().times(0.01))
        if (hasUpgrade('J', 23)) a = a.add(getPointGen().times(0.05))
        return a
    },
    allCharacter() {a = n(0)
        a = a.add(getBuyableAmount('X', 11))
        a = a.add(getBuyableAmount('X', 12))
        a = a.add(getBuyableAmount('X', 13))
        a = a.add(getBuyableAmount('X', 14))
        a = a.add(getBuyableAmount('X', 15))
        a = a.add(getBuyableAmount('X', 21))
        a = a.add(getBuyableAmount('X', 22))
        a = a.add(getBuyableAmount('X', 23))
        a = a.add(getBuyableAmount('X', 24))
        a = a.add(getBuyableAmount('X', 25))
        a = a.add(getBuyableAmount('X', 31))
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
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [],
    tabFormat: [
        ["display-text", function() { return getPointsDisplay() }],
        "main-display",
        "prestige-button",
        ["display-text",
            function() { a = '角色提升将会重置所有角色、升级和逊。<br>在1角色提升时，使点击获得逊x10，升级"A boost"不再消耗逊，并解锁2个新的角色。<br>'
                if (hasMilestone('CB', 0)) a = a + '在2角色提升时，解锁2个新的角色与更多的升级。<br>'
                if (hasMilestone('CB', 1)) a = a + '在3角色提升时，解锁1个新的角色与更多的升级，并解锁下一个层级(需要 1e12 逊)。<br>'
                if (hasMilestone('CB', 2)) a = a + '在4角色提升时，解锁1个新的角色，继续解锁更多的升级。<br>'
                return a
             }],
    ],
    milestones: {
        0: {
            requirementDescription: "1 角色提升",
            effectDescription: "点击获得逊x10，并解锁2个新的角色",
            done() { return player.CB.points.gte(1) },
        },
        1: {
            requirementDescription: "2 角色提升",
            effectDescription: "点击获得逊x10，并解锁2个新的角色",
            done() { return player.CB.points.gte(2) },
        },
        2: {
            requirementDescription: "3 角色提升",
            effectDescription: "点击获得逊x10，并解锁2个新的角色",
            done() { return player.CB.points.gte(3) },
        },
    },
    layerShown(){return player.CB.unlocked||hasUpgrade('X', 261)},
})