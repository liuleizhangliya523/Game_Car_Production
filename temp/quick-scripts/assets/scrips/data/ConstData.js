(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scrips/data/ConstData.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'f283c89VgZKCLKtCk52XF5e', 'ConstData', __filename);
// scrips/data/ConstData.js

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var ConstData = {};
ConstData.DEBUG = false;
if (ConstData.DEBUG) {
    ConstData.URL = "http://tdev.juxinbox.com/trump_investment/"; //测试服
} else {
    ConstData.URL = "https://game.juxinbox.com/trump_investment/"; //正式服
}
ConstData.PAY_CASE_DATA = [];
ConstData.PAY_CASE_DATA[0] = 10;
ConstData.PAY_CASE_DATA[1] = 100;
ConstData.PAY_CASE_DATA[2] = 500;
ConstData.PAY_CASE = 0;
ConstData.CAR_NAME = [//他人投注金额
{ key: "car1", name: "宝玛" }, { key: "car2", name: "本填" }, { key: "car3", name: "别客" }, { key: "car4", name: "澳迪" }, { key: "car5", name: "奔瓷" }, { key: "car6", name: "彪志" }, { key: "car7", name: "伏特" }, { key: "car8", name: "宝俊" }, { key: "car9", name: "启瑞" }, { key: "car10", name: "陆虎" }, { key: "car11", name: "铃目" }, { key: "car12", name: "山菱" }, { key: "save", name: "保护基金" }, { key: "carMarket", name: "轿车" }, { key: "suvMarket", name: "SUV" }, { key: "manualCar", name: "手动型" }, { key: "autoCar", name: "自动型" }, { key: "manualSuv", name: "手动型" }, { key: "autoSuv", name: "自动型" }];
ConstData.getCarNameByKey = function (key) {
    var ele = ConstData.CAR_NAME.find(function (e) {
        return e.key === key;
    });
    if (ele != undefined) {
        return ele.name;
    } else {
        return "";
    }
};
ConstData.getCarNameByIndex = function (idx) {
    var ele = ConstData.CAR_NAME.find(function (e, index) {
        return index === idx;
    });
    if (ele != undefined) {
        return ele.name;
    } else {
        return "";
    }
};
ConstData.getCarKeyByIndex = function (idx) {
    var ele = ConstData.CAR_NAME.find(function (e, index) {
        return index === idx;
    });
    if (ele != undefined) {
        return ele.key;
    } else {
        return "";
    }
};
ConstData.getCarIndexByKey = function (key) {
    var retIndex = -1;
    ConstData.CAR_NAME.find(function (e, index) {
        if (key === e.key) {
            retIndex = index;
            return true;
        } else {
            return false;
        }
    });
    return retIndex;
};
exports.default = ConstData;
module.exports = exports["default"];

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
        //# sourceMappingURL=ConstData.js.map
        