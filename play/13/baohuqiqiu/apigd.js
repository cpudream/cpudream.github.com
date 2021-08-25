window.GD_OPTIONS = {
	gameId: "912e740c574741b1af92e99c12cce6d5",
	onEvent: function(a) {
		switch (a.name) {
			case "SDK_GAME_START":
				resumeGame();
				break;
			case "SDK_GAME_PAUSE":
				pauseGame()
		}
	}
};
(function(a, b, c) {
	var d = a.getElementsByTagName(b)[0];
	a.getElementById(c) || (a = a.createElement(b), a.id = c, 
		a.src = "", 
		d.parentNode.insertBefore(a, d))
})(document, "script", "gamedistribution-jssdk");

function resumeGame() {
	"undefined" != typeof my && (my.corepixi.BaseApp.paused = !1);
	console.log("Resume game")
}

function pauseGame() {
	// "undefined" != typeof my && (my.corepixi.BaseApp.paused = !0);
	console.log("Pause game")
}

function play() {
	console.log("play")
}

function sb() {
	// gdsdk && "function" == typeof gdsdk.showBanner && gdsdk.showBanner();
	console.log("b")
};