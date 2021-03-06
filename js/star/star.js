/**
 * 星(取得するとポイント)
 */
(function(ns) {

	var SPEED = 1;

    ns.Star = tm.createClass({
    	superClass: tm.app.AnimationSprite,

        init : function(angle, x, y, img) {
            this.superInit(60, 60, img);
            this.position.set(x, y);
        	this.gotoAndPlay("flash");
        	//this.blendMode = "lighter";

            this.velocity = tm.geom.Vector2(0, 0);
            this.velocity.setRadian(angle, SPEED);
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