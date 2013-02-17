/**
 * カウント用(指定したタイミングでtrueが来る)
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