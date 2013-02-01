/**
 * ポーズ画面
 */
(function(ns) {

    ns.PauseScene = tm.createClass({

        superClass : tm.app.Scene,

        // タイトル移動へのボタン
        title_button : {},

        init : function (score) {
        	this.superInit();
        	this.interaction;

        	// 全画面にかける薄い黒
        	var filter = tm.app.Shape(ns.SCREEN_WIDTH, ns.SCREEN_HEIGHT);
        	filter.setPosition(ns.SCREEN_WIDTH/2, ns.SCREEN_HEIGHT/2);
        	filter.canvas.clearColor("rgba(0, 0, 0, 0.75)");
        	this.addChild(filter);

        	ns.app.stop();

//        	// サウンドの停止
//        	this.audio = audio;
//        	if (this.audio) {
//        		this.audio.pause();
//        	}
        },

        // フォーカスが合えばアプリを動かす
        onfocus: function () {
        	ns.app.start();
        },

        // フォーカスが外れたらアプリを止める
        onblur: function () {
        	ns.app.stop();
        },

        // クリックでポーズ画面終了
        onmousedown: function () {
//        	// サウンドが流れていたらサウンドも再開
//        	if (this.audio) {
//        		this.audio.play();
//        		ns.app.popScene();
//        	}
        	ns.app.popScene();
        }
    });

})(game);