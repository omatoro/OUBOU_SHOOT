/**
 * 敵
 */
(function(ns) {

    // 画像リスト
    var IMAGES = {
        "ikari": {
            "image": "ikari",
            "rect": [25, 25]
        }
    };

    var HITPOINT = 1;
    var CIRCLE_PURSUIT_RATE = 0.03;
    var SPEED = 3;
    var REMOVE_POSITION_LINE = 50;
    var TIMING = 20;//ns.app.fps;

    ns.Stage06EnemyChild = tm.createClass({
        superClass: tm.app.Sprite,

        init : function() {
            // 基底クラスの初期化処理を実行
            this.superInit(
                IMAGES["ikari"].rect[0],
                IMAGES["ikari"].rect[1],
                IMAGES["ikari"].image);
            // HP
            this.hitpoint = HITPOINT;
            // 追尾先のオブジェクト
            this.target = null;

            // 進む方向をランダムにする
            this.angle = Math.rand(0, 359);
            this.velocity = tm.geom.Vector2(0, 0);
            this.velocity.setDegree(this.angle, SPEED);

            // タイミングを管理する
            this.timing = ns.Timing(TIMING);

            // スピード
            this.speed = SPEED;

            this.removed = false;
        },

        damaged : function (attackpoint) {
            this.hitpoint -= attackpoint;
            if (this.hitpoint <= 0) {
                this.remove();
            }
        },

        update : function() {
            // var position = this.getParent().stack.random(childNumber * 60);
            // this.position.set(position.x, position.y);

            // ターゲットから情報を取得して移動量を計算
            if (this.target !== this) {
                this.x += (this.target.x-this.x)*CIRCLE_PURSUIT_RATE;
                this.y += (this.target.y-this.y)*CIRCLE_PURSUIT_RATE;
            }
            else {
                // ついていくターゲットがいなければ自分で移動する
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
            }

            // targetがいなくなったら繋ぎ直す
            if (this.target.removed === true) {
                var nextChild = this.parentList.getEnemyNextChild(this);
                if (nextChild) {
                    this.target = nextChild;
                }
            }
        },

        remove : function () {
            // 消去済みフラグ
            this.removed = true;
            // 頭が死んだら全て死ぬ
            if (this.target === this) {
                this.parentList.allRemove();
            }
            var proto = Object.getPrototypeOf(this);
            var proto_proto = Object.getPrototypeOf(proto);
            proto_proto.remove.call(this);

            // 自分も削除する
            this.parentList.removeChild(this);
        }
    });

})(game);