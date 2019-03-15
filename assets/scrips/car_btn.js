import ConstData from "./data/ConstData";
import GlobalGameData from "./data/GlobalGameData";
import Tools from "./tools/Tools";

cc.Class({
    extends: cc.Component,
    properties: () => ({

    }),
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
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
    doPayOperation: function () {
        // const randRate_isAdd = Tools.rand(0, 9);
        // const randRate_case = Tools.rand(0, 2);
        const rand_cost_rate = Tools.rand(1, 12);
        const rand_amount = 100 * rand_cost_rate;
        var key = this.node.name;//组件名其实就是数据对应的key

        GlobalGameData.amount_of_cars_others[key] += rand_amount;
        let node_bets = cc.find("node_bets", this.node);
        node_bets.active = true;
        this.updateAmount(GlobalGameData.amount_of_cars[key], GlobalGameData.amount_of_cars_others[key]);

    },
    //更新投注金额UI
    updateAmount: function (my, total) {
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
    playArrowAnim: function (callBack) {
        let self = this;
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
    btn_clickedCallBack: function (event, customEventData) {
        let node = event.target;
        let node_bets = cc.find("node_bets", node);
        console.log("投注：" + customEventData + " 当前金额：" + ConstData.PAY_CASE_DATA[ConstData.PAY_CASE]);

        let _totalOli = GlobalGameData.locked_oli_var + GlobalGameData.oli_var;
        this._gameObj.playBtnSound();
        if (_totalOli < ConstData.PAY_CASE_DATA[ConstData.PAY_CASE]) {
            Tips.show("您的余额不足\n请充值后继续参与", "点击充值>>", "https://prodone.juxinbox.com/sinopecGameCt/weixinMng/ManageC/chargeOilIn.htm?back_url=https://game.juxinbox.com/trump_investment/login/authorize");
            //弹出剩余油滴不足
        } else {
            //先判断绑定油滴
            if (GlobalGameData.oli_var > 0) {
                if (GlobalGameData.oli_var >= ConstData.PAY_CASE_DATA[ConstData.PAY_CASE]) {
                    if (GlobalGameData.used_oli_var + ConstData.PAY_CASE_DATA[ConstData.PAY_CASE] > 10000) {
                        Tips.show("为了您的资金安全，单次投注最大上限不得超过10000。", "确定", "");
                        return;
                    }
                    GlobalGameData.oli_var -= ConstData.PAY_CASE_DATA[ConstData.PAY_CASE];
                    GlobalGameData.used_oli_var += ConstData.PAY_CASE_DATA[ConstData.PAY_CASE];
                    this._gameObj.updateOliLabel({
                        oli: GlobalGameData.oli_var,
                        locked_oli: GlobalGameData.locked_oli_var
                    });
                } else {
                    if (GlobalGameData.used_oli_var + GlobalGameData.used_locked_oli_var + ConstData.PAY_CASE_DATA[ConstData.PAY_CASE] > 10000) {
                        Tips.show("为了您的资金安全，单次投注最大上限不得超过10000。", "确定", "");
                        return;
                    }
                    GlobalGameData.used_oli_var += GlobalGameData.oli_var;
                    GlobalGameData.oli_var -= ConstData.PAY_CASE_DATA[ConstData.PAY_CASE];

                    GlobalGameData.locked_oli_var += GlobalGameData.oli_var;
                    GlobalGameData.used_locked_oli_var -= GlobalGameData.oli_var;

                    if (GlobalGameData.oli_var < 0) {
                        GlobalGameData.oli_var = 0;
                    }
                    this._gameObj.updateOliLabel({
                        oli: GlobalGameData.oli_var,
                        locked_oli: GlobalGameData.locked_oli_var
                    });
                }
            } else {
                if (GlobalGameData.used_locked_oli_var + ConstData.PAY_CASE_DATA[ConstData.PAY_CASE] > 10000) {
                    Tips.show("为了您的资金安全，单次投注最大上限不得超过10000。", "确定", "");
                    return;
                }
                GlobalGameData.locked_oli_var -= ConstData.PAY_CASE_DATA[ConstData.PAY_CASE];
                GlobalGameData.used_locked_oli_var += ConstData.PAY_CASE_DATA[ConstData.PAY_CASE];
                this._gameObj.updateOliLabel({
                    oli: GlobalGameData.oli_var,
                    locked_oli: GlobalGameData.locked_oli_var
                });
            }
            node_bets.active = true;
            GlobalGameData.amount_of_cars[customEventData] += ConstData.PAY_CASE_DATA[ConstData.PAY_CASE];
            this.updateAmount(GlobalGameData.amount_of_cars[customEventData], GlobalGameData.amount_of_cars_others[customEventData]);
            cc.log("已经消耗的U币： " + GlobalGameData.used_locked_oli_var);
            cc.log("已经消耗的油滴： " + GlobalGameData.used_oli_var);
        }
    }
    // update (dt) {},
});