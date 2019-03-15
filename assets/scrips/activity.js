import ConstData from "./data/ConstData";
import GlobalGameData from "./data/GlobalGameData";
import Tools from "./tools/Tools";
const TAB_COLOR =
    [
        cc.color(133, 179, 255, 255),
        cc.color(255, 214, 90, 255)
    ]
cc.Class({
    extends: cc.Component,

    properties: {
        lb_btn1:
        {
            default: null,
            type: cc.Label
        },
        lb_btn2:
        {
            default: null,
            type: cc.Label
        },
        sp_head_arr_node1:
        {
            default: [],
            type: [cc.Sprite]
        },
        lb_name_arr_node1:
        {
            default: [],
            type: [cc.Label]
        },
        lb_oli_arr_node1:
        {
            default: [],
            type: [cc.Label]
        },
        sp_head_arr_node2:
        {
            default: [],
            type: [cc.Sprite]
        },
        lb_name_arr_node2:
        {
            default: [],
            type: [cc.Label]
        },
        lb_oli_arr_node2:
        {
            default: [],
            type: [cc.Label]
        },
        node_1:
        {
            default: null,
            type: cc.Node
        },
        node_2:
        {
            default: null,
            type: cc.Node
        },
        lb_getting_data:
        {
            default: null,
            type: cc.Label
        },
        lb_my_lost:
        {
            default: null,
            type: cc.Label
        },
        lb_my_win:
        {
            default: null,
            type: cc.Label
        },
        lb_activity_date:
        {
            default: null,
            type: cc.Label
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    ctor: function () {
        this.tabIndex = 0;
        this.isGetData = true;
    },

    start() {
        this.updateTab();
        var self = this;
        var postData = "openId=" + GlobalGameData.openID;
        Tools.sendHttpRequest("POST", "game/getFestival", postData, function (err, resp) {
            if (!err) {
                //最阔气（总消耗）
                let lostNickName1 = decodeURI(resp.lostNickName1);
                let lostHeadImgUrl1 = resp.lostHeadImgUrl1;
                let lostAllLost1 = resp.lostAllLost1;
                if (typeof lostNickName1 != "undefined" &&
                    typeof lostHeadImgUrl1 != "undefined" &&
                    typeof lostAllLost1 != "undefined") {
                    self.lb_name_arr_node2[0].string = lostNickName1;
                    self.loadHeadImage(lostHeadImgUrl1, self.sp_head_arr_node2[0]);
                    self.lb_oli_arr_node2[0].string = lostAllLost1 + "油滴";
                }

                let lostNickName2 = decodeURI(resp.lostNickName2);
                let lostHeadImgUrl2 = resp.lostHeadImgUrl2;
                let lostAllLost2 = resp.lostAllLost2;
                if (typeof lostNickName2 != "undefined" &&
                    typeof lostHeadImgUrl2 != "undefined" &&
                    typeof lostAllLost2 != "undefined") {
                    self.lb_name_arr_node2[1].string = lostNickName2;
                    self.loadHeadImage(lostHeadImgUrl2, self.sp_head_arr_node2[1]);
                    self.lb_oli_arr_node2[1].string = lostAllLost2 + "油滴";
                }

                let lostNickName3 = decodeURI(resp.lostNickName3);
                let lostHeadImgUrl3 = resp.lostHeadImgUrl3;
                let lostAllLost3 = resp.lostAllLost3;
                if (typeof lostNickName3 != "undefined" &&
                    typeof lostHeadImgUrl3 != "undefined" &&
                    typeof lostAllLost3 != "undefined") {
                    self.lb_name_arr_node2[2].string = lostNickName3;
                    self.loadHeadImage(lostHeadImgUrl3, self.sp_head_arr_node2[2]);
                    self.lb_oli_arr_node2[2].string = lostAllLost3 + "油滴";
                }

                let myAllLost = resp.myAllLost;
                if (typeof myAllLost != "undefined") {
                    self.lb_my_lost.string = myAllLost;
                }
                //最具眼光（赢得最多）
                let winNickName1 = decodeURI(resp.winNickName1);
                let winHeadImgUrl1 = resp.winHeadImgUrl1;
                let winWinMax1 = resp.winWinMax1;
                if (typeof winNickName1 != "undefined" &&
                    typeof winHeadImgUrl1 != "undefined" &&
                    typeof winWinMax1 != "undefined") {
                    self.lb_name_arr_node1[0].string = winNickName1;
                    self.loadHeadImage(winHeadImgUrl1, self.sp_head_arr_node1[0]);
                    self.lb_oli_arr_node1[0].string = winWinMax1 + "油滴";
                }

                let winNickName2 = decodeURI(resp.winNickName2);
                let winHeadImgUrl2 = resp.winHeadImgUrl2;
                let winWinMax2 = resp.winWinMax2;
                if (typeof winNickName2 != "undefined" &&
                    typeof winHeadImgUrl2 != "undefined" &&
                    typeof winWinMax2 != "undefined") {
                    self.lb_name_arr_node1[1].string = winNickName2;
                    self.loadHeadImage(winHeadImgUrl2, self.sp_head_arr_node1[1]);
                    self.lb_oli_arr_node1[1].string = winWinMax2 + "油滴";
                }

                let winNickName3 = decodeURI(resp.winNickName3);
                let winHeadImgUrl3 = resp.winHeadImgUrl3;
                let winWinMax3 = resp.winWinMax3;
                if (typeof winNickName3 != "undefined" &&
                    typeof winHeadImgUrl3 != "undefined" &&
                    typeof winWinMax3 != "undefined") {
                    self.lb_name_arr_node1[2].string = winNickName3;
                    self.loadHeadImage(winHeadImgUrl3, self.sp_head_arr_node1[2]);
                    self.lb_oli_arr_node1[2].string = winWinMax3 + "油滴";
                }

                let winNickName4 = decodeURI(resp.winNickName4);
                let winHeadImgUrl4 = resp.winHeadImgUrl4;
                let winWinMax4 = resp.winWinMax4;
                if (typeof winNickName4 != "undefined" &&
                    typeof winHeadImgUrl4 != "undefined" &&
                    typeof winWinMax4 != "undefined") {
                    self.lb_name_arr_node1[3].string = winNickName4;
                    self.loadHeadImage(winHeadImgUrl4, self.sp_head_arr_node1[3]);
                    self.lb_oli_arr_node1[3].string = winWinMax4 + "油滴";
                }

                let winNickName5 = decodeURI(resp.winNickName5);
                let winHeadImgUrl5 = resp.winHeadImgUrl5;
                let winWinMax5 = resp.winWinMax5;
                if (typeof winNickName5 != "undefined" &&
                    typeof winHeadImgUrl5 != "undefined" &&
                    typeof winWinMax5 != "undefined") {
                    self.lb_name_arr_node1[4].string = winNickName5;
                    self.loadHeadImage(winHeadImgUrl5, self.sp_head_arr_node1[4]);
                    self.lb_oli_arr_node1[4].string = winWinMax5 + "油滴";
                }

                let myMaxWin = resp.myMaxWin;
                if (typeof myMaxWin != "undefined") {
                    self.lb_my_win.string = myMaxWin;
                }

                //活动状态
                let _activityStatus = resp.isFestival;
                (typeof _activityStatus == "undefined") || _activityStatus == 0 ?
                    self.lb_activity_date.string = "本次活动已结束" :
                    self.lb_activity_date.string = "活动时间 2018.8.3--8.7";
                self.updateTab();
            }
            else {
                cc.log("http request error: " + err);
            }
        });
    },
    loadHeadImage(imageUrl, headSprite) {
        cc.loader.load({ url: ConstData.URL + "login/getPic?u=" + imageUrl, type: "jpg" }, function (err, texture) {
            if (err) {
                cc.log("图片加载失败" + err);
            }
            else {
                cc.log("图片加载成功");
                let sp = new cc.SpriteFrame(texture);
                headSprite.getComponent(cc.Sprite).spriteFrame = sp;
            }
        });
    },
    updateContent() {
        if (!this.isGetData) {
            return;
        }
        switch (this.tabIndex) {
            case 0:
                this.node_1.active = true;
                this.node_2.active = false;
                break;
            case 1:
                this.node_1.active = false;
                this.node_2.active = true;
                break;
        }
    },
    updateTab() {
        this.lb_btn1.node.color = TAB_COLOR[0];
        this.lb_btn2.node.color = TAB_COLOR[0];
        switch (this.tabIndex) {
            case 0:
                this.lb_btn1.node.color = TAB_COLOR[1];
                this.updateContent();
                break;
            case 1:
                this.lb_btn2.node.color = TAB_COLOR[1];
                this.updateContent();
                break;
        }
    },
    btnClickedCallBack(event, customEventData) {
        switch (customEventData) {
            case "back":
                cc.director.loadScene("game");
                break;
            case "tab1":
                this.tabIndex = 0;
                this.updateTab();
                break;
            case "tab2":
                this.tabIndex = 1;
                this.updateTab();
                break
            default:
                break;
        }
    }
    // update (dt) {},
});
