/**
 * 自機
 */
(function(ns) {

    ns.Player = tm.createClass({
    	superClass: tm.app.Sprite,

        init : function(width, height, img) {
            this.superInit(width, height, img);
            this.speed = 0;
            this.velocity = tm.geom.Vector2(0, 0);

        },

        update : function() {
        	// 移動量の計算
            var angle = ns.app.keyboard.getKeyAngle();
            if (angle != null) {
            	this.velocity.setDegree(angle, 1);
            	this.velocity.y *= -1;
            	this.speed = 10;
            }

            // 押した方向と速度で移動
            this.position.add(tm.geom.Vector2.mul(this.velocity, this.speed));

            // 摩擦
            this.speed *= 0.7;

        }
    });

})(game);