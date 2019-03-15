"use strict";
cc._RF.push(module, 'd61b88pNxJD8pg4CfgfbxIe', 'GlobalGameData');
// scrips/data/GlobalGameData.js

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var GlobalGameData = {};
GlobalGameData.openID = "";
GlobalGameData.oli_var = 0; //油滴数
GlobalGameData.locked_oli_var = 0; //U币
GlobalGameData.headImgUrl = ""; //玩家头像
GlobalGameData.timer = 30000; //计时器
GlobalGameData.gameState = 0; //游戏状态0:投注，1:结算

GlobalGameData.used_oli_var = 0; //已使用油滴数
GlobalGameData.used_locked_oli_var = 0; //已使用U币

GlobalGameData.amount_of_cars = { //投注金额
    "car1": 0,
    "car2": 0,
    "car3": 0,
    "car4": 0,
    "car5": 0,
    "car6": 0,
    "car7": 0,
    "car8": 0,
    "car9": 0,
    "car10": 0,
    "car11": 0,
    "car12": 0,
    "carMarket": 0,
    "suvMarket": 0,
    "manualCar": 0,
    "autoCar": 0,
    "manualSuv": 0,
    "autoSuv": 0,
    "save": 0
};
GlobalGameData.amount_of_cars_others = { //他人投注金额
    "car1": 0,
    "car2": 0,
    "car3": 0,
    "car4": 0,
    "car5": 0,
    "car6": 0,
    "car7": 0,
    "car8": 0,
    "car9": 0,
    "car10": 0,
    "car11": 0,
    "car12": 0,
    "carMarket": 0,
    "suvMarket": 0,
    "manualCar": 0,
    "autoCar": 0,
    "manualSuv": 0,
    "autoSuv": 0,
    "save": 0
};
GlobalGameData.game_notice_text = "";
GlobalGameData.game_notice_time_stamp = "";
GlobalGameData.clearMyAmountData = function () {
    for (var key in GlobalGameData.amount_of_cars) {
        if (GlobalGameData.amount_of_cars.hasOwnProperty(key)) {
            GlobalGameData.amount_of_cars[key] = 0;
            // console.log("清空投注数据---> key: " + key + ", value: " + GlobalGameData.amount_of_cars[key]);
        }
    }
};
GlobalGameData.clearOthersAmountData = function () {
    for (var key in GlobalGameData.amount_of_cars_others) {
        if (GlobalGameData.amount_of_cars_others.hasOwnProperty(key)) {
            GlobalGameData.amount_of_cars_others[key] = 0;
            // console.log("清空别人投注数据---> key: " + key + ", value: " + GlobalGameData.amount_of_cars[key]);
        }
    }
};
exports.default = GlobalGameData;
module.exports = exports["default"];

cc._RF.pop();