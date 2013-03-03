/**
 * タイトル画面
 */
(function(ns) {

    ns.TitleScene = tm.createClass({

        superClass : tm.app.TitleScene,

        init : function() {

            this.superInit({
                title :  "横暴SHOOT",
                width :  ns.SCREEN_WIDTH,
                height : ns.SCREEN_HEIGHT
            });

        },

        update : function() {

            if (ns.app.pointing.getPointingEnd()) {
                ns.app.replaceScene(ns.MainScene());
            }
        }
    });

})(game);