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
            this.attackpoint = 1;
        },

        update : function() {
            // 移動範囲は -ns.MAP_WIDTH/2 〜 ns.MAP_WIDTH/2となる
            this.x += this.velocity.x;
            this.y += this.velocity.y;

            // 画面外に出たら自分自身を削除
            if (this.y <= - ns.MAP_HEIGHT/2 - this.height
            ||  this.y >=   ns.MAP_HEIGHT/2 + this.height
            ||  this.x <= - ns.MAP_WIDTH/2 - this.width
            ||  this.x >=   ns.MAP_WIDTH/2 + this.width) {
            	this.remove();
            }
        }
    });

})(game);