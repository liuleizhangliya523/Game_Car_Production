(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scrips/notice.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '77d58a7lTlAUrRfBa4PfdWr', 'notice', __filename);
// scrips/notice.js

"use strict";

var _GlobalGameData = require("./data/GlobalGameData");

var _GlobalGameData2 = _interopRequireDefault(_GlobalGameData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    loadText: function loadText() {
        this.richText_content.string = _GlobalGameData2.default.game_notice_text;

        var contentHeight = this.richText_content.node.height;
        this.scrollView_text.content.height = contentHeight;
    },
    start: function start() {
        this.loadText();
    },

    onBackButtonClicked: function onBackButtonClicked(event, data) {
        cc.director.loadScene("game");
    }
    // update (dt) {},
}); // Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

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
        //# sourceMappingURL=notice.js.map
        