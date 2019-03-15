
cc.Class({
    extends: cc.Component,

    properties: {
        lb_month:
        {
            type: cc.Label,
            default: null
        },
        lb_hot:
        {
            type: cc.Label,
            default: null
        },
        sp_market:
        {
            type: cc.Sprite,
            default: null
        },
        sp_auto_car:
        {
            type: cc.Sprite,
            default: null
        },
        sp_manual_car:
        {
            type: cc.Sprite,
            default: null
        },
        sp_backGround:
        {
            type: cc.Sprite,
            default: null
        },
        spriteFrame_suv:
        {
            type: cc.SpriteFrame,
            default: null
        },
        spriteFrame_car:
        {
            type: cc.SpriteFrame,
            default: null
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },

    updateItem: function (data) {
        this.lb_month.string = data.order.toString();
        if (data.order % 2 == 0) {
            this.sp_backGround.node.active = true;
        }
        else {
            this.sp_backGround.node.active = false;
        }
        data.marketType === "car" ? this.sp_market.spriteFrame = this.spriteFrame_car : this.sp_market.spriteFrame = this.spriteFrame_suv;
        if (data.type == "auto") {
            this.sp_auto_car.node.active = true;
        }
        else {
            this.sp_manual_car.node.active = true;
        }
        if (data.winCar == "保护基金") {
            this.sp_market.spriteFrame = null;
            this.sp_auto_car.node.active = false;
            this.sp_manual_car.node.active = false;
        }
        this.lb_hot.string = data.winCar;
    }
    // update (dt) {},
});
