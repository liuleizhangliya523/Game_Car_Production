(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scrips/help_layout.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4ac7atUFtRPi74r/R/I8p/C', 'help_layout', __filename);
// scrips/help_layout.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {},

    start: function start() {},


    onBackButtonClicked: function onBackButtonClicked(event, data) {
        cc.director.loadScene("game");
    }
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
        //# sourceMappingURL=help_layout.js.map
        