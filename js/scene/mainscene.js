/**
 * ゲーム画面
 */
(function(ns) {

    // 画像リスト
	var IMAGES = {
		"player": {
			"image": "player",
			"rect": [64, 64, ns.SCREEN_WIDTH, 1000]
		},
		"outyaku": {
			"image": "outyaku",
			"rect": [40, 40]
		}
	};

	// 敵のイメージデータ
	var enemyImage = (function() {
		var c = tm.graphics.Canvas();
		c.width = c.height = 40;
		c.setTransformCenter();
		c.setLineStyle(1.5, "round", "round");
		c.setColorStyle("while", "rgb(255, 50, 50)");
		c.fillStar(0, 0, 20, 16, 0.6);
		c.strokeStar(0, 0, 20, 16, 0.6);
		return c;
	})();

	// ラベルのリスト
	var UI_DATA = {
		LABELS: {
			children: [{
				type: "Label",
				name: "score_label",
				x: 240,
				y: 128,
				width: ns.SCREEN_WIDTH,
				fillStyle: "white",
				text: "dammy",
				fontSize: 64,
				align: "center"
			}]
		},
//		IMAGE: {
//			children: [{
//				type: "Sprite",
//				name: "player",
//				scaleX: 1.0,
//				scaleY: 1.0,
//				image: IMAGES["bullet"].image,
//				width: IMAGES["bullet"].rect[2],
//				height: IMAGES["bullet"].rect[3],
//				position: {
//					x: IMAGES["bullet"].rect[0],
//					y: IMAGES["bullet"].rect[1]
//				}
//			}]
//		}
	};


	/*
	 * メインシーン(ゲーム)
	 */
    ns.MainScene = tm.createClass({
        superClass : tm.app.Scene,

        init : function() {
            this.superInit();

            // スコア初期化
            ns.userdata.score = 0;

            // スコアのラベル作成
            this.fromJSON(UI_DATA.LABELS);
            this.score_label.text = "score : " + ns.userdata.score;

            // 敵グループ
            this.enemy_group = null;
            this.enemy_group = tm.app.CanvasElement();// マップ
            this.addChild(this.enemy_group);

            // 敵の出現方法はステージごとに変更する
            this.enemy_group.update = function (app) {
                if (app.frame % 120 === 0) {
                    var enemy = ns.Stage05Enemy();
                    // enemy.position.set(Math.rand(-ns.MAP_WIDTH/2 + 40, ns.MAP_WIDTH/2 - 40), -ns.MAP_HEIGHT/2 - 40);

                    // enemy_groupにenemyを追加
                    this.addChild(enemy);
                }
            };

            // マップ
            this.map = ns.Map();
            this.map.position.set();

            // 自機
            this.player = ns.Player(IMAGES["player"].rect[0], IMAGES["player"].rect[1], IMAGES["player"].image, this);
            this.player.position.set(IMAGES["player"].rect[2], IMAGES["player"].rect[3]);
            // this.player.name = "player";

            // マップのセット
            this.map.setPlayer(this.player);
            this.map.addChild(this.enemy_group);
            this.addChild(this.map);

            // パッド
            var pad = tm.controller.Pad();
            pad.position.set(80, ns.SCREEN_HEIGHT - 80);
            this.addChild(pad);
            this.player.setPad(pad);

            // BGM
            this.bgm = tm.sound.SoundManager.get("bgm");
            this.bgm.loop = true;
            this.bgm.play();

            // ■■スプライトパーティクル■■ 外部変数としてスプライトを生成できるようになったらstar.jsに移植する
            this.starImage = tm.app.SpriteSheet({
        		image: "star",
        		frame: {
        			width:  40,
        			height: 40,
        			count:  9
        		},
        		animations: {
        			"flash": [0, 9, "flash", 2]
        		}
        	});

            // スターグループ
            this.star_group = tm.app.CanvasElement();
            this.map.addChild(this.star_group);
        },

        update : function() {

            if (ns.app.pointing.getPointingEnd()) {
                //ns.app.replaceScene(ns.EndScene());
            }

            // ヒット判定
            for (var i = 0; i < this.enemy_group.children.length; ++i) {
            	// 自機&敵
            	var enemy = this.enemy_group.children[i];
            	if (this.player.isHitElement(enemy) === true) {
            		console.log("hit");
            		enemy.remove();
            	}

            	// 敵&弾
            	for (var j = 0; j < this.player.bullet_group.children.length; ++j) {
            		var bullet = this.player.bullet_group.children[j];
            		if (bullet.isHitElement(enemy) === true) {
            			console.log("bullet hit");
            			enemy.damaged(bullet.attackpoint);
            			bullet.remove();

            			// パーティクル作成
            			var test = Math.rand(0, 2);
            			if (test === 0) { var crash = ns.ExploadRed(bullet.x, bullet.y); }
            			if (test === 1) { var crash = ns.ExploadBrue(bullet.x, bullet.y); }
            			if (test === 2) { var crash = ns.ExploadGreen(bullet.x, bullet.y); }

            			this.map.addChild(crash);

            			// スター(取得するとポイント)を生成
            			var angleToPlayer = this.player.getParentPosition().clone().sub(bullet.position.clone()).toAngle();
            			var star = ns.Star(angleToPlayer, bullet.x, bullet.y, this.starImage);
            			this.star_group.addChild(star);

            			// スコア更新
            			++ns.userdata.score;
            			this.score_label.text = "score : " + ns.userdata.score;
            		}
            	}
            }

            // ヒット判定 自機&スター
            for (var i = 0; i < this.star_group.children.length; ++i) {
            	var star = this.star_group.children[i];
            	if (this.player.isHitElement(star) === true) {
        		// スコア更新
        		ns.userdata.score += 1000;
        			this.score_label.text = "score : " + ns.userdata.score;

            		star.remove();
            	}
            }
        },

        // ポーズ画面への遷移
        onblur: function () {
        	ns.app.pushScene(ns.PauseScene());
        }
    });

})(game);