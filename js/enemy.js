/**
 * 敵
 */
(function(ns) {

    // 画像リスト
	var IMAGES = {

	};

    ns.Enemy = tm.createClass({
    	superClass: tm.app.Shape,

        init : function(img) {
            this.superInit(40, 40);
            this.canvas = img;
        },

        update : function() {
            this.y += 4;
            this.rotation -= 4;

            // 画面外に出たら自分自身を削除
            if (this.y > ns.SCREEN_HEIGHT + 40) {
            	this.remove();
            }

        }
    });

})(game);