// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
import GlobalGameData from "./data/GlobalGameData";
cc.Class({
    extends: cc.Component,

    properties: {
        richText_content: {
            type: cc.Label,
            default: null
        },
        scrollView_text: {
            type: cc.ScrollView,
            default: null
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    loadText() {
        this.richText_content.string = GlobalGameData.game_notice_text;

        let contentHeight = this.richText_content.node.height;
        this.scrollView_text.content.height = contentHeight;
    },
    start() {
        this.loadText();
    },
    onBackButtonClicked: function (event, data) {
        cc.director.loadScene("game");
    }
    // update (dt) {},
});
