var Tips_2 = {};

Tips_2.pTips = null;
Tips_2.off = function () {
    if (Tips_2.pTips == null) {
        return;
    }
    Tips_2.pTips.destroy();
    Tips_2.isHideUI = false;
    Tips_2.num = 0;
};
Tips_2.showUI = function (dura, callBack) {
    // if (Tips_2.pLabel != null) {
    //     Tips_2.pLabel.node.active = true;
    // }
    // if (Tips_2.pSprite != null) {
    //     Tips_2.pSprite.node.active = true;
    // }
    // if (Tips_2.pLayout != null) {
    //     Tips_2.pLayout.node.active = true;
    // }
    if (Tips_2.pTips != null) {
        var _script = Tips_2.pTips.getComponent("gameTips");
        _script.setVisibleUI(true);
        var action = cc.sequence(cc.delayTime(dura), cc.callFunc(function () {
            if (callBack != null) {
                Tips_2.off();
                callBack();
            }
        }, Tips_2.pTips));
        Tips_2.pTips.runAction(action);
    }
};
//参数说明 showString 显示字符串， dura 持续时间
Tips_2.show = function (title, showString, imgType, isHideUI) {
    var self = this;
    if (Tips_2.pTips != null) {
        Tips_2.pTips.destroy();
        Tips_2.pTips = null;
    }
    Tips_2.isHideUI = isHideUI;
    cc.loader.loadRes("gameTips", cc.Prefab, function (error, prefab) {
        if (error) {
            cc.error(error);
            return;
        }
        else {
            cc.log("Tips加载成功");
            // 实例 
            var tips = cc.instantiate(prefab);
            Tips_2.pTips = tips;
            var _script = Tips_2.pTips.getComponent("gameTips");
            _script.setIcon(imgType);

            _script.setText(showString);
            _script.setTitle(title);
            if (Tips_2.isHideUI) {
                _script.setVisibleUI(false);
            }
            Tips_2.pTips.parent = cc.find("Canvas");
        }
    });
};

Tips_2.scheduleShow = function (title, showString, imgType, dura, callBack) {
    if (Tips_2.pTips != null) {
        Tips_2.pTips.destroy();
        Tips_2.pTips = null;
        Tips_2.num = 0;
    }
    Tips_2.num = dura / 1000;
    cc.loader.loadRes("gameTips", cc.Prefab, function (error, prefab) {
        if (error) {
            cc.error(error);
            return;
        }
        else {
            cc.log("Tips加载成功");
            // 实例 
            var tips = cc.instantiate(prefab);
            Tips_2.pTips = tips;
            var _script = Tips_2.pTips.getComponent("gameTips");

            // Tips_2.pLabel = cc.find("desc", tips).getComponent(cc.RichText);
            // Tips_2.pLabel.string = showString + "\n" + Tips_2.num + "秒";
            var tempStr = showString + "\n" + Tips_2.num + "秒";
            _script.setText(tempStr);
            _script.setTitle(title);
            _script.setIcon(imgType);
            // Tips_2.pLabel.schedule(function (delta) {
            //     Tips_2.num -= delta;
            //     if (Tips_2.num <= 0) {
            //         // Tips_2.off();
            //         Tips_2.pLabel.unscheduleAllCallbacks();
            //         if(callBack)
            //         {
            //             callBack();
            //         }
            //         return;
            //     }
            //     // Tips_2.pLabel.string = showString + "\n" + Math.ceil(Tips_2.num);
            //     _script.setText(showString + "\n" + Math.ceil(Tips_2.num));
            // }, 0);
            _script.startLabelCountDown(
                function (delta) {
                    Tips_2.num -= delta;
                    if (Tips_2.num <= 0) {
                        _script.stopLabelCountDown();
                        if (callBack) {
                            callBack();
                        }
                        return;
                    }
                    _script.setText(showString + "\n" + Math.ceil(Tips_2.num));
                }
            )
            if (Tips_2.isHideUI) {
                // Tips_2.pSprite.node.active = false;
                // Tips_2.pLayout.node.active = false;
                // Tips_2.pLabel.node.active = false;
                _script.setVisibleUI(false);
            }

            Tips_2.pTips.parent = cc.find("Canvas");
        }
    });
};