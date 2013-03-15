/**
 * 敵
 */
(function(ns) {

    // マップの橋＋敵画像幅＋以下変数より外側に出たら削除する
    var REMOVE_POSITION_LINE = 50;
    var HITPOINT = 1;

    ns.Enemy = tm.createClass({
    	superClass: tm.app.Sprite,

        init : function(width, height, img, angle) {
            this.superInit(width, height, img);
            // HP
            this.hitpoint = HITPOINT;

            // 生成位置を決める
            var generatePositionY = Math.rand(
                -ns.MAP_HEIGHT/2 - this.height,
                 ns.MAP_HEIGHT/2 + this.height);
            var generatePositionX = Math.rand(
                -ns.MAP_WIDTH/2 - this.width,
                 ns.MAP_WIDTH/2 + this.width);
            if (0   < angle && angle <= 45)  { this.position.set(-ns.MAP_WIDTH/2 - this.width, generatePositionY);　　　} // 左側から出現
            if (45  < angle && angle <= 135) { this.position.set(generatePositionX, 　ns.MAP_HEIGHT/2 + this.height); } // 下側から出現
            if (135 < angle && angle <= 225) { this.position.set(　ns.MAP_WIDTH/2 + this.width, generatePositionY); 　　} // 右側から出現
            if (225 < angle && angle <= 315) { this.position.set(generatePositionX, -ns.MAP_HEIGHT/2 - this.height); } // 上側から出現
            if (315 < angle && angle <= 360) { this.position.set(-ns.MAP_WIDTH/2 - this.width, generatePositionY); 　　} // 左側から出現
        },

        damaged : function (attackpoint) {
            this.hitpoint -= attackpoint;
            if (this.hitpoint <= 0) {
                this.remove();
            }
        },

        update : function() {
            // // 画面外に出たら自分自身を削除
            // if (ns.MAP_HEIGHT/2 + this.height + REMOVE_POSITION_LINE < this.y
            // ||  ns.MAP_WIDTH/2  + this.width  + REMOVE_POSITION_LINE < this.x
            // ||  this.y < -ns.MAP_HEIGHT/2 - this.height - REMOVE_POSITION_LINE
            // ||  this.x < -ns.MAP_WIDTH/2  - this.width  - REMOVE_POSITION_LINE) {
            // 	this.remove();
            // }

            // 画面外に出たら反対側に出現させる
            if (ns.MAP_HEIGHT/2 + this.height + REMOVE_POSITION_LINE < this.y)  { this.y = -this.y + REMOVE_POSITION_LINE; }
            if (ns.MAP_WIDTH/2  + this.width  + REMOVE_POSITION_LINE < this.x)  { this.x = -this.x + REMOVE_POSITION_LINE; }
            if (this.y < -ns.MAP_HEIGHT/2 - this.height - REMOVE_POSITION_LINE) { this.y = -this.y - REMOVE_POSITION_LINE; }
            if (this.x < -ns.MAP_WIDTH/2  - this.width  - REMOVE_POSITION_LINE) { this.x = -this.x - REMOVE_POSITION_LINE; }
        }
    });

})(game);