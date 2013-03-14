/**
 * 敵　ジグザグ移動
 */
(function(ns) {

    var SPEED = 2;
    var REMOVE_POSITION_LINE = 50;
    var TIMING = 60;//ns.app.fps;
    var HITPOINT = 3;

    ns.Stage02Enemy = tm.createClass({
    	superClass: ns.Enemy,

        init : function(width, height, img) {
            this.superInit(width, height, img);
            // HP
            this.hitpoint = HITPOINT;

            // 進む方向をランダムにする
            this.angle = Math.rand(0, 359);
            this.velocity = tm.geom.Vector2(0, 0);
            this.velocity.setDegree(this.angle, SPEED);

            // タイミングがくると移動方向を変更してジグザグに動く
            this.timing = ns.Timing(TIMING);

            // 生成位置を決める
            var generatePositionY = Math.rand(
                -ns.MAP_HEIGHT/2 - this.height,
                 ns.MAP_HEIGHT/2 + this.height);
            var generatePositionX = Math.rand(
                -ns.MAP_WIDTH/2 - this.width,
                 ns.MAP_WIDTH/2 + this.width);
            if (0   < this.angle && this.angle <= 45)  { this.position.set(-ns.MAP_WIDTH/2 - this.width, generatePositionY);　　　} // 左側から出現
            if (45  < this.angle && this.angle <= 135) { this.position.set(generatePositionX, 　ns.MAP_HEIGHT/2 + this.height); } // 下側から出現
            if (135 < this.angle && this.angle <= 225) { this.position.set(　ns.MAP_WIDTH/2 + this.width, generatePositionY); 　　} // 右側から出現
            if (225 < this.angle && this.angle <= 315) { this.position.set(generatePositionX, -ns.MAP_HEIGHT/2 - this.height); } // 上側から出現
            if (315 < this.angle && this.angle <= 360) { this.position.set(-ns.MAP_WIDTH/2 - this.width, generatePositionY); 　　} // 左側から出現
        },

        damaged : function (attackpoint) {
            var proto = Object.getPrototypeOf(this);
            var proto_proto = Object.getPrototypeOf(proto);
            proto_proto.damaged.call(this, attackpoint); // 継承元クラスのdamagedを実行
        },

        update : function() {
            var proto = Object.getPrototypeOf(this);
            var proto_proto = Object.getPrototypeOf(proto);
            proto_proto.update.call(this); // 継承元クラスのupdateを実行

            this.y += this.velocity.x;
            this.x += this.velocity.y;
            this.rotation -= 4;
        }
    });

})(game);