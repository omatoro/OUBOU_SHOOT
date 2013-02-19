/**
 * 爆発
 */
(function(ns) {

    // 画像リスト
	var IMAGES = {
		"expload_green": {
			"image": "crash_green",
			"rect": [120, 120]
		},
		"expload_red": {
			"image": "crash_red",
			"rect": [120, 120]
		},
		"expload_brue": {
			"image": "crash_brue",
			"rect": [120, 120]
		}
	};

	var REMOVE_FRAME = 120;
	var SCALE = 4.0;

    ns.ExploadGreen = tm.createClass({
    	superClass: tm.app.Sprite,

        init : function(x, y) {
            this.superInit(IMAGES["expload_green"]["rect"][0], IMAGES["expload_green"]["rect"][1], IMAGES["expload_green"]["image"]);

            // 破棄するまでのタイマー
            this.removeCount = ns.Timing(REMOVE_FRAME);

            this.position.set(x, y);
        },

        update : function() {
        	if (!this.removeCount.update()) {
        		// フェードアウト
        		this.animation.fade(0.0, REMOVE_FRAME);

        		// 拡大
        		this.animation.scale(SCALE, REMOVE_FRAME);
        	}
        	else {
        		// 破棄
        		this.remove();
        	}
        }
    });

    ns.ExploadRed = tm.createClass({
    	superClass: tm.app.Sprite,

        init : function(x, y) {
            this.superInit(IMAGES["expload_red"]["rect"][0], IMAGES["expload_red"]["rect"][1], IMAGES["expload_red"]["image"]);

            // 破棄するまでのタイマー
            this.removeCount = ns.Timing(REMOVE_FRAME);

            this.position.set(x, y);
        },

        update : function() {
        	if (!this.removeCount.update()) {
        		// フェードアウト
        		this.animation.fade(0.0, REMOVE_FRAME);

        		// 拡大
        		this.animation.scale(SCALE, REMOVE_FRAME);
        	}
        	else {
        		// 破棄
        		this.remove();
        	}
        }
    });

    ns.ExploadBrue = tm.createClass({
    	superClass: tm.app.Sprite,

        init : function(x, y) {
            this.superInit(IMAGES["expload_brue"]["rect"][0], IMAGES["expload_brue"]["rect"][1], IMAGES["expload_brue"]["image"]);

            // 破棄するまでのタイマー
            this.removeCount = ns.Timing(REMOVE_FRAME);

            this.position.set(x, y);
        },

        update : function() {
        	if (!this.removeCount.update()) {
        		// フェードアウト
        		this.animation.fade(0.0, REMOVE_FRAME);

        		// 拡大
        		this.animation.scale(SCALE, REMOVE_FRAME);
        	}
        	else {
        		// 破棄
        		this.remove();
        	}
        }
    });

})(game);