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

    var HITPOINT = 5;

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
        },

        damaged : function (attackpoint) {
            this.hitpoint -= attackpoint;
            if (this.hitpoint <= 0) {
                this.remove();
            }
        },

        update : function() {
            var position = this.getParent().stack.random(childNumber * 60);
            this.position.set(position.x, position.y);
        }
    });

})(game);