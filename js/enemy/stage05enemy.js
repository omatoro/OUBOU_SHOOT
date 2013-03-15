/**
 * 敵　加速減速する移動
 */
(function(ns) {

    // 画像リスト
    var IMAGES = {
        "ikari": {
            "image": "ikari",
            "rect": [25, 25]
        }
    };

    var SPEED = 3;
    var REMOVE_POSITION_LINE = 50;
    var TIMING = 20;//ns.app.fps;
    var HITPOINT = 1;

    ns.Stage05Enemy = tm.createClass({
    	superClass: ns.Enemy,

        init : function() {
            // 進む方向をランダムにする
            this.angle = Math.rand(0, 359);
            this.velocity = tm.geom.Vector2(0, 0);
            this.velocity.setDegree(this.angle, SPEED);

            // 基底クラスの初期化処理を実行
            this.superInit(
                IMAGES["ikari"].rect[0],
                IMAGES["ikari"].rect[1],
                IMAGES["ikari"].image,
                this.angle);

            // HP
            this.hitpoint = HITPOINT;

            // タイミングを管理する
            this.timing = ns.Timing(TIMING);

            // スピード
            this.speed = SPEED;
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

            // 加速減速する移動
            if (this.timing.toggle()) {
                this.speed += 0.2;
                this.velocity.setDegree(this.angle, this.speed);
            }
            else {
                this.speed *= 0.9;
                this.velocity.setDegree(this.angle, this.speed);
            }

            this.y += this.velocity.x;
            this.x += this.velocity.y;
            this.rotation -= 4;
        }
    });

})(game);