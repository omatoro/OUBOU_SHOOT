/**
 * ゲーム用ネームスペース作成、定数作成
 */
var game = game || {};

(function(ns) {

    // デバッグ時定数
    ns.DEBUG = false;

    // スクリーンサイズ
    ns.SCREEN_WIDTH  = 640;
    ns.SCREEN_HEIGHT = 960;

    // スコアデータなどのユーザデータの中身を作成
    tm.util.DataManager.set("userData", {
    	score: 0
    });


})(game);