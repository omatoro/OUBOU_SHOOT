/**
 * 自機
 */
(function(ns) {

    // 画像リスト
	var IMAGES = {
		"bullet": {
			"image": "bullet",
			"rect": [3, 30]
		}
	};

    ns.Player = tm.createClass({
    	superClass: tm.app.Sprite,

        init : function(width, height, img, scene) {
            this.superInit(width, height, img);
            this.speed = 0;
            this.velocity = tm.geom.Vector2(0, 0);

            // パッド
            var pad = tm.controller.Pad();
            pad.position.set(80, ns.SCREEN_HEIGHT - 80);
            ns.app.currentScene.addChild(pad);
            scene.addChild(pad);
            this.pad = pad;

            // 弾の発射間隔
            this.waitTimeBullet = 0;

            // 弾グループ
            this.bullet_group = null;
            this.bullet_group = tm.app.CanvasElement();
            scene.addChild(this.bullet_group);
        },

        update : function() {
        	// キーボードによる速度設定
            var angle = ns.app.keyboard.getKeyAngle();
            if (angle != null) {
            	this.velocity.setDegree(angle, 1);
            	this.velocity.y *= -1;
            	this.speed = 8;
            }

            // タッチパネルによる速度設定
            if (this.pad.isTouching) {
            	this.velocity.setDegree(this.pad.angle, 1);
            	this.speed = 8;
            }

            // 押した方向と速度で移動
            this.position.add(tm.geom.Vector2.mul(this.velocity, this.speed));

            // 摩擦
            this.speed *= 0.7;

            // ショット
            if ((ns.app.keyboard.getKeyDown("Z") ||  ns.app.pointing.getPointing())
            &&  this.waitTimeBullet < 0) {
            	this.waitTimeBullet = 10;
        		var bullet = ns.Bullet(IMAGES["bullet"].rect[0], IMAGES["bullet"].rect[1], IMAGES["bullet"].image);
            	bullet.position.set(this.x, this.y - 20);
            	this.bullet_group.addChild(bullet);
            }
            // ショット間隔の計算
            --this.waitTimeBullet;
        }
    });

})(game);