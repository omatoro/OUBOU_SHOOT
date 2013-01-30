/**
 * 弾
 */
(function(ns) {

    // 画像リスト
	var IMAGES = {

	};

    ns.Bullet = tm.createClass({
    	superClass: tm.app.Shape,

        init : function(img) {
            this.superInit(10, 10);
            this.canvas = img;
        },

        update : function() {
            this.y -= 16;

            // 画面外に出たら自分自身を削除
            if (this.y <= -this.height) {
            	this.remove();
            }
        }
    });

})(game);