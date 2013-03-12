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
	tm.graphics.TextureManager.add("map", "rsc/background.png");

	tm.graphics.TextureManager.add("crash_brue", "rsc/crash_brue.png");
	tm.graphics.TextureManager.add("crash_red", "rsc/crash_red.png");
	tm.graphics.TextureManager.add("crash_green", "rsc/crash_green.png");

	// animation
	tm.graphics.TextureManager.add("star", "rsc/point.png");

//    tm.graphics.TextureManager.add("num1", "img/1.png");
});
