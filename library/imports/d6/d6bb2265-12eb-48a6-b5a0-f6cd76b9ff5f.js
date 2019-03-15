"use strict";
cc._RF.push(module, 'd6bb2JlEutIprWg9s12uf9f', 'record_layout');
// scrips/record_layout.js

"use strict";

var _GlobalGameData = require("./data/GlobalGameData");

var _GlobalGameData2 = _interopRequireDefault(_GlobalGameData);

var _Tools = require("./tools/Tools");

var _Tools2 = _interopRequireDefault(_Tools);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

cc.Class({
    extends: cc.Component,

    properties: {
        myScrollView: {
            type: cc.ScrollView,
            default: null
        },
        record_item: {
            type: cc.Node,
            default: null
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {
        var postData = "openId=" + _GlobalGameData2.default.openID;
        var self = this;
        _Tools2.default.sendHttpRequest("POST", "game/getTrend", postData, function (err, resp) {
            if (!err) {
                self.createItem(resp);
            } else {
                cc.log("http request error: " + err);
            }
        });
    },

    onBtnClicked: function onBtnClicked(event, eventCustomData) {
        var rootNode = cc.find("Canvas");
        this._gameObj = rootNode.getComponent("game");
        this._gameObj.playBtnSound();
        this.node.destroy();
    },
    createItem: function createItem(data) {
        var totalHeight = 0;
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                var element = data[key];
                var item = cc.instantiate(this.record_item);
                item.active = true;
                item.setPositionX(0);
                this.myScrollView.content.addChild(item);
                item.getComponent('record_item').updateItem(element);
                totalHeight += item.height;
            }
        }
        this.myScrollView.content.height = totalHeight;
    }
    // update (dt) {},

});

cc._RF.pop();