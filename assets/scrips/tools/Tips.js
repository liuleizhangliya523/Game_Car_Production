var Tips = {};

Tips.pTips = null;
Tips.pLabel = null;
Tips.pSprite = null;
Tips.pButton = null;
Tips.pCloseButton = null;
Tips.pButtonStr = null;
Tips.isLoading = false;
// Tips.dura = 1;

//参数说明 showString 显示字符串， dura 持续时间
Tips.off = function () {
    if (Tips.pTips) {
        Tips.pTips.destroy();
        Tips.pLabel = null;
        Tips.pTips = null;
        Tips.pButton = null;
        Tips.pCloseButton = null;
        Tips.pButtonStr = null;
        Tips.isLoading = false;
    }
}
Tips.show = function (showString, btnString, gotoUrl) {
    if (Tips.isLoading) {
        return;
    }
    var self = this;
    if (Tips.pTips != null) {
        Tips.pTips.destroy();
        Tips.pLabel = null;
        // Tips.pSprite = null;
        // Tips.dura = 1;
        Tips.pButton = null;

        Tips.pCloseButton = null;
        Tips.pButtonStr = null;
        Tips.pTips = null;
        Tips.isLoading = false;
    }
    // Tips.dura = dura ? dura : Tips.dura;
    Tips.isLoading = true;
    cc.loader.loadRes("globalTip", cc.Prefab, function (error, prefab) {
        if (error) {
            Tips.isLoading = false;
            cc.error(error);
            return;
        }
        else {
            cc.log("Tips加载成功");
            // 实例 
            var tips = cc.instantiate(prefab);
            Tips.pTips = tips;

            // Tips.pSprite = cc.find("windowbg", tips).getComponent(cc.Sprite);
            // Tips.pSprite.size = cc.v2(500, 100);
            Tips.pButtonStr = cc.find("Button/btn_label", tips).getComponent(cc.Label);;
            Tips.pButtonStr.string = btnString;

            Tips.pLabel = cc.find("desc", tips).getComponent(cc.Label);
            Tips.pLabel.string = showString;

            Tips.pButton = cc.find("Button", tips).getComponent(cc.Button);
            Tips.pButton.node.on("click", function () {
                cc.log("移除Tips");
                Tips.pTips.destroy();
                Tips.pLabel = null;
                Tips.pButton = null;
                Tips.pTips = null;
                Tips.isLoading = false;
                if (gotoUrl != "") {
                    window.location.href = gotoUrl; 
                }
            }, this);

            Tips.pCloseButton = cc.find("closeButton", tips).getComponent(cc.Button);
            Tips.pCloseButton.node.on("click", function () {
                Tips.off();
            }, this);

            Tips.pTips.parent = cc.find("Canvas");
        }
    });
}