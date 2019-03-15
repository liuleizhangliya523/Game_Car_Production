(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scrips/record_item.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '918a1h08+9ErIhltSOKxGoM', 'record_item', __filename);
// scrips/record_item.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        lb_month: {
            type: cc.Label,
            default: null
        },
        lb_hot: {
            type: cc.Label,
            default: null
        },
        sp_market: {
            type: cc.Sprite,
            default: null
        },
        sp_auto_car: {
            type: cc.Sprite,
            default: null
        },
        sp_manual_car: {
            type: cc.Sprite,
            default: null
        },
        sp_backGround: {
            type: cc.Sprite,
            default: null
        },
        spriteFrame_suv: {
            type: cc.SpriteFrame,
            default: null
        },
        spriteFrame_car: {
            type: cc.SpriteFrame,
            default: null
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {},


    updateItem: function updateItem(data) {
        this.lb_month.string = data.order.toString();
        if (data.order % 2 == 0) {
            this.sp_backGround.node.active = true;
        } else {
            this.sp_backGround.node.active = false;
        }
        data.marketType === "car" ? this.sp_market.spriteFrame = this.spriteFrame_car : this.sp_market.spriteFrame = this.spriteFrame_suv;
        if (data.type == "auto") {
            this.sp_auto_car.node.active = true;
        } else {
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

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=record_item.js.map
        