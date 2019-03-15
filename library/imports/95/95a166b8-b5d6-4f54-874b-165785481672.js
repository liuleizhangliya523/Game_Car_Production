"use strict";
cc._RF.push(module, '95a16a4tdZPVIdLFleFSBZy', 'guide');
// scrips/guide.js

"use strict";

var _GlobalGameData = require("./data/GlobalGameData");

var _GlobalGameData2 = _interopRequireDefault(_GlobalGameData);

var _ConstData = require("./data/ConstData");

var _ConstData2 = _interopRequireDefault(_ConstData);

var _Tools = require("./tools/Tools");

var _Tools2 = _interopRequireDefault(_Tools);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

cc.Class({
    extends: cc.Component,

    properties: {
        layout_step1: {
            type: cc.Layout,
            default: null
        },
        layout_step2: {
            type: cc.Layout,
            default: null
        },
        layout_step3: {
            type: cc.Layout,
            default: null
        },
        layout_step4: {
            type: cc.Layout,
            default: null
        },
        layout_start_game: {
            type: cc.Layout,
            default: null
        },
        music_btn: {
            type: cc.AudioSource,
            default: null
        },
        scroll_view_notice: {
            type: cc.ScrollView,
            default: null
        },
        node_notice: {
            type: cc.Node,
            default: null
        },
        rich_text_notice_content: {
            type: cc.RichText,
            default: null
        }
    },

    // LIFE-CYCLE CALLBACKS:
    onBridgeReady: function onBridgeReady() {
        console.log("guide.js隐藏tool bar");
        WeixinJSBridge.call('showToolbar');
        WeixinJSBridge.call('showOptionMenu');
    },
    onLoad: function onLoad() {
        if (_ConstData2.default.DEBUG) {
            return;
        }
        var useragent = navigator.userAgent;
        if (useragent.match(/MicroMessenger/i) != 'MicroMessenger' && cc.sys.platform == cc.sys.DESKTOP_BROWSER) {
            // 这里警告框会阻塞当前页面继续加载  
            alert('请使用微信打开链接');
            // 以下代码是用javascript强行关闭当前页面  
            var opened = window.open('about:blank', '_self');
            opened.opener = null;
            opened.close();
        }
    },
    reviveShare: function reviveShare() {
        if (cc.sys.platform != cc.sys.WECHAT_GAME) {
            var shareData = {};
            var shareFriends = {};
            var postData = "currUrl=" + window.location.href;
            _Tools2.default.sendHttpRequest("POST", "login/toShare", postData, function (err, resp) {
                if (!err) {
                    console.log("微信分享config");
                    wx.config(resp); //有礼付分享项目传回的信息
                    shareData = {
                        title: '来王牌投资，做金牌投资人！',
                        desc: "油滴快人一步，油费步步快~",
                        link: "https://game.juxinbox.com/trump_investment/login/authorizeShareAppMessage", //分享跳转链接，必须在JS安全域名下！
                        imgUrl: "https://game.juxinbox.com/share.png", //分享图片地址
                        // linkpath + '/share.jsp='+wxId+'&id='+currentId;
                        trigger: function trigger(res) {},
                        success: function success(res) {},
                        cancel: function cancel(res) {},
                        fail: function fail(res) {
                            console.log(res);
                        }
                    };
                    shareFriends = {
                        title: '来王牌投资，做金牌投资人！',
                        desc: '油滴快人一步，油费步步快~',
                        link: "https://game.juxinbox.com/trump_investment/login/authorizeShareTimeline", //分享跳转链接，必须在JS安全域名下！
                        imgUrl: "https://game.juxinbox.com/share.png", //分享图片地址
                        // linkpath + '/share.jsp='+wxId+'&id='+currentId;
                        trigger: function trigger(res) {},
                        success: function success(res) {},
                        cancel: function cancel(res) {},
                        fail: function fail(res) {}
                    };
                    wx.ready(function () {
                        console.log("wx.ready");
                        // if (typeof WeixinJSBridge == "undefined") {
                        //     console.log("WeixinJSBridge undefined.");
                        //     if (document.addEventListener) {
                        //         console.log("WeixinJSBridge document.addEventListener.");
                        //         document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                        //     }
                        //     else if (document.attachEvent) {
                        //         console.log("WeixinJSBridge document.attachEvent.");
                        //         document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                        //         document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                        //     }
                        // }
                        // else {
                        //     this.onBridgeReady();
                        // }
                        wx.onMenuShareAppMessage(shareData);
                        wx.onMenuShareTimeline(shareFriends);
                        wx.hideMenuItems({
                            menuList: ["menuItem:openWithSafari", "menuItem:openWithQQBrowser", "menuItem:copyUrl"] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
                        });
                    });
                    wx.error(function (res) {
                        //alert(JSON.stringify(res));
                    });
                } else {
                    cc.log("http request error: " + err);
                }
            });
        }
    },
    start: function start() {
        var self = this;
        if (cc.sys.isBrowser) {
            var url = window.location.href;
            // console.log("当前页URL：" + url);
            var userKey = url.substring(url.lastIndexOf("userKey=") + "userKey=".length, url.length);

            // var openID = "o4FD4v8834LK4k7t2G5_RV42JnzI";
            // GlobalGameData.openID = openID;

            var postData = "userKey=" + userKey;
            _Tools2.default.sendHttpRequest("POST", "login/getOpenId", postData, function (err, resp) {
                if (!err) {
                    console.log("openID:" + resp.openId);
                    _GlobalGameData2.default.openID = resp.openId;
                    self.reviveShare();
                } else {
                    window.location.href = _ConstData2.default.URL + "login/authorize";
                    cc.log("http request error: " + err);
                    return;
                }
            });
        }
        // cc.sys.localStorage.removeItem("IsFirstPlay");
        var _isFirstPlay = cc.sys.localStorage.getItem("IsFirstPlay");
        if (_isFirstPlay === null || _isFirstPlay === "true") {
            cc.info("IsFirstPlay = " + _isFirstPlay + " 弹出引导");
            this.layout_step1.node.active = true;
        } else {
            // cc.sys.localStorage.setItem("IsFirstPlay", "false");
            cc.info("IsFirstPlay = " + _isFirstPlay + " 跳过引导");
            cc.director.preloadScene("game", function () {
                cc.log("Next scene preloaded");
            });
            this.layout_start_game.node.active = true;
            this.getNotice();
        }
    },

    nextBtnClicked: function nextBtnClicked(event, customEventData) {
        cc.log("点击下一步: " + customEventData);
        this.music_btn.play();
        switch (customEventData) {
            case "1":
                this.layout_step1.node.active = false;
                this.layout_step2.node.active = true;
                break;
            case "2":
                this.layout_step2.node.active = false;
                this.layout_step3.node.active = true;
                cc.director.preloadScene("game", function () {
                    cc.log("Next scene preloaded");
                });
                break;
            case "3":
                this.layout_step3.node.active = false;
                this.layout_step4.node.active = true;
                break;
            case "4":
                this.layout_step4.node.active = false;
                this.layout_start_game.node.active = true;
                this.getNotice();
                cc.sys.localStorage.setItem("IsFirstPlay", "false");
                // cc.director.loadScene("game");
                break;
            default:
                break;
        }
    },
    startGameClicked: function startGameClicked() {
        this.music_btn.play();
        var postData = "openId=" + _GlobalGameData2.default.openID;
        _Tools2.default.sendHttpRequest("POST", "login/searchUser", postData, function (err, resp) {
            if (!err) {
                _GlobalGameData2.default.oli_var = Number(resp.oilNum);
                _GlobalGameData2.default.locked_oli_var = Number(resp.uCoin);
                _GlobalGameData2.default.headImgUrl = resp.headImgUrl;
                console.log(_GlobalGameData2.default.headImgUrl);
                cc.director.loadScene("game");
            } else {
                cc.log("http request error: " + err);
            }
        });
    },
    onNoticeOkClicked: function onNoticeOkClicked() {
        cc.log("公告时间戳： " + _GlobalGameData2.default.game_notice_time_stamp);
        cc.sys.localStorage.setItem("noticeTimeStamp", _GlobalGameData2.default.game_notice_time_stamp);
        this.node_notice.active = false;
    },
    getNotice: function getNotice() {
        //获取公告
        var noticeTimeStamp = cc.sys.localStorage.getItem("noticeTimeStamp");
        _Tools2.default.sendHttpRequest("POST", "game/getNotice", "", function (err, resp) {
            if (!err) {
                _GlobalGameData2.default.game_notice_text = resp.content;

                if (noticeTimeStamp != resp.date) {
                    _GlobalGameData2.default.game_notice_time_stamp = resp.date;
                    this.rich_text_notice_content.string = _GlobalGameData2.default.game_notice_text;
                    var ht = this.rich_text_notice_content.node.height;
                    this.scroll_view_notice.content.height = ht + 60;
                    this.node_notice.active = true;
                    cc.log("弹出公告");
                } else {
                    cc.log("公告已获取过，不弹出");
                }
            } else {
                cc.log("获取公告失败-> http request error: " + err);
                return;
            }
        }.bind(this));
    },

    webViewCallback: function webViewCallback(webview, eventType, customEventData) {
        cc.log("eventType:" + eventType);
    }
    // update (dt) {},
});

cc._RF.pop();