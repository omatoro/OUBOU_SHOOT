/**
 * カウント用(指定したタイミングでtrueが来る)
 *
 * ■使い方
 * - 初期化時
 *  this.timer = ns.Timing(limit_frame);
 *
 * - ゲームループ内
 *  if (!this.timer.update()) {
 *      // limitのフレームに達する間は実行する
 *  }
 */
(function(ns) {

    ns.Timing = tm.createClass({

        init : function(limitFrame) {
            this.limit = limitFrame || 0;
            this.count = 0;
        },

        update : function () {
        	if (this.count > this.limit) {
        		return true;
        	}
        	++this.count;

        	return false;
        },

        reset : function () {
        	this.count = 0;
        }
    });

})(game);