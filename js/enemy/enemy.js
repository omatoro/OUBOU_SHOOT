/**
 * 敵
 */
(function(ns) {

    ns.Enemy = tm.createClass({
    	superClass: tm.app.Sprite,

        init : function(width, height, img) {
            this.superInit(width, height, img);
        },

        update : function() {
            this.y += 4;
            this.rotation -= 4;

            // 画面外に出たら自分自身を削除
            if (this.y > ns.MAP_HEIGHT/2 + this.height) {
            	this.remove();
            }
        }
    });

})(game);