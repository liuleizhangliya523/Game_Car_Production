
cc.Class({
    extends: cc.Component,

    properties: {
        spf_waiting:
        {
            type: cc.SpriteFrame,
            default: null
        },
        spf_ready:
        {
            type: cc.SpriteFrame,
            default: null
        },
        spf_waiting:
        {
            type: cc.SpriteFrame,
            default: null
        },
        sp_icon:
        {
            type: cc.Sprite,
            default: null
        },
        lb_desc:
        {
            type: cc.RichText,
            default: null
        },
        lb_title:
        {
            type: cc.RichText,
            default: null
        },
        sp_bg:
        {
            type: cc.Sprite,
            default: null
        },
        sp_bg_inner:
        {
            type: cc.Sprite,
            default: null
        },
        layout_mask:
        {
            type: cc.Layout,
            default: null
        },
        sp_title_bg:
        {
            type: cc.Sprite,
            default: null
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    ctor: function () {
        this.lbCountDownCallFunc = null;
    },
    start() {
    },
    setIcon(type) {
        if (type === 0) {
            this.sp_icon.spriteFrame = this.spf_waiting;
        }
        else if (type === 1) {
            this.sp_icon.spriteFrame = this.spf_ready;
        }
    },
    setTitle(text) {
        let tmp_string = "<b>" + text + "</b>"
        this.lb_title.string = tmp_string;
    },
    setText(text) {
        this.lb_desc.string = text;
    },
    setVisibleUI(is) {
        if (is) {
            this.sp_bg.node.active = true;
            this.sp_bg_inner.node.active = true;
            this.layout_mask.node.active = true;
            this.lb_title.node.active = true;
            this.lb_desc.node.active = true;
            this.sp_icon.node.active = true;
            this.sp_title_bg.node.active = true;
        }
        else {
            this.sp_bg.node.active = false;
            this.sp_bg_inner.node.active = false;
            this.layout_mask.node.active = false;
            this.lb_title.node.active = false;
            this.lb_desc.node.active = false;
            this.sp_icon.node.active = false;
            this.sp_title_bg.node.active = false;
        }
    },
    startLabelCountDown(func) {
        this.lbCountDownCallFunc = func;
        if (this.lbCountDownCallFunc) {
            this.lb_desc.schedule(this.lbCountDownCallFunc, 0)
        }
    },
    stopLabelCountDown() {
        this.lb_desc.unschedule(this.lbCountDownCallFunc);
        this.lbCountDownCallFunc = null;
    },
    // update (dt) {},
});
