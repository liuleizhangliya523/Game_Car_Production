
cc.Class({
    extends: cc.Component,

    properties: {

    },

    start () {

    },

    onBackButtonClicked: function(event, data)
    {
        cc.director.loadScene("game");
    }
});
