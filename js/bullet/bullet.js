/**
 * 弾
 */
(function(ns) {

    ns.Bullet = tm.createClass({
    	superClass: tm.app.Sprite,

        init : function(width, height, img, direct) {
            this.superInit(width, height, img);
            var angle = direct || -90
            this.velocity = tm.geom.Vector2(0, 0);
            this.velocity.setDegree(angle, 15);
            this.rotation = angle+90;
        },

        update : function() {

            this.x += this.velocity.x;
            this.y += this.velocity.y;

            // 画面外に出たら自分自身を削除
            if (this.y <= 0 - this.height
            ||  this.y >= ns.SCREEN_HEIGHT + this.height
            ||  this.x <= 0 - this.width
            ||  this.x >= ns.SCREEN_WIDTH + this.width) {
            	this.remove();
            }
        }
    });

})(game);