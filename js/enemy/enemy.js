/**
 * 敵
 */
(function(ns) {

    // マップの橋＋敵画像幅＋以下変数より外側に出たら削除する
    var REMOVE_POSITION_LINE = 50;
    var HITPOINT = 1;

    ns.Enemy = tm.createClass({
    	superClass: tm.app.Sprite,

        init : function(width, height, img) {
            this.superInit(width, height, img);
            // HP
            this.hitpoint = HITPOINT;
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