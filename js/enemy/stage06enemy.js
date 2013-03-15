/**
 * 敵　複数敵を引き連れる
 */
(function(ns) {

    // // 画像リスト
    // var IMAGES = {
    //     "ikari": {
    //         "image": "ikari",
    //         "rect": [25, 25]
    //     }
    // };

    // var SPEED = 3;
    // var REMOVE_POSITION_LINE = 50;
    // var TIMING = 20;//ns.app.fps;
    // var HITPOINT = 1;
    var CHILD_NUM = 10;

    ns.Stage06Enemy = tm.createClass({
    	// superClass: ns.Enemy,

        init : function() {
            // 進む方向をランダムにする
            this.angle = Math.rand(0, 359);
            this.velocity = tm.geom.Vector2(0, 0);
            this.velocity.setDegree(this.angle, SPEED);

            // 進んだ道を全て保持する
            this.stack = ns.Stack(600, 1800);

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

            // 子を作るタイミング
            this.createChildTiming = ns.Timing(60);
            this.childNum = 0;

            // 予め敵を作る
            this.enemy = [
                ns.Stage06EnemyChild(this.childNum++),
                ns.Stage06EnemyChild(this.childNum++),
                ns.Stage06EnemyChild(this.childNum++),
                ns.Stage06EnemyChild(this.childNum++),
                ns.Stage06EnemyChild(this.childNum++),
                ns.Stage06EnemyChild(this.childNum++),
                ns.Stage06EnemyChild(this.childNum)];

            this.enemy[0].position.set(this.x, this.y);
        },

        update : function() {
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
            
            this.stack.push(this.position.clone());

            // 子供を移動する
            if (!this.createChildTiming.update()
            &&  this.childNum < CHILD_NUM) {
                ++this.childNum;

                var enemy = ns.Stage06EnemyChild(this.childNum); // stackの中身を知るには？　parentを使う
                this.addChild(enemy);
            }
        }
    });

})(game);