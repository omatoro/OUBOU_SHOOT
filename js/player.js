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

            // 弾の発射間隔
            this.bulletTimer = ns.Timing(5);

            // トリプルショットの発射間隔
            this.threeWayBulletTimer = ns.Timing(5);

            // 弾グループ
            this.bullet_group = tm.app.CanvasElement();

            // 一度だけ実行する(bullet_groupを親に追加)
            this.onceAddChild = ns.Once();

            // 設定時のポジションを保持する
            var initPosition;
            this.position.set = function (x, y) {
                initPosition = tm.geom.Vector2(x, y);
                this.x = x;
                this.y = y;
                this.set = function (x, y) {
                    this.x = x;
                    this.y = y;
                };
            };
            this._getInitPosition = function () {
                return initPosition;
            };
            this.isHitElement = function (elm) {
                var selfGlobalPos  = this.parent.localToGlobal(this);

                // 一旦thisの位置を保管
                var temp = this.position.clone();

                // 親の座標に変換
                var pos = this.getParentPosition(this.position.clone());
                this.position.set(pos.x, pos.y);
                
                if (((this.x-elm.x)*(this.x-elm.x)+(this.y-elm.y)*(this.y-elm.y)) < (this.radius+elm.radius)*(this.radius+elm.radius)) {
                    this.position.set(temp.x, temp.y);
                    return true;
                }
                this.position.set(temp.x, temp.y);
                return false;
            };
        },

        setPad : function (pad) {
            this.pad = pad;
        },

        // MAPの座標系に変換する
        getParentPosition : function () {
            // 値の範囲が 0 〜 2X の範囲になっているので
            // -X 〜 X に戻す
            var result = this.position.clone();
            result.x -= ns.MAP_WIDTH/2;
            result.y -= ns.MAP_HEIGHT/2;
            return result;
        },

        _moveLimit : function () {
            // 画面外に出ないように調整する
            var pos = this.position.clone();
            if (this.x < 0) {
                this.x = 0;
            }
            else if (ns.MAP_WIDTH < this.x) {
                this.x = ns.MAP_WIDTH;
            }
            if (this.y < 0) {
                this.y = 0;
            }
            else if (ns.MAP_HEIGHT < this.y) {
                this.y = ns.MAP_HEIGHT;
            }
        },

        // 描画処理を上書きする
        _draw : function (canvas) {
            // 表示有効チェック
            if (this.visible === false) return ;

            var context = canvas.context;
            context.save();
            context.fillStyle      = this.fillStyle;
            context.strokeStyle    = this.strokeStyle;
            context.globalAlpha    *= this.alpha;
            context.globalCompositeOperation = this.blendMode;
            if (this.shadowBlur > 0) {
                context.shadowColor     = this.shadowColor;
                context.shadowOffsetX   = this.shadowOffsetX;
                context.shadowOffsetY   = this.shadowOffsetY;
                context.shadowBlur      = this.shadowBlur;
            }
            // 画面内のplayer表示位置はParentクラスの表示系に依存する--------
            var playerPosition = this.getParentPosition();
            context.translate(playerPosition.x, playerPosition.y);
            //---------------------------------------------------------
            context.rotate(this.rotation * Math.DEG_TO_RAD);
            context.scale(this.scale.x, this.scale.y);
            this.draw(canvas);
            // 子供達も実行
            if (this.children.length > 0) {
                var tempChildren = this.children.slice();
                for (var i=0,len=tempChildren.length; i<len; ++i) {
                    tempChildren[i]._draw(canvas);
                }
            }
            context.restore();
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
            this.differential = tm.geom.Vector2.mul(this.velocity, this.speed);
            this.position.add(this.differential);

            // 摩擦
            this.speed *= 0.7;

            // 画面外に出ないように調整
            this._moveLimit();

            // ショット
            if (this.bulletTimer.update()
        	&& (ns.app.keyboard.getKeyDown("Z") || ns.app.pointing.getPointing())) {
            	// タイマーのリセット
            	this.bulletTimer.reset();

                // playerの親の座標に戻した位置を取得
                var mapPosition = this.getParentPosition(this.position);

                // bullet_groupを親に追加(一度しか実行しない)
                this.onceAddChild.call(
                    true,
                    this.getParent(),
                    this.getParent().addChild,
                    this.bullet_group);

        		var bullet = ns.Bullet(IMAGES["bullet"].rect[0], IMAGES["bullet"].rect[1], IMAGES["bullet"].image, this.pad.angle);
            	bullet.position.set(mapPosition.x, mapPosition.y);
                // groupに追加
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