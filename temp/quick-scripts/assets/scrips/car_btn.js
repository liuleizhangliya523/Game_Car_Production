(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scrips/car_btn.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '3c4236ujH1DIJs7tr5RjsLA', 'car_btn', __filename);
// scrips/car_btn.js

"use strict";

var _ConstData = require("./data/ConstData");

var _ConstData2 = _interopRequireDefault(_ConstData);

var _GlobalGameData = require("./data/GlobalGameData");

var _GlobalGameData2 = _interopRequireDefault(_GlobalGameData);

var _Tools = require("./tools/Tools");

var _Tools2 = _interopRequireDefault(_Tools);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

cc.Class({
    extends: cc.Component,
    properties: function properties() {
        return {};
    },
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {
        // this.lb_my = cc.find("node_bets/label_my", this.node);
        // this.lb_total = cc.find("node_bets/label_total", this.node);
        // this.lb_my.getComponent(cc.Label).string = "0";
        // this.lb_total.getComponent(cc.Label).string = "0";
        this.updateAmount("0", "0");
        var rootNode = cc.find("Canvas");
        this._gameObj = rootNode.getComponent("game");
        // this.setAI_TimerEnable(true);
    },

    //开启模拟他人下注的定时器
    // setAI_TimerEnable: function (isEnable) {

    //     isEnable ?
    //         this.schedule(this.doPayAI, 3) :
    //         this.unschedule(this.doPayAI, this);
    // },
    //模拟他人下注
    doPayOperation: function doPayOperation() {
        // const randRate_isAdd = Tools.rand(0, 9);
        // const randRate_case = Tools.rand(0, 2);
        var rand_cost_rate = _Tools2.default.rand(1, 12);
        var rand_amount = 100 * rand_cost_rate;
        var key = this.node.name; //组件名其实就是数据对应的key

        _GlobalGameData2.default.amount_of_cars_others[key] += rand_amount;
        var node_bets = cc.find("node_bets", this.node);
        node_bets.active = true;
        this.updateAmount(_GlobalGameData2.default.amount_of_cars[key], _GlobalGameData2.default.amount_of_cars_others[key]);
    },
    //更新投注金额UI
    updateAmount: function updateAmount(my, total) {
        this.lb_my = cc.find("node_bets/label_my", this.node);
        this.lb_total = cc.find("node_bets/label_total", this.node);
        if (my != null) {
            this.lb_total.getComponent(cc.Label).string = my.toString();
        }
        if (total != null) {
            this.lb_my.getComponent(cc.Label).string = total.toString();
        }
    },
    //播放投标动画
    playArrowAnim: function playArrowAnim(callBack) {
        var self = this;
        this.sp_last_result_flag = cc.find("last_result_flag", this.node);
        this.sp_last_result_flag.active = true;
        // this.sp_last_result_flag.opacity = 0;
        this.sp_last_result_flag.runAction(cc.sequence(cc.blink(1.5, 3), cc.delayTime(1), cc.callFunc(function () {
            self.sp_last_result_flag.active = false;
            if (callBack != null) {
                callBack();
            }
        }, this)));
    },
    btn_clickedCallBack: function btn_clickedCallBack(event, customEventData) {
        var node = event.target;
        var node_bets = cc.find("node_bets", node);
        console.log("投注：" + customEventData + " 当前金额：" + _ConstData2.default.PAY_CASE_DATA[_ConstData2.default.PAY_CASE]);

        var _totalOli = _GlobalGameData2.default.locked_oli_var + _GlobalGameData2.default.oli_var;
        this._gameObj.playBtnSound();
        if (_totalOli < _ConstData2.default.PAY_CASE_DATA[_ConstData2.default.PAY_CASE]) {
            Tips.show("您的余额不足\n请充值后继续参与", "点击充值>>", "https://prodone.juxinbox.com/sinopecGameCt/weixinMng/ManageC/chargeOilIn.htm?back_url=https://game.juxinbox.com/trump_investment/login/authorize");
            //弹出剩余油滴不足
        } else {
            //先判断绑定油滴
            if (_GlobalGameData2.default.oli_var > 0) {
                if (_GlobalGameData2.default.oli_var >= _ConstData2.default.PAY_CASE_DATA[_ConstData2.default.PAY_CASE]) {
                    if (_GlobalGameData2.default.used_oli_var + _ConstData2.default.PAY_CASE_DATA[_ConstData2.default.PAY_CASE] > 10000) {
                        Tips.show("为了您的资金安全，单次投注最大上限不得超过10000。", "确定", "");
                        return;
                    }
                    _GlobalGameData2.default.oli_var -= _ConstData2.default.PAY_CASE_DATA[_ConstData2.default.PAY_CASE];
                    _GlobalGameData2.default.used_oli_var += _ConstData2.default.PAY_CASE_DATA[_ConstData2.default.PAY_CASE];
                    this._gameObj.updateOliLabel({
                        oli: _GlobalGameData2.default.oli_var,
                        locked_oli: _GlobalGameData2.default.locked_oli_var
                    });
                } else {
                    if (_GlobalGameData2.default.used_oli_var + _GlobalGameData2.default.used_locked_oli_var + _ConstData2.default.PAY_CASE_DATA[_ConstData2.default.PAY_CASE] > 10000) {
                        Tips.show("为了您的资金安全，单次投注最大上限不得超过10000。", "确定", "");
                        return;
                    }
                    _GlobalGameData2.default.used_oli_var += _GlobalGameData2.default.oli_var;
                    _GlobalGameData2.default.oli_var -= _ConstData2.default.PAY_CASE_DATA[_ConstData2.default.PAY_CASE];

                    _GlobalGameData2.default.locked_oli_var += _GlobalGameData2.default.oli_var;
                    _GlobalGameData2.default.used_locked_oli_var -= _GlobalGameData2.default.oli_var;

                    if (_GlobalGameData2.default.oli_var < 0) {
                        _GlobalGameData2.default.oli_var = 0;
                    }
                    this._gameObj.updateOliLabel({
                        oli: _GlobalGameData2.default.oli_var,
                        locked_oli: _GlobalGameData2.default.locked_oli_var
                    });
                }
            } else {
                if (_GlobalGameData2.default.used_locked_oli_var + _ConstData2.default.PAY_CASE_DATA[_ConstData2.default.PAY_CASE] > 10000) {
                    Tips.show("为了您的资金安全，单次投注最大上限不得超过10000。", "确定", "");
                    return;
                }
                _GlobalGameData2.default.locked_oli_var -= _ConstData2.default.PAY_CASE_DATA[_ConstData2.default.PAY_CASE];
                _GlobalGameData2.default.used_locked_oli_var += _ConstData2.default.PAY_CASE_DATA[_ConstData2.default.PAY_CASE];
                this._gameObj.updateOliLabel({
                    oli: _GlobalGameData2.default.oli_var,
                    locked_oli: _GlobalGameData2.default.locked_oli_var
                });
            }
            node_bets.active = true;
            _GlobalGameData2.default.amount_of_cars[customEventData] += _ConstData2.default.PAY_CASE_DATA[_ConstData2.default.PAY_CASE];
            this.updateAmount(_GlobalGameData2.default.amount_of_cars[customEventData], _GlobalGameData2.default.amount_of_cars_others[customEventData]);
            cc.log("已经消耗的U币： " + _GlobalGameData2.default.used_locked_oli_var);
            cc.log("已经消耗的油滴： " + _GlobalGameData2.default.used_oli_var);
        }
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
        //# sourceMappingURL=car_btn.js.map
        