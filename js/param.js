/**
 * ゲーム用ネームスペース作成、定数作成
 */
var game = game || {};

(function(ns) {

    // デバッグ時定数
    ns.DEBUG = true;

    // スクリーンサイズ
    ns.SCREEN_WIDTH  = 960;
    ns.SCREEN_HEIGHT = 640;

    // マップサイズ
    ns.MAP_WIDTH  = ns.SCREEN_WIDTH  * 3;
    ns.MAP_HEIGHT = ns.SCREEN_HEIGHT * 3;

    // スコアデータなどのユーザデータの中身を作成
    tm.util.DataManager.set("userData", {
    	score: 0
    });


})(game);