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
            this.bulletTimer = ns.Timing(5);

            // トリプルショットの発射間隔
            this.threeWayBulletTimer = ns.Timing(5);

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
            	this.speed = 4;
            }

            // タッチパネルによる速度設定
            if (this.pad.isTouching) {
            	this.velocity.setDegree(this.pad.angle, 1);
            	this.speed = 4;
            }

            // 押した方向と速度で移動
            this.position.add(tm.geom.Vector2.mul(this.velocity, this.speed));

            // 摩擦
            this.speed *= 0.7;

            // ショット
            if (this.bulletTimer.update()
        	&& (ns.app.keyboard.getKeyDown("Z") || ns.app.pointing.getPointing())) {
            	// タイマーのリセット
            	this.bulletTimer.reset();

        		var bullet = ns.Bullet(IMAGES["bullet"].rect[0], IMAGES["bullet"].rect[1], IMAGES["bullet"].image, this.pad.angle);
            	bullet.position.set(this.x, this.y);
            	this.bullet_group.addChild(bullet);
            }

            // トリプルショット
            if (this.threeWayBulletTimer.update()
            && (ns.app.keyboard.getKeyDown("X"))) {
            	// タイマーのリセット
            	this.threeWayBulletTimer.reset();

				var leftBullet   = ns.LeftBullet(IMAGES["bullet"].rect[0], IMAGES["bullet"].rect[1], IMAGES["bullet"].image);
				var centerBullet = ns.Bullet(IMAGES["bullet"].rect[0], IMAGES["bullet"].rect[1], IMAGES["bullet"].image);
				var rightBullet  = ns.RightBullet(IMAGES["bullet"].rect[0], IMAGES["bullet"].rect[1], IMAGES["bullet"].image);

				leftBullet.position.set(this.x, this.y - 20);
				centerBullet.position.set(this.x, this.y - 20);
				rightBullet.position.set(this.x, this.y - 20);

            	this.bullet_group.addChild(leftBullet);
            	this.bullet_group.addChild(centerBullet);
            	this.bullet_group.addChild(rightBullet);
            }
        }
    });

})(game);