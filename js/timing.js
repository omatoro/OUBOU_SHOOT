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
            this.toggleFlag = false;
        },

        update : function () {
        	if (this.limit < this.count) {
        		return true;
        	}
        	++this.count;

        	return false;
        },

        toggle : function () {
            if (this.update()) {
                // タイミングがきたら返す値を逆転する
                this.reset();
                this.toggleFlag = !this.toggleFlag;
                return this.toggleFlag;
            }
            else {
                return this.toggleFlag;
            }
        },

        reset : function () {
        	this.count = 0;
        }
    });

})(game);