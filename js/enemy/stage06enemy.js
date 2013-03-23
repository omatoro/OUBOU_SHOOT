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

    // var HITPOINT = 1;
    var CHILD_NUM = 4;

    ns.Stage06Enemy = tm.createClass({
    	superClass: ns.Enemy,

        init : function() {
            // 進んだ道を全て保持する
            // this.stack = ns.Stack(600, 1800);

            // 基底クラスの初期化処理を実行
            this.enemyList = [];
            var generateX = Math.rand(-ns.MAP_WIDTH/2 + 40, ns.MAP_WIDTH/2 - 40);
            var generateY = -ns.MAP_HEIGHT/2 - 40;


            // 子供である敵を生成する
            for (var i = 0; i < CHILD_NUM; ++i) {
                var enemy = ns.Stage06EnemyChild();
                enemy.position.set(generateX, generateY);
                enemy.parentList = this;
                if (0 < i) {
                    enemy.target = this.enemyList[i-1];
                }
                else {
                    // 仮の移動物体である当クラスを目指して移動させる @todo 正確に動くかどうかは分からない
                    enemy.target = enemy;
                }
                this.enemyList.push(enemy);
                ns.app.currentScene.enemy_group.addChild(enemy);
            }



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

        getEnemyList : function () {
            return this.enemyList;
        },

        allRemove : function () {
            for (var i = 1; i < this.enemyList.length; ++i) {
                var proto = Object.getPrototypeOf(this.enemyList[i]);
                var proto_proto = Object.getPrototypeOf(proto);
                proto_proto.remove.call(this.enemyList[i]);
            }
        },

        removeChild : function (child) {
            for (var i = 0; i < this.enemyList.length; ++i) {
                if (this.enemyList[i] === child) {
                    this.enemyList.splice(i, 1);
                }
            }
        },

        getEnemyPreChild : function (child) {
            for (var i = 0; i < this.enemyList.length; ++i) {
                if (this.enemyList[i] === child) {
                    return this.enemyList[i+1];
                }
            }
            return null;
        },

        getEnemyNextChild : function (child) {
            for (var i = 1; i < this.enemyList.length; ++i) {
                if (this.enemyList[i] === child) {
                    return this.enemyList[i-1];
                }
            }
            return null;
        }
    });

})(game);