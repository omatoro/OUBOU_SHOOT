/**
 * マップ playerの親となる
 */
(function(ns) {

    // 画像リスト
	var IMAGES = {
		"map": {
			"image": "map",
			"rect": [0, 0]
		}
	};

    ns.Map = tm.createClass({
    	superClass: tm.app.Sprite,

        init : function(player) {
            this.superInit(ns.MAP_WIDTH, ns.MAP_HEIGHT, IMAGES["map"]["image"]);
        },

        // プレイヤー情報のセット
        setPlayer : function (player) {
            this.addChild(player);
            player.name = "player";

            // playerの初期位置を覚えておく
            this.initPlayerPosition = player.position.clone();

            // playerのポジションをマップの中心とする
            this.position.x = ns.MAP_WIDTH/2  - player.position.x + ns.SCREEN_WIDTH/2;
            this.position.y = ns.MAP_HEIGHT/2 - player.position.y + ns.SCREEN_HEIGHT/2;
        },

        // プレイヤーの位置による、マップ描画の中心位置を取得
        // プレイヤーがマップ端にいる際に、マップ外を表示しないよう調整する
        getMapPosition : function (playerposition) {
            var position = playerposition.clone();

            if (position.x < ns.SCREEN_WIDTH/2) {
                position.x = ns.SCREEN_WIDTH/2;
            }
            else if (ns.MAP_WIDTH - ns.SCREEN_WIDTH/2 < position.x) {
                position.x = ns.MAP_WIDTH - ns.SCREEN_WIDTH/2;
            }
            if (position.y < ns.SCREEN_HEIGHT/2) {
                position.y = ns.SCREEN_HEIGHT/2;
            }
            else if (ns.MAP_HEIGHT - ns.SCREEN_HEIGHT/2 < position.y) {
                position.y = ns.MAP_HEIGHT - ns.SCREEN_HEIGHT/2;
            }

            var result = tm.geom.Vector2(0, 0);
            result.x = ns.MAP_WIDTH/2  + ns.SCREEN_WIDTH/2  - position.x;
            result.y = ns.MAP_HEIGHT/2 + ns.SCREEN_HEIGHT/2 - position.y;

            return result;
        },

        update : function() {
            // playerの位置を取得
            var player = this.getChildByName("player");
            var playerPosition = player.position;

            // マップの表示位置更新
            this.position = this.getMapPosition(playerPosition);
        }
    });

})(game);