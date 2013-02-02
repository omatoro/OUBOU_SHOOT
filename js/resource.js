/**
 * リソースの読み込み
 */
tm.preload(function() {
	// sound
	tm.sound.SoundManager.add("bgm", "rsc/bgm.wav", 1);

	// img
	tm.graphics.TextureManager.add("bullet", "rsc/bullet.png");
	tm.graphics.TextureManager.add("player", "rsc/player.png");
	tm.graphics.TextureManager.add("outyaku", "rsc/outyaku.png");

//    tm.graphics.TextureManager.add("num1", "img/1.png");
});
