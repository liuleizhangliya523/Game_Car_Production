"use strict";
cc._RF.push(module, '85047k/bHRLVIs6qMfTepCI', 'Tools');
// scrips/tools/Tools.js

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ConstData = require("./../data/ConstData");

var _ConstData2 = _interopRequireDefault(_ConstData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tools = {};
// _httpHandler.responseType = "json";
Tools.rand = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};
Tools.getRandArray = function (min, max, n) {
    var numbers = [];
    var out = [];
    var i = 0;
    for (var index = min; index <= max; index++) {
        numbers[i] = index;
        i++;
    }
    for (var _i = 0; _i < n; _i++) {
        var outIdx = Tools.rand(0, max - _i) + _i;

        var tmp = numbers[_i];
        numbers[_i] = numbers[outIdx];
        numbers[outIdx] = tmp;

        out[_i] = numbers[_i];
    }
    return out;
};

Tools.sendHttpRequest = function (type, cmd, data, callBack) {
    {
        var _httpHandler = cc.loader.getXMLHttpRequest();
        var wholeURL = _ConstData2.default.URL + cmd;
        // _httpHandler.timeout = 5000;

        if (_httpHandler != null) {
            var error = {};
            error.code = -1;
            error.msg = "";
            error.status = 0;
            // ['loadstart', 'abort', 'error', 'load', 'loadend', 'timeout'].forEach(function (eventname) {
            //     _httpHandler["on" + eventname] = function (target, type) {
            //         console.log("Event : " + eventname);
            //     };
            // });
            _httpHandler.onreadystatechange = function () {
                console.log("readyState: " + _httpHandler.readyState + " status: " + _httpHandler.status);
                if (_httpHandler.readyState == 4 && _httpHandler.status >= 200 && _httpHandler.status < 400) {
                    var response = _httpHandler.response;
                    console.log(response);
                    if (callBack != null) {
                        var _respObj = JSON.parse(response);
                        if (typeof _respObj == "string") {
                            _respObj = JSON.parse(_respObj);
                        }
                        if (_respObj.code == 1) {
                            if (_respObj.msg === "停服") {
                                Tips_2.show("Notice", "Server disconnected", 0);
                            } else {
                                var data = _respObj.data;
                                if (!_respObj.data) {
                                    data = _respObj.resultObject;
                                }
                                callBack(null, data);
                            }
                        } else {
                            callBack(_respObj.msg, _respObj.data);
                        }
                    }
                }
            };
            _httpHandler.open(type, wholeURL, true);
            _httpHandler.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            console.log("Send params  : " + data);
            _httpHandler.send(data);
        }
    }
};
exports.default = Tools;
module.exports = exports["default"];

cc._RF.pop();