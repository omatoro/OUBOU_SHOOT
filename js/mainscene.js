/**
 * ゲーム画面
 */
(function(ns) {

    // 画像リスト
	var IMAGES = {

	};

	var playerImage = (function () {
		var c = tm.graphics.Canvas();
		c.width = c.height = 40;
		c.setTransformCenter();
		c.setLineStyle(2, "round", "round");
		c.setColorStyle("white", "rgba(200, 200, 200, 0.9)");
		c.fillPolygon(0, 0, 20, 3, 270);
		c.strokePolygon(0, 0, 20, 3, 270);

		return c;
	})();

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

	var bulletImage = (function() {
		var c = tm.graphics.Canvas();
		c.width = c.height = 10;
		c.setTransformCenter();
		c.setColorStyle("while", "white");
		c.fillCircle(0, 0, 5);
		return c;
	})();

    ns.MainScene = tm.createClass({
        superClass : tm.app.Scene,

        init : function() {
            this.superInit();

            // 自機
            this.player = ns.Player(playerImage);
            this.player.position.set(ns.app.width/2, 600);
            this.addChild(this.player);

            // 敵グループ
            this.enemy_group = null;
            this.enemy_group = tm.app.CanvasElement();
            this.addChild(this.enemy_group);
            this.enemy_group.update = function (app) {
            	if (app.frame % 30 === 0) {
            		var enemy = ns.Enemy(enemyImage);
            		enemy.position.set(Math.rand(40, app.height-40), -20);

            		// enemy_groupにenemyを追加
            		this.addChild(enemy);
            	}
            };

            // 弾グループ
            this.bullet_group = null;
            this.bullet_group = tm.app.CanvasElement();
            this.addChild(this.bullet_group);

            // 弾の発射間隔
            this.wait_time_bullet = 0;
        },

        update : function() {

            if (ns.app.pointing.getPointingEnd()) {
                //ns.app.replaceScene(ns.EndScene());
            }

            // ショット
            if ((ns.app.keyboard.getKeyDown("Z") ||  ns.app.pointing.getPointing() == true)
            &&  this.wait_time_bullet < 0) {
            	this.wait_time_bullet = 10;
            	var bullet = ns.Bullet(bulletImage);
            	bullet.position.set(this.player.x, this.player.y - 20);
            	this.bullet_group.addChild(bullet);
            }
            --this.wait_time_bullet;
        }
    });

})(game);