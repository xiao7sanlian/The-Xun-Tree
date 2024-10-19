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
        donggua: n(0),
        totaldg: n(0),
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
        ["display-text", function() { return '你有 '+format(player.J.donggua)+' 冬瓜币<br>你总共购买了 '+format(player.J.totaldg)+' 冬瓜币' }],
        "buyables",
        "upgrades",
    ],
    buyables: {
        11: {
            a() { 
             let a=n(2)
             return a},
             cost() {
             let b=getBuyableAmount(this.layer, this.id)
             cost=this.a().pow(b)
            return cost
            },
            b() {
                let b=n(1)
                if (hasUpgrade('J', 33)) b = b.times(2)
                    return b
            },
            title(){return "冬瓜币 I"},
            display() { return "你可以用逊购买冬瓜币购买升级<br>价格："+format(this.cost())+" 逊<br>数量："+format(getBuyableAmount(this.layer, this.id))+'x'+format(this.b())},
            canAfford() { return player.points.gte(this.cost()) },
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player.J.donggua = player.J.donggua.add(this.b())
                player.J.totaldg = player.J.totaldg.add(this.b())
            },
            //buyMax() {
			//		if (!this.canAfford()) return;
			//		let tempBuy = player.r.points.log(this.a())
			//		let target = tempBuy.plus(1).floor();
			//		player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target)
			//	},
            unlocked() {return hasAchievement('A', 341)},
            style: {'height':'100px'},
        },
        12: {
            a() {let a=n(2)
             return a
            },
            cost() {
             return this.a().pow(getBuyableAmount(this.layer, this.id))},
            title(){return "冬瓜币 II"},
            display() { return "你可以用俊购买冬瓜币购买升级<br>价格："+format(this.cost())+" 俊<br>数量："+format(n(getBuyableAmount(this.layer, this.id)).times(10))},
            canAfford() { return player.J.points.gte(this.cost()) },
            buy() {
                 player.J.points = player.J.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player.J.donggua = player.J.donggua.add(10)
                player.J.totaldg = player.J.totaldg.add(10)
            },
            //buyMax() {
			//		if (!this.canAfford()) return;
			//		let tempBuy = player.points.div(this.a()).log("e50000").root(1.25)
			//		let target = tempBuy.plus(1).floor();
			//		player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target)
			//	},
            unlocked() {return hasAchievement('A', 341)},
            style: {'height':'100px'},
        },
    },
    upgrades: {
        11: {
            //title: '11',
            fullDisplay() {return "11<br>每个总共购买的冬瓜币使角色生产+1%<br>当前效果："+format(upgradeEffect(this.layer, this.id))+"x<br>价格： 5 冬瓜币"},
            effect() {a = player.J.totaldg.times(0.01).add(1)
                return a
            },
            //effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            onPurchase() {player.J.donggua=player.J.donggua.sub(5)},
            canAfford() {return player.J.donggua.gte(5)},
        },
        21: {
            fullDisplay() {return "21<br>所有角色生产增加5%<br>当前效果："+format(upgradeEffect(this.layer, this.id))+"x<br>价格： 5 冬瓜币"},
            effect() {a = n(1.05)
                return a
            },
            onPurchase() {player.J.donggua=player.J.donggua.sub(5)},
            canAfford() {return player.J.donggua.gte(5)&&hasUpgrade('J', 11)},
            branches: [11],
        },
        22: {
            fullDisplay() {return "22<br>所有角色生产增加5%<br>当前效果："+format(upgradeEffect(this.layer, this.id))+"x<br>价格： 10 冬瓜币"},
            effect() {a = n(1.05)
                return a
            },
            onPurchase() {player.J.donggua=player.J.donggua.sub(10)},
            canAfford() {return player.J.donggua.gte(10)&&hasUpgrade('J', 11)},
            branches: [11],
        },
        23: {
            fullDisplay() {return "23<br>点击获得5%每秒获取的逊<br>价格： 10 冬瓜币"},
            onPurchase() {player.J.donggua=player.J.donggua.sub(10)},
            canAfford() {return player.J.donggua.gte(10)&&hasUpgrade('J', 11)},
            branches: [11],
        },
        31: {
            fullDisplay() {return "31<br>所有角色生产增加10%<br>当前效果："+format(upgradeEffect(this.layer, this.id))+"x<br>价格： 10 冬瓜币"},
            effect() {a = n(1.10)
                return a
            },
            onPurchase() {player.J.donggua=player.J.donggua.sub(10)},
            canAfford() {return player.J.donggua.gte(10)&&hasUpgrade('J', 21)},
            branches: [21],
        },
        32: {
            fullDisplay() {return "32<br>每个购买的角色使角色生产+0.2%<br>当前效果："+format(upgradeEffect(this.layer, this.id))+"x<br>价格： 15 冬瓜币"},
            effect() {
                return tmp.X.allCharacter.times(0.002).add(1)
            },
            onPurchase() {player.J.donggua=player.J.donggua.sub(15)},
            canAfford() {return player.J.donggua.gte(15)&&hasUpgrade('J', 21)},
            branches: [21],
        },
        33: {
            fullDisplay() {return "33<br>重置使用逊购买冬瓜币数量，但使用逊购买的冬瓜币数量x2<br>价格： 1 冬瓜币"},
            onPurchase() {player.J.donggua=player.J.donggua.sub(1)
                player.J.donggua=player.J.donggua.sub(getBuyableAmount('J', 11))
                player.J.totaldg=player.J.totaldg.sub(getBuyableAmount('J', 11))
                setBuyableAmount(this.layer, 11, n(0))
            },
            canAfford() {return player.J.donggua.gte(1)&&hasUpgrade('J', 22)},
            branches: [22],
        },
        34: {
            fullDisplay() {return "34<br>所有角色生产+10%<br>当前效果："+format(upgradeEffect(this.layer, this.id))+"x<br>价格： 10 冬瓜币"},
            effect() {
                return n(1.10)
            },
            onPurchase() {player.J.donggua=player.J.donggua.sub(10)},
            canAfford() {return player.J.donggua.gte(10)&&hasUpgrade('J', 23)},
            branches: [23],
        },
        35: {
            fullDisplay() {return "35<br>俊获取数量+50%<br>当前效果："+format(upgradeEffect(this.layer, this.id))+"x<br>价格： 10 冬瓜币"},
            effect() {
                return n(1.50)
            },
            onPurchase() {player.J.donggua=player.J.donggua.sub(10)},
            canAfford() {return player.J.donggua.gte(10)&&hasUpgrade('J', 23)},
            branches: [23],
        },
    },
    layerShown(){return player.J.unlocked||hasMilestone('CB', 2)},
})