/**
 * スタック
 */
(function(ns) {

    ns.Stack = tm.createClass({
        init : function (limit, over, data) {
            var tempdata = [];
            this.data  = data  || tempdata;
            this.limit = limit || 1000;
            this.over  = over  || 500;
        },

        pop : function () {
            var result = data[data.length - 1];
            data.splice(data.length - 1, 1);
            return result;
        },

        random : function (num) {
            return data[num];
        },

        push : function (data) {
            data[data.length] = data || this.data;

            if (this.limit + this.limitOver <= data.length) {
                data.splice(this.limit, this.limitOver);
            }
        }

    });

})(game);