import GlobalGameData from "./data/GlobalGameData";
import Tools from "./tools/Tools";

cc.Class({
    extends: cc.Component,

    properties: {
        myScrollView:
        {
            type: cc.ScrollView,
            default: null
        },
        record_item:
        {
            type: cc.Node,
            default: null
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        var postData = "openId=" + GlobalGameData.openID;
        var self = this;
        Tools.sendHttpRequest("POST", "game/getTrend", postData, function (err, resp) {
            if (!err) {
                self.createItem(resp);
            }
            else {
                cc.log("http request error: " + err);
            }
        });
    },
    onBtnClicked: function (event, eventCustomData) {
        var rootNode = cc.find("Canvas");
        this._gameObj = rootNode.getComponent("game");
        this._gameObj.playBtnSound();
        this.node.destroy();
    },
    createItem(data){
        var totalHeight = 0;
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                let element = data[key];
                let item = cc.instantiate(this.record_item);
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
