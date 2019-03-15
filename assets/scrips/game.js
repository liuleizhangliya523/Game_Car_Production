import ConstData from "./data/ConstData";
import GlobalGameData from "./data/GlobalGameData";
import Tools from "./tools/Tools";
const LEFT_PAY_DAYS = 30000;
var game = cc.Class({
    extends: cc.Component,
    properties: () => ({
        lb_normal_oli: {
            default: null,
            type: cc.Label
        },
        lb_lock_oli: {
            default: null,
            type: cc.Label
        },
        btn_pay_case1: {
            default: null,
            type: cc.Button
        },
        btn_pay_case2: {
            default: null,
            type: cc.Button
        },
        btn_pay_case3: {
            default: null,
            type: cc.Button
        },
        btn_arr: {
            default: null,
            type: cc.Node
        },
        music_bgm: {
            type: cc.AudioSource,
            default: null
        },
        music_btn: {
            type: cc.AudioSource,
            default: null
        },
        music_ani_1: {
            type: cc.AudioSource,
            default: null
        },
        music_ani_2: {
            type: cc.AudioSource,
            default: null
        },
        music_last_target: {
            type: cc.AudioSource,
            default: null
        },
        progressBar_timer: {
            type: cc.ProgressBar,
            default: null
        },
        lb_left_time: {
            type: cc.Label,
            default: null
        },
        layout_result: {
            type: cc.Layout,
            default: null
        },
        spriteFrame_car1: {
            default: null,
            type: cc.SpriteFrame
        },
        spriteFrame_car2: {
            default: null,
            type: cc.SpriteFrame
        },
        spriteFrame_car3: {
            default: null,
            type: cc.SpriteFrame
        },
        spriteFrame_car4: {
            default: null,
            type: cc.SpriteFrame
        },
        spriteFrame_car5: {
            default: null,
            type: cc.SpriteFrame
        },
        spriteFrame_car6: {
            default: null,
            type: cc.SpriteFrame
        },
        spriteFrame_car7: {
            default: null,
            type: cc.SpriteFrame
        },
        spriteFrame_car8: {
            default: null,
            type: cc.SpriteFrame
        },
        spriteFrame_car9: {
            default: null,
            type: cc.SpriteFrame
        },
        spriteFrame_car10: {
            default: null,
            type: cc.SpriteFrame
        },
        spriteFrame_car11: {
            default: null,
            type: cc.SpriteFrame
        },
        spriteFrame_car12: {
            default: null,
            type: cc.SpriteFrame
        },
        spriteFrame_car13: {
            default: null,
            type: cc.SpriteFrame
        },
        sp_head_image_list: {
            default: [],
            type: [cc.Sprite]
        },
        node_moreBtnPanel: {
            default: null,
            type: cc.Node
        },
        rich_text_bounds: {
            default: null,
            type: cc.RichText
        }
    }),

    // LIFE-CYCLE CALLBACKS:
    ctor: function () {
        // 声明实例变量并赋默认值
        this.n_left_timer = LEFT_PAY_DAYS / 1000;
        this.n_progress_var = 0;
        this.b_start_update_progress = false;
        this.car_image_spf_arr = [];
        this.isHelpPrefabLoading = false;
        this.intervNumber = 0;
        this.tmpOliNum = 0;
    },
    onLoad() { },
    //模拟流程
    startAni: function (carKey, isWin) {
        let self = this;
        this.music_ani_1.play();
        let image = cc.find("image", this.layout_result.node);
        let effect = cc.find("imageEffect", this.layout_result.node);
        let richText = cc.find("desc", this.layout_result.node);
        let _particle = cc.find("ptc", this.layout_result.node);
        let _flag = cc.find("flag", this.layout_result.node);
        let _flagText = cc.find("flag/flag_text", this.layout_result.node);
        richText.getComponent(cc.RichText).string = "请等待投资结果";
        effect.active = false;
        _particle.active = false;
        _flag.active = false;
        let idx = 0;
        let maxdrua = 2.4;
        let curdrua = 0;
        let callBack = function () {
            image.getComponent(cc.Sprite).spriteFrame = self.car_image_spf_arr[idx];
            idx++;
            curdrua += 0.1;
            if (idx > 12) {
                idx = 0;
            }
            if (curdrua >= maxdrua) {
                self.layout_result.unschedule(callBack);
                self.music_ani_2.play();


                let randCarIdx = ConstData.getCarIndexByKey(carKey);
                image.getComponent(cc.Sprite).spriteFrame = self.car_image_spf_arr[randCarIdx];
                let name = ConstData.getCarNameByIndex(randCarIdx);

                let randType = randCarIdx > 5 ? 14 : 13;
                let randOperate;
                if (randCarIdx <= 5) {
                    if (randCarIdx <= 2) {
                        //手动档
                        randOperate = 15;
                    }
                    else {
                        //自动挡
                        randOperate = 16;
                    }
                }
                else {
                    if (randCarIdx <= 8) {
                        //手动档
                        randOperate = 17;
                    }
                    else {
                        //自动挡
                        randOperate = 18;
                    }
                }

                let type = ConstData.getCarNameByIndex(randType);
                let operate = ConstData.getCarNameByIndex(randOperate);
                let wholeString = name + "（" + operate + type + "）";
                if (randCarIdx == 12) {
                    wholeString = name;
                }
                if (isWin) {
                    richText.getComponent(cc.RichText).string = "恭喜您\n投资的车型大卖";
                }
                else {
                    richText.getComponent(cc.RichText).string = "很遗憾\n您本轮没有投资大卖车辆";
                }
                _flagText.getComponent(cc.RichText).string = "<outline color=#b12315 width=2><color=#ffed88><b>" + wholeString + "</b></color></outline>";
                effect.active = true;
                _particle.active = true;
                _flag.active = true;
                let action = cc.repeatForever(cc.rotateBy(0.2, 10, 10));
                effect.runAction(action);
                // self.updateOliLabel({
                //     oli: GlobalGameData.oli_var,
                //     locked_oli: GlobalGameData.locked_oli_var
                // });
                self.node.runAction(cc.sequence(cc.delayTime(3), cc.callFunc(function () {
                    if (isWin) {
                        self.runOliLabelAni();
                    }
                    //清空自己投资和他人投资
                    GlobalGameData.clearOthersAmountData();
                    self.clearBuyData();
                    Tips_2.show("准备投资", "请选择您的投资项目", 1, true);
                    self.layout_result.node.active = false;

                    let node = self.btn_arr.children;

                    for (const key in node) {
                        if (node.hasOwnProperty(key)) {
                            var car_btn_scrip = node[key].getComponent("car_btn");
                            var idx = node[key].name;
                            if (idx == ConstData.getCarKeyByIndex(randCarIdx)) {
                                self.music_last_target.play();
                                car_btn_scrip.playArrowAnim(function () {
                                    cc.log("投标动画播完了");
                                    Tips_2.showUI(1.5, function () {
                                        cc.log("走下一轮逻辑");
                                        GlobalGameData.used_oli_var = 0;//已使用油滴数
                                        GlobalGameData.used_locked_oli_var = 0;//已使用绑定油滴数
                                        self.sendQureyStateRequest();
                                        self.sendGetBoundsInfo();
                                        // self.timerController(true);
                                    });
                                });
                                continue;
                            }
                            else if (idx == ConstData.getCarKeyByIndex(randType) && (randCarIdx != 12)) {
                                car_btn_scrip.playArrowAnim(null);
                                continue;
                            }
                            else if (idx == ConstData.getCarKeyByIndex(randOperate) && (randCarIdx != 12)) {
                                car_btn_scrip.playArrowAnim(null);
                                continue;
                            }
                        }
                    }
                }, self)));
            }
        };
        this.layout_result.schedule(callBack, 0.1);
    },
    timer: function (delta) {
        this.n_left_timer -= delta;
        let sec = Math.ceil(this.n_left_timer);
        let randArr;
        let self = this;
        function doOthersPayAction(n) {
            if (self.isRunOthersPay[n]) {
                randArr = Tools.getRandArray(0, 18, 7);
                console.log("模拟别人下注 " + n);
                self.startAllOthersPay(randArr);
                self.isRunOthersPay[n] = false;
            }
        };
        switch (sec) {
            case 24:
                doOthersPayAction(3);
                break;
            case 18:
                doOthersPayAction(2);
                break;
            case 12:
                doOthersPayAction(1);
                break;
            case 6:
                doOthersPayAction(0);
                break;
        }
        if (this.n_left_timer <= 0) {
            this.n_left_timer = 0;
            this.timerController(false);
            //删除所有弹窗
            // this.closeAllPanel();
            Tips.off();
            Tips_2.show("时间已到", "请等待投资结果...", 0);
            this.scheduleOnce(function () {
                let postData = "openId=" + GlobalGameData.openID;
                let notInvestPostData = "openId=" + GlobalGameData.openID;
                let isInvest = false;
                for (const key in GlobalGameData.amount_of_cars) {
                    if (GlobalGameData.amount_of_cars.hasOwnProperty(key)) {
                        postData += "&" + key + "=" + GlobalGameData.amount_of_cars[key];
                        if (GlobalGameData.amount_of_cars[key] != 0) {
                            isInvest = true;
                        }
                    }
                }
                let sendData = "";
                if (isInvest) {
                    sendData = postData += "&isInvest=1";
                }
                else {
                    sendData = notInvestPostData += "&isInvest=0";
                }
                console.log(sendData);
                var self = this;
                Tools.sendHttpRequest("POST", "invest/dealInvest", sendData, function (err, resp) {
                    if (!err) {
                        Tips_2.off();
                        self.layout_result.node.active = true;
                        let isWin = resp.newUCoin > GlobalGameData.locked_oli_var;
                        self.startAni(resp.winCar, isWin);
                        if (isWin) {
                            let winNum = resp.newUCoin - GlobalGameData.locked_oli_var;
                            console.log("赢了" + winNum + "油");
                            self.intervNumber = winNum / 20;
                            self.tmpOliNum = Number(self.lb_lock_oli.string);
                        }
                        GlobalGameData.locked_oli_var = Number(resp.newUCoin);
                    }
                    else {
                        cc.log("http request error: " + err);
                        self.onDropBtnClicked();
                        //清空自己投资和他人投资
                        GlobalGameData.clearOthersAmountData();
                        self.sendQureyStateRequest();
                    }
                });
            }, 1);
        }
        this.updateLeftTimeLable();
    },
    timerController: function (isEnable) {
        if (isEnable) {
            this.n_left_timer = GlobalGameData.timer / 1000;
            this.n_progress_var = LEFT_PAY_DAYS - GlobalGameData.timer;
            this.isRunOthersPay = [true, true, true, true];
            this.updateLeftTimeLable();
            this.schedule(this.timer, 0);
            // this.startAllOthersPay();
        }
        else {
            this.isRunOthersPay = [false, false, false, false];
            this.unschedule(this.timer);
        }
        this.b_start_update_progress = isEnable;
    },
    playBtnSound: function () {
        this.music_btn.play();
    },
    updateLeftTimeLable: function () {
        this.lb_left_time.string = Math.ceil(this.n_left_timer).toString();
    },
    updateOliLabel: function (data) {
        if (this != null) {
            this.lb_normal_oli.string = data.oli.toString();
            this.lb_lock_oli.string = data.locked_oli.toString();
        }
    },
    oliLabelAniScheduler() {
        // let num = Number(this.lb_normal_oli.string);
        this.tmpOliNum += this.intervNumber;
        // num += this.intervNumber;
        this.lb_lock_oli.string = Math.round(this.tmpOliNum).toString();
    },
    runOliLabelAni() {
        this.schedule(this.oliLabelAniScheduler, 0.1, 19);
        let action = cc.repeat(cc.sequence(
            cc.scaleTo(0.2, 1.05),
            cc.scaleTo(0.3, 1),
            cc.scaleTo(0.2, 1.05),
            cc.scaleTo(0.3, 1)
        ), 2);
        this.lb_lock_oli.node.runAction(action);
    },
    updatePayCaseBtn: function () {
        for (const key in this.btn_pay_array) {
            if (this.btn_pay_array.hasOwnProperty(key)) {
                const element = this.btn_pay_array[key];
                if (Number(key) === ConstData.PAY_CASE) {
                    let label = cc.find("label_cost", element.node);
                    element.node.color = cc.hexToColor("#FFFFFF");
                    label.color = cc.hexToColor("#FFFFFF");
                }
                else {
                    let label = cc.find("label_cost", element.node);
                    element.node.color = cc.hexToColor("#8C8282");
                    label.color = cc.hexToColor("#8C8282");
                }
            }
        }
    },
    initData: function () {
        ConstData.PAY_CASE = 0;
        // GlobalGameData.oli_var = 50000;
        // GlobalGameData.locked_oli_var = 50000;
        this.clearBuyData();
    },
    initUI: function () {
        this.updateOliLabel({
            oli: GlobalGameData.oli_var,
            locked_oli: GlobalGameData.locked_oli_var
        });
        this.updatePayCaseBtn();
        this.updateLeftTimeLable();
        this.lb_left_time.string = "??";
        this.car_image_spf_arr.push(this.spriteFrame_car1);
        this.car_image_spf_arr.push(this.spriteFrame_car2);
        this.car_image_spf_arr.push(this.spriteFrame_car3);
        this.car_image_spf_arr.push(this.spriteFrame_car4);
        this.car_image_spf_arr.push(this.spriteFrame_car5);
        this.car_image_spf_arr.push(this.spriteFrame_car6);
        this.car_image_spf_arr.push(this.spriteFrame_car7);
        this.car_image_spf_arr.push(this.spriteFrame_car8);
        this.car_image_spf_arr.push(this.spriteFrame_car9);
        this.car_image_spf_arr.push(this.spriteFrame_car10);
        this.car_image_spf_arr.push(this.spriteFrame_car11);
        this.car_image_spf_arr.push(this.spriteFrame_car12);
        this.car_image_spf_arr.push(this.spriteFrame_car13);
    },
    //开启模拟他人下注
    startAllOthersPay: function (arr) {
        let node = this.btn_arr.children;
        // for (const key in node) {
        //     if (node.hasOwnProperty(key)) {
        //         var car_btn_scrip = node[key].getComponent("car_btn");
        //         car_btn_scrip.setAI_TimerEnable(true);
        //     }
        // }
        for (let idx = 0; idx < arr.length; idx++) {
            const i = arr[idx];
            // let key = ConstData.getCarKeyByIndex(element);
            let car_btn_scrip = node[i].getComponent("car_btn");
            car_btn_scrip.doPayOperation();
        }
    },
    //停用模拟他人下注
    stopAllOthersPay: function () {
        // let node = this.btn_arr.children;
        // for (const key in node) {
        //     if (node.hasOwnProperty(key)) {
        //         var car_btn_scrip = node[key].getComponent("car_btn");
        //         car_btn_scrip.setAI_TimerEnable(false);
        //     }
        // }
    },
    //清空投注数据
    clearBuyData: function () {
        GlobalGameData.clearMyAmountData();
        let node = this.btn_arr.children;

        for (const key in node) {
            if (node.hasOwnProperty(key)) {
                var car_btn_scrip = node[key].getComponent("car_btn");
                var idx = node[key].name;
                if (GlobalGameData.amount_of_cars_others[idx] != 0) {
                    car_btn_scrip.updateAmount("0", null);
                    continue;
                }
                let tip = cc.find("node_bets", node[key]);
                tip.active = false;
            }
        }
    },
    sendQureyStateRequest() {
        var postData = "openId=" + GlobalGameData.openID;
        var self = this;
        Tools.sendHttpRequest("POST", "game/findGameAndUser", postData, function (err, resp) {
            if (!err) {
                Tips_2.off();
                GlobalGameData.timer = resp.nextTime;
                GlobalGameData.gameState = resp.isOpen === "yes" ? 0 : 1;
                if (GlobalGameData.gameState == 0) {;
                    self.updateHeadImage(GlobalGameData.headImgUrl);
                    self.timerController(true);
                    // self.startLamp(resp);
                }
                else {
                    self.timerController(false);
                    self.lb_left_time.string = "??";
                    self.progressBar_timer.progress = 1;
                    Tips_2.scheduleShow("正在结算", "上轮投资结算中 请稍后...", 0, GlobalGameData.timer, function () {
                        self.sendQureyStateRequest();
                    });
                }
            }
            else {
                cc.log("http request error: " + err);
            }
        });
    },
    start() {
        this.music_bgm.loop = true;
        this.music_bgm.play();
        this.btn_pay_array = [];
        this.btn_pay_array.push(this.btn_pay_case1);
        this.btn_pay_array.push(this.btn_pay_case2);
        this.btn_pay_array.push(this.btn_pay_case3);
        this.initData();
        this.initUI();
        this.sendQureyStateRequest();
        // this.runOliLabelAni();
    },
    //按钮监听
    onPayCaseBtnClicked: function (event, customEventData) {
        this.playBtnSound();
        switch (customEventData) {
            case "1":
                ConstData.PAY_CASE = 0;
                break;
            case "2":
                ConstData.PAY_CASE = 1;
                break;
            case "3":
                ConstData.PAY_CASE = 2;
                break;
        }
        cc.info("当前选中档位：" + ConstData.PAY_CASE_DATA[ConstData.PAY_CASE]);
        this.updatePayCaseBtn()
    },
    onDropBtnClicked: function (event, customEventData) {
        cc.info("撤资按钮");
        this.playBtnSound();
        this.clearBuyData();
        GlobalGameData.oli_var += GlobalGameData.used_oli_var;
        GlobalGameData.locked_oli_var += GlobalGameData.used_locked_oli_var;
        GlobalGameData.used_oli_var = GlobalGameData.used_locked_oli_var = 0;
        this.updateOliLabel({
            oli: GlobalGameData.oli_var,
            locked_oli: GlobalGameData.locked_oli_var
        });
    },
    onOtherBtnClicked: function (event, customEventData) {
        this.playBtnSound();
        let prefabPath = "";
        console.log("customEventData : " + customEventData);
        switch (customEventData) {
            case "help":
                cc.info("帮助按钮");
                // prefabPath = "help_layout";
                this.onDropBtnClicked();
                cc.director.loadScene("help");
                return;
            case "record":
                cc.info("走势图按钮");
                prefabPath = "record_layout";
                break;
            case "activity":
                this.onDropBtnClicked();
                cc.director.loadScene("activity");
                return;
            case "more":
                this.node_moreBtnPanel.active = true;
                return;
            case "close_more":
                this.node_moreBtnPanel.active = false;
                return;
            case "notice":
                cc.director.loadScene("notice");
                return;
        }
        if (this.isHelpPrefabLoading)
            return;
        let CanvasNode = cc.find("Canvas");
        if (!CanvasNode) {
            cc.log("Game scene找不到Canvas");
            return;
        }
        let self = this;
        let onResourceLoaded = function (errorMessage, loadedResource) {
            if (errorMessage) {
                cc.log("加载帮助Prefab失败, 原因:" + errorMessage);
                return;
            }
            if (!(loadedResource instanceof cc.Prefab)) {
                cc.log("加载帮助Prefab失败，此实例不是一个Prefab对象");
                return;
            }
            let helpPrefab = cc.instantiate(loadedResource);
            helpPrefab.parent = CanvasNode;
            self.node.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(function () {
                self.isHelpPrefabLoading = false;
            }, self)));
        };
        cc.loader.loadRes(prefabPath, onResourceLoaded);
        this.isHelpPrefabLoading = true;
    },
    closeAllPanel() {
        let record_layout_node = cc.find("Canvas/record_layout");
        let help_layout = cc.find("Canvas/help_layout");
        if (record_layout_node != null) {
            record_layout_node.destroy();
        }
        if (help_layout != null) {
            help_layout.destroy();
        }
    },
    //刷新头像
    updateHeadImage: function (headImgUrl) {
        for (let index = 0; index < this.sp_head_image_list.length; index++) {
            const element = this.sp_head_image_list[index];
            switch (index) {
                case 0:
                    {
                        console.log("微信头像URL： ", headImgUrl);
                        if (headImgUrl === null) {
                            break;
                        }
                        cc.loader.load({ url: ConstData.URL + "login/getPic?u=" + headImgUrl, type: "jpg" }, function (err, texture) {
                            if (err) {
                                cc.log("图片加载失败" + err);
                            }
                            else {
                                cc.log("图片加载成功");
                                let sp = new cc.SpriteFrame(texture);
                                element.getComponent(cc.Sprite).spriteFrame = sp;
                            }
                        });
                    }
                    break;
                case 1:
                    {
                        const randIndex = Tools.rand(1, 128);
                        let l1url = "https://juxinbox.oss-cn-hangzhou.aliyuncs.com/games/head_" + randIndex + ".jpg";
                        console.log("左1头像URL： ", l1url);
                        cc.loader.load({ url: ConstData.URL + "login/getPic?u=" + l1url, type: "jpg" }, function (err, texture) {
                            if (err) {
                                cc.log("图片加载失败" + err);
                            }
                            else {
                                cc.log("图片加载成功");
                                let sp = new cc.SpriteFrame(texture);
                                element.getComponent(cc.Sprite).spriteFrame = sp;
                            }
                        });
                    }
                    break;
                case 2:
                    {
                        const randIndex = Tools.rand(129, 256);
                        let l2url = "https://juxinbox.oss-cn-hangzhou.aliyuncs.com/games/head_" + randIndex + ".jpg";
                        console.log("左2头像URL： ", l2url);
                        cc.loader.load({ url: ConstData.URL + "login/getPic?u=" + l2url, type: "jpg" }, function (err, texture) {
                            if (err) {
                                cc.log("图片加载失败" + err);
                            }
                            else {
                                cc.log("图片加载成功");
                                let sp = new cc.SpriteFrame(texture);
                                element.getComponent(cc.Sprite).spriteFrame = sp;
                            }
                        });
                    }
                    break;
                case 3:
                    {
                        const randIndex = Tools.rand(257, 384);
                        let r1url = "https://juxinbox.oss-cn-hangzhou.aliyuncs.com/games/head_" + randIndex + ".jpg";
                        console.log("右1头像URL： ", r1url);
                        cc.loader.load({ url: ConstData.URL + "login/getPic?u=" + r1url, type: "jpg" }, function (err, texture) {
                            if (err) {
                                cc.log("图片加载失败" + err);
                            }
                            else {
                                cc.log("图片加载成功");
                                let sp = new cc.SpriteFrame(texture);
                                element.getComponent(cc.Sprite).spriteFrame = sp;
                            }
                        });
                    }
                    break;
                case 4:
                    {
                        const randIndex = Tools.rand(385, 514);
                        let r2url = "https://juxinbox.oss-cn-hangzhou.aliyuncs.com/games/head_" + randIndex + ".jpg";
                        console.log("右2头像URL： ", r2url);
                        cc.loader.load({ url: ConstData.URL + "login/getPic?u=" + r2url, type: "jpg" }, function (err, texture) {
                            if (err) {
                                cc.log("图片加载失败" + err);
                            }
                            else {
                                cc.log("图片加载成功");
                                let sp = new cc.SpriteFrame(texture);
                                element.getComponent(cc.Sprite).spriteFrame = sp;
                            }
                        });
                    }
                    break;
                default:
                    break;
            }
        }
    },
    //跑马灯控制
    sendGetBoundsInfo() {
        Tools.sendHttpRequest("POST", "game/getMessage", "", function (err, resp) {
            if (!err) {
                this.startLamp(resp)
            }
            else {
                cc.log("http request error: " + err);
            }
        }.bind(this));
    },
    startLamp(resp) {
        let num = resp.sendNum;
        if (typeof num == "undefined" || num == "0")
            return;
        let str = "";
        let name = resp.firstName;
        let coinNo = resp.firstContent;
        str = "<color=#ffffff>恭喜 " + decodeURI(name) + " 获得 </color><color=#ffe329>" + coinNo + " U币</color>";
        if (num == 2) {
            let name = resp.secondName;
            let coinNo = resp.secondContent;
            str += "        <color=#ffffff>恭喜 " + decodeURI(name) + " 获得 </color><color=#ffe329>" + coinNo + " U币</color>";
        }
        // str = "玩家AA获得了1000U币     玩家bc获得了2000U币";
        this.rich_text_bounds.string = str;
        let w = this.rich_text_bounds.node.width;
        let offX = -(w);
        this.rich_text_bounds.node.x = 470;
        this.rich_text_bounds.node.runAction(cc.moveTo(15, cc.v2(offX, 0)));
    },
    stopLamp() {

    },
    lampController() {

    },
    update(dt) {
        if (this.b_start_update_progress) {
            this.n_progress_var += (dt * 1000);
            this.progressBar_timer.progress = this.n_progress_var / LEFT_PAY_DAYS;
        }
    },
});
module.exports = game;