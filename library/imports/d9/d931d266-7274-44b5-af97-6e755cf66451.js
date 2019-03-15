"use strict";
cc._RF.push(module, 'd931dJmcnREta+XbnVc9mRR', 'gameTips');
// scrips/tools/gameTips.js

"use strict";

var _properties;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

cc.Class({
    extends: cc.Component,

    properties: (_properties = {
        spf_waiting: {
            type: cc.SpriteFrame,
            default: null
        },
        spf_ready: {
            type: cc.SpriteFrame,
            default: null
        }
    }, _defineProperty(_properties, "spf_waiting", {
        type: cc.SpriteFrame,
        default: null
    }), _defineProperty(_properties, "sp_icon", {
        type: cc.Sprite,
        default: null
    }), _defineProperty(_properties, "lb_desc", {
        type: cc.RichText,
        default: null
    }), _defineProperty(_properties, "lb_title", {
        type: cc.RichText,
        default: null
    }), _defineProperty(_properties, "sp_bg", {
        type: cc.Sprite,
        default: null
    }), _defineProperty(_properties, "sp_bg_inner", {
        type: cc.Sprite,
        default: null
    }), _defineProperty(_properties, "layout_mask", {
        type: cc.Layout,
        default: null
    }), _defineProperty(_properties, "sp_title_bg", {
        type: cc.Sprite,
        default: null
    }), _properties),

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    ctor: function ctor() {
        this.lbCountDownCallFunc = null;
    },
    start: function start() {},
    setIcon: function setIcon(type) {
        if (type === 0) {
            this.sp_icon.spriteFrame = this.spf_waiting;
        } else if (type === 1) {
            this.sp_icon.spriteFrame = this.spf_ready;
        }
    },
    setTitle: function setTitle(text) {
        var tmp_string = "<b>" + text + "</b>";
        this.lb_title.string = tmp_string;
    },
    setText: function setText(text) {
        this.lb_desc.string = text;
    },
    setVisibleUI: function setVisibleUI(is) {
        if (is) {
            this.sp_bg.node.active = true;
            this.sp_bg_inner.node.active = true;
            this.layout_mask.node.active = true;
            this.lb_title.node.active = true;
            this.lb_desc.node.active = true;
            this.sp_icon.node.active = true;
            this.sp_title_bg.node.active = true;
        } else {
            this.sp_bg.node.active = false;
            this.sp_bg_inner.node.active = false;
            this.layout_mask.node.active = false;
            this.lb_title.node.active = false;
            this.lb_desc.node.active = false;
            this.sp_icon.node.active = false;
            this.sp_title_bg.node.active = false;
        }
    },
    startLabelCountDown: function startLabelCountDown(func) {
        this.lbCountDownCallFunc = func;
        if (this.lbCountDownCallFunc) {
            this.lb_desc.schedule(this.lbCountDownCallFunc, 0);
        }
    },
    stopLabelCountDown: function stopLabelCountDown() {
        this.lb_desc.unschedule(this.lbCountDownCallFunc);
        this.lbCountDownCallFunc = null;
    }
}
// update (dt) {},
);

cc._RF.pop();