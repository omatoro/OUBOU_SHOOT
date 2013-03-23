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
            // this.angle = Math.rand(0, 359);
            // this.velocity = tm.geom.Vector2(0, 0);
            // this.velocity.setDegree(this.angle, SPEED);

            // 進んだ道を全て保持する
            // this.stack = ns.Stack(600, 1800);

            // 基底クラスの初期化処理を実行
            this.enemyList = [];

            // 子供である敵を生成する
            for (var i = 0; i < 4; ++i) {
                var enemy = ns.Stage06EnemyChild();
                if (0 < i) {
                    enemy.target = this.enemyList[i-1];
                }
                this.enemyList.push(enemy);
            }





/*

// 定数
var SCREEN_WIDTH    = 640;
var SCREEN_HEIGHT   = 640;
var CIRCLE_RADIUS   = 30;
var CIRCLE_MAX_NUM  = 15;
var CIRCLE_PURSUIT_RATE = 0.25;  // 収束率

var app = null;

var Circle = tm.createClass({
    superClass: tm.app.CanvasElement,
    
    init: function(color) {
        this.superInit();
        this.color = color;
        this.blendMode = "lighter";
    },
    
    update: function(app) {
        if (this.target) {
            this.x += (this.target.x-this.x)*CIRCLE_PURSUIT_RATE;
            this.y += (this.target.y-this.y)*CIRCLE_PURSUIT_RATE;
        }
        else {
            this.x = app.pointing.x;
            this.y = app.pointing.y;
        }
    },
    
    draw: function(c) {
        c.fillStyle = this.color;
        c.fillCircle(0, 0, CIRCLE_RADIUS);
    },
});

window.onload = function() {
    var app = tm.app.CanvasApp("#world");
    app.resize(SCREEN_WIDTH, SCREEN_HEIGHT);
    app.fitWindow();
    
    var circleList = [];
    for (var i=0; i<CIRCLE_MAX_NUM; ++i) {
        var c = "hsla({0}, 75%, 50%, 0.75)".format(360/CIRCLE_MAX_NUM*i);
        var circle = Circle(c);
        circle.x = tm.util.Random.randint(0, SCREEN_WIDTH);
        circle.y = tm.util.Random.randint(0, SCREEN_HEIGHT);
        app.currentScene.addChild(circle);
        circleList.push(circle);
    }
    
    for (var i=1; i<CIRCLE_MAX_NUM; ++i) {
        circleList[i].target = circleList[i-1];
    }
    
    app.run();
};

*/














            // // HP
            // this.hitpoint = HITPOINT;

            // // タイミングを管理する
            // this.timing = ns.Timing(TIMING);

            // // スピード
            // this.speed = SPEED;

            // // 子を作るタイミング
            // this.createChildTiming = ns.Timing(60);
            // this.childNum = 0;

            // // 予め敵を作る
            // this.enemy = [
            //     ns.Stage06EnemyChild(this.childNum++),
            //     ns.Stage06EnemyChild(this.childNum++),
            //     ns.Stage06EnemyChild(this.childNum++),
            //     ns.Stage06EnemyChild(this.childNum++),
            //     ns.Stage06EnemyChild(this.childNum++),
            //     ns.Stage06EnemyChild(this.childNum++),
            //     ns.Stage06EnemyChild(this.childNum)];

            // this.enemy[0].position.set(this.x, this.y);
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