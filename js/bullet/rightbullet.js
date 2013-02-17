/**
 * 弾
 */
(function(ns) {

    ns.RightBullet = tm.createClass({
    	superClass: tm.app.Sprite,

        init : function(width, height, img) {
            this.superInit(width, height, img);
            this.rotation = 10;
        },

        update : function() {
            this.x += 5;
            this.y -= 30;

            // 画面外に出たら自分自身を削除
            if (this.y <= -this.height
            ||  this.x >= this.width + ns.SCREEN_WIDTH) {
            	this.remove();
            }
        }
    });

})(game);