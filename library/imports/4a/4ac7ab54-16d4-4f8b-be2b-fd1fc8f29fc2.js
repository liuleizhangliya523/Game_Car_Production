"use strict";
cc._RF.push(module, '4ac7atUFtRPi74r/R/I8p/C', 'help_layout');
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