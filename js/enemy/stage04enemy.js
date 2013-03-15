/**
 * 敵　揺れる移動
 */
(function(ns) {

    var SPEED = 2;
    var REMOVE_POSITION_LINE = 50;
    var TIMING = 80;//ns.app.fps;
    var HITPOINT = 1;

    ns.Stage04Enemy = tm.createClass({
    	superClass: ns.Enemy,

        init : function(width, height, img) {
            // 進む方向をランダムにする
            this.angle = Math.rand(0, 359);
            this.velocity = tm.geom.Vector2(0, 0);
            this.velocity.setDegree(this.angle, SPEED);

            // 基底クラスの初期化処理を実行
            this.superInit(width, height, img, this.angle);

            // HP
            this.hitpoint = HITPOINT;

            // タイミングがくると移動方向を変更してジグザグに動く
            this.timing = ns.Timing(TIMING);
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

            // 揺れながら移動するよう進む方向を変更する
            if (this.timing.toggle()) {
                this.velocity.setDegree(++this.angle, SPEED);
            }
            else {
                this.velocity.setDegree(--this.angle, SPEED);
            }

            this.y += this.velocity.x;
            this.x += this.velocity.y;
            this.rotation -= 4;
        }
    });

})(game);