/**
 * 弾
 */
(function(ns) {

    ns.Bullet = tm.createClass({
    	superClass: tm.app.Sprite,

        init : function(width, height, img) {
            this.superInit(width, height, img);
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