var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(y, ea, B) {
	y != Array.prototype && y != Object.prototype && (y[ea] = B.value)
};
$jscomp.getGlobal = function(y) {
	return "undefined" != typeof window && window === y ? y : "undefined" != typeof global && null != global ? global : y
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(y, ea, B, r) {
	if (ea) {
		B = $jscomp.global;
		y = y.split(".");
		for (r = 0; r < y.length - 1; r++) {
			var v = y[r];
			v in B || (B[v] = {});
			B = B[v]
		}
		y = y[y.length - 1];
		r = B[y];
		ea = ea(r);
		ea != r && null != ea && $jscomp.defineProperty(B, y, {
			configurable: !0,
			writable: !0,
			value: ea
		})
	}
};
$jscomp.polyfill("Object.is", function(y) {
	return y ? y : function(y, B) {
		return y === B ? 0 !== y || 1 / y === 1 / B : y !== y && B !== B
	}
}, "es6", "es3");
$jscomp.polyfill("Array.prototype.includes", function(y) {
	return y ? y : function(y, B) {
		var r = this;
		r instanceof String && (r = String(r));
		var v = r.length;
		for (B = B || 0; B < v; B++)
			if (r[B] == y || Object.is(r[B], y)) return !0;
		return !1
	}
}, "es7", "es3");
$jscomp.checkStringArgs = function(y, ea, B) {
	if (null == y) throw new TypeError("The 'this' value for String.prototype." + B + " must not be null or undefined");
	if (ea instanceof RegExp) throw new TypeError("First argument to String.prototype." + B + " must not be a regular expression");
	return y + ""
};
$jscomp.polyfill("String.prototype.includes", function(y) {
	return y ? y : function(y, B) {
		return -1 !== $jscomp.checkStringArgs(this, y, "includes").indexOf(y, B || 0)
	}
}, "es6", "es3");
$jscomp.findInternal = function(y, ea, B) {
	y instanceof String && (y = String(y));
	for (var r = y.length, v = 0; v < r; v++) {
		var fa = y[v];
		if (ea.call(B, fa, v, y)) return {
			i: v,
			v: fa
		}
	}
	return {
		i: -1,
		v: void 0
	}
};
$jscomp.polyfill("Array.prototype.find", function(y) {
	return y ? y : function(y, B) {
		return $jscomp.findInternal(this, y, B).v
	}
}, "es6", "es3");
(function(y, ea, B) {
	function r(a, b) {
		function c() {}
		c.prototype = a;
		a = new c;
		for (var d in b) a[d] = b[d];
		b.toString !== Object.prototype.toString && (a.toString = b.toString);
		return a
	}

	function v(a, b) {
		if (null == b) return null;
		null == b.__id__ && (b.__id__ = Ee++);
		var c;
		null == a.hx__closures__ ? a.hx__closures__ = {} : c = a.hx__closures__[b.__id__];
		null == c && (c = function() {
			return c.method.apply(c.scope, arguments)
		}, c.scope = a, c.method = b, a.hx__closures__[b.__id__] = c);
		return c
	}
	ea.my = ea.my || {};
	ea.my.corepixi = ea.my.corepixi || {};
	var fa = function() {};
	fa.__name__ = !0;
	fa.cca = function(a, b) {
		a = a.charCodeAt(b);
		if (a == a) return a
	};
	fa.substr = function(a, b, c) {
		if (null != b && 0 != b && null != c && 0 > c) return "";
		null == c && (c = a.length);
		0 > b ? (b = a.length + b, 0 > b && (b = 0)) : 0 > c && (c = a.length + c - b);
		return a.substr(b, c)
	};
	fa.indexOf = function(a, b, c) {
		var d = a.length;
		0 > c && (c += d, 0 > c && (c = 0));
		for (; c < d;) {
			if (a[c] === b) return c;
			c++
		}
		return -1
	};
	fa.remove = function(a, b) {
		b = fa.indexOf(a, b, 0);
		if (-1 == b) return !1;
		a.splice(b, 1);
		return !0
	};
	var bc = function() {
		this._animationFrameId = null;
		this.pixelRatio = 1;
		this.autoResize = !0;
		this.legacy = this.roundPixels = this.forceFXAA = this.antialias = this.transparent = !1;
		this.clearBeforeRender = !0;
		this.preserveDrawingBuffer = !1;
		this.backgroundColor = 16777215;
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.position = "static"
	};
	bc.__name__ = !0;
	bc.prototype = {
		start: function(a, b, c) {
			null == a && (a = "auto");
			null == c ? (this.canvas = window.document.createElement("canvas"), this.canvas.style.width = this.width + "px", this.canvas.style.height = this.height + "px", this.canvas.style.position = this.position) :
				this.canvas = c;
			this.autoResize && (window.onresize = v(this, this._onWindowResize));
			c = {};
			c.width = this.width | 0;
			c.height = this.height | 0;
			c.view = this.canvas;
			c.backgroundColor = this.backgroundColor;
			c.resolution = this.pixelRatio;
			c.antialias = this.antialias;
			c.forceFXAA = this.forceFXAA;
			c.autoResize = this.autoResize;
			c.transparent = this.transparent;
			c.clearBeforeRender = this.clearBeforeRender;
			c.preserveDrawingBuffer = this.preserveDrawingBuffer;
			c.roundPixels = this.roundPixels;
			c.legacy = this.legacy;
			if (null != a) switch (a) {
				case "canvas":
					c.forceCanvas = !0;
					this.app = new PIXI.Application(c);
					break;
				default:
					this.app = new PIXI.Application(c)
			} else this.app = new PIXI.Application(c);
			this.stage = this.app.stage;
			this.renderer = this.app.renderer;
			null == b ? window.document.body.appendChild(this.app.view) : b.appendChild(this.app.view);
			this.app.ticker.add(v(this, this._onRequestAnimationFrame))
		},
		_onWindowResize: function(a) {
			this.width = window.innerWidth;
			this.height = window.innerHeight;
			this.app.renderer.resize(this.width, this.height);
			this.canvas.style.width = this.width + "px";
			this.canvas.style.height = this.height + "px";
			if (null != this.onResize) this.onResize()
		},
		_onRequestAnimationFrame: function() {
			if (null != this.onUpdate) this.onUpdate(this.app.ticker.deltaTime)
		},
		__class__: bc
	};
	var lb = function() {
		this.disableGC = !1;
		this.numImagesToPrepare = 0;
		this.imagesToPrepare = [];
		this.isPrepared = !1;
		this.ticks = this.prevTime = this.dTime = 0;
		this.maxScaleFactor = 4;
		this.checkScaleFactor = !0;
		this.concurrency = -1;
		this.detectPixelRatio = !0;
		this.doRoundPixels = !1;
		this.isCanvas = this.useLegacy = !0;
		this.useStat = this.useCanvas = !1;
		this.imagesToLoad = [];
		this.numImagesTotal = this.numImagesLoaded = this.numSoundsTotal = this.numSoundsLoaded = 0;
		this.isLoaded = this.isImagesLoaded = this.isSoundsLoaded = !1;
		this.splashImage = "";
		this.inited = this.isApp = !1;
		this.minWH = this.maxWH = -1;
		this.fixedType = 0;
		this.appx = null;
		bc.call(this);
		this.init()
	};
	lb.__name__ = !0;
	lb.__super__ = bc;
	lb.prototype = r(bc.prototype, {
		prepare: function() {
			this.fixedType = 0;
			l.baseW = 480;
			l.baseH = 640;
			this.splashImage = ""
		},
		resize: function() {
			this.inited || this.init();
			this._onResize()
		},
		init: function() {
			if (!this.inited) {
				this.inited = !0;
				this.initParams();
				this.autoResize = !0;
				this.roundPixels = this.doRoundPixels;
				this.legacy = this.useLegacy;
				this.preserveDrawingBuffer = !0;
				this.disableGC && (PIXI.settings.GC_MODE = PIXI.GC_MODES.MANUAL);
				this.detectPixelRatio && 0 < window.devicePixelRatio && (this.pixelRatio = 1 != window.devicePixelRatio ? window.devicePixelRatio : 1, u.textScaleForSmooth = 1);
				bc.prototype.start.call(this, this.useCanvas ? "canvas" : "auto");
				this.isCanvas = this.app.renderer.type == PIXI.RENDERER_TYPE.CANVAS;
				this.initLangs();
				this.prepare();
				l.appW =
					l.baseW;
				l.appH = l.baseH;
				l.scale = 1;
				l.fps = 60;
				l.stageW = window.innerWidth;
				l.stageH = window.innerHeight;
				if (this.checkScaleFactor) {
					var a = 1;
					1 == this.fixedType ? a = l.stageH / l.baseH : 0 == this.fixedType ? a = -1 != this.maxWH && l.stageW / l.stageH > this.maxWH ? l.stageH * this.maxWH / l.baseW : l.stageW / l.baseW : 2 == this.fixedType && (a = Math.max(l.stageW / l.baseW, l.stageH / l.baseH));
					0 < window.devicePixelRatio && (a *= window.devicePixelRatio);
					l.scaleFactor = 1.01 > a ? 1 : 2.25 > a ? 2 : 4;
					l.scaleFactor > this.maxScaleFactor && (l.scaleFactor = this.maxScaleFactor)
				}
				this.prepareImagesToLoad();
				this.prepareSoundsToLoad();
				this.showSplash();
				this.isApp = !0;
				this.appx = new ka;
				this.stage.addChildAt(this.appx, 0);
				this.appx.init();
				this._onResize();
				this.onResize = v(this, this.resize);
				this.onUpdate = v(this, this.updatePreloader)
			}
		},
		prepareImagesToLoad: function() {},
		prepareSoundsToLoad: function() {},
		initParams: function() {
			this.backgroundColor = 16777215;
			this.useStat = !1
		},
		_onResize: function() {
			if (this.isApp && null != this.appx) {
				l.stageW = window.innerWidth;
				l.stageH = window.innerHeight;
				if (0 == this.fixedType) {
					var a = l.baseW;
					var b = l.stageW / a; - 1 != this.maxWH && l.stageW / l.stageH > this.maxWH && (b *= this.maxWH / (l.stageW / l.stageH));
					var c = Math.ceil(l.stageH / b); - 1 != this.minWH && l.stageW / l.stageH < this.minWH && (c = Math.ceil(a / this.minWH))
				} else 1 == this.fixedType ? (c = l.baseH, b = l.stageH / c, -1 != this.minWH && l.stageW / l.stageH < this.minWH && (b *= l.stageW / l.stageH / this.minWH), a = Math.ceil(l.stageW / b), -1 != this.maxWH && l.stageW / l.stageH > this.maxWH && (a = Math.ceil(c * this.maxWH))) : (b = Math.min(l.stageW / l.baseW, l.stageH / l.baseH), c = Math.ceil(l.stageH / b), a = Math.ceil(l.stageW /
					b));
				b = Math.ceil(100 * b) / 100;
				this.appx.set_scaleX(this.appx.set_scaleY(b));
				l.appW = a;
				l.appH = c;
				l.scale = b;
				l.dx = Math.round((l.stageW - a * b) / 2);
				l.dy = Math.round((l.stageH - c * b) / 2);
				this.appx.x = l.dx;
				this.appx.y = l.dy;
				this.appx.onResize(a, c, b);
				null != this.splash && (this.splash.set_scaleX(this.splash.set_scaleY(b)), this.splash.onResize(a, c), this.splash.x = l.dx, this.splash.y = l.dy);
				0 != l.dx || 0 != l.dy ? (null == this.maskg && (this.maskg = new nc, this.stage.addChild(this.maskg)), this.maskg.position.x = l.dx, this.maskg.position.y =
					l.dy, this.maskg.clear(), this.maskg.beginFill(0), this.maskg.drawRect(0, 0, Math.ceil(a * b), Math.ceil(c * b)), this.maskg.endFill(), this.stage.mask = this.maskg) : (this.stage.mask = null, null != this.maskg && (null != this.maskg.parent && this.stage.removeChild(this.maskg), this.maskg.clear(), this.maskg = null))
			}
		},
		addSplash: function() {
			this.splash = new ya(l.appW, l.appH);
			this.splash.setData("");
			this.splash.interactive = !0;
			u.addEventListener(this.splash, u.CLICK, v(this, this.onSplash))
		},
		showSplash: function() {
			null == this.splash &&
				this.addSplash();
			this.stage.addChild(this.splash);
			this.splashNum = 3;
			this.ticks = 0;
			this.timer = new Vc(1E3);
			this.timer.run = v(this, this.onSplashTimer);
			this.splash.enter()
		},
		onSplashTimer: function() {
			this.splashNum--;
			this.ticks++;
			2 == this.splashNum ? null != this.appx ? (this.loadAssets(), this.appx.initManagers()) : this.splashNum++ : 0 >= this.splashNum && this.isLoaded && this.isPrepared && (oc.isLoaded() || 25 <= this.ticks) && (this.splash.isReady ? (oc.isLoaded() || null, this.timer.stop(), this.timer = null, u.removeEventListener(this.splash,
				u.CLICK, v(this, this.onSplash)), this.stage.removeChild(this.splash), this.splash.exit(), this.splash = null, this.onPreStartApp(), this.appx.start(), this.dTime = 0, this.prevTime = lb.curTime = this.app.ticker.lastTime / 1E3, this.onUpdate = v(this, this.update)) : this.splash.isAllReadyToStart || (this.splash.isAllReadyToStart = !0))
		},
		onPreStartApp: function() {},
		update: function(a) {
			lb.curTime = this.app.ticker.lastTime / 1E3;
			this.dTime = lb.curTime - this.prevTime;
			this.prevTime = lb.curTime;
			this.appx.update(this.app.ticker.elapsedMS)
		},
		updatePreloader: function(a) {},
		onSplash: function(a) {},
		loadAssets: function() {
			"" != this.splashImage && this.imagesToLoad.unshift(u.assetsPrefix + "assets/img/" + l.scaleFactor + "/" + this.splashImage);
			this.numImagesLoaded = this.numSoundsLoaded = 0;
			this.numImagesTotal = this.imagesToLoad.length;
			this.numSoundsTotal = 0;
			this.isSoundsLoaded = !0;
			if (0 == this.numImagesTotal) this.isImagesLoaded = !0;
			else {
				var a = -1 == this.concurrency ? new PIXI.loaders.Loader : new PIXI.loaders.Loader("", this.concurrency);
				a.add(this.imagesToLoad);
				a.once("complete",
					v(this, this.onAssetsLoaded));
				a.on("progress", v(this, this.loadProgressHandler));
				a.load()
			}
			this.checkProgress()
		},
		loadProgressHandler: function(a, b) {
			"" != this.splashImage && null != this.splash && b.url == u.assetsPrefix + "assets/img/" + l.scaleFactor + "/" + this.splashImage && this.splash.setData(this.splashImage);
			this.numImagesLoaded = Math.round(a.progress * this.imagesToLoad.length / 100);
			this.checkProgress()
		},
		onAssetsLoaded: function() {
			this.numImagesLoaded = this.numImagesTotal;
			this.isImagesLoaded = !0;
			this.checkProgress()
		},
		checkProgress: function() {
			null;
			if (this.isImagesLoaded && this.isSoundsLoaded && !this.isLoaded) this.onAllLoaded();
			else null != this.splash && 0 < this.numSoundsTotal + this.numImagesTotal && this.splash.setProgress((this.numSoundsLoaded + this.numImagesLoaded) / (this.numSoundsTotal + this.numImagesTotal))
		},
		onAllLoaded: function() {
			0 == this.imagesToPrepare.length ? this.isPrepared = !0 : this.prepareImages();
			this.isLoaded = !0
		},
		prepareImages: function() {
			this.numImagesToPrepare = this.imagesToPrepare.length;
			for (var a = 0, b = this.numImagesToPrepare; a <
				b;) {
				var c = a++;
				this.app.renderer.plugins.prepare.upload(PIXI.Texture.fromImage(this.imagesToPrepare[c]), v(this, this.onPrepareImage))
			}
		},
		onPrepareImage: function() {
			this.numImagesToPrepare--;
			0 >= this.numImagesToPrepare && (this.isPrepared = !0)
		},
		initLangs: function() {
			var a = window.navigator.language;
			a = null != a && 2 <= a.length ? fa.substr(a, 0, 2).toLowerCase() : ""; - 1 != fa.indexOf(G.langs, a, 0) && (G.langId = fa.indexOf(G.langs, a, 0))
		},
		__class__: lb
	});
	var cc = function() {
		lb.call(this)
	};
	cc.__name__ = !0;
	cc.main = function() {
		new cc
	};
	cc.__super__ = lb;
	cc.prototype = r(lb.prototype, {
		initParams: function() {
			this.backgroundColor = 15658734;
			this.useCanvas = !0;
			this.doRoundPixels = !1;
			this.maxScaleFactor = 4;
			this.preserveDrawingBuffer = this.useLegacy = !0;
			mb.active = !1
		},
		prepare: function() {
			this.fixedType = 0;
			l.baseW = 480;
			l.baseH = 640;
			this.maxWH = .8;
			this.splashImage = "mokogames.png"
		},
		prepareImagesToLoad: function() {
			var a = u.assetsPrefix + "assets/img/" + l.scaleFactor + "/balloon.png";
			this.imagesToLoad.push(a);
			a;
			a = u.assetsPrefix + "assets/img/" + l.scaleFactor + "/btn_close.png";
			this.imagesToLoad.push(a);
			a;
			a = u.assetsPrefix + "assets/img/" + l.scaleFactor + "/btn_play.png";
			this.imagesToLoad.push(a);
			a;
			a = u.assetsPrefix + "assets/img/" + l.scaleFactor + "/btn_tw.png";
			this.imagesToLoad.push(a);
			a;
			a = u.assetsPrefix + "assets/img/" + l.scaleFactor + "/btn_gp.png";
			this.imagesToLoad.push(a);
			a;
			a = u.assetsPrefix + "assets/img/" + l.scaleFactor + "/btn_more.png";
			this.imagesToLoad.push(a);
			a;
			a = u.assetsPrefix + "assets/img/" + l.scaleFactor + "/tut.png";
			this.imagesToLoad.push(a);
			a;
			a = u.assetsPrefix + "assets/img/" + l.scaleFactor +
				"/clouds.png";
			this.imagesToLoad.push(a);
			a
		},
		__class__: cc
	});
	Math.__name__ = !0;
	var W = function() {};
	W.__name__ = !0;
	W.string = function(a) {
		return F.__string_rec(a, "")
	};
	W.parseInt = function(a) {
		var b = parseInt(a, 10);
		0 != b || 120 != fa.cca(a, 1) && 88 != fa.cca(a, 1) || (b = parseInt(a));
		return isNaN(b) ? null : b
	};
	var ie = function() {};
	ie.__name__ = !0;
	var Vc = function(a) {
		var b = this;
		this.id = setInterval(function() {
			b.run()
		}, a)
	};
	Vc.__name__ = !0;
	Vc.prototype = {
		stop: function() {
			null != this.id && (clearInterval(this.id), this.id = null)
		},
		run: function() {},
		__class__: Vc
	};
	var pc = function() {
		this.h = {}
	};
	pc.__name__ = !0;
	pc.__interfaces__ = [ie];
	pc.prototype = {
		set: function(a, b) {
			null != Gd[a] ? this.setReserved(a, b) : this.h[a] = b
		},
		get: function(a) {
			return null != Gd[a] ? this.getReserved(a) : this.h[a]
		},
		exists: function(a) {
			return null != Gd[a] ? this.existsReserved(a) : this.h.hasOwnProperty(a)
		},
		setReserved: function(a, b) {
			null == this.rh && (this.rh = {});
			this.rh["$" + a] = b
		},
		getReserved: function(a) {
			return null == this.rh ? null : this.rh["$" + a]
		},
		existsReserved: function(a) {
			return null == this.rh ? !1 :
				this.rh.hasOwnProperty("$" + a)
		},
		__class__: pc
	};
	var F = function() {};
	F.__name__ = !0;
	F.getClass = function(a) {
		if (a instanceof Array && null == a.__enum__) return Array;
		var b = a.__class__;
		if (null != b) return b;
		a = F.__nativeClassName(a);
		return null != a ? F.__resolveNativeClass(a) : null
	};
	F.__string_rec = function(a, b) {
		if (null == a) return "null";
		if (5 <= b.length) return "\x3c...\x3e";
		var c = typeof a;
		"function" == c && (a.__name__ || a.__ename__) && (c = "object");
		switch (c) {
			case "object":
				if (a instanceof Array) {
					if (a.__enum__) {
						if (2 == a.length) return a[0];
						c = a[0] + "(";
						b += "\t";
						for (var d = 2, e = a.length; d < e;) {
							var f = d++;
							c = 2 != f ? c + ("," + F.__string_rec(a[f], b)) : c + F.__string_rec(a[f], b)
						}
						return c + ")"
					}
					c = a.length;
					d = "[";
					b += "\t";
					for (e = 0; e < c;) f = e++, d += (0 < f ? "," : "") + F.__string_rec(a[f], b);
					return d + "]"
				}
				try {
					d = a.toString
				} catch (h) {
					return "???"
				}
				if (null != d && d != Object.toString && "function" == typeof d && (c = a.toString(), "[object Object]" != c)) return c;
				c = null;
				d = "{\n";
				b += "\t";
				e = null != a.hasOwnProperty;
				for (c in a) e && !a.hasOwnProperty(c) || "prototype" == c || "__class__" == c || "__super__" == c ||
					"__interfaces__" == c || "__properties__" == c || (2 != d.length && (d += ", \n"), d += b + c + " : " + F.__string_rec(a[c], b));
				b = b.substring(1);
				return d + ("\n" + b + "}");
			case "function":
				return "\x3cfunction\x3e";
			case "string":
				return a;
			default:
				return String(a)
		}
	};
	F.__interfLoop = function(a, b) {
		if (null == a) return !1;
		if (a == b) return !0;
		var c = a.__interfaces__;
		if (null != c)
			for (var d = 0, e = c.length; d < e;) {
				var f = d++;
				f = c[f];
				if (f == b || F.__interfLoop(f, b)) return !0
			}
		return F.__interfLoop(a.__super__, b)
	};
	F.__instanceof = function(a, b) {
		if (null == b) return !1;
		switch (b) {
			case Fe:
				return (a | 0) === a;
			case je:
				return "number" == typeof a;
			case ke:
				return "boolean" == typeof a;
			case String:
				return "string" == typeof a;
			case Array:
				return a instanceof Array && null == a.__enum__;
			case Ge:
				return !0;
			default:
				if (null != a)
					if ("function" == typeof b) {
						if (a instanceof b || F.__interfLoop(F.getClass(a), b)) return !0
					} else {
						if ("object" == typeof b && F.__isNativeObj(b) && a instanceof b) return !0
					}
				else return !1;
				return b == He && null != a.__name__ || b == Ie && null != a.__ename__ ? !0 : a.__enum__ == b
		}
	};
	F.__nativeClassName = function(a) {
		a =
			F.__toStr.call(a).slice(8, -1);
		return "Object" == a || "Function" == a || "Math" == a || "JSON" == a ? null : a
	};
	F.__isNativeObj = function(a) {
		return null != F.__nativeClassName(a)
	};
	F.__resolveNativeClass = function(a) {
		return B[a]
	};
	var x = function(a) {
		PIXI.Sprite.call(this, a)
	};
	x.__name__ = !0;
	x.__super__ = PIXI.Sprite;
	x.prototype = r(PIXI.Sprite.prototype, {
		set_mouseChildren: function(a) {
			return this.interactiveChildren = a
		},
		set_mouseEnabled: function(a) {
			return this.interactive = a
		},
		set_scaleX: function(a) {
			return this.scale.x = a
		},
		set_scaleY: function(a) {
			return this.scale.y =
				a
		},
		get_graphics: function() {
			null == this.graphics && (this.set_graphics(new nc), this.addChildAt(this.graphics, 0));
			return this.graphics
		},
		set_graphics: function(a) {
			return this.graphics = a
		},
		contains: function(a) {
			return -1 != fa.indexOf(this.children, a, 0)
		},
		__class__: x
	});
	var Na = ea.my.corepixi.BaseApp = function() {
		this.states = [];
		x.call(this)
	};
	Na.__name__ = !0;
	Na.__super__ = x;
	Na.prototype = r(x.prototype, {
		init: function() {
			this.active = !1
		},
		start: function() {
			this.initState();
			this.active = !0;
			this.dTime = 0
		},
		update: function(a) {
			this.dTime +=
				a;
			16 > this.dTime || (this.active && !Na.paused && this._state.update(.001 * this.dTime), this._state != this._nextState && this.changeState(), this.dTime = 0)
		},
		changeState: function() {
			null != this._state && (this._state.exit(), this.contains(this._state) && this.removeChild(this._state));
			this._state = this._nextState;
			this.addChild(this._state);
			this._state.enter()
		},
		setState: function(a, b) {
			null == b && (b = !1);
			this._nextState = a;
			b && this.changeState()
		},
		initState: function() {},
		get_state: function() {
			return this._state
		},
		onResize: function(a,
			b, c) {
			for (var d = 0, e = this.states.length; d < e;) {
				var f = d++;
				if (null != this.states[f]) this.states[f].onResize(a, b, c)
			}
		},
		__class__: Na
	});
	var ka = function() {
		Na.call(this);
		ka.app = this
	};
	ka.__name__ = !0;
	ka.__super__ = Na;
	ka.prototype = r(Na.prototype, {
		initManagers: function() {},
		initState: function() {
			this.menuState = new Ac(l.appW, l.appH, l.scale);
			this.playState = new Bc(l.appW, l.appH, l.scale);
			this.resultState = new Cc(l.appW, l.appH, l.scale);
			this.states = [this.menuState, this.playState, this.resultState];
			this.setState(this.menuState);
			this.changeState()
		},
		__class__: ka
	});
	var Tb = function(a, b) {
		null == b && (b = 0);
		null == a && (a = 0);
		this.encoder = 0;
		this.setValue(a, b)
	};
	Tb.__name__ = !0;
	Tb.prototype = {
		addValue: function(a) {
			a = W.parseInt(this.toString()) + a;
			this.setValue(a);
			Math.floor(Math.random());
			return this
		},
		setValue: function(a, b) {
			null == b && (b = 0);
			null == a && (a = 0);
			var c = null == a ? "null" : "" + a;
			var d = b++;
			this.fragment = fa.cca(c, d) ^ this.encoder;
			this.sibling = b < c.length ? new Tb(a, b) : null;
			this.reencode();
			return this
		},
		reencode: function() {
			var a = Math.floor(2147483647 *
				Math.random());
			this.fragment = this.fragment ^ a ^ this.encoder;
			this.encoder = a
		},
		toString: function() {
			var a = String.fromCharCode(this.fragment ^ this.encoder);
			null != this.sibling && (a += this.sibling.toString());
			return a
		},
		__class__: Tb
	};
	var A = function() {};
	A.__name__ = !0;
	var Va = function() {
		this.zpp_inner = new P;
		this.zpp_inner.outer = this
	};
	Va.__name__ = !0;
	Va.prototype = {
		toString: function() {
			return this == P.ANY_BODY ? "ANY_BODY" : this == P.ANY_SHAPE ? "ANY_SHAPE" : this == P.ANY_COMPOUND ? "ANY_COMPOUND" : this == P.ANY_CONSTRAINT ? "ANY_CONSTRAINT" :
				"CbType#" + this.zpp_inner.id
		},
		__class__: Va
	};
	var P = function() {
		this.cbsets = this.listeners = this.bodylisteners = this.conlisteners = null;
		this.id = 0;
		this.outer = null;
		this.id = M.CbType();
		this.listeners = new dc;
		this.bodylisteners = new Dc;
		this.conlisteners = new qc;
		this.constraints = new Cb;
		this.interactors = new Db;
		this.cbsets = new Ec
	};
	P.__name__ = !0;
	P.prototype = {
		addint: function(a) {
			for (var b = null, c = this.listeners.head; null != c;) {
				var d = c.elt;
				if (a.precedence > d.precedence || a.precedence == d.precedence && a.id > d.id) break;
				b = c;
				c = c.next
			}
			this.listeners.inlined_insert(b,
				a);
			this.invalidateint()
		},
		invalidateint: function() {
			for (var a = this.cbsets.head; null != a;) {
				var b = a.elt;
				b.zip_listeners = !0;
				b.invalidate_pairs();
				a = a.next
			}
		},
		addbody: function(a) {
			for (var b = null, c = this.bodylisteners.head; null != c;) {
				var d = c.elt;
				if (a.precedence > d.precedence || a.precedence == d.precedence && a.id > d.id) break;
				b = c;
				c = c.next
			}
			this.bodylisteners.inlined_insert(b, a);
			this.invalidatebody()
		},
		invalidatebody: function() {
			for (var a = this.cbsets.head; null != a;) a.elt.zip_bodylisteners = !0, a = a.next
		},
		addconstraint: function(a) {
			for (var b =
					null, c = this.conlisteners.head; null != c;) {
				var d = c.elt;
				if (a.precedence > d.precedence || a.precedence == d.precedence && a.id > d.id) break;
				b = c;
				c = c.next
			}
			this.conlisteners.inlined_insert(b, a);
			this.invalidateconstraint()
		},
		invalidateconstraint: function() {
			for (var a = this.cbsets.head; null != a;) a.elt.zip_conlisteners = !0, a = a.next
		},
		__class__: P
	};
	var M = function() {};
	M.__name__ = !0;
	M.Constraint = function() {
		return M._Constraint++
	};
	M.Interactor = function() {
		return M._Interactor++
	};
	M.CbType = function() {
		return M._CbType++
	};
	M.CbSet = function() {
		return M._CbSet++
	};
	M.Listener = function() {
		return M._Listener++
	};
	var dc = function() {
		this.length = 0;
		this.modified = this.pushmod = !1;
		this.head = null
	};
	dc.__name__ = !0;
	dc.prototype = {
		add: function(a) {
			return this.inlined_add(a)
		},
		inlined_add: function(a) {
			if (null == ha.zpp_pool) var b = new ha;
			else b = ha.zpp_pool, ha.zpp_pool = b.next, b.next = null;
			null;
			b.elt = a;
			b.next = this.head;
			this.head = b;
			this.modified = !0;
			this.length++;
			return a
		},
		inlined_insert: function(a, b) {
			if (null == ha.zpp_pool) var c = new ha;
			else c = ha.zpp_pool, ha.zpp_pool = c.next, c.next = null;
			null;
			c.elt = b;
			b = c;
			null == a ? (b.next = this.head, this.head = b) : (b.next = a.next, a.next = b);
			this.pushmod = this.modified = !0;
			this.length++;
			return b
		},
		inlined_pop: function() {
			var a = this.head;
			this.head = a.next;
			a.elt = null;
			a.next = ha.zpp_pool;
			ha.zpp_pool = a;
			null == this.head && (this.pushmod = !0);
			this.modified = !0;
			this.length--
		},
		remove: function(a) {
			this.inlined_try_remove(a)
		},
		inlined_try_remove: function(a) {
			for (var b = null, c = this.head, d = !1; null != c;) {
				if (c.elt == a) {
					this.inlined_erase(b);
					d = !0;
					break
				}
				b = c;
				c = c.next
			}
			return d
		},
		inlined_erase: function(a) {
			var b;
			if (null == a) {
				var c = this.head;
				this.head = b = c.next;
				null == this.head && (this.pushmod = !0)
			} else c = a.next, b = c.next, a.next = b, null == b && (this.pushmod = !0);
			a = c;
			a.elt = null;
			a.next = ha.zpp_pool;
			ha.zpp_pool = a;
			this.modified = !0;
			this.length--;
			this.pushmod = !0;
			return b
		},
		clear: function() {
			for (; null != this.head;) this.inlined_pop();
			this.pushmod = !0
		},
		inlined_clear: function() {
			for (; null != this.head;) this.inlined_pop();
			this.pushmod = !0
		},
		__class__: dc
	};
	var Dc = function() {
		this.length = 0;
		this.modified = this.pushmod = !1;
		this.head = null
	};
	Dc.__name__ = !0;
	Dc.prototype = {
		inlined_insert: function(a, b) {
			if (null == Ia.zpp_pool) var c = new Ia;
			else c = Ia.zpp_pool, Ia.zpp_pool = c.next, c.next = null;
			null;
			c.elt = b;
			b = c;
			null == a ? (b.next = this.head, this.head = b) : (b.next = a.next, a.next = b);
			this.pushmod = this.modified = !0;
			this.length++;
			return b
		},
		inlined_pop: function() {
			var a = this.head;
			this.head = a.next;
			a.elt = null;
			a.next = Ia.zpp_pool;
			Ia.zpp_pool = a;
			null == this.head && (this.pushmod = !0);
			this.modified = !0;
			this.length--
		},
		remove: function(a) {
			this.inlined_try_remove(a)
		},
		inlined_try_remove: function(a) {
			for (var b =
					null, c = this.head, d = !1; null != c;) {
				if (c.elt == a) {
					this.inlined_erase(b);
					d = !0;
					break
				}
				b = c;
				c = c.next
			}
			return d
		},
		inlined_erase: function(a) {
			var b;
			if (null == a) {
				var c = this.head;
				this.head = b = c.next;
				null == this.head && (this.pushmod = !0)
			} else c = a.next, b = c.next, a.next = b, null == b && (this.pushmod = !0);
			a = c;
			a.elt = null;
			a.next = Ia.zpp_pool;
			Ia.zpp_pool = a;
			this.modified = !0;
			this.length--;
			this.pushmod = !0;
			return b
		},
		clear: function() {
			for (; null != this.head;) this.inlined_pop();
			this.pushmod = !0
		},
		__class__: Dc
	};
	var qc = function() {
		this.length = 0;
		this.modified =
			this.pushmod = !1;
		this.head = null
	};
	qc.__name__ = !0;
	qc.prototype = {
		inlined_insert: function(a, b) {
			if (null == Eb.zpp_pool) var c = new Eb;
			else c = Eb.zpp_pool, Eb.zpp_pool = c.next, c.next = null;
			null;
			c.elt = b;
			b = c;
			null == a ? (b.next = this.head, this.head = b) : (b.next = a.next, a.next = b);
			this.pushmod = this.modified = !0;
			this.length++;
			return b
		},
		inlined_pop: function() {
			var a = this.head;
			this.head = a.next;
			a.elt = null;
			a.next = Eb.zpp_pool;
			Eb.zpp_pool = a;
			null == this.head && (this.pushmod = !0);
			this.modified = !0;
			this.length--
		},
		remove: function(a) {
			this.inlined_try_remove(a)
		},
		inlined_try_remove: function(a) {
			for (var b = null, c = this.head, d = !1; null != c;) {
				if (c.elt == a) {
					this.inlined_erase(b);
					d = !0;
					break
				}
				b = c;
				c = c.next
			}
			return d
		},
		inlined_erase: function(a) {
			var b;
			if (null == a) {
				var c = this.head;
				this.head = b = c.next;
				null == this.head && (this.pushmod = !0)
			} else c = a.next, b = c.next, a.next = b, null == b && (this.pushmod = !0);
			a = c;
			a.elt = null;
			a.next = Eb.zpp_pool;
			Eb.zpp_pool = a;
			this.modified = !0;
			this.length--;
			this.pushmod = !0;
			return b
		},
		clear: function() {
			for (; null != this.head;) this.inlined_pop();
			this.pushmod = !0
		},
		__class__: qc
	};
	var Cb = function() {
		this.length = 0;
		this.modified = this.pushmod = !1;
		this.head = null
	};
	Cb.__name__ = !0;
	Cb.prototype = {
		add: function(a) {
			return this.inlined_add(a)
		},
		inlined_add: function(a) {
			if (null == qa.zpp_pool) var b = new qa;
			else b = qa.zpp_pool, qa.zpp_pool = b.next, b.next = null;
			null;
			b.elt = a;
			b.next = this.head;
			this.head = b;
			this.modified = !0;
			this.length++;
			return a
		},
		insert: function(a, b) {
			return this.inlined_insert(a, b)
		},
		inlined_insert: function(a, b) {
			if (null == qa.zpp_pool) var c = new qa;
			else c = qa.zpp_pool, qa.zpp_pool = c.next, c.next =
				null;
			null;
			c.elt = b;
			b = c;
			null == a ? (b.next = this.head, this.head = b) : (b.next = a.next, a.next = b);
			this.pushmod = this.modified = !0;
			this.length++;
			return b
		},
		pop: function() {
			this.inlined_pop()
		},
		inlined_pop: function() {
			var a = this.head;
			this.head = a.next;
			a.elt = null;
			a.next = qa.zpp_pool;
			qa.zpp_pool = a;
			null == this.head && (this.pushmod = !0);
			this.modified = !0;
			this.length--
		},
		pop_unsafe: function() {
			return this.inlined_pop_unsafe()
		},
		inlined_pop_unsafe: function() {
			var a = this.head.elt;
			this.pop();
			return a
		},
		remove: function(a) {
			this.inlined_try_remove(a)
		},
		inlined_try_remove: function(a) {
			for (var b = null, c = this.head, d = !1; null != c;) {
				if (c.elt == a) {
					this.inlined_erase(b);
					d = !0;
					break
				}
				b = c;
				c = c.next
			}
			return d
		},
		erase: function(a) {
			return this.inlined_erase(a)
		},
		inlined_erase: function(a) {
			var b;
			if (null == a) {
				var c = this.head;
				this.head = b = c.next;
				null == this.head && (this.pushmod = !0)
			} else c = a.next, b = c.next, a.next = b, null == b && (this.pushmod = !0);
			a = c;
			a.elt = null;
			a.next = qa.zpp_pool;
			qa.zpp_pool = a;
			this.modified = !0;
			this.length--;
			this.pushmod = !0;
			return b
		},
		clear: function() {
			for (; null != this.head;) this.inlined_pop();
			this.pushmod = !0
		},
		iterator_at: function(a) {
			for (var b = this.head; 0 < a-- && null != b;) b = b.next;
			return b
		},
		__class__: Cb
	};
	var Db = function() {
		this.length = 0;
		this.modified = this.pushmod = !1;
		this.head = null
	};
	Db.__name__ = !0;
	Db.prototype = {
		add: function(a) {
			return this.inlined_add(a)
		},
		inlined_add: function(a) {
			if (null == Wa.zpp_pool) var b = new Wa;
			else b = Wa.zpp_pool, Wa.zpp_pool = b.next, b.next = null;
			null;
			b.elt = a;
			b.next = this.head;
			this.head = b;
			this.modified = !0;
			this.length++;
			return a
		},
		pop: function() {
			this.inlined_pop()
		},
		inlined_pop: function() {
			var a =
				this.head;
			this.head = a.next;
			a.elt = null;
			a.next = Wa.zpp_pool;
			Wa.zpp_pool = a;
			null == this.head && (this.pushmod = !0);
			this.modified = !0;
			this.length--
		},
		pop_unsafe: function() {
			return this.inlined_pop_unsafe()
		},
		inlined_pop_unsafe: function() {
			var a = this.head.elt;
			this.pop();
			return a
		},
		remove: function(a) {
			this.inlined_try_remove(a)
		},
		inlined_try_remove: function(a) {
			for (var b = null, c = this.head, d = !1; null != c;) {
				if (c.elt == a) {
					this.inlined_erase(b);
					d = !0;
					break
				}
				b = c;
				c = c.next
			}
			return d
		},
		inlined_erase: function(a) {
			var b;
			if (null == a) {
				var c =
					this.head;
				this.head = b = c.next;
				null == this.head && (this.pushmod = !0)
			} else c = a.next, b = c.next, a.next = b, null == b && (this.pushmod = !0);
			a = c;
			a.elt = null;
			a.next = Wa.zpp_pool;
			Wa.zpp_pool = a;
			this.modified = !0;
			this.length--;
			this.pushmod = !0;
			return b
		},
		clear: function() {
			for (; null != this.head;) this.inlined_pop();
			this.pushmod = !0
		},
		inlined_clear: function() {
			for (; null != this.head;) this.inlined_pop();
			this.pushmod = !0
		},
		iterator_at: function(a) {
			for (var b = this.head; 0 < a-- && null != b;) b = b.next;
			return b
		},
		__class__: Db
	};
	var Ec = function() {
		this.length =
			0;
		this.modified = this.pushmod = !1;
		this.head = null
	};
	Ec.__name__ = !0;
	Ec.prototype = {
		add: function(a) {
			return this.inlined_add(a)
		},
		inlined_add: function(a) {
			if (null == Fb.zpp_pool) var b = new Fb;
			else b = Fb.zpp_pool, Fb.zpp_pool = b.next, b.next = null;
			null;
			b.elt = a;
			b.next = this.head;
			this.head = b;
			this.modified = !0;
			this.length++;
			return a
		},
		pop: function() {
			this.inlined_pop()
		},
		inlined_pop: function() {
			var a = this.head;
			this.head = a.next;
			a.elt = null;
			a.next = Fb.zpp_pool;
			Fb.zpp_pool = a;
			null == this.head && (this.pushmod = !0);
			this.modified = !0;
			this.length--
		},
		pop_unsafe: function() {
			return this.inlined_pop_unsafe()
		},
		inlined_pop_unsafe: function() {
			var a = this.head.elt;
			this.pop();
			return a
		},
		remove: function(a) {
			this.inlined_try_remove(a)
		},
		inlined_try_remove: function(a) {
			for (var b = null, c = this.head, d = !1; null != c;) {
				if (c.elt == a) {
					this.inlined_erase(b);
					d = !0;
					break
				}
				b = c;
				c = c.next
			}
			return d
		},
		inlined_erase: function(a) {
			var b;
			if (null == a) {
				var c = this.head;
				this.head = b = c.next;
				null == this.head && (this.pushmod = !0)
			} else c = a.next, b = c.next, a.next = b, null == b && (this.pushmod = !0);
			a = c;
			a.elt = null;
			a.next = Fb.zpp_pool;
			Fb.zpp_pool = a;
			this.modified = !0;
			this.length--;
			this.pushmod = !0;
			return b
		},
		__class__: Ec
	};
	var rc = function(a, b, c, d, e) {
		null == e && (e = .001);
		null == d && (d = 1);
		null == c && (c = 2);
		null == b && (b = 1);
		null == a && (a = 0);
		this.zpp_inner = null;
		null == H.zpp_pool ? this.zpp_inner = new H : (this.zpp_inner = H.zpp_pool, H.zpp_pool = this.zpp_inner.next, this.zpp_inner.next = null);
		null;
		this.zpp_inner.outer = this;
		a != this.zpp_inner.elasticity && (this.zpp_inner.elasticity = a / 1, this.zpp_inner.invalidate(H.WAKE | H.ARBITERS));
		this.zpp_inner.elasticity;
		b != this.zpp_inner.dynamicFriction && (this.zpp_inner.dynamicFriction = b / 1, this.zpp_inner.invalidate(H.WAKE | H.ANGDRAG | H.ARBITERS));
		this.zpp_inner.dynamicFriction;
		c != this.zpp_inner.staticFriction && (this.zpp_inner.staticFriction = c / 1, this.zpp_inner.invalidate(H.WAKE | H.ARBITERS));
		this.zpp_inner.staticFriction;
		d != 1E3 * this.zpp_inner.density && (this.zpp_inner.density = d / 1E3, this.zpp_inner.invalidate(H.WAKE | H.PROPS));
		1E3 * this.zpp_inner.density;
		e != this.zpp_inner.rollingFriction && (this.zpp_inner.rollingFriction =
			e / 1, this.zpp_inner.invalidate(H.WAKE | H.ARBITERS));
		this.zpp_inner.rollingFriction
	};
	rc.__name__ = !0;
	rc.prototype = {
		toString: function() {
			return "{ elasticity: " + this.zpp_inner.elasticity + " dynamicFriction: " + this.zpp_inner.dynamicFriction + " staticFriction: " + this.zpp_inner.staticFriction + " density: " + 1E3 * this.zpp_inner.density + " rollingFriction: " + this.zpp_inner.rollingFriction + " }"
		},
		__class__: rc
	};
	var H = function() {
		this.dynamicFriction = this.staticFriction = this.density = this.elasticity = this.rollingFriction =
			0;
		this.next = this.outer = this.shapes = null;
		this.shapes = new Fc;
		this.elasticity = 0;
		this.dynamicFriction = 1;
		this.staticFriction = 2;
		this.density = .001;
		this.rollingFriction = .01
	};
	H.__name__ = !0;
	H.prototype = {
		wrapper: function() {
			if (null == this.outer) {
				this.outer = new rc;
				var a = this.outer.zpp_inner;
				a.outer = null;
				a.next = H.zpp_pool;
				H.zpp_pool = a;
				this.outer.zpp_inner = this
			}
			return this.outer
		},
		set: function(a) {
			this.dynamicFriction = a.dynamicFriction;
			this.staticFriction = a.staticFriction;
			this.density = a.density;
			this.elasticity = a.elasticity;
			this.rollingFriction = a.rollingFriction
		},
		invalidate: function(a) {
			for (var b = this.shapes.head; null != b;) b.elt.invalidate_material(a), b = b.next
		},
		__class__: H
	};
	var Fc = function() {
		this.length = 0;
		this.modified = this.pushmod = !1;
		this.head = null
	};
	Fc.__name__ = !0;
	Fc.prototype = {
		add: function(a) {
			return this.inlined_add(a)
		},
		inlined_add: function(a) {
			if (null == Oa.zpp_pool) var b = new Oa;
			else b = Oa.zpp_pool, Oa.zpp_pool = b.next, b.next = null;
			null;
			b.elt = a;
			b.next = this.head;
			this.head = b;
			this.modified = !0;
			this.length++;
			return a
		},
		insert: function(a,
			b) {
			return this.inlined_insert(a, b)
		},
		inlined_insert: function(a, b) {
			if (null == Oa.zpp_pool) var c = new Oa;
			else c = Oa.zpp_pool, Oa.zpp_pool = c.next, c.next = null;
			null;
			c.elt = b;
			b = c;
			null == a ? (b.next = this.head, this.head = b) : (b.next = a.next, a.next = b);
			this.pushmod = this.modified = !0;
			this.length++;
			return b
		},
		remove: function(a) {
			this.inlined_try_remove(a)
		},
		inlined_try_remove: function(a) {
			for (var b = null, c = this.head, d = !1; null != c;) {
				if (c.elt == a) {
					this.inlined_erase(b);
					d = !0;
					break
				}
				b = c;
				c = c.next
			}
			return d
		},
		inlined_erase: function(a) {
			var b;
			if (null == a) {
				var c = this.head;
				this.head = b = c.next;
				null == this.head && (this.pushmod = !0)
			} else c = a.next, b = c.next, a.next = b, null == b && (this.pushmod = !0);
			a = c;
			a.elt = null;
			a.next = Oa.zpp_pool;
			Oa.zpp_pool = a;
			this.modified = !0;
			this.length--;
			this.pushmod = !0;
			return b
		},
		iterator_at: function(a) {
			for (var b = this.head; 0 < a-- && null != b;) b = b.next;
			return b
		},
		__class__: Fc
	};
	var ia = function() {};
	ia.__name__ = !0;
	var G = function() {};
	G.__name__ = !0;
	var Gc = function() {};
	Gc.__name__ = !0;
	var od = function(a) {
		this.cacheObjects = new pc;
		this.cacheView =
			new pc;
		this.obsPoints = [40, 60, 80];
		this.views = [];
		this.isMovePlayer = !1;
		this.borderShiftBase = 0;
		this.isGameOver = !1;
		this.useHand = !0;
		this.slowMoFactorSlow = .2;
		this.slowMoFactor = 1;
		this.doDestroy = !1;
		this._tick = 0;
		this._scale = 1;
		this.cont = a;
		this.init()
	};
	od.__name__ = !0;
	od.prototype = {
		init: function() {
			this._scale = l.scale;
			this._h = l.appH;
			this._w = l.appW;
			this._halfW = Math.floor(this._w / 2);
			this._halfH = Math.floor(this._h / 2);
			this.reCalc();
			this.drawFon();
			this._allObjects = [];
			this._kinDynObjects = [];
			this.doDestroy || this.initWorld()
		},
		reset: function() {
			this._steps = this._tick = 0;
			this.curLevel = -1;
			this.nextObstaclesH = this.obsPoints[0];
			this.slowMoFactor = 1;
			this.gameStatus = -2;
			this.doDestroy && this.initWorld();
			this._space.zpp_inner.wrap_listeners.clear();
			this.removeObjects();
			this._allObjects = [];
			this._kinDynObjects = [];
			this.removeViews();
			this._space.clear();
			this.initObjects();
			this.addListeners();
			this.isGameOver = !1;
			this.gameStatus = 0;
			this.isMouseDown = !1;
			this._active = !0;
			this.update(0)
		},
		destroy: function() {
			if (null != this._allObjects)
				for (; 0 < this._allObjects.length;) this._allObjects.pop().destroy()
		},
		initWorld: function() {
			this.initConfig();
			this.initPhysics();
			this.additionalPhysics()
		},
		initConfig: function() {
			R.dt = .016666666666666666;
			R.gravityX = 0;
			R.gravityY = 120;
			R.debugEnabled = !1
		},
		initPhysics: function() {
			this._space = new Wc(D.get(R.gravityX, R.gravityY, !0));
			this._space.set_worldLinearDrag(R.worldLinearDrag);
			this._space.set_worldAngularDrag(R.worldAngularDrag);
			this._steps = this._tick = 0;
			R.debugEnabled && this.addDebug()
		},
		addDebug: function() {},
		onResizeDebug: function() {
			null != this._debug && null != this._debug.display &&
				(this.cont.contains(this._debug.display) && this.cont.removeChild(this._debug.display), this._debug.clear(), this._debug = null, this.addDebug())
		},
		additionalPhysics: function() {
			this.useHand && (this.hand = new pd(this._space.zpp_inner.__static, null, D.get(0, 0, !0), D.get(0, 0, !0)), this.hand.set_active(!1), this.hand.set_stiff(!1), this.hand.set_maxForce(1E3), this.hand.set_space(this._space), u.addEventListener(this.cont, u.MOUSE_DOWN, v(this, this.mouseDown)), u.addEventListener(this.cont, u.MOUSE_UP, v(this, this.mouseUp)),
				u.addEventListener(this.cont, u.MOUSE_MOVE, v(this, this.mouseMove)))
		},
		initObjects: function() {
			if (null == this.playerObj) {
				var a = this._space;
				if (this.isMovePlayer) {
					null == g.BodyType_KINEMATIC && (g.BodyType_KINEMATIC = new X, g.internal = !1);
					var b = g.BodyType_KINEMATIC
				} else null == g.BodyType_DYNAMIC && (g.BodyType_DYNAMIC = new X, g.internal = !1), b = g.BodyType_DYNAMIC;
				this.playerObj = new qd(a, b, 30, 72)
			} else this.playerObj._body.set_space(this._space);
			this.isMovePlayer || this.playerObj.fix(!0);
			this._allObjects.push(this.playerObj);
			null == this.protectorObj ? (a = this._space, null == g.BodyType_DYNAMIC && (g.BodyType_DYNAMIC = new X, g.internal = !1), this.protectorObj = new Xc(a, g.BodyType_DYNAMIC, 24)) : this.protectorObj._body.set_space(this._space);
			this.protectorObj._body.set_allowRotation(!1);
			this._allObjects.push(this.protectorObj);
			null == this.playerView && (this.playerView = new sc, this.playerView.setView());
			this.cont.addChild(this.playerView);
			this.playerObj.setView(this.playerView);
			null == this.protectorView && (this.protectorView = new Yc, this.protectorView.setData(24,
				16777215));
			this.cont.addChild(this.protectorView);
			this.protectorObj.setView(this.protectorView);
			this.playerObj.resetPhysics();
			this.playerObj.setPosition(this._w / 2, this._h - 150);
			this.playerObj.setRotation(0);
			this.playerObj.resetPhysics();
			this.isMovePlayer && this.playerObj._body.get_velocity().set_y(-120);
			this.protectorObj.setPosition(this._w / 2, this._h / 2);
			null != this.hand && (null == this.hand.get_space() && this.hand.set_space(this._space), this.hand.get_anchor1().setxy(this._w / 2, this._h / 2), this.hand.set_body2(this.protectorObj._body),
				this.hand.get_anchor2().setxy(0, 0), this.hand.set_active(!0))
		},
		addListeners: function() {
			var a = tc;
			null == g.CbEvent_BEGIN && (g.CbEvent_BEGIN = new ma, g.internal = !1);
			var b = g.CbEvent_BEGIN;
			null == g.InteractionType_COLLISION && (g.InteractionType_COLLISION = new za, g.internal = !1);
			this.listenerObstacles = new a(b, g.InteractionType_COLLISION, ia.CB_OBSTACLE, P.ANY_BODY, v(this, this.listenerObstaclesHandler));
			this._space.zpp_inner.wrap_listeners.add(this.listenerObstacles);
			a = tc;
			null == g.CbEvent_BEGIN && (g.CbEvent_BEGIN = new ma,
				g.internal = !1);
			b = g.CbEvent_BEGIN;
			null == g.InteractionType_COLLISION && (g.InteractionType_COLLISION = new za, g.internal = !1);
			this.listenerCollide = new a(b, g.InteractionType_COLLISION, ia.CB_OBSTACLE, ia.CB_PLAYER, v(this, this.listenerCollideHandler));
			this._space.zpp_inner.wrap_listeners.add(this.listenerCollide);
			a = tc;
			null == g.CbEvent_BEGIN && (g.CbEvent_BEGIN = new ma, g.internal = !1);
			b = g.CbEvent_BEGIN;
			null == g.InteractionType_SENSOR && (g.InteractionType_SENSOR = new za, g.internal = !1);
			this.listenerSensor = new a(b, g.InteractionType_SENSOR,
				ia.CB_OBSTACLE, ia.CB_PLAYER, v(this, this.listenerCollideHandler));
			this._space.zpp_inner.wrap_listeners.add(this.listenerSensor)
		},
		listenerCollideHandler: function(a) {
			this.isGameOver || (this.isMovePlayer || this.playerObj.setPosition(-100, 0), this.gameOver())
		},
		listenerObstaclesHandler: function(a) {
			var b = this.getObjectFromBody(a.zpp_inner.int1.outer_i.get_castBody(), this._kinDynObjects);
			null == b || b.isDynamic || b.doDynamic(!0);
			b = this.getObjectFromBody(a.zpp_inner.int2.outer_i.get_castBody(), this._kinDynObjects);
			null == b || b.isDynamic || b.doDynamic(!0)
		},
		checkAddPhysics: function() {},
		getObjectFromBody: function(a, b) {
			for (var c = 0; c < b.length;) {
				var d = b[c];
				++c;
				if (d._body == a) return d
			}
			return null
		},
		updatePhysics: function(a) {
			if (0 != a) {
				this.checkAddPhysics();
				var b = !1;
				a = Math.round(a / R.dt);
				4 < a && (a = 4);
				for (0 == a ? b = !0 : R.debugEnabled && this._debug.clear(); 0 < a--;) this.preStep(R.dt), null != this._space && (this._space.step(R.dt * this.slowMoFactor, 10, 10), this._steps++);
				this.isMovePlayer && this.updateCamera();
				R.debugEnabled && (null == this._space ||
					b || this._debug.draw(this._space), b || this._debug.flush())
			}
		},
		preStep: function(a) {},
		update: function(a) {
			if (this._active) {
				this._tick++;
				this.updateInput(a);
				this.updatePhysics(a);
				for (var b = this._allObjects.length - 1; 0 <= b;) this.obj = this._allObjects[b], this.obj.update(a, this._tick), this.obj != this.protectorObj && this.obj != this.playerObj && (!this.obj.prepared && this.obj._body.get_position().get_y() > this._h / 2 && (this.obj.prepared = !0, this.obj._body.applyImpulse(D.get(0, .5, null))), this.obj._body.get_position().get_y() >
					this._h + 100 && (this.removeView(this.obj._view), this.removeObject(this.obj))), b--;
				this.isGameOver || (this.updateHeight(), this.checkObstacles())
			}
		},
		updateInput: function(a) {},
		enter: function() {},
		exit: function() {
			this.doDestroy ? this.destroy() : (this.removeObjects(), this.update(0), R.debugEnabled && this._debug.clear());
			this._active = !1
		},
		onResize: function() {
			if (this._w != l.appW || this._h != l.appH || this._scale != l.scale) {
				this._w = l.appW;
				this._h = l.appH;
				this._scale = l.scale;
				this._halfW = Math.floor(this._w / 2);
				this._halfH = Math.floor(this._h /
					2);
				this.borderShift = Math.round(this.borderShiftBase / this._scale);
				this.reCalc();
				this.drawFon();
				if (R.debugEnabled) this.onResizeDebug();
				this.positionItems()
			}
		},
		mouseMove: function(a) {
			this.isMouseDown && this.checkXY(a)
		},
		mouseDown: function(a) {
			!this._active || this.isMouseDown || this.isGameOver || (this.isMouseDown = !0, this.startX = this.curX = this.prevX = a.data.global.x, this.startY = this.curY = this.prevY = a.data.global.y, this.pointX = this.protectorObj._body.get_position().get_x(), this.pointY = this.protectorObj._body.get_position().get_y(),
				this.hand.get_anchor1().setxy(this.pointX, this.pointY), null == this.hand.get_space() && this.hand.set_space(this._space))
		},
		mouseUp: function(a) {
			this.isMouseDown && (this.checkXY(a), this.isMouseDown = !1)
		},
		checkXY: function(a) {
			this.curX = a.data.global.x;
			this.curY = a.data.global.y;
			a = (this.curX - this.startX) / this._scale * 1.2;
			var b = (this.curY - this.startY) / this._scale * 1.2;
			this.hand.get_anchor1().setxy(this.pointX + a, this.pointY + b)
		},
		drawFon: function() {},
		updateCamera: function() {
			this.cont.y = this._h - 150 - this.playerObj._body.get_position().get_y()
		},
		reCalc: function() {},
		updateHeight: function() {
			this.curH = Math.floor(.1 * this._steps)
		},
		gameOver: function() {
			this.isGameOver = !0;
			this.isMouseDown = !1;
			this.gameStatus = -1;
			this.onGameOver()
		},
		gameOverShow: function() {
			this.switchSlowMo(!0)
		},
		switchSlowMo: function(a) {
			this.slowMoFactor = a ? this.slowMoFactorSlow : 1
		},
		continueAdditionalGame: function() {
			this.isMouseDown = this.isGameOver = !1;
			this.slowMoFactor = 1;
			this.gameStatus = 0;
			this.removeNearObjects();
			this.positionItems()
		},
		removeNearObjects: function() {
			for (var a = this._allObjects.length -
					1; 0 <= a;) this.obj = this._allObjects[a], this.obj != this.protectorObj && this.obj != this.playerObj && 0 < this.obj._body.get_position().get_y() && (this.removeView(this.obj._view), this.removeObject(this.obj)), a--
		},
		positionItems: function() {
			this.isGameOver || (null != this.playerObj && (this.playerObj.resetPhysics(), this.playerObj.setPosition(this._w / 2, this._h - 150), this.playerObj.resetPhysics()), null != this.playerView && (this.playerView.x = this._w / 2, this.playerView.y = this._h - 150))
		},
		removeObjects: function(a) {
			null == a && (a = !0);
			for (var b = this._allObjects.length - 1; 0 <= b;) this._allObjects[b] != this.playerObj && this._allObjects[b] != this.protectorObj && this.removeObject(this._allObjects[b], a), b--
		},
		removeObject: function(a, b) {
			null == b && (b = !0);
			fa.remove(this._kinDynObjects, a);
			fa.remove(this._allObjects, a);
			b ? this.setObj(a) : a.destroy()
		},
		getObj: function(a, b, c) {
			var d = a + "_" + b + "_" + c;
			this.cacheObjects.exists(d) || this.cacheObjects.set(d, []);
			d = this.cacheObjects.get(d);
			0 < d.length ? (d = d.pop(), d.setRotation(0), d.resetPhysics(), d.setBodyToSpace(this._space)) :
				(d = this._space, null == g.BodyType_DYNAMIC && (g.BodyType_DYNAMIC = new X, g.internal = !1), d = new rd(d, g.BodyType_DYNAMIC), d.setData(a, b, c));
			return d
		},
		setObj: function(a) {
			var b = a.obType + "_" + a.w + "_" + a.h;
			this.cacheObjects.exists(b) || this.cacheObjects.set(b, []);
			a.setRotation(0);
			a.resetPhysics();
			a.removeBodyFromSpace();
			this.cacheObjects.get(b).push(a)
		},
		removeViews: function(a) {
			null == a && (a = !0);
			for (var b = this.views.length - 1; 0 <= b;) this.removeView(this.views[b], a), b--;
			this.views = []
		},
		removeView: function(a, b) {
			null == b &&
				(b = !0);
			null != a && fa.remove(this.views, a) && (this.cont.contains(a) && this.cont.removeChild(a), b && this.setView(a))
		},
		setView: function(a) {
			var b = a.obType + "_" + a.dynType + "_" + a.w + "_" + a.h;
			this.cacheView.exists(b) || this.cacheView.set(b, []);
			this.cacheView.get(b).push(a)
		},
		getView: function(a, b, c, d) {
			var e = a + "_" + b + "_" + c + "_" + d;
			this.cacheView.exists(e) || this.cacheView.set(e, []);
			e = this.cacheView.get(e);
			if (0 < e.length) return e.pop();
			e = new sd;
			e.setData(a, b, c, d);
			return e
		},
		checkObstacles: function() {
			this.curLevel != Math.floor(this.curH /
				100) && (this.curLevel = Math.floor(this.curH / 100), 0 == this.curLevel && this.addLevelObstacles(0), this.addLevelObstacles(this.curLevel + 1))
		},
		addLevelObstacles: function(a) {
			var b = -(2E3 * a - 2 * this._steps);
			a = Ca.getLevel(0 != a);
			for (var c = 0, d = a.length; c < d;) {
				var e = c++;
				this.addLevelObstacle(a[e], b)
			}
		},
		addLevelObstacle: function(a, b) {
			var c = null != a.my ? 20 * -a.my : 0;
			var d = a.obType;
			var e = null != a.dynType ? a.dynType : 0;
			var f = a.w;
			var h = null != a.h ? a.h : f;
			var m = null != a.rot ? a.rot * Math.PI / 180 : 0;
			var k = null != a.n ? a.n : 1;
			var g = null != a.dx ? a.dx :
				0;
			var p = null != a.dy ? -a.dy : 0;
			var n = null != a.rn ? a.rn : 1;
			var l = null != a.drx ? a.drx : 0;
			var Q = null != a.drmy ? 20 * -a.drmy : 0;
			0 == Q && (Q = null != a.dry ? -a.dry : 0);
			for (var q, r = 0; r < n;)
				for (var v = r++, u = 0; u < k;) {
					var y = u++;
					q = this.getObj(d, f, h);
					q.setPosition(a.x + g * y + l * v, -a.y + b + c + this._h + p * y + Q * v);
					this._allObjects.push(q);
					0 == e && this._kinDynObjects.push(q);
					q.setRotation(m);
					this.isMovePlayer || (q.doDynamic(!1), q._body.get_velocity().set_y(120));
					this.view = this.getView(d, e, f, h);
					this.view.x = -999;
					this.cont.addChild(this.view);
					q.setView(this.view);
					this.views.push(this.view)
				}
		},
		__class__: od
	};
	var Pa = function(a, b) {
		this.curColors = [];
		this.colors = [14047320, 16280920, 15962414, 16239181, 15913262, 12117477, 1026008, 559284, 7299032, 2058408, 12479194, 16154031];
		x.call(this);
		this._w = a;
		this._h = b;
		this.init()
	};
	Pa.__name__ = !0;
	Pa.__super__ = x;
	Pa.prototype = r(x.prototype, {
		init: function() {
			this.s1 = new x;
			this.addChild(this.s1);
			this.s2 = new x;
			this.addChild(this.s2);
			this.movingSprite = new x;
			this.addChild(this.movingSprite);
			var a = new K(PIXI.Texture.fromImage(u.assetsPrefix + "assets/img/" +
				l.scaleFactor + "/clouds.png"));
			a.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR;
			a.scale.x = a.scale.y = 1 / l.scaleFactor;
			this.bitmap = a;
			this.bitmap.y = -85;
			this.movingSprite.addChild(this.bitmap);
			a = this.tf = u.getText(A.fonts[0], 180, l.appW, 240);
			a.style.fill = 16777215;
			a.color = 16777215;
			this.tf.alpha = .55;
			this.movingSprite.addChild(this.tf);
			this.tf.interactive = !1;
			this.tf.y = -350;
			this.set_mouseChildren(!1);
			this.set_mouseEnabled(!1);
			this.reInit()
		},
		reInit: function() {
			this.color1 = Pa.startColor;
			this.color2 = this.getNextColor(!1);
			this.redrawSprite(this.s1, this.color1);
			this.redrawSprite(this.s2, this.color2);
			this.curSprite = this.s1;
			this.nextSprite = this.s2;
			this.changed = !0;
			this.curSprite.y = this._h;
			this.nextSprite.visible = !1;
			this.setLevel(0);
			this.setY(this._h)
		},
		onResize: function(a, b) {
			this._w = a;
			this._h = b;
			this.redrawFon();
			this.curSprite.y = b
		},
		setLevel: function(a) {
			this.level != a && (this.level = a, this.tf.text = 0 < a ? "" + a : "")
		},
		setY: function(a) {
			this.movingSprite.y = a;
			this.nextSprite.y = a; - 10 < a && 0 > a && this.changed && (this.changed = !1, this.nextSprite.visible = !0);
			a >= this._h && !this.changed && (this.nextSprite.y = this._h, this.changed = !0, this.nextSprite == this.s1 ? (this.nextSprite = this.s2, this.curSprite = this.s1) : (this.nextSprite = this.s1, this.curSprite = this.s2), this.addChildAt(this.nextSprite, 1), this.nextSprite.visible = !1, this.color1 = this.color2, this.color2 = this.getNextColor(), this.redrawSprite(this.nextSprite, this.color2))
		},
		getNextColor: function(a) {
			null == a && (a = !0);
			0 == this.curColors.length && (this.curColors = this.colors.slice(0), a && this.curColors.push(Pa.startColor));
			return this.curColors.splice(Math.floor(Math.random() * this.curColors.length), 1)[0]
		},
		redrawFon: function() {
			this.redrawSprite(this.curSprite, this.color1);
			this.redrawSprite(this.nextSprite, this.color2)
		},
		redrawSprite: function(a, b) {
			a.get_graphics().clear();
			a.get_graphics().beginFill(b);
			a.get_graphics().drawRect(0, 0, this._w, -this._h);
			a.get_graphics().endFill()
		},
		__class__: Pa
	});
	var Ca = function() {};
	Ca.__name__ = !0;
	Ca.getLevel = function(a) {
		if (a) {
			if (0 == Ca.nextLevels.length) {
				a = 0;
				for (var b = Ca.levels.length; a < b;) {
					var c =
						a++;
					Ca.nextLevels.push(c)
				}
			}
			a = Ca.nextLevels.splice(Math.floor(Math.random() * Ca.nextLevels.length), 1)[0];
			return Ca.levels[a]
		}
		return Ca.tutLevel
	};
	var ra = function(a, b) {
		this.fixed = this.isDynamic = this.prepared = !1;
		this._space = a;
		this._bodyType = b;
		this._position = D.get(0, 0, !0);
		this._rotation = 0;
		this._material = this._body = this._view = null;
		this._shapes = [];
		this.rotationEnabled = !0;
		this.needReset = !1;
		null == g.BodyType_DYNAMIC && (g.BodyType_DYNAMIC = new X, g.internal = !1);
		this.isDynamic = b == g.BodyType_DYNAMIC ? !0 : !1
	};
	ra.__name__ = !0;
	ra.prototype = {
		setPosition: function(a, b) {
			if (null != this._body) {
				var c = this._bodyType;
				null == g.BodyType_STATIC && (g.BodyType_STATIC = new X, g.internal = !1);
				c != g.BodyType_STATIC ? this._body.get_position().setxy(a, b) : (this._body.set_type(function(a) {
					null == g.BodyType_KINEMATIC && (g.BodyType_KINEMATIC = new X, g.internal = !1);
					return g.BodyType_KINEMATIC
				}(this)), this._body.get_position().setxy(a, b), this._body.set_type(function(a) {
					null == g.BodyType_STATIC && (g.BodyType_STATIC = new X, g.internal = !1);
					return g.BodyType_STATIC
				}(this)))
			}
			null !=
				this._view && (this._view.x = a, this._view.y = b)
		},
		setRotation: function(a) {
			this._rotation = a
		},
		destroy: function() {
			null != this._body && (this._body.set_space(null), this._body = null);
			null != this._view && (null != this._view.parent && this._view.parent.removeChild(this._view), this._view.get_graphics().clear(), this._view = null)
		},
		update: function(a, b) {
			this.updatePhysics(a, b);
			this.updateGraphics(a, b)
		},
		updatePhysics: function(a, b) {
			this.needReset && (this.resetPhysics(), this.needReset = !1)
		},
		resetPhysics: function() {
			if (null != this._body) {
				this._body.get_velocity().setxy(0,
					0);
				this._body.set_angularVel(0);
				var a = db.types[this._body.zpp_inner.type];
				null == g.BodyType_DYNAMIC && (g.BodyType_DYNAMIC = new X, g.internal = !1);
				a == g.BodyType_DYNAMIC && this._body.set_torque(0);
				this._body.get_surfaceVel().setxy(0, 0)
			}
		},
		updateGraphics: function(a, b) {
			null != this._view && null != this._body && (this._view.x = this._body.get_position().get_x(), this._view.y = this._body.get_position().get_y(), this.rotationEnabled && (this._view.rotation = this._body.zpp_inner.rot))
		},
		setView: function(a) {
			this._view = a
		},
		fix: function(a) {
			this.fixed !=
				a && (this.fixed = a, this._body.set_allowMovement(!a), this._body.set_allowRotation(!a), a && (this.needReset = !0))
		},
		doDynamic: function(a) {
			this.isDynamic != a && (this._body.set_type(a ? function(a) {
				null == g.BodyType_DYNAMIC && (g.BodyType_DYNAMIC = new X, g.internal = !1);
				return g.BodyType_DYNAMIC
			}(this) : function(a) {
				null == g.BodyType_KINEMATIC && (g.BodyType_KINEMATIC = new X, g.internal = !1);
				return g.BodyType_KINEMATIC
			}(this)), this.isDynamic = a)
		},
		setBodyToSpace: function(a) {
			this._space = a;
			this._body.set_space(a)
		},
		removeBodyFromSpace: function() {
			this._body.set_space(null)
		},
		__class__: ra
	};
	var qd = function(a, b, c, d) {
		this.radius = 2.5;
		ra.call(this, a, b);
		this.radius = c;
		this.h = d;
		this.prepare(b)
	};
	qd.__name__ = !0;
	qd.__super__ = ra;
	qd.prototype = r(ra.prototype, {
		prepare: function(a) {
			this._body = new ec(a);
			this.shape = new Ub(this.radius, D.get(0, 0, !0), ia.obstacleMaterial);
			this._body.zpp_inner.wrap_shapes.add(this.shape);
			this.shape = new Ub(this.radius, D.get(0, this.h - 2 * this.radius, !0), ia.obstacleMaterial);
			this._body.zpp_inner.wrap_shapes.add(this.shape);
			this.shape = new Qa(Qa.rect(-this.radius, 0,
				2 * this.radius, this.h - 2 * this.radius), ia.obstacleMaterial);
			this._body.zpp_inner.wrap_shapes.add(this.shape);
			this.shape = new Ub(this.radius, D.get(0, 0, !0), ia.obstacleMaterial);
			this.shape.set_sensorEnabled(!0);
			this._body.zpp_inner.wrap_shapes.add(this.shape);
			this.shape = new Ub(this.radius, D.get(0, this.h - 2 * this.radius, !0), ia.obstacleMaterial);
			this.shape.set_sensorEnabled(!0);
			this._body.zpp_inner.wrap_shapes.add(this.shape);
			this.shape = new Qa(Qa.rect(-this.radius, 0, 2 * this.radius, this.h - 2 * this.radius), ia.obstacleMaterial);
			this.shape.set_sensorEnabled(!0);
			this._body.zpp_inner.wrap_shapes.add(this.shape);
			this._body.get_cbTypes().add(ia.CB_PLAYER);
			this._body.set_space(this._space)
		},
		setRotation: function(a) {
			ra.prototype.setRotation.call(this, a);
			this._body.set_rotation(a)
		},
		__class__: qd
	});
	var Xc = function(a, b, c) {
		this.radius = 2.5;
		ra.call(this, a, b);
		this.radius = c;
		this.prepare(b)
	};
	Xc.__name__ = !0;
	Xc.__super__ = ra;
	Xc.prototype = r(ra.prototype, {
		prepare: function(a) {
			this._body = new ec(a);
			this.shape = new Ub(this.radius, D.get(0, 0, !0), ia.protectorMaterial);
			this._body.zpp_inner.wrap_shapes.add(this.shape);
			this._body.get_cbTypes().add(ia.CB_PROTECTOR);
			this._body.set_space(this._space)
		},
		fix: function(a) {
			ra.prototype.fix.call(this, a);
			this._body.set_allowRotation(!1)
		},
		__class__: Xc
	});
	var Hc = function(a, b) {
		ra.call(this, a, b)
	};
	Hc.__name__ = !0;
	Hc.__super__ = ra;
	Hc.prototype = r(ra.prototype, {
		setData: function(a, b, c) {
			null == c && (c = -1);
			this.obType = a;
			this.w = b; - 1 == c && (c = b);
			this.h = c;
			this.w2 = b / 2;
			this.h2 = c / 2;
			this.prepare(b, c)
		},
		prepare: function(a, b) {},
		setRotation: function(a) {
			ra.prototype.setRotation.call(this,
				a);
			null != this._body && this._body.set_rotation(a)
		},
		__class__: Hc
	});
	var R = function() {};
	R.__name__ = !0;
	var rd = function(a, b) {
		ra.call(this, a, b)
	};
	rd.__name__ = !0;
	rd.__super__ = Hc;
	rd.prototype = r(Hc.prototype, {
		prepare: function(a, b) {
			Hc.prototype.prepare.call(this, a, b);
			this._body = new ec(this._bodyType);
			0 == this.obType ? this._shapes.push(new Qa(Qa.box(a, a), ia.obstacleMaterial)) : 1 == this.obType ? this._shapes.push(new Ub(a / 2, D.get(0, 0, !0), ia.obstacleMaterial)) : 2 == this.obType && this._shapes.push(new Qa(Qa.rect(-a / 2, -b / 2,
				a, b), ia.obstacleMaterial));
			a = 0;
			for (b = this._shapes.length; a < b;) {
				var c = a++;
				this._body.zpp_inner.wrap_shapes.add(this._shapes[c])
			}
			this._body.get_cbTypes().add(ia.CB_OBSTACLE);
			this._body.set_space(this._space)
		},
		__class__: rd
	});
	var sc = function() {
		x.call(this)
	};
	sc.__name__ = !0;
	sc.__super__ = x;
	sc.prototype = r(x.prototype, {
		setView: function() {
			var a = new K(PIXI.Texture.fromImage(u.assetsPrefix + "assets/img/" + l.scaleFactor + "/balloon.png"));
			a.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR;
			a.scale.x = a.scale.y =
				1 / l.scaleFactor;
			this.bitmap = a;
			this.bitmap.x = -this.bitmap.width / 2;
			this.bitmap.y = -30;
			this.addChild(this.bitmap)
		},
		__class__: sc
	});
	var Yc = function() {
		this.radius = 10;
		this.color = 16777215;
		x.call(this)
	};
	Yc.__name__ = !0;
	Yc.__super__ = x;
	Yc.prototype = r(x.prototype, {
		setData: function(a, b) {
			this.radius = a;
			this.color = b;
			this.setView()
		},
		setView: function() {
			this.get_graphics().lineStyle(4, this.color, .7);
			this.get_graphics().drawCircle(0, 0, this.radius - 2);
			this.get_graphics().lineStyle();
			this.get_graphics().beginFill(this.color,
				.3);
			this.get_graphics().drawCircle(0, 0, this.radius - 4);
			this.get_graphics().endFill()
		},
		__class__: Yc
	});
	var sd = function() {
		this.color = 16777215;
		x.call(this)
	};
	sd.__name__ = !0;
	sd.__super__ = x;
	sd.prototype = r(x.prototype, {
		setData: function(a, b, c, d) {
			null == d && (d = -1);
			this.obType = a;
			this.dynType = b;
			0 == b ? this.color = 16777215 : 1 == b && (this.color = 3355443);
			this.w = c; - 1 == d && (d = c);
			this.h = d;
			this.w2 = c / 2;
			this.h2 = d / 2;
			this.setView()
		},
		setView: function() {
			this.get_graphics().clear();
			this.get_graphics().beginFill(this.color);
			0 == this.obType ?
				this.get_graphics().drawRect(-this.w2, -this.w2, this.w, this.w) : 1 == this.obType ? this.get_graphics().drawCircle(0, 0, this.w2) : 2 == this.obType && this.get_graphics().drawRect(-this.w2, -this.h2, this.w, this.h);
			this.get_graphics().endFill()
		},
		__class__: sd
	});
	var S = function(a, b, c) {
		this.tick = 0;
		this._scale = 1;
		x.call(this);
		this._scale = c;
		this._h = b;
		this._w = a;
		this._halfW = Math.floor(a / 2);
		this._halfH = Math.floor(b / 2)
	};
	S.__name__ = !0;
	S.__super__ = x;
	S.prototype = r(x.prototype, {
		update: function(a) {},
		enter: function() {
			this.tick = 0
		},
		exit: function() {},
		onResize: function(a, b, c) {
			if (this._w != a || this._h != b || this._scale != c) this._w = a, this._h = b, this._scale = c, this._halfW = Math.floor(a / 2), this._halfH = Math.floor(b / 2)
		},
		__class__: S
	});
	var Ac = function(a, b, c) {
		S.call(this, a, b, c);
		this.init()
	};
	Ac.__name__ = !0;
	Ac.__super__ = S;
	Ac.prototype = r(S.prototype, {
		init: function() {
			this.get_graphics().clear();
			this.get_graphics().beginFill(Pa.startColor);
			this.get_graphics().drawRect(0, 0, this._w, this._h);
			this.get_graphics().endFill();
			if (null == this.clouds) {
				var a = new K(PIXI.Texture.fromImage(u.assetsPrefix +
					"assets/img/" + l.scaleFactor + "/clouds.png"));
				a.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR;
				a.scale.x = a.scale.y = 1 / l.scaleFactor;
				this.clouds = a;
				this.addChild(this.clouds)
			}
			this.balloon = new sc;
			this.balloon.setView();
			this.addChild(this.balloon);
			a = this.title1 = u.getText(A.fonts[0], 72, this._w, 100);
			a.style.fill = 16777215;
			a.color = 16777215;
			this.addChild(this.title1);
			this.title1.text = "RISE";
			a = this.title2 = u.getText(A.fonts[0], 48, this._w, 100);
			a.style.fill = 16777215;
			a.color = 16777215;
			this.addChild(this.title2);
			this.title2.text = "UP";
			a = this.title3 = u.getText(A.fonts[0], 30, this._w, 100);
			a.style.fill = 16777215;
			a.color = 16777215;
			this.addChild(this.title3);
			this.title3.text = "BALLOON";
			a = new K(PIXI.Texture.fromImage(u.assetsPrefix + "assets/img/" + l.scaleFactor + "/btn_play.png"));
			a.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR;
			a.scale.x = a.scale.y = 1 / l.scaleFactor;
			a.x = -Math.round(a.width / 2);
			a.y = -Math.round(a.height / 2);
			this.playBtn = new x;
			this.addChild(this.playBtn);
			this.playBtn.addChild(a);
			this.playBtn.set_mouseChildren(!1);
			this.playBtn.buttonMode = !0;
			this.gPlayBtn = new Gb(16777215, 45, "", 24);
			this.gPlayBtn.setImg(function(a) {
				a = new K(PIXI.Texture.fromImage(u.assetsPrefix + "assets/img/" + l.scaleFactor + "/btn_gp.png"));
				a.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR;
				a.scale.x = a.scale.y = 1 / l.scaleFactor;
				return a
			}(this));
			this.addChild(this.gPlayBtn);
			this.moreBtn = new Gb(16777215, 45, "", 24);
			this.moreBtn.setImg(function(a) {
				a = new K(PIXI.Texture.fromImage(u.assetsPrefix + "assets/img/" + l.scaleFactor + "/btn_more.png"));
				a.texture.baseTexture.scaleMode =
					PIXI.SCALE_MODES.LINEAR;
				a.scale.x = a.scale.y = 1 / l.scaleFactor;
				return a
			}(this));
			this.addChild(this.moreBtn);
			u.addEventListener(this, u.CLICK, v(this, this.onClick));
			this.clouds.y = this._h - 85;
			this.balloon.x = this._halfW;
			this.balloon.y = this._h - 150;
			this.playBtn.x = this._halfW;
			this.playBtn.y = this._halfH;
			a = this.title1;
			a.widthx = this._w;
			a.style.wordWrap = !0;
			a.style.wordWrapWidth = a.widthx / a.scale.x;
			a.rePos();
			a.widthx;
			this.title1.y = Math.round(this._h / 4) - 100;
			a = this.title2;
			a.widthx = this._w;
			a.style.wordWrap = !0;
			a.style.wordWrapWidth =
				a.widthx / a.scale.x;
			a.rePos();
			a.widthx;
			this.title2.y = this.title1.y + 64;
			a = this.title3;
			a.widthx = this._w;
			a.style.wordWrap = !0;
			a.style.wordWrapWidth = a.widthx / a.scale.x;
			a.rePos();
			a.widthx;
			this.title3.y = this.title2.y + 51;
			null != this.gPlayBtn && null != this.moreBtn && (this.gPlayBtn.x = this._w - 2.25 * this.gPlayBtn.radius, this.gPlayBtn.y = this._h - 100 - this.gPlayBtn.radius, this.moreBtn.x = 2.25 * this.moreBtn.radius, this.moreBtn.y = this.gPlayBtn.y)
		},
		onClick: function(a) {
			if (a.target == this.playBtn) {
				ka.app.setState(ka.app.playState);
				// try {
				// 	window.sb()
				// } catch (b) {}
			}
			//  else 
			// a.target == this.gPlayBtn ? window.open("https://play.google.com/store/apps/details?id\x3dcom.mokogames.stickman.riseup.escape\x26referrer\x3dutm_source%3Dsh%26utm_medium%3Dlink%26utm_term%3Dsh%26utm_content%3Dlink%26utm_campaign%3Dshe", "_blank") 
			// : a.target == this.moreBtn && (a = window.navigator.language, "ru" == (null != a && 2 <= a.length ? fa.substr(a, 0, 2).toLowerCase() : "") ? window.open("http://flagames.ru/", "_blank") : window.open("http://mokogames.com/", "_blank"))
		},
		onResize: function(a,
			b, c) {
			S.prototype.onResize.call(this, a, b, c);
			this.get_graphics().clear();
			this.get_graphics().beginFill(Pa.startColor);
			this.get_graphics().drawRect(0, 0, this._w, this._h);
			this.get_graphics().endFill();
			null == this.clouds && (a = new K(PIXI.Texture.fromImage(u.assetsPrefix + "assets/img/" + l.scaleFactor + "/clouds.png")), a.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR, a.scale.x = a.scale.y = 1 / l.scaleFactor, this.clouds = a, this.addChild(this.clouds));
			this.clouds.y = this._h - 85;
			this.balloon.x = this._halfW;
			this.balloon.y =
				this._h - 150;
			this.playBtn.x = this._halfW;
			this.playBtn.y = this._halfH;
			a = this.title1;
			a.widthx = this._w;
			a.style.wordWrap = !0;
			a.style.wordWrapWidth = a.widthx / a.scale.x;
			a.rePos();
			a.widthx;
			this.title1.y = Math.round(this._h / 4) - 100;
			a = this.title2;
			a.widthx = this._w;
			a.style.wordWrap = !0;
			a.style.wordWrapWidth = a.widthx / a.scale.x;
			a.rePos();
			a.widthx;
			this.title2.y = this.title1.y + 64;
			a = this.title3;
			a.widthx = this._w;
			a.style.wordWrap = !0;
			a.style.wordWrapWidth = a.widthx / a.scale.x;
			a.rePos();
			a.widthx;
			this.title3.y = this.title2.y + 51;
			null != this.gPlayBtn && null != this.moreBtn && (this.gPlayBtn.x = this._w - 2.25 * this.gPlayBtn.radius, this.gPlayBtn.y = this._h - 100 - this.gPlayBtn.radius, this.moreBtn.x = 2.25 * this.moreBtn.radius, this.moreBtn.y = this.gPlayBtn.y)
		},
		update: function(a) {
			S.prototype.update.call(this, a);
			2 > this.tick && this.tick++
		},
		__class__: Ac
	});
	var Bc = function(a, b, c) {
		this.gameOverTick = -1;
		this.numUnityAdsShowedInCurrentGame = this.numTriesInCurrentGame = 0;
		this.curH = -1;
		this.useScaleView = !1;
		this.txtW = 140;
		this.txtColor = 16777215;
		this.isGameOver = !1;
		this.act1 = this.act2 = 0;
		S.call(this, a, b, c);
		this.init()
	};
	Bc.__name__ = !0;
	Bc.__super__ = S;
	Bc.prototype = r(S.prototype, {
		init: function() {
			this.drawFon();
			this.game = new od(this);
			this.game.onGameOver = v(this, this.onEndGame);
			var a = this.tf = u.getText(A.fonts[0], 54, this._w, 80);
			a.style.fill = 15792378;
			a.color = 15792378;
			this.addChild(this.tf);
			this.tf.interactive = !1;
			a = this.scoreInfo = u.getText(A.font, 21, this.txtW, 30, -1);
			var b = this.txtColor;
			a.style.fill = b;
			a.color = b;
			this.addChild(this.scoreInfo);
			this.scoreInfo.interactive = !1;
			this.scoreInfo.text = G.txtSCORE[G.langId];
			a = this.scoreTxt = u.getText(A.fonts[0], 27, this.txtW, 36, -1);
			b = this.txtColor;
			a.style.fill = b;
			a.color = b;
			this.addChild(this.scoreTxt);
			this.scoreTxt.interactive = !1;
			a = this.levelInfo = u.getText(A.font, 21, this.txtW, 30, 1);
			b = this.txtColor;
			a.style.fill = b;
			a.color = b;
			this.addChild(this.levelInfo);
			this.levelInfo.interactive = !1;
			this.levelInfo.text = G.txtLEVEL[G.langId];
			a = this.levelTxt = u.getText(A.fonts[0], 27, this.txtW, 36, 1);
			b = this.txtColor;
			a.style.fill = b;
			a.color = b;
			this.addChild(this.levelTxt);
			this.levelTxt.interactive = !1;
			this.set_mouseChildren(!1);
			u.addEventListener(this, u.CLICK, v(this, this.onClick));
			this.useScaleView && (this.scaleCont = new x, this.addChild(this.scaleCont), this.scaleCont.set_mouseChildren(!1), this.scaleCont.set_mouseEnabled(!1), this.drawScaleView());
			this.positionItems()
		},
		onClick: function(a) {
			this.isTut ? this.switchTut(!1) : !this._active && this.waitTapToActivate ? (this._active = !0, this.waitTapToActivate = !1) : this._active && this.isGameOver && 0 < this.gameOverTick && ka.app.setState(ka.app.resultState)
		},
		update: function(a) {
			S.prototype.update.call(this, a);
			this._active && (this.isGameOver && 0 < this.gameOverTick && (this.gameOverTick--, 0 >= this.gameOverTick && ka.app.setState(ka.app.resultState)), this.game.update(a), this.updateTxt(), this.updateScaleView(), this.updateFon())
		},
		enter: function() {
			S.prototype.enter.call(this);
			this.isTut = !1;
			if (0 < A.curNumRounds || 1 < A.gaSessionNum) {
				this.reInit();
				this.game.enter();
				this.numTriesInCurrentGame = this.numUnityAdsShowedInCurrentGame = 0;
				try {
					window.play()
				} catch (a) {
					null
				}
			} else this.switchTut(!0)
		},
		reInit: function() {
			this.launched = this.isGameOver = !1;
			this.tf.text = "";
			this.gameOverTick = this.curLevel = -1;
			this._active = !0;
			this.waitTapToActivate = !1;
			this.act2 = this.act1 = 0;
			this.game.reset();
			this.fon.reInit()
		},
		exit: function() {
			this.game.exit();
			this.switchAdditionalDialog(!1);
			S.prototype.exit.call(this)
		},
		onResize: function(a, b, c) {
			S.prototype.onResize.call(this, a, b, c);
			this.drawFon();
			this.useScaleView && this.drawScaleView();
			this.game.onResize();
			this.positionItems();
			if (null != this.additionalDialog) this.additionalDialog.onResize(a,
				b);
			if (null != this.tut) this.tut.onResize(a, b)
		},
		drawFon: function() {
			this.get_graphics().clear();
			this.get_graphics().beginFill(Pa.startColor);
			this.get_graphics().drawRect(0, 0, this._w, this._h);
			this.get_graphics().endFill();
			null == this.fon && (this.fon = new Pa(this._w, this._h), this.addChild(this.fon), this.fon.setY(this._h));
			this.fon.onResize(this._w, this._h)
		},
		positionItems: function() {
			this.tf.y = Math.round(this._h / 4);
			this.scoreInfo.x = 10;
			this.scoreTxt.x = 10;
			this.scoreInfo.y = 30;
			this.scoreTxt.y = 45;
			this.levelInfo.x =
				this._w - this.txtW - 10;
			this.levelTxt.x = this._w - this.txtW - 10;
			this.levelInfo.y = 30;
			this.levelTxt.y = 45
		},
		updateTxt: function() {
			this.curH != this.game.curH && (this.curH = this.game.curH, this.scoreTxt.text = "" + this.curH);
			this.curLevel != Math.floor(this.game.curH / 100) && (this.curLevel = Math.floor(this.game.curH / 100), this.levelTxt.text = "" + this.curLevel, this.fon.setLevel(this.curLevel))
		},
		drawScaleView: function() {
			var a = Math.ceil(this._h / 200) + 2;
			this.scaleCont.get_graphics().clear();
			this.scaleCont.get_graphics().beginFill(16777215);
			this.scaleCont.get_graphics().lineStyle(2, 16777215, .7);
			for (var b = 0; b < a;) {
				var c = b++;
				this.scaleCont.get_graphics().moveTo(this._w, this._h - 200 * c);
				this.scaleCont.get_graphics().lineTo(this._w - 30, this._h - 200 * c)
			}
			this.scaleCont.get_graphics().lineStyle();
			this.scaleCont.get_graphics().endFill()
		},
		updateScaleView: function() {
			this.useScaleView && !this.isGameOver && (this.scaleCont.y = 2 * this.game._steps % 200)
		},
		updateFon: function() {
			if (!this.isGameOver) {
				var a = 2 * this.game._steps % 2E3;
				500 < a && (a -= 2E3, this.fon.setLevel(this.curLevel +
					1));
				this.fon.setY(a + this._h)
			}
		},
		onEndGame: function() {
			this._active = !1;
			this.isGameOver = !0;
			var a = !1;
			!(1 < A.curNumRounds && 1 > this.numTriesInCurrentGame && 2 < A.curNumRounds - T.lastNoAd && 1 < A.curNumRounds - T.lastYesAd) || T.shareUsed && T.shareUsed2 || (a = !0);
			a ? this.switchAdditionalDialog(!0) : this.doEndGame(!1)
		},
		doEndGame: function(a) {
			null == a && (a = !0);
			A.score.setValue(this.game.curH);
			A.newMax = this.checkUpdateMaxScore(!0, !1);
			a ? ka.app.setState(ka.app.resultState) : (this.game.gameOverShow(), this._active = this.isGameOver = !0,
				this.gameOverTick = 150)
		},
		checkUpdateMaxScore: function(a, b) {
			if (W.parseInt(A.score.toString()) > W.parseInt(A.maxScore.toString())) {
				var c = W.parseInt(A.score.toString());
				A.maxScore.setValue(c);
				a && mb.setData(Gc.maxScore, A.maxScore.toString(), b);
				return !0
			}
			return !1
		},
		onClickNo: function() {
			this.doEndGame()
		},
		onExtraLifeShare: function() {
			// this.numTriesInCurrentGame++;
			// 1 != G.langId ? Vb.postTwitter(G.txtGameName[G.langId], "https://play.google.com/store/apps/details?id\x3dcom.mokogames.stickman.riseup.escape\x26referrer\x3dutm_source%3Dsh%26utm_medium%3Dlink%26utm_term%3Dsh%26utm_content%3Dlink%26utm_campaign%3Dshe",
			// 	"mokogames,riseup,arcade,balloon", "mokogames") : Vb.postTwitter(G.txtGameName[G.langId], "https://play.google.com/store/apps/details?id\x3dcom.mokogames.stickman.riseup.escape\x26hl\x3dru\x26referrer\x3dutm_source%3Dsh%26utm_medium%3Dlink%26utm_term%3Dsh%26utm_content%3Dlink%26utm_campaign%3Dshr", "mokogames,riseup,\u0448\u0430\u0440\u0438\u043a,\u0432\u0432\u0435\u0440\u0445", "mokogames");
			// this.continueAdditionalGame(!0);
			// this.waitTapToActivate = !0;
			// this.isGameOver = !1
		},
		onShare2: function() {
			// this.numTriesInCurrentGame++;
			// window.open("https://play.google.com/store/apps/details?id\x3dcom.mokogames.stickman.riseup.escape\x26referrer\x3dutm_source%3Dsh%26utm_medium%3Dlink%26utm_term%3Dsh%26utm_content%3Dlink%26utm_campaign%3Dshw", "_blank");
			// this.continueAdditionalGame(!0);
			// this.waitTapToActivate = !0;
			// this.isGameOver = !1
		},
		switchAdditionalDialog: function(a) {
			a ? (null == this.additionalDialog && (this.additionalDialog = new T(l.appW, l.appH, l.scale), this.additionalDialog.onClickYesShare = v(this, this.onExtraLifeShare), this.additionalDialog.onClickYesShare2 =
				v(this, this.onShare2), this.additionalDialog.onClickNo = v(this, this.onClickNo)), this.additionalDialog.prepare(), ka.app.addChild(this.additionalDialog)) : null != this.additionalDialog && ka.app.contains(this.additionalDialog) && ka.app.removeChild(this.additionalDialog)
		},
		continueAdditionalGame: function(a) {
			this.game.continueAdditionalGame();
			this.switchAdditionalDialog(!1)
		},
		switchTut: function(a) {
			if (a) this.isTut = !0, null == this.tut && (this.tut = new Ic(this._w, this._h, this._scale)), this.addChild(this.tut);
			else if (null !=
				this.tut && (this.contains(this.tut) && this.removeChild(this.tut), this.tut = null), this.isTut) {
				this.reInit();
				this.game.enter();
				this.numTriesInCurrentGame = this.numUnityAdsShowedInCurrentGame = 0;
				try {
					window.play()
				} catch (b) {
					null
				}
				this.isTut = !1
			}
		},
		__class__: Bc
	});
	var Cc = function(a, b, c) {
		this.btns = [];
		S.call(this, a, b, c);
		this.init()
	};
	Cc.__name__ = !0;
	Cc.__super__ = S;
	Cc.prototype = r(S.prototype, {
		init: function() {
			this.get_graphics().clear();
			this.get_graphics().beginFill(Pa.startColor);
			this.get_graphics().drawRect(0, 0, this._w,
				this._h);
			this.get_graphics().endFill();
			if (null == this.clouds) {
				var a = new K(PIXI.Texture.fromImage(u.assetsPrefix + "assets/img/" + l.scaleFactor + "/clouds.png"));
				a.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR;
				a.scale.x = a.scale.y = 1 / l.scaleFactor;
				this.clouds = a;
				this.addChild(this.clouds)
			}
			this.balloon = new sc;
			this.balloon.setView();
			this.addChild(this.balloon);
			a = this.title1 = u.getText(A.fonts[0], 72, this._w, 100);
			a.style.fill = 16777215;
			a.color = 16777215;
			this.addChild(this.title1);
			this.title1.text = "";
			a = this.title2 =
				u.getText(A.font, 30, this._w, 100);
			a.style.fill = 2058408;
			a.color = 2058408;
			this.addChild(this.title2);
			this.title2.text = "";
			a = new K(PIXI.Texture.fromImage(u.assetsPrefix + "assets/img/" + l.scaleFactor + "/btn_play.png"));
			a.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR;
			a.scale.x = a.scale.y = 1 / l.scaleFactor;
			a.x = -Math.round(a.width / 2);
			a.y = -Math.round(a.height / 2);
			this.playBtn = new x;
			this.addChild(this.playBtn);
			this.playBtn.addChild(a);
			this.playBtn.set_mouseChildren(!1);
			this.playBtn.buttonMode = !0;
			this.addBtns();
			u.addEventListener(this, u.CLICK, v(this, this.onClick));
			this.clouds.y = this._h - 85;
			this.balloon.x = this._halfW;
			this.balloon.y = this._h - 150;
			this.playBtn.x = this._halfW;
			this.playBtn.y = this._halfH;
			a = this.title2;
			a.widthx = this._w;
			a.style.wordWrap = !0;
			a.style.wordWrapWidth = a.widthx / a.scale.x;
			a.rePos();
			a.widthx;
			this.title2.y = Math.round(this._h / 4) - 100;
			a = this.title1;
			a.widthx = this._w;
			a.style.wordWrap = !0;
			a.style.wordWrapWidth = a.widthx / a.scale.x;
			a.rePos();
			a.widthx;
			this.title1.y = this.title2.y + 36;
			a = 0;
			for (var b = this.btns.length; a <
				b;) {
				var c = a++;
				this.btns[c].x = 1 == this.btns.length ? this._w - this.btns[c].radius + -7 : 0 == c % 2 ? this.btns[c].radius - -7 : this._w - this.btns[c].radius + -7;
				this.btns[c].y = this._halfH + 61 - (2 * this.btns[c].radius + 20) * Math.floor(c / 2)
			}
			null != this.gPlayBtn && null != this.moreBtn && (this.gPlayBtn.x = 2.5 * this.gPlayBtn.radius, this.gPlayBtn.y = this._halfH + 61 + (2 * this.gPlayBtn.radius + 10), this.moreBtn.x = this._w - 2.5 * this.moreBtn.radius, this.moreBtn.y = this.gPlayBtn.y)
		},
		onResize: function(a, b, c) {
			S.prototype.onResize.call(this, a, b, c);
			this.get_graphics().clear();
			this.get_graphics().beginFill(Pa.startColor);
			this.get_graphics().drawRect(0, 0, this._w, this._h);
			this.get_graphics().endFill();
			null == this.clouds && (a = new K(PIXI.Texture.fromImage(u.assetsPrefix + "assets/img/" + l.scaleFactor + "/clouds.png")), a.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR, a.scale.x = a.scale.y = 1 / l.scaleFactor, this.clouds = a, this.addChild(this.clouds));
			this.clouds.y = this._h - 85;
			this.balloon.x = this._halfW;
			this.balloon.y = this._h - 150;
			this.playBtn.x = this._halfW;
			this.playBtn.y = this._halfH;
			a = this.title2;
			a.widthx = this._w;
			a.style.wordWrap = !0;
			a.style.wordWrapWidth = a.widthx / a.scale.x;
			a.rePos();
			a.widthx;
			this.title2.y = Math.round(this._h / 4) - 100;
			a = this.title1;
			a.widthx = this._w;
			a.style.wordWrap = !0;
			a.style.wordWrapWidth = a.widthx / a.scale.x;
			a.rePos();
			a.widthx;
			this.title1.y = this.title2.y + 36;
			a = 0;
			for (b = this.btns.length; a < b;) c = a++, this.btns[c].x = 1 == this.btns.length ? this._w - this.btns[c].radius + -7 : 0 == c % 2 ? this.btns[c].radius - -7 : this._w - this.btns[c].radius + -7, this.btns[c].y = this._halfH + 61 - (2 * this.btns[c].radius +
				20) * Math.floor(c / 2);
			null != this.gPlayBtn && null != this.moreBtn && (this.gPlayBtn.x = 2.5 * this.gPlayBtn.radius, this.gPlayBtn.y = this._halfH + 61 + (2 * this.gPlayBtn.radius + 10), this.moreBtn.x = this._w - 2.5 * this.moreBtn.radius, this.moreBtn.y = this.gPlayBtn.y)
		},
		enter: function() {
			S.prototype.enter.call(this);
			this.title1.text = A.score.toString();
			this.title2.text = A.newMax ? G.txtNewBest[G.langId] + "!" : G.txtBest[G.langId] + " " + A.maxScore.toString();
			A.curNumRounds++;
			A.totalGames.addValue(1);
			mb.setData(Gc.gamesPlayed, A.totalGames.toString())
		},
		addBtns: function() {
			this.twBtn = new Gb(16777215, 45, "", 24);
			this.twBtn.setImg(function(a) {
				a = new K(PIXI.Texture.fromImage(u.assetsPrefix + "assets/img/" + l.scaleFactor + "/btn_tw.png"));
				a.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR;
				a.scale.x = a.scale.y = 1 / l.scaleFactor;
				return a
			}(this));
			this.gPlayBtn = new Gb(16777215, 45, "", 24);
			this.gPlayBtn.setImg(function(a) {
				a = new K(PIXI.Texture.fromImage(u.assetsPrefix + "assets/img/" + l.scaleFactor + "/btn_gp.png"));
				a.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR;
				a.scale.x = a.scale.y = 1 / l.scaleFactor;
				return a
			}(this));
			this.addChild(this.gPlayBtn);
			this.moreBtn = new Gb(16777215, 45, "", 24);
			this.moreBtn.setImg(function(a) {
				a = new K(PIXI.Texture.fromImage(u.assetsPrefix + "assets/img/" + l.scaleFactor + "/btn_more.png"));
				a.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR;
				a.scale.x = a.scale.y = 1 / l.scaleFactor;
				return a
			}(this));
			this.addChild(this.moreBtn);
			this.addChild(this.twBtn);
			this.btns = [this.twBtn]
		},
		onClick: function(a) {
			if (a.target == this.playBtn) {
				ka.app.setState(ka.app.playState);
				// try {
				// 	window.sb()
				// } catch (b) {}
			} 
			// else a.target != this.shareBtn && (a.target == this.twBtn ? 1 != G.langId ? Vb.postTwitter(G.txtGameName[G.langId], "https://play.google.com/store/apps/details?id\x3dcom.mokogames.stickman.riseup.escape\x26referrer\x3dutm_source%3Dsh%26utm_medium%3Dlink%26utm_term%3Dsh%26utm_content%3Dlink%26utm_campaign%3Dshe", "mokogames,riseup,arcade,balloon", "mokogames") : Vb.postTwitter(G.txtGameName[G.langId], "https://play.google.com/store/apps/details?id\x3dcom.mokogames.stickman.riseup.escape\x26hl\x3dru\x26referrer\x3dutm_source%3Dsh%26utm_medium%3Dlink%26utm_term%3Dsh%26utm_content%3Dlink%26utm_campaign%3Dshr",
			// 	"mokogames,riseup,arcade,balloon", "mokogames") : a.target != this.rateBtn && (a.target == this.gPlayBtn ? window.open("https://play.google.com/store/apps/details?id\x3dcom.mokogames.stickman.riseup.escape\x26referrer\x3dutm_source%3Dsh%26utm_medium%3Dlink%26utm_term%3Dsh%26utm_content%3Dlink%26utm_campaign%3Dshe", "_blank") : a.target == this.moreBtn && (a = window.navigator.language, "ru" == (null != a && 2 <= a.length ? fa.substr(a, 0, 2).toLowerCase() : "") ? window.open("http://flagames.ru/", "_blank") : window.open("http://mokogames.com/",
			// 	"_blank"))))
		},
		update: function(a) {
			S.prototype.update.call(this, a);
			2 > this.tick && this.tick++
		},
		__class__: Cc
	});
	var T = function(a, b, c) {
		this.allBtns = [];
		this.btns = [];
		x.call(this);
		this._scale = c;
		this._h = b;
		this._w = a;
		this._halfW = Math.floor(a / 2);
		this._halfH = Math.floor(b / 2);
		this.init()
	};
	T.__name__ = !0;
	T.__super__ = x;
	T.prototype = r(x.prototype, {
		init: function() {
			var a = window.navigator.language;
			(null != a && 2 <= a.length ? fa.substr(a, 0, 2).toLowerCase() : "") == G.langs[1] && T.sharesUrls.push("http://flagames.ru/");
			this.drawFon();
			this.addTxt();
			this.addBtns();
			u.addEventListener(this, u.CLICK, v(this, this.onClick))
		},
		setText: function(a) {
			this.titleTxt.text = a
		},
		onClick: function(a) {
			a.target == this.btnVideo ? (T.lastYesAd = A.curNumRounds, this.onClickYesVideo()) : a.target == this.btnShare ? (T.shareUsed = !0, this.onClickYesShare()) : a.target == this.btnClose ? (T.lastNoAd = A.curNumRounds, this.onClickNo()) : a.target == this.btnShare2 && (T.shareUsed2 = !0, this.onClickYesShare2())
		},
		onResize: function(a, b) {
			this._h = b;
			this._w = a;
			this._halfW = Math.floor(a / 2);
			this._halfH =
				Math.floor(b / 2);
			this.drawFon();
			this.positionTxt();
			this.positionBtns()
		},
		prepare: function() {
			this.btns = [];
			T.shareUsed || this.btns.push(this.btnShare);
			T.shareUsed2 || this.btns.push(this.btnShare2);
			for (var a = 0, b = this.allBtns.length; a < b;) {
				var c = a++;
				null != this.allBtns[c] && (this.contains(this.allBtns[c]) && -1 == fa.indexOf(this.btns, this.allBtns[c], 0) ? this.removeChild(this.allBtns[c]) : this.contains(this.allBtns[c]) || -1 == fa.indexOf(this.btns, this.allBtns[c], 0) || this.addChild(this.allBtns[c]))
			}
			this.positionBtns();
			return 0 < this.btns.length
		},
		drawFon: function() {
			this.get_graphics().clear();
			this.get_graphics().beginFill(0, .55);
			this.get_graphics().drawRect(0, 0, this._w, this._h);
			this.get_graphics().endFill()
		},
		addTxt: function() {
			this.titleTxt = u.getText(A.font, 48, this._w - 30, 150);
			this.addChild(this.titleTxt);
			this.titleTxt.interactive = !1;
			var a = this.titleTxt;
			a.style.fill = 16777215;
			a.color = 16777215;
			this.titleTxt.text = "";
			this.setText(G.txtGetExtraLife[G.langId] + "?");
			this.positionTxt()
		},
		positionTxt: function() {
			var a = this.titleTxt;
			a.widthx = this._w - 30;
			a.style.wordWrap = !0;
			a.style.wordWrapWidth = a.widthx / a.scale.x;
			a.rePos();
			a.widthx;
			this.titleTxt.x = 15;
			this.titleTxt.y = Math.max(Math.round((this._halfH - 3 * this.titleTxt.get_textHeight() / 2) / 1), 0)
		},
		addBtns: function() {
			this.btnVideo = new x;
			this.btnVideo.set_mouseChildren(!1);
			this.btnVideo.buttonMode = !0;
			this.drawBtn(this.btnVideo);
			var a = this.btnVideo.get_graphics(),
				b = -Math.round(70),
				c = -Math.round(35);
			a.beginFill(16777215);
			a.drawRoundRect(-2 + b, -2 + c, 144, 74, 20, 20);
			a.endFill();
			a.beginFill(7829367);
			a.drawRoundRect(3 + b, 3 + c, 140, 70, 20, 20);
			a.endFill();
			a.beginFill(15156305);
			a.drawRoundRect(b, c, 140, 70, 20, 20);
			a.endFill();
			a.beginFill(16777215);
			a.drawRoundRect(42 + b, 14 + c, 56, 42, 8, 8);
			a.endFill();
			a.beginFill(15156305);
			a.drawRoundRect(50 + b, 22 + c, 40, 26, 8, 8);
			a.endFill();
			a.beginFill(16777215);
			a.moveTo(Math.round(64.75) + b, Math.round(26.25) + c);
			a.lineTo(Math.round(80.5) + b, Math.round(35) + c);
			a.lineTo(Math.round(64.75) + b, Math.round(43.75) + c);
			a.lineTo(Math.round(64.75) + b, Math.round(26.25) + c);
			a.endFill();
			this.btnShare =
				new Gb(16777215, 45, "", -1);
			this.drawBtn(this.btnShare);
			this.btnShare.setImg(function(a) {
				a = new K(PIXI.Texture.fromImage(u.assetsPrefix + "assets/img/" + l.scaleFactor + "/btn_tw.png"));
				a.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR;
				a.scale.x = a.scale.y = 1 / l.scaleFactor;
				return a
			}(this));
			this.addChild(this.btnShare);
			this.btnShare2 = new Gb(16777215, 45, "", -1);
			this.drawBtn(this.btnShare2);
			this.btnShare2.setImg(function(a) {
				a = new K(PIXI.Texture.fromImage(u.assetsPrefix + "assets/img/" + l.scaleFactor + "/btn_gp.png"));
				a.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR;
				a.scale.x = a.scale.y = 1 / l.scaleFactor;
				return a
			}(this));
			this.addChild(this.btnShare2);
			this.btnClose = new x;
			this.btnClose.addChild(function(a) {
				a = new K(PIXI.Texture.fromImage(u.assetsPrefix + "assets/img/" + l.scaleFactor + "/btn_close.png"));
				a.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR;
				a.scale.x = a.scale.y = 1 / l.scaleFactor;
				return a
			}(this));
			this.btnClose.buttonMode = !0;
			this.btnClose.set_mouseChildren(!1);
			this.addChild(this.btnClose);
			this.allBtns =
				[this.btnVideo, this.btnShare, this.btnShare2];
			this.positionBtns()
		},
		positionBtns: function() {
			this.btnClose.x = this._w - 90 - 10;
			this.btnClose.y = 10;
			1 == this.btns.length ? (this.btns[0].x = this._halfW, this.btns[0].y = this._h - 100) : 2 == this.btns.length ? (this.btns[0].x = this._halfW - 125, this.btns[0].y = this._h - 100, this.btns[1].x = this._halfW + 125, this.btns[1].y = this.btns[0].y) : 3 == this.btns.length && (this.btns[0].x = this._halfW - 125, this.btns[0].y = this._h - 225, this.btns[1].x = this._halfW + 125, this.btns[1].y = this.btns[0].y, this.btns[2].x =
				this._halfW, this.btns[2].y = this._h - 75)
		},
		drawBtn: function(a) {
			a.get_graphics().lineStyle(2, 16777215);
			a.get_graphics().beginFill(16777215, .45);
			a.get_graphics().drawRoundRect(-100, -55, 200, 110, 20, 20);
			a.get_graphics().lineStyle();
			a.get_graphics().endFill()
		},
		__class__: T
	});
	var Ic = function(a, b, c) {
		x.call(this);
		this._scale = c;
		this._h = b;
		this._w = a;
		this._halfW = Math.floor(a / 2);
		this._halfH = Math.floor(b / 2);
		this.init()
	};
	Ic.__name__ = !0;
	Ic.__super__ = x;
	Ic.prototype = r(x.prototype, {
		init: function() {
			this.get_graphics().clear();
			this.get_graphics().beginFill(Pa.startColor);
			this.get_graphics().drawRect(0, 0, this._w, this._h);
			this.get_graphics().endFill();
			var a = new K(PIXI.Texture.fromImage(u.assetsPrefix + "assets/img/" + l.scaleFactor + "/tut.png"));
			a.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR;
			a.scale.x = a.scale.y = 1 / l.scaleFactor;
			this.bm = a;
			this.addChild(this.bm);
			a = new K(PIXI.Texture.fromImage(u.assetsPrefix + "assets/img/" + l.scaleFactor + "/btn_close.png"));
			a.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR;
			a.scale.x = a.scale.y =
				1 / l.scaleFactor;
			this.close_bm = a;
			this.addChild(this.close_bm);
			this.bm.x = Math.round(this._halfW - this.bm.width / 2);
			this.bm.y = this._h - this.bm.height;
			this.close_bm.x = this._w - this.close_bm.width - 10;
			this.close_bm.y = 10
		},
		onResize: function(a, b) {
			this._h = b;
			this._w = a;
			this._halfW = Math.floor(a / 2);
			this._halfH = Math.floor(b / 2);
			this.get_graphics().clear();
			this.get_graphics().beginFill(Pa.startColor);
			this.get_graphics().drawRect(0, 0, this._w, this._h);
			this.get_graphics().endFill();
			this.bm.x = Math.round(this._halfW - this.bm.width /
				2);
			this.bm.y = this._h - this.bm.height;
			this.close_bm.x = this._w - this.close_bm.width - 10;
			this.close_bm.y = 10
		},
		__class__: Ic
	});
	var Gb = function(a, b, c, d) {
		x.call(this);
		this.setData(a, b, c, d)
	};
	Gb.__name__ = !0;
	Gb.__super__ = x;
	Gb.prototype = r(x.prototype, {
		setData: function(a, b, c, d) {
			this.color = a;
			this.radius = b;
			this.txt = c;
			this.fontSize = d;
			this.get_graphics().clear();
			this.get_graphics().beginFill(a);
			this.get_graphics().drawCircle(0, 0, b);
			this.get_graphics().endFill();
			this.get_graphics().beginFill(16777215);
			this.get_graphics().drawCircle(0,
				0, b - 2);
			this.get_graphics().endFill();
			this.buttonMode = !0;
			this.set_mouseChildren(!1);
			this.setText(c, d)
		},
		setText: function(a, b) {
			null == b && (b = -1);
			this.txt = a; - 1 == b ? b = this.fontSize : this.fontSize != b && (this.fontSize = b, null != this.textField && this.contains(this.textField) && (this.removeChild(this.textField), this.textField = null));
			null == this.textField && (this.textField = u.getText(A.font, b, 2 * this.radius, b < this.radius / 1.5 ? Math.round(3 * b) : Math.round(1.5 * b)), this.addChild(this.textField));
			b = this.textField;
			var c = this.color;
			b.style.fill = c;
			b.color = c;
			this.textField.text = a;
			this.textField.x = -this.radius;
			this.textField.y = -this.textField.get_textHeight() / 2;
			this.textField.interactive = !1
		},
		setImg: function(a) {
			null != this.img && this.contains(this.img) && (this.removeChild(this.img), this.img = null);
			null != a && (this.img = a, this.img.x = -this.img.width / 2, this.img.y = -this.img.height / 2, this.addChild(this.img))
		},
		__class__: Gb
	});
	var l = function() {};
	l.__name__ = !0;
	var mb = function() {};
	mb.__name__ = !0;
	mb.setData = function(a, b, c) {
		null == c && (c = !0);
		mb.active &&
			(mb.so.setItem(a, b), c && mb.save())
	};
	mb.save = function() {};
	var Vb = function() {};
	Vb.__name__ = !0;
	Vb.postTwitter = function(a, b, c, d, e) {
		// null == e && (e = "");
		// null == d && (d = "");
		// a = "https://twitter.com/intent/tweet?text\x3d" + encodeURIComponent(a);
		// a += "\x26url\x3d" + encodeURIComponent(b);
		// a += "\x26hashtags\x3d" + c;
		// "" != d && (a += "\x26via\x3d" + d);
		// "" != e && (a += "\x26related\x3d" + e);
		// window.open(a, "_blank", "top\x3d150,left\x3d" + (window.screen.width - 550 - 10) + ",status\x3d0,toolbar\x3d0,width\x3d550,height\x3d250")
	};
	var ya = function(a, b) {
		this.isAllReadyToStart = !1;
		this.isReady = !0;
		this.percent = 0;
		x.call(this);
		this._h = b;
		this._w = a
	};
	ya.__name__ = !0;
	ya.__super__ = x;
	ya.prototype = r(x.prototype, {
		setData: function(a) {
			this.splashImage = a;
			this.init()
		},
		init: function() {
			this.drawFon();
			if ("" != this.splashImage) {
				var a = new K(PIXI.Texture.fromImage(u.assetsPrefix + "assets/img/" + l.scaleFactor + "/" + this.splashImage));
				a.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR;
				a.scale.x = a.scale.y = 1 / l.scaleFactor;
				this.bm = a;
				this.addChild(this.bm)
			}
			this.positionLogo()
		},
		drawFon: function() {
			this.get_graphics().clear();
			this.get_graphics().beginFill(ya.bgColor);
			this.get_graphics().drawRect(0, 0, this._w, this._h);
			this.get_graphics().endFill();
			"" == this.splashImage && (this.get_graphics().beginFill(0), this.get_graphics().drawCircle(this._w / 2, this._h / 2, 25), this.get_graphics().endFill())
		},
		onResize: function(a, b) {
			this._h = b;
			this._w = a;
			this.drawFon();
			this.positionLogo();
			this.setProgress(this.percent)
		},
		positionLogo: function() {
			null != this.bm && (this.bm.x = Math.round((this._w - this.bm.width) / 2), this.bm.y = this.bm.height >= this._h ? Math.round((this._h -
				this.bm.height) / 2) : Math.max(0, Math.round((this._h - 3 * this.bm.height / 2) / 2)))
		},
		setProgress: function(a) {
			if (0 < a && (this.percent = a, 1 > a)) {
				var b = Math.floor((1.5 * this._h - 8) / 2);
				this.get_graphics().beginFill(ya.midColor);
				this.get_graphics().drawRect((this._w - 200) / 2, b, 200, 8);
				this.get_graphics().endFill();
				this.get_graphics().beginFill(ya.progressColor);
				this.get_graphics().drawRect((this._w - 200) / 2, b, Math.floor(200 * a), 8);
				this.get_graphics().endFill()
			}
		},
		enter: function() {},
		exit: function() {},
		__class__: ya
	});
	var oc = function() {};
	oc.__name__ = !0;
	oc.isLoaded = function() {
		return oc.skipLoad || window.webFontsLoaded
	};
	var K = function(a) {
		PIXI.Sprite.call(this, a)
	};
	K.__name__ = !0;
	K.__super__ = PIXI.Sprite;
	K.prototype = r(PIXI.Sprite.prototype, {
		__class__: K
	});
	var nc = function() {
		PIXI.Graphics.call(this)
	};
	nc.__name__ = !0;
	nc.__super__ = PIXI.Graphics;
	nc.prototype = r(PIXI.Graphics.prototype, {
		drawRoundRect: function(a, b, c, d, e, f) {
			this.drawRoundedRect(a, b, c, d, e)
		},
		__class__: nc
	});
	var fc = function(a, b) {
		this.widthx = 0;
		this.align = "left";
		PIXI.Text.call(this, a, b)
	};
	fc.__name__ = !0;
	fc.__super__ = PIXI.Text;
	fc.prototype = r(PIXI.Text.prototype, {
		rePos: function() {
			"left" == this.align ? (this.pivot.x = 0, this.anchor.x = 0) : "center" == this.align ? (this.pivot.x = -this.widthx / 2 / this.scale.x, this.anchor.x = .5) : "right" == this.align && (this.pivot.x = -this.widthx / this.scale.x, this.anchor.x = 1)
		},
		get_textHeight: function() {
			return this.height
		},
		__class__: fc
	});
	var u = function() {};
	u.__name__ = !0;
	u.getText = function(a, b, c, d, e, f, h) {
		null == e && (e = 0);
		null == c && (c = 1E3);
		d = -1 == e ? "left" : 1 == e ? "right" : "center";
		e =
			u.textScaleForSmooth * l.scaleFactor;
		a = new fc("", {
			fontFamily: a,
			fontSize: b * e,
			fill: 0,
			align: d
		});
		a.scale.x = a.scale.y = 1 / e;
		a.align = d;
		a.style.align = d;
		a.rePos();
		a.align;
		a.widthx = c;
		a.style.wordWrap = !0;
		a.style.wordWrapWidth = a.widthx / a.scale.x;
		a.rePos();
		a.widthx;
		return a
	};
	u.addEventListener = function(a, b, c) {
		for (var d = 0, e = b.length; d < e;) {
			var f = d++;
			a.on(b[f], c);
			if (0 == f) {
				a.interactive = !0;
				a.interactiveChildren = !0;
				f = 0;
				for (var h = a.children.length; f < h;) {
					var m = f++;
					F.__instanceof(a.children[m], fc) ? (a.children[m].interactive = !1, a.children[m].interactiveChildren = !1) : (a.children[m].interactive = !0, a.children[m].interactiveChildren = !0)
				}
			}
		}
	};
	u.removeEventListener = function(a, b, c) {
		for (var d = 0, e = b.length; d < e;) {
			var f = d++;
			a.off(b[f], c)
		}
	};
	var n = function() {};
	n.__name__ = !0;
	var Hb = function() {
		this.zpp_inner = null
	};
	Hb.__name__ = !0;
	Hb.prototype = {
		toString: function() {
			return ""
		},
		__class__: Hb
	};
	var Jc = function() {
		this.zpp_inner = null
	};
	Jc.__name__ = !0;
	Jc.__super__ = Hb;
	Jc.prototype = r(Hb.prototype, {
		toString: function() {
			var a = "Cb:" + ["WAKE", "SLEEP"][this.zpp_inner.event -
				2
			];
			a += ":" + this.zpp_inner.body.outer.toString();
			return a += " : listener: " + W.string(this.zpp_inner.listener.outer)
		},
		__class__: Jc
	});
	var Xa = function() {
		this.zpp_inner = null
	};
	Xa.__name__ = !0;
	Xa.prototype = {
		toString: function() {
			var a = "BEGIN END WAKE SLEEP BREAK PRE ONGOING".split(" ")[this.zpp_inner.event];
			if (0 == this.zpp_inner.type) return "BodyListener{" + a + "::" + W.string(this.zpp_inner.body.outer_zn.zpp_inner_zn.options.outer) + "}";
			if (1 == this.zpp_inner.type) return "ConstraintListener{" + a + "::" + W.string(this.zpp_inner.constraint.outer_zn.zpp_inner_zn.options.outer) +
				"}";
			var b = this.zpp_inner.interaction;
			switch (b.itype) {
				case 1:
					var c = "COLLISION";
					break;
				case 2:
					c = "SENSOR";
					break;
				case 4:
					c = "FLUID";
					break;
				default:
					c = "ALL"
			}
			return (2 == this.zpp_inner.type ? "InteractionListener{" + a + "#" + c + "::" + W.string(b.outer_zni.zpp_inner_zn.options1.outer) + ":" + W.string(b.outer_zni.zpp_inner_zn.options2.outer) + "}" : "PreListener{" + c + "::" + W.string(b.outer_znp.zpp_inner_zn.options1.outer) + ":" + W.string(b.outer_znp.zpp_inner_zn.options2.outer) + "}") + " precedence\x3d" + this.zpp_inner.precedence
		},
		__class__: Xa
	};
	var Zc = function() {
		this.zpp_inner_zn = null
	};
	Zc.__name__ = !0;
	Zc.__super__ = Xa;
	Zc.prototype = r(Xa.prototype, {
		__class__: Zc
	});
	var ma = function() {};
	ma.__name__ = !0;
	ma.prototype = {
		toString: function() {
			null == g.CbEvent_PRE && (g.CbEvent_PRE = new ma, g.internal = !1);
			if (this == g.CbEvent_PRE) var a = "PRE";
			else null == g.CbEvent_BEGIN && (g.CbEvent_BEGIN = new ma, g.internal = !1), this == g.CbEvent_BEGIN ? a = "BEGIN" : (null == g.CbEvent_ONGOING && (g.CbEvent_ONGOING = new ma, g.internal = !1), this == g.CbEvent_ONGOING ? a = "ONGOING" : (null == g.CbEvent_END &&
				(g.CbEvent_END = new ma, g.internal = !1), this == g.CbEvent_END ? a = "END" : (null == g.CbEvent_WAKE && (g.CbEvent_WAKE = new ma, g.internal = !1), this == g.CbEvent_WAKE ? a = "WAKE" : (null == g.CbEvent_SLEEP && (g.CbEvent_SLEEP = new ma, g.internal = !1), this == g.CbEvent_SLEEP ? a = "SLEEP" : (null == g.CbEvent_BREAK && (g.CbEvent_BREAK = new ma, g.internal = !1), a = this == g.CbEvent_BREAK ? "BREAK" : "")))));
			return a
		},
		__class__: ma
	};
	var Ja = function() {
		this.zpp_next = null;
		this.zpp_critical = !1;
		this.zpp_i = 0;
		this.zpp_inner = null
	};
	Ja.__name__ = !0;
	Ja.get = function(a) {
		if (null ==
			Ja.zpp_pool) {
			var b = new Ja;
			gc.internal = !1
		} else b = Ja.zpp_pool, Ja.zpp_pool = b.zpp_next;
		b.zpp_i = 0;
		b.zpp_inner = a;
		b.zpp_critical = !1;
		return b
	};
	Ja.prototype = {
		hasNext: function() {
			this.zpp_inner.zpp_inner.valmod();
			var a = this.zpp_inner.get_length();
			this.zpp_critical = !0;
			if (this.zpp_i < a) return !0;
			this.zpp_next = Ja.zpp_pool;
			Ja.zpp_pool = this;
			this.zpp_inner = null;
			return !1
		},
		next: function() {
			this.zpp_critical = !1;
			return this.zpp_inner.at(this.zpp_i++)
		},
		__class__: Ja
	};
	var Kc = function() {
		this.zpp_inner = new gc;
		this.zpp_inner.outer =
			this
	};
	Kc.__name__ = !0;
	Kc.prototype = {
		get_length: function() {
			this.zpp_inner.valmod();
			this.zpp_inner.zip_length && (this.zpp_inner.zip_length = !1, this.zpp_inner.user_length = this.zpp_inner.inner.length);
			return this.zpp_inner.user_length
		},
		at: function(a) {
			this.zpp_inner.valmod();
			this.zpp_inner.reverse_flag && (a = this.get_length() - 1 - a);
			if (a < this.zpp_inner.at_index || null == this.zpp_inner.at_ite) this.zpp_inner.at_index = a, this.zpp_inner.at_ite = this.zpp_inner.inner.iterator_at(a);
			else
				for (; this.zpp_inner.at_index != a;) this.zpp_inner.at_index++,
					this.zpp_inner.at_ite = this.zpp_inner.at_ite.next;
			return this.zpp_inner.at_ite.elt.outer
		},
		push: function(a) {
			this.zpp_inner.modify_test();
			this.zpp_inner.valmod();
			var b;
			if (b = null != this.zpp_inner.adder ? this.zpp_inner.adder(a) : !0) this.zpp_inner.reverse_flag ? this.zpp_inner.inner.add(a.zpp_inner) : (null == this.zpp_inner.push_ite && (this.zpp_inner.push_ite = null == this.zpp_inner.inner.head ? null : this.zpp_inner.inner.iterator_at(this.get_length() - 1)), this.zpp_inner.push_ite = this.zpp_inner.inner.insert(this.zpp_inner.push_ite,
				a.zpp_inner)), this.zpp_inner.invalidate(), null != this.zpp_inner.post_adder && this.zpp_inner.post_adder(a);
			return b
		},
		unshift: function(a) {
			this.zpp_inner.modify_test();
			this.zpp_inner.valmod();
			var b;
			if (b = null != this.zpp_inner.adder ? this.zpp_inner.adder(a) : !0) this.zpp_inner.reverse_flag ? (null == this.zpp_inner.push_ite && (this.zpp_inner.push_ite = null == this.zpp_inner.inner.head ? null : this.zpp_inner.inner.iterator_at(this.get_length() - 1)), this.zpp_inner.push_ite = this.zpp_inner.inner.insert(this.zpp_inner.push_ite,
				a.zpp_inner)) : this.zpp_inner.inner.add(a.zpp_inner), this.zpp_inner.invalidate(), null != this.zpp_inner.post_adder && this.zpp_inner.post_adder(a);
			return b
		},
		add: function(a) {
			return this.zpp_inner.reverse_flag ? this.push(a) : this.unshift(a)
		},
		toString: function() {
			var a = "[",
				b = !0,
				c;
			this.zpp_inner.valmod();
			for (c = Ja.get(this); c.hasNext();) {
				c.zpp_critical = !1;
				var d = c.zpp_inner.at(c.zpp_i++);
				b || (a += ",");
				a = null == d ? a + "NULL" : a + d.toString();
				b = !1
			}
			return a + "]"
		},
		__class__: Kc
	};
	var Lc = function() {
		this.zpp_inner = null
	};
	Lc.__name__ = !0;
	Lc.__super__ = Hb;
	Lc.prototype = r(Hb.prototype, {
		toString: function() {
			var a = "Cb:" + ["WAKE", "SLEEP", "BREAK"][this.zpp_inner.event - 2];
			a += ":" + this.zpp_inner.constraint.outer.toString();
			return a += " : listener: " + W.string(this.zpp_inner.listener.outer)
		},
		__class__: Lc
	});
	var $c = function() {
		this.zpp_inner_zn = null
	};
	$c.__name__ = !0;
	$c.__super__ = Xa;
	$c.prototype = r(Xa.prototype, {
		__class__: $c
	});
	var Mc = function() {
		this.zpp_inner = null
	};
	Mc.__name__ = !0;
	Mc.__super__ = Hb;
	Mc.prototype = r(Hb.prototype, {
		toString: function() {
			var a =
				"Cb:" + "BEGIN END     ONGOING".split(" ")[this.zpp_inner.event];
			a += ":" + this.zpp_inner.int1.outer_i.toString() + "/" + this.zpp_inner.int2.outer_i.toString();
			a += " : " + this.zpp_inner.wrap_arbiters.toString();
			return a += " : listener: " + W.string(this.zpp_inner.listener.outer)
		},
		__class__: Mc
	});
	var tc = function(a, b, c, d, e, f) {
		null == f && (f = 0);
		this.zpp_inner = this.zpp_inner_zn = null;
		var h = -1;
		null == g.CbEvent_BEGIN && (g.CbEvent_BEGIN = new ma, g.internal = !1);
		a == g.CbEvent_BEGIN ? h = 0 : (null == g.CbEvent_END && (g.CbEvent_END = new ma,
			g.internal = !1), a == g.CbEvent_END ? h = 1 : (null == g.CbEvent_ONGOING && (g.CbEvent_ONGOING = new ma, g.internal = !1), a == g.CbEvent_ONGOING && (h = 6)));
		this.zpp_inner = this.zpp_inner_zn = new Da(Nc.argument(c), Nc.argument(d), h, 2);
		this.zpp_inner.outer = this;
		this.zpp_inner_zn.outer_zni = this;
		this.zpp_inner.precedence = f;
		this.zpp_inner_zn.handleri = e;
		this.set_interactionType(b)
	};
	tc.__name__ = !0;
	tc.__super__ = Xa;
	tc.prototype = r(Xa.prototype, {
		get_interactionType: function() {
			var a = this.zpp_inner_zn.itype;
			return 1 == a ? (null == g.InteractionType_COLLISION &&
				(g.InteractionType_COLLISION = new za, g.internal = !1), g.InteractionType_COLLISION) : 2 == a ? (null == g.InteractionType_SENSOR && (g.InteractionType_SENSOR = new za, g.internal = !1), g.InteractionType_SENSOR) : 4 == a ? (null == g.InteractionType_FLUID && (g.InteractionType_FLUID = new za, g.internal = !1), g.InteractionType_FLUID) : 7 == a ? (null == g.InteractionType_ANY && (g.InteractionType_ANY = new za, g.internal = !1), g.InteractionType_ANY) : null
		},
		set_interactionType: function(a) {
			this.get_interactionType() != a && (null == g.InteractionType_COLLISION &&
				(g.InteractionType_COLLISION = new za, g.internal = !1), a == g.InteractionType_COLLISION ? a = 1 : (null == g.InteractionType_SENSOR && (g.InteractionType_SENSOR = new za, g.internal = !1), a == g.InteractionType_SENSOR ? a = 2 : (null == g.InteractionType_FLUID && (g.InteractionType_FLUID = new za, g.internal = !1), a = a == g.InteractionType_FLUID ? 4 : 7)), this.zpp_inner_zn.itype = a);
			return this.get_interactionType()
		},
		__class__: tc
	});
	var za = function() {};
	za.__name__ = !0;
	za.prototype = {
		toString: function() {
			null == g.InteractionType_COLLISION && (g.InteractionType_COLLISION =
				new za, g.internal = !1);
			if (this == g.InteractionType_COLLISION) var a = "COLLISION";
			else null == g.InteractionType_SENSOR && (g.InteractionType_SENSOR = new za, g.internal = !1), this == g.InteractionType_SENSOR ? a = "SENSOR" : (null == g.InteractionType_FLUID && (g.InteractionType_FLUID = new za, g.internal = !1), this == g.InteractionType_FLUID ? a = "FLUID" : (null == g.InteractionType_ANY && (g.InteractionType_ANY = new za, g.internal = !1), a = this == g.InteractionType_ANY ? "ANY" : ""));
			return a
		},
		__class__: za
	};
	var Ib = function() {
		this.zpp_next = null;
		this.zpp_critical = !1;
		this.zpp_i = 0;
		this.zpp_inner = null
	};
	Ib.__name__ = !0;
	Ib.get = function(a) {
		if (null == Ib.zpp_pool) {
			var b = new Ib;
			hc.internal = !1
		} else b = Ib.zpp_pool, Ib.zpp_pool = b.zpp_next;
		b.zpp_i = 0;
		b.zpp_inner = a;
		b.zpp_critical = !1;
		return b
	};
	Ib.prototype = {
		hasNext: function() {
			this.zpp_inner.zpp_inner.valmod();
			var a = this.zpp_inner.get_length();
			this.zpp_critical = !0;
			if (this.zpp_i < a) return !0;
			this.zpp_next = Ib.zpp_pool;
			Ib.zpp_pool = this;
			this.zpp_inner = null;
			return !1
		},
		next: function() {
			this.zpp_critical = !1;
			return this.zpp_inner.at(this.zpp_i++)
		},
		__class__: Ib
	};
	var Hd = function() {
		this.zpp_inner = new hc;
		this.zpp_inner.outer = this
	};
	Hd.__name__ = !0;
	Hd.prototype = {
		get_length: function() {
			this.zpp_inner.valmod();
			this.zpp_inner.zip_length && (this.zpp_inner.zip_length = !1, this.zpp_inner.user_length = this.zpp_inner.inner.length);
			return this.zpp_inner.user_length
		},
		at: function(a) {
			this.zpp_inner.valmod();
			this.zpp_inner.reverse_flag && (a = this.get_length() - 1 - a);
			if (a < this.zpp_inner.at_index || null == this.zpp_inner.at_ite) this.zpp_inner.at_index = a, this.zpp_inner.at_ite =
				this.zpp_inner.inner.iterator_at(a);
			else
				for (; this.zpp_inner.at_index != a;) this.zpp_inner.at_index++, this.zpp_inner.at_ite = this.zpp_inner.at_ite.next;
			return this.zpp_inner.at_ite.elt.outer
		},
		push: function(a) {
			this.zpp_inner.modify_test();
			this.zpp_inner.valmod();
			var b;
			if (b = null != this.zpp_inner.adder ? this.zpp_inner.adder(a) : !0) this.zpp_inner.reverse_flag ? this.zpp_inner.inner.add(a.zpp_inner) : (null == this.zpp_inner.push_ite && (this.zpp_inner.push_ite = null == this.zpp_inner.inner.head ? null : this.zpp_inner.inner.iterator_at(this.get_length() -
				1)), this.zpp_inner.push_ite = this.zpp_inner.inner.insert(this.zpp_inner.push_ite, a.zpp_inner)), this.zpp_inner.invalidate(), null != this.zpp_inner.post_adder && this.zpp_inner.post_adder(a);
			return b
		},
		unshift: function(a) {
			this.zpp_inner.modify_test();
			this.zpp_inner.valmod();
			var b;
			if (b = null != this.zpp_inner.adder ? this.zpp_inner.adder(a) : !0) this.zpp_inner.reverse_flag ? (null == this.zpp_inner.push_ite && (this.zpp_inner.push_ite = null == this.zpp_inner.inner.head ? null : this.zpp_inner.inner.iterator_at(this.get_length() -
				1)), this.zpp_inner.push_ite = this.zpp_inner.inner.insert(this.zpp_inner.push_ite, a.zpp_inner)) : this.zpp_inner.inner.add(a.zpp_inner), this.zpp_inner.invalidate(), null != this.zpp_inner.post_adder && this.zpp_inner.post_adder(a);
			return b
		},
		pop: function() {
			this.zpp_inner.modify_test();
			this.zpp_inner.valmod();
			if (this.zpp_inner.reverse_flag) {
				var a = this.zpp_inner.inner.head.elt;
				var b = a.outer;
				null != this.zpp_inner.subber && this.zpp_inner.subber(b);
				this.zpp_inner.dontremove || this.zpp_inner.inner.pop()
			} else {
				null !=
					this.zpp_inner.at_ite && null == this.zpp_inner.at_ite.next && (this.zpp_inner.at_ite = null);
				b = 1 == this.get_length() ? null : this.zpp_inner.inner.iterator_at(this.get_length() - 2);
				a = null == b ? this.zpp_inner.inner.head.elt : b.next.elt;
				var c = a.outer;
				null != this.zpp_inner.subber && this.zpp_inner.subber(c);
				this.zpp_inner.dontremove || this.zpp_inner.inner.erase(b)
			}
			this.zpp_inner.invalidate();
			return a.outer
		},
		shift: function() {
			this.zpp_inner.modify_test();
			this.zpp_inner.valmod();
			if (this.zpp_inner.reverse_flag) {
				null != this.zpp_inner.at_ite &&
					null == this.zpp_inner.at_ite.next && (this.zpp_inner.at_ite = null);
				var a = 1 == this.get_length() ? null : this.zpp_inner.inner.iterator_at(this.get_length() - 2);
				var b = null == a ? this.zpp_inner.inner.head.elt : a.next.elt;
				var c = b.outer;
				null != this.zpp_inner.subber && this.zpp_inner.subber(c);
				this.zpp_inner.dontremove || this.zpp_inner.inner.erase(a)
			} else b = this.zpp_inner.inner.head.elt, a = b.outer, null != this.zpp_inner.subber && this.zpp_inner.subber(a), this.zpp_inner.dontremove || this.zpp_inner.inner.pop();
			this.zpp_inner.invalidate();
			return b.outer
		},
		add: function(a) {
			return this.zpp_inner.reverse_flag ? this.push(a) : this.unshift(a)
		},
		remove: function(a) {
			this.zpp_inner.modify_test();
			this.zpp_inner.valmod();
			var b = !1;
			for (var c = this.zpp_inner.inner.head; null != c;) {
				if (c.elt == a.zpp_inner) {
					b = !0;
					break
				}
				c = c.next
			}
			b && (null != this.zpp_inner.subber && this.zpp_inner.subber(a), this.zpp_inner.dontremove || this.zpp_inner.inner.remove(a.zpp_inner), this.zpp_inner.invalidate());
			return b
		},
		clear: function() {
			if (this.zpp_inner.reverse_flag)
				for (; null != this.zpp_inner.inner.head;) this.pop();
			else
				for (; null != this.zpp_inner.inner.head;) this.shift()
		},
		toString: function() {
			var a = "[",
				b = !0,
				c;
			this.zpp_inner.valmod();
			for (c = Ib.get(this); c.hasNext();) {
				c.zpp_critical = !1;
				var d = c.zpp_inner.at(c.zpp_i++);
				b || (a += ",");
				a = null == d ? a + "NULL" : a + d.toString();
				b = !1
			}
			return a + "]"
		},
		__class__: Hd
	};
	var ad = function(a, b) {
		this.zpp_inner = new Nc;
		this.zpp_inner.outer = this;
		null != a && this.including(a);
		null != b && this.excluding(b)
	};
	ad.__name__ = !0;
	ad.prototype = {
		including: function(a) {
			this.zpp_inner.append(this.zpp_inner.includes,
				a);
			return this
		},
		excluding: function(a) {
			this.zpp_inner.append(this.zpp_inner.excludes, a);
			return this
		},
		toString: function() {
			null == this.zpp_inner.wrap_includes && this.zpp_inner.setup_includes();
			var a = this.zpp_inner.wrap_includes.toString();
			null == this.zpp_inner.wrap_excludes && this.zpp_inner.setup_excludes();
			return "@{" + a + " excluding " + this.zpp_inner.wrap_excludes.toString() + "}"
		},
		__class__: ad
	};
	var Oc = function() {
		this.zpp_inner = null
	};
	Oc.__name__ = !0;
	Oc.__super__ = Hb;
	Oc.prototype = r(Hb.prototype, {
		toString: function() {
			var a =
				"Cb:PRE:" + (":" + this.zpp_inner.int1.outer_i.toString() + "/" + this.zpp_inner.int2.outer_i.toString());
			a += " : " + this.zpp_inner.pre_arbiter.wrapper().toString();
			return a += " : listnener: " + W.string(this.zpp_inner.listener.outer)
		},
		__class__: Oc
	});
	var na = function() {};
	na.__name__ = !0;
	na.prototype = {
		toString: function() {
			null == g.PreFlag_ACCEPT && (g.PreFlag_ACCEPT = new na, g.internal = !1);
			if (this == g.PreFlag_ACCEPT) var a = "ACCEPT";
			else null == g.PreFlag_IGNORE && (g.PreFlag_IGNORE = new na, g.internal = !1), this == g.PreFlag_IGNORE ?
				a = "IGNORE" : (null == g.PreFlag_ACCEPT_ONCE && (g.PreFlag_ACCEPT_ONCE = new na, g.internal = !1), this == g.PreFlag_ACCEPT_ONCE ? a = "ACCEPT_ONCE" : (null == g.PreFlag_IGNORE_ONCE && (g.PreFlag_IGNORE_ONCE = new na, g.internal = !1), a = this == g.PreFlag_IGNORE_ONCE ? "IGNORE_ONCE" : ""));
			return a
		},
		__class__: na
	};
	var Id = function() {
		this.zpp_inner_zn = null
	};
	Id.__name__ = !0;
	Id.__super__ = Xa;
	Id.prototype = r(Xa.prototype, {
		__class__: Id
	});
	var Pc = function() {
		this.zpp_inner.insert_cbtype(P.ANY_CONSTRAINT.zpp_inner)
	};
	Pc.__name__ = !0;
	Pc.prototype = {
		get_space: function() {
			return null ==
				this.zpp_inner.space ? null : this.zpp_inner.space.outer
		},
		set_space: function(a) {
			(null == this.zpp_inner.space ? null : this.zpp_inner.space.outer) != a && (null != this.zpp_inner.component && (this.zpp_inner.component.woken = !1), this.zpp_inner.clearcache(), null != this.zpp_inner.space && this.zpp_inner.space.outer.zpp_inner.wrap_constraints.remove(this), null != a ? a.zpp_inner.wrap_constraints.add(this) : this.zpp_inner.space = null);
			return null == this.zpp_inner.space ? null : this.zpp_inner.space.outer
		},
		set_active: function(a) {
			this.zpp_inner.active !=
				a && (null != this.zpp_inner.component && (this.zpp_inner.component.woken = !1), this.zpp_inner.clearcache(), a ? (this.zpp_inner.active = a, this.zpp_inner.activate(), null != this.zpp_inner.space && (null != this.zpp_inner.component && (this.zpp_inner.component.sleeping = !0), this.zpp_inner.space.wake_constraint(this.zpp_inner, !0))) : (null != this.zpp_inner.space && (this.zpp_inner.wake(), this.zpp_inner.space.live_constraints.remove(this.zpp_inner)), this.zpp_inner.active = a, this.zpp_inner.deactivate()));
			return this.zpp_inner.active
		},
		set_stiff: function(a) {
			this.zpp_inner.stiff != a && (this.zpp_inner.stiff = a, this.zpp_inner.wake());
			return this.zpp_inner.stiff
		},
		set_maxForce: function(a) {
			this.zpp_inner.maxForce != a && (this.zpp_inner.maxForce = a, this.zpp_inner.wake());
			return this.zpp_inner.maxForce
		},
		toString: function() {
			return "{Constraint}"
		},
		__class__: Pc
	};
	var sa = function() {
		this.zpp_next = null;
		this.zpp_critical = !1;
		this.zpp_i = 0;
		this.zpp_inner = null
	};
	sa.__name__ = !0;
	sa.get = function(a) {
		if (null == sa.zpp_pool) {
			var b = new sa;
			Jb.internal = !1
		} else b = sa.zpp_pool,
			sa.zpp_pool = b.zpp_next;
		b.zpp_i = 0;
		b.zpp_inner = a;
		b.zpp_critical = !1;
		return b
	};
	sa.prototype = {
		hasNext: function() {
			this.zpp_inner.zpp_inner.valmod();
			var a = this.zpp_inner.get_length();
			this.zpp_critical = !0;
			if (this.zpp_i < a) return !0;
			this.zpp_next = sa.zpp_pool;
			sa.zpp_pool = this;
			this.zpp_inner = null;
			return !1
		},
		next: function() {
			this.zpp_critical = !1;
			return this.zpp_inner.at(this.zpp_i++)
		},
		__class__: sa
	};
	var Jd = function() {
		this.zpp_inner = new Jb;
		this.zpp_inner.outer = this
	};
	Jd.__name__ = !0;
	Jd.prototype = {
		get_length: function() {
			this.zpp_inner.valmod();
			this.zpp_inner.zip_length && (this.zpp_inner.zip_length = !1, this.zpp_inner.user_length = this.zpp_inner.inner.length);
			return this.zpp_inner.user_length
		},
		at: function(a) {
			this.zpp_inner.valmod();
			this.zpp_inner.reverse_flag && (a = this.get_length() - 1 - a);
			if (a < this.zpp_inner.at_index || null == this.zpp_inner.at_ite) this.zpp_inner.at_index = a, this.zpp_inner.at_ite = this.zpp_inner.inner.iterator_at(a);
			else
				for (; this.zpp_inner.at_index != a;) this.zpp_inner.at_index++, this.zpp_inner.at_ite = this.zpp_inner.at_ite.next;
			return this.zpp_inner.at_ite.elt.outer
		},
		push: function(a) {
			this.zpp_inner.modify_test();
			this.zpp_inner.valmod();
			var b;
			if (b = null != this.zpp_inner.adder ? this.zpp_inner.adder(a) : !0) this.zpp_inner.reverse_flag ? this.zpp_inner.inner.add(a.zpp_inner) : (null == this.zpp_inner.push_ite && (this.zpp_inner.push_ite = null == this.zpp_inner.inner.head ? null : this.zpp_inner.inner.iterator_at(this.get_length() - 1)), this.zpp_inner.push_ite = this.zpp_inner.inner.insert(this.zpp_inner.push_ite, a.zpp_inner)), this.zpp_inner.invalidate(), null != this.zpp_inner.post_adder &&
				this.zpp_inner.post_adder(a);
			return b
		},
		unshift: function(a) {
			this.zpp_inner.modify_test();
			this.zpp_inner.valmod();
			var b;
			if (b = null != this.zpp_inner.adder ? this.zpp_inner.adder(a) : !0) this.zpp_inner.reverse_flag ? (null == this.zpp_inner.push_ite && (this.zpp_inner.push_ite = null == this.zpp_inner.inner.head ? null : this.zpp_inner.inner.iterator_at(this.get_length() - 1)), this.zpp_inner.push_ite = this.zpp_inner.inner.insert(this.zpp_inner.push_ite, a.zpp_inner)) : this.zpp_inner.inner.add(a.zpp_inner), this.zpp_inner.invalidate(),
				null != this.zpp_inner.post_adder && this.zpp_inner.post_adder(a);
			return b
		},
		add: function(a) {
			return this.zpp_inner.reverse_flag ? this.push(a) : this.unshift(a)
		},
		remove: function(a) {
			this.zpp_inner.modify_test();
			this.zpp_inner.valmod();
			var b = !1;
			for (var c = this.zpp_inner.inner.head; null != c;) {
				if (c.elt == a.zpp_inner) {
					b = !0;
					break
				}
				c = c.next
			}
			b && (null != this.zpp_inner.subber && this.zpp_inner.subber(a), this.zpp_inner.dontremove || this.zpp_inner.inner.remove(a.zpp_inner), this.zpp_inner.invalidate());
			return b
		},
		toString: function() {
			var a =
				"[",
				b = !0,
				c;
			this.zpp_inner.valmod();
			for (c = sa.get(this); c.hasNext();) {
				c.zpp_critical = !1;
				var d = c.zpp_inner.at(c.zpp_i++);
				b || (a += ",");
				a = null == d ? a + "NULL" : a + d.toString();
				b = !1
			}
			return a + "]"
		},
		__class__: Jd
	};
	var pd = function(a, b, c, d) {
		this.zpp_inner = this.zpp_inner_zn = new uc;
		this.zpp_inner.outer = this;
		this.zpp_inner_zn.outer_zn = this;
		Pc.call(this);
		this.set_body1(a);
		this.set_body2(b);
		null == this.zpp_inner_zn.wrap_a1 && this.zpp_inner_zn.setup_a1();
		this.zpp_inner_zn.wrap_a1.set(c);
		null == this.zpp_inner_zn.wrap_a1 && this.zpp_inner_zn.setup_a1();
		this.zpp_inner_zn.wrap_a1;
		null == this.zpp_inner_zn.wrap_a2 && this.zpp_inner_zn.setup_a2();
		this.zpp_inner_zn.wrap_a2.set(d);
		null == this.zpp_inner_zn.wrap_a2 && this.zpp_inner_zn.setup_a2();
		this.zpp_inner_zn.wrap_a2
	};
	pd.__name__ = !0;
	pd.__super__ = Pc;
	pd.prototype = r(Pc.prototype, {
		set_body1: function(a) {
			this.zpp_inner.immutable_midstep("Constraint::body1");
			a = null == a ? null : a.zpp_inner;
			a != this.zpp_inner_zn.b1 && (null != this.zpp_inner_zn.b1 && (null != (null == this.zpp_inner.space ? null : this.zpp_inner.space.outer) && this.zpp_inner_zn.b2 !=
				this.zpp_inner_zn.b1 && null != this.zpp_inner_zn.b1 && this.zpp_inner_zn.b1.constraints.remove(this.zpp_inner), this.zpp_inner.active && null != (null == this.zpp_inner.space ? null : this.zpp_inner.space.outer) && this.zpp_inner_zn.b1.wake()), this.zpp_inner_zn.b1 = a, null != (null == this.zpp_inner.space ? null : this.zpp_inner.space.outer) && null != a && this.zpp_inner_zn.b2 != a && null != a && a.constraints.add(this.zpp_inner), this.zpp_inner.active && null != (null == this.zpp_inner.space ? null : this.zpp_inner.space.outer) && (this.zpp_inner.wake(),
				null != a && a.wake()));
			return null == this.zpp_inner_zn.b1 ? null : this.zpp_inner_zn.b1.outer
		},
		set_body2: function(a) {
			this.zpp_inner.immutable_midstep("Constraint::body2");
			a = null == a ? null : a.zpp_inner;
			a != this.zpp_inner_zn.b2 && (null != this.zpp_inner_zn.b2 && (null != (null == this.zpp_inner.space ? null : this.zpp_inner.space.outer) && this.zpp_inner_zn.b1 != this.zpp_inner_zn.b2 && null != this.zpp_inner_zn.b2 && this.zpp_inner_zn.b2.constraints.remove(this.zpp_inner), this.zpp_inner.active && null != (null == this.zpp_inner.space ? null :
				this.zpp_inner.space.outer) && this.zpp_inner_zn.b2.wake()), this.zpp_inner_zn.b2 = a, null != (null == this.zpp_inner.space ? null : this.zpp_inner.space.outer) && null != a && this.zpp_inner_zn.b1 != a && null != a && a.constraints.add(this.zpp_inner), this.zpp_inner.active && null != (null == this.zpp_inner.space ? null : this.zpp_inner.space.outer) && (this.zpp_inner.wake(), null != a && a.wake()));
			return null == this.zpp_inner_zn.b2 ? null : this.zpp_inner_zn.b2.outer
		},
		get_anchor1: function() {
			null == this.zpp_inner_zn.wrap_a1 && this.zpp_inner_zn.setup_a1();
			return this.zpp_inner_zn.wrap_a1
		},
		get_anchor2: function() {
			null == this.zpp_inner_zn.wrap_a2 && this.zpp_inner_zn.setup_a2();
			return this.zpp_inner_zn.wrap_a2
		},
		__class__: pd
	});
	var vc = function() {
		this.zpp_inner = null
	};
	vc.__name__ = !0;
	vc.prototype = {
		get_state: function() {
			var a = this.zpp_inner.immState;
			if (5 == a) return null == g.PreFlag_ACCEPT && (g.PreFlag_ACCEPT = new na, g.internal = !1), g.PreFlag_ACCEPT;
			switch (a) {
				case 1:
					return null == g.PreFlag_ACCEPT_ONCE && (g.internal = !0, g.PreFlag_ACCEPT_ONCE = new na, g.internal = !1), g.PreFlag_ACCEPT_ONCE;
				default:
					if (6 == a) return null == g.PreFlag_IGNORE && (g.internal = !0, g.PreFlag_IGNORE = new na, g.internal = !1), g.PreFlag_IGNORE;
					null == g.PreFlag_IGNORE_ONCE && (g.internal = !0, g.PreFlag_IGNORE_ONCE = new na, g.internal = !1);
					return g.PreFlag_IGNORE_ONCE
			}
		},
		toString: function() {
			var a = this.zpp_inner.type == E.COL ? "CollisionArbiter" : this.zpp_inner.type == E.FLUID ? "FluidArbiter" : "SensorArbiter";
			return this.zpp_inner.cleared ? a + "(object-pooled)" : a + "(" + (this.zpp_inner.ws1.id > this.zpp_inner.ws2.id ? this.zpp_inner.ws2.outer : this.zpp_inner.ws1.outer).toString() +
				"|" + (this.zpp_inner.ws1.id > this.zpp_inner.ws2.id ? this.zpp_inner.ws1.outer : this.zpp_inner.ws2.outer).toString() + ")" + (this.zpp_inner.type == E.COL ? "[" + ["SD", "DD"][this.zpp_inner.colarb.stat ? 0 : 1] + "]" : "") + "\x3c-" + this.get_state().toString()
		},
		__class__: vc
	};
	var Ya = function() {
		this.zpp_next = null;
		this.zpp_critical = !1;
		this.zpp_i = 0;
		this.zpp_inner = null
	};
	Ya.__name__ = !0;
	Ya.get = function(a) {
		if (null == Ya.zpp_pool) {
			var b = new Ya;
			Wb.internal = !1
		} else b = Ya.zpp_pool, Ya.zpp_pool = b.zpp_next;
		b.zpp_i = 0;
		b.zpp_inner = a;
		b.zpp_critical = !1;
		return b
	};
	Ya.prototype = {
		hasNext: function() {
			this.zpp_inner.zpp_inner.valmod();
			var a = this.zpp_inner.zpp_gl();
			this.zpp_critical = !0;
			if (this.zpp_i < a) return !0;
			this.zpp_next = Ya.zpp_pool;
			Ya.zpp_pool = this;
			this.zpp_inner = null;
			return !1
		},
		next: function() {
			this.zpp_critical = !1;
			return this.zpp_inner.at(this.zpp_i++)
		},
		__class__: Ya
	};
	var Kd = function() {
		this.zpp_inner = new Wb;
		this.zpp_inner.outer = this
	};
	Kd.__name__ = !0;
	Kd.prototype = {
		zpp_gl: function() {
			this.zpp_inner.valmod();
			if (this.zpp_inner.zip_length) {
				this.zpp_inner.zip_length = !1;
				this.zpp_inner.user_length = 0;
				for (var a = this.zpp_inner.inner.head; null != a;) a.elt.active && this.zpp_inner.user_length++, a = a.next
			}
			return this.zpp_inner.user_length
		},
		zpp_vm: function() {
			this.zpp_inner.valmod()
		},
		at: function(a) {
			this.zpp_vm();
			this.zpp_inner.reverse_flag && (a = this.zpp_gl() - 1 - a);
			if (a < this.zpp_inner.at_index || null == this.zpp_inner.at_ite)
				for (this.zpp_inner.at_index = 0, this.zpp_inner.at_ite = this.zpp_inner.inner.head; !this.zpp_inner.at_ite.elt.active;) this.zpp_inner.at_ite = this.zpp_inner.at_ite.next;
			for (; this.zpp_inner.at_index != a;)
				for (this.zpp_inner.at_index++, this.zpp_inner.at_ite = this.zpp_inner.at_ite.next; !this.zpp_inner.at_ite.elt.active;) this.zpp_inner.at_ite = this.zpp_inner.at_ite.next;
			return this.zpp_inner.at_ite.elt.wrapper()
		},
		iterator: function() {
			this.zpp_vm();
			return Ya.get(this)
		},
		toString: function() {
			for (var a = "[", b = !0, c = this.iterator(); c.hasNext();) {
				c.zpp_critical = !1;
				var d = c.zpp_inner.at(c.zpp_i++);
				b || (a += ",");
				a = null == d ? a + "NULL" : a + d.toString();
				b = !1
			}
			return a + "]"
		},
		__class__: Kd
	};
	var td =
		function() {
			this.zpp_inner = null
		};
	td.__name__ = !0;
	td.__super__ = vc;
	td.prototype = r(vc.prototype, {
		__class__: td
	});
	var Ld = function() {
		this.zpp_inner = null
	};
	Ld.__name__ = !0;
	Ld.prototype = {
		toString: function() {
			return null == this.zpp_inner.arbiter || this.zpp_inner.arbiter.cleared ? "{object-pooled}" : "{Contact}"
		},
		__class__: Ld
	};
	var bd = function() {
		this.zpp_inner = null
	};
	bd.__name__ = !0;
	bd.__super__ = vc;
	bd.prototype = r(vc.prototype, {
		__class__: bd
	});
	var cd = function(a, b, c, d, e, f) {
		null == f && (f = -1);
		null == e && (e = 1);
		null == d && (d = -1);
		null ==
			c && (c = 1);
		null == b && (b = -1);
		null == a && (a = 1);
		this.zpp_inner = null;
		null == Za.zpp_pool ? this.zpp_inner = new Za : (this.zpp_inner = Za.zpp_pool, Za.zpp_pool = this.zpp_inner.next, this.zpp_inner.next = null);
		null;
		this.zpp_inner.outer = this;
		this.zpp_inner.collisionGroup != a && (this.zpp_inner.collisionGroup = a, this.zpp_inner.invalidate());
		this.zpp_inner.collisionGroup;
		this.zpp_inner.collisionMask != b && (this.zpp_inner.collisionMask = b, this.zpp_inner.invalidate());
		this.zpp_inner.collisionMask;
		this.zpp_inner.sensorGroup != c && (this.zpp_inner.sensorGroup =
			c, this.zpp_inner.invalidate());
		this.zpp_inner.sensorGroup;
		this.zpp_inner.sensorMask != d && (this.zpp_inner.sensorMask = d, this.zpp_inner.invalidate());
		this.zpp_inner.sensorMask;
		this.zpp_inner.fluidGroup != e && (this.zpp_inner.fluidGroup = e, this.zpp_inner.invalidate());
		this.zpp_inner.fluidGroup;
		this.zpp_inner.fluidMask != f && (this.zpp_inner.fluidMask = f, this.zpp_inner.invalidate());
		this.zpp_inner.fluidMask
	};
	cd.__name__ = !0;
	cd.prototype = {
		__class__: cd
	};
	var dd = function() {
		this.zpp_inner = null
	};
	dd.__name__ = !0;
	dd.prototype = {
		toString: function() {
			var a = "GeomPoly[",
				b = this.zpp_inner.vertices,
				c = this.zpp_inner.vertices;
			if (null != b) {
				do {
					var d = b;
					d != this.zpp_inner.vertices && (a += ",");
					a += "{" + d.x + "," + d.y + "}";
					b = b.next
				} while (b != c)
			}
			return a + "]"
		},
		__class__: dd
	};
	var D = function(a, b) {
		null == b && (b = 0);
		null == a && (a = 0);
		this.zpp_inner = this.zpp_pool = null;
		this.zpp_inner = N.get(a, b, null);
		this.zpp_inner.outer = this
	};
	D.__name__ = !0;
	D.get = function(a, b, c) {
		null == c && (c = !1);
		null == b && (b = 0);
		null == a && (a = 0);
		if (null == Qc.poolVec2) var d = new D;
		else d = Qc.poolVec2, Qc.poolVec2 =
			d.zpp_pool, d.zpp_pool = null;
		if (null == d.zpp_inner) d.zpp_inner = N.get(a, b, null), d.zpp_inner.outer = d;
		else {
			d.zpp_inner.validate();
			var e;
			(e = d.zpp_inner.x != a) || (d.zpp_inner.validate(), e = d.zpp_inner.y != b);
			e && (d.zpp_inner.x = a, d.zpp_inner.y = b, d.zpp_inner.invalidate());
			d
		}
		d.zpp_inner.weak = c;
		return d
	};
	D.prototype = {
		dispose: function() {
			var a = this.zpp_inner;
			this.zpp_inner = this.zpp_inner.outer = null;
			this.zpp_pool = Qc.poolVec2;
			Qc.poolVec2 = this;
			null != a.outer && (a.outer.zpp_inner = null, a.outer = null);
			a._isimmutable = null;
			a._validate =
				null;
			a._invalidate = null;
			a.next = N.zpp_pool;
			N.zpp_pool = a
		},
		get_x: function() {
			this.zpp_inner.validate();
			return this.zpp_inner.x
		},
		get_y: function() {
			this.zpp_inner.validate();
			return this.zpp_inner.y
		},
		set_y: function(a) {
			this.zpp_inner.validate();
			this.zpp_inner.y != a && (this.zpp_inner.y = a, this.zpp_inner.invalidate());
			this.zpp_inner.validate();
			return this.zpp_inner.y
		},
		set: function(a) {
			var b = this.setxy(function(b) {
				a.zpp_inner.validate();
				return a.zpp_inner.x
			}(this), function(b) {
				a.zpp_inner.validate();
				return a.zpp_inner.y
			}(this));
			a.zpp_inner.weak ? (a.dispose(), !0) : !1;
			return b
		},
		setxy: function(a, b) {
			this.zpp_inner.validate();
			var c;
			(c = this.zpp_inner.x != a) || (this.zpp_inner.validate(), c = this.zpp_inner.y != b);
			c && (this.zpp_inner.x = a, this.zpp_inner.y = b, this.zpp_inner.invalidate());
			return this
		},
		toString: function() {
			this.zpp_inner.validate();
			return this.zpp_inner.toString()
		},
		__class__: D
	};
	var Kb = function() {
		this.zpp_next = null;
		this.zpp_critical = !1;
		this.zpp_i = 0;
		this.zpp_inner = null
	};
	Kb.__name__ = !0;
	Kb.get = function(a) {
		if (null == Kb.zpp_pool) {
			var b =
				new Kb;
			ed.internal = !1
		} else b = Kb.zpp_pool, Kb.zpp_pool = b.zpp_next;
		b.zpp_i = 0;
		b.zpp_inner = a;
		b.zpp_critical = !1;
		return b
	};
	Kb.prototype = {
		hasNext: function() {
			this.zpp_inner.zpp_inner.valmod();
			var a = this.zpp_inner.zpp_gl();
			this.zpp_critical = !0;
			if (this.zpp_i < a) return !0;
			this.zpp_next = Kb.zpp_pool;
			Kb.zpp_pool = this;
			this.zpp_inner = null;
			return !1
		},
		next: function() {
			this.zpp_critical = !1;
			return this.zpp_inner.at(this.zpp_i++)
		},
		__class__: Kb
	};
	var $a = function() {
		this.zpp_inner = new ed;
		this.zpp_inner.outer = this
	};
	$a.__name__ = !0;
	$a.prototype = {
		zpp_gl: function() {
			this.zpp_inner.valmod();
			this.zpp_inner.zip_length && (this.zpp_inner.zip_length = !1, this.zpp_inner.user_length = this.zpp_inner.inner.length);
			return this.zpp_inner.user_length
		},
		zpp_vm: function() {
			this.zpp_inner.valmod()
		},
		at: function(a) {
			this.zpp_vm();
			this.zpp_inner.reverse_flag && (a = this.zpp_gl() - 1 - a);
			if (a < this.zpp_inner.at_index || null == this.zpp_inner.at_ite) this.zpp_inner.at_index = a, this.zpp_inner.at_ite = this.zpp_inner.inner.iterator_at(a);
			else
				for (; this.zpp_inner.at_index !=
					a;) this.zpp_inner.at_index++, this.zpp_inner.at_ite = this.zpp_inner.at_ite.next;
			return this.zpp_inner.at_ite.elt.wrapper()
		},
		push: function(a) {
			this.zpp_inner.modify_test();
			this.zpp_vm();
			var b;
			if (b = null != this.zpp_inner.adder ? this.zpp_inner.adder(a) : !0) this.zpp_inner.reverse_flag ? this.zpp_inner.inner.add(a.zpp_inner) : (null == this.zpp_inner.push_ite && (this.empty() ? this.zpp_inner.push_ite = null : this.zpp_inner.push_ite = this.zpp_inner.inner.iterator_at(this.zpp_gl() - 1)), this.zpp_inner.push_ite = this.zpp_inner.inner.insert(this.zpp_inner.push_ite,
				a.zpp_inner)), this.zpp_inner.invalidate(), null != this.zpp_inner.post_adder && this.zpp_inner.post_adder(a);
			return b
		},
		empty: function() {
			return 0 == this.zpp_gl()
		},
		iterator: function() {
			this.zpp_vm();
			return Kb.get(this)
		},
		toString: function() {
			for (var a = "[", b = !0, c = this.iterator(); c.hasNext();) {
				c.zpp_critical = !1;
				var d = c.zpp_inner.at(c.zpp_i++);
				b || (a += ",");
				a = null == d ? a + "NULL" : a + d.toString();
				b = !1
			}
			return a + "]"
		},
		__class__: $a
	};
	var Lb = function() {
		this.zpp_inner_i = null
	};
	Lb.__name__ = !0;
	Lb.prototype = {
		get_castBody: function() {
			return null !=
				this.zpp_inner_i.ibody ? this.zpp_inner_i.ibody.outer : null
		},
		get_cbTypes: function() {
			null == this.zpp_inner_i.wrap_cbTypes && this.zpp_inner_i.setupcbTypes();
			return this.zpp_inner_i.wrap_cbTypes
		},
		toString: function() {
			return ""
		},
		__class__: Lb
	};
	var ec = function(a, b) {
		this.zpp_inner_i = this.zpp_inner = null;
		this.zpp_inner = new db;
		this.zpp_inner.outer = this;
		this.zpp_inner.outer_i = this;
		this.zpp_inner_i = this.zpp_inner;
		null != b ? (b.zpp_inner.validate(), this.zpp_inner.posx = b.zpp_inner.x, b.zpp_inner.validate(), this.zpp_inner.posy =
			b.zpp_inner.y) : (this.zpp_inner.posx = 0, this.zpp_inner.posy = 0);
		this.set_type(null == a ? function(a) {
			null == g.BodyType_DYNAMIC && (g.BodyType_DYNAMIC = new X, g.internal = !1);
			return g.BodyType_DYNAMIC
		}(this) : a);
		null != b && (b.zpp_inner.weak ? (b.dispose(), !0) : !1);
		this.zpp_inner_i.insert_cbtype(P.ANY_BODY.zpp_inner)
	};
	ec.__name__ = !0;
	ec.__super__ = Lb;
	ec.prototype = r(Lb.prototype, {
		set_type: function(a) {
			this.zpp_inner.immutable_midstep("Body::type");
			db.types[this.zpp_inner.type] != a && (null == g.BodyType_DYNAMIC && (g.BodyType_DYNAMIC =
				new X, g.internal = !1), a == g.BodyType_DYNAMIC ? a = 2 : (null == g.BodyType_KINEMATIC && (g.BodyType_KINEMATIC = new X, g.internal = !1), a = a == g.BodyType_KINEMATIC ? 3 : 1), 1 == a && null != this.zpp_inner.space && (this.zpp_inner.velx = 0, this.zpp_inner.vely = 0, this.zpp_inner.angvel = 0), this.zpp_inner.invalidate_type(), null != this.zpp_inner.space ? this.zpp_inner.space.transmitType(this.zpp_inner, a) : this.zpp_inner.type = a);
			return db.types[this.zpp_inner.type]
		},
		set_space: function(a) {
			this.zpp_inner.immutable_midstep("Body::space");
			(null ==
				this.zpp_inner.space ? null : this.zpp_inner.space.outer) != a && (null != (null == this.zpp_inner.space ? null : this.zpp_inner.space.outer) && (this.zpp_inner.component.woken = !1), null != (null == this.zpp_inner.space ? null : this.zpp_inner.space.outer) && (null == this.zpp_inner.space ? null : this.zpp_inner.space.outer).zpp_inner.wrap_bodies.remove(this), null != a && a.zpp_inner.wrap_bodies.add(this));
			return null == this.zpp_inner.space ? null : this.zpp_inner.space.outer
		},
		get_position: function() {
			null == this.zpp_inner.wrap_pos && this.zpp_inner.setupPosition();
			return this.zpp_inner.wrap_pos
		},
		get_velocity: function() {
			null == this.zpp_inner.wrap_vel && this.zpp_inner.setupVelocity();
			return this.zpp_inner.wrap_vel
		},
		get_surfaceVel: function() {
			null == this.zpp_inner.wrap_svel && this.zpp_inner.setupsvel();
			return this.zpp_inner.wrap_svel
		},
		set_rotation: function(a) {
			this.zpp_inner.immutable_midstep("Body::rotation");
			this.zpp_inner.rot != a && (this.zpp_inner.rot = a, this.zpp_inner.invalidate_rot(), this.zpp_inner.wake());
			return this.zpp_inner.rot
		},
		set_angularVel: function(a) {
			this.zpp_inner.angvel !=
				a && (this.zpp_inner.angvel = a, this.zpp_inner.wake());
			return this.zpp_inner.angvel
		},
		set_torque: function(a) {
			this.zpp_inner.torque != a && (this.zpp_inner.torque = a, this.zpp_inner.wake());
			return this.zpp_inner.torque
		},
		set_allowMovement: function(a) {
			this.zpp_inner.immutable_midstep("Body::" + (null == a ? "null" : "" + a));
			!this.zpp_inner.nomove != a && (this.zpp_inner.nomove = !a, this.zpp_inner.invalidate_mass());
			return !this.zpp_inner.nomove
		},
		set_allowRotation: function(a) {
			this.zpp_inner.immutable_midstep("Body::" + (null == a ?
				"null" : "" + a));
			!this.zpp_inner.norotate != a && (this.zpp_inner.norotate = !a, this.zpp_inner.invalidate_inertia());
			return !this.zpp_inner.norotate
		},
		applyImpulse: function(a, b, c) {
			null == c && (c = !1);
			if (c && this.zpp_inner.component.sleeping) return a.zpp_inner.weak ? (a.dispose(), !0) : !1, null != b && (b.zpp_inner.weak ? (b.dispose(), !0) : !1), this;
			this.zpp_inner.validate_mass();
			var d = this.zpp_inner.imass,
				e = this.zpp_inner,
				f = this.zpp_inner.velx;
			a.zpp_inner.validate();
			e.velx = f + a.zpp_inner.x * d;
			e = this.zpp_inner;
			f = this.zpp_inner.vely;
			a.zpp_inner.validate();
			e.vely = f + a.zpp_inner.y * d;
			if (null != b) {
				b.zpp_inner.validate();
				var h = b.zpp_inner.x - this.zpp_inner.posx;
				b.zpp_inner.validate();
				d = b.zpp_inner.y - this.zpp_inner.posy;
				this.zpp_inner.validate_inertia();
				e = this.zpp_inner;
				f = this.zpp_inner.angvel;
				a.zpp_inner.validate();
				h *= a.zpp_inner.y;
				a.zpp_inner.validate();
				e.angvel = f + (h - a.zpp_inner.x * d) * this.zpp_inner.iinertia;
				b.zpp_inner.weak ? (b.dispose(), !0) : !1
			}
			c || 2 == this.zpp_inner.type && this.zpp_inner.wake();
			a.zpp_inner.weak ? (a.dispose(), !0) : !1;
			return this
		},
		toString: function() {
			return (this.zpp_inner.world ? "(space::world" : "(" + (2 == this.zpp_inner.type ? "dynamic" : 1 == this.zpp_inner.type ? "static" : "kinematic")) + ")#" + this.zpp_inner_i.id
		},
		__class__: ec
	});
	var Mb = function() {
		this.zpp_next = null;
		this.zpp_critical = !1;
		this.zpp_i = 0;
		this.zpp_inner = null
	};
	Mb.__name__ = !0;
	Mb.get = function(a) {
		if (null == Mb.zpp_pool) {
			var b = new Mb;
			Nb.internal = !1
		} else b = Mb.zpp_pool, Mb.zpp_pool = b.zpp_next;
		b.zpp_i = 0;
		b.zpp_inner = a;
		b.zpp_critical = !1;
		return b
	};
	Mb.prototype = {
		hasNext: function() {
			this.zpp_inner.zpp_inner.valmod();
			var a = this.zpp_inner.get_length();
			this.zpp_critical = !0;
			if (this.zpp_i < a) return !0;
			this.zpp_next = Mb.zpp_pool;
			Mb.zpp_pool = this;
			this.zpp_inner = null;
			return !1
		},
		next: function() {
			this.zpp_critical = !1;
			return this.zpp_inner.at(this.zpp_i++)
		},
		__class__: Mb
	};
	var Md = function() {
		this.zpp_inner = new Nb;
		this.zpp_inner.outer = this
	};
	Md.__name__ = !0;
	Md.prototype = {
		get_length: function() {
			this.zpp_inner.valmod();
			this.zpp_inner.zip_length && (this.zpp_inner.zip_length = !1, this.zpp_inner.user_length = this.zpp_inner.inner.length);
			return this.zpp_inner.user_length
		},
		at: function(a) {
			this.zpp_inner.valmod();
			this.zpp_inner.reverse_flag && (a = this.get_length() - 1 - a);
			if (a < this.zpp_inner.at_index || null == this.zpp_inner.at_ite) this.zpp_inner.at_index = a, this.zpp_inner.at_ite = this.zpp_inner.inner.iterator_at(a);
			else
				for (; this.zpp_inner.at_index != a;) this.zpp_inner.at_index++, this.zpp_inner.at_ite = this.zpp_inner.at_ite.next;
			return this.zpp_inner.at_ite.elt.outer
		},
		push: function(a) {
			this.zpp_inner.modify_test();
			this.zpp_inner.valmod();
			var b;
			if (b = null != this.zpp_inner.adder ? this.zpp_inner.adder(a) :
				!0) this.zpp_inner.reverse_flag ? this.zpp_inner.inner.add(a.zpp_inner) : (null == this.zpp_inner.push_ite && (this.zpp_inner.push_ite = null == this.zpp_inner.inner.head ? null : this.zpp_inner.inner.iterator_at(this.get_length() - 1)), this.zpp_inner.push_ite = this.zpp_inner.inner.insert(this.zpp_inner.push_ite, a.zpp_inner)), this.zpp_inner.invalidate(), null != this.zpp_inner.post_adder && this.zpp_inner.post_adder(a);
			return b
		},
		unshift: function(a) {
			this.zpp_inner.modify_test();
			this.zpp_inner.valmod();
			var b;
			if (b = null != this.zpp_inner.adder ?
				this.zpp_inner.adder(a) : !0) this.zpp_inner.reverse_flag ? (null == this.zpp_inner.push_ite && (this.zpp_inner.push_ite = null == this.zpp_inner.inner.head ? null : this.zpp_inner.inner.iterator_at(this.get_length() - 1)), this.zpp_inner.push_ite = this.zpp_inner.inner.insert(this.zpp_inner.push_ite, a.zpp_inner)) : this.zpp_inner.inner.add(a.zpp_inner), this.zpp_inner.invalidate(), null != this.zpp_inner.post_adder && this.zpp_inner.post_adder(a);
			return b
		},
		add: function(a) {
			return this.zpp_inner.reverse_flag ? this.push(a) : this.unshift(a)
		},
		remove: function(a) {
			this.zpp_inner.modify_test();
			this.zpp_inner.valmod();
			var b = !1;
			for (var c = this.zpp_inner.inner.head; null != c;) {
				if (c.elt == a.zpp_inner) {
					b = !0;
					break
				}
				c = c.next
			}
			b && (null != this.zpp_inner.subber && this.zpp_inner.subber(a), this.zpp_inner.dontremove || this.zpp_inner.inner.remove(a.zpp_inner), this.zpp_inner.invalidate());
			return b
		},
		toString: function() {
			var a = "[",
				b = !0,
				c;
			this.zpp_inner.valmod();
			for (c = Mb.get(this); c.hasNext();) {
				c.zpp_critical = !1;
				var d = c.zpp_inner.at(c.zpp_i++);
				b || (a += ",");
				a = null == d ?
					a + "NULL" : a + d.toString();
				b = !1
			}
			return a + "]"
		},
		__class__: Md
	};
	var X = function() {};
	X.__name__ = !0;
	X.prototype = {
		toString: function() {
			null == g.BodyType_STATIC && (g.BodyType_STATIC = new X, g.internal = !1);
			if (this == g.BodyType_STATIC) var a = "STATIC";
			else null == g.BodyType_DYNAMIC && (g.BodyType_DYNAMIC = new X, g.internal = !1), this == g.BodyType_DYNAMIC ? a = "DYNAMIC" : (null == g.BodyType_KINEMATIC && (g.BodyType_KINEMATIC = new X, g.internal = !1), a = this == g.BodyType_KINEMATIC ? "KINEMATIC" : "");
			return a
		},
		__class__: X
	};
	var Nd = function() {
		this.zpp_inner =
			null
	};
	Nd.__name__ = !0;
	Nd.__super__ = Lb;
	Nd.prototype = r(Lb.prototype, {
		toString: function() {
			return "Compound" + this.zpp_inner_i.id
		},
		__class__: Nd
	});
	var nb = function() {
		this.zpp_next = null;
		this.zpp_critical = !1;
		this.zpp_i = 0;
		this.zpp_inner = null
	};
	nb.__name__ = !0;
	nb.get = function(a) {
		if (null == nb.zpp_pool) {
			var b = new nb;
			Xb.internal = !1
		} else b = nb.zpp_pool, nb.zpp_pool = b.zpp_next;
		b.zpp_i = 0;
		b.zpp_inner = a;
		b.zpp_critical = !1;
		return b
	};
	nb.prototype = {
		hasNext: function() {
			this.zpp_inner.zpp_inner.valmod();
			var a = this.zpp_inner.get_length();
			this.zpp_critical = !0;
			if (this.zpp_i < a) return !0;
			this.zpp_next = nb.zpp_pool;
			nb.zpp_pool = this;
			this.zpp_inner = null;
			return !1
		},
		next: function() {
			this.zpp_critical = !1;
			return this.zpp_inner.at(this.zpp_i++)
		},
		__class__: nb
	};
	var Od = function() {
		this.zpp_inner = new Xb;
		this.zpp_inner.outer = this
	};
	Od.__name__ = !0;
	Od.prototype = {
		get_length: function() {
			this.zpp_inner.valmod();
			this.zpp_inner.zip_length && (this.zpp_inner.zip_length = !1, this.zpp_inner.user_length = this.zpp_inner.inner.length);
			return this.zpp_inner.user_length
		},
		at: function(a) {
			this.zpp_inner.valmod();
			this.zpp_inner.reverse_flag && (a = this.get_length() - 1 - a);
			if (a < this.zpp_inner.at_index || null == this.zpp_inner.at_ite) this.zpp_inner.at_index = a, this.zpp_inner.at_ite = this.zpp_inner.inner.iterator_at(a);
			else
				for (; this.zpp_inner.at_index != a;) this.zpp_inner.at_index++, this.zpp_inner.at_ite = this.zpp_inner.at_ite.next;
			return this.zpp_inner.at_ite.elt.outer
		},
		remove: function(a) {
			this.zpp_inner.modify_test();
			this.zpp_inner.valmod();
			var b = !1;
			for (var c = this.zpp_inner.inner.head; null != c;) {
				if (c.elt == a.zpp_inner) {
					b = !0;
					break
				}
				c = c.next
			}
			b && (null != this.zpp_inner.subber && this.zpp_inner.subber(a), this.zpp_inner.dontremove || this.zpp_inner.inner.remove(a.zpp_inner), this.zpp_inner.invalidate());
			return b
		},
		toString: function() {
			var a = "[",
				b = !0,
				c;
			this.zpp_inner.valmod();
			for (c = nb.get(this); c.hasNext();) {
				c.zpp_critical = !1;
				var d = c.zpp_inner.at(c.zpp_i++);
				b || (a += ",");
				a = null == d ? a + "NULL" : a + d.toString();
				b = !1
			}
			return a + "]"
		},
		__class__: Od
	};
	var Yb = function() {
		this.zpp_inner_i = this.zpp_inner = null
	};
	Yb.__name__ = !0;
	Yb.__super__ = Lb;
	Yb.prototype =
		r(Lb.prototype, {
			set_sensorEnabled: function(a) {
				this.zpp_inner.immutable_midstep("Shape::sensorEnabled");
				this.zpp_inner.sensorEnabled = a;
				this.zpp_inner.wake();
				return this.zpp_inner.sensorEnabled
			},
			toString: function() {
				return (0 == this.zpp_inner.type ? "Circle" : "Polygon") + "#" + this.zpp_inner_i.id
			},
			__class__: Yb
		});
	var Ub = function(a, b, c, d) {
		this.zpp_inner_zn = null;
		Yb.call(this);
		this.zpp_inner_zn = new fd;
		this.zpp_inner_zn.outer = this;
		this.zpp_inner_zn.outer_zn = this;
		this.zpp_inner_i = this.zpp_inner = this.zpp_inner_zn;
		this.zpp_inner_i.outer_i = this;
		this.zpp_inner.immutable_midstep("Circle::radius");
		a != this.zpp_inner_zn.radius && (this.zpp_inner_zn.radius = a, this.zpp_inner_zn.invalidate_radius());
		this.zpp_inner_zn.radius;
		null == b ? (this.zpp_inner.localCOMx = 0, this.zpp_inner.localCOMy = 0) : (b.zpp_inner.validate(), this.zpp_inner.localCOMx = b.zpp_inner.x, b.zpp_inner.validate(), this.zpp_inner.localCOMy = b.zpp_inner.y, b.zpp_inner.weak ? (b.dispose(), !0) : !1);
		null == c ? (null == H.zpp_pool ? this.zpp_inner.material = new H : (this.zpp_inner.material =
			H.zpp_pool, H.zpp_pool = this.zpp_inner.material.next, this.zpp_inner.material.next = null), null) : (this.zpp_inner.immutable_midstep("Shape::material"), this.zpp_inner.setMaterial(c.zpp_inner), this.zpp_inner.material.wrapper());
		null == d ? (null == Za.zpp_pool ? this.zpp_inner.filter = new Za : (this.zpp_inner.filter = Za.zpp_pool, Za.zpp_pool = this.zpp_inner.filter.next, this.zpp_inner.filter.next = null), null) : (this.zpp_inner.immutable_midstep("Shape::filter"), this.zpp_inner.setFilter(d.zpp_inner), this.zpp_inner.filter.wrapper());
		this.zpp_inner_i.insert_cbtype(P.ANY_SHAPE.zpp_inner)
	};
	Ub.__name__ = !0;
	Ub.__super__ = Yb;
	Ub.prototype = r(Yb.prototype, {
		__class__: Ub
	});
	var be = function() {
		this.zpp_inner = null
	};
	be.__name__ = !0;
	be.prototype = {
		toString: function() {
			if (null == this.zpp_inner.polygon) return "Edge(object-pooled)";
			if (null == this.zpp_inner.polygon.body) return this.zpp_inner.polygon.validate_laxi(), "{ localNormal : " + ("{ x: " + this.zpp_inner.lnormx + " y: " + this.zpp_inner.lnormy + " }") + " }";
			this.zpp_inner.polygon.validate_gaxi();
			return "{ localNormal : " +
				("{ x: " + this.zpp_inner.lnormx + " y: " + this.zpp_inner.lnormy + " }") + " worldNormal : " + ("{ x: " + this.zpp_inner.gnormx + " y: " + this.zpp_inner.gnormy + " }") + " }"
		},
		__class__: be
	};
	var Qa = function(a, b, c) {
		this.zpp_inner_zn = null;
		Yb.call(this);
		this.zpp_inner_zn = new ud;
		this.zpp_inner_zn.outer = this;
		this.zpp_inner_zn.outer_zn = this;
		this.zpp_inner_i = this.zpp_inner = this.zpp_inner_zn;
		this.zpp_inner_i.outer_i = this;
		if (a instanceof Array && null == a.__enum__)
			for (var d = 0; d < a.length;) {
				var e = a[d];
				++d;
				var f = e;
				null == this.zpp_inner_zn.wrap_lverts &&
					this.zpp_inner_zn.getlverts();
				this.zpp_inner_zn.wrap_lverts.push(D.get(function(a) {
					f.zpp_inner.validate();
					return f.zpp_inner.x
				}(this), function(a) {
					f.zpp_inner.validate();
					return f.zpp_inner.y
				}(this), !1))
			} else if (F.__instanceof(a, $a))
				for (d = a.iterator(); d.hasNext();) {
					d.zpp_critical = !1;
					var h = d.zpp_inner.at(d.zpp_i++);
					null == this.zpp_inner_zn.wrap_lverts && this.zpp_inner_zn.getlverts();
					this.zpp_inner_zn.wrap_lverts.push(D.get(function(a) {
						h.zpp_inner.validate();
						return h.zpp_inner.x
					}(this), function(a) {
						h.zpp_inner.validate();
						return h.zpp_inner.y
					}(this), !1))
				} else if (F.__instanceof(a, dd) && (d = a.zpp_inner.vertices, null != d)) {
					e = d;
					do {
						var m = D.get(e.x, e.y, null);
						e = e.next;
						null == this.zpp_inner_zn.wrap_lverts && this.zpp_inner_zn.getlverts();
						this.zpp_inner_zn.wrap_lverts.push(D.get(function(a) {
							m.zpp_inner.validate();
							return m.zpp_inner.x
						}(this), function(a) {
							m.zpp_inner.validate();
							return m.zpp_inner.y
						}(this), !1));
						m.dispose()
					} while (e != d)
				}
		if (a instanceof Array && null == a.__enum__)
			for (d = 0; d < a.length;) {
				e = a[d];
				var k;
				if (k = e.zpp_inner.weak) e.dispose(),
					k = !0;
				k ? a.splice(d, 1) : d++
			} else if (F.__instanceof(a, $a))
				for (null != a.zpp_inner._validate && a.zpp_inner._validate(), a = a.zpp_inner.inner, d = null, e = a.head; null != e;) k = e.elt, k.outer.zpp_inner.weak ? (e = a.erase(d), k.outer.zpp_inner.weak ? (k.outer.dispose(), !0) : !1) : (d = e, e = e.next);
		null == b ? (null == H.zpp_pool ? this.zpp_inner.material = new H : (this.zpp_inner.material = H.zpp_pool, H.zpp_pool = this.zpp_inner.material.next, this.zpp_inner.material.next = null), null) : (this.zpp_inner.immutable_midstep("Shape::material"), this.zpp_inner.setMaterial(b.zpp_inner),
			this.zpp_inner.material.wrapper());
		null == c ? (null == Za.zpp_pool ? this.zpp_inner.filter = new Za : (this.zpp_inner.filter = Za.zpp_pool, Za.zpp_pool = this.zpp_inner.filter.next, this.zpp_inner.filter.next = null), null) : (this.zpp_inner.immutable_midstep("Shape::filter"), this.zpp_inner.setFilter(c.zpp_inner), this.zpp_inner.filter.wrapper());
		this.zpp_inner_i.insert_cbtype(P.ANY_SHAPE.zpp_inner)
	};
	Qa.__name__ = !0;
	Qa.rect = function(a, b, c, d, e) {
		null == e && (e = !1);
		return [D.get(a, b, e), D.get(a + c, b, e), D.get(a + c, b + d, e), D.get(a, b +
			d, e)]
	};
	Qa.box = function(a, b, c) {
		null == c && (c = !1);
		return Qa.rect(-a / 2, -b / 2, a, b, c)
	};
	Qa.__super__ = Yb;
	Qa.prototype = r(Yb.prototype, {
		__class__: Qa
	});
	var Ob = function() {
		this.zpp_next = null;
		this.zpp_critical = !1;
		this.zpp_i = 0;
		this.zpp_inner = null
	};
	Ob.__name__ = !0;
	Ob.get = function(a) {
		if (null == Ob.zpp_pool) {
			var b = new Ob;
			Zb.internal = !1
		} else b = Ob.zpp_pool, Ob.zpp_pool = b.zpp_next;
		b.zpp_i = 0;
		b.zpp_inner = a;
		b.zpp_critical = !1;
		return b
	};
	Ob.prototype = {
		hasNext: function() {
			this.zpp_inner.zpp_inner.valmod();
			var a = this.zpp_inner.get_length();
			this.zpp_critical = !0;
			if (this.zpp_i < a) return !0;
			this.zpp_next = Ob.zpp_pool;
			Ob.zpp_pool = this;
			this.zpp_inner = null;
			return !1
		},
		next: function() {
			this.zpp_critical = !1;
			return this.zpp_inner.at(this.zpp_i++)
		},
		__class__: Ob
	};
	var vd = function() {
		this.zpp_inner = new Zb;
		this.zpp_inner.outer = this
	};
	vd.__name__ = !0;
	vd.prototype = {
		get_length: function() {
			this.zpp_inner.valmod();
			this.zpp_inner.zip_length && (this.zpp_inner.zip_length = !1, this.zpp_inner.user_length = this.zpp_inner.inner.length);
			return this.zpp_inner.user_length
		},
		at: function(a) {
			this.zpp_inner.valmod();
			this.zpp_inner.reverse_flag && (a = this.get_length() - 1 - a);
			if (a < this.zpp_inner.at_index || null == this.zpp_inner.at_ite) this.zpp_inner.at_index = a, this.zpp_inner.at_ite = this.zpp_inner.inner.iterator_at(a);
			else
				for (; this.zpp_inner.at_index != a;) this.zpp_inner.at_index++, this.zpp_inner.at_ite = this.zpp_inner.at_ite.next;
			return this.zpp_inner.at_ite.elt.outer
		},
		push: function(a) {
			this.zpp_inner.modify_test();
			this.zpp_inner.valmod();
			var b;
			if (b = null != this.zpp_inner.adder ? this.zpp_inner.adder(a) : !0) this.zpp_inner.reverse_flag ?
				this.zpp_inner.inner.add(a.zpp_inner) : (null == this.zpp_inner.push_ite && (this.zpp_inner.push_ite = null == this.zpp_inner.inner.head ? null : this.zpp_inner.inner.iterator_at(this.get_length() - 1)), this.zpp_inner.push_ite = this.zpp_inner.inner.insert(this.zpp_inner.push_ite, a.zpp_inner)), this.zpp_inner.invalidate(), null != this.zpp_inner.post_adder && this.zpp_inner.post_adder(a);
			return b
		},
		unshift: function(a) {
			this.zpp_inner.modify_test();
			this.zpp_inner.valmod();
			var b;
			if (b = null != this.zpp_inner.adder ? this.zpp_inner.adder(a) :
				!0) this.zpp_inner.reverse_flag ? (null == this.zpp_inner.push_ite && (this.zpp_inner.push_ite = null == this.zpp_inner.inner.head ? null : this.zpp_inner.inner.iterator_at(this.get_length() - 1)), this.zpp_inner.push_ite = this.zpp_inner.inner.insert(this.zpp_inner.push_ite, a.zpp_inner)) : this.zpp_inner.inner.add(a.zpp_inner), this.zpp_inner.invalidate(), null != this.zpp_inner.post_adder && this.zpp_inner.post_adder(a);
			return b
		},
		add: function(a) {
			return this.zpp_inner.reverse_flag ? this.push(a) : this.unshift(a)
		},
		remove: function(a) {
			this.zpp_inner.modify_test();
			this.zpp_inner.valmod();
			var b = !1;
			for (var c = this.zpp_inner.inner.head; null != c;) {
				if (c.elt == a.zpp_inner) {
					b = !0;
					break
				}
				c = c.next
			}
			b && (null != this.zpp_inner.subber && this.zpp_inner.subber(a), this.zpp_inner.dontremove || this.zpp_inner.inner.remove(a.zpp_inner), this.zpp_inner.invalidate());
			return b
		},
		toString: function() {
			var a = "[",
				b = !0,
				c;
			this.zpp_inner.valmod();
			for (c = Ob.get(this); c.hasNext();) {
				c.zpp_critical = !1;
				var d = c.zpp_inner.at(c.zpp_i++);
				b || (a += ",");
				a = null == d ? a + "NULL" : a + d.toString();
				b = !1
			}
			return a + "]"
		},
		__class__: vd
	};
	var ic = function() {};
	ic.__name__ = !0;
	ic.prototype = {
		toString: function() {
			null == g.Broadphase_DYNAMIC_AABB_TREE && (g.Broadphase_DYNAMIC_AABB_TREE = new ic, g.internal = !1);
			if (this == g.Broadphase_DYNAMIC_AABB_TREE) var a = "DYNAMIC_AABB_TREE";
			else null == g.Broadphase_SWEEP_AND_PRUNE && (g.Broadphase_SWEEP_AND_PRUNE = new ic, g.internal = !1), a = this == g.Broadphase_SWEEP_AND_PRUNE ? "SWEEP_AND_PRUNE" : "";
			return a
		},
		__class__: ic
	};
	var Wc = function(a, b) {
		this.zpp_inner = null;
		this.zpp_inner = new Pd(null == a ? null : a.zpp_inner, b);
		this.zpp_inner.outer =
			this;
		null != a && (a.zpp_inner.weak ? (a.dispose(), !0) : !1)
	};
	Wc.__name__ = !0;
	Wc.prototype = {
		set_worldAngularDrag: function(a) {
			this.zpp_inner.global_ang_drag = a;
			return this.zpp_inner.global_ang_drag
		},
		set_worldLinearDrag: function(a) {
			this.zpp_inner.global_lin_drag = a;
			return this.zpp_inner.global_lin_drag
		},
		clear: function() {
			this.zpp_inner.clear()
		},
		step: function(a, b, c) {
			null == c && (c = 10);
			null == b && (b = 10);
			this.zpp_inner.step(a, b, c)
		},
		__class__: Wc
	};
	var kb = function() {
		this.body = this.constraint = null;
		this.pre_swapped = !1;
		this.int1 =
			this.int2 = this.set = this.wrap_arbiters = this.pre_arbiter = null;
		this.length = 0;
		this.listener = this.next = this.prev = null;
		this.event = 0;
		this.outer_body = this.outer_con = this.outer_int = null;
		this.length = 0
	};
	kb.__name__ = !0;
	kb.prototype = {
		wrapper_body: function() {
			null == this.outer_body && (this.outer_body = new Jc, this.outer_body.zpp_inner = this);
			return this.outer_body
		},
		wrapper_con: function() {
			null == this.outer_con && (this.outer_con = new Lc, this.outer_con.zpp_inner = this);
			return this.outer_con
		},
		wrapper_int: function() {
			null == this.outer_int &&
				(this.outer_int = new Mc, this.outer_int.zpp_inner = this);
			null == this.wrap_arbiters ? this.wrap_arbiters = Wb.get(this.set.arbiters, !0) : this.wrap_arbiters.zpp_inner.inner = this.set.arbiters;
			this.wrap_arbiters.zpp_inner.zip_length = !0;
			this.wrap_arbiters.zpp_inner.at_ite = null;
			return this.outer_int
		},
		push: function(a) {
			null != this.prev ? this.prev.next = a : this.next = a;
			a.prev = this.prev;
			a.next = null;
			this.prev = a;
			this.length++
		},
		pop: function() {
			var a = this.next;
			this.next = a.next;
			null == this.next ? this.prev = null : this.next.prev = null;
			this.length--;
			return a
		},
		empty: function() {
			return null == this.next
		},
		__class__: kb
	};
	var U = function() {
		this.interactors = this.constraints = null;
		this.zip_conlisteners = !1;
		this.conlisteners = null;
		this.zip_bodylisteners = !1;
		this.bodylisteners = null;
		this.zip_listeners = !1;
		this.manager = this.cbpairs = this.listeners = null;
		this.id = 0;
		this.next = null;
		this.count = 0;
		this.cbTypes = new Aa;
		this.listeners = new dc;
		this.zip_listeners = !0;
		this.bodylisteners = new Dc;
		this.zip_bodylisteners = !0;
		this.conlisteners = new qc;
		this.zip_conlisteners = !0;
		this.constraints = new Cb;
		this.interactors = new Db;
		this.id = M.CbSet();
		this.cbpairs = new Qd
	};
	U.__name__ = !0;
	U.setlt = function(a, b) {
		a = a.cbTypes.head;
		for (b = b.cbTypes.head; null != a && null != b;) {
			var c = a.elt,
				d = b.elt;
			if (c.id < d.id) return !0;
			if (d.id < c.id) return !1;
			a = a.next;
			b = b.next
		}
		return null != b && null == a
	};
	U.get = function(a) {
		if (null == U.zpp_pool) var b = new U;
		else b = U.zpp_pool, U.zpp_pool = b.next, b.next = null;
		null;
		var c = null;
		for (a = a.head; null != a;) {
			var d = a.elt;
			c = b.cbTypes.insert(c, d);
			d.cbsets.add(b);
			a = a.next
		}
		return b
	};
	U.single_intersection =
		function(a, b, c) {
			return a.manager.pair(a, b).single_intersection(c)
		};
	U.find_all = function(a, b, c, d) {
		a.manager.pair(a, b).forall(c, d)
	};
	U.prototype = {
		invalidate_pairs: function() {
			for (var a = this.cbpairs.head; null != a;) a.elt.zip_listeners = !0, a = a.next
		},
		realvalidate_listeners: function() {
			this.listeners.clear();
			for (var a = this.cbTypes.head; null != a;) {
				for (var b = null, c = this.listeners.head, d = a.elt.listeners.head; null != d;) {
					var e = d.elt;
					null != c && c.elt == e ? (d = d.next, b = c, c = c.next) : null == c || ab.setlt(e, c.elt) ? (e.space == this.manager.space &&
						(b = this.listeners.inlined_insert(b, e)), d = d.next) : (b = c, c = c.next)
				}
				a = a.next
			}
		},
		realvalidate_bodylisteners: function() {
			this.bodylisteners.clear();
			for (var a = this.cbTypes.head; null != a;) {
				for (var b = null, c = this.bodylisteners.head, d = a.elt.bodylisteners.head; null != d;) {
					var e = d.elt;
					null != c && c.elt == e ? (d = d.next, b = c, c = c.next) : null == c || ab.setlt(e, c.elt) ? (e.options.excluded(this.cbTypes) || e.space != this.manager.space || (b = this.bodylisteners.inlined_insert(b, e)), d = d.next) : (b = c, c = c.next)
				}
				a = a.next
			}
		},
		realvalidate_conlisteners: function() {
			this.conlisteners.clear();
			for (var a = this.cbTypes.head; null != a;) {
				for (var b = null, c = this.conlisteners.head, d = a.elt.conlisteners.head; null != d;) {
					var e = d.elt;
					null != c && c.elt == e ? (d = d.next, b = c, c = c.next) : null == c || ab.setlt(e, c.elt) ? (e.options.excluded(this.cbTypes) || e.space != this.manager.space || (b = this.conlisteners.inlined_insert(b, e)), d = d.next) : (b = c, c = c.next)
				}
				a = a.next
			}
		},
		validate: function() {
			this.zip_listeners && (this.zip_listeners = !1, this.realvalidate_listeners());
			this.zip_bodylisteners && (this.zip_bodylisteners = !1, this.realvalidate_bodylisteners());
			this.zip_conlisteners && (this.zip_conlisteners = !1, this.realvalidate_conlisteners())
		},
		free: function() {
			this.listeners.clear();
			this.zip_listeners = !0;
			this.bodylisteners.clear();
			this.zip_bodylisteners = !0;
			this.conlisteners.clear();
			for (this.zip_conlisteners = !0; null != this.cbTypes.head;) this.cbTypes.pop_unsafe().cbsets.remove(this)
		},
		__class__: U
	};
	var ta = function() {
		this.listeners = null;
		this.zip_listeners = !1;
		this.a = this.b = this.next = null;
		this.listeners = new dc
	};
	ta.__name__ = !0;
	ta.get = function(a, b) {
		if (null == ta.zpp_pool) var c =
			new ta;
		else c = ta.zpp_pool, ta.zpp_pool = c.next, c.next = null;
		c.zip_listeners = !0;
		U.setlt(a, b) ? (c.a = a, c.b = b) : (c.a = b, c.b = a);
		return c
	};
	ta.setlt = function(a, b) {
		return U.setlt(a.a, b.a) || a.a == b.a && U.setlt(a.b, b.b)
	};
	ta.prototype = {
		__validate: function() {
			this.listeners.clear();
			for (var a = this.a.listeners.head, b = this.b.listeners.head; null != a && null != b;) {
				var c = a.elt,
					d = b.elt;
				c == d ? ((c.options1.compatible(this.a.cbTypes) && c.options2.compatible(this.b.cbTypes) || c.options2.compatible(this.a.cbTypes) && c.options1.compatible(this.b.cbTypes)) &&
					this.listeners.add(c), a = a.next, b = b.next) : c.precedence > d.precedence || c.precedence == d.precedence && c.id > d.id ? a = a.next : b = b.next
			}
		},
		empty_intersection: function() {
			return null == this.listeners.head
		},
		single_intersection: function(a) {
			var b = this.listeners.head;
			return null != b && b.elt == a && null == b.next
		},
		forall: function(a, b) {
			for (var c = this.listeners.head; null != c;) {
				var d = c.elt;
				d.event == a && b(d);
				c = c.next
			}
		},
		__class__: ta
	};
	var g = function() {};
	g.__name__ = !0;
	var ab = function() {
		this.body = this.constraint = this.interaction = this.space =
			null;
		this.id = this.type = this.event = this.precedence = 0;
		this.outer = null;
		this.id = M.Listener()
	};
	ab.__name__ = !0;
	ab.setlt = function(a, b) {
		return a.precedence > b.precedence || a.precedence == b.precedence && a.id > b.id
	};
	ab.prototype = {
		addedToSpace: function() {},
		removedFromSpace: function() {},
		__class__: ab
	};
	var gd = function() {
		this.outer_zn = this.options = this.handler = null
	};
	gd.__name__ = !0;
	gd.__super__ = ab;
	gd.prototype = r(ab.prototype, {
		addedToSpace: function() {
			this.options.handler = v(this, this.cbtype_change);
			for (var a = this.options.includes.head; null !=
				a;) a.elt.addbody(this), a = a.next
		},
		removedFromSpace: function() {
			for (var a = this.options.includes.head; null != a;) {
				var b = a.elt;
				b.bodylisteners.remove(this);
				b.invalidatebody();
				a = a.next
			}
			this.options.handler = null
		},
		cbtype_change: function(a, b, c) {
			this.removedFromSpace();
			this.options.effect_change(a, b, c);
			this.addedToSpace()
		},
		__class__: gd
	});
	var Rd = function() {
		this.outer_zn = this.options = this.handler = null
	};
	Rd.__name__ = !0;
	Rd.__super__ = ab;
	Rd.prototype = r(ab.prototype, {
		addedToSpace: function() {
			this.options.handler = v(this,
				this.cbtype_change);
			for (var a = this.options.includes.head; null != a;) a.elt.addconstraint(this), a = a.next
		},
		removedFromSpace: function() {
			for (var a = this.options.includes.head; null != a;) {
				var b = a.elt;
				b.conlisteners.remove(this);
				b.invalidateconstraint();
				a = a.next
			}
			this.options.handler = null
		},
		cbtype_change: function(a, b, c) {
			this.removedFromSpace();
			this.options.effect_change(a, b, c);
			this.addedToSpace()
		},
		__class__: Rd
	});
	var Aa = function() {
		this.length = 0;
		this.modified = this.pushmod = !1;
		this.head = null
	};
	Aa.__name__ = !0;
	Aa.prototype = {
		add: function(a) {
			return this.inlined_add(a)
		},
		inlined_add: function(a) {
			if (null == Ea.zpp_pool) var b = new Ea;
			else b = Ea.zpp_pool, Ea.zpp_pool = b.next, b.next = null;
			null;
			b.elt = a;
			b.next = this.head;
			this.head = b;
			this.modified = !0;
			this.length++;
			return a
		},
		insert: function(a, b) {
			return this.inlined_insert(a, b)
		},
		inlined_insert: function(a, b) {
			if (null == Ea.zpp_pool) var c = new Ea;
			else c = Ea.zpp_pool, Ea.zpp_pool = c.next, c.next = null;
			null;
			c.elt = b;
			b = c;
			null == a ? (b.next = this.head, this.head = b) : (b.next = a.next, a.next = b);
			this.pushmod = this.modified = !0;
			this.length++;
			return b
		},
		pop: function() {
			this.inlined_pop()
		},
		inlined_pop: function() {
			var a = this.head;
			this.head = a.next;
			a.elt = null;
			a.next = Ea.zpp_pool;
			Ea.zpp_pool = a;
			null == this.head && (this.pushmod = !0);
			this.modified = !0;
			this.length--
		},
		pop_unsafe: function() {
			return this.inlined_pop_unsafe()
		},
		inlined_pop_unsafe: function() {
			var a = this.head.elt;
			this.pop();
			return a
		},
		remove: function(a) {
			this.inlined_try_remove(a)
		},
		inlined_try_remove: function(a) {
			for (var b = null, c = this.head, d = !1; null != c;) {
				if (c.elt == a) {
					this.inlined_erase(b);
					d = !0;
					break
				}
				b = c;
				c = c.next
			}
			return d
		},
		inlined_erase: function(a) {
			var b;
			if (null == a) {
				var c = this.head;
				this.head = b = c.next;
				null == this.head && (this.pushmod = !0)
			} else c = a.next, b = c.next, a.next = b, null == b && (this.pushmod = !0);
			a = c;
			a.elt = null;
			a.next = Ea.zpp_pool;
			Ea.zpp_pool = a;
			this.modified = !0;
			this.length--;
			this.pushmod = !0;
			return b
		},
		clear: function() {
			for (; null != this.head;) this.inlined_pop();
			this.pushmod = !0
		},
		has: function(a) {
			return this.inlined_has(a)
		},
		inlined_has: function(a) {
			var b = !1;
			for (var c = this.head; null != c;) {
				if (c.elt ==
					a) {
					b = !0;
					break
				}
				c = c.next
			}
			return b
		},
		iterator_at: function(a) {
			for (var b = this.head; 0 < a-- && null != b;) b = b.next;
			return b
		},
		__class__: Aa
	};
	var Da = function(a, b, c, d) {
		this.handlerp = null;
		this.allowSleepingCallbacks = this.pure = !1;
		this.options1 = this.options2 = this.handleri = null;
		this.itype = 0;
		this.outer_zni = this.outer_znp = null;
		ab.call(this);
		this.type = d;
		this.interaction = this;
		this.event = c;
		this.options1 = a.zpp_inner;
		this.options2 = b.zpp_inner;
		this.allowSleepingCallbacks = !1
	};
	Da.__name__ = !0;
	Da.__super__ = ab;
	Da.prototype = r(ab.prototype, {
		CbSetset: function(a, b, c) {
			var d = Da.UCbSet,
				e = Da.VCbSet,
				f = Da.WCbSet;
			a = a.head;
			for (var h = b.head; null != a && null != h;) {
				var m = a.elt,
					k = h.elt;
				m == k ? (f.inlined_add(m), a = a.next, h = h.next) : U.setlt(m, k) ? (d.inlined_add(m), a = a.next) : (e.inlined_add(k), h = h.next)
			}
			for (; null != a;) d.inlined_add(a.elt), a = a.next;
			for (; null != h;) e.inlined_add(h.elt), h = h.next;
			for (; null != d.head;)
				for (a = d.pop_unsafe(), h = b.head; null != h;) c(a, h.elt), h = h.next;
			for (; null != e.head;)
				for (b = e.pop_unsafe(), d = f.head; null != d;) c(b, d.elt), d = d.next;
			for (; null != f.head;)
				for (e =
					f.pop_unsafe(), c(e, e), b = f.head; null != b;) c(e, b.elt), b = b.next
		},
		CbTypeset: function(a, b, c) {
			var d = Da.UCbType,
				e = Da.VCbType,
				f = Da.WCbType;
			a = a.head;
			for (var h = b.head; null != a && null != h;) {
				var m = a.elt,
					k = h.elt;
				m == k ? (f.inlined_add(m), a = a.next, h = h.next) : m.id < k.id ? (d.inlined_add(m), a = a.next) : (e.inlined_add(k), h = h.next)
			}
			for (; null != a;) d.inlined_add(a.elt), a = a.next;
			for (; null != h;) e.inlined_add(h.elt), h = h.next;
			for (; null != d.head;)
				for (a = d.pop_unsafe(), h = b.head; null != h;) c(a, h.elt), h = h.next;
			for (; null != e.head;)
				for (b = e.pop_unsafe(),
					d = f.head; null != d;) c(b, d.elt), d = d.next;
			for (; null != f.head;)
				for (e = f.pop_unsafe(), c(e, e), b = f.head; null != b;) c(e, b.elt), b = b.next
		},
		with_uniquesets: function(a) {
			var b = this;
			if (null == Z.zpp_pool) var c = new Z;
			else c = Z.zpp_pool, Z.zpp_pool = c.next, c.next = null;
			null;
			c.lt = ta.setlt;
			this.CbTypeset(this.options1.includes, this.options2.includes, function(a, d) {
				b.CbSetset(a.cbsets, d.cbsets, function(a, d) {
					a.validate();
					d.validate();
					U.single_intersection(a, d, b) && c.try_insert(ta.get(a, d))
				})
			});
			c.clear_with(function(c) {
				a ? b.space.freshListenerType(c.a,
					c.b) : b.space.nullListenerType(c.a, c.b);
				c.a = c.b = null;
				c.listeners.clear();
				c.next = ta.zpp_pool;
				ta.zpp_pool = c
			});
			var d = c;
			d.data = null;
			d.lt = null;
			d.swapped = null;
			d.next = Z.zpp_pool;
			Z.zpp_pool = d
		},
		with_union: function(a) {
			for (var b = this.options1.includes.head, c = this.options2.includes.head; null != b && null != c;) {
				var d = b.elt,
					e = c.elt;
				d == e ? (a(d), b = b.next, c = c.next) : d.id < e.id ? (a(d), b = b.next) : (a(e), c = c.next)
			}
			for (; null != b;) a(b.elt), b = b.next;
			for (; null != c;) a(c.elt), c = c.next
		},
		addedToSpace: function() {
			var a = this,
				b = 3 == this.type;
			this.with_union(function(c) {
				c.addint(a);
				if (b)
					for (c = c.interactors.head; null != c;) c.elt.wake(), c = c.next
			});
			this.options1.handler = v(this, this.cbtype_change1);
			this.options2.handler = v(this, this.cbtype_change2);
			this.with_uniquesets(!0)
		},
		removedFromSpace: function() {
			var a = this;
			this.with_uniquesets(!1);
			var b = 3 == this.type;
			this.with_union(function(c) {
				c.listeners.remove(a);
				c.invalidateint();
				if (b)
					for (c = c.interactors.head; null != c;) c.elt.wake(), c = c.next
			});
			this.options1.handler = null;
			this.options2.handler = null
		},
		cbtype_change1: function(a,
			b, c) {
			this.cbtype_change(this.options1, a, b, c)
		},
		cbtype_change2: function(a, b, c) {
			this.cbtype_change(this.options2, a, b, c)
		},
		cbtype_change: function(a, b, c, d) {
			this.removedFromSpace();
			a.effect_change(b, c, d);
			this.addedToSpace();
			null
		},
		__class__: Da
	});
	var Nc = function() {
		this.outer = this.handler = this.includes = this.excludes = this.wrap_includes = this.wrap_excludes = null;
		this.includes = new Aa;
		this.excludes = new Aa
	};
	Nc.__name__ = !0;
	Nc.argument = function(a) {
		return null == a ? new ad : F.__instanceof(a, ad) ? a : (new ad).including(a)
	};
	Nc.prototype = {
		setup_includes: function() {
			this.wrap_includes = gc.get(this.includes, !0)
		},
		setup_excludes: function() {
			this.wrap_excludes = gc.get(this.excludes, !0)
		},
		excluded: function(a) {
			return this.nonemptyintersection(a, this.excludes)
		},
		compatible: function(a) {
			return this.nonemptyintersection(a, this.includes) && !this.nonemptyintersection(a, this.excludes)
		},
		nonemptyintersection: function(a, b) {
			var c = !1;
			a = a.head;
			for (b = b.head; null != b && null != a;) {
				var d = b.elt,
					e = a.elt;
				if (d == e) {
					c = !0;
					break
				} else d.id < e.id ? b = b.next : a = a.next
			}
			return c
		},
		effect_change: function(a, b, c) {
			if (b)
				if (c) {
					b = null;
					for (c = this.includes.head; null != c && !(a.id < c.elt.id);) b = c, c = c.next;
					this.includes.inlined_insert(b, a)
				} else this.includes.remove(a);
			else if (c) {
				b = null;
				for (c = this.excludes.head; null != c && !(a.id < c.elt.id);) b = c, c = c.next;
				this.excludes.inlined_insert(b, a)
			} else this.excludes.remove(a)
		},
		append_type: function(a, b) {
			a == this.includes ? this.includes.has(b) || (this.excludes.has(b) ? null != this.handler ? this.handler(b, !1, !1) : this.effect_change(b, !1, !1) : null != this.handler ? this.handler(b, !0, !0) : this.effect_change(b, !0, !0)) : this.excludes.has(b) || (this.includes.has(b) ? null != this.handler ? this.handler(b, !0, !1) : this.effect_change(b, !0, !1) : null != this.handler ? this.handler(b, !1, !0) : this.effect_change(b, !1, !0))
		},
		append: function(a, b) {
			if (F.__instanceof(b, Va)) this.append_type(a, b.zpp_inner);
			else if (F.__instanceof(b, Kc))
				for (b.zpp_inner.valmod(), b = Ja.get(b); b.hasNext();) {
					b.zpp_critical = !1;
					var c = b.zpp_inner.at(b.zpp_i++);
					this.append_type(a, c.zpp_inner)
				} else if (b instanceof Array && null == b.__enum__)
					for (c =
						0; c < b.length;) {
						var d = b[c];
						++c;
						this.append_type(a, d.zpp_inner)
					}
		},
		__class__: Nc
	};
	var hd = function() {
		this.pre_dt = 0;
		this.cbTypes = this.cbSet = null;
		this.ignore = this.__velocity = !1;
		this.component = null;
		this.breakUnderForce = this.breakUnderError = this.removeOnBreak = !1;
		this.frequency = this.damping = this.maxForce = this.maxError = 0;
		this.active = this.stiff = !1;
		this.compound = this.space = null;
		this.id = 0;
		this.outer = null;
		this.__velocity = !1;
		this.id = M.Constraint();
		this.active = this.stiff = !0;
		this.ignore = !1;
		this.frequency = 10;
		this.damping =
			1;
		this.maxError = this.maxForce = Infinity;
		this.breakUnderForce = !1;
		this.removeOnBreak = !0;
		this.pre_dt = -1;
		this.cbTypes = new Aa
	};
	hd.__name__ = !0;
	hd.prototype = {
		immutable_midstep: function(a) {},
		insert_cbtype: function(a) {
			if (!this.cbTypes.has(a)) {
				null != this.space && (this.dealloc_cbSet(), a.constraints.add(this));
				for (var b = null, c = this.cbTypes.head; null != c && !(a.id < c.elt.id);) b = c, c = c.next;
				this.cbTypes.inlined_insert(b, a);
				null != this.space && (this.alloc_cbSet(), this.wake())
			}
		},
		alloc_cbSet: function() {
			null != (this.cbSet = this.space.cbsets.get(this.cbTypes)) &&
				(this.cbSet.count++, this.cbSet.constraints.add(this))
		},
		dealloc_cbSet: function() {
			if (null != this.cbSet) {
				this.cbSet.constraints.remove(this);
				if (0 == --this.cbSet.count) {
					this.space.cbsets.remove(this.cbSet);
					var a = this.cbSet;
					a.free();
					a.next = U.zpp_pool;
					U.zpp_pool = a
				}
				this.cbSet = null
			}
		},
		activate: function() {
			null != this.space && this.activeInSpace()
		},
		deactivate: function() {
			null != this.space && this.inactiveOrOutSpace()
		},
		addedToSpace: function() {
			this.active && this.activeInSpace();
			this.activeBodies();
			for (var a = this.cbTypes.head; null !=
				a;) a.elt.constraints.add(this), a = a.next
		},
		removedFromSpace: function() {
			this.active && this.inactiveOrOutSpace();
			this.inactiveBodies();
			for (var a = this.cbTypes.head; null != a;) a.elt.constraints.remove(this), a = a.next
		},
		activeInSpace: function() {
			this.alloc_cbSet();
			null == Ra.zpp_pool ? this.component = new Ra : (this.component = Ra.zpp_pool, Ra.zpp_pool = this.component.next, this.component.next = null);
			null;
			this.component.isBody = !1;
			this.component.constraint = this
		},
		inactiveOrOutSpace: function() {
			this.dealloc_cbSet();
			var a = this.component;
			a.body = null;
			a.constraint = null;
			null;
			a.next = Ra.zpp_pool;
			Ra.zpp_pool = a;
			this.component = null
		},
		activeBodies: function() {},
		inactiveBodies: function() {},
		clearcache: function() {},
		wake_connected: function() {},
		forest: function() {},
		pair_exists: function(a, b) {
			return !1
		},
		broken: function() {},
		warmStart: function() {},
		preStep: function(a) {
			return !1
		},
		applyImpulseVel: function() {
			return !1
		},
		applyImpulsePos: function() {
			return !1
		},
		wake: function() {
			null != this.space && this.space.wake_constraint(this)
		},
		__class__: hd
	};
	var uc = function() {
		this.stepped = !1;
		this.kMassa = this.kMassb = this.kMassc = this.jAccx = this.jAccy = this.jMax = this.gamma = this.biasx = this.biasy = 0;
		this.wrap_a2 = null;
		this.a2localx = this.a2localy = this.a2relx = this.a2rely = 0;
		this.wrap_a1 = this.b2 = null;
		this.a1localx = this.a1localy = this.a1relx = this.a1rely = 0;
		this.outer_zn = this.b1 = null;
		hd.call(this);
		this.stepped = !1;
		this.jAccy = this.jAccx = 0;
		this.jMax = Infinity;
		this.a2rely = this.a2relx = this.a2localy = this.a2localx = this.a1rely = this.a1relx = this.a1localy = this.a1localx = 0
	};
	uc.__name__ = !0;
	uc.__super__ = hd;
	uc.prototype =
		r(hd.prototype, {
			activeBodies: function() {
				null != this.b1 && this.b1.constraints.add(this);
				this.b2 != this.b1 && null != this.b2 && this.b2.constraints.add(this)
			},
			inactiveBodies: function() {
				null != this.b1 && this.b1.constraints.remove(this);
				this.b2 != this.b1 && null != this.b2 && this.b2.constraints.remove(this)
			},
			validate_a1: function() {
				this.wrap_a1.zpp_inner.x = this.a1localx;
				this.wrap_a1.zpp_inner.y = this.a1localy
			},
			invalidate_a1: function(a) {
				this.immutable_midstep("Constraint::a1");
				this.a1localx = a.x;
				this.a1localy = a.y;
				this.wake()
			},
			setup_a1: function() {
				this.wrap_a1 = D.get(this.a1localx, this.a1localy, null);
				this.wrap_a1.zpp_inner._inuse = !0;
				this.wrap_a1.zpp_inner._validate = v(this, this.validate_a1);
				this.wrap_a1.zpp_inner._invalidate = v(this, this.invalidate_a1)
			},
			validate_a2: function() {
				this.wrap_a2.zpp_inner.x = this.a2localx;
				this.wrap_a2.zpp_inner.y = this.a2localy
			},
			invalidate_a2: function(a) {
				this.immutable_midstep("Constraint::a2");
				this.a2localx = a.x;
				this.a2localy = a.y;
				this.wake()
			},
			setup_a2: function() {
				this.wrap_a2 = D.get(this.a2localx, this.a2localy,
					null);
				this.wrap_a2.zpp_inner._inuse = !0;
				this.wrap_a2.zpp_inner._validate = v(this, this.validate_a2);
				this.wrap_a2.zpp_inner._invalidate = v(this, this.invalidate_a2)
			},
			wake_connected: function() {
				null != this.b1 && 2 == this.b1.type && this.b1.wake();
				null != this.b2 && 2 == this.b2.type && this.b2.wake()
			},
			forest: function() {
				if (2 == this.b1.type) {
					if (this.b1.component == this.b1.component.parent) var a = this.b1.component;
					else {
						a = this.b1.component;
						for (var b = null; a != a.parent;) {
							var c = a.parent;
							a.parent = b;
							b = a;
							a = c
						}
						for (; null != b;) c = b.parent,
							b.parent = a, b = c
					}
					if (this.component == this.component.parent) b = this.component;
					else {
						b = this.component;
						for (c = null; b != b.parent;) {
							var d = b.parent;
							b.parent = c;
							c = b;
							b = d
						}
						for (; null != c;) d = c.parent, c.parent = b, c = d
					}
					a != b && (a.rank < b.rank ? a.parent = b : a.rank > b.rank ? b.parent = a : (b.parent = a, a.rank++))
				}
				if (2 == this.b2.type) {
					if (this.b2.component == this.b2.component.parent) a = this.b2.component;
					else {
						a = this.b2.component;
						for (b = null; a != a.parent;) c = a.parent, a.parent = b, b = a, a = c;
						for (; null != b;) c = b.parent, b.parent = a, b = c
					}
					if (this.component == this.component.parent) b =
						this.component;
					else {
						b = this.component;
						for (c = null; b != b.parent;) d = b.parent, b.parent = c, c = b, b = d;
						for (; null != c;) d = c.parent, c.parent = b, c = d
					}
					a != b && (a.rank < b.rank ? a.parent = b : a.rank > b.rank ? b.parent = a : (b.parent = a, a.rank++))
				}
			},
			pair_exists: function(a, b) {
				return this.b1.id == a && this.b2.id == b || this.b1.id == b && this.b2.id == a
			},
			clearcache: function() {
				this.jAccy = this.jAccx = 0;
				this.pre_dt = -1
			},
			preStep: function(a) {
				-1 == this.pre_dt && (this.pre_dt = a);
				var b = a / this.pre_dt;
				this.pre_dt = a;
				this.stepped = !0;
				this.a1relx = this.b1.axisy * this.a1localx -
					this.b1.axisx * this.a1localy;
				this.a1rely = this.a1localx * this.b1.axisx + this.a1localy * this.b1.axisy;
				this.a2relx = this.b2.axisy * this.a2localx - this.b2.axisx * this.a2localy;
				this.a2rely = this.a2localx * this.b2.axisx + this.a2localy * this.b2.axisy;
				var c = this.b1.smass + this.b2.smass;
				this.kMassa = c;
				this.kMassb = 0;
				this.kMassc = c;
				if (0 != this.b1.sinertia) {
					c = this.a1relx * this.b1.sinertia;
					var d = this.a1rely * this.b1.sinertia;
					this.kMassa += d * this.a1rely;
					this.kMassb += -d * this.a1relx;
					this.kMassc += c * this.a1relx
				}
				0 != this.b2.sinertia &&
					(c = this.a2relx * this.b2.sinertia, d = this.a2rely * this.b2.sinertia, this.kMassa += d * this.a2rely, this.kMassb += -d * this.a2relx, this.kMassc += c * this.a2relx);
				c = this.kMassa * this.kMassc - this.kMassb * this.kMassb;
				c != c ? (this.kMassa = this.kMassb = this.kMassc = 0, c = 3) : 0 == c ? (c = 0, 0 != this.kMassa ? this.kMassa = 1 / this.kMassa : (this.kMassa = 0, c |= 1), 0 != this.kMassc ? this.kMassc = 1 / this.kMassc : (this.kMassc = 0, c |= 2), this.kMassb = 0) : (c = 1 / c, d = this.kMassc * c, this.kMassc = this.kMassa * c, this.kMassa = d, this.kMassb *= -c, c = 0);
				0 != (c & 1) && (this.jAccx = 0);
				0 != (c & 2) && (this.jAccy = 0);
				if (this.stiff) this.gamma = this.biasy = this.biasx = 0;
				else {
					d = 2 * Math.PI * this.frequency;
					this.gamma = 1 / (a * d * (2 * this.damping + d * a));
					c = 1 / (1 + this.gamma);
					d = a * d * d * this.gamma;
					this.gamma *= c;
					this.kMassa *= c;
					this.kMassb *= c;
					this.kMassc *= c;
					this.biasx = this.b2.posx + this.a2relx - (this.b1.posx + this.a1relx);
					this.biasy = this.b2.posy + this.a2rely - (this.b1.posy + this.a1rely);
					if (this.breakUnderError && this.biasx * this.biasx + this.biasy * this.biasy > this.maxError * this.maxError) return !0;
					c = -d;
					this.biasx *= c;
					this.biasy *=
						c;
					c = this.maxError;
					d = this.biasx * this.biasx + this.biasy * this.biasy;
					d > c * c && (c *= 1 / Math.sqrt(d), this.biasx *= c, this.biasy *= c)
				}
				this.jAccx *= b;
				this.jAccy *= b;
				this.jMax = this.maxForce * a;
				return !1
			},
			warmStart: function() {
				var a = this.b1.imass;
				this.b1.velx -= this.jAccx * a;
				this.b1.vely -= this.jAccy * a;
				a = this.b2.imass;
				this.b2.velx += this.jAccx * a;
				this.b2.vely += this.jAccy * a;
				this.b1.angvel -= (this.jAccy * this.a1relx - this.jAccx * this.a1rely) * this.b1.iinertia;
				this.b2.angvel += (this.jAccy * this.a2relx - this.jAccx * this.a2rely) * this.b2.iinertia
			},
			applyImpulseVel: function() {
				var a = this.b2.velx + this.b2.kinvelx - this.a2rely * (this.b2.angvel + this.b2.kinangvel) - (this.b1.velx + this.b1.kinvelx - this.a1rely * (this.b1.angvel + this.b1.kinangvel));
				var b = this.b2.vely + this.b2.kinvely + this.a2relx * (this.b2.angvel + this.b2.kinangvel) - (this.b1.vely + this.b1.kinvely + this.a1relx * (this.b1.angvel + this.b1.kinangvel));
				a = this.biasx - a;
				b = this.biasy - b;
				var c = this.kMassa * a + this.kMassb * b;
				b = this.kMassb * a + this.kMassc * b;
				var d = this.gamma;
				a = c - this.jAccx * d;
				b -= this.jAccy * d;
				c = this.jAccx;
				d = this.jAccy;
				this.jAccx += 1 * a;
				this.jAccy += 1 * b;
				if (this.breakUnderForce) {
					if (this.jAccx * this.jAccx + this.jAccy * this.jAccy > this.jMax * this.jMax) return !0
				} else this.stiff || (a = this.jMax, b = this.jAccx * this.jAccx + this.jAccy * this.jAccy, b > a * a && (a *= 1 / Math.sqrt(b), this.jAccx *= a, this.jAccy *= a));
				a = this.jAccx - c;
				b = this.jAccy - d;
				c = this.b1.imass;
				this.b1.velx -= a * c;
				this.b1.vely -= b * c;
				c = this.b2.imass;
				this.b2.velx += a * c;
				this.b2.vely += b * c;
				this.b1.angvel -= (b * this.a1relx - a * this.a1rely) * this.b1.iinertia;
				this.b2.angvel += (b * this.a2relx -
					a * this.a2rely) * this.b2.iinertia;
				return !1
			},
			applyImpulsePos: function() {
				var a = this.b1.axisy * this.a1localx - this.b1.axisx * this.a1localy;
				var b = this.a1localx * this.b1.axisx + this.a1localy * this.b1.axisy;
				var c = this.b2.axisy * this.a2localx - this.b2.axisx * this.a2localy;
				var d = this.a2localx * this.b2.axisx + this.a2localy * this.b2.axisy;
				var e = this.b2.posx + c - (this.b1.posx + a);
				var f = this.b2.posy + d - (this.b1.posy + b);
				if (this.breakUnderError && e * e + f * f > this.maxError * this.maxError) return !0;
				if (e * e + f * f < n.constraintLinearSlop * n.constraintLinearSlop) return !1;
				e *= .5;
				f *= .5;
				if (6 < e * e + f * f) {
					var h = this.b1.smass + this.b2.smass;
					h > n.epsilon && (h = .75 / h, e = -e * h, f = -f * h, h = e * e + f * f, 400 < h && (h = 1 / Math.sqrt(h) * 20, e *= h, f *= h), h = this.b1.imass, this.b1.posx -= e * h, this.b1.posy -= f * h, h = this.b2.imass, this.b2.posx += e * h, this.b2.posy += f * h, e = this.b2.posx + c - (this.b1.posx + a), f = this.b2.posy + d - (this.b1.posy + b), e *= .5, f *= .5)
				}
				var m;
				h = m = this.b1.smass + this.b2.smass;
				var k = 0;
				if (0 != this.b1.sinertia) {
					var g = a * this.b1.sinertia,
						p = b * this.b1.sinertia;
					h += p * b;
					k += -p * a;
					m += g * a
				}
				0 != this.b2.sinertia && (g = c * this.b2.sinertia,
					p = d * this.b2.sinertia, h += p * d, k += -p * c, m += g * c);
				e = -e;
				f = -f;
				g = e * e + f * f;
				36 < g && (g = 1 / Math.sqrt(g) * 6, e *= g, f *= g);
				g = h * m - k * k;
				g != g ? e = f = 0 : 0 == g ? (e = 0 != h ? e / h : 0, f = 0 != m ? f / m : 0) : (g = 1 / g, m = g * (m * e - k * f), f = g * (h * f - k * e), e = m);
				h = this.b1.imass;
				this.b1.posx -= e * h;
				this.b1.posy -= f * h;
				h = this.b2.imass;
				this.b2.posx += e * h;
				this.b2.posy += f * h;
				this.b1.delta_rot(-(f * a - e * b) * this.b1.iinertia);
				this.b2.delta_rot((f * c - e * d) * this.b2.iinertia);
				return !1
			},
			__class__: uc
		});
	var E = function() {
		this.colarb = this.fluidarb = this.sensorarb = null;
		this.type = 0;
		this.b1 = this.b2 =
			this.ws1 = this.ws2 = this.pair = null;
		this.invalidated = !1;
		this.immState = 0;
		this.intchange = this.presentable = this.continuous = this.fresh = !1;
		this.present = 0;
		this.active = this.cleared = this.sleeping = !1;
		this.id = this.di = this.stamp = this.up_stamp = this.sleep_stamp = this.endGenerated = 0;
		this.outer = null
	};
	E.__name__ = !0;
	E.prototype = {
		wrapper: function() {
			null == this.outer && (E.internal = !0, this.type == E.COL ? (this.colarb.outer_zn = new td, this.outer = this.colarb.outer_zn) : this.type == E.FLUID ? (this.fluidarb.outer_zn = new bd, this.outer =
				this.fluidarb.outer_zn) : this.outer = new vc, this.outer.zpp_inner = this, E.internal = !1);
			return this.outer
		},
		__class__: E
	};
	var oa = function() {
		this.next = null;
		E.call(this);
		this.type = E.SENSOR;
		this.sensorarb = this
	};
	oa.__name__ = !0;
	oa.__super__ = E;
	oa.prototype = r(E.prototype, {
		retire: function() {
			this.cleared || (this.b1.arbiters.inlined_try_remove(this), this.b2.arbiters.inlined_try_remove(this), null != this.pair && (this.pair = this.pair.arb = null));
			this.b1 = this.b2 = null;
			this.intchange = this.active = !1;
			this.next = oa.zpp_pool;
			oa.zpp_pool =
				this
		},
		__class__: oa
	});
	var hb = function() {
		this.wMass = this.adamp = this.agamma = this.vMassa = this.vMassb = this.vMassc = this.dampx = this.dampy = this.lgamma = this.nx = this.ny = this.buoyx = this.buoyy = this.pre_dt = 0;
		this.nodrag = !1;
		this.centroidx = this.centroidy = this.overlap = this.r1x = this.r1y = this.r2x = this.r2y = 0;
		this.outer_zn = this.next = null;
		E.call(this);
		this.type = E.FLUID;
		this.fluidarb = this;
		this.buoyy = this.buoyx = 0;
		this.pre_dt = -1
	};
	hb.__name__ = !0;
	hb.__super__ = E;
	hb.prototype = r(E.prototype, {
		retire: function() {
			this.cleared || (this.b1.arbiters.inlined_try_remove(this),
				this.b2.arbiters.inlined_try_remove(this), null != this.pair && (this.pair = this.pair.arb = null));
			this.b1 = this.b2 = null;
			this.intchange = this.active = !1;
			this.next = hb.zpp_pool;
			hb.zpp_pool = this;
			this.pre_dt = -1
		},
		preStep: function(a, b) {
			-1 == this.pre_dt && (this.pre_dt = b);
			var c = b / this.pre_dt;
			this.pre_dt = b;
			this.r1x = this.centroidx - this.b1.posx;
			this.r1y = this.centroidy - this.b1.posy;
			this.r2x = this.centroidx - this.b2.posx;
			this.r2y = this.centroidy - this.b2.posy;
			if (this.ws1.fluidEnabled && null != this.ws1.fluidProperties.wrap_gravity) {
				var d =
					this.ws1.fluidProperties.gravityx;
				var e = this.ws1.fluidProperties.gravityy
			} else d = a.gravityx, e = a.gravityy;
			if (this.ws2.fluidEnabled && null != this.ws2.fluidProperties.wrap_gravity) {
				var f = this.ws2.fluidProperties.gravityx;
				var h = this.ws2.fluidProperties.gravityy
			} else f = a.gravityx, h = a.gravityy;
			var m = a = 0;
			if (this.ws1.fluidEnabled && this.ws2.fluidEnabled) {
				var k = this.overlap * this.ws1.fluidProperties.density,
					g = this.overlap * this.ws2.fluidProperties.density;
				k > g ? (f = k + g, a -= d * f, m -= e * f) : k < g ? (e = k + g, a += f * e, m += h * e) : (d =
					.5 * (d + f), e = .5 * (e + h), this.ws1.worldCOMx * d + this.ws1.worldCOMy * e > this.ws2.worldCOMx * d + this.ws2.worldCOMy * e ? (f = k + g, a -= d * f, m -= e * f) : (f = k + g, a += d * f, m += e * f))
			} else this.ws1.fluidEnabled ? (f = this.overlap * this.ws1.fluidProperties.density, a -= d * f, m -= e * f) : this.ws2.fluidEnabled && (e = this.overlap * this.ws2.fluidProperties.density, a += f * e, m += h * e);
			a *= b;
			m *= b;
			this.buoyx = a;
			this.buoyy = m;
			2 == this.b1.type && (e = this.b1.imass, this.b1.velx -= a * e, this.b1.vely -= m * e, this.b1.angvel -= (m * this.r1x - a * this.r1y) * this.b1.iinertia);
			2 == this.b2.type &&
				(e = this.b2.imass, this.b2.velx += a * e, this.b2.vely += m * e, this.b2.angvel += (m * this.r2x - a * this.r2y) * this.b2.iinertia);
			if (this.ws1.fluidEnabled && 0 != this.ws1.fluidProperties.viscosity || this.ws2.fluidEnabled && 0 != this.ws2.fluidProperties.viscosity) {
				this.nodrag = !1;
				a = 0;
				this.ws1.fluidEnabled && (this.ws2.validate_angDrag(), a += this.ws1.fluidProperties.viscosity * this.ws2.angDrag * this.overlap / this.ws2.area);
				this.ws2.fluidEnabled && (this.ws1.validate_angDrag(), a += this.ws2.fluidProperties.viscosity * this.ws1.angDrag * this.overlap /
					this.ws1.area);
				0 != a ? (m = this.b1.sinertia + this.b2.sinertia, this.wMass = 0 != m ? 1 / m : 0, a *= .0008 * Math.PI, this.agamma = 1 / (b * a * (2 + a * b)), a = 1 / (1 + this.agamma), this.agamma *= a, this.wMass *= a) : this.agamma = this.wMass = 0;
				a = this.b2.velx + this.b2.kinvelx - this.r2y * (this.b2.angvel + this.b2.kinangvel) - (this.b1.velx + this.b1.kinvelx - this.r1y * (this.b2.angvel + this.b2.kinangvel));
				m = this.b2.vely + this.b2.kinvely + this.r2x * (this.b2.angvel + this.b2.kinangvel) - (this.b1.vely + this.b1.kinvely + this.r1x * (this.b1.angvel + this.b1.kinangvel));
				a *
					a + m * m < n.epsilon * n.epsilon || (e = 1 / Math.sqrt(a * a + m * m), this.nx = a * e, this.ny = m * e);
				a = 0;
				if (this.ws1.fluidEnabled)
					if (m = -this.ws1.fluidProperties.viscosity * this.overlap / this.ws2.area, 0 == this.ws2.type) a -= m * this.ws2.circle.radius * n.fluidLinearDrag / (2 * this.ws2.circle.radius * Math.PI);
					else {
						d = e = 0;
						for (f = this.ws2.polygon.edges.head; null != f;) h = f.elt, e += h.length, h = m * h.length * (h.gnormx * this.nx + h.gnormy * this.ny), 0 < h && (h = h *= -n.fluidVacuumDrag), d -= .5 * h * n.fluidLinearDrag, f = f.next;
						a += d / e
					}
				if (this.ws2.fluidEnabled)
					if (m = -this.ws2.fluidProperties.viscosity *
						this.overlap / this.ws1.area, 0 == this.ws1.type) a -= m * this.ws1.circle.radius * n.fluidLinearDrag / (2 * this.ws1.circle.radius * Math.PI);
					else {
						d = e = 0;
						for (f = this.ws1.polygon.edges.head; null != f;) h = f.elt, e += h.length, h = m * h.length * (h.gnormx * this.nx + h.gnormy * this.ny), 0 < h && (h = h *= -n.fluidVacuumDrag), d -= .5 * h * n.fluidLinearDrag, f = f.next;
						a += d / e
					}
				0 != a ? (m = d = this.b1.smass + this.b2.smass, e = 0, 0 != this.b1.sinertia && (f = this.r1x * this.b1.sinertia, h = this.r1y * this.b1.sinertia, m += h * this.r1y, e += -h * this.r1x, d += f * this.r1x), 0 != this.b2.sinertia &&
					(f = this.r2x * this.b2.sinertia, h = this.r2y * this.b2.sinertia, m += h * this.r2y, e += -h * this.r2x, d += f * this.r2x), f = m * d - e * e, f != f ? (m = e = d = 0, 3) : 0 == f ? (f = 0, 0 != m ? m = 1 / m : (m = 0, f |= 1), 0 != d ? d = 1 / d : (d = 0, f |= 2), e = 0, f) : (f = 1 / f, h = d * f, d = m * f, m = h, e *= -f, 0), this.vMassa = m, this.vMassb = e, this.vMassc = d, a *= 2 * Math.PI, this.lgamma = 1 / (b * a * (2 + a * b)), b = 1 / (1 + this.lgamma), this.lgamma *= b, this.vMassa *= b, this.vMassb *= b, this.vMassc *= b) : this.lgamma = this.vMassc = this.vMassb = this.vMassa = 0
			} else this.nodrag = !0, this.adamp = this.dampy = this.dampx = 0;
			this.dampx *=
				c;
			this.dampy *= c;
			this.adamp *= c
		},
		warmStart: function() {
			var a = this.b1.imass;
			this.b1.velx -= this.dampx * a;
			this.b1.vely -= this.dampy * a;
			a = this.b2.imass;
			this.b2.velx += this.dampx * a;
			this.b2.vely += this.dampy * a;
			this.b1.angvel -= this.b1.iinertia * (this.dampy * this.r1x - this.dampx * this.r1y);
			this.b2.angvel += this.b2.iinertia * (this.dampy * this.r2x - this.dampx * this.r2y);
			this.b1.angvel -= this.adamp * this.b1.iinertia;
			this.b2.angvel += this.adamp * this.b2.iinertia
		},
		applyImpulseVel: function() {
			if (!this.nodrag) {
				var a = this.b1.angvel + this.b1.kinangvel,
					b = this.b2.angvel + this.b2.kinangvel,
					c = this.b1.velx + this.b1.kinvelx - this.r1y * a - (this.b2.velx + this.b2.kinvelx - this.r2y * b),
					d = this.b1.vely + this.b1.kinvely + this.r1x * a - (this.b2.vely + this.b2.kinvely + this.r2x * b),
					e = this.vMassa * c + this.vMassb * d;
				d = this.vMassb * c + this.vMassc * d;
				var f = this.lgamma;
				c = e - this.dampx * f;
				d -= this.dampy * f;
				this.dampx += 1 * c;
				this.dampy += 1 * d;
				e = this.b1.imass;
				this.b1.velx -= c * e;
				this.b1.vely -= d * e;
				e = this.b2.imass;
				this.b2.velx += c * e;
				this.b2.vely += d * e;
				this.b1.angvel -= this.b1.iinertia * (d * this.r1x - c * this.r1y);
				this.b2.angvel += this.b2.iinertia * (d * this.r2x - c * this.r2y);
				a = (a - b) * this.wMass - this.adamp * this.agamma;
				this.adamp += a;
				this.b1.angvel -= a * this.b1.iinertia;
				this.b2.angvel += a * this.b2.iinertia
			}
		},
		__class__: hb
	});
	var Fa = function() {
		this.pre_dt = 0;
		this.stat = !1;
		this.next = null;
		this.hc2 = this.hpc2 = !1;
		this.c1 = this.oc1 = this.c2 = this.oc2 = null;
		this.__ref_vertex = 0;
		this.__ref_edge1 = this.__ref_edge2 = null;
		this.biasCoef = 0;
		this.rev = !1;
		this.nx = this.ny = this.kMassa = this.kMassb = this.kMassc = this.Ka = this.Kb = this.Kc = this.rMass = this.jrAcc =
			this.rn1a = this.rt1a = this.rn1b = this.rt1b = this.rn2a = this.rt2a = this.rn2b = this.rt2b = this.k1x = this.k1y = this.k2x = this.k2y = this.surfacex = this.surfacey = this.lnormx = this.lnormy = this.lproj = this.radius = 0;
		this.s1 = this.s2 = this.contacts = this.innards = null;
		this.userdef_dyn_fric = this.userdef_stat_fric = this.userdef_restitution = this.userdef_rfric = !1;
		this.dyn_fric = this.stat_fric = this.restitution = this.rfric = 0;
		this.outer_zn = null;
		E.call(this);
		this.pre_dt = -1;
		this.contacts = new aa;
		this.innards = new wd;
		this.type = E.COL;
		this.colarb =
			this
	};
	Fa.__name__ = !0;
	Fa.__super__ = E;
	Fa.prototype = r(E.prototype, {
		injectContact: function(a, b, c, d, e, f, h) {
			null == h && (h = !1);
			for (var m = null, k = this.contacts.next; null != k;) {
				var g = k;
				if (f == g.hash) {
					m = g;
					break
				}
				k = k.next
			}
			null == m ? (null == aa.zpp_pool ? m = new aa : (m = aa.zpp_pool, aa.zpp_pool = m.next, m.next = null), null, k = m.inner, k.jnAcc = k.jtAcc = 0, m.hash = f, m.fresh = !0, m.arbiter = this, this.jrAcc = 0, this.contacts.inlined_add(m), this.innards.add(k)) : m.fresh = !1;
			m.px = a;
			m.py = b;
			this.nx = c;
			this.ny = d;
			m.dist = e;
			m.stamp = this.stamp;
			m.posOnly =
				h;
			return m
		},
		retire: function() {
			this.cleared || (this.b1.arbiters.inlined_try_remove(this), this.b2.arbiters.inlined_try_remove(this), null != this.pair && (this.pair = this.pair.arb = null));
			this.b1 = this.b2 = null;
			for (this.intchange = this.active = !1; null != this.contacts.next;) {
				var a = this.contacts.inlined_pop_unsafe();
				a.arbiter = null;
				a.next = aa.zpp_pool;
				aa.zpp_pool = a;
				this.innards.inlined_pop()
			}
			this.userdef_rfric = this.userdef_restitution = this.userdef_stat_fric = this.userdef_dyn_fric = !1;
			this.__ref_edge1 = this.__ref_edge2 =
				null;
			this.next = Fa.zpp_pool;
			Fa.zpp_pool = this;
			this.pre_dt = -1
		},
		cleanupContacts: function() {
			var a = !0,
				b = null,
				c = null,
				d = this.innards.next;
			this.hc2 = !1;
			for (var e = this.contacts.next; null != e;) {
				var f = e;
				f.stamp + n.arbiterExpirationDelay < this.stamp ? (e = this.contacts.inlined_erase(b), d = this.innards.inlined_erase(c), f.arbiter = null, f.next = aa.zpp_pool, aa.zpp_pool = f) : (b = f.inner, c = f.active, f.active = f.stamp == this.stamp, f.active && (a ? (a = !1, this.c1 = b, this.oc1 = f) : (this.hc2 = !0, this.c2 = b, this.oc2 = f)), c != f.active && (this.contacts.modified = !0), b = e, c = d, d = d.next, e = e.next)
			}
			this.hc2 ? (this.hpc2 = !0, this.oc1.posOnly ? (d = this.c1, this.c1 = this.c2, this.c2 = d, d = this.oc1, this.oc1 = this.oc2, this.oc2 = d, this.hc2 = !1) : this.oc2.posOnly && (this.hc2 = !1), this.oc1.posOnly && (a = !0)) : this.hpc2 = !1;
			return a
		},
		preStep: function(a) {
			this.invalidated && (this.invalidated = !1, this.userdef_restitution || (this.restitution = -Infinity >= this.s1.material.elasticity || -Infinity >= this.s2.material.elasticity ? 0 : Infinity <= this.s1.material.elasticity || Infinity <= this.s2.material.elasticity ?
				1 : (this.s1.material.elasticity + this.s2.material.elasticity) / 2, 0 > this.restitution && (this.restitution = 0), 1 < this.restitution && (this.restitution = 1)), this.userdef_dyn_fric || (this.dyn_fric = Math.sqrt(this.s1.material.dynamicFriction * this.s2.material.dynamicFriction)), this.userdef_stat_fric || (this.stat_fric = Math.sqrt(this.s1.material.staticFriction * this.s2.material.staticFriction)), this.userdef_rfric || (this.rfric = Math.sqrt(this.s1.material.rollingFriction * this.s2.material.rollingFriction))); - 1 == this.pre_dt &&
				(this.pre_dt = a);
			var b = a / this.pre_dt;
			this.pre_dt = a;
			var c = this.b1.smass + this.b2.smass;
			this.hc2 = !1;
			a = !0;
			this.biasCoef = 2 != this.b1.type || 2 != this.b2.type ? this.continuous ? n.contactContinuousStaticBiasCoef : n.contactStaticBiasCoef : this.continuous ? n.contactContinuousBiasCoef : n.contactBiasCoef;
			this.continuous = !1;
			for (var d = null, e = null, f = this.innards.next, h = this.contacts.next; null != h;) {
				var m = h;
				if (m.stamp + n.arbiterExpirationDelay < this.stamp) h = this.contacts.inlined_erase(d), f = this.innards.inlined_erase(e), m.arbiter =
					null, m.next = aa.zpp_pool, aa.zpp_pool = m;
				else {
					d = m.inner;
					e = m.active;
					m.active = m.stamp == this.stamp;
					if (m.active) {
						a ? (a = !1, this.c1 = d, this.oc1 = m) : (this.hc2 = !0, this.c2 = d, this.oc2 = m);
						d.r2x = m.px - this.b2.posx;
						d.r2y = m.py - this.b2.posy;
						d.r1x = m.px - this.b1.posx;
						d.r1y = m.py - this.b1.posy;
						var k = c + this.b2.sinertia * id.sqr(d.r2x * this.nx + d.r2y * this.ny);
						k += this.b1.sinertia * id.sqr(d.r1x * this.nx + d.r1y * this.ny);
						d.tMass = k < n.epsilon * n.epsilon ? 0 : 1 / k;
						k = c + this.b2.sinertia * id.sqr(this.ny * d.r2x - this.nx * d.r2y);
						k += this.b1.sinertia * id.sqr(this.ny *
							d.r1x - this.nx * d.r1y);
						d.nMass = k < n.epsilon * n.epsilon ? 0 : 1 / k;
						var g = this.b2.angvel + this.b2.kinangvel;
						k = this.b2.velx + this.b2.kinvelx - d.r2y * g;
						var p = this.b2.vely + this.b2.kinvely + d.r2x * g;
						g = this.b1.angvel + this.b1.kinangvel;
						k -= this.b1.velx + this.b1.kinvelx - d.r1y * g;
						p -= this.b1.vely + this.b1.kinvely + d.r1x * g;
						g = this.nx * k + this.ny * p;
						m.elasticity = this.restitution;
						d.bounce = g * m.elasticity;
						d.bounce > -n.elasticThreshold && (d.bounce = 0);
						g = p * this.nx - k * this.ny;
						k = n.staticFrictionThreshold;
						d.friction = g * g > k * k ? this.dyn_fric : this.stat_fric;
						d.jnAcc *= b;
						d.jtAcc *= b
					}
					e != m.active && (this.contacts.modified = !0);
					d = h;
					e = f;
					f = f.next;
					h = h.next
				}
			}
			this.hc2 ? (this.hpc2 = !0, this.oc1.posOnly ? (f = this.c1, this.c1 = this.c2, this.c2 = f, f = this.oc1, this.oc1 = this.oc2, this.oc2 = f, this.hc2 = !1) : this.oc2.posOnly && (this.hc2 = !1), this.oc1.posOnly && (a = !0)) : this.hpc2 = !1;
			this.jrAcc *= b;
			a || (this.rn1a = this.ny * this.c1.r1x - this.nx * this.c1.r1y, this.rt1a = this.c1.r1x * this.nx + this.c1.r1y * this.ny, this.rn1b = this.ny * this.c1.r2x - this.nx * this.c1.r2y, this.rt1b = this.c1.r2x * this.nx + this.c1.r2y *
				this.ny, this.k1x = this.b2.kinvelx - this.c1.r2y * this.b2.kinangvel - (this.b1.kinvelx - this.c1.r1y * this.b1.kinangvel), this.k1y = this.b2.kinvely + this.c1.r2x * this.b2.kinangvel - (this.b1.kinvely + this.c1.r1x * this.b1.kinangvel));
			this.hc2 && (this.rn2a = this.ny * this.c2.r1x - this.nx * this.c2.r1y, this.rt2a = this.c2.r1x * this.nx + this.c2.r1y * this.ny, this.rn2b = this.ny * this.c2.r2x - this.nx * this.c2.r2y, this.rt2b = this.c2.r2x * this.nx + this.c2.r2y * this.ny, this.k2x = this.b2.kinvelx - this.c2.r2y * this.b2.kinangvel - (this.b1.kinvelx - this.c2.r1y *
				this.b1.kinangvel), this.k2y = this.b2.kinvely + this.c2.r2x * this.b2.kinangvel - (this.b1.kinvely + this.c2.r1x * this.b1.kinangvel), this.kMassa = c + this.b1.sinertia * this.rn1a * this.rn1a + this.b2.sinertia * this.rn1b * this.rn1b, this.kMassb = c + this.b1.sinertia * this.rn1a * this.rn2a + this.b2.sinertia * this.rn1b * this.rn2b, this.kMassc = c + this.b1.sinertia * this.rn2a * this.rn2a + this.b2.sinertia * this.rn2b * this.rn2b, this.kMassa * this.kMassa + 2 * this.kMassb * this.kMassb + this.kMassc * this.kMassc < n.illConditionedThreshold * (this.kMassa * this.kMassc -
				this.kMassb * this.kMassb) ? (this.Ka = this.kMassa, this.Kb = this.kMassb, this.Kc = this.kMassc, b = this.kMassa * this.kMassc - this.kMassb * this.kMassb, b != b ? (this.kMassa = this.kMassb = this.kMassc = 0, 3) : 0 == b ? (b = 0, 0 != this.kMassa ? this.kMassa = 1 / this.kMassa : (this.kMassa = 0, b |= 1), 0 != this.kMassc ? this.kMassc = 1 / this.kMassc : (this.kMassc = 0, b |= 2), this.kMassb = 0, b) : (b = 1 / b, c = this.kMassc * b, this.kMassc = this.kMassa * b, this.kMassa = c, this.kMassb *= -b, 0)) : (this.hc2 = !1, this.oc2.dist < this.oc1.dist && (b = this.c1, this.c1 = this.c2, this.c2 = b), this.oc2.active = !1, this.contacts.modified = !0));
			this.surfacex = this.b2.svelx;
			this.surfacey = this.b2.svely;
			this.surfacex += 1 * this.b1.svelx;
			this.surfacey += 1 * this.b1.svely;
			this.surfacex = -this.surfacex;
			this.surfacey = -this.surfacey;
			this.rMass = this.b1.sinertia + this.b2.sinertia;
			0 != this.rMass && (this.rMass = 1 / this.rMass);
			return a
		},
		warmStart: function() {
			var a = this.nx * this.c1.jnAcc - this.ny * this.c1.jtAcc,
				b = this.ny * this.c1.jnAcc + this.nx * this.c1.jtAcc,
				c = this.b1.imass;
			this.b1.velx -= a * c;
			this.b1.vely -= b * c;
			this.b1.angvel -= this.b1.iinertia *
				(b * this.c1.r1x - a * this.c1.r1y);
			c = this.b2.imass;
			this.b2.velx += a * c;
			this.b2.vely += b * c;
			this.b2.angvel += this.b2.iinertia * (b * this.c1.r2x - a * this.c1.r2y);
			this.hc2 && (a = this.nx * this.c2.jnAcc - this.ny * this.c2.jtAcc, b = this.ny * this.c2.jnAcc + this.nx * this.c2.jtAcc, c = this.b1.imass, this.b1.velx -= a * c, this.b1.vely -= b * c, this.b1.angvel -= this.b1.iinertia * (b * this.c2.r1x - a * this.c2.r1y), c = this.b2.imass, this.b2.velx += a * c, this.b2.vely += b * c, this.b2.angvel += this.b2.iinertia * (b * this.c2.r2x - a * this.c2.r2y));
			this.b2.angvel += this.jrAcc *
				this.b2.iinertia;
			this.b1.angvel -= this.jrAcc * this.b1.iinertia
		},
		applyImpulseVel: function() {
			var a = this.k1x + this.b2.velx - this.c1.r2y * this.b2.angvel - (this.b1.velx - this.c1.r1y * this.b1.angvel);
			var b = this.k1y + this.b2.vely + this.c1.r2x * this.b2.angvel - (this.b1.vely + this.c1.r1x * this.b1.angvel);
			var c = (b * this.nx - a * this.ny + this.surfacex) * this.c1.tMass;
			a = this.c1.friction * this.c1.jnAcc;
			var d = this.c1.jtAcc;
			var e = d - c;
			e > a ? e = a : e < -a && (e = -a);
			c = e - d;
			this.c1.jtAcc = e;
			d = -this.ny * c;
			var f = this.nx * c;
			this.b2.velx += d * this.b2.imass;
			this.b2.vely += f * this.b2.imass;
			this.b1.velx -= d * this.b1.imass;
			this.b1.vely -= f * this.b1.imass;
			this.b2.angvel += this.rt1b * c * this.b2.iinertia;
			this.b1.angvel -= this.rt1a * c * this.b1.iinertia;
			this.hc2 ? (e = this.k2x + this.b2.velx - this.c2.r2y * this.b2.angvel - (this.b1.velx - this.c2.r1y * this.b1.angvel), f = this.k2y + this.b2.vely + this.c2.r2x * this.b2.angvel - (this.b1.vely + this.c2.r1x * this.b1.angvel), c = (f * this.nx - e * this.ny + this.surfacex) * this.c2.tMass, a = this.c2.friction * this.c2.jnAcc, d = this.c2.jtAcc, e = d - c, e > a ? e = a : e < -a && (e = -a),
				c = e - d, this.c2.jtAcc = e, d = -this.ny * c, f = this.nx * c, this.b2.velx += d * this.b2.imass, this.b2.vely += f * this.b2.imass, this.b1.velx -= d * this.b1.imass, this.b1.vely -= f * this.b1.imass, this.b2.angvel += this.rt2b * c * this.b2.iinertia, this.b1.angvel -= this.rt2a * c * this.b1.iinertia, a = this.k1x + this.b2.velx - this.c1.r2y * this.b2.angvel - (this.b1.velx - this.c1.r1y * this.b1.angvel), b = this.k1y + this.b2.vely + this.c1.r2x * this.b2.angvel - (this.b1.vely + this.c1.r1x * this.b1.angvel), e = this.k2x + this.b2.velx - this.c2.r2y * this.b2.angvel - (this.b1.velx -
					this.c2.r1y * this.b1.angvel), f = this.k2y + this.b2.vely + this.c2.r2x * this.b2.angvel - (this.b1.vely + this.c2.r1x * this.b1.angvel), c = this.c1.jnAcc, d = this.c2.jnAcc, a = a * this.nx + b * this.ny + this.surfacey + this.c1.bounce - (this.Ka * c + this.Kb * d), e = e * this.nx + f * this.ny + this.surfacey + this.c2.bounce - (this.Kb * c + this.Kc * d), f = -(this.kMassa * a + this.kMassb * e), b = -(this.kMassb * a + this.kMassc * e), 0 <= f && 0 <= b ? (a = f - c, e = b - d, this.c1.jnAcc = f, this.c2.jnAcc = b) : (f = -this.c1.nMass * a, 0 <= f && 0 <= this.Kb * f + e ? (a = f - c, e = -d, this.c1.jnAcc = f, this.c2.jnAcc =
					0) : (b = -this.c2.nMass * e, 0 <= b && 0 <= this.Kb * b + a ? (a = -c, e = b - d, this.c1.jnAcc = 0, this.c2.jnAcc = b) : 0 <= a && 0 <= e ? (a = -c, e = -d, this.c1.jnAcc = this.c2.jnAcc = 0) : e = a = 0)), c = a + e, d = this.nx * c, f = this.ny * c, this.b2.velx += d * this.b2.imass, this.b2.vely += f * this.b2.imass, this.b1.velx -= d * this.b1.imass, this.b1.vely -= f * this.b1.imass, this.b2.angvel += (this.rn1b * a + this.rn2b * e) * this.b2.iinertia, this.b1.angvel -= (this.rn1a * a + this.rn2a * e) * this.b1.iinertia) : (0 != this.radius && (c = (this.b2.angvel - this.b1.angvel) * this.rMass, a = this.rfric * this.c1.jnAcc,
					d = this.jrAcc, this.jrAcc -= c, this.jrAcc > a ? this.jrAcc = a : this.jrAcc < -a && (this.jrAcc = -a), c = this.jrAcc - d, this.b2.angvel += c * this.b2.iinertia, this.b1.angvel -= c * this.b1.iinertia), a = this.k1x + this.b2.velx - this.c1.r2y * this.b2.angvel - (this.b1.velx - this.c1.r1y * this.b1.angvel), b = this.k1y + this.b2.vely + this.c1.r2x * this.b2.angvel - (this.b1.vely + this.c1.r1x * this.b1.angvel), c = (this.c1.bounce + (this.nx * a + this.ny * b) + this.surfacey) * this.c1.nMass, d = this.c1.jnAcc, e = d - c, 0 > e && (e = 0), c = e - d, this.c1.jnAcc = e, d = this.nx * c, f = this.ny *
				c, this.b2.velx += d * this.b2.imass, this.b2.vely += f * this.b2.imass, this.b1.velx -= d * this.b1.imass, this.b1.vely -= f * this.b1.imass, this.b2.angvel += this.rn1b * c * this.b2.iinertia, this.b1.angvel -= this.rn1a * c * this.b1.iinertia)
		},
		applyImpulsePos: function() {
			if (2 == this.ptype) {
				var a = this.c1;
				var b = this.b2.axisy * a.lr2x - this.b2.axisx * a.lr2y;
				var c = a.lr2x * this.b2.axisx + a.lr2y * this.b2.axisy;
				b += 1 * this.b2.posx;
				c += 1 * this.b2.posy;
				var d = this.b1.axisy * a.lr1x - this.b1.axisx * a.lr1y;
				var e = a.lr1x * this.b1.axisx + a.lr1y * this.b1.axisy;
				d += 1 * this.b1.posx;
				e += 1 * this.b1.posy;
				var f = b - d;
				a = c - e;
				var h = Math.sqrt(f * f + a * a),
					m = this.radius - n.collisionSlop,
					k = h - m;
				0 > f * this.nx + a * this.ny && (f = -f, a = -a, k -= this.radius);
				0 > k && (h < n.epsilon ? 0 != this.b1.smass ? this.b1.posx += 10 * n.epsilon : this.b2.posx += 10 * n.epsilon : (k = 1 / h, f *= k, a *= k, b = .5 * (d + b), c = .5 * (e + c), d = b - this.b1.posx, e = c - this.b1.posy, b -= this.b2.posx, c -= this.b2.posy, d = a * d - f * e, b = a * b - f * c, c = this.b2.smass + b * b * this.b2.sinertia + this.b1.smass + d * d * this.b1.sinertia, 0 != c && (h = -this.biasCoef * (h - m) / c, f *= h, a *= h, m = this.b1.imass,
					this.b1.posx -= f * m, this.b1.posy -= a * m, this.b1.delta_rot(-d * this.b1.iinertia * h), m = this.b2.imass, this.b2.posx += f * m, this.b2.posy += a * m, this.b2.delta_rot(b * this.b2.iinertia * h))))
			} else {
				var g = 0;
				m = 0;
				0 == this.ptype ? (f = this.b1.axisy * this.lnormx - this.b1.axisx * this.lnormy, a = this.lnormx * this.b1.axisx + this.lnormy * this.b1.axisy, d = this.lproj + (f * this.b1.posx + a * this.b1.posy), h = this.b2.axisy * this.c1.lr1x - this.b2.axisx * this.c1.lr1y, k = this.c1.lr1x * this.b2.axisx + this.c1.lr1y * this.b2.axisy, h += 1 * this.b2.posx, k += 1 * this.b2.posy,
					this.hpc2 && (g = this.b2.axisy * this.c2.lr1x - this.b2.axisx * this.c2.lr1y, m = this.c2.lr1x * this.b2.axisx + this.c2.lr1y * this.b2.axisy, g += 1 * this.b2.posx, m += 1 * this.b2.posy)) : (f = this.b2.axisy * this.lnormx - this.b2.axisx * this.lnormy, a = this.lnormx * this.b2.axisx + this.lnormy * this.b2.axisy, d = this.lproj + (f * this.b2.posx + a * this.b2.posy), h = this.b1.axisy * this.c1.lr1x - this.b1.axisx * this.c1.lr1y, k = this.c1.lr1x * this.b1.axisx + this.c1.lr1y * this.b1.axisy, h += 1 * this.b1.posx, k += 1 * this.b1.posy, this.hpc2 && (g = this.b1.axisy * this.c2.lr1x -
					this.b1.axisx * this.c2.lr1y, m = this.c2.lr1x * this.b1.axisx + this.c2.lr1y * this.b1.axisy, g += 1 * this.b1.posx, m += 1 * this.b1.posy));
				b = h * f + k * a - d - this.radius;
				b += n.collisionSlop;
				c = 0;
				this.hpc2 && (c = g * f + m * a - d - this.radius, c += n.collisionSlop);
				if (0 > b || 0 > c)
					if (this.rev && (f = -f, a = -a), d = h - this.b1.posx, e = k - this.b1.posy, h -= this.b2.posx, k -= this.b2.posy, this.hpc2) {
						var p = g - this.b1.posx;
						var l = m - this.b1.posy;
						g -= this.b2.posx;
						var C = m - this.b2.posy;
						m = a * d - f * e;
						h = a * h - f * k;
						e = a * p - f * l;
						d = a * g - f * C;
						k = this.b1.smass + this.b2.smass;
						this.kMassa = k +
							this.b1.sinertia * m * m + this.b2.sinertia * h * h;
						this.kMassb = k + this.b1.sinertia * m * e + this.b2.sinertia * h * d;
						this.kMassc = k + this.b1.sinertia * e * e + this.b2.sinertia * d * d;
						l = this.kMassa;
						k = this.kMassb;
						p = this.kMassc;
						g = b * this.biasCoef;
						C = c * this.biasCoef;
						b = -g;
						c = -C;
						var Q = this.kMassa * this.kMassc - this.kMassb * this.kMassb;
						if (Q != Q) b = c = 0;
						else if (0 == Q) b = 0 != this.kMassa ? b / this.kMassa : 0, c = 0 != this.kMassc ? c / this.kMassc : 0;
						else {
							Q = 1 / Q;
							var q = Q * (this.kMassc * b - this.kMassb * c);
							c = Q * (this.kMassa * c - this.kMassb * b);
							b = q
						}
						0 <= b && 0 <= c ? (k = (b + c) * this.b1.imass,
							this.b1.posx -= f * k, this.b1.posy -= a * k, this.b1.delta_rot(-this.b1.iinertia * (m * b + e * c)), m = (b + c) * this.b2.imass, this.b2.posx += f * m, this.b2.posy += a * m, this.b2.delta_rot(this.b2.iinertia * (h * b + d * c))) : (b = -g / l, c = 0, l = k * b + C, 0 <= b && 0 <= l ? (k = (b + c) * this.b1.imass, this.b1.posx -= f * k, this.b1.posy -= a * k, this.b1.delta_rot(-this.b1.iinertia * (m * b + e * c)), m = (b + c) * this.b2.imass, this.b2.posx += f * m, this.b2.posy += a * m, this.b2.delta_rot(this.b2.iinertia * (h * b + d * c))) : (b = 0, c = -C / p, k = k * c + g, 0 <= c && 0 <= k && (k = (b + c) * this.b1.imass, this.b1.posx -= f *
							k, this.b1.posy -= a * k, this.b1.delta_rot(-this.b1.iinertia * (m * b + e * c)), m = (b + c) * this.b2.imass, this.b2.posx += f * m, this.b2.posy += a * m, this.b2.delta_rot(this.b2.iinertia * (h * b + d * c)))))
					} else m = a * d - f * e, h = a * h - f * k, c = this.b2.smass + h * h * this.b2.sinertia + this.b1.smass + m * m * this.b1.sinertia, 0 != c && (b = -this.biasCoef * b / c, f *= b, a *= b, c = this.b1.imass, this.b1.posx -= f * c, this.b1.posy -= a * c, this.b1.delta_rot(-m * this.b1.iinertia * b), m = this.b2.imass, this.b2.posx += f * m, this.b2.posy += a * m, this.b2.delta_rot(h * this.b2.iinertia * b))
			}
		},
		__class__: Fa
	});
	var aa = function() {
		this.length = 0;
		this._inuse = this.modified = this.pushmod = !1;
		this.next = null;
		this.dist = this.elasticity = 0;
		this.fresh = !1;
		this.stamp = this.hash = 0;
		this.active = this.posOnly = !1;
		this.arbiter = null;
		this.px = this.py = 0;
		this.outer = null;
		this.inner = new wd
	};
	aa.__name__ = !0;
	aa.prototype = {
		wrapper: function() {
			null == this.outer && (this.outer = new Ld, aa.internal = !1, this.outer.zpp_inner = this);
			return this.outer
		},
		inlined_add: function(a) {
			a._inuse = !0;
			a.next = this.next;
			this.next = a;
			this.modified = !0;
			this.length++;
			return a
		},
		pop: function() {
			this.inlined_pop()
		},
		inlined_pop: function() {
			var a = this.next;
			this.next = a.next;
			a._inuse = !1;
			null == this.next && (this.pushmod = !0);
			this.modified = !0;
			this.length--
		},
		inlined_pop_unsafe: function() {
			var a = this.next;
			this.pop();
			return a
		},
		inlined_erase: function(a) {
			var b;
			if (null == a) {
				var c = this.next;
				this.next = b = c.next;
				null == this.next && (this.pushmod = !0)
			} else c = a.next, b = c.next, a.next = b, null == b && (this.pushmod = !0);
			c._inuse = !1;
			this.modified = !0;
			this.length--;
			this.pushmod = !0;
			return b
		},
		__class__: aa
	};
	var wd = function() {
		this.length =
			0;
		this._inuse = this.modified = this.pushmod = !1;
		this.next = null;
		this.r1x = this.r1y = this.r2x = this.r2y = this.nMass = this.tMass = this.bounce = this.friction = this.jnAcc = this.jtAcc = this.lr1x = this.lr1y = this.lr2x = this.lr2y = 0
	};
	wd.__name__ = !0;
	wd.prototype = {
		add: function(a) {
			return this.inlined_add(a)
		},
		inlined_add: function(a) {
			a._inuse = !0;
			a.next = this.next;
			this.next = a;
			this.modified = !0;
			this.length++;
			return a
		},
		inlined_pop: function() {
			var a = this.next;
			this.next = a.next;
			a._inuse = !1;
			null == this.next && (this.pushmod = !0);
			this.modified = !0;
			this.length--
		},
		inlined_erase: function(a) {
			var b;
			if (null == a) {
				var c = this.next;
				this.next = b = c.next;
				null == this.next && (this.pushmod = !0)
			} else c = a.next, b = c.next, a.next = b, null == b && (this.pushmod = !0);
			c._inuse = !1;
			this.modified = !0;
			this.length--;
			this.pushmod = !0;
			return b
		},
		__class__: wd
	};
	var Za = function() {
		this.collisionGroup = this.collisionMask = this.sensorGroup = this.sensorMask = this.fluidGroup = this.fluidMask = 0;
		this.next = this.outer = this.shapes = null;
		this.shapes = new Fc;
		this.collisionGroup = this.sensorGroup = this.fluidGroup =
			1;
		this.collisionMask = this.sensorMask = this.fluidMask = -1
	};
	Za.__name__ = !0;
	Za.prototype = {
		wrapper: function() {
			if (null == this.outer) {
				this.outer = new cd;
				var a = this.outer.zpp_inner;
				a.outer = null;
				a.next = Za.zpp_pool;
				Za.zpp_pool = a;
				this.outer.zpp_inner = this
			}
			return this.outer
		},
		shouldCollide: function(a) {
			return 0 != (this.collisionMask & a.collisionGroup) && 0 != (a.collisionMask & this.collisionGroup)
		},
		shouldSense: function(a) {
			return 0 != (this.sensorMask & a.sensorGroup) && 0 != (a.sensorMask & this.sensorGroup)
		},
		shouldFlow: function(a) {
			return 0 !=
				(this.fluidMask & a.fluidGroup) && 0 != (a.fluidMask & this.fluidGroup)
		},
		invalidate: function() {
			for (var a = this.shapes.head; null != a;) a.elt.invalidate_filter(), a = a.next
		},
		__class__: Za
	};
	var V = function() {
		this.wrap_max = null;
		this.maxx = this.maxy = 0;
		this.wrap_min = null;
		this.minx = this.miny = 0;
		this.outer = this.next = null;
		this._immutable = !1;
		this._invalidate = this._validate = null
	};
	V.__name__ = !0;
	V.get = function(a, b, c, d) {
		if (null == V.zpp_pool) var e = new V;
		else e = V.zpp_pool, V.zpp_pool = e.next, e.next = null;
		null;
		e.minx = a;
		e.miny = b;
		e.maxx =
			c;
		e.maxy = d;
		return e
	};
	V.prototype = {
		validate: function() {
			null != this._validate && this._validate()
		},
		perimeter: function() {
			return 2 * (this.maxx - this.minx + (this.maxy - this.miny))
		},
		intersectY: function(a) {
			return !(a.miny > this.maxy || this.miny > a.maxy)
		},
		intersect: function(a) {
			return a.miny <= this.maxy && this.miny <= a.maxy && a.minx <= this.maxx && this.minx <= a.maxx
		},
		combine: function(a) {
			a.minx < this.minx && (this.minx = a.minx);
			a.maxx > this.maxx && (this.maxx = a.maxx);
			a.miny < this.miny && (this.miny = a.miny);
			a.maxy > this.maxy && (this.maxy =
				a.maxy)
		},
		contains: function(a) {
			return a.minx >= this.minx && a.miny >= this.miny && a.maxx <= this.maxx && a.maxy <= this.maxy
		},
		setCombine: function(a, b) {
			this.minx = a.minx < b.minx ? a.minx : b.minx;
			this.miny = a.miny < b.miny ? a.miny : b.miny;
			this.maxx = a.maxx > b.maxx ? a.maxx : b.maxx;
			this.maxy = a.maxy > b.maxy ? a.maxy : b.maxy
		},
		setExpand: function(a, b) {
			this.minx = a.minx - b;
			this.miny = a.miny - b;
			this.maxx = a.maxx + b;
			this.maxy = a.maxy + b
		},
		toString: function() {
			return "{ x: " + this.minx + " y: " + this.miny + " w: " + (this.maxx - this.minx) + " h: " + (this.maxy - this.miny) +
				" }"
		},
		__class__: V
	};
	var jd = function() {
		this.length = 0;
		this.modified = this.pushmod = !1;
		this.head = null
	};
	jd.__name__ = !0;
	jd.prototype = {
		add: function(a) {
			return this.inlined_add(a)
		},
		inlined_add: function(a) {
			if (null == la.zpp_pool) var b = new la;
			else b = la.zpp_pool, la.zpp_pool = b.next, b.next = null;
			null;
			b.elt = a;
			b.next = this.head;
			this.head = b;
			this.modified = !0;
			this.length++;
			return a
		},
		insert: function(a, b) {
			return this.inlined_insert(a, b)
		},
		inlined_insert: function(a, b) {
			if (null == la.zpp_pool) var c = new la;
			else c = la.zpp_pool, la.zpp_pool =
				c.next, c.next = null;
			null;
			c.elt = b;
			b = c;
			null == a ? (b.next = this.head, this.head = b) : (b.next = a.next, a.next = b);
			this.pushmod = this.modified = !0;
			this.length++;
			return b
		},
		pop: function() {
			this.inlined_pop()
		},
		inlined_pop: function() {
			var a = this.head;
			this.head = a.next;
			a.elt = null;
			a.next = la.zpp_pool;
			la.zpp_pool = a;
			null == this.head && (this.pushmod = !0);
			this.modified = !0;
			this.length--
		},
		pop_unsafe: function() {
			return this.inlined_pop_unsafe()
		},
		inlined_pop_unsafe: function() {
			var a = this.head.elt;
			this.pop();
			return a
		},
		erase: function(a) {
			return this.inlined_erase(a)
		},
		inlined_erase: function(a) {
			var b;
			if (null == a) {
				var c = this.head;
				this.head = b = c.next;
				null == this.head && (this.pushmod = !0)
			} else c = a.next, b = c.next, a.next = b, null == b && (this.pushmod = !0);
			a = c;
			a.elt = null;
			a.next = la.zpp_pool;
			la.zpp_pool = a;
			this.modified = !0;
			this.length--;
			this.pushmod = !0;
			return b
		},
		clear: function() {
			for (; null != this.head;) this.inlined_pop();
			this.pushmod = !0
		},
		iterator_at: function(a) {
			for (var b = this.head; 0 < a-- && null != b;) b = b.next;
			return b
		},
		__class__: jd
	};
	var q = function() {};
	q.__name__ = !0;
	q.contactCollide = function(a,
		b, c, d) {
		if (1 == b.type)
			if (1 == a.type) {
				for (var e = !0, f = -1e+100, h = -1, m = null, k = null, g = a.polygon.edges.head; null != g;) {
					for (var p = g.elt, l = 1e+100, C = b.polygon.gverts.next; null != C;) {
						var Q = C;
						Q = p.gnormx * Q.x + p.gnormy * Q.y;
						Q < l && (l = Q);
						if (l - p.gprojection <= f) break;
						C = C.next
					}
					l -= p.gprojection;
					if (0 <= l) {
						e = !1;
						break
					}
					l > f && (f = l, m = p, h = 1);
					g = g.next
				}
				if (e) {
					for (g = b.polygon.edges.head; null != g;) {
						p = g.elt;
						l = 1e+100;
						for (C = a.polygon.gverts.next; null != C;) {
							Q = C;
							Q = p.gnormx * Q.x + p.gnormy * Q.y;
							Q < l && (l = Q);
							if (l - p.gprojection <= f) break;
							C = C.next
						}
						l -= p.gprojection;
						if (0 <= l) {
							e = !1;
							break
						}
						l > f && (f = l, k = p, h = 2);
						g = g.next
					}
					if (e) {
						1 == h ? (a = b.polygon, b = m, k = 1) : (a = a.polygon, b = k, k = -1);
						m = null;
						e = 1e+100;
						for (f = a.edges.head; null != f;) g = f.elt, p = b.gnormx * g.gnormx + b.gnormy * g.gnormy, p < e && (e = p, m = g), f = f.next;
						e = m.gp0.x;
						f = m.gp0.y;
						g = m.gp1.x;
						p = m.gp1.y;
						l = g - e;
						C = p - f;
						var q = b.gnormy * e - b.gnormx * f;
						Q = b.gnormy * g - b.gnormx * p;
						var r = 1 / (Q - q);
						q = (-b.tp1 - q) * r;
						q > n.epsilon && (e += l * q, f += C * q);
						Q = (-b.tp0 - Q) * r;
						Q < -n.epsilon && (g += l * Q, p += C * Q);
						C = k;
						l = b.gnormx * C;
						C *= b.gnormy;
						c.lnormx = b.lnormx;
						c.lnormy = b.lnormy;
						c.lproj = b.lprojection;
						c.radius = 0;
						c.rev = d != (-1 == k);
						c.ptype = c.rev ? 1 : 0;
						Q = e * b.gnormx + f * b.gnormy - b.gprojection;
						k = g * b.gnormx + p * b.gnormy - b.gprojection;
						if (0 < Q && 0 < k) return !1;
						d && (l = -l, C = -C);
						d = c.injectContact(e - b.gnormx * Q * .5, f - b.gnormy * Q * .5, l, C, Q, c.rev ? 1 : 0, 0 < Q);
						e -= 1 * a.body.posx;
						f -= 1 * a.body.posy;
						d.inner.lr1x = e * a.body.axisy + f * a.body.axisx;
						d.inner.lr1y = f * a.body.axisy - e * a.body.axisx;
						d = c.injectContact(g - b.gnormx * k * .5, p - b.gnormy * k * .5, l, C, k, c.rev ? 0 : 1, 0 < k);
						g -= 1 * a.body.posx;
						p -= 1 * a.body.posy;
						d.inner.lr1x = g * a.body.axisy + p * a.body.axisx;
						d.inner.lr1y =
							p * a.body.axisy - g * a.body.axisx;
						1 == h ? (c.__ref_edge1 = b, c.__ref_edge2 = m) : (c.__ref_edge2 = b, c.__ref_edge1 = m);
						return !0
					}
				}
			} else {
				m = -1e+100;
				k = !0;
				e = h = null;
				f = b.polygon.gverts.next;
				for (g = b.polygon.edges.head; null != g;) {
					p = g.elt;
					l = p.gnormx * a.circle.worldCOMx + p.gnormy * a.circle.worldCOMy - p.gprojection - a.circle.radius;
					if (0 < l) {
						k = !1;
						break
					}
					l > m && (m = l, h = p, e = f);
					f = f.next;
					g = g.next
				}
				if (k) {
					k = e;
					e = null == e.next ? b.polygon.gverts.next : e.next;
					f = a.circle.worldCOMy * h.gnormx - a.circle.worldCOMx * h.gnormy;
					if (f <= k.y * h.gnormx - k.x * h.gnormy) return m =
						a.circle.radius, e = k.x - a.circle.worldCOMx, f = k.y - a.circle.worldCOMy, g = e * e + f * f, g > m * m ? m = null : g < n.epsilon * n.epsilon ? m = c.injectContact(a.circle.worldCOMx, a.circle.worldCOMy, 1, 0, -m, 0, null) : (g = 1 / Math.sqrt(g), p = g < n.epsilon ? 1e+100 : 1 / g, l = .5 + (a.circle.radius - .5 * m) * g, m = d ? c.injectContact(a.circle.worldCOMx + e * l, a.circle.worldCOMy + f * l, -e * g, -f * g, p - m, 0, null) : c.injectContact(a.circle.worldCOMx + e * l, a.circle.worldCOMy + f * l, e * g, f * g, p - m, 0, null)), null != m && (e = m.inner, c.ptype = 2, f = k.x - b.polygon.body.posx, k = k.y - b.polygon.body.posy,
							c.__ref_edge1 = h, c.__ref_vertex = -1, d ? (e.lr1x = f * b.polygon.body.axisy + k * b.polygon.body.axisx, e.lr1y = k * b.polygon.body.axisy - f * b.polygon.body.axisx, e.lr2x = a.circle.localCOMx, e.lr2y = a.circle.localCOMy) : (e.lr2x = f * b.polygon.body.axisy + k * b.polygon.body.axisx, e.lr2y = k * b.polygon.body.axisy - f * b.polygon.body.axisx, e.lr1x = a.circle.localCOMx, e.lr1y = a.circle.localCOMy), c.radius = a.circle.radius), null != m;
					if (f >= e.y * h.gnormx - e.x * h.gnormy) return m = a.circle.radius, k = e.x - a.circle.worldCOMx, f = e.y - a.circle.worldCOMy, g = k *
						k + f * f, g > m * m ? m = null : g < n.epsilon * n.epsilon ? m = c.injectContact(a.circle.worldCOMx, a.circle.worldCOMy, 1, 0, -m, 0, null) : (g = 1 / Math.sqrt(g), p = g < n.epsilon ? 1e+100 : 1 / g, l = .5 + (a.circle.radius - .5 * m) * g, m = d ? c.injectContact(a.circle.worldCOMx + k * l, a.circle.worldCOMy + f * l, -k * g, -f * g, p - m, 0, null) : c.injectContact(a.circle.worldCOMx + k * l, a.circle.worldCOMy + f * l, k * g, f * g, p - m, 0, null)), null != m && (k = m.inner, c.ptype = 2, f = e.x - b.polygon.body.posx, e = e.y - b.polygon.body.posy, c.__ref_edge1 = h, c.__ref_vertex = 1, d ? (k.lr1x = f * b.polygon.body.axisy +
							e * b.polygon.body.axisx, k.lr1y = e * b.polygon.body.axisy - f * b.polygon.body.axisx, k.lr2x = a.circle.localCOMx, k.lr2y = a.circle.localCOMy) : (k.lr2x = f * b.polygon.body.axisy + e * b.polygon.body.axisx, k.lr2y = e * b.polygon.body.axisy - f * b.polygon.body.axisx, k.lr1x = a.circle.localCOMx, k.lr1y = a.circle.localCOMy), c.radius = a.circle.radius), null != m;
					k = a.circle.radius + .5 * m;
					b = h.gnormx * k;
					k *= h.gnormy;
					b = a.circle.worldCOMx - b;
					k = a.circle.worldCOMy - k;
					b = d ? c.injectContact(b, k, h.gnormx, h.gnormy, m, 0, null) : c.injectContact(b, k, -h.gnormx, -h.gnormy,
						m, 0, null);
					c.ptype = d ? 0 : 1;
					c.lnormx = h.lnormx;
					c.lnormy = h.lnormy;
					c.rev = !d;
					c.lproj = h.lprojection;
					c.radius = a.circle.radius;
					b.inner.lr1x = a.circle.localCOMx;
					b.inner.lr1y = a.circle.localCOMy;
					c.__ref_edge1 = h;
					c.__ref_vertex = 0;
					return !0
				}
			}
		else if (h = a.circle.radius + b.circle.radius, m = b.circle.worldCOMx - a.circle.worldCOMx, k = b.circle.worldCOMy - a.circle.worldCOMy, e = m * m + k * k, e > h * h ? h = null : e < n.epsilon * n.epsilon ? h = c.injectContact(a.circle.worldCOMx, a.circle.worldCOMy, 1, 0, -h, 0, null) : (e = 1 / Math.sqrt(e), f = e < n.epsilon ? 1e+100 : 1 /
				e, g = .5 + (a.circle.radius - .5 * h) * e, h = d ? c.injectContact(a.circle.worldCOMx + m * g, a.circle.worldCOMy + k * g, -m * e, -k * e, f - h, 0, null) : c.injectContact(a.circle.worldCOMx + m * g, a.circle.worldCOMy + k * g, m * e, k * e, f - h, 0, null)), null != h) return h = h.inner, d ? (h.lr1x = b.circle.localCOMx, h.lr1y = b.circle.localCOMy, h.lr2x = a.circle.localCOMx, h.lr2y = a.circle.localCOMy) : (h.lr1x = a.circle.localCOMx, h.lr1y = a.circle.localCOMy, h.lr2x = b.circle.localCOMx, h.lr2y = b.circle.localCOMy), c.radius = a.circle.radius + b.circle.radius, c.ptype = 2, !0;
		return !1
	};
	q.testCollide_safe = function(a, b) {
		if (0 == b.type) {
			var c = a;
			a = b;
			b = c
		}
		return q.testCollide(a, b)
	};
	q.testCollide = function(a, b) {
		if (1 == b.type) {
			if (1 == a.type) {
				for (var c = !0, d = a.polygon.edges.head; null != d;) {
					for (var e = d.elt, f = 1e+100, h = b.polygon.gverts.next; null != h;) {
						var m = h;
						m = e.gnormx * m.x + e.gnormy * m.y;
						m < f && (f = m);
						h = h.next
					}
					f -= e.gprojection;
					if (0 < f) {
						c = !1;
						break
					}
					d = d.next
				}
				if (c) {
					for (b = b.polygon.edges.head; null != b;) {
						d = b.elt;
						e = 1e+100;
						for (f = a.polygon.gverts.next; null != f;) h = f, h = d.gnormx * h.x + d.gnormy * h.y, h < e && (e = h), f = f.next;
						e -= d.gprojection;
						if (0 < e) {
							c = !1;
							break
						}
						b = b.next
					}
					return c
				}
			} else {
				d = c = null;
				e = !0;
				f = -1e+100;
				h = b.polygon.gverts.next;
				for (m = b.polygon.edges.head; null != m;) {
					var k = m.elt,
						g = k.gnormx * a.circle.worldCOMx + k.gnormy * a.circle.worldCOMy - k.gprojection - a.circle.radius;
					if (0 < g) {
						e = !1;
						break
					}
					g > f && (f = g, c = k, d = h);
					h = h.next;
					m = m.next
				}
				if (e) return e = d, b = null == d.next ? b.polygon.gverts.next : d.next, d = a.circle.worldCOMy * c.gnormx - a.circle.worldCOMx * c.gnormy, d <= e.y * c.gnormx - e.x * c.gnormy ? (b = a.circle.radius, c = e.x - a.circle.worldCOMx, a = e.y - a.circle.worldCOMy,
					c * c + a * a <= b * b) : d >= b.y * c.gnormx - b.x * c.gnormy ? (c = a.circle.radius, d = b.x - a.circle.worldCOMx, a = b.y - a.circle.worldCOMy, d * d + a * a <= c * c) : !0
			}
			return !1
		}
		c = a.circle.radius + b.circle.radius;
		d = b.circle.worldCOMx - a.circle.worldCOMx;
		a = b.circle.worldCOMy - a.circle.worldCOMy;
		return d * d + a * a <= c * c
	};
	q.flowCollide = function(a, b, c) {
		if (1 == b.type) {
			if (1 == a.type) {
				for (var d = [], e = [], f = !0, h = !0, m = a.polygon.edges.head; null != m;) {
					for (var k = m.elt, g = 1e+100, p = 0, l = b.polygon.gverts.next; null != l;) {
						var C = l,
							Q = k.gnormx * C.x + k.gnormy * C.y;
						Q < g && (g = Q);
						Q >= k.gprojection + n.epsilon && (e[p] = !0, h = !1);
						p++;
						l = l.next
					}
					g -= k.gprojection;
					if (0 < g) {
						f = !1;
						break
					}
					m = m.next
				}
				if (h) return b.polygon.validate_worldCOM(), c.overlap = b.polygon.area, c.centroidx = b.polygon.worldCOMx, c.centroidy = b.polygon.worldCOMy, null, !0;
				if (f) {
					h = !0;
					for (var r = b.polygon.edges.head; null != r;) {
						for (var v = r.elt, u = 1e+100, y = 0, x = a.polygon.gverts.next; null != x;) {
							var w = x,
								A = v.gnormx * w.x + v.gnormy * w.y;
							A < u && (u = A);
							A >= v.gprojection + n.epsilon && (d[y] = !0, h = !1);
							y++;
							x = x.next
						}
						u -= v.gprojection;
						if (0 < u) {
							f = !1;
							break
						}
						r = r.next
					}
					if (h) return a.polygon.validate_worldCOM(),
						c.overlap = a.polygon.area, c.centroidx = a.polygon.worldCOMx, c.centroidy = a.polygon.worldCOMy, null, !0;
					if (f) {
						for (; null != q.flowpoly.head;) {
							var H = q.flowpoly.pop_unsafe();
							if (!H._inuse) {
								var E = H;
								null != E.outer && (E.outer.zpp_inner = null, E.outer = null);
								E._isimmutable = null;
								E._validate = null;
								E._invalidate = null;
								E.next = N.zpp_pool;
								N.zpp_pool = E
							}
						}
						for (var Sa = null, G = !1, B = a.polygon.gverts.next, F = 0, I = b.polygon.gverts.next, D = 0, U = 0, ca = b.polygon.edgeCnt; U < ca;) {
							var L = U++;
							if (e[L]) I = I.next;
							else {
								D = L;
								break
							}
						}
						if (null == I) {
							I = b.polygon.gverts.next;
							G = !0;
							for (var fa = 0, ia = a.polygon.edgeCnt; fa < ia;) {
								var X = fa++;
								if (d[X]) B = B.next;
								else {
									F = X;
									break
								}
							}
							null == B ? B = a.polygon.gverts.next : (q.flowpoly.add(B), Sa = q.flowpoly.head.elt)
						} else q.flowpoly.add(I), Sa = q.flowpoly.head.elt;
						var K = 1;
						if (null == q.flowpoly.head) {
							for (var Z = !0, da = a.polygon.gverts.next, Y = da, S = da.next; null != S;) {
								for (var M = S, ba = 2, T = b.polygon.gverts.next, V = T, na = T.next; null != na;) {
									var ja = na,
										ka = 0;
									(function(a) {
										a = Y.x - V.x;
										var b = Y.y - V.y;
										var c = M.x - Y.x;
										var d = M.y - Y.y;
										var e = ja.x - V.x;
										var f = ja.y - V.y;
										var h = d * e - c * f;
										h *
											h > n.epsilon * n.epsilon ? (h = 1 / h, e = (f * a - e * b) * h, e > n.epsilon && e < 1 - n.epsilon ? (a = (d * a - c * b) * h, a > n.epsilon && a < 1 - n.epsilon ? (ka = e, a = !0) : a = !1) : a = !1) : a = !1;
										return a
									})(this) && ka < ba && (ba = ka, I = T);
									T = na;
									V = ja;
									na = na.next
								}
								var $b = na = b.polygon.gverts.next,
									R = 0;
								(function(a) {
									a = Y.x - V.x;
									var b = Y.y - V.y;
									var c = M.x - Y.x;
									var d = M.y - Y.y;
									var e = $b.x - V.x;
									var f = $b.y - V.y;
									var h = d * e - c * f;
									h * h > n.epsilon * n.epsilon ? (h = 1 / h, e = (f * a - e * b) * h, e > n.epsilon && e < 1 - n.epsilon ? (a = (d * a - c * b) * h, a > n.epsilon && a < 1 - n.epsilon ? (R = e, a = !0) : a = !1) : a = !1) : a = !1;
									return a
								})(this) &&
								R < ba && (ba = R, I = T);
								if (2 != ba) {
									var Ga = 0,
										t = 0,
										va = ba;
									Ga = Y.x + (M.x - Y.x) * va;
									t = Y.y + (M.y - Y.y) * va;
									Sa = N.get(Ga, t, null);
									q.flowpoly.add(Sa);
									G = !0;
									B = da;
									Z = !1;
									break
								}
								da = S;
								Y = M;
								S = S.next
							}
							if (Z) {
								for (var pa = S = a.polygon.gverts.next, ce = 2, ea = b.polygon.gverts.next, W = ea, P = ea.next; null != P;) {
									var za = P,
										J = 0;
									(function(a) {
										a = Y.x - W.x;
										var b = Y.y - W.y;
										var c = pa.x - Y.x;
										var d = pa.y - Y.y;
										var e = za.x - W.x;
										var f = za.y - W.y;
										var h = d * e - c * f;
										h * h > n.epsilon * n.epsilon ? (h = 1 / h, e = (f * a - e * b) * h, e > n.epsilon && e < 1 - n.epsilon ? (a = (d * a - c * b) * h, a > n.epsilon && a < 1 - n.epsilon ? (J = e,
											a = !0) : a = !1) : a = !1) : a = !1;
										return a
									})(this) && J < ce && (ce = J, I = ea);
									ea = P;
									W = za;
									P = P.next
								}
								var Da = P = b.polygon.gverts.next,
									Za = 0;
								(function(a) {
									a = Y.x - W.x;
									var b = Y.y - W.y;
									var c = pa.x - Y.x;
									var d = pa.y - Y.y;
									var e = Da.x - W.x;
									var f = Da.y - W.y;
									var h = d * e - c * f;
									h * h > n.epsilon * n.epsilon ? (h = 1 / h, e = (f * a - e * b) * h, e > n.epsilon && e < 1 - n.epsilon ? (a = (d * a - c * b) * h, a > n.epsilon && a < 1 - n.epsilon ? (Za = e, a = !0) : a = !1) : a = !1) : a = !1;
									return a
								})(this) && Za < ce && (ce = Za, I = ea);
								if (2 != ce) {
									var ma = 0,
										ra = 0,
										ta = ce;
									ma = Y.x + (pa.x - Y.x) * ta;
									ra = Y.y + (pa.y - Y.y) * ta;
									Sa = N.get(ma, ra, null);
									q.flowpoly.add(Sa);
									G = !0;
									B = da
								}
							}
							K = 2
						}
						for (;;)
							if (G)
								if (B = B.next, F++, null == B && (B = a.polygon.gverts.next, F = 0), d[F]) {
									var oa = q.flowpoly.head.elt,
										pb = B,
										Rc = I,
										qb = I.next;
									null == qb && (qb = b.polygon.gverts.next);
									var yb = -1,
										Pb = null,
										ve = 0,
										Ae = 0,
										we = qb,
										Ka = qb;
									do {
										var hb = Ka,
											aa = 0;
										if (function(a) {
												a = Rc.x - oa.x;
												var b = Rc.y - oa.y;
												var c = hb.x - Rc.x;
												var d = hb.y - Rc.y;
												var e = pb.x - oa.x;
												var f = pb.y - oa.y;
												var h = d * e - c * f;
												h * h > n.epsilon * n.epsilon ? (h = 1 / h, e = (f * a - e * b) * h, e > n.epsilon && e < 1 - n.epsilon ? (a = (d * a - c * b) * h, a > n.epsilon && a < 1 - n.epsilon ? (aa = e, a = !0) : a = !1) : a = !1) : a = !1;
												return a
											}(this) &&
											aa >= yb)
											if (Pb = I, ve = D, ++Ae == K) {
												yb = aa;
												Ka = we;
												break
											} else yb = aa;
										Rc = hb;
										I = Ka;
										D++;
										D >= b.polygon.edgeCnt && (D = 0);
										Ka = Ka.next;
										null == Ka && (Ka = b.polygon.gverts.next)
									} while (0);
									for (; Ka != we;) {
										var Fa = Ka,
											eb = 0;
										if (function(a) {
												a = Rc.x - oa.x;
												var b = Rc.y - oa.y;
												var c = Fa.x - Rc.x;
												var d = Fa.y - Rc.y;
												var e = pb.x - oa.x;
												var f = pb.y - oa.y;
												var h = d * e - c * f;
												h * h > n.epsilon * n.epsilon ? (h = 1 / h, e = (f * a - e * b) * h, e > n.epsilon && e < 1 - n.epsilon ? (a = (d * a - c * b) * h, a > n.epsilon && a < 1 - n.epsilon ? (eb = e, a = !0) : a = !1) : a = !1) : a = !1;
												return a
											}(this) && eb >= yb)
											if (Pb = I, ve = D, ++Ae == K) {
												yb = eb;
												Ka = we;
												break
											} else yb = eb;
										Rc = Fa;
										I = Ka;
										D++;
										D >= b.polygon.edgeCnt && (D = 0);
										Ka = Ka.next;
										null == Ka && (Ka = b.polygon.gverts.next)
									}
									if (null == Pb) break;
									var qe = Pb,
										ha = Pb.next;
									null == ha && (ha = b.polygon.gverts.next);
									var z = ha,
										qa = 0,
										Pa = 0,
										Qa = yb;
									qa = qe.x + (z.x - qe.x) * Qa;
									Pa = qe.y + (z.y - qe.y) * Qa;
									if (null != Sa && ob.vec_dsq(qa, Pa, Sa.x, Sa.y) < n.epsilon) break;
									q.flowpoly.add(N.get(qa, Pa, null));
									null == Sa && (Sa = q.flowpoly.head.elt);
									I = Pb;
									D = ve;
									G = !G;
									K = 2
								} else {
									var Ea = B;
									if (null != Sa && ob.vec_dsq(Ea.x, Ea.y, Sa.x, Sa.y) < n.epsilon) break;
									q.flowpoly.add(Ea);
									null ==
										Sa && (Sa = q.flowpoly.head.elt);
									K = 1
								}
						else if (I = I.next, D++, null == I && (I = b.polygon.gverts.next, D = 0), e[D]) {
							var xd = q.flowpoly.head.elt,
								Ra = I,
								Sc = B,
								Ba = B.next;
							null == Ba && (Ba = a.polygon.gverts.next);
							var Sd = -1,
								la = null,
								bb = 0,
								Ma = 0,
								xa = Ba,
								ib = Ba;
							do {
								var ab = ib,
									wa = 0;
								if (function(a) {
										a = Sc.x - xd.x;
										var b = Sc.y - xd.y;
										var c = ab.x - Sc.x;
										var d = ab.y - Sc.y;
										var e = Ra.x - xd.x;
										var f = Ra.y - xd.y;
										var h = d * e - c * f;
										h * h > n.epsilon * n.epsilon ? (h = 1 / h, e = (f * a - e * b) * h, e > n.epsilon && e < 1 - n.epsilon ? (a = (d * a - c * b) * h, a > n.epsilon && a < 1 - n.epsilon ? (wa = e, a = !0) : a = !1) : a = !1) : a = !1;
										return a
									}(this) && wa >= Sd)
									if (la = B, bb = F, ++Ma == K) {
										Sd = wa;
										ib = xa;
										break
									} else Sd = wa;
								Sc = ab;
								B = ib;
								F++;
								F >= a.polygon.edgeCnt && (F = 0);
								ib = ib.next;
								null == ib && (ib = a.polygon.gverts.next)
							} while (0);
							for (; ib != xa;) {
								var Oa = ib,
									Ca = 0;
								if (function(a) {
										a = Sc.x - xd.x;
										var b = Sc.y - xd.y;
										var c = Oa.x - Sc.x;
										var d = Oa.y - Sc.y;
										var e = Ra.x - xd.x;
										var f = Ra.y - xd.y;
										var h = d * e - c * f;
										h * h > n.epsilon * n.epsilon ? (h = 1 / h, e = (f * a - e * b) * h, e > n.epsilon && e < 1 - n.epsilon ? (a = (d * a - c * b) * h, a > n.epsilon && a < 1 - n.epsilon ? (Ca = e, a = !0) : a = !1) : a = !1) : a = !1;
										return a
									}(this) && Ca >= Sd)
									if (la =
										B, bb = F, ++Ma == K) {
										Sd = Ca;
										ib = xa;
										break
									} else Sd = Ca;
								Sc = Oa;
								B = ib;
								F++;
								F >= a.polygon.edgeCnt && (F = 0);
								ib = ib.next;
								null == ib && (ib = a.polygon.gverts.next)
							}
							if (null == la) break;
							var re = la,
								xe = la.next;
							null == xe && (xe = a.polygon.gverts.next);
							var fb = xe,
								Tc = 0,
								Uc = 0,
								lb = Sd;
							Tc = re.x + (fb.x - re.x) * lb;
							Uc = re.y + (fb.y - re.y) * lb;
							if (null != Sa && ob.vec_dsq(Tc, Uc, Sa.x, Sa.y) < n.epsilon) break;
							q.flowpoly.add(N.get(Tc, Uc, null));
							null == Sa && (Sa = q.flowpoly.head.elt);
							B = la;
							F = bb;
							G = !G;
							K = 2
						} else {
							var Ja = I;
							if (null != Sa && ob.vec_dsq(Ja.x, Ja.y, Sa.x, Sa.y) < n.epsilon) break;
							q.flowpoly.add(Ja);
							null == Sa && (Sa = q.flowpoly.head.elt);
							K = 1
						}
						if (null != q.flowpoly.head && null != q.flowpoly.head.next && null != q.flowpoly.head.next.next) {
							var Aa = 0,
								Ha = 0,
								ya = 0;
							Aa = ya = Ha = 0;
							var vb = q.flowpoly.head,
								Va = vb.elt;
							vb = vb.next;
							var jb = vb.elt;
							for (vb = vb.next; null != vb;) {
								var Ia = vb.elt;
								Aa += jb.x * (Ia.y - Va.y);
								var Eb = Ia.y * jb.x - Ia.x * jb.y;
								Ha += (jb.x + Ia.x) * Eb;
								ya += (jb.y + Ia.y) * Eb;
								Va = jb;
								jb = Ia;
								vb = vb.next
							}
							vb = q.flowpoly.head;
							var Wa = vb.elt;
							Aa += jb.x * (Wa.y - Va.y);
							var Fb = Wa.y * jb.x - Wa.x * jb.y;
							Ha += (jb.x + Wa.x) * Fb;
							ya += (jb.y + Wa.y) * Fb;
							Va = jb;
							jb = Wa;
							vb = vb.next;
							var db = vb.elt;
							Aa += jb.x * (db.y - Va.y);
							var Gb = db.y * jb.x - db.x * jb.y;
							Ha += (jb.x + db.x) * Gb;
							ya += (jb.y + db.y) * Gb;
							Aa *= .5;
							var Hb = 1 / (6 * Aa);
							Ha *= Hb;
							ya *= Hb;
							c.overlap = -Aa;
							c.centroidx = Ha;
							c.centroidy = ya;
							null;
							return !0
						}
					}
				}
				return !1
			}
			for (var Xa = [], Ib = !0, sa = null, Ya = null, Kb = -1e+100, Mb = !0, nb = b.polygon.gverts.next, Ob = 0, kb = b.polygon.edges.head; null != kb;) {
				var Ta = kb.elt,
					La = Ta.gnormx * a.circle.worldCOMx + Ta.gnormy * a.circle.worldCOMy;
				if (La > Ta.gprojection + a.circle.radius) {
					Mb = !1;
					break
				} else La + a.circle.radius > Ta.gprojection +
					n.epsilon && (Ib = !1, Xa[Ob] = !0);
				La -= Ta.gprojection + a.circle.radius;
				La > Kb && (Kb = La, sa = Ta, Ya = nb);
				nb = nb.next;
				Ob++;
				kb = kb.next
			}
			if (Mb) {
				if (Ib) return c.overlap = a.circle.area, c.centroidx = a.circle.worldCOMx, c.centroidy = a.circle.worldCOMy, null, !0;
				var Ua = Ya;
				var cb = null == Ya.next ? b.polygon.gverts.next : Ya.next;
				var Rb = a.circle.worldCOMy * sa.gnormx - a.circle.worldCOMx * sa.gnormy;
				if (Rb <= Ua.y * sa.gnormx - Ua.x * sa.gnormy ? function(b) {
						b = a.circle.radius;
						var c = Ua.x - a.circle.worldCOMx;
						var d = Ua.y - a.circle.worldCOMy;
						return c * c + d * d <=
							b * b
					}(this) : Rb >= cb.y * sa.gnormx - cb.x * sa.gnormy ? function(b) {
						b = a.circle.radius;
						var c = cb.x - a.circle.worldCOMx;
						var d = cb.y - a.circle.worldCOMy;
						return c * c + d * d <= b * b
					}(this) : 1) {
					for (var gb = [], Bb = 0, Sb = !0, xb = null, wc = 0, mb = b.polygon.gverts.next; null != mb;) {
						var Ub = mb,
							gc = ob.vec_dsq(Ub.x, Ub.y, a.circle.worldCOMx, a.circle.worldCOMy);
						(gb[Bb] = gc <= a.circle.radius * a.circle.radius) ? (wc = Bb, xb = mb) : Sb = !1;
						Bb++;
						mb = mb.next
					}
					if (Sb) return b.polygon.validate_worldCOM(), c.overlap = b.polygon.area, c.centroidx = b.polygon.worldCOMx, c.centroidy =
						b.polygon.worldCOMy, null, !0;
					for (; null != q.flowpoly.head;) {
						var Yb = q.flowpoly.pop_unsafe();
						if (!Yb._inuse) {
							var ua = Yb;
							null != ua.outer && (ua.outer.zpp_inner = null, ua.outer = null);
							ua._isimmutable = null;
							ua._validate = null;
							ua._invalidate = null;
							ua.next = N.zpp_pool;
							N.zpp_pool = ua
						}
					}
					q.flowsegs.clear();
					var rb = null,
						jc = 1;
					null == xb ? (xb = b.polygon.gverts.next, jc = 2) : q.flowpoly.add(rb = xb);
					for (; 0 != jc;)
						if (1 == jc)
							if (xb = xb.next, null == xb && (xb = b.polygon.gverts.next), wc++, wc >= b.polygon.edgeCnt && (wc = 0), gb[wc]) {
								if (ob.vec_dsq(rb.x, rb.y, xb.x,
										xb.y) < n.epsilon) break;
								q.flowpoly.add(xb)
							} else {
								var Na = q.flowpoly.head.elt,
									Cb = xb,
									Db = 0,
									Jb = 0;
								Db = Cb.x - Na.x;
								Jb = Cb.y - Na.y;
								var Lb = 0,
									Nb = 0;
								Lb = Na.x - a.circle.worldCOMx;
								Nb = Na.y - a.circle.worldCOMy;
								var Ab = Db * Db + Jb * Jb,
									Qb = 2 * (Lb * Db + Nb * Jb),
									lc = Math.sqrt(Qb * Qb - 4 * Ab * (Lb * Lb + Nb * Nb - a.circle.radius * a.circle.radius));
								Ab = 1 / (2 * Ab);
								var mc = (-Qb - lc) * Ab,
									ec = 0,
									hc = 0,
									vc = mc < n.epsilon ? (-Qb + lc) * Ab : mc;
								ec = Na.x + (Cb.x - Na.x) * vc;
								hc = Na.y + (Cb.y - Na.y) * vc;
								if (ob.vec_dsq(rb.x, rb.y, ec, hc) < n.epsilon) break;
								q.flowpoly.add(N.get(ec, hc, null));
								jc = 2
							}
					else if (2 ==
						jc) {
						var Wb = xb.next;
						null == Wb && (Wb = b.polygon.gverts.next);
						var O = xb;
						jc = 0;
						var $a = Wb,
							sb = Wb;
						do {
							var xc = sb,
								Xb = wc + 1;
							Xb == b.polygon.edgeCnt && (Xb = 0);
							if (Xa[wc])
								if (gb[Xb]) {
									var Zb = 0,
										ac = 0;
									Zb = xc.x - O.x;
									ac = xc.y - O.y;
									var bc = 0,
										cc = 0;
									bc = O.x - a.circle.worldCOMx;
									cc = O.y - a.circle.worldCOMy;
									var Tb = Zb * Zb + ac * ac,
										dc = 2 * (bc * Zb + cc * ac),
										Ec = Math.sqrt(dc * dc - 4 * Tb * (bc * bc + cc * cc - a.circle.radius * a.circle.radius));
									Tb = 1 / (2 * Tb);
									var Fc = (-dc - Ec) * Tb,
										sc = 0,
										tc = 0,
										Hc = Fc < n.epsilon ? (-dc + Ec) * Tb : Fc;
									sc = O.x + (xc.x - O.x) * Hc;
									tc = O.y + (xc.y - O.y) * Hc;
									if (ob.vec_dsq(rb.x,
											rb.y, sc, tc) < n.epsilon) {
										jc = 0;
										sb = $a;
										break
									}
									var Nc = N.get(sc, tc, null);
									q.flowsegs.add(q.flowpoly.head.elt);
									q.flowsegs.add(Nc);
									q.flowpoly.add(Nc);
									jc = 1;
									sb = $a;
									break
								} else {
									var ic = 0,
										kc = 0,
										nc = 0,
										oc = 0;
									nc = xc.x - O.x;
									oc = xc.y - O.y;
									var pc = 0,
										rc = 0;
									pc = O.x - a.circle.worldCOMx;
									rc = O.y - a.circle.worldCOMy;
									var Vb = nc * nc + oc * oc,
										fc = 2 * (pc * nc + rc * oc),
										Td = fc * fc - 4 * Vb * (pc * pc + rc * rc - a.circle.radius * a.circle.radius);
									if (Td * Td < n.epsilon) {
										ic = 0 > Td ? 10 : kc = -fc / (2 * Vb);
										var ad = !1
									} else Td = Math.sqrt(Td), Vb = 1 / (2 * Vb), ic = (-fc - Td) * Vb, kc = (-fc + Td) * Vb, ad = !0;
									if (ic <
										1 - n.epsilon && kc > n.epsilon) {
										var Pc = 0,
											Qc = 0,
											ed = ic;
										Pc = O.x + (xc.x - O.x) * ed;
										Qc = O.y + (xc.y - O.y) * ed;
										if (null != rb && ob.vec_dsq(rb.x, rb.y, Pc, Qc) < n.epsilon) {
											jc = 0;
											sb = $a;
											break
										}
										var hd = N.get(Pc, Qc, null);
										null != q.flowpoly.head && (q.flowsegs.add(q.flowpoly.head.elt), q.flowsegs.add(hd));
										q.flowpoly.add(hd);
										null == rb && (rb = q.flowpoly.head.elt);
										if (ad) {
											var id = 0,
												jd = 0,
												kd = kc;
											id = O.x + (xc.x - O.x) * kd;
											jd = O.y + (xc.y - O.y) * kd;
											q.flowpoly.add(N.get(id, jd, null))
										}
									}
								}
							O = xc;
							xb = sb;
							wc = Xb;
							sb = sb.next;
							null == sb && (sb = b.polygon.gverts.next)
						} while (0);
						for (; sb !=
							$a;) {
							var yc = sb,
								zc = wc + 1;
							zc == b.polygon.edgeCnt && (zc = 0);
							if (Xa[wc])
								if (gb[zc]) {
									var Ac = 0,
										Bc = 0;
									Ac = yc.x - O.x;
									Bc = yc.y - O.y;
									var Cc = 0,
										Dc = 0;
									Cc = O.x - a.circle.worldCOMx;
									Dc = O.y - a.circle.worldCOMy;
									var qc = Ac * Ac + Bc * Bc,
										Gc = 2 * (Cc * Ac + Dc * Bc),
										pd = Math.sqrt(Gc * Gc - 4 * qc * (Cc * Cc + Dc * Dc - a.circle.radius * a.circle.radius));
									qc = 1 / (2 * qc);
									var qd = (-Gc - pd) * qc,
										Xc = 0,
										Yc = 0,
										rd = qd < n.epsilon ? (-Gc + pd) * qc : qd;
									Xc = O.x + (yc.x - O.x) * rd;
									Yc = O.y + (yc.y - O.y) * rd;
									if (ob.vec_dsq(rb.x, rb.y, Xc, Yc) < n.epsilon) {
										jc = 0;
										sb = $a;
										break
									}
									var sd = N.get(Xc, Yc, null);
									q.flowsegs.add(q.flowpoly.head.elt);
									q.flowsegs.add(sd);
									q.flowpoly.add(sd);
									jc = 1;
									sb = $a;
									break
								} else {
									var Ic = 0,
										Jc = 0,
										Kc = 0,
										Lc = 0;
									Kc = yc.x - O.x;
									Lc = yc.y - O.y;
									var Mc = 0,
										Oc = 0;
									Mc = O.x - a.circle.worldCOMx;
									Oc = O.y - a.circle.worldCOMy;
									var de = Kc * Kc + Lc * Lc,
										uc = 2 * (Mc * Kc + Oc * Lc),
										Ud = uc * uc - 4 * de * (Mc * Mc + Oc * Oc - a.circle.radius * a.circle.radius);
									if (Ud * Ud < n.epsilon) {
										Ic = 0 > Ud ? 10 : Jc = -uc / (2 * de);
										var td = !1
									} else Ud = Math.sqrt(Ud), de = 1 / (2 * de), Ic = (-uc - Ud) * de, Jc = (-uc + Ud) * de, td = !0;
									if (Ic < 1 - n.epsilon && Jc > n.epsilon) {
										var bd = 0,
											fd = 0,
											ud = Ic;
										bd = O.x + (yc.x - O.x) * ud;
										fd = O.y + (yc.y - O.y) * ud;
										if (null !=
											rb && ob.vec_dsq(rb.x, rb.y, bd, fd) < n.epsilon) {
											jc = 0;
											sb = $a;
											break
										}
										var wd = N.get(bd, fd, null);
										null != q.flowpoly.head && (q.flowsegs.add(q.flowpoly.head.elt), q.flowsegs.add(wd));
										q.flowpoly.add(wd);
										null == rb && (rb = q.flowpoly.head.elt);
										if (td) {
											var Bd = 0,
												Dd = 0,
												Ed = Jc;
											Bd = O.x + (yc.x - O.x) * Ed;
											Dd = O.y + (yc.y - O.y) * Ed;
											q.flowpoly.add(N.get(Bd, Dd, null))
										}
									}
								}
							O = yc;
							xb = sb;
							wc = zc;
							sb = sb.next;
							null == sb && (sb = b.polygon.gverts.next)
						}
					}
					if (null == q.flowpoly.head) return !1;
					if (null == q.flowpoly.head.next) {
						for (var Fd = !0, Vc = b.polygon.edges.head; null != Vc;) {
							var od =
								Vc.elt;
							if (od.gnormx * a.circle.worldCOMx + od.gnormy * a.circle.worldCOMy > od.gprojection) {
								Fd = !1;
								break
							}
							Vc = Vc.next
						}
						return Fd ? (c.overlap = a.circle.area, c.centroidx = a.circle.worldCOMx, c.centroidy = a.circle.worldCOMy, null, !0) : !1
					}
					var Wc = 0,
						Zc = 0,
						$c = 0;
					if (null != q.flowpoly.head.next.next) {
						var yd = 0,
							ee = 0,
							fe = 0;
						yd = fe = ee = 0;
						var zb = q.flowpoly.head,
							le = zb.elt;
						zb = zb.next;
						var tb = zb.elt;
						for (zb = zb.next; null != zb;) {
							var ge = zb.elt;
							yd += tb.x * (ge.y - le.y);
							var Hd = ge.y * tb.x - ge.x * tb.y;
							ee += (tb.x + ge.x) * Hd;
							fe += (tb.y + ge.y) * Hd;
							le = tb;
							tb = ge;
							zb = zb.next
						}
						zb =
							q.flowpoly.head;
						var he = zb.elt;
						yd += tb.x * (he.y - le.y);
						var Id = he.y * tb.x - he.x * tb.y;
						ee += (tb.x + he.x) * Id;
						fe += (tb.y + he.y) * Id;
						le = tb;
						tb = he;
						zb = zb.next;
						var me = zb.elt;
						yd += tb.x * (me.y - le.y);
						var Jd = me.y * tb.x - me.x * tb.y;
						ee += (tb.x + me.x) * Jd;
						fe += (tb.y + me.y) * Jd;
						yd *= .5;
						var Kd = 1 / (6 * yd);
						ee *= Kd;
						fe *= Kd;
						var Ld = -yd;
						Wc += ee * Ld;
						Zc += fe * Ld;
						$c -= yd
					} else q.flowsegs.add(q.flowpoly.head.elt), q.flowsegs.add(q.flowpoly.head.next.elt);
					for (; null != q.flowsegs.head;) {
						var cd = q.flowsegs.pop_unsafe(),
							dd = q.flowsegs.pop_unsafe(),
							Md = 0,
							Nd = 0;
						Md = dd.x -
							cd.x;
						Nd = dd.y - cd.y;
						var zd = 0,
							Ad = 0;
						zd = Md;
						Ad = Nd;
						var Od = 1 / Math.sqrt(zd * zd + Ad * Ad);
						zd *= Od;
						Ad *= Od;
						var be = zd;
						zd = -Ad;
						Ad = be;
						var Vd = 0,
							Wd = 0;
						Vd = cd.x + dd.x;
						Wd = cd.y + dd.y;
						Vd *= .5;
						Wd *= .5;
						Vd -= 1 * a.circle.worldCOMx;
						Wd -= 1 * a.circle.worldCOMy;
						var vd = 0,
							Pd = 0,
							Qd = zd * Vd + Ad * Wd,
							gd = Qd / a.circle.radius,
							ne = Math.sqrt(1 - gd * gd),
							Rd = Math.acos(gd);
						vd = a.circle.radius * (a.circle.radius * Rd - Qd * ne);
						Pd = .6666666666666666 * a.circle.radius * ne * ne * ne / (Rd - gd * ne);
						Vd = a.circle.worldCOMx;
						Wd = a.circle.worldCOMy;
						var Xd = Pd;
						Vd += zd * Xd;
						Wd += Ad * Xd;
						var Yd = vd;
						Wc += Vd *
							Yd;
						Zc += Wd * Yd;
						$c += vd
					}
					var Zd = 1 / $c;
					Wc *= Zd;
					Zc *= Zd;
					c.overlap = $c;
					c.centroidx = Wc;
					c.centroidy = Zc;
					null;
					return !0
				}
			}
			return !1
		}
		var ub = a.circle,
			wb = b.circle,
			ld = 0,
			md = 0;
		ld = wb.worldCOMx - ub.worldCOMx;
		md = wb.worldCOMy - ub.worldCOMy;
		var $d = ub.radius + wb.radius,
			Cd = ld * ld + md * md;
		if (Cd > $d * $d) return !1;
		if (Cd < n.epsilon * n.epsilon) ub.radius < wb.radius ? (c.overlap = ub.area, c.centroidx = ub.worldCOMx, c.centroidy = ub.worldCOMy) : (c.overlap = wb.area, c.centroidx = wb.worldCOMx, c.centroidy = wb.worldCOMy);
		else {
			var nd = Math.sqrt(Cd),
				ae = 1 / nd,
				se = .5 * (nd -
					(wb.radius * wb.radius - ub.radius * ub.radius) * ae);
			if (se <= -ub.radius) c.overlap = ub.area, c.centroidx = ub.worldCOMx, c.centroidy = ub.worldCOMy;
			else {
				var Gd = nd - se;
				if (Gd <= -wb.radius) c.overlap = wb.area, c.centroidx = wb.worldCOMx, c.centroidy = wb.worldCOMy;
				else {
					var ye = 0,
						ie = 0,
						ze = 0,
						je = 0,
						te = se / ub.radius,
						oe = Math.sqrt(1 - te * te),
						ke = Math.acos(te);
					ye = ub.radius * (ub.radius * ke - se * oe);
					ie = .6666666666666666 * ub.radius * oe * oe * oe / (ke - te * oe);
					var ue = Gd / wb.radius,
						pe = Math.sqrt(1 - ue * ue),
						Be = Math.acos(ue);
					ze = wb.radius * (wb.radius * Be - Gd * pe);
					je =
						.6666666666666666 * wb.radius * pe * pe * pe / (Be - ue * pe);
					var Ce = ye + ze,
						De = (ie * ye + (nd - je) * ze) / Ce * ae;
					c.overlap = Ce;
					c.centroidx = ub.worldCOMx + ld * De;
					c.centroidy = ub.worldCOMy + md * De
				}
			}
		}
		null;
		return !0
	};
	var Ga = function() {
		this.slipped = this.failed = this.kinematic = !1;
		this.c1 = this.c2 = this.axis = null;
		this.frozen1 = this.frozen2 = !1;
		this.s1 = this.s2 = this.arbiter = null;
		this.toi = 0;
		this.next = null;
		this.c1 = new N;
		this.c2 = new N;
		this.axis = new N
	};
	Ga.__name__ = !0;
	Ga.prototype = {
		__class__: Ga
	};
	var Ha = function() {};
	Ha.__name__ = !0;
	Ha.dynamicSweep =
		function(a, b, c, d, e) {
			null == e && (e = !1);
			var f = a.s1,
				h = a.s2,
				m = f.body,
				k = h.body;
			var g = k.velx - m.velx;
			var p = k.vely - m.vely;
			var l = m.angvel;
			0 > l && (l = -l);
			var C = k.angvel;
			0 > C && (C = -C);
			var q = f.sweepCoef * l + h.sweepCoef * C;
			if (!e && !a.kinematic && g * g + p * p < n.dynamicSweepLinearThreshold * n.dynamicSweepLinearThreshold && q < n.dynamicSweepAngularThreshold) a.toi = -1, a.failed = !0;
			else {
				l = a.c1;
				C = a.c2;
				for (var r = a.axis, v = 0;;) {
					m.sweepIntegrate(c * b);
					m.sweepValidate(f);
					k.sweepIntegrate(c * b);
					k.sweepValidate(h);
					var u = Ha.distance(f, h, l, C, r, null) +
						d,
						y = g * r.x + p * r.y;
					if (u < n.distanceThresholdCCD) {
						if (e) break;
						var B = y - m.sweep_angvel * (r.y * (l.x - m.posx) - r.x * (l.y - m.posy)) + k.sweep_angvel * (r.y * (C.x - k.posx) - r.x * (C.y - k.posy));
						0 < B && (a.slipped = !0);
						if (0 >= B || u < .5 * n.distanceThresholdCCD) break
					}
					y = (q - y) * b;
					if (0 >= y) {
						c = -1;
						break
					}
					y = u / y;
					.000001 > y && (y = .000001);
					c += y;
					if (1 <= c) {
						c = 1;
						m.sweepIntegrate(c * b);
						m.sweepValidate(f);
						k.sweepIntegrate(c * b);
						k.sweepValidate(h);
						b = Ha.distance(f, h, l, C, r, null) + d;
						g = g * r.x + p * r.y;
						if (b < n.distanceThresholdCCD) {
							if (e) break;
							e = g - m.sweep_angvel * (r.y * (l.x -
								m.posx) - r.x * (l.y - m.posy)) + k.sweep_angvel * (r.y * (C.x - k.posx) - r.x * (C.y - k.posy));
							0 < e && (a.slipped = !0);
							if (0 >= e || b < .5 * n.distanceThresholdCCD) break
						}
						c = -1;
						break
					}
					if (40 <= ++v) {
						u > d && (a.failed = !0);
						break
					}
				}
				a.toi = c
			}
		};
	Ha.staticSweep = function(a, b, c, d) {
		var e = a.s1,
			f = a.s2,
			h = e.body;
		var m = -h.velx;
		var k = -h.vely;
		var g = h.sweep_angvel;
		0 > g && (g = -g);
		var p = e.sweepCoef * g;
		g = a.c1;
		for (var l = a.c2, C = a.axis, r = 0;;) {
			h.sweepIntegrate(c * b);
			h.sweepValidate(e);
			var q = Ha.distance(e, f, g, l, C, null) + d,
				u = m * C.x + k * C.y;
			if (q < n.distanceThresholdCCD) {
				var v =
					u - h.sweep_angvel * (C.y * (g.x - h.posx) - C.x * (g.y - h.posy));
				0 < v && (a.slipped = !0);
				if (0 >= v || q < .5 * n.distanceThresholdCCD) break
			}
			u = (p - u) * b;
			if (0 >= u) {
				c = -1;
				break
			}
			u = q / u;
			.000001 > u && (u = .000001);
			c += u;
			if (1 <= c) {
				c = 1;
				h.sweepIntegrate(c * b);
				h.sweepValidate(e);
				b = Ha.distance(e, f, g, l, C, null) + d;
				m = m * C.x + k * C.y;
				if (b < n.distanceThresholdCCD && (h = m - h.sweep_angvel * (C.y * (g.x - h.posx) - C.x * (g.y - h.posy)), 0 < h && (a.slipped = !0), 0 >= h || b < .5 * n.distanceThresholdCCD)) break;
				c = -1;
				break
			}
			if (40 <= ++r) {
				q > d && (a.failed = !0);
				break
			}
		}
		a.toi = c
	};
	Ha.distance = function(a,
		b, c, d, e, f) {
		null == f && (f = 1e+100);
		if (0 == a.type && 0 == b.type) {
			var h = a.circle,
				m = b.circle,
				g = 0,
				l = 0;
			g = m.worldCOMx - h.worldCOMx;
			l = m.worldCOMy - h.worldCOMy;
			var p = Math.sqrt(g * g + l * l);
			var q = p - (h.radius + m.radius);
			if (q < f) {
				if (0 == p) g = 1, l = 0;
				else {
					var C = 1 / p;
					g *= C;
					l *= C
				}
				var r = h.radius;
				c.x = h.worldCOMx + g * r;
				c.y = h.worldCOMy + l * r;
				var u = -m.radius;
				d.x = m.worldCOMx + g * u;
				d.y = m.worldCOMy + l * u;
				e.x = g;
				e.y = l
			}
			return q
		}
		var v = !1;
		if (0 == a.type && 1 == b.type) {
			var y = a;
			a = b;
			b = y;
			var B = c;
			c = d;
			d = B;
			v = !0
		}
		if (1 == a.type && 0 == b.type) {
			for (var x = b.circle, w = -1e+100,
					A = null, E = a.polygon.edges.head; null != E;) {
				var F = E.elt,
					D = F.gnormx * x.worldCOMx + F.gnormy * x.worldCOMy - F.gprojection - x.radius;
				if (D > f) {
					w = D;
					break
				}
				0 < D ? D > w && (w = D, A = F) : 0 > w && D > w && (w = D, A = F);
				E = E.next
			}
			if (w < f) {
				var G = A.gp0,
					H = A.gp1,
					N = x.worldCOMy * A.gnormx - x.worldCOMx * A.gnormy;
				if (N <= G.y * A.gnormx - G.x * A.gnormy) {
					var I = 0,
						K = 0;
					I = x.worldCOMx - G.x;
					K = x.worldCOMy - G.y;
					var U = Math.sqrt(I * I + K * K);
					w = U - x.radius;
					if (w < f) {
						if (0 == U) I = 1, K = 0;
						else {
							var V = 1 / U;
							I *= V;
							K *= V
						}
						c.x = G.x + 0 * I;
						c.y = G.y + 0 * K;
						var ca = -x.radius;
						d.x = x.worldCOMx + I * ca;
						d.y = x.worldCOMy +
							K * ca;
						e.x = I;
						e.y = K
					}
				} else if (N >= H.y * A.gnormx - H.x * A.gnormy) {
					var L = 0,
						M = 0;
					L = x.worldCOMx - H.x;
					M = x.worldCOMy - H.y;
					var S = Math.sqrt(L * L + M * M);
					w = S - x.radius;
					if (w < f) {
						if (0 == S) L = 1, M = 0;
						else {
							var da = 1 / S;
							L *= da;
							M *= da
						}
						c.x = H.x + 0 * L;
						c.y = H.y + 0 * M;
						var fa = -x.radius;
						d.x = x.worldCOMx + L * fa;
						d.y = x.worldCOMy + M * fa;
						e.x = L;
						e.y = M
					}
				} else {
					var W = -x.radius;
					d.x = x.worldCOMx + A.gnormx * W;
					d.y = x.worldCOMy + A.gnormy * W;
					var Y = -w;
					c.x = d.x + A.gnormx * Y;
					c.y = d.y + A.gnormy * Y;
					e.x = A.gnormx;
					e.y = A.gnormy
				}
			}
			v && (e.x = -e.x, e.y = -e.y);
			return w
		}
		for (var X = a.polygon, T = b.polygon,
				ba = -1e+100, na = null, ia = null, Z = 0, pa = X.edges.head; null != pa;) {
			for (var oa = pa.elt, $b = 1e+100, ea = T.gverts.next; null != ea;) {
				var P = ea,
					t = oa.gnormx * P.x + oa.gnormy * P.y;
				t < $b && ($b = t);
				ea = ea.next
			}
			$b -= oa.gprojection;
			if ($b > f) {
				ba = $b;
				break
			}
			0 < $b ? $b > ba && (ba = $b, na = oa, Z = 1) : 0 > ba && $b > ba && (ba = $b, na = oa, Z = 1);
			pa = pa.next
		}
		if (ba < f) {
			for (var ja = T.edges.head; null != ja;) {
				for (var ka = ja.elt, R = 1e+100, la = X.gverts.next; null != la;) {
					var Ga = la,
						va = ka.gnormx * Ga.x + ka.gnormy * Ga.y;
					va < R && (R = va);
					la = la.next
				}
				R -= ka.gprojection;
				if (R > f) {
					ba = R;
					break
				}
				0 < R ? R > ba &&
					(ba = R, ia = ka, Z = 2) : 0 > ba && R > ba && (ba = R, ia = ka, Z = 2);
				ja = ja.next
			}
			if (ba < f) {
				if (1 == Z) {
					var za = T;
					var J = na
				} else {
					za = X;
					J = ia;
					var Za = c;
					c = d;
					d = Za;
					v = !v
				}
				for (var aa = null, Da = 1e+100, Aa = za.edges.head; null != Aa;) {
					var Ra = Aa.elt,
						hb = J.gnormx * Ra.gnormx + J.gnormy * Ra.gnormy;
					hb < Da && (Da = hb, aa = Ra);
					Aa = Aa.next
				}
				v ? (e.x = -J.gnormx, e.y = -J.gnormy) : (e.x = J.gnormx, e.y = J.gnormy);
				if (0 <= ba) {
					var pb = J.gp0,
						Fa = J.gp1,
						qb = aa.gp0,
						yb = aa.gp1,
						Pb = 0,
						ha = 0,
						qa = 0,
						ma = 0;
					Pb = Fa.x - pb.x;
					ha = Fa.y - pb.y;
					qa = yb.x - qb.x;
					ma = yb.y - qb.y;
					var Ka = 1 / (Pb * Pb + ha * ha),
						Pa = 1 / (qa * qa + ma * ma),
						ra = -(Pb * (pb.x - qb.x) + ha * (pb.y - qb.y)) * Ka,
						sa = -(Pb * (pb.x - yb.x) + ha * (pb.y - yb.y)) * Ka,
						eb = -(qa * (qb.x - pb.x) + ma * (qb.y - pb.y)) * Pa,
						ta = -(qa * (qb.x - Fa.x) + ma * (qb.y - Fa.y)) * Pa;
					0 > ra ? ra = 0 : 1 < ra && (ra = 1);
					0 > sa ? sa = 0 : 1 < sa && (sa = 1);
					0 > eb ? eb = 0 : 1 < eb && (eb = 1);
					0 > ta ? ta = 0 : 1 < ta && (ta = 1);
					var Ea = 0,
						z = 0,
						Ha = ra;
					Ea = pb.x + Pb * Ha;
					z = pb.y + ha * Ha;
					var ua = 0,
						wa = 0,
						bb = sa;
					ua = pb.x + Pb * bb;
					wa = pb.y + ha * bb;
					var xa = 0,
						ya = 0,
						Na = eb;
					xa = qb.x + qa * Na;
					ya = qb.y + ma * Na;
					var Ba = 0,
						Ia = 0,
						Wa = ta;
					Ba = qb.x + qa * Wa;
					Ia = qb.y + ma * Wa;
					var Ca = ob.vec_dsq(Ea, z, qb.x, qb.y),
						Qa = ob.vec_dsq(ua, wa, yb.x, yb.y),
						ab =
						ob.vec_dsq(xa, ya, pb.x, pb.y),
						ib = ob.vec_dsq(Ba, Ia, Fa.x, Fa.y),
						Ta = 0,
						Ma = 0,
						Va = null;
					Ca < Qa ? (Ta = Ea, Ma = z, Va = qb) : (Ta = ua, Ma = wa, Va = yb, Ca = Qa);
					var Oa = 0,
						db = 0,
						La = null;
					ab < ib ? (Oa = xa, db = ya, La = pb) : (Oa = Ba, db = Ia, La = Fa, ab = ib);
					Ca < ab ? (c.x = Ta, c.y = Ma, d.x = Va.x, d.y = Va.y, ba = Math.sqrt(Ca)) : (d.x = Oa, d.y = db, c.x = La.x, c.y = La.y, ba = Math.sqrt(ab));
					if (0 != ba) {
						e.x = d.x - c.x;
						e.y = d.y - c.y;
						var mb = 1 / ba;
						e.x *= mb;
						e.y *= mb;
						v && (e.x = -e.x, e.y = -e.y)
					}
					return ba
				}
				var Tc = 0,
					Uc = 0;
				Tc = aa.gp0.x;
				Uc = aa.gp0.y;
				var Ja = 0,
					Ya = 0;
				Ja = aa.gp1.x;
				Ya = aa.gp1.y;
				var $a = 0,
					kb = 0;
				$a = Ja -
					Tc;
				kb = Ya - Uc;
				var fb = J.gnormy * Tc - J.gnormx * Uc,
					vb = J.gnormy * Ja - J.gnormx * Ya,
					Ua = 1 / (vb - fb),
					jb = (-J.tp1 - fb) * Ua;
				jb > n.epsilon && (Tc += $a * jb, Uc += kb * jb);
				var cb = (-J.tp0 - vb) * Ua;
				cb < -n.epsilon && (Ja += $a * cb, Ya += kb * cb);
				var gb = Tc * J.gnormx + Uc * J.gnormy - J.gprojection,
					lb = Ja * J.gnormx + Ya * J.gnormy - J.gprojection;
				if (gb < lb) {
					d.x = Tc;
					d.y = Uc;
					var Xa = -gb;
					c.x = d.x + J.gnormx * Xa;
					c.y = d.y + J.gnormy * Xa;
					return gb
				}
				d.x = Ja;
				d.y = Ya;
				var nb = -lb;
				c.x = d.x + J.gnormx * nb;
				c.y = d.y + J.gnormy * nb;
				return lb
			}
		}
		return f
	};
	var N = function() {
		this.length = this.x = this.y = 0;
		this._inuse =
			this.modified = this.pushmod = !1;
		this.next = null;
		this.weak = !1;
		this._isimmutable = this.outer = null;
		this._immutable = !1;
		this._invalidate = this._validate = null
	};
	N.__name__ = !0;
	N.get = function(a, b, c) {
		null == c && (c = !1);
		if (null == N.zpp_pool) var d = new N;
		else d = N.zpp_pool, N.zpp_pool = d.next, d.next = null;
		d.weak = !1;
		d._immutable = c;
		d.x = a;
		d.y = b;
		return d
	};
	N.prototype = {
		validate: function() {
			null != this._validate && this._validate()
		},
		invalidate: function() {
			null != this._invalidate && this._invalidate(this)
		},
		wrapper: function() {
			if (null == this.outer) {
				this.outer =
					new D;
				var a = this.outer.zpp_inner;
				null != a.outer && (a.outer.zpp_inner = null, a.outer = null);
				a._isimmutable = null;
				a._validate = null;
				a._invalidate = null;
				a.next = N.zpp_pool;
				N.zpp_pool = a;
				this.outer.zpp_inner = this
			}
			return this.outer
		},
		add: function(a) {
			return this.inlined_add(a)
		},
		inlined_add: function(a) {
			a._inuse = !0;
			a.next = this.next;
			this.next = a;
			this.modified = !0;
			this.length++;
			return a
		},
		insert: function(a, b) {
			return this.inlined_insert(a, b)
		},
		inlined_insert: function(a, b) {
			b._inuse = !0;
			null == a ? (b.next = this.next, this.next = b) :
				(b.next = a.next, a.next = b);
			this.pushmod = this.modified = !0;
			this.length++;
			return b
		},
		erase: function(a) {
			return this.inlined_erase(a)
		},
		inlined_erase: function(a) {
			var b;
			if (null == a) {
				var c = this.next;
				this.next = b = c.next;
				null == this.next && (this.pushmod = !0)
			} else c = a.next, b = c.next, a.next = b, null == b && (this.pushmod = !0);
			c._inuse = !1;
			this.modified = !0;
			this.length--;
			this.pushmod = !0;
			return b
		},
		reverse: function() {
			for (var a = this.next, b = null; null != a;) {
				var c = a.next;
				a.next = b;
				b = this.next = a;
				a = c
			}
			this.pushmod = this.modified = !0
		},
		iterator_at: function(a) {
			for (var b =
					this.next; 0 < a-- && null != b;) b = b.next;
			return b
		},
		toString: function() {
			return "{ x: " + this.x + " y: " + this.y + " }"
		},
		__class__: N
	};
	var ob = function() {};
	ob.__name__ = !0;
	ob.vec_dsq = function(a, b, c, d) {
		a -= c;
		b -= d;
		return a * a + b * b
	};
	var ca = function() {
		this.ishape = this.ibody = this.icompound = this.cbsets = this.group = this.cbTypes = this.cbSet = this.wrap_cbTypes = null;
		this.id = 0;
		this.outer_i = null;
		this.id = M.Interactor();
		this.cbsets = new Xd;
		this.cbTypes = new Aa
	};
	ca.__name__ = !0;
	ca.get = function(a, b) {
		var c = a.id < b.id ? a.id : b.id;
		var d = a.id < b.id ?
			b.id : a.id;
		var e = null;
		for (a = (a.cbsets.length < b.cbsets.length ? a.cbsets : b.cbsets).head; null != a;) {
			b = a.elt;
			if (b.id == c && b.di == d) {
				e = b;
				break
			}
			a = a.next
		}
		return e
	};
	ca.int_callback = function(a, b, c) {
		var d = a.int1;
		a = a.int2;
		b.options1.compatible(d.cbTypes) && b.options2.compatible(a.cbTypes) ? (c.int1 = d, c.int2 = a) : (c.int1 = a, c.int2 = d)
	};
	ca.prototype = {
		__iaddedToSpace: function() {
			null != this.group && this.group.interactors.add(this);
			for (var a = this.cbTypes.head; null != a;) a.elt.interactors.add(this), a = a.next;
			this.alloc_cbSet()
		},
		__iremovedFromSpace: function() {
			null !=
				this.group && this.group.interactors.remove(this);
			for (var a = this.cbTypes.head; null != a;) a.elt.interactors.remove(this), a = a.next;
			this.dealloc_cbSet()
		},
		wake: function() {
			if (null != this.ishape) {
				var a = this.ishape.body;
				null != a && null != a.space && a.space.non_inlined_wake(a);
				!0
			} else null != this.ibody ? null != this.ibody.space ? this.ibody.space.non_inlined_wake(this.ibody) : !1 : (null != this.icompound.space && this.icompound.space.wakeCompound(this.icompound), !0)
		},
		setupcbTypes: function() {
			this.wrap_cbTypes = gc.get(this.cbTypes);
			this.wrap_cbTypes.zpp_inner.adder = v(this, this.wrap_cbTypes_adder);
			this.wrap_cbTypes.zpp_inner.subber = v(this, this.wrap_cbTypes_subber);
			this.wrap_cbTypes.zpp_inner.dontremove = !0
		},
		wrap_cbTypes_subber: function(a) {
			a = a.zpp_inner;
			if (this.cbTypes.has(a)) {
				var b = null != this.ishape ? null == this.ishape.body ? null : this.ishape.body.space : null != this.ibody ? this.ibody.space : this.icompound.space;
				null != b && (this.dealloc_cbSet(), a.interactors.remove(this));
				this.cbTypes.remove(a);
				null != b && (this.alloc_cbSet(), this.wake())
			}
		},
		wrap_cbTypes_adder: function(a) {
			this.insert_cbtype(a.zpp_inner);
			return !1
		},
		insert_cbtype: function(a) {
			if (!this.cbTypes.has(a)) {
				var b = null != this.ishape ? null == this.ishape.body ? null : this.ishape.body.space : null != this.ibody ? this.ibody.space : this.icompound.space;
				null != b && (this.dealloc_cbSet(), a.interactors.add(this));
				for (var c = null, d = this.cbTypes.head; null != d && !(a.id < d.elt.id);) c = d, d = d.next;
				this.cbTypes.inlined_insert(c, a);
				null != b && (this.alloc_cbSet(), this.wake())
			}
		},
		alloc_cbSet: function() {
			var a = null != this.ishape ?
				null == this.ishape.body ? null : this.ishape.body.space : null != this.ibody ? this.ibody.space : this.icompound.space;
			null != (this.cbSet = a.cbsets.get(this.cbTypes)) && (this.cbSet.count++, this.cbSet.interactors.add(this), this.cbSet.validate(), a.freshInteractorType(this))
		},
		dealloc_cbSet: function() {
			var a = null != this.ishape ? null == this.ishape.body ? null : this.ishape.body.space : null != this.ibody ? this.ibody.space : this.icompound.space;
			null != this.cbSet && (this.cbSet.interactors.remove(this), a.nullInteractorType(this), 0 == --this.cbSet.count &&
				(a.cbsets.remove(this.cbSet), a = this.cbSet, a.free(), a.next = U.zpp_pool, U.zpp_pool = a), this.cbSet = null)
		},
		immutable_midstep: function(a) {
			null != this.ibody ? null : null != this.ishape ? this.ishape.__immutable_midstep(a) : this.icompound.__imutable_midstep(a)
		},
		lookup_group: function() {
			for (var a = this; null != a && null == a.group;) a = null != a.ishape ? a.ishape.body : null != a.icompound ? a.icompound.compound : a.ibody.compound;
			return null == a ? null : a.group
		},
		__class__: ca
	};
	var db = function() {
		this.wrap_localCOM = this.wrap_worldCOM = null;
		this.zip_worldCOM = !1;
		this.worldCOMx = this.worldCOMy = 0;
		this.zip_localCOM = !1;
		this.localCOMx = this.localCOMy = 0;
		this.zip_aabb = !1;
		this.aabb = null;
		this.norotate = !1;
		this.cinertia = this.iinertia = this.sinertia = 0;
		this.zip_inertia = !1;
		this.inertiaMode = this.inertia = 0;
		this.zip_gravMassScale = !1;
		this.gravMassMode = this.gravMassScale = 0;
		this.zip_gravMass = !1;
		this.gravMass = 0;
		this.nomove = !1;
		this.massMode = this.imass = this.smass = this.cmass = 0;
		this.zip_mass = !1;
		this.mass = 0;
		this.zip_axis = !1;
		this.angvel = this.torque = this.kinangvel = this.pre_rot = this.rot =
			this.axisx = this.axisy = 0;
		this.wrap_svel = null;
		this.forcex = this.forcey = this.kinvelx = this.kinvely = this.svelx = this.svely = 0;
		this.wrap_vel = null;
		this.velx = this.vely = 0;
		this.wrap_pos = null;
		this.pre_posx = this.pre_posy = this.posx = this.posy = 0;
		this.bullet = this.bulletEnabled = this.disableCCD = !1;
		this.sweepRadius = 0;
		this.sweepFrozen = !1;
		this.sweepTime = this.sweep_angvel = 0;
		this.compound = this.shapes = this.wrap_shapes = this.space = this.arbiters = this.constraints = this.component = null;
		this.type = 0;
		this.world = !1;
		this.outer = null;
		ca.call(this);
		this.ibody = this;
		this.bulletEnabled = this.world = !1;
		this.sweep_angvel = this.sweepTime = 0;
		this.disableCCD = this.norotate = this.nomove = !1;
		this.axisx = this.rot = this.posy = this.posx = 0;
		this.axisy = 1;
		this.torque = this.angvel = this.kinangvel = this.forcey = this.forcex = this.kinvely = this.kinvelx = this.vely = this.velx = this.svely = this.svelx = 0;
		this.pre_rot = this.pre_posy = this.pre_posx = Infinity;
		this.worldCOMy = this.worldCOMx = this.localCOMy = this.localCOMx = 0;
		this.zip_aabb = !0;
		this.aabb = V.get(0, 0, 0, 0);
		this.aabb._immutable = !0;
		this.aabb._validate =
			v(this, this.aabb_validate);
		this.gravMassMode = this.massMode = 0;
		this.gravMassScale = 1;
		this.inertiaMode = 0;
		this.arbiters = new kd;
		this.constraints = new Cb;
		this.shapes = new Fc;
		this.wrap_shapes = Zb.get(this.shapes);
		this.wrap_shapes.zpp_inner.adder = v(this, this.shapes_adder);
		this.wrap_shapes.zpp_inner.subber = v(this, this.shapes_subber);
		this.wrap_shapes.zpp_inner._invalidate = v(this, this.shapes_invalidate);
		this.kinematicDelaySleep = !1
	};
	db.__name__ = !0;
	db.__static = function() {
		var a = ec;
		null == g.BodyType_STATIC && (g.BodyType_STATIC =
			new X, g.internal = !1);
		a = new a(g.BodyType_STATIC);
		var b = a.zpp_inner;
		b.world = !0;
		b.wrap_shapes.zpp_inner.immutable = !0;
		b.smass = b.imass = b.cmass = b.mass = b.gravMass = 0;
		b.sinertia = b.iinertia = b.cinertia = b.inertia = 0;
		b.cbTypes.clear();
		return a
	};
	db.__super__ = ca;
	db.prototype = r(ca.prototype, {
		invalidate_type: function() {
			this.invalidate_mass();
			this.invalidate_inertia()
		},
		invalidate_shapes: function() {
			this.zip_worldCOM = this.zip_localCOM = this.zip_aabb = !0;
			this.invalidate_mass();
			this.invalidate_inertia()
		},
		atRest: function(a) {
			if (2 !=
				this.type) return this.component.sleeping;
			var b = n.linearSleepThreshold;
			b *= b;
			if (this.velx * this.velx + this.vely * this.vely > b) a = !1;
			else if (ob.vec_dsq(this.posx, this.posy, this.pre_posx, this.pre_posy) > .25 * b * a * a) a = !1;
			else {
				b = this.aabb.maxx - this.aabb.minx;
				var c = this.aabb.maxy - this.aabb.miny;
				b = b * b + c * c;
				c = n.angularSleepThreshold;
				c *= c;
				if (4 * this.angvel * this.angvel * b > c) a = !1;
				else {
					var d = this.rot - this.pre_rot;
					a = d * d * b > c * a * a ? !1 : !0
				}
			}
			a || (this.component.waket = this.space.stamp);
			return this.component.waket + n.sleepDelay < this.space.stamp
		},
		refreshArbiters: function() {
			for (var a = this.arbiters.head; null != a;) a.elt.invalidated = !0, a = a.next
		},
		sweepIntegrate: function(a) {
			var b = a - this.sweepTime;
			0 != b && (this.sweepTime = a, this.posx += this.velx * b, this.posy += this.vely * b, 0 != this.angvel && this.delta_rot(this.sweep_angvel * b))
		},
		sweepValidate: function(a) {
			if (0 == a.type) a.worldCOMx = this.posx + (this.axisy * a.localCOMx - this.axisx * a.localCOMy), a.worldCOMy = this.posy + (a.localCOMx * this.axisx + a.localCOMy * this.axisy);
			else {
				a = a.polygon;
				for (var b = a.lverts.next, c = a.gverts.next; null !=
					c;) {
					var d = c,
						e = b;
					b = b.next;
					d.x = this.posx + (this.axisy * e.x - this.axisx * e.y);
					d.y = this.posy + (e.x * this.axisx + e.y * this.axisy);
					c = c.next
				}
				c = a.edges.head;
				b = d = a.gverts.next;
				for (d = d.next; null != d;) {
					e = d;
					var f = c.elt;
					c = c.next;
					f.gnormx = this.axisy * f.lnormx - this.axisx * f.lnormy;
					f.gnormy = f.lnormx * this.axisx + f.lnormy * this.axisy;
					f.gprojection = this.posx * f.gnormx + this.posy * f.gnormy + f.lprojection;
					f.tp0 = b.y * f.gnormx - b.x * f.gnormy;
					f.tp1 = e.y * f.gnormx - e.x * f.gnormy;
					b = e;
					d = d.next
				}
				a = a.gverts.next;
				c = c.elt;
				c.gnormx = this.axisy * c.lnormx -
					this.axisx * c.lnormy;
				c.gnormy = c.lnormx * this.axisx + c.lnormy * this.axisy;
				c.gprojection = this.posx * c.gnormx + this.posy * c.gnormy + c.lprojection;
				c.tp0 = b.y * c.gnormx - b.x * c.gnormy;
				c.tp1 = a.y * c.gnormx - a.x * c.gnormy
			}
		},
		invalidate_pos: function() {
			for (var a = this.shapes.head; null != a;) {
				var b = a.elt;
				1 == b.type && (b.polygon.invalidate_gverts(), b.polygon.invalidate_gaxi());
				b.invalidate_worldCOM();
				a = a.next
			}
			this.zip_worldCOM = !0
		},
		pos_invalidate: function(a) {
			this.immutable_midstep("Body::position");
			if (this.posx != a.x || this.posy != a.y) this.posx =
				a.x, this.posy = a.y, this.invalidate_pos(), this.wake()
		},
		pos_validate: function() {
			this.wrap_pos.zpp_inner.x = this.posx;
			this.wrap_pos.zpp_inner.y = this.posy
		},
		vel_invalidate: function(a) {
			this.velx = a.x;
			this.vely = a.y;
			this.wake()
		},
		vel_validate: function() {
			this.wrap_vel.zpp_inner.x = this.velx;
			this.wrap_vel.zpp_inner.y = this.vely
		},
		svel_invalidate: function(a) {
			this.svelx = a.x;
			this.svely = a.y;
			this.wake()
		},
		svel_validate: function() {
			this.wrap_svel.zpp_inner.x = this.svelx;
			this.wrap_svel.zpp_inner.y = this.svely
		},
		setupPosition: function() {
			this.wrap_pos =
				D.get(this.posx, this.posy, null);
			this.wrap_pos.zpp_inner._inuse = !0;
			this.world ? this.wrap_pos.zpp_inner._immutable = !0 : (this.wrap_pos.zpp_inner._invalidate = v(this, this.pos_invalidate), this.wrap_pos.zpp_inner._validate = v(this, this.pos_validate))
		},
		setupVelocity: function() {
			this.wrap_vel = D.get(this.velx, this.vely, null);
			this.wrap_vel.zpp_inner._inuse = !0;
			this.world ? this.wrap_vel.zpp_inner._immutable = !0 : (this.wrap_vel.zpp_inner._invalidate = v(this, this.vel_invalidate), this.wrap_vel.zpp_inner._validate = v(this,
				this.vel_validate))
		},
		setupsvel: function() {
			this.wrap_svel = D.get(this.svelx, this.svely, null);
			this.wrap_svel.zpp_inner._inuse = !0;
			this.world ? this.wrap_svel.zpp_inner._immutable = !0 : (this.wrap_svel.zpp_inner._invalidate = v(this, this.svel_invalidate), this.wrap_svel.zpp_inner._validate = v(this, this.svel_validate))
		},
		invalidate_rot: function() {
			this.zip_axis = !0;
			for (var a = this.shapes.head; null != a;) {
				var b = a.elt;
				1 == b.type && (b.polygon.invalidate_gverts(), b.polygon.invalidate_gaxi());
				b.invalidate_worldCOM();
				a = a.next
			}
			this.zip_worldCOM = !0
		},
		validate_axis: function() {
			this.zip_axis && (this.zip_axis = !1, this.axisx = Math.sin(this.rot), this.axisy = Math.cos(this.rot), null)
		},
		delta_rot: function(a) {
			this.rot += a;
			if (.0001 < a * a) this.axisx = Math.sin(this.rot), this.axisy = Math.cos(this.rot), null;
			else {
				var b = a * a,
					c = 1 - .5 * b;
				b = 1 - b * b / 8;
				var d = (c * this.axisx + a * this.axisy) * b;
				this.axisy = (c * this.axisy - a * this.axisx) * b;
				this.axisx = d
			}
		},
		invalidate_mass: function() {
			this.zip_mass = !0;
			this.invalidate_gravMass()
		},
		validate_mass: function() {
			if (this.zip_mass) {
				this.zip_mass = !1;
				if (0 ==
					this.massMode) {
					this.cmass = 0;
					for (var a = this.shapes.head; null != a;) {
						var b = a.elt;
						b.refmaterial.density = b.material.density;
						b.validate_area_inertia();
						this.cmass += b.area * b.material.density;
						a = a.next
					}
				}
				2 != this.type || this.nomove ? (this.mass = Infinity, this.imass = this.smass = 0) : (this.mass = this.cmass, this.imass = this.smass = 1 / this.mass)
			}
		},
		invalidate_gravMass: function() {
			1 != this.gravMassMode && (this.zip_gravMass = !0);
			2 != this.gravMassMode && (this.zip_gravMassScale = !0);
			this.wake()
		},
		validate_gravMass: function() {
			this.zip_gravMass &&
				(this.zip_gravMass = !1, this.validate_mass(), 0 == this.gravMassMode ? (this.validate_mass(), this.gravMass = this.cmass) : 2 == this.gravMassMode && (this.validate_mass(), this.gravMass = this.cmass * this.gravMassScale))
		},
		invalidate_inertia: function() {
			this.zip_inertia = !0;
			this.wake()
		},
		validate_inertia: function() {
			if (this.zip_inertia) {
				this.zip_inertia = !1;
				if (0 == this.inertiaMode) {
					this.cinertia = 0;
					for (var a = this.shapes.head; null != a;) {
						var b = a.elt;
						b.refmaterial.density = b.material.density;
						b.validate_area_inertia();
						this.cinertia +=
							b.inertia * b.area * b.material.density;
						a = a.next
					}
				}
				2 != this.type || this.norotate ? (this.inertia = Infinity, this.sinertia = this.iinertia = 0) : (this.inertia = this.cinertia, this.sinertia = this.iinertia = 1 / this.inertia)
			}
		},
		validate_aabb: function() {
			if (this.zip_aabb) {
				this.zip_aabb = !1;
				this.aabb.minx = Infinity;
				this.aabb.miny = Infinity;
				this.aabb.maxx = -Infinity;
				this.aabb.maxy = -Infinity;
				for (var a = this.shapes.head; null != a;) {
					var b = a.elt;
					b.zip_aabb && null != b.body && (b.zip_aabb = !1, 0 == b.type ? b.circle.__validate_aabb() : b.polygon.__validate_aabb());
					this.aabb.combine(b.aabb);
					a = a.next
				}
			}
		},
		invalidate_localCOM: function() {
			this.zip_worldCOM = this.zip_localCOM = !0
		},
		validate_localCOM: function() {
			if (this.zip_localCOM) {
				this.zip_localCOM = !1;
				for (var a = 0, b = 0, c = 0, d = this.shapes.head; null != d;) {
					var e = d.elt;
					e.zip_localCOM && (e.zip_localCOM = !1, 1 == e.type && e.polygon.__validate_localCOM(), null != e.wrap_localCOM && (e.wrap_localCOM.zpp_inner.x = e.localCOMx, e.wrap_localCOM.zpp_inner.y = e.localCOMy));
					e.validate_area_inertia();
					var f = e.area * e.material.density;
					a += e.localCOMx * f;
					b += e.localCOMy * f;
					c += e.area * e.material.density;
					d = d.next
				}
				0 != c && (d = 1 / c, this.localCOMx = a * d, this.localCOMy = b * d);
				null != this.wrap_localCOM && (this.wrap_localCOM.zpp_inner.x = this.localCOMx, this.wrap_localCOM.zpp_inner.y = this.localCOMy);
				this.zip_mass && 0 == this.massMode && (this.zip_mass = !1, this.cmass = c, 2 == this.type ? (this.mass = this.cmass, this.imass = this.smass = 1 / this.mass) : (this.mass = Infinity, this.imass = this.smass = 0))
			}
		},
		validate_worldCOM: function() {
			this.zip_worldCOM && (this.zip_worldCOM = !1, this.validate_localCOM(),
				this.zip_axis && (this.zip_axis = !1, this.axisx = Math.sin(this.rot), this.axisy = Math.cos(this.rot), null), this.worldCOMx = this.posx + (this.axisy * this.localCOMx - this.axisx * this.localCOMy), this.worldCOMy = this.posy + (this.localCOMx * this.axisx + this.localCOMy * this.axisy), null != this.wrap_worldCOM && (this.wrap_worldCOM.zpp_inner.x = this.worldCOMx, this.wrap_worldCOM.zpp_inner.y = this.worldCOMy))
		},
		aabb_validate: function() {
			this.validate_aabb()
		},
		shapes_adder: function(a) {
			return a.zpp_inner.body != this ? (null != a.zpp_inner.body &&
				a.zpp_inner.body.wrap_shapes.remove(a), a.zpp_inner.body = this, a.zpp_inner.addedToBody(), null != this.space && this.space.added_shape(a.zpp_inner, null), 1 == a.zpp_inner.type && (a.zpp_inner.polygon.invalidate_gaxi(), a.zpp_inner.polygon.invalidate_gverts()), !0) : !1
		},
		shapes_subber: function(a) {
			null != this.space && this.space.removed_shape(a.zpp_inner);
			a.zpp_inner.body = null;
			a.zpp_inner.removedFromBody()
		},
		shapes_invalidate: function(a) {
			this.invalidate_shapes()
		},
		addedToSpace: function() {
			null == Ra.zpp_pool ? this.component =
				new Ra : (this.component = Ra.zpp_pool, Ra.zpp_pool = this.component.next, this.component.next = null);
			null;
			this.component.isBody = !0;
			this.component.body = this;
			this.__iaddedToSpace()
		},
		removedFromSpace: function() {
			for (; null != this.arbiters.head;) {
				var a = this.arbiters.pop_unsafe();
				a.cleared = !0;
				a.b2 == this && a.b1.arbiters.inlined_try_remove(a);
				a.b1 == this && a.b2.arbiters.inlined_try_remove(a);
				null != a.pair && (a.pair.arb = null, a.pair = null);
				a.active = !1;
				this.space.f_arbiters.modified = !0
			}
			a = this.component;
			a.body = null;
			a.constraint =
				null;
			null;
			a.next = Ra.zpp_pool;
			Ra.zpp_pool = a;
			this.component = null;
			this.__iremovedFromSpace()
		},
		__class__: db
	});
	var Yd = function() {
		this.compound = this.space = null;
		this.depth = 0;
		this.outer = this.bodies = this.constraints = this.compounds = this.wrap_constraints = null
	};
	Yd.__name__ = !0;
	Yd.__super__ = ca;
	Yd.prototype = r(ca.prototype, {
		__imutable_midstep: function(a) {},
		addedToSpace: function() {
			this.__iaddedToSpace()
		},
		removedFromSpace: function() {
			this.__iremovedFromSpace()
		},
		__class__: Yd
	});
	var ua = function(a) {
		this.zip_aabb = !1;
		this.sweep =
			this.node = this.pairs = this.aabb = null;
		this.fluidEnabled = this.sensorEnabled = !1;
		this.circle = this.polygon = this.refmaterial = this.material = this.filter = this.fluidProperties = null;
		this.sweepCoef = 0;
		this.zip_sweepRadius = !1;
		this.sweepRadius = 0;
		this.wrap_localCOM = null;
		this.zip_worldCOM = !1;
		this.worldCOMx = this.worldCOMy = 0;
		this.zip_localCOM = !1;
		this.localCOMx = this.localCOMy = 0;
		this.zip_angDrag = !1;
		this.inertia = this.angDrag = 0;
		this.zip_area_inertia = !1;
		this.type = this.area = 0;
		this.outer = this.body = null;
		ca.call(this);
		this.pairs =
			new Zd;
		this.ishape = this;
		this.type = a;
		this.aabb = V.get(0, 0, 0, 0);
		this.aabb._immutable = !0;
		this.aabb._validate = v(this, this.aabb_validate);
		this.zip_area_inertia = this.zip_angDrag = this.zip_localCOM = this.zip_sweepRadius = !0;
		this.worldCOMy = this.worldCOMx = this.localCOMy = this.localCOMx = 0;
		this.sensorEnabled = this.fluidEnabled = !1;
		this.body = this.fluidProperties = null;
		this.refmaterial = new H;
		this.sweepRadius = this.sweepCoef = 0
	};
	ua.__name__ = !0;
	ua.__super__ = ca;
	ua.prototype = r(ca.prototype, {
		validate_sweepRadius: function() {
			this.zip_sweepRadius &&
				(this.zip_sweepRadius = !1, 0 == this.type ? this.circle.__validate_sweepRadius() : this.polygon.__validate_sweepRadius())
		},
		validate_area_inertia: function() {
			this.zip_area_inertia && (this.zip_area_inertia = !1, 0 == this.type ? this.circle.__validate_area_inertia() : this.polygon.__validate_area_inertia())
		},
		validate_angDrag: function() {
			if (this.zip_angDrag || this.refmaterial.dynamicFriction != this.material.dynamicFriction) this.zip_angDrag = !1, this.refmaterial.dynamicFriction = this.material.dynamicFriction, 0 == this.type ? this.circle.__validate_angDrag() :
				this.polygon.__validate_angDrag()
		},
		validate_worldCOM: function() {
			this.zip_worldCOM && null != this.body && (this.zip_worldCOM = !1, this.zip_localCOM && (this.zip_localCOM = !1, 1 == this.type && this.polygon.__validate_localCOM(), null != this.wrap_localCOM && (this.wrap_localCOM.zpp_inner.x = this.localCOMx, this.wrap_localCOM.zpp_inner.y = this.localCOMy)), this.body.validate_axis(), this.worldCOMx = this.body.posx + (this.body.axisy * this.localCOMx - this.body.axisx * this.localCOMy), this.worldCOMy = this.body.posy + (this.localCOMx * this.body.axisx +
				this.localCOMy * this.body.axisy))
		},
		invalidate_area_inertia: function() {
			this.zip_area_inertia = !0;
			null != this.body && (this.body.invalidate_localCOM(), this.body.invalidate_mass(), this.body.invalidate_inertia())
		},
		invalidate_angDrag: function() {
			this.zip_angDrag = !0
		},
		invalidate_localCOM: function() {
			this.zip_localCOM = !0;
			this.invalidate_area_inertia();
			0 == this.type && (this.zip_sweepRadius = !0);
			this.invalidate_angDrag();
			this.invalidate_worldCOM();
			null != this.body && this.body.invalidate_localCOM()
		},
		invalidate_worldCOM: function() {
			this.zip_aabb =
				this.zip_worldCOM = !0;
			null != this.body && (this.body.zip_aabb = !0)
		},
		invalidate_material: function(a) {
			0 != (a & H.WAKE) && this.wake();
			0 != (a & H.ARBITERS) && null != this.body && this.body.refreshArbiters();
			0 != (a & H.PROPS) && null != this.body && (this.body.invalidate_localCOM(), this.body.invalidate_mass(), this.body.invalidate_inertia());
			0 != (a & H.ANGDRAG) && this.invalidate_angDrag();
			this.refmaterial.set(this.material)
		},
		invalidate_filter: function() {
			this.wake()
		},
		aabb_validate: function() {
			this.zip_aabb && null != this.body && (this.zip_aabb = !1, 0 == this.type ? this.circle.__validate_aabb() : this.polygon.__validate_aabb())
		},
		setMaterial: function(a) {
			this.material != a && (null != this.body && null != this.body.space && null != this.material && this.material.shapes.remove(this), this.material = a, null != this.body && null != this.body.space && a.shapes.add(this), this.wake(), null != this.body && this.body.refreshArbiters())
		},
		setFilter: function(a) {
			this.filter != a && (null != this.body && null != this.body.space && null != this.filter && this.filter.shapes.remove(this), this.filter = a, null !=
				this.body && null != this.body.space && a.shapes.add(this), this.wake())
		},
		__immutable_midstep: function(a) {},
		addedToBody: function() {
			this.invalidate_worldCOM();
			this.zip_aabb = !0;
			null != this.body && (this.body.zip_aabb = !0)
		},
		removedFromBody: function() {},
		addedToSpace: function() {
			this.__iaddedToSpace();
			this.material.shapes.add(this);
			this.filter.shapes.add(this);
			null != this.fluidProperties && this.fluidProperties.shapes.add(this)
		},
		removedFromSpace: function() {
			this.__iremovedFromSpace();
			this.material.shapes.remove(this);
			this.filter.shapes.remove(this);
			null != this.fluidProperties && this.fluidProperties.shapes.remove(this)
		},
		__class__: ua
	});
	var fd = function() {
		this.radius = 0;
		this.outer_zn = null;
		ua.call(this, 0);
		this.circle = this;
		this.zip_localCOM = !1
	};
	fd.__name__ = !0;
	fd.__super__ = ua;
	fd.prototype = r(ua.prototype, {
		invalidate_radius: function() {
			this.invalidate_area_inertia();
			this.invalidate_angDrag();
			this.zip_aabb = !0;
			null != this.body && (this.body.zip_aabb = !0);
			null != this.body && this.body.wake()
		},
		__validate_aabb: function() {
			this.zip_worldCOM &&
				null != this.body && (this.zip_worldCOM = !1, this.zip_localCOM && (this.zip_localCOM = !1, 1 == this.type && this.polygon.__validate_localCOM(), null != this.wrap_localCOM && (this.wrap_localCOM.zpp_inner.x = this.localCOMx, this.wrap_localCOM.zpp_inner.y = this.localCOMy)), this.body.validate_axis(), this.worldCOMx = this.body.posx + (this.body.axisy * this.localCOMx - this.body.axisx * this.localCOMy), this.worldCOMy = this.body.posy + (this.localCOMx * this.body.axisx + this.localCOMy * this.body.axisy));
			var a = this.radius,
				b = this.radius;
			this.aabb.minx =
				this.worldCOMx - a;
			this.aabb.miny = this.worldCOMy - b;
			this.aabb.maxx = this.worldCOMx + a;
			this.aabb.maxy = this.worldCOMy + b
		},
		_force_validate_aabb: function() {
			this.worldCOMx = this.body.posx + (this.body.axisy * this.localCOMx - this.body.axisx * this.localCOMy);
			this.worldCOMy = this.body.posy + (this.localCOMx * this.body.axisx + this.localCOMy * this.body.axisy);
			this.aabb.minx = this.worldCOMx - this.radius;
			this.aabb.miny = this.worldCOMy - this.radius;
			this.aabb.maxx = this.worldCOMx + this.radius;
			this.aabb.maxy = this.worldCOMy + this.radius
		},
		__validate_sweepRadius: function() {
			this.sweepCoef = Math.sqrt(this.localCOMx * this.localCOMx + this.localCOMy * this.localCOMy);
			this.sweepRadius = this.sweepCoef + this.radius
		},
		__validate_area_inertia: function() {
			var a = this.radius * this.radius;
			this.area = a * Math.PI;
			this.inertia = .5 * a + (this.localCOMx * this.localCOMx + this.localCOMy * this.localCOMy)
		},
		__validate_angDrag: function() {
			var a = this.localCOMx * this.localCOMx + this.localCOMy * this.localCOMy,
				b = this.radius * this.radius;
			this.angDrag = (a + 2 * b) * this.material.dynamicFriction *
				n.fluidAngularDragFriction + .5 * n.fluidAngularDrag * (1 + n.fluidVacuumDrag) * a;
			this.angDrag /= 2 * (a + .5 * b)
		},
		__class__: fd
	});
	var da = function() {
		this.tp0 = this.tp1 = 0;
		this.lp0 = this.gp0 = this.lp1 = this.gp1 = null;
		this.length = this.lprojection = this.gprojection = 0;
		this.wrap_gnorm = null;
		this.gnormx = this.gnormy = 0;
		this.wrap_lnorm = null;
		this.lnormx = this.lnormy = 0;
		this.next = this.polygon = this.outer = null;
		this.gprojection = this.lprojection = this.length = this.gnormy = this.gnormx = this.lnormy = this.lnormx = 0
	};
	da.__name__ = !0;
	da.prototype = {
		wrapper: function() {
			null ==
				this.outer && (this.outer = new be, da.internal = !1, this.outer.zpp_inner = this);
			return this.outer
		},
		__class__: da
	};
	var ud = function() {
		this.reverse_flag = this.zip_lverts = this.zip_laxi = this.zip_gverts = this.zip_gaxi = this.zip_valid = this.zip_sanitation = !1;
		this.edgeCnt = 0;
		this.outer_zn = this.lverts = this.wrap_lverts = this.gverts = this.wrap_gverts = this.edges = this.wrap_edges = null;
		ua.call(this, 1);
		this.polygon = this;
		this.lverts = new N;
		this.gverts = new N;
		this.edges = new ld;
		this.edgeCnt = 0
	};
	ud.__name__ = !0;
	ud.__super__ = ua;
	ud.prototype =
		r(ua.prototype, {
			lverts_pa_invalidate: function(a) {
				this.invalidate_lverts()
			},
			gverts_pa_validate: function() {
				this.validate_gverts()
			},
			lverts_post_adder: function(a) {
				a.zpp_inner._invalidate = v(this, this.lverts_pa_invalidate);
				for (var b = null, c = null, d = this.lverts.next; null != d && d != a.zpp_inner;) b = null == b ? this.gverts.next : b.next, c = null == c ? this.edges.head : c.next, d = d.next;
				a = N.get(0, 0, !0);
				this.gverts.insert(b, a);
				null != this.lverts.next.next && (null == this.lverts.next.next.next ? (null == da.zpp_pool ? c = new da : (c = da.zpp_pool,
					da.zpp_pool = c.next, c.next = null), null, c.polygon = this, this.edges.add(c), null == da.zpp_pool ? c = new da : (c = da.zpp_pool, da.zpp_pool = c.next, c.next = null), null, c.polygon = this, this.edges.add(c), this.edgeCnt += 2) : (null == da.zpp_pool ? b = new da : (b = da.zpp_pool, da.zpp_pool = b.next, b.next = null), null, b.polygon = this, this.edges.insert(c, b), this.edgeCnt++));
				a._validate = v(this, this.gverts_pa_validate)
			},
			lverts_subber: function(a) {
				this.cleanup_lvert(a.zpp_inner)
			},
			lverts_invalidate: function(a) {
				this.invalidate_lverts()
			},
			lverts_validate: function() {
				this.validate_lverts()
			},
			getlverts: function() {
				this.wrap_lverts = kc.get(this.lverts);
				this.wrap_lverts.zpp_inner.post_adder = v(this, this.lverts_post_adder);
				this.wrap_lverts.zpp_inner.subber = v(this, this.lverts_subber);
				this.wrap_lverts.zpp_inner._invalidate = v(this, this.lverts_invalidate);
				this.wrap_lverts.zpp_inner._validate = v(this, this.lverts_validate);
				this.wrap_lverts.zpp_inner.reverse_flag = this.reverse_flag
			},
			invalidate_lverts: function() {
				this.invalidate_laxi();
				this.invalidate_area_inertia();
				this.invalidate_angDrag();
				this.invalidate_localCOM();
				this.invalidate_gverts();
				this.zip_sanitation = this.zip_valid = this.zip_lverts = !0;
				null != this.body && this.body.wake()
			},
			invalidate_laxi: function() {
				this.invalidate_gaxi();
				this.zip_laxi = this.zip_sweepRadius = !0
			},
			invalidate_gverts: function() {
				this.zip_aabb = !0;
				null != this.body && (this.body.zip_aabb = !0);
				this.zip_gverts = !0
			},
			invalidate_gaxi: function() {
				this.zip_gaxi = !0
			},
			validate_lverts: function() {
				this.zip_lverts && (this.zip_lverts = !1, 2 < this.lverts.length && (this.validate_area_inertia(), 0 > this.area && (this.reverse_vertices(),
					this.area = -this.area)))
			},
			cleanup_lvert: function(a) {
				for (var b = null, c = null, d = this.lverts.next; null != d && d != a;) b = null == b ? this.gverts.next : b.next, c = null == c ? this.edges.head : c.next, d = d.next;
				a = null == b ? this.gverts.next : b.next;
				this.gverts.erase(b);
				null != a.outer && (a.outer.zpp_inner = null, a.outer = null);
				a._isimmutable = null;
				a._validate = null;
				a._invalidate = null;
				a.next = N.zpp_pool;
				N.zpp_pool = a;
				2 == this.edgeCnt ? (c = this.edges.pop_unsafe(), c.polygon = null, c.next = da.zpp_pool, da.zpp_pool = c, c = this.edges.pop_unsafe(), c.polygon =
					null, c.next = da.zpp_pool, da.zpp_pool = c, this.edgeCnt = 0) : 0 != this.edgeCnt && (b = null == c ? this.edges.head.elt : c.next.elt, this.edges.erase(c), b.polygon = null, b.next = da.zpp_pool, da.zpp_pool = b, this.edgeCnt--)
			},
			splice_collinear: function() {
				this.zip_sanitation && (this.zip_sanitation = !1, this.splice_collinear_real())
			},
			splice_collinear_real: function() {
				if (null != this.lverts.next && null != this.lverts.next.next && null != this.lverts.next.next.next) {
					for (var a = null, b = this.lverts.next; null != b;) {
						var c = b,
							d = null == b.next ? this.lverts.next :
							b.next;
						ob.vec_dsq(c.x, c.y, d.x, d.y) < n.epsilon * n.epsilon ? (this.cleanup_lvert(b), b = this.lverts.erase(a)) : (a = b, b = b.next)
					}
					if (null != this.lverts.next) {
						do
							for (a = !1, b = this.lverts.next; null != b;) {
								c = null == b.next ? this.lverts.next : b.next;
								d = b;
								var e = c,
									f = null == c.next ? this.lverts.next : c.next;
								d = (f.y - e.y) * (e.x - d.x) - (f.x - e.x) * (e.y - d.y);
								d * d >= n.epsilon * n.epsilon || (this.cleanup_lvert(c), this.lverts.erase(null == b.next ? null : b), a = !0);
								b = b.next
							}
						while (a)
					}
				}
			},
			reverse_vertices: function() {
				this.lverts.reverse();
				this.gverts.reverse();
				this.edges.reverse();
				var a = this.edges.iterator_at(this.edgeCnt - 1),
					b = this.edges.pop_unsafe();
				this.edges.insert(a, b);
				this.reverse_flag = !this.reverse_flag;
				null != this.wrap_lverts && (this.wrap_lverts.zpp_inner.reverse_flag = this.reverse_flag);
				null != this.wrap_gverts && (this.wrap_gverts.zpp_inner.reverse_flag = this.reverse_flag);
				null != this.wrap_edges && (this.wrap_edges.zpp_inner.reverse_flag = this.reverse_flag)
			},
			validate_laxi: function() {
				if (this.zip_laxi) {
					this.zip_laxi = !1;
					this.validate_lverts();
					var a = this.edges.head,
						b = this.lverts.next,
						c = b;
					for (b = b.next; null != b;) {
						var d = b,
							e = a.elt;
						a = a.next;
						e.lp0 = c;
						e.lp1 = d;
						var f = c.x - d.x;
						var h = c.y - d.y;
						var m = Math.sqrt(f * f + h * h);
						e.length = m;
						m = 1 / m;
						f *= m;
						h *= m;
						m = f;
						f = -h;
						h = m;
						e.lprojection = f * c.x + h * c.y;
						e.lnormx = f;
						e.lnormy = h;
						null != e.wrap_lnorm && (e.wrap_lnorm.zpp_inner.x = f, e.wrap_lnorm.zpp_inner.y = h);
						c = d;
						b = b.next
					}
					d = this.lverts.next;
					a = a.elt;
					a.lp0 = c;
					a.lp1 = d;
					b = c.x - d.x;
					d = c.y - d.y;
					e = Math.sqrt(b * b + d * d);
					a.length = e;
					e = 1 / e;
					f = b * e;
					b = -(d * e);
					d = f;
					a.lprojection = b * c.x + d * c.y;
					a.lnormx = b;
					a.lnormy = d;
					null != a.wrap_lnorm &&
						(a.wrap_lnorm.zpp_inner.x = b, a.wrap_lnorm.zpp_inner.y = d)
				}
			},
			validate_gverts: function() {
				if (this.zip_gverts && null != this.body) {
					this.zip_gverts = !1;
					this.validate_lverts();
					this.body.validate_axis();
					for (var a = this.lverts.next, b = this.gverts.next; null != b;) {
						var c = b,
							d = a;
						a = a.next;
						c.x = this.body.posx + (this.body.axisy * d.x - this.body.axisx * d.y);
						c.y = this.body.posy + (d.x * this.body.axisx + d.y * this.body.axisy);
						b = b.next
					}
				}
			},
			validate_gaxi: function() {
				if (this.zip_gaxi && null != this.body) {
					this.zip_gaxi = !1;
					this.validate_laxi();
					this.body.validate_axis();
					this.validate_gverts();
					var a = this.edges.head,
						b = this.gverts.next,
						c = b;
					for (b = b.next; null != b;) {
						var d = b,
							e = a.elt;
						a = a.next;
						e.gp0 = c;
						e.gp1 = d;
						e.gnormx = this.body.axisy * e.lnormx - this.body.axisx * e.lnormy;
						e.gnormy = e.lnormx * this.body.axisx + e.lnormy * this.body.axisy;
						e.gprojection = this.body.posx * e.gnormx + this.body.posy * e.gnormy + e.lprojection;
						null != e.wrap_gnorm && (e.wrap_gnorm.zpp_inner.x = e.gnormx, e.wrap_gnorm.zpp_inner.y = e.gnormy);
						e.tp0 = e.gp0.y * e.gnormx - e.gp0.x * e.gnormy;
						e.tp1 = e.gp1.y * e.gnormx - e.gp1.x * e.gnormy;
						c = d;
						b =
							b.next
					}
					b = this.gverts.next;
					a = a.elt;
					a.gp0 = c;
					a.gp1 = b;
					a.gnormx = this.body.axisy * a.lnormx - this.body.axisx * a.lnormy;
					a.gnormy = a.lnormx * this.body.axisx + a.lnormy * this.body.axisy;
					a.gprojection = this.body.posx * a.gnormx + this.body.posy * a.gnormy + a.lprojection;
					null != a.wrap_gnorm && (a.wrap_gnorm.zpp_inner.x = a.gnormx, a.wrap_gnorm.zpp_inner.y = a.gnormy);
					a.tp0 = a.gp0.y * a.gnormx - a.gp0.x * a.gnormy;
					a.tp1 = a.gp1.y * a.gnormx - a.gp1.x * a.gnormy
				}
			},
			__validate_aabb: function() {
				this.validate_gverts();
				var a = this.gverts.next;
				this.aabb.minx =
					a.x;
				this.aabb.miny = a.y;
				this.aabb.maxx = a.x;
				this.aabb.maxy = a.y;
				for (a = this.gverts.next.next; null != a;) {
					var b = a;
					b.x < this.aabb.minx && (this.aabb.minx = b.x);
					b.x > this.aabb.maxx && (this.aabb.maxx = b.x);
					b.y < this.aabb.miny && (this.aabb.miny = b.y);
					b.y > this.aabb.maxy && (this.aabb.maxy = b.y);
					a = a.next
				}
			},
			_force_validate_aabb: function() {
				var a = this.lverts.next,
					b = this.gverts.next,
					c = a;
				a = a.next;
				b.x = this.body.posx + (this.body.axisy * c.x - this.body.axisx * c.y);
				b.y = this.body.posy + (c.x * this.body.axisx + c.y * this.body.axisy);
				this.aabb.minx =
					b.x;
				this.aabb.miny = b.y;
				this.aabb.maxx = b.x;
				this.aabb.maxy = b.y;
				for (b = this.gverts.next.next; null != b;) {
					c = b;
					var d = a;
					a = a.next;
					c.x = this.body.posx + (this.body.axisy * d.x - this.body.axisx * d.y);
					c.y = this.body.posy + (d.x * this.body.axisx + d.y * this.body.axisy);
					c.x < this.aabb.minx && (this.aabb.minx = c.x);
					c.x > this.aabb.maxx && (this.aabb.maxx = c.x);
					c.y < this.aabb.miny && (this.aabb.miny = c.y);
					c.y > this.aabb.maxy && (this.aabb.maxy = c.y);
					b = b.next
				}
			},
			__validate_sweepRadius: function() {
				var a = 0,
					b = 0;
				this.validate_laxi();
				for (var c = this.lverts.next; null !=
					c;) {
					var d = c;
					d = d.x * d.x + d.y * d.y;
					d > a && (a = d);
					c = c.next
				}
				for (c = this.edges.head; null != c;) {
					d = c.elt;
					if (d.lprojection < b && (b = d.lprojection, 0 > b)) break;
					c = c.next
				}
				0 > b && (b = 0);
				this.sweepRadius = Math.sqrt(a);
				this.sweepCoef = this.sweepRadius - b
			},
			__validate_area_inertia: function() {
				if (null == this.lverts.next || null == this.lverts.next.next || null == this.lverts.next.next.next) this.inertia = this.area = 0;
				else {
					var a = this.area = 0,
						b = 0,
						c = this.lverts.next,
						d = c,
						e = c = c.next;
					for (c = c.next; null != c;) {
						var f = c,
							h = e.y * d.x - e.x * d.y;
						a += h * (e.x * e.x + e.y * e.y +
							(e.x * d.x + e.y * d.y) + (d.x * d.x + d.y * d.y));
						b += h;
						this.area += e.x * (f.y - d.y);
						d = e;
						e = f;
						c = c.next
					}
					var m = c = this.lverts.next;
					f = e.y * d.x - e.x * d.y;
					h = e.x * e.x + e.y * e.y + (e.x * d.x + e.y * d.y) + (d.x * d.x + d.y * d.y);
					this.area += e.x * (m.y - d.y);
					d = e;
					e = m;
					c = c.next;
					m = e.y * d.x - e.x * d.y;
					a = a + f * h + m * (e.x * e.x + e.y * e.y + (e.x * d.x + e.y * d.y) + (d.x * d.x + d.y * d.y));
					this.area += e.x * (c.y - d.y);
					this.inertia = a / (6 * (b + f + m));
					this.area *= .5;
					0 > this.area && (this.area = -this.area, this.reverse_vertices())
				}
			},
			__validate_angDrag: function() {
				this.validate_area_inertia();
				this.validate_laxi();
				var a = 0,
					b = this.edges.head,
					c = 0,
					d = this.lverts.next,
					e = d;
				for (d = d.next; null != d;) {
					var f = d,
						h = b.elt;
					b = b.next;
					c += h.length;
					var m = f.x - e.x;
					var g = f.y - e.y;
					a += h.length * n.fluidAngularDragFriction * this.material.dynamicFriction * h.lprojection * h.lprojection;
					var l = -(e.y * h.lnormx - e.x * h.lnormy) / (g * h.lnormx - m * h.lnormy);
					if (0 < l) {
						var p = 1 < l ? 1 : l;
						var q = e.x;
						var C = e.y;
						var r = p;
						q += m * r;
						C += g * r;
						r = h.lnormy * e.x - h.lnormx * e.y;
						q = h.lnormy * q - h.lnormx * C;
						a += (q * q * q - r * r * r) / (3 * (q - r)) * p * h.length * n.fluidAngularDrag
					}
					1 > l && (l = 0 > l ? 0 : l, p = e.x, e = e.y, q = l,
						p += m * q, e += g * q, e = h.lnormy * p - h.lnormx * e, m = h.lnormy * f.x - h.lnormx * f.y, a += (m * m * m - e * e * e) / (3 * (m - e)) * n.fluidVacuumDrag * (1 - l) * h.length * n.fluidAngularDrag);
					e = f;
					d = d.next
				}
				d = this.lverts.next;
				b = b.elt;
				c += b.length;
				f = d.x - e.x;
				h = d.y - e.y;
				a += b.length * n.fluidAngularDragFriction * this.material.dynamicFriction * b.lprojection * b.lprojection;
				m = -(e.y * b.lnormx - e.x * b.lnormy) / (h * b.lnormx - f * b.lnormy);
				0 < m && (g = 1 < m ? 1 : m, p = e.x, q = e.y, l = b.lnormy * e.x - b.lnormx * e.y, p = b.lnormy * (p + f * g) - b.lnormx * (q + h * g), a += (p * p * p - l * l * l) / (3 * (p - l)) * g * b.length * n.fluidAngularDrag);
				1 > m && (m = 0 > m ? 0 : m, g = e.x, e = e.y, e = b.lnormy * (g + f * m) - b.lnormx * (e + h * m), d = b.lnormy * d.x - b.lnormx * d.y, a += (d * d * d - e * e * e) / (3 * (d - e)) * n.fluidVacuumDrag * (1 - m) * b.length * n.fluidAngularDrag);
				this.angDrag = a / (this.inertia * c)
			},
			__validate_localCOM: function() {
				if (null == this.lverts.next.next) this.localCOMx = this.lverts.next.x, this.localCOMy = this.lverts.next.y;
				else if (null == this.lverts.next.next.next) this.localCOMx = this.lverts.next.x, this.localCOMy = this.lverts.next.y, this.localCOMx += 1 * this.lverts.next.next.x, this.localCOMy +=
					1 * this.lverts.next.next.y, this.localCOMx *= .5, this.localCOMy *= .5;
				else {
					var a = this.localCOMy = this.localCOMx = 0,
						b = this.lverts.next,
						c = b,
						d = b = b.next;
					for (b = b.next; null != b;) {
						var e = b;
						a += d.x * (e.y - c.y);
						c = e.y * d.x - e.x * d.y;
						this.localCOMx += (d.x + e.x) * c;
						this.localCOMy += (d.y + e.y) * c;
						c = d;
						d = e;
						b = b.next
					}
					e = b = this.lverts.next;
					a += d.x * (e.y - c.y);
					c = e.y * d.x - e.x * d.y;
					this.localCOMx += (d.x + e.x) * c;
					this.localCOMy += (d.y + e.y) * c;
					c = d;
					d = e;
					b = b.next;
					a += d.x * (b.y - c.y);
					c = b.y * d.x - b.x * d.y;
					this.localCOMx += (d.x + b.x) * c;
					this.localCOMy += (d.y + b.y) * c;
					a =
						1 / (3 * a);
					this.localCOMx *= a;
					this.localCOMy *= a
				}
			},
			__class__: ud
		});
	var Ab = function() {
		this.sweep = this.dynab = null;
		this.is_sweep = !1;
		this.space = null
	};
	Ab.__name__ = !0;
	Ab.prototype = {
		insert: function(a) {
			this.is_sweep ? this.sweep.__insert(a) : this.dynab.__insert(a)
		},
		remove: function(a) {
			this.is_sweep ? this.sweep.__remove(a) : this.dynab.__remove(a)
		},
		sync: function(a) {
			this.is_sweep ? !this.sweep.space.continuous && a.zip_aabb && null != a.body && (a.zip_aabb = !1, 0 == a.type ? a.circle.__validate_aabb() : a.polygon.__validate_aabb()) : this.dynab.__sync(a)
		},
		broadphase: function(a, b) {},
		clear: function() {},
		__class__: Ab
	};
	var va = function() {
		this.synced = this.first_sync = !1;
		this.snext = null;
		this.moved = !1;
		this.next = this.mnext = null;
		this.height = 0;
		this.parent = this.child1 = this.child2 = null;
		this.dyn = !1;
		this.aabb = this.shape = null;
		this.height = -1
	};
	va.__name__ = !0;
	va.prototype = {
		free: function() {
			this.height = -1;
			var a = this.aabb;
			null != a.outer && (a.outer.zpp_inner = null, a.outer = null);
			a.wrap_min = a.wrap_max = null;
			a._invalidate = null;
			a._validate = null;
			a.next = V.zpp_pool;
			V.zpp_pool = a;
			this.mnext =
				this.snext = this.next = this.child1 = this.child2 = this.parent = null
		},
		__class__: va
	};
	var L = function() {
		this.arb = this.next = null;
		this.id = this.di = 0;
		this.first = this.sleeping = !1;
		this.n1 = this.n2 = null
	};
	L.__name__ = !0;
	L.prototype = {
		__class__: L
	};
	var wa = function() {
		this.root = null
	};
	wa.__name__ = !0;
	wa.prototype = {
		clear: function() {
			if (null != this.root) {
				var a;
				this.root.next = null;
				for (a = this.root; null != a;) {
					var b = a;
					a = b.next;
					b.next = null;
					null == b.child1 ? (b.shape.node = null, b.shape.removedFromSpace(), b.shape = null) : (null != b.child1 && (b.child1.next =
						a, a = b.child1), null != b.child2 && (b.child2.next = a, a = b.child2));
					b.free();
					b.next = va.zpp_pool;
					va.zpp_pool = b
				}
				this.root = null
			}
		},
		inlined_insertLeaf: function(a) {
			if (null == this.root) this.root = a, this.root.parent = null;
			else {
				for (var b = a.aabb, c = this.root; null != c.child1;) {
					var d = c.child1,
						e = c.child2,
						f = c.aabb.perimeter();
					wa.tmpaabb.setCombine(c.aabb, b);
					var h = wa.tmpaabb.perimeter(),
						g = 2 * h;
					f = 2 * (h - f);
					wa.tmpaabb.setCombine(b, d.aabb);
					null == d.child1 ? h = wa.tmpaabb.perimeter() + f : (h = d.aabb.perimeter(), h = wa.tmpaabb.perimeter() - h +
						f);
					wa.tmpaabb.setCombine(b, e.aabb);
					if (null == e.child1) f = wa.tmpaabb.perimeter() + f;
					else {
						var k = e.aabb.perimeter();
						f = wa.tmpaabb.perimeter() - k + f
					}
					if (g < h && g < f) break;
					else c = h < f ? d : e
				}
				d = c.parent;
				null == va.zpp_pool ? e = new va : (e = va.zpp_pool, va.zpp_pool = e.next, e.next = null);
				null == V.zpp_pool ? e.aabb = new V : (e.aabb = V.zpp_pool, V.zpp_pool = e.aabb.next, e.aabb.next = null);
				null;
				e.moved = !1;
				e.synced = !1;
				e.first_sync = !1;
				e.parent = d;
				e.aabb.setCombine(b, c.aabb);
				e.height = c.height + 1;
				null != d ? (d.child1 == c ? d.child1 = e : d.child2 = e, e.child1 =
					c, e.child2 = a, c.parent = e, a.parent = e) : (e.child1 = c, e.child2 = a, c.parent = e, this.root = a.parent = e);
				for (c = a.parent; null != c;) c = this.balance(c), a = c.child1, b = c.child2, d = a.height, e = b.height, c.height = 1 + (d > e ? d : e), c.aabb.setCombine(a.aabb, b.aabb), c = c.parent
			}
		},
		removeLeaf: function(a) {
			this.inlined_removeLeaf(a)
		},
		inlined_removeLeaf: function(a) {
			if (a == this.root) this.root = null;
			else {
				var b = a.parent,
					c = b.parent;
				a = b.child1 == a ? b.child2 : b.child1;
				if (null != c)
					for (c.child1 == b ? c.child1 = a : c.child2 = a, a.parent = c, b.free(), b.next = va.zpp_pool,
						va.zpp_pool = b, b = c; null != b;) b = this.balance(b), a = b.child1, c = b.child2, b.aabb.setCombine(a.aabb, c.aabb), a = a.height, c = c.height, b.height = 1 + (a > c ? a : c), b = b.parent;
				else this.root = a, a.parent = null, b.free(), b.next = va.zpp_pool, va.zpp_pool = b
			}
		},
		balance: function(a) {
			if (null == a.child1 || 2 > a.height) return a;
			var b = a.child1,
				c = a.child2,
				d = c.height - b.height;
			if (1 < d) {
				var e = c.child1,
					f = c.child2;
				c.child1 = a;
				c.parent = a.parent;
				a.parent = c;
				null != c.parent ? c.parent.child1 == a ? c.parent.child1 = c : c.parent.child2 = c : this.root = c;
				e.height > f.height ?
					(c.child2 = e, a.child2 = f, f.parent = a, a.aabb.setCombine(b.aabb, f.aabb), c.aabb.setCombine(a.aabb, e.aabb), a.height = 1 + function(a) {
						a = b.height;
						var c = f.height;
						return a > c ? a : c
					}(this), c.height = 1 + function(b) {
						b = a.height;
						var c = e.height;
						return b > c ? b : c
					}(this)) : (c.child2 = f, a.child2 = e, e.parent = a, a.aabb.setCombine(b.aabb, e.aabb), c.aabb.setCombine(a.aabb, f.aabb), a.height = 1 + function(a) {
						a = b.height;
						var c = e.height;
						return a > c ? a : c
					}(this), c.height = 1 + function(b) {
						b = a.height;
						var c = f.height;
						return b > c ? b : c
					}(this));
				return c
			}
			if (-1 >
				d) {
				var h = b.child1,
					g = b.child2;
				b.child1 = a;
				b.parent = a.parent;
				a.parent = b;
				null != b.parent ? b.parent.child1 == a ? b.parent.child1 = b : b.parent.child2 = b : this.root = b;
				h.height > g.height ? (b.child2 = h, a.child1 = g, g.parent = a, a.aabb.setCombine(c.aabb, g.aabb), b.aabb.setCombine(a.aabb, h.aabb), a.height = 1 + function(a) {
					a = c.height;
					var b = g.height;
					return a > b ? a : b
				}(this), b.height = 1 + function(b) {
					b = a.height;
					var c = h.height;
					return b > c ? b : c
				}(this)) : (b.child2 = g, a.child1 = h, h.parent = a, a.aabb.setCombine(c.aabb, h.aabb), b.aabb.setCombine(a.aabb,
					g.aabb), a.height = 1 + function(a) {
					a = c.height;
					var b = h.height;
					return a > b ? a : b
				}(this), b.height = 1 + function(b) {
					b = a.height;
					var c = g.height;
					return b > c ? b : c
				}(this));
				return b
			}
			return a
		},
		__class__: wa
	};
	var Bd = function(a) {
		this.stree = this.dtree = this.pairs = this.syncs = this.moves = null;
		Ab.call(this);
		this.space = a;
		this.is_sweep = !1;
		this.dynab = this;
		this.stree = new wa;
		this.dtree = new wa
	};
	Bd.__name__ = !0;
	Bd.__super__ = Ab;
	Bd.prototype = r(Ab.prototype, {
		__insert: function(a) {
			if (null == va.zpp_pool) var b = new va;
			else b = va.zpp_pool, va.zpp_pool =
				b.next, b.next = null;
			null == V.zpp_pool ? b.aabb = new V : (b.aabb = V.zpp_pool, V.zpp_pool = b.aabb.next, b.aabb.next = null);
			null;
			b.moved = !1;
			b.synced = !1;
			b.first_sync = !1;
			b.shape = a;
			a.node = b;
			b.synced = !0;
			b.first_sync = !0;
			b.snext = this.syncs;
			this.syncs = b
		},
		__remove: function(a) {
			var b = a.node;
			b.first_sync || (b.dyn ? this.dtree.removeLeaf(b) : this.stree.removeLeaf(b));
			a.node = null;
			if (b.synced) {
				for (var c = null, d = this.syncs; null != d && d != b;) c = d, d = d.snext;
				null == c ? this.syncs = d.snext : c.snext = d.snext;
				d.snext = null;
				b.synced = !1
			}
			if (b.moved) {
				c =
					null;
				for (d = this.moves; null != d && d != b;) c = d, d = d.mnext;
				null == c ? this.moves = d.mnext : c.mnext = d.mnext;
				d.mnext = null;
				b.moved = !1
			}
			c = null;
			for (var e = this.pairs; null != e;) d = e.next, e.n1 == b || e.n2 == b ? (null == c ? this.pairs = d : c.next = d, null != e.arb && (e.arb.pair = null), e.arb = null, e.n1.shape.pairs.remove(e), e.n2.shape.pairs.remove(e), e.n1 = e.n2 = null, e.sleeping = !1, e.next = L.zpp_pool, L.zpp_pool = e) : c = e, e = d;
			for (; null != a.pairs.head;) c = a.pairs.pop_unsafe(), c.n1 == b ? c.n2.shape.pairs.remove(c) : c.n1.shape.pairs.remove(c), null != c.arb && (c.arb.pair =
				null), c.arb = null, c.n1 = c.n2 = null, c.sleeping = !1, c.next = L.zpp_pool, L.zpp_pool = c;
			b.free();
			b.next = va.zpp_pool;
			va.zpp_pool = b
		},
		__sync: function(a) {
			var b = a.node;
			b.synced || (!this.space.continuous && a.zip_aabb && null != a.body && (a.zip_aabb = !1, 0 == a.type ? a.circle.__validate_aabb() : a.polygon.__validate_aabb()), b.dyn == (1 == a.body.type ? !1 : !a.body.component.sleeping) && b.aabb.contains(a.aabb) || (b.synced = !0, b.snext = this.syncs, this.syncs = b))
		},
		broadphase: function(a, b) {
			for (var c = this.syncs; null != c;) {
				var d = c.shape;
				c.first_sync ?
					c.first_sync = !1 : (c.dyn ? this.dtree : this.stree).inlined_removeLeaf(c);
				var e = c.aabb;
				!a.continuous && d.zip_aabb && null != d.body && (d.zip_aabb = !1, 0 == d.type ? d.circle.__validate_aabb() : d.polygon.__validate_aabb());
				e.setExpand(d.aabb, 3);
				((1 == d.body.type ? c.dyn = !1 : c.dyn = !d.body.component.sleeping) ? this.dtree : this.stree).inlined_insertLeaf(c);
				c.synced = !1;
				c = c.snext
			}
			for (; null != this.syncs;)
				if (c = this.syncs, this.syncs = c.snext, c.snext = null, !c.moved && (c.moved = !1, d = c.shape, !d.body.component.sleeping)) {
					e = c.aabb;
					var f = null;
					null != this.dtree.root && (this.dtree.root.next = f, f = this.dtree.root);
					for (; null != f;) {
						var h = f;
						f = h.next;
						h.next = null;
						if (h != c)
							if (null == h.child1) {
								var g = h.shape;
								if (g.body != d.body && (1 != g.body.type || 1 != d.body.type) && e.intersect(h.aabb)) {
									if (d.id < g.id) {
										var k = d.id;
										var l = g.id
									} else k = g.id, l = d.id;
									for (var p = null, n = (d.pairs.length < g.pairs.length ? d : g).pairs.head; null != n;) {
										var q = n.elt;
										if (q.id == k && q.di == l) {
											p = q;
											break
										}
										n = n.next
									}
									null != p ? p.sleeping && (p.sleeping = !1, p.next = this.pairs, this.pairs = p, p.first = !0) : (null == L.zpp_pool ?
										p = new L : (p = L.zpp_pool, L.zpp_pool = p.next, p.next = null), null, p.n1 = c, p.n2 = h, p.id = k, p.di = l, p.next = this.pairs, this.pairs = p, p.first = !0, d.pairs.inlined_add(p), g.pairs.inlined_add(p))
								}
							} else e.intersect(h.aabb) && (null != h.child1 && (h.child1.next = f, f = h.child1), null != h.child2 && (h.child2.next = f, f = h.child2))
					}
					null != this.stree.root && (this.stree.root.next = f, f = this.stree.root);
					for (; null != f;)
						if (h = f, f = h.next, h.next = null, h != c)
							if (null == h.child1) {
								if (g = h.shape, g.body != d.body && (1 != g.body.type || 1 != d.body.type) && e.intersect(h.aabb)) {
									d.id <
										g.id ? (k = d.id, l = g.id) : (k = g.id, l = d.id);
									p = null;
									for (n = (d.pairs.length < g.pairs.length ? d : g).pairs.head; null != n;) {
										q = n.elt;
										if (q.id == k && q.di == l) {
											p = q;
											break
										}
										n = n.next
									}
									null != p ? p.sleeping && (p.sleeping = !1, p.next = this.pairs, this.pairs = p, p.first = !0) : (null == L.zpp_pool ? p = new L : (p = L.zpp_pool, L.zpp_pool = p.next, p.next = null), null, p.n1 = c, p.n2 = h, p.id = k, p.di = l, p.next = this.pairs, this.pairs = p, p.first = !0, d.pairs.inlined_add(p), g.pairs.inlined_add(p))
								}
							} else e.intersect(h.aabb) && (null != h.child1 && (h.child1.next = f, f = h.child1), null !=
								h.child2 && (h.child2.next = f, f = h.child2))
				}
			for (; null != this.moves;)
				if (c = this.moves, this.moves = c.mnext, c.mnext = null, c.moved = !1, d = c.shape, !d.body.component.sleeping) {
					e = c.aabb;
					f = null;
					null != this.dtree.root && (this.dtree.root.next = f, f = this.dtree.root);
					for (; null != f;)
						if (h = f, f = h.next, h.next = null, h != c)
							if (null == h.child1) {
								if (g = h.shape, g.body != d.body && (1 != g.body.type || 1 != d.body.type) && e.intersect(h.aabb)) {
									d.id < g.id ? (k = d.id, l = g.id) : (k = g.id, l = d.id);
									p = null;
									for (n = (d.pairs.length < g.pairs.length ? d : g).pairs.head; null != n;) {
										q =
											n.elt;
										if (q.id == k && q.di == l) {
											p = q;
											break
										}
										n = n.next
									}
									null != p ? p.sleeping && (p.sleeping = !1, p.next = this.pairs, this.pairs = p, p.first = !0) : (null == L.zpp_pool ? p = new L : (p = L.zpp_pool, L.zpp_pool = p.next, p.next = null), null, p.n1 = c, p.n2 = h, p.id = k, p.di = l, p.next = this.pairs, this.pairs = p, p.first = !0, d.pairs.inlined_add(p), g.pairs.inlined_add(p))
								}
							} else e.intersect(h.aabb) && (null != h.child1 && (h.child1.next = f, f = h.child1), null != h.child2 && (h.child2.next = f, f = h.child2));
					null != this.stree.root && (this.stree.root.next = f, f = this.stree.root);
					for (; null != f;)
						if (h = f, f = h.next, h.next = null, h != c)
							if (null == h.child1) {
								if (g = h.shape, g.body != d.body && (1 != g.body.type || 1 != d.body.type) && e.intersect(h.aabb)) {
									d.id < g.id ? (k = d.id, l = g.id) : (k = g.id, l = d.id);
									p = null;
									for (n = (d.pairs.length < g.pairs.length ? d : g).pairs.head; null != n;) {
										q = n.elt;
										if (q.id == k && q.di == l) {
											p = q;
											break
										}
										n = n.next
									}
									null != p ? p.sleeping && (p.sleeping = !1, p.next = this.pairs, this.pairs = p, p.first = !0) : (null == L.zpp_pool ? p = new L : (p = L.zpp_pool, L.zpp_pool = p.next, p.next = null), null, p.n1 = c, p.n2 = h, p.id = k, p.di = l, p.next = this.pairs,
										this.pairs = p, p.first = !0, d.pairs.inlined_add(p), g.pairs.inlined_add(p))
								}
							} else e.intersect(h.aabb) && (null != h.child1 && (h.child1.next = f, f = h.child1), null != h.child2 && (h.child2.next = f, f = h.child2))
				}
			c = null;
			for (d = this.pairs; null != d;) d.first || d.n1.aabb.intersect(d.n2.aabb) ? (e = d.n1.shape, f = e.body, h = d.n2.shape, g = h.body, d.first || !f.component.sleeping && 1 != f.type || !g.component.sleeping && 1 != g.type ? (d.first = !1, e.aabb.intersect(h.aabb) && (c = d.arb, d.arb = b ? a.narrowPhase(e, h, 2 != f.type || 2 != g.type, d.arb, !1) : a.continuousEvent(e,
				h, 2 != f.type || 2 != g.type, d.arb, !1), null == d.arb ? null != c && (c.pair = null) : d.arb.pair = d), c = d) : (d.sleeping = !0, null == c ? this.pairs = d.next : c.next = d.next), d = d.next) : (null == c ? this.pairs = d.next : c.next = d.next, d.n1.shape.pairs.inlined_try_remove(d), d.n2.shape.pairs.inlined_try_remove(d), e = d.next, null != d.arb && (d.arb.pair = null), d.arb = null, d.n1 = d.n2 = null, d.sleeping = !1, d.next = L.zpp_pool, L.zpp_pool = d, d = e)
		},
		clear: function() {
			for (; null != this.syncs;) {
				var a = this.syncs.snext;
				this.syncs.snext = null;
				this.syncs.first_sync && (this.syncs.shape.node =
					null, this.syncs.shape.removedFromSpace(), this.syncs.shape = null);
				this.syncs = a
			}
			for (; null != this.moves;) a = this.moves.mnext, this.moves.mnext = null, this.moves.first_sync && (this.moves.shape.node = null, this.moves.shape.removedFromSpace(), this.moves.shape = null), this.moves = a;
			for (; null != this.pairs;) {
				a = this.pairs.next;
				null != this.pairs.arb && (this.pairs.arb.pair = null);
				this.pairs.arb = null;
				this.pairs.n1.shape.pairs.inlined_try_remove(this.pairs);
				this.pairs.n2.shape.pairs.inlined_try_remove(this.pairs);
				var b = this.pairs;
				b.n1 = b.n2 = null;
				b.sleeping = !1;
				b.next = L.zpp_pool;
				L.zpp_pool = b;
				this.pairs = a
			}
			this.dtree.clear();
			this.stree.clear()
		},
		__class__: Bd
	});
	var ja = function() {
		this.waket = 0;
		this.sleep = !1;
		this.comps = null;
		this.length = 0;
		this._inuse = this.modified = this.pushmod = !1;
		this.next = null;
		this.comps = new md
	};
	ja.__name__ = !0;
	ja.prototype = {
		inlined_add: function(a) {
			a._inuse = !0;
			a.next = this.next;
			this.next = a;
			this.modified = !0;
			this.length++;
			return a
		},
		pop: function() {
			this.inlined_pop()
		},
		inlined_pop: function() {
			var a = this.next;
			this.next = a.next;
			a._inuse = !1;
			null == this.next && (this.pushmod = !0);
			this.modified = !0;
			this.length--
		},
		inlined_pop_unsafe: function() {
			var a = this.next;
			this.pop();
			return a
		},
		__class__: ja
	};
	var Ra = function() {
		this.woken = !1;
		this.waket = 0;
		this.sleeping = !1;
		this.body = this.constraint = this.island = null;
		this.isBody = !1;
		this.rank = 0;
		this.next = this.parent = null;
		this.sleeping = !1;
		this.island = null;
		this.parent = this;
		this.rank = 0;
		this.woken = !1
	};
	Ra.__name__ = !0;
	Ra.prototype = {
		__class__: Ra
	};
	var pa = function() {
		this.freed = this.lazydel = !1;
		this.length = 0;
		this._inuse =
			this.modified = this.pushmod = !1;
		this.int1 = this.int2 = this.next = null;
		this.id = this.di = 0;
		this.arbiters = new kd
	};
	pa.__name__ = !0;
	pa.get = function(a, b) {
		if (null == pa.zpp_pool) var c = new pa;
		else c = pa.zpp_pool, pa.zpp_pool = c.next, c.next = null;
		c.freed = !1;
		c.lazydel = !1;
		c.COLLISIONstate = 1;
		c.COLLISIONstamp = 0;
		c.SENSORstate = 1;
		c.SENSORstamp = 0;
		c.FLUIDstate = 1;
		c.FLUIDstamp = 0;
		a.id < b.id ? (c.int1 = a, c.int2 = b) : (c.int1 = b, c.int2 = a);
		c.id = c.int1.id;
		c.di = c.int2.id;
		return c
	};
	pa.prototype = {
		inlined_add: function(a) {
			a._inuse = !0;
			a.next = this.next;
			this.next = a;
			this.modified = !0;
			this.length++;
			return a
		},
		pop: function() {
			this.inlined_pop()
		},
		inlined_pop: function() {
			var a = this.next;
			this.next = a.next;
			a._inuse = !1;
			null == this.next && (this.pushmod = !0);
			this.modified = !0;
			this.length--
		},
		pop_unsafe: function() {
			return this.inlined_pop_unsafe()
		},
		inlined_pop_unsafe: function() {
			var a = this.next;
			this.pop();
			return a
		},
		inlined_erase: function(a) {
			var b;
			if (null == a) {
				var c = this.next;
				this.next = b = c.next;
				null == this.next && (this.pushmod = !0)
			} else c = a.next, b = c.next, a.next = b, null == b &&
				(this.pushmod = !0);
			c._inuse = !1;
			this.modified = !0;
			this.length--;
			this.pushmod = !0;
			return b
		},
		remove_arb: function(a) {
			this.arbiters.inlined_try_remove(a)
		},
		empty_arb: function(a) {
			var b = !0;
			for (var c = this.arbiters.head; null != c;) {
				if (0 != (c.elt.type & a)) {
					b = !1;
					break
				}
				c = c.next
			}
			return b
		},
		sleeping: function() {
			var a = !0;
			for (var b = this.arbiters.head; null != b;) {
				if (!b.elt.sleeping) {
					a = !1;
					break
				}
				b = b.next
			}
			return a
		},
		__class__: pa
	};
	var $d = function(a) {
		this.cbsets = this.space = null;
		null == fb.zpp_pool ? this.cbsets = new fb : (this.cbsets = fb.zpp_pool,
			fb.zpp_pool = this.cbsets.next, this.cbsets.next = null);
		null;
		this.cbsets.lt = U.setlt;
		this.space = a
	};
	$d.__name__ = !0;
	$d.prototype = {
		get: function(a) {
			if (null == a.head) return null;
			if (null == U.zpp_pool) var b = new U;
			else b = U.zpp_pool, U.zpp_pool = b.next, b.next = null;
			null;
			var c = b.cbTypes;
			b.cbTypes = a;
			var d = this.cbsets.find_weak(b);
			null != d ? a = d.data : (a = U.get(a), this.cbsets.insert(a), a.manager = this);
			b.cbTypes = c;
			b.free();
			b.next = U.zpp_pool;
			U.zpp_pool = b;
			return a
		},
		remove: function(a) {
			for (this.cbsets.remove(a); null != a.cbpairs.head;) {
				var b =
					a.cbpairs.pop_unsafe();
				b.a != b.b && (a == b.a ? b.b.cbpairs.remove(b) : b.a.cbpairs.remove(b));
				b.a = b.b = null;
				b.listeners.clear();
				b.next = ta.zpp_pool;
				ta.zpp_pool = b
			}
			a.manager = null
		},
		clear: function() {},
		validate: function() {
			if (!this.cbsets.empty()) {
				for (var a = this.cbsets.parent; null != a.prev;) a = a.prev;
				for (; null != a;)
					if (a.data.validate(), null != a.next)
						for (a = a.next; null != a.prev;) a = a.prev;
					else {
						for (; null != a.parent && a == a.parent.next;) a = a.parent;
						a = a.parent
					}
			}
		},
		pair: function(a, b) {
			for (var c = null, d = (a.cbpairs.length < b.cbpairs.length ?
					a.cbpairs : b.cbpairs).head; null != d;) {
				var e = d.elt;
				if (e.a == a && e.b == b || e.a == b && e.b == a) {
					c = e;
					break
				}
				d = d.next
			}
			null == c && (c = ta.get(a, b), a.cbpairs.add(c), b != a && b.cbpairs.add(c));
			c.zip_listeners && (c.zip_listeners = !1, c.__validate());
			return c
		},
		__class__: $d
	};
	var Pd = function(a, b) {
		this.precb = this.prelisteners = null;
		this.continuous = !1;
		this.toiEvents = null;
		this.pre_dt = 0;
		this.c_arbiters_true = this.c_arbiters_false = this.f_arbiters = this.s_arbiters = this.live = this.wrap_live = this.live_constraints = this.wrap_livecon = this.staticsleep =
			this.islands = this.listeners = this.wrap_listeners = this.callbacks = this.callbackset_list = this.cbsets = null;
		this.sortcontacts = !1;
		this.time = 0;
		this.midstep = !1;
		this.stamp = 0;
		this.bodies = this.wrap_bodies = this.compounds = this.wrap_compounds = this.constraints = this.wrap_constraints = this.kinematics = this.bphase = this.__static = null;
		this.gravityx = this.gravityy = 0;
		this.outer = null;
		this.toiEvents = new Cd;
		this.global_ang_drag = this.global_lin_drag = .015;
		this.precb = new Oc;
		this.precb.zpp_inner = new kb;
		this.sortcontacts = !0;
		this.pre_dt =
			0;
		var c;
		(c = null == b) || (null == g.Broadphase_DYNAMIC_AABB_TREE && (g.Broadphase_DYNAMIC_AABB_TREE = new ic, g.internal = !1), c = b == g.Broadphase_DYNAMIC_AABB_TREE);
		c ? this.bphase = new Bd(this) : (null == g.Broadphase_SWEEP_AND_PRUNE && (g.Broadphase_SWEEP_AND_PRUNE = new ic, g.internal = !1), b == g.Broadphase_SWEEP_AND_PRUNE && (this.bphase = new Dd(this)));
		this.time = 0;
		null != a ? (this.gravityx = a.x, this.gravityy = a.y) : this.gravityy = this.gravityx = 0;
		this.bodies = new ac;
		this.wrap_bodies = Nb.get(this.bodies);
		this.wrap_bodies.zpp_inner.adder =
			v(this, this.bodies_adder);
		this.wrap_bodies.zpp_inner.subber = v(this, this.bodies_subber);
		this.compounds = new zc;
		this.wrap_compounds = Xb.get(this.compounds);
		this.wrap_compounds.zpp_inner.adder = v(this, this.compounds_adder);
		this.wrap_compounds.zpp_inner.subber = v(this, this.compounds_subber);
		this.kinematics = new ac;
		this.c_arbiters_true = new Ed;
		this.c_arbiters_false = new Ed;
		this.f_arbiters = new nd;
		this.s_arbiters = new ae;
		this.islands = new ja;
		this.live = new ac;
		this.wrap_live = Nb.get(this.live, !0);
		this.staticsleep = new ac;
		this.constraints = new Cb;
		this.wrap_constraints = Jb.get(this.constraints);
		this.wrap_constraints.zpp_inner.adder = v(this, this.constraints_adder);
		this.wrap_constraints.zpp_inner.subber = v(this, this.constraints_subber);
		this.live_constraints = new Cb;
		this.wrap_livecon = Jb.get(this.live_constraints, !0);
		this.__static = db.__static();
		this.__static.zpp_inner.space = this;
		this.callbacks = new kb;
		this.midstep = !1;
		this.listeners = new Fd;
		this.wrap_listeners = hc.get(this.listeners);
		this.wrap_listeners.zpp_inner.adder = v(this, this.listeners_adder);
		this.wrap_listeners.zpp_inner.subber = v(this, this.listeners_subber);
		this.callbackset_list = new pa;
		this.mrca1 = new Db;
		this.mrca2 = new Db;
		this.prelisteners = new dc;
		this.cbsets = new $d(this)
	};
	Pd.__name__ = !0;
	Pd.prototype = {
		clear: function() {
			for (; null != this.listeners.head;) {
				var a = this.listeners.pop_unsafe();
				this.remListener(a)
			}
			for (; null != this.callbackset_list.next;) a = this.callbackset_list.pop_unsafe(), a.arbiters.clear(), a.int1 = a.int2 = null, a.id = a.di = -1, a.freed = !0, null, a.next = pa.zpp_pool, pa.zpp_pool = a;
			for (; null !=
				this.c_arbiters_true.head;) this.c_arbiters_true.pop_unsafe().retire();
			for (; null != this.c_arbiters_false.head;) this.c_arbiters_false.pop_unsafe().retire();
			for (; null != this.s_arbiters.head;) this.s_arbiters.pop_unsafe().retire();
			for (; null != this.f_arbiters.head;) this.f_arbiters.pop_unsafe().retire();
			for (this.bphase.clear(); null != this.bodies.head;) {
				a = this.bodies.pop_unsafe();
				if (null != a.component) {
					var b = a.component.island;
					if (null != b) {
						for (; null != b.comps.head;) {
							var c = b.comps.pop_unsafe();
							c.sleeping = !1;
							c.island =
								null;
							c.parent = c;
							c.rank = 0
						}
						b.next = ja.zpp_pool;
						ja.zpp_pool = b
					}
				}
				a.removedFromSpace();
				a.space = null
			}
			for (; null != this.constraints.head;) {
				a = this.constraints.pop_unsafe();
				if (null != a.component && (b = a.component.island, null != b)) {
					for (; null != b.comps.head;) c = b.comps.pop_unsafe(), c.sleeping = !1, c.island = null, c.parent = c, c.rank = 0;
					b.next = ja.zpp_pool;
					ja.zpp_pool = b
				}
				a.removedFromSpace();
				a.space = null
			}
			this.kinematics.clear();
			for (a = new zc; null != this.compounds.head;) b = this.compounds.pop_unsafe(), a.add(b);
			for (; null != a.head;) {
				b =
					a.pop_unsafe();
				b.removedFromSpace();
				b.space = null;
				for (c = b.bodies.head; null != c;) {
					var d = c.elt;
					if (null != d.component) {
						var e = d.component.island;
						if (null != e) {
							for (; null != e.comps.head;) {
								var f = e.comps.pop_unsafe();
								f.sleeping = !1;
								f.island = null;
								f.parent = f;
								f.rank = 0
							}
							e.next = ja.zpp_pool;
							ja.zpp_pool = e
						}
					}
					d.removedFromSpace();
					d.space = null;
					c = c.next
				}
				for (c = b.constraints.head; null != c;) {
					d = c.elt;
					if (null != d.component && (e = d.component.island, null != e)) {
						for (; null != e.comps.head;) f = e.comps.pop_unsafe(), f.sleeping = !1, f.island = null,
							f.parent = f, f.rank = 0;
						e.next = ja.zpp_pool;
						ja.zpp_pool = e
					}
					d.removedFromSpace();
					d.space = null;
					c = c.next
				}
				for (b = b.compounds.head; null != b;) a.add(b.elt), b = b.next
			}
			this.staticsleep.clear();
			this.live.clear();
			this.live_constraints.clear();
			this.time = this.stamp = 0;
			this.mrca1.clear();
			this.mrca2.clear();
			this.prelisteners.clear();
			this.cbsets.clear()
		},
		bodies_adder: function(a) {
			return a.zpp_inner.space != this ? (null != a.zpp_inner.space && a.zpp_inner.space.outer.zpp_inner.wrap_bodies.remove(a), this.addBody(a.zpp_inner), !0) : !1
		},
		bodies_subber: function(a) {
			this.remBody(a.zpp_inner)
		},
		compounds_adder: function(a) {
			return a.zpp_inner.space != this ? (null != a.zpp_inner.space && a.zpp_inner.space.wrap_compounds.remove(a), this.addCompound(a.zpp_inner), !0) : !1
		},
		compounds_subber: function(a) {
			this.remCompound(a.zpp_inner)
		},
		constraints_adder: function(a) {
			return a.zpp_inner.space != this ? (null != a.zpp_inner.space && a.zpp_inner.space.outer.zpp_inner.wrap_constraints.remove(a), this.addConstraint(a.zpp_inner), !0) : !1
		},
		constraints_subber: function(a) {
			this.remConstraint(a.zpp_inner)
		},
		listeners_adder: function(a) {
			return a.zpp_inner.space != this ? (null != a.zpp_inner.space && a.zpp_inner.space.outer.zpp_inner.wrap_listeners.remove(a), this.addListener(a.zpp_inner), !0) : !1
		},
		listeners_subber: function(a) {
			this.remListener(a.zpp_inner)
		},
		addListener: function(a) {
			a.space = this;
			a.addedToSpace();
			null != a.interaction && null
		},
		remListener: function(a) {
			null != a.interaction && null;
			a.removedFromSpace();
			a.space = null
		},
		add_callbackset: function(a) {
			a.int1.cbsets.inlined_add(a);
			a.int2.cbsets.inlined_add(a);
			this.callbackset_list.inlined_add(a)
		},
		remove_callbackset: function(a) {
			a.lazydel = !0;
			a.int1.cbsets.inlined_try_remove(a);
			a.int2.cbsets.inlined_try_remove(a)
		},
		transmitType: function(a, b) {
			a.world || (a.component.waket = this.stamp + (this.midstep ? 0 : 1), 3 == a.type && (a.kinematicDelaySleep = !0), a.component.sleeping && this.really_wake(a, !1));
			2 == a.type ? this.live.remove(a) : 3 == a.type ? (this.kinematics.remove(a), this.staticsleep.remove(a)) : 1 == a.type && this.staticsleep.remove(a);
			a.type = b;
			3 == a.type && this.kinematics.add(a);
			1 == a.type && this.static_validation(a);
			a.component.sleeping = !0;
			a.world || (a.component.waket = this.stamp + (this.midstep ? 0 : 1), 3 == a.type && (a.kinematicDelaySleep = !0), a.component.sleeping && this.really_wake(a, !0))
		},
		added_shape: function(a, b) {
			null == b && (b = !1);
			b || (b = a.body, b.world || (b.component.waket = this.stamp + (this.midstep ? 0 : 1), 3 == b.type && (b.kinematicDelaySleep = !0), b.component.sleeping && this.really_wake(b, !1)));
			this.bphase.insert(a);
			a.addedToSpace()
		},
		removed_shape: function(a, b) {
			null == b && (b = !1);
			var c = this,
				d = a.body;
			b || d.wake();
			b = null;
			for (var e = d.arbiters.head; null != e;) {
				var f =
					[e.elt];
				if (f[0].ws1 == a || f[0].ws2 == a) {
					if (0 != f[0].present)
						for (this.MRCA_chains(f[0].ws1, f[0].ws2), e = this.mrca1.head; null != e;) {
							for (var h = e.elt, g = this.mrca2.head; null != g;) {
								var k = g.elt,
									l = h.cbSet,
									p = k.cbSet;
								l.validate();
								p.validate();
								l.manager.pair(l, p).empty_intersection() || (k = [ca.get(h, k)], k[0].remove_arb(f[0]), f[0].present--, l.manager.pair(l, p).forall(1, function(a, b) {
									return function(d) {
										if (0 != (d.itype & b[0].type) && a[0].empty_arb(d.itype)) {
											var e = c.push_callback(d);
											e.event = 1;
											ca.int_callback(a[0], d, e);
											e.set =
												a[0]
										}
									}
								}(k, f)), null == k[0].arbiters.head && this.remove_callbackset(k[0]));
								g = g.next
							}
							e = e.next
						}
					f[0].b1 != d && 2 == f[0].b1.type && (e = f[0].b1, e.world || (e.component.waket = this.stamp + (this.midstep ? 0 : 1), 3 == e.type && (e.kinematicDelaySleep = !0), e.component.sleeping && this.really_wake(e, !1)));
					f[0].b2 != d && 2 == f[0].b2.type && (e = f[0].b2, e.world || (e.component.waket = this.stamp + (this.midstep ? 0 : 1), 3 == e.type && (e.kinematicDelaySleep = !0), e.component.sleeping && this.really_wake(e, !1)));
					f[0].cleared = !0;
					null != d && f[0].b2 != d || f[0].b1.arbiters.inlined_try_remove(f[0]);
					null != d && f[0].b1 != d || f[0].b2.arbiters.inlined_try_remove(f[0]);
					null != f[0].pair && (f[0].pair.arb = null, f[0].pair = null);
					f[0].active = !1;
					this.f_arbiters.modified = !0;
					e = d.arbiters.erase(b)
				} else b = e, e = e.next
			}
			this.bphase.remove(a);
			a.removedFromSpace()
		},
		addConstraint: function(a) {
			a.space = this;
			a.addedToSpace();
			a.active && (a.component.sleeping = !0, this.wake_constraint(a, !0))
		},
		remConstraint: function(a) {
			a.active && (this.wake_constraint(a, !0), this.live_constraints.remove(a));
			a.removedFromSpace();
			a.space = null
		},
		addCompound: function(a) {
			a.space =
				this;
			a.addedToSpace();
			for (var b = a.bodies.head; null != b;) this.addBody(b.elt), b = b.next;
			for (b = a.constraints.head; null != b;) this.addConstraint(b.elt), b = b.next;
			for (a = a.compounds.head; null != a;) this.addCompound(a.elt), a = a.next
		},
		remCompound: function(a) {
			for (var b = a.bodies.head; null != b;) this.remBody(b.elt), b = b.next;
			for (b = a.constraints.head; null != b;) this.remConstraint(b.elt), b = b.next;
			for (b = a.compounds.head; null != b;) this.remCompound(b.elt), b = b.next;
			a.removedFromSpace();
			a.space = null
		},
		addBody: function(a, b) {
			null ==
				b && (b = -1);
			a.space = this;
			a.addedToSpace();
			a.component.sleeping = !0;
			a.world || (a.component.waket = this.stamp + (this.midstep ? 0 : 1), 3 == a.type && (a.kinematicDelaySleep = !0), a.component.sleeping && this.really_wake(a, !0));
			for (var c = a.shapes.head; null != c;) this.added_shape(c.elt, !0), c = c.next;
			1 == a.type ? this.static_validation(a) : 2 != a.type && 3 != b && this.kinematics.add(a)
		},
		remBody: function(a, b) {
			null == b && (b = -1);
			1 == a.type ? (a.world || (a.component.waket = this.stamp + (this.midstep ? 0 : 1), 3 == a.type && (a.kinematicDelaySleep = !0), a.component.sleeping &&
				this.really_wake(a, !0)), this.staticsleep.remove(a)) : 2 == a.type ? (a.world || (a.component.waket = this.stamp + (this.midstep ? 0 : 1), 3 == a.type && (a.kinematicDelaySleep = !0), a.component.sleeping && this.really_wake(a, !0)), this.live.remove(a)) : (3 != b && this.kinematics.remove(a), a.world || (a.component.waket = this.stamp + (this.midstep ? 0 : 1), 3 == a.type && (a.kinematicDelaySleep = !0), a.component.sleeping && this.really_wake(a, !0)), this.staticsleep.remove(a));
			for (b = a.shapes.head; null != b;) this.removed_shape(b.elt, !0), b = b.next;
			a.removedFromSpace();
			a.space = null
		},
		push_callback: function(a) {
			if (null == kb.zpp_pool) var b = new kb;
			else b = kb.zpp_pool, kb.zpp_pool = b.next, b.next = null;
			null;
			this.callbacks.push(b);
			b.listener = a;
			return b
		},
		step: function(a, b, c) {
			var d = this;
			this.time += a;
			this.pre_dt = a;
			this.midstep = !0;
			this.stamp++;
			this.validation();
			this.bphase.broadphase(this, !0);
			this.prestep(a);
			if (this.sortcontacts) {
				var e = this.c_arbiters_false;
				if (null != e.head && null != e.head.next) {
					var f = e.head,
						h = null,
						g = null,
						k = null,
						l = null,
						p = 1,
						n;
					do {
						var q = 0;
						g = f;
						for (h = f = null; null != g;) {
							q++;
							k = g;
							var r = 0;
							for (n = p; null != k && r < p;) r++, k = k.next;
							for (; 0 < r || 0 < n && null != k;) 0 == r ? (l = k, k = k.next, n--) : 0 == n || null == k ? (l = g, g = g.next, r--) : (g.elt.active && k.elt.active ? g.elt.oc1.dist < k.elt.oc1.dist : 1) ? (l = g, g = g.next, r--) : (l = k, k = k.next, n--), null != h ? h.next = l : f = l, h = l;
							g = k
						}
						h.next = null;
						p <<= 1
					} while (1 < q);
					e.head = f;
					e.modified = !0;
					e.pushmod = !0
				}
			}
			this.updateVel(a);
			this.warmStart();
			this.iterateVel(b);
			for (b = this.kinematics.head; null != b;) e = b.elt, e.pre_posx = e.posx, e.pre_posy = e.posy, e.pre_rot = e.rot, b = b.next;
			for (b = this.live.head; null !=
				b;) e = b.elt, e.pre_posx = e.posx, e.pre_posy = e.posy, e.pre_rot = e.rot, b = b.next;
			this.updatePos(a);
			this.continuous = !0;
			this.continuousCollisions(a);
			this.continuous = !1;
			this.iteratePos(c);
			for (c = this.kinematics.head; null != c;) b = c.elt, e = b.pre_rot != b.rot, b.posx == b.pre_posx && b.posy == b.pre_posy || b.invalidate_pos(), e && b.invalidate_rot(), c = c.next;
			for (c = this.live.head; null != c;) b = c.elt, e = b.pre_rot != b.rot, b.posx == b.pre_posx && b.posy == b.pre_posy || b.invalidate_pos(), e && b.invalidate_rot(), c = c.next;
			c = null;
			for (b = this.staticsleep.head; null !=
				b;) e = b.elt, 3 != e.type || 0 == e.velx && 0 == e.vely && 0 == e.angvel ? e.kinematicDelaySleep ? (e.kinematicDelaySleep = !1, b = b.next) : (e.component.sleeping = !0, b = this.staticsleep.inlined_erase(c)) : (c = b, b = b.next);
			this.doForests(a);
			this.sleepArbiters();
			this.midstep = !1;
			c = null;
			for (a = this.callbackset_list.next; null != a;) b = [a], null == b[0].arbiters.head ? (a = this.callbackset_list.inlined_erase(c), b = b[0], b.int1 = b.int2 = null, b.id = b.di = -1, b.freed = !0, null, b.next = pa.zpp_pool, pa.zpp_pool = b) : (c = [b[0].sleeping()], U.find_all(b[0].int1.cbSet,
				b[0].int2.cbSet, 6,
				function(a, b) {
					return function(c) {
						if ((!a[0] || c.allowSleepingCallbacks) && !b[0].empty_arb(c.itype)) {
							var e = d.push_callback(c);
							e.event = 6;
							ca.int_callback(b[0], c, e);
							e.set = b[0]
						}
					}
				}(c, b)), c = a, a = a.next);
			for (; !this.callbacks.empty();) a = this.callbacks.pop(), 0 == a.listener.type ? a.listener.body.handler(a.wrapper_body()) : 1 == a.listener.type ? a.listener.constraint.handler(a.wrapper_con()) : 2 == a.listener.type && a.listener.interaction.handleri(a.wrapper_int()), a.int1 = a.int2 = null, a.body = null, a.constraint =
				null, a.listener = null, null != a.wrap_arbiters && (a.wrap_arbiters.zpp_inner.inner = null), a.set = null, a.next = kb.zpp_pool, kb.zpp_pool = a
		},
		continuousCollisions: function(a) {
			var b = 2 * Math.PI / a;
			this.bphase.broadphase(this, !1);
			for (var c = 0; 1 > c && null != this.toiEvents.head;) {
				var d = null;
				c = 2;
				for (var e = !1, f = null, h = null, g = this.toiEvents.head; null != g;) {
					var k = g.elt,
						l = k.s1.body,
						p = k.s2.body;
					if (l.sweepFrozen && p.sweepFrozen)
						if (0 != k.toi && q.testCollide_safe(k.s1, k.s2)) k.toi = 0;
						else {
							g = this.toiEvents.erase(h);
							k.next = Ga.zpp_pool;
							Ga.zpp_pool =
								k;
							continue
						}
					if (k.frozen1 != l.sweepFrozen || k.frozen2 != p.sweepFrozen)
						if (k.kinematic) {
							g = this.toiEvents.erase(h);
							k.next = Ga.zpp_pool;
							Ga.zpp_pool = k;
							continue
						} else if (k.frozen1 = l.sweepFrozen, k.frozen2 = p.sweepFrozen, k.frozen1 && (l = k.s1, k.s1 = k.s2, k.s2 = l, k.frozen1 = !1, k.frozen2 = !0), Ha.staticSweep(k, a, 0, n.collisionSlopCCD), 0 > k.toi) {
						g = this.toiEvents.erase(h);
						k.next = Ga.zpp_pool;
						Ga.zpp_pool = k;
						continue
					}
					0 <= k.toi && (k.toi < c || !e && k.kinematic) && (d = k, c = k.toi, e = k.kinematic, f = h);
					h = g;
					g = g.next
				}
				if (null == d) break;
				this.toiEvents.erase(f);
				c = d.toi;
				e = d.s1.body;
				f = d.s2.body;
				e.sweepFrozen || (e.sweepIntegrate(c * a), e.sweepValidate(d.s1));
				f.sweepFrozen || (f.sweepIntegrate(c * a), f.sweepValidate(d.s2));
				h = this.narrowPhase(d.s1, d.s2, !0, d.arbiter, !0);
				null == h ? null != d.arbiter && null != d.arbiter.pair && (d.arbiter.pair.arb = null, d.arbiter.pair = null) : !this.presteparb(h, a, !0) && h.type == E.COL && h.active && 0 != (h.immState & 1) && (h.colarb.warmStart(), h.colarb.applyImpulseVel(), h.colarb.applyImpulseVel(), h.colarb.applyImpulseVel(), h.colarb.applyImpulseVel(), e.sweep_angvel =
					e.angvel % b, f.sweep_angvel = f.angvel % b);
				null != h && h.active && 0 != (h.immState & 1) && h.type == E.COL && (e.sweepFrozen || 3 == e.type || (e.sweepFrozen = !0, e.angvel = d.failed ? e.sweep_angvel = 0 : d.slipped ? e.sweep_angvel *= n.angularCCDSlipScale : e.sweep_angvel), f.sweepFrozen || 3 == f.type || (f.sweepFrozen = !0, f.angvel = d.failed ? f.sweep_angvel = 0 : d.slipped ? f.sweep_angvel *= n.angularCCDSlipScale : f.sweep_angvel));
				d.next = Ga.zpp_pool;
				Ga.zpp_pool = d
			}
			for (; null != this.toiEvents.head;) b = this.toiEvents.pop_unsafe(), b.next = Ga.zpp_pool, Ga.zpp_pool =
				b;
			for (b = this.kinematics.head; null != b;) d = b.elt, d.sweepIntegrate(a), d.sweepTime = 0, b = b.next;
			for (b = this.live.head; null != b;) d = b.elt, d.sweepFrozen || d.sweepIntegrate(a), d.sweepTime = 0, b = b.next
		},
		continuousEvent: function(a, b, c, d, e) {
			if (a.body.sweepFrozen && b.body.sweepFrozen || a.body.disableCCD || b.body.disableCCD || null != d && null == d.colarb || 0 >= this.interactionType(a, b, a.body, b.body)) return d;
			var f = a.body,
				h = b.body;
			if (c || f.bullet || h.bullet) null == Ga.zpp_pool ? e = new Ga : (e = Ga.zpp_pool, Ga.zpp_pool = e.next, e.next = null),
				e.failed = !1, e.s1 = e.s2 = null, e.arbiter = null, f = 3 == f.type || 3 == h.type, c && !f ? (2 != a.body.type ? (e.s2 = a, e.s1 = b) : (e.s1 = a, e.s2 = b), e.kinematic = !1, Ha.staticSweep(e, this.pre_dt, 0, n.collisionSlopCCD)) : (e.s1 = a, e.s2 = b, e.kinematic = f, e.s1.body.sweepFrozen || e.s2.body.sweepFrozen ? (e.s1.body.sweepFrozen && (a = e.s1, e.s1 = e.s2, e.s2 = a, e.frozen1 = !1, e.frozen2 = !0), Ha.staticSweep(e, this.pre_dt, 0, n.collisionSlopCCD)) : Ha.dynamicSweep(e, this.pre_dt, 0, n.collisionSlopCCD)), c && 0 > e.toi || e.failed ? (c = e, c.next = Ga.zpp_pool, Ga.zpp_pool = c) :
				(this.toiEvents.add(e), e.frozen1 = e.s1.body.sweepFrozen, e.frozen2 = e.s2.body.sweepFrozen, e.arbiter = null != d ? d.colarb : null);
			return d
		},
		bodyCbWake: function(a) {
			if (2 == a.type && null != a.cbSet)
				if (this.midstep)
					for (var b = a.cbSet.bodylisteners.head; null != b;) {
						var c = b.elt;
						2 == c.event && (c = this.push_callback(c), c.event = 2, c.body = a);
						b = b.next
					} else a.component.woken = !0
		},
		bodyCbSleep: function(a) {
			if (2 == a.type && null != a.cbSet)
				for (var b = a.cbSet.bodylisteners.head; null != b;) {
					var c = b.elt;
					3 == c.event && (c = this.push_callback(c), c.event =
						3, c.body = a);
					b = b.next
				}
		},
		constraintCbWake: function(a) {
			if (null != a.cbSet)
				if (this.midstep)
					for (var b = a.cbSet.conlisteners.head; null != b;) {
						var c = b.elt;
						2 == c.event && (c = this.push_callback(c), c.event = 2, c.constraint = a);
						b = b.next
					} else a.component.woken = !0
		},
		constraintCbSleep: function(a) {
			if (null != a.cbSet)
				for (var b = a.cbSet.conlisteners.head; null != b;) {
					var c = b.elt;
					3 == c.event && (c = this.push_callback(c), c.event = 3, c.constraint = a);
					b = b.next
				}
		},
		constraintCbBreak: function(a) {
			if (null != a.cbSet)
				for (var b = a.cbSet.conlisteners.head; null !=
					b;) {
					var c = b.elt;
					4 == c.event && (c = this.push_callback(c), c.event = 4, c.constraint = a);
					b = b.next
				}
		},
		nullListenerType: function(a, b) {
			for (var c = new Db, d = a.interactors.head; null != d;) c.add(d.elt), d = d.next;
			if (a != b)
				for (d = b.interactors.head; null != d;) c.add(d.elt), d = d.next;
			for (; null != c.head;)
				if (d = c.pop_unsafe(), null != d.icompound) {
					d = d.icompound;
					for (var e = d.bodies.head; null != e;) c.add(e.elt), e = e.next;
					for (d = d.compounds.head; null != d;) c.add(d.elt), d = d.next
				} else
					for (e = null != d.ibody ? d.ibody : d.ishape.body, d = null != d.ishape ? d.ishape :
						null, e = e.arbiters.head; null != e;) {
						var f = e.elt;
						if (0 != f.present && (null == d || f.ws1 == d || f.ws2 == d))
							for (this.MRCA_chains(f.ws1, f.ws2), f = this.mrca1.head; null != f;) {
								var h = f.elt;
								if (h.cbSet == a || h.cbSet == b)
									for (var g = this.mrca2.head; null != g;) {
										var k = g.elt;
										if (!(h.cbSet == a && k.cbSet != b || h.cbSet == b && k.cbSet != a) && (k = ca.get(h, k), null != k)) {
											for (; null != k.arbiters.head;) k.arbiters.pop_unsafe().present--;
											this.remove_callbackset(k)
										}
										g = g.next
									}
								f = f.next
							}
						e = e.next
					}
		},
		nullInteractorType: function(a, b) {
			null == b && (b = a);
			if (null != a.icompound) {
				a =
					a.icompound;
				for (var c = a.bodies.head; null != c;) this.nullInteractorType(c.elt, b), c = c.next;
				for (a = a.compounds.head; null != a;) this.nullInteractorType(a.elt, b), a = a.next
			} else
				for (c = null != a.ibody ? a.ibody : a.ishape.body, a = null != a.ishape ? a.ishape : null, c = c.arbiters.head; null != c;) {
					var d = c.elt;
					if (0 != d.present && (null == a || d.ws1 == a || d.ws2 == a)) {
						this.MRCA_chains(d.ws1, d.ws2);
						for (var e = this.mrca1.head; null != e;) {
							for (var f = e.elt, h = this.mrca2.head; null != h;) {
								var g = h.elt;
								if (f == b || g == b) g = ca.get(f, g), null != g && (d.present--, g.remove_arb(d),
									null == g.arbiters.head && this.remove_callbackset(g));
								h = h.next
							}
							e = e.next
						}
					}
					c = c.next
				}
		},
		freshListenerType: function(a, b) {
			for (var c = new Db, d = a.interactors.head; null != d;) c.add(d.elt), d = d.next;
			if (a != b)
				for (d = b.interactors.head; null != d;) c.add(d.elt), d = d.next;
			for (; null != c.head;)
				if (d = c.pop_unsafe(), null != d.icompound) {
					d = d.icompound;
					for (var e = d.bodies.head; null != e;) c.add(e.elt), e = e.next;
					for (d = d.compounds.head; null != d;) c.add(d.elt), d = d.next
				} else
					for (e = null != d.ibody ? d.ibody : d.ishape.body, d = null != d.ishape ? d.ishape : null,
						e = e.arbiters.head; null != e;) {
						var f = e.elt;
						if (f.presentable && (null == d || f.ws1 == d || f.ws2 == d)) {
							this.MRCA_chains(f.ws1, f.ws2);
							for (var h = this.mrca1.head; null != h;) {
								var g = h.elt;
								if (g.cbSet == a || g.cbSet == b)
									for (var k = this.mrca2.head; null != k;) {
										var l = k.elt;
										if (!(g.cbSet == a && l.cbSet != b || g.cbSet == b && l.cbSet != a)) {
											var p = ca.get(g, l);
											null == p && (p = pa.get(g, l), this.add_callbackset(p));
											p.arbiters.inlined_has(f) ? l = !1 : (p.arbiters.inlined_add(f), l = !0);
											l && f.present++
										}
										k = k.next
									}
								h = h.next
							}
						}
						e = e.next
					}
		},
		freshInteractorType: function(a,
			b) {
			null == b && (b = a);
			if (null != a.icompound) {
				a = a.icompound;
				for (var c = a.bodies.head; null != c;) this.freshInteractorType(c.elt, b), c = c.next;
				for (a = a.compounds.head; null != a;) this.freshInteractorType(a.elt, b), a = a.next
			} else
				for (c = null != a.ibody ? a.ibody : a.ishape.body, a = null != a.ishape ? a.ishape : null, c = c.arbiters.head; null != c;) {
					var d = c.elt;
					if (d.presentable && (null == a || d.ws1 == a || d.ws2 == a)) {
						this.MRCA_chains(d.ws1, d.ws2);
						for (var e = this.mrca1.head; null != e;) {
							for (var f = e.elt, h = this.mrca2.head; null != h;) {
								var g = h.elt;
								if (f == b ||
									g == b) {
									var k = f.cbSet,
										l = g.cbSet;
									k.validate();
									l.validate();
									k.manager.pair(k, l).empty_intersection() || (k = ca.get(f, g), null == k && (k = pa.get(f, g), this.add_callbackset(k)), k.arbiters.inlined_has(d) ? g = !1 : (k.arbiters.inlined_add(d), g = !0), g && d.present++)
								}
								h = h.next
							}
							e = e.next
						}
					}
					c = c.next
				}
		},
		wakeCompound: function(a) {
			for (var b = a.bodies.head; null != b;) {
				var c = b.elt;
				c.world || (c.component.waket = this.stamp + (this.midstep ? 0 : 1), 3 == c.type && (c.kinematicDelaySleep = !0), c.component.sleeping && this.really_wake(c, !1));
				b = b.next
			}
			for (b = a.constraints.head; null !=
				b;) this.wake_constraint(b.elt), b = b.next;
			for (a = a.compounds.head; null != a;) this.wakeCompound(a.elt), a = a.next
		},
		wakeIsland: function(a) {
			for (; null != a.comps.head;) {
				var b = a.comps.pop_unsafe();
				b.waket = this.stamp + (this.midstep ? 0 : 1);
				if (b.isBody) {
					var c = b.body;
					this.live.add(c);
					for (var d = c.arbiters.head; null != d;) {
						var e = d.elt;
						e.sleeping && (e.sleeping = !1, e.up_stamp += this.stamp - e.sleep_stamp, e.type == E.COL ? (e = e.colarb, e.stat ? this.c_arbiters_true.inlined_add(e) : this.c_arbiters_false.inlined_add(e)) : e.type == E.FLUID ? this.f_arbiters.inlined_add(e.fluidarb) :
							this.s_arbiters.inlined_add(e.sensorarb));
						d = d.next
					}
					this.bodyCbWake(c);
					b.sleeping = !1;
					b.island = null;
					b.parent = b;
					b.rank = 0;
					if (1 != c.type)
						for (b = c.shapes.head; null != b;) c = b.elt, null != c.node && this.bphase.sync(c), b = b.next
				} else c = b.constraint, this.live_constraints.inlined_add(c), this.constraintCbWake(c), b.sleeping = !1, b.island = null, b.parent = b, b.rank = 0
			}
			a.next = ja.zpp_pool;
			ja.zpp_pool = a
		},
		non_inlined_wake: function(a, b) {
			null == b && (b = !1);
			a.world || (a.component.waket = this.stamp + (this.midstep ? 0 : 1), 3 == a.type && (a.kinematicDelaySleep = !0), a.component.sleeping && this.really_wake(a, b))
		},
		really_wake: function(a, b) {
			null == b && (b = !1);
			if (null == a.component.island) {
				a.component.sleeping = !1;
				3 == a.type || 1 == a.type ? this.staticsleep.inlined_add(a) : this.live.inlined_add(a);
				for (var c = a.constraints.head; null != c;) {
					var d = c.elt;
					d.space == this && this.wake_constraint(d);
					c = c.next
				}
				for (c = a.arbiters.head; null != c;) {
					d = c.elt;
					if (d.sleeping)
						if (d.sleeping = !1, d.up_stamp += this.stamp + (this.midstep ? 0 : 1) - d.sleep_stamp, d.type == E.COL) {
							var e = d.colarb;
							e.stat ? this.c_arbiters_true.inlined_add(e) :
								this.c_arbiters_false.inlined_add(e)
						} else d.type == E.FLUID ? this.f_arbiters.inlined_add(d.fluidarb) : this.s_arbiters.inlined_add(d.sensorarb);
					d.type != E.SENSOR && !d.cleared && d.up_stamp >= this.stamp && 0 != (d.immState & 1) && (2 == d.b1.type && d.b1.component.sleeping && (e = d.b1, e.world || (e.component.waket = this.stamp + (this.midstep ? 0 : 1), 3 == e.type && (e.kinematicDelaySleep = !0), e.component.sleeping && this.really_wake(e, !1))), 2 == d.b2.type && d.b2.component.sleeping && (d = d.b2, d.world || (d.component.waket = this.stamp + (this.midstep ?
						0 : 1), 3 == d.type && (d.kinematicDelaySleep = !0), d.component.sleeping && this.really_wake(d, !1))));
					c = c.next
				}
				b || 2 != a.type || this.bodyCbWake(a);
				if (!b && !this.bphase.is_sweep && 1 != a.type)
					for (a = a.shapes.head; null != a;) b = a.elt, null != b.node && this.bphase.sync(b), a = a.next
			} else this.wakeIsland(a.component.island)
		},
		wake_constraint: function(a, b) {
			null == b && (b = !1);
			return a.active && (a.component.waket = this.stamp + (this.midstep ? 0 : 1), a.component.sleeping) ? (null == a.component.island ? (a.component.sleeping = !1, this.live_constraints.inlined_add(a),
				a.wake_connected(), b || this.constraintCbWake(a)) : this.wakeIsland(a.component.island), !0) : !1
		},
		doForests: function(a) {
			for (var b = this.c_arbiters_false.head; null != b;) {
				var c = b.elt;
				if (!c.cleared && c.up_stamp == this.stamp && 0 != (c.immState & 1) && 2 == c.b1.type && 2 == c.b2.type) {
					if (c.b1.component == c.b1.component.parent) var d = c.b1.component;
					else {
						d = c.b1.component;
						for (var e = null; d != d.parent;) {
							var f = d.parent;
							d.parent = e;
							e = d;
							d = f
						}
						for (; null != e;) f = e.parent, e.parent = d, e = f
					}
					if (c.b2.component == c.b2.component.parent) c = c.b2.component;
					else {
						c = c.b2.component;
						for (e = null; c != c.parent;) f = c.parent, c.parent = e, e = c, c = f;
						for (; null != e;) f = e.parent, e.parent = c, e = f
					}
					d != c && (d.rank < c.rank ? d.parent = c : d.rank > c.rank ? c.parent = d : (c.parent = d, d.rank++))
				}
				b = b.next
			}
			for (b = this.f_arbiters.head; null != b;) {
				c = b.elt;
				if (!c.cleared && c.up_stamp == this.stamp && 0 != (c.immState & 1) && 2 == c.b1.type && 2 == c.b2.type) {
					if (c.b1.component == c.b1.component.parent) d = c.b1.component;
					else {
						d = c.b1.component;
						for (e = null; d != d.parent;) f = d.parent, d.parent = e, e = d, d = f;
						for (; null != e;) f = e.parent, e.parent =
							d, e = f
					}
					if (c.b2.component == c.b2.component.parent) c = c.b2.component;
					else {
						c = c.b2.component;
						for (e = null; c != c.parent;) f = c.parent, c.parent = e, e = c, c = f;
						for (; null != e;) f = e.parent, e.parent = c, e = f
					}
					d != c && (d.rank < c.rank ? d.parent = c : d.rank > c.rank ? c.parent = d : (c.parent = d, d.rank++))
				}
				b = b.next
			}
			for (b = this.live_constraints.head; null != b;) b.elt.forest(), b = b.next;
			for (; null != this.live.head;) {
				d = this.live.inlined_pop_unsafe();
				b = d.component;
				if (b == b.parent) c = b;
				else {
					c = b;
					for (e = null; c != c.parent;) f = c.parent, c.parent = e, e = c, c = f;
					for (; null !=
						e;) f = e.parent, e.parent = c, e = f
				}
				null == c.island && (null == ja.zpp_pool ? c.island = new ja : (c.island = ja.zpp_pool, ja.zpp_pool = c.island.next, c.island.next = null), c.island.waket = 0, this.islands.inlined_add(c.island), c.island.sleep = !0);
				b.island = c.island;
				b.island.comps.inlined_add(b);
				d = d.atRest(a);
				b.island.sleep = b.island.sleep && d;
				b.waket > b.island.waket && (b.island.waket = b.waket)
			}
			for (; null != this.live_constraints.head;) {
				a = this.live_constraints.inlined_pop_unsafe().component;
				if (a == a.parent) b = a;
				else {
					b = a;
					for (d = null; b != b.parent;) c =
						b.parent, b.parent = d, d = b, b = c;
					for (; null != d;) c = d.parent, d.parent = b, d = c
				}
				a.island = b.island;
				a.island.comps.inlined_add(a);
				a.waket > a.island.waket && (a.island.waket = a.waket)
			}
			for (; null != this.islands.next;)
				if (a = this.islands.inlined_pop_unsafe(), a.sleep)
					for (a = a.comps.head; null != a;) {
						d = a.elt;
						if (d.isBody) {
							b = d.body;
							b.velx = 0;
							b.vely = 0;
							b.angvel = 0;
							d.sleeping = !0;
							for (d = b.shapes.head; null != d;) this.bphase.sync(d.elt), d = d.next;
							this.bodyCbSleep(b)
						} else this.constraintCbSleep(d.constraint), d.sleeping = !0;
						a = a.next
					} else {
						for (; null !=
							a.comps.head;) b = a.comps.inlined_pop_unsafe(), b.waket = a.waket, b.isBody ? this.live.inlined_add(b.body) : this.live_constraints.inlined_add(b.constraint), b.sleeping = !1, b.island = null, b.parent = b, b.rank = 0;
						a.next = ja.zpp_pool;
						ja.zpp_pool = a
					}
		},
		sleepArbiters: function() {
			var a = null,
				b = this.c_arbiters_true,
				c = b.head,
				d = null != this.c_arbiters_false;
			d && null == c && (d = !1, c = this.c_arbiters_false.head, b = this.c_arbiters_false, a = null);
			for (; null != c;) {
				var e = c.elt;
				e.b1.component.sleeping && e.b2.component.sleeping ? (e.sleep_stamp = this.stamp,
					e.sleeping = !0, c = b.inlined_erase(a)) : (a = c, c = c.next);
				d && null == c && (d = !1, c = this.c_arbiters_false.head, b = this.c_arbiters_false, a = null)
			}
			a = null;
			b = this.f_arbiters;
			c = b.head;
			d = !1;
			for (; null != c;) e = c.elt, e.b1.component.sleeping && e.b2.component.sleeping ? (e.sleep_stamp = this.stamp, e.sleeping = !0, c = b.inlined_erase(a)) : (a = c, c = c.next), d && null == c && (d = !1, a = b = null);
			a = null;
			b = this.s_arbiters;
			c = b.head;
			d = !1;
			for (; null != c;) e = c.elt, e.b1.component.sleeping && e.b2.component.sleeping ? (e.sleep_stamp = this.stamp, e.sleeping = !0, c = b.inlined_erase(a)) :
				(a = c, c = c.next), d && null == c && (d = !1, a = b = null)
		},
		static_validation: function(a) {
			null != a.shapes.head && a.validate_aabb();
			a.validate_mass();
			a.validate_inertia();
			for (var b = a.shapes.head; null != b;) {
				var c = b.elt;
				1 == c.type && (c.polygon.splice_collinear(), c.polygon.validate_gaxi());
				b = b.next
			}
			a.sweepFrozen = !0
		},
		validation: function() {
			this.cbsets.validate();
			for (var a = this.live.head; null != a;) {
				var b = a.elt;
				b.sweepRadius = 0;
				for (var c = b.shapes.head; null != c;) {
					var d = c.elt;
					1 == d.type && (d.polygon.splice_collinear(), d.polygon.validate_gaxi());
					d.validate_sweepRadius();
					d.sweepRadius > b.sweepRadius && (b.sweepRadius = d.sweepRadius);
					c = c.next
				}
				b.validate_mass();
				b.validate_inertia();
				null != b.shapes.head && (b.validate_aabb(), b.validate_worldCOM());
				b.validate_gravMass();
				b.zip_axis && (b.zip_axis = !1, b.axisx = Math.sin(b.rot), b.axisy = Math.cos(b.rot), null);
				if (b.component.woken && null != b.cbSet)
					for (c = b.cbSet.bodylisteners.head; null != c;) d = c.elt, 2 == d.event && (d = this.push_callback(d), d.event = 2, d.body = b), c = c.next;
				b.component.woken = !1;
				for (b = b.shapes.head; null != b;) this.bphase.sync(b.elt),
					b = b.next;
				a = a.next
			}
			for (a = this.kinematics.head; null != a;) {
				b = a.elt;
				b.sweepRadius = 0;
				for (c = b.shapes.head; null != c;) d = c.elt, 1 == d.type && (d.polygon.splice_collinear(), d.polygon.validate_gaxi()), d.validate_sweepRadius(), d.sweepRadius > b.sweepRadius && (b.sweepRadius = d.sweepRadius), c = c.next;
				b.validate_mass();
				b.validate_inertia();
				null != b.shapes.head && (b.validate_aabb(), b.validate_worldCOM());
				b.validate_gravMass();
				b.zip_axis && (b.zip_axis = !1, b.axisx = Math.sin(b.rot), b.axisy = Math.cos(b.rot), null);
				for (b = b.shapes.head; null !=
					b;) this.bphase.sync(b.elt), b = b.next;
				a = a.next
			}
			for (a = this.live_constraints.head; null != a;) {
				b = a.elt;
				if (b.active) {
					if (b.component.woken && null != b.cbSet)
						for (c = b.cbSet.conlisteners.head; null != c;) d = c.elt, 2 == d.event && (d = this.push_callback(d), d.event = 2, d.constraint = b), c = c.next;
					b.component.woken = !1
				}
				a = a.next
			}
		},
		updateVel: function(a) {
			for (var b = 1 - a * this.global_lin_drag, c = 1 - a * this.global_ang_drag, d = this.live.head; null != d;) {
				var e = d.elt;
				if (0 != e.smass) {
					var f = a * e.imass;
					e.velx = b * e.velx + (e.forcex + this.gravityx * e.gravMass) *
						f;
					e.vely = b * e.vely + (e.forcey + this.gravityy * e.gravMass) * f
				}
				0 != e.sinertia && (e.angvel = c * e.angvel + (e.torque + (this.gravityy * (e.worldCOMx - e.posx) - this.gravityx * (e.worldCOMy - e.posy)) * e.gravMass) * a * e.iinertia);
				d = d.next
			}
		},
		updatePos: function(a) {
			for (var b = 2 * Math.PI / a, c = this.live.head; null != c;) {
				var d = c.elt;
				d.pre_posx = d.posx;
				d.pre_posy = d.posy;
				d.pre_rot = d.rot;
				d.sweepTime = 0;
				d.sweep_angvel = d.angvel % b;
				d.sweepIntegrate(a);
				if (d.disableCCD) d.sweepFrozen = !0, d.bullet = !1;
				else {
					var e = n.staticCCDLinearThreshold * d.sweepRadius,
						f = n.staticCCDAngularThreshold;
					if ((d.velx * d.velx + d.vely * d.vely) * a * a > e * e || d.angvel * d.angvel * a * a > f * f || 3 == d.type) {
						e = d.sweep_angvel;
						0 > e && (e = -e);
						f = 1 / e;
						for (var h = d.shapes.head; null != h;) {
							var g = h.elt,
								k = g.aabb,
								l = k.minx,
								p = k.miny,
								q = k.maxx,
								r = k.maxy,
								u = e * a * g.sweepCoef * .008333333333333333 | 0;
							8 < u && (u = 8);
							var v = e * a / u;
							d.sweepIntegrate(a);
							0 == g.type ? g.circle._force_validate_aabb() : g.polygon._force_validate_aabb();
							l < k.minx ? k.minx = l : l = k.minx;
							p < k.miny ? k.miny = p : p = k.miny;
							q > k.maxx ? k.maxx = q : q = k.maxx;
							r > k.maxy ? k.maxy = r : r = k.maxy;
							for (var y = 1; y < u;) {
								var x = y++;
								d.sweepIntegrate(v * x * f);
								0 == g.type ? g.circle._force_validate_aabb() : g.polygon._force_validate_aabb();
								l < k.minx ? k.minx = l : l = k.minx;
								p < k.miny ? k.miny = p : p = k.miny;
								q > k.maxx ? k.maxx = q : q = k.maxx;
								r > k.maxy ? k.maxy = r : r = k.maxy
							}
							this.bphase.sync(g);
							h = h.next
						}
						d.sweepFrozen = !1;
						2 == d.type && d.bulletEnabled && (e = n.bulletCCDLinearThreshold * d.sweepRadius, f = n.bulletCCDAngularThreshold, (d.velx * d.velx + d.vely * d.vely) * a * a > e * e || d.angvel * d.angvel * a * a > f * f) && (d.bullet = !0)
					} else d.sweepFrozen = !0, d.bullet = !1
				}
				c = c.next
			}
			for (c =
				this.kinematics.head; null != c;) {
				d = c.elt;
				d.pre_posx = d.posx;
				d.pre_posy = d.posy;
				d.pre_rot = d.rot;
				d.sweepTime = 0;
				d.sweep_angvel = d.angvel % b;
				d.sweepIntegrate(a);
				if (d.disableCCD) d.sweepFrozen = !0, d.bullet = !1;
				else if (e = n.staticCCDLinearThreshold * d.sweepRadius, f = n.staticCCDAngularThreshold, (d.velx * d.velx + d.vely * d.vely) * a * a > e * e || d.angvel * d.angvel * a * a > f * f || 3 == d.type) {
					e = d.sweep_angvel;
					0 > e && (e = -e);
					f = 1 / e;
					for (h = d.shapes.head; null != h;) {
						g = h.elt;
						k = g.aabb;
						l = k.minx;
						p = k.miny;
						q = k.maxx;
						r = k.maxy;
						u = e * a * g.sweepCoef * .008333333333333333 |
							0;
						8 < u && (u = 8);
						v = e * a / u;
						d.sweepIntegrate(a);
						0 == g.type ? g.circle._force_validate_aabb() : g.polygon._force_validate_aabb();
						l < k.minx ? k.minx = l : l = k.minx;
						p < k.miny ? k.miny = p : p = k.miny;
						q > k.maxx ? k.maxx = q : q = k.maxx;
						r > k.maxy ? k.maxy = r : r = k.maxy;
						for (y = 1; y < u;) x = y++, d.sweepIntegrate(v * x * f), 0 == g.type ? g.circle._force_validate_aabb() : g.polygon._force_validate_aabb(), l < k.minx ? k.minx = l : l = k.minx, p < k.miny ? k.miny = p : p = k.miny, q > k.maxx ? k.maxx = q : q = k.maxx, r > k.maxy ? k.maxy = r : r = k.maxy;
						this.bphase.sync(g);
						h = h.next
					}
					d.sweepFrozen = !1;
					2 == d.type &&
						d.bulletEnabled && (e = n.bulletCCDLinearThreshold * d.sweepRadius, f = n.bulletCCDAngularThreshold, (d.velx * d.velx + d.vely * d.vely) * a * a > e * e || d.angvel * d.angvel * a * a > f * f) && (d.bullet = !0)
				} else d.sweepFrozen = !0, d.bullet = !1;
				c = c.next
			}
		},
		presteparb: function(a, b, c) {
			null == c && (c = !1);
			var d = this;
			if (!a.cleared && a.b1.component.sleeping && a.b2.component.sleeping) return a.sleep_stamp = this.stamp, a.sleeping = !0;
			if (!a.cleared || 0 != a.present || a.intchange) {
				var e = !c && a.up_stamp == this.stamp - 1 && !a.cleared && !a.intchange;
				c = a.fresh && !a.cleared &&
					!a.intchange;
				e && (a.endGenerated = this.stamp);
				if (c || e || a.cleared || a.intchange)
					for (this.inlined_MRCA_chains(a.ws1, a.ws2), e = this.mrca1.head; null != e;) {
						for (var f = e.elt, g = this.mrca2.head; null != g;) {
							var m = g.elt,
								k = f.cbSet,
								l = m.cbSet;
							if (!k.manager.pair(k, l).empty_intersection()) {
								var p = [ca.get(f, m)];
								c || a.intchange ? (null == p[0] && (p[0] = pa.get(f, m), this.add_callbackset(p[0])), k.manager.pair(k, l).forall(0, function(b) {
									return function(c) {
										if (0 != (c.itype & a.type) && b[0].empty_arb(c.itype)) {
											var e = d.push_callback(c);
											e.event =
												0;
											ca.int_callback(b[0], c, e);
											e.set = b[0]
										}
									}
								}(p)), p[0].arbiters.inlined_has(a) ? m = 0 : (p[0].arbiters.inlined_add(a), m = !0), m && a.present++) : (a.present--, p[0].remove_arb(a), k.manager.pair(k, l).forall(1, function(b) {
									return function(c) {
										if (0 != (c.itype & a.type) && b[0].empty_arb(c.itype)) {
											var e = d.push_callback(c);
											e.event = 1;
											ca.int_callback(b[0], c, e);
											e.set = b[0]
										}
									}
								}(p)), null == p[0].arbiters.head && this.remove_callbackset(p[0]))
							}
							g = g.next
						}
						e = e.next
					}
				a.fresh = !1;
				a.intchange = !1
			}
			if (a.cleared || a.up_stamp + (a.type == E.COL ? n.arbiterExpirationDelay :
					0) < this.stamp) return a.type == E.SENSOR ? a.sensorarb.retire() : a.type == E.FLUID ? a.fluidarb.retire() : a.colarb.retire(), !0;
			c = a.active;
			a.active = a.presentable = a.up_stamp == this.stamp;
			0 != (a.immState & 1) ? a.active && a.type != E.SENSOR && (null != a.colarb ? a.colarb.preStep(b) && (a.active = !1) : a.fluidarb.preStep(this, b)) : null != a.colarb && a.colarb.cleanupContacts() && (a.active = !1);
			c != a.active && (a.b1.arbiters.modified = !0, a.b2.arbiters.modified = !0, this.c_arbiters_true.modified = this.c_arbiters_false.modified = !0, this.s_arbiters.modified =
				this.f_arbiters.modified = !0);
			return !1
		},
		prestep: function(a) {
			for (var b = null, c = this.live_constraints.head; null != c;) {
				var d = c.elt;
				d.preStep(a) ? (c = this.live_constraints.erase(b), d.broken(), this.constraintCbBreak(d), d.removeOnBreak ? (d.component.sleeping = !0, this.midstep = !1, null != d.compound ? d.compound.wrap_constraints.remove(d.outer) : this.wrap_constraints.remove(d.outer), this.midstep = !0) : d.active = !1, d.clearcache()) : (b = c, c = c.next)
			}
			b = null;
			c = this.c_arbiters_true;
			d = c.head;
			var e = null != this.c_arbiters_false;
			e &&
				null == d && (e = !1, d = this.c_arbiters_false.head, c = this.c_arbiters_false, b = null);
			for (; null != d;) this.presteparb(d.elt, a) ? d = c.inlined_erase(b) : (b = d, d = d.next), e && null == d && (e = !1, d = this.c_arbiters_false.head, c = this.c_arbiters_false, b = null);
			b = null;
			c = this.f_arbiters;
			d = c.head;
			e = !1;
			for (; null != d;) this.presteparb(d.elt, a) ? d = c.inlined_erase(b) : (b = d, d = d.next), e && null == d && (e = !1, b = c = null);
			b = null;
			c = this.s_arbiters;
			d = c.head;
			e = !1;
			for (; null != d;) this.presteparb(d.elt, a) ? d = c.inlined_erase(b) : (b = d, d = d.next), e && null == d && (e = !1, b = c = null)
		},
		warmStart: function() {
			for (var a = this.f_arbiters.head; null != a;) {
				var b = a.elt;
				b.active && 0 != (b.immState & 1) && b.warmStart();
				a = a.next
			}
			a = this.c_arbiters_false.head;
			b = !0;
			null == a && (a = this.c_arbiters_true.head, b = !1);
			for (; null != a;) {
				var c = a.elt;
				c.active && 0 != (c.immState & 1) && c.warmStart();
				a = a.next;
				b && null == a && (a = this.c_arbiters_true.head, b = !1)
			}
			for (a = this.live_constraints.head; null != a;) a.elt.warmStart(), a = a.next
		},
		iterateVel: function(a) {
			for (var b = 0; b < a;) {
				b++;
				for (var c = this.f_arbiters.head; null != c;) {
					var d =
						c.elt;
					d.active && 0 != (d.immState & 1) && d.applyImpulseVel();
					c = c.next
				}
				c = null;
				for (d = this.live_constraints.head; null != d;) {
					var e = d.elt;
					e.applyImpulseVel() ? (d = this.live_constraints.erase(c), e.broken(), this.constraintCbBreak(e), e.removeOnBreak ? (e.component.sleeping = !0, this.midstep = !1, null != e.compound ? e.compound.wrap_constraints.remove(e.outer) : this.wrap_constraints.remove(e.outer), this.midstep = !0) : e.active = !1, e.clearcache()) : (c = d, d = d.next)
				}
				c = this.c_arbiters_false.head;
				d = !0;
				null == c && (c = this.c_arbiters_true.head,
					d = !1);
				for (; null != c;) e = c.elt, e.active && 0 != (e.immState & 1) && e.applyImpulseVel(), c = c.next, d && null == c && (c = this.c_arbiters_true.head, d = !1)
			}
		},
		iteratePos: function(a) {
			for (var b = 0; b < a;) {
				b++;
				for (var c = null, d = this.live_constraints.head; null != d;) {
					var e = d.elt;
					!e.__velocity && e.stiff && e.applyImpulsePos() ? (d = this.live_constraints.erase(c), e.broken(), this.constraintCbBreak(e), e.removeOnBreak ? (e.component.sleeping = !0, this.midstep = !1, null != e.compound ? e.compound.wrap_constraints.remove(e.outer) : this.wrap_constraints.remove(e.outer),
						this.midstep = !0) : e.active = !1, e.clearcache()) : (c = d, d = d.next)
				}
				c = this.c_arbiters_false.head;
				d = !0;
				null == c && (c = this.c_arbiters_true.head, d = !1);
				for (; null != c;) e = c.elt, e.active && 0 != (e.immState & 1) && e.applyImpulsePos(), c = c.next, d && null == c && (c = this.c_arbiters_true.head, d = !1)
			}
		},
		group_ignore: function(a, b) {
			a = a.lookup_group();
			if (null == a) return !1;
			b = b.lookup_group();
			if (null == b) return !1;
			for (var c = !1; null != a && null != b;) {
				if (a == b) {
					c = a.ignore;
					break
				}
				a.depth < b.depth ? b = b.group : a = a.group
			}
			return c
		},
		interactionType: function(a,
			b, c, d) {
			var e = !1;
			for (var f = c.constraints.head; null != f;) {
				var g = f.elt;
				if (g.ignore && g.pair_exists(c.id, d.id)) {
					e = !0;
					break
				}
				f = f.next
			}
			return e || this.group_ignore(a, b) ? -1 : (a.sensorEnabled || b.sensorEnabled) && a.filter.shouldSense(b.filter) ? 2 : !a.fluidEnabled && !b.fluidEnabled || !a.filter.shouldFlow(b.filter) || 0 == c.imass && 0 == d.imass && 0 == c.iinertia && 0 == d.iinertia ? !a.filter.shouldCollide(b.filter) || 0 == c.imass && 0 == d.imass && 0 == c.iinertia && 0 == d.iinertia ? -1 : 1 : 0
		},
		narrowPhase: function(a, b, c, d, e) {
			var f = this,
				h = null,
				m = a.body,
				k = b.body,
				l = this.interactionType(a, b, m, k);
			if (-1 != l) {
				if (a.type > b.type) {
					var p = b;
					var n = a
				} else a.type == b.type ? a.id < b.id ? (p = a, n = b) : (n = a, p = b) : (p = a, n = b);
				var r = p == b;
				if (0 == l) {
					if (null == d) {
						for (var u = null, v = (m.arbiters.length < k.arbiters.length ? m : k).arbiters.head; null != v;) {
							var y = v.elt;
							if (y.id == p.id && y.di == n.id) {
								u = y;
								break
							}
							v = v.next
						}
						var x = u
					} else x = d;
					var A = null == x,
						B = !1;
					if (A) {
						if (null == hb.zpp_pool) var w = new hb;
						else w = hb.zpp_pool, hb.zpp_pool = w.next, w.next = null;
						null
					} else null == x.fluidarb ? (x.cleared = !0, x.b1.arbiters.inlined_try_remove(x),
						x.b2.arbiters.inlined_try_remove(x), null != x.pair && (x.pair.arb = null, x.pair = null), x.active = !1, this.f_arbiters.modified = !0, null == hb.zpp_pool ? w = new hb : (w = hb.zpp_pool, hb.zpp_pool = w.next, w.next = null), null, B = A = w.intchange = !0) : w = x.fluidarb;
					if (A || w.stamp != this.stamp || e)
						if (w.stamp = this.stamp, q.flowCollide(p, n, w)) {
							A ? (w.b1 = a.body, w.ws1 = a, w.b2 = b.body, w.ws2 = b, w.id = p.id, w.di = n.id, w.b1.arbiters.inlined_add(w), w.b2.arbiters.inlined_add(w), w.active = !0, w.present = 0, w.cleared = !1, w.sleeping = !1, w.fresh = !1, w.presentable = !1, w.nx = 0, w.ny = 1, w.dampx = 0, w.dampy = 0, w.adamp = 0, this.f_arbiters.inlined_add(w), w.fresh = !B) : w.fresh = w.up_stamp < this.stamp - 1 || w.endGenerated == this.stamp && e;
							w.up_stamp = w.stamp;
							if (w.fresh || 0 == (w.immState & 4)) {
								w.immState = 1;
								var D = !1;
								this.inlined_MRCA_chains(w.ws1.id > w.ws2.id ? w.ws2 : w.ws1, w.ws1.id > w.ws2.id ? w.ws1 : w.ws2);
								for (var E = this.mrca1.head; null != E;) {
									for (var F = E.elt, G = this.mrca2.head; null != G;) {
										var H = G.elt,
											K = F.cbSet,
											N = H.cbSet;
										if (!K.manager.pair(K, N).empty_intersection()) {
											var I = null,
												L = null;
											this.prelisteners.inlined_clear();
											K.manager.pair(K, N).forall(5, function(a) {
												return function(b) {
													0 != (b.itype & 4) && (a[0] = f.prelisteners.inlined_insert(a[0], b), D = D || !b.pure)
												}
											}([null]));
											if (null != this.prelisteners.head)
												if (I = ca.get(F, H), null == I && (L = pa.get(F, H), this.add_callbackset(L)), null == I || (I.FLUIDstamp != this.stamp || e) && 0 == (I.FLUIDstate & 4)) {
													null != L && (I = L);
													if (null != I)
														for (var M = this.prelisteners.head; null != M;) 7 == M.elt.itype && (I.COLLISIONstamp = this.stamp, I.SENSORstamp = this.stamp), I.FLUIDstamp = this.stamp, M = M.next;
													var U = w.active;
													w.active = !0;
													this.precb.zpp_inner.pre_arbiter = w;
													this.precb.zpp_inner.set = I;
													for (var R = this.prelisteners.head; null != R;) {
														var V = R.elt;
														this.precb.zpp_inner.listener = V;
														ca.int_callback(I, V, this.precb.zpp_inner);
														this.precb.zpp_inner.pre_swapped = F != this.precb.zpp_inner.int1;
														var S = V.handlerp(this.precb);
														if (null != S) {
															var Z = S;
															null == g.PreFlag_ACCEPT && (g.PreFlag_ACCEPT = new na, g.internal = !1);
															if (Z == g.PreFlag_ACCEPT) w.immState = 5;
															else {
																var da = S;
																null == g.PreFlag_ACCEPT_ONCE && (g.PreFlag_ACCEPT_ONCE = new na, g.internal = !1);
																if (da == g.PreFlag_ACCEPT_ONCE) w.immState =
																	1;
																else {
																	var fa = S;
																	null == g.PreFlag_IGNORE && (g.PreFlag_IGNORE = new na, g.internal = !1);
																	fa == g.PreFlag_IGNORE ? w.immState = 6 : w.immState = 2
																}
															}
														}
														R = R.next
													}
													w.active = U;
													if (null != I)
														for (var X = this.prelisteners.head; null != X;) 7 == X.elt.itype && (I.COLLISIONstate = w.immState, I.SENSORstate = w.immState), I.FLUIDstate = w.immState, X = X.next
												} else null == I ? 0 == (w.immState & 4) && (w.immState = 1) : w.immState = I.FLUIDstate
										}
										G = G.next
									}
									E = E.next
								}
								if (D && 0 == (w.immState & 4)) {
									if (2 == w.b1.type) {
										var Y = w.b1;
										Y.world || (Y.component.waket = this.stamp + (this.midstep ?
											0 : 1), 3 == Y.type && (Y.kinematicDelaySleep = !0), Y.component.sleeping && this.really_wake(Y, !1))
									}
									if (2 == w.b1.type) {
										var T = w.b2;
										T.world || (T.component.waket = this.stamp + (this.midstep ? 0 : 1), 3 == T.type && (T.kinematicDelaySleep = !0), T.component.sleeping && this.really_wake(T, !1))
									}
								}
							}
							if (0 != (w.immState & 1)) {
								if (2 == w.b1.type && w.b1.component.sleeping) {
									var W = w.b1;
									W.world || (W.component.waket = this.stamp + (this.midstep ? 0 : 1), 3 == W.type && (W.kinematicDelaySleep = !0), W.component.sleeping && this.really_wake(W, !1))
								}
								if (2 == w.b2.type && w.b2.component.sleeping) {
									var ba =
										w.b2;
									ba.world || (ba.component.waket = this.stamp + (this.midstep ? 0 : 1), 3 == ba.type && (ba.kinematicDelaySleep = !0), ba.component.sleeping && this.really_wake(ba, !1))
								}
							}
							w.sleeping && (w.sleeping = !1, this.f_arbiters.inlined_add(w));
							h = w
						} else if (A) {
						var ia = w;
						ia.next = hb.zpp_pool;
						hb.zpp_pool = ia;
						h = null
					} else h = w;
					else h = w
				} else if (1 == l) {
					var ea = c ? this.c_arbiters_true : this.c_arbiters_false;
					if (null == d) {
						for (var ka = null, aa = (m.arbiters.length < k.arbiters.length ? m : k).arbiters.head; null != aa;) {
							var ja = aa.elt;
							if (ja.id == p.id && ja.di == n.id) {
								ka =
									ja;
								break
							}
							aa = aa.next
						}
						var P = ka
					} else P = d;
					var ha = null == P,
						qa = !1;
					if (ha) {
						if (null == Fa.zpp_pool) var t = new Fa;
						else t = Fa.zpp_pool, Fa.zpp_pool = t.next, t.next = null;
						null;
						t.stat = c
					} else null == P.colarb ? (P.cleared = !0, P.b1.arbiters.inlined_try_remove(P), P.b2.arbiters.inlined_try_remove(P), null != P.pair && (P.pair.arb = null, P.pair = null), P.active = !1, this.f_arbiters.modified = !0, null == Fa.zpp_pool ? t = new Fa : (t = Fa.zpp_pool, Fa.zpp_pool = t.next, t.next = null), null, t.intchange = !0, t.stat = c, qa = ha = !0) : (t = P.colarb, r = p != t.s1, t.stat != c && (t.stat =
						c, t.sleeping || ((c ? this.c_arbiters_false : this.c_arbiters_true).remove(t), ea.add(t))));
					if (ha || t.stamp != this.stamp || e)
						if (t.stamp = this.stamp, q.contactCollide(p, n, t, r)) {
							ha ? (t.b1 = a.body, t.ws1 = a, t.b2 = b.body, t.ws2 = b, t.id = p.id, t.di = n.id, t.b1.arbiters.inlined_add(t), t.b2.arbiters.inlined_add(t), t.active = !0, t.present = 0, t.cleared = !1, t.sleeping = !1, t.fresh = !1, t.presentable = !1, t.s1 = a, t.s2 = b, t.userdef_restitution || (t.restitution = -Infinity >= t.s1.material.elasticity || -Infinity >= t.s2.material.elasticity ? 0 : Infinity <=
									t.s1.material.elasticity || Infinity <= t.s2.material.elasticity ? 1 : (t.s1.material.elasticity + t.s2.material.elasticity) / 2, 0 > t.restitution && (t.restitution = 0), 1 < t.restitution && (t.restitution = 1)), t.userdef_dyn_fric || (t.dyn_fric = Math.sqrt(t.s1.material.dynamicFriction * t.s2.material.dynamicFriction)), t.userdef_stat_fric || (t.stat_fric = Math.sqrt(t.s1.material.staticFriction * t.s2.material.staticFriction)), t.userdef_rfric || (t.rfric = Math.sqrt(t.s1.material.rollingFriction * t.s2.material.rollingFriction)), ea.inlined_add(t),
								t.fresh = !qa) : t.fresh = t.up_stamp < this.stamp - 1 || t.endGenerated == this.stamp && e;
							t.up_stamp = t.stamp;
							if (t.fresh || 0 == (t.immState & 4)) {
								t.immState = 1;
								var ma = !1;
								this.inlined_MRCA_chains(t.ws1.id > t.ws2.id ? t.ws2 : t.ws1, t.ws1.id > t.ws2.id ? t.ws1 : t.ws2);
								for (var la = this.mrca1.head; null != la;) {
									for (var ra = la.elt, sa = this.mrca2.head; null != sa;) {
										var Aa = sa.elt,
											ta = ra.cbSet,
											Ga = Aa.cbSet;
										if (!ta.manager.pair(ta, Ga).empty_intersection()) {
											var J = null,
												va = null;
											this.prelisteners.inlined_clear();
											ta.manager.pair(ta, Ga).forall(5, function(a) {
												return function(b) {
													0 !=
														(b.itype & 1) && (a[0] = f.prelisteners.inlined_insert(a[0], b), ma = ma || !b.pure)
												}
											}([null]));
											if (null != this.prelisteners.head)
												if (J = ca.get(ra, Aa), null == J && (va = pa.get(ra, Aa), this.add_callbackset(va)), null == J || (J.COLLISIONstamp != this.stamp || e) && 0 == (J.COLLISIONstate & 4)) {
													null != va && (J = va);
													if (null != J)
														for (var za = this.prelisteners.head; null != za;) 7 == za.elt.itype ? (J.COLLISIONstamp = this.stamp, J.SENSORstamp = this.stamp, J.FLUIDstamp = this.stamp) : J.COLLISIONstamp = this.stamp, za = za.next;
													var Ra = t.active;
													t.active = !0;
													t.cleanupContacts();
													this.precb.zpp_inner.pre_arbiter = t;
													this.precb.zpp_inner.set = J;
													for (var Ca = this.prelisteners.head; null != Ca;) {
														var Ja = Ca.elt;
														this.precb.zpp_inner.listener = Ja;
														ca.int_callback(J, Ja, this.precb.zpp_inner);
														this.precb.zpp_inner.pre_swapped = ra != this.precb.zpp_inner.int1;
														var Da = Ja.handlerp(this.precb);
														if (null != Da) {
															var Ya = Da;
															null == g.PreFlag_ACCEPT && (g.PreFlag_ACCEPT = new na, g.internal = !1);
															if (Ya == g.PreFlag_ACCEPT) t.immState = 5;
															else {
																var Za = Da;
																null == g.PreFlag_ACCEPT_ONCE && (g.PreFlag_ACCEPT_ONCE = new na, g.internal = !1);
																if (Za == g.PreFlag_ACCEPT_ONCE) t.immState = 1;
																else {
																	var ab = Da;
																	null == g.PreFlag_IGNORE && (g.PreFlag_IGNORE = new na, g.internal = !1);
																	ab == g.PreFlag_IGNORE ? t.immState = 6 : t.immState = 2
																}
															}
														}
														Ca = Ca.next
													}
													t.active = Ra;
													if (null != J)
														for (var Ea = this.prelisteners.head; null != Ea;) 7 == Ea.elt.itype ? (J.COLLISIONstate = t.immState, J.SENSORstate = t.immState, J.FLUIDstate = t.immState) : J.COLLISIONstate = t.immState, Ea = Ea.next
												} else null == J ? 0 == (t.immState & 4) && (t.immState = 1) : t.immState = J.COLLISIONstate
										}
										sa = sa.next
									}
									la = la.next
								}
								if (ma && 0 == (t.immState &
										4)) {
									if (2 == t.b1.type) {
										var ua = t.b1;
										ua.world || (ua.component.waket = this.stamp + (this.midstep ? 0 : 1), 3 == ua.type && (ua.kinematicDelaySleep = !0), ua.component.sleeping && this.really_wake(ua, !1))
									}
									if (2 == t.b1.type) {
										var wa = t.b2;
										wa.world || (wa.component.waket = this.stamp + (this.midstep ? 0 : 1), 3 == wa.type && (wa.kinematicDelaySleep = !0), wa.component.sleeping && this.really_wake(wa, !1))
									}
								}
							}
							if (0 != (t.immState & 1)) {
								if (2 == t.b1.type && t.b1.component.sleeping) {
									var xa = t.b1;
									xa.world || (xa.component.waket = this.stamp + (this.midstep ? 0 : 1), 3 == xa.type &&
										(xa.kinematicDelaySleep = !0), xa.component.sleeping && this.really_wake(xa, !1))
								}
								if (2 == t.b2.type && t.b2.component.sleeping) {
									var ya = t.b2;
									ya.world || (ya.component.waket = this.stamp + (this.midstep ? 0 : 1), 3 == ya.type && (ya.kinematicDelaySleep = !0), ya.component.sleeping && this.really_wake(ya, !1))
								}
							}
							t.sleeping && (t.sleeping = !1, ea.inlined_add(t));
							h = t
						} else if (ha) {
						var Ka = t;
						Ka.userdef_dyn_fric = !1;
						Ka.userdef_stat_fric = !1;
						Ka.userdef_restitution = !1;
						Ka.userdef_rfric = !1;
						Ka.__ref_edge1 = Ka.__ref_edge2 = null;
						Ka.next = Fa.zpp_pool;
						Fa.zpp_pool =
							Ka;
						h = null
					} else h = t;
					else h = t
				} else {
					if (null == d) {
						for (var Va = null, Ia = (m.arbiters.length < k.arbiters.length ? m : k).arbiters.head; null != Ia;) {
							var Pa = Ia.elt;
							if (Pa.id == p.id && Pa.di == n.id) {
								Va = Pa;
								break
							}
							Ia = Ia.next
						}
						var eb = Va
					} else eb = d;
					var Ha = null == eb,
						bb = !1;
					if (Ha) {
						if (null == oa.zpp_pool) var z = new oa;
						else z = oa.zpp_pool, oa.zpp_pool = z.next, z.next = null;
						null
					} else null == eb.sensorarb ? (eb.cleared = !0, eb.b1.arbiters.inlined_try_remove(eb), eb.b2.arbiters.inlined_try_remove(eb), null != eb.pair && (eb.pair.arb = null, eb.pair = null), eb.active = !1, this.f_arbiters.modified = !0, null == oa.zpp_pool ? z = new oa : (z = oa.zpp_pool, oa.zpp_pool = z.next, z.next = null), null, bb = Ha = z.intchange = !0) : z = eb.sensorarb;
					if (Ha || z.stamp != this.stamp || e)
						if (z.stamp = this.stamp, q.testCollide(p, n)) {
							Ha ? (z.b1 = a.body, z.ws1 = a, z.b2 = b.body, z.ws2 = b, z.id = p.id, z.di = n.id, z.b1.arbiters.inlined_add(z), z.b2.arbiters.inlined_add(z), z.active = !0, z.present = 0, z.cleared = !1, z.sleeping = !1, z.fresh = !1, z.presentable = !1, this.s_arbiters.inlined_add(z), z.fresh = !bb) : z.fresh = z.up_stamp < this.stamp - 1 || z.endGenerated ==
								this.stamp && e;
							z.up_stamp = z.stamp;
							if (z.fresh || 0 == (z.immState & 4)) {
								z.immState = 1;
								var Ta = !1;
								this.inlined_MRCA_chains(z.ws1.id > z.ws2.id ? z.ws2 : z.ws1, z.ws1.id > z.ws2.id ? z.ws1 : z.ws2);
								for (var La = this.mrca1.head; null != La;) {
									for (var Ma = La.elt, Na = this.mrca2.head; null != Na;) {
										var Wa = Na.elt,
											Oa = Ma.cbSet,
											db = Wa.cbSet;
										if (!Oa.manager.pair(Oa, db).empty_intersection()) {
											var Ba = null,
												Qa = null;
											this.prelisteners.inlined_clear();
											Oa.manager.pair(Oa, db).forall(5, function(a) {
												return function(b) {
													0 != (b.itype & 2) && (a[0] = f.prelisteners.inlined_insert(a[0],
														b), Ta = Ta || !b.pure)
												}
											}([null]));
											if (null != this.prelisteners.head)
												if (Ba = ca.get(Ma, Wa), null == Ba && (Qa = pa.get(Ma, Wa), this.add_callbackset(Qa)), null == Ba || (Ba.SENSORstamp != this.stamp || e) && 0 == (Ba.SENSORstate & 4)) {
													null != Qa && (Ba = Qa);
													if (null != Ba)
														for (var $a = this.prelisteners.head; null != $a;) 7 == $a.elt.itype ? (Ba.COLLISIONstamp = this.stamp, Ba.SENSORstamp = this.stamp, Ba.FLUIDstamp = this.stamp) : Ba.SENSORstamp = this.stamp, $a = $a.next;
													var kb = z.active;
													z.active = !0;
													this.precb.zpp_inner.pre_arbiter = z;
													this.precb.zpp_inner.set = Ba;
													for (var cb = this.prelisteners.head; null != cb;) {
														var gb = cb.elt;
														this.precb.zpp_inner.listener = gb;
														ca.int_callback(Ba, gb, this.precb.zpp_inner);
														this.precb.zpp_inner.pre_swapped = Ma != this.precb.zpp_inner.int1;
														var ib = gb.handlerp(this.precb);
														if (null != ib) {
															var lb = ib;
															null == g.PreFlag_ACCEPT && (g.PreFlag_ACCEPT = new na, g.internal = !1);
															if (lb == g.PreFlag_ACCEPT) z.immState = 5;
															else {
																var mb = ib;
																null == g.PreFlag_ACCEPT_ONCE && (g.PreFlag_ACCEPT_ONCE = new na, g.internal = !1);
																if (mb == g.PreFlag_ACCEPT_ONCE) z.immState = 1;
																else {
																	var ob = ib;
																	null ==
																		g.PreFlag_IGNORE && (g.PreFlag_IGNORE = new na, g.internal = !1);
																	ob == g.PreFlag_IGNORE ? z.immState = 6 : z.immState = 2
																}
															}
														}
														cb = cb.next
													}
													z.active = kb;
													if (null != Ba)
														for (var fb = this.prelisteners.head; null != fb;) 7 == fb.elt.itype ? (Ba.COLLISIONstate = z.immState, Ba.SENSORstate = z.immState, Ba.FLUIDstate = z.immState) : Ba.SENSORstate = z.immState, fb = fb.next
												} else null == Ba ? 0 == (z.immState & 4) && (z.immState = 1) : z.immState = Ba.SENSORstate
										}
										Na = Na.next
									}
									La = La.next
								}
								if (Ta && 0 == (z.immState & 4)) {
									if (1 != z.b1.type) {
										var Ua = z.b1;
										Ua.world || (Ua.component.waket =
											this.stamp + (this.midstep ? 0 : 1), 3 == Ua.type && (Ua.kinematicDelaySleep = !0), Ua.component.sleeping && this.really_wake(Ua, !1))
									}
									if (1 != z.b2.type) {
										var Xa = z.b2;
										Xa.world || (Xa.component.waket = this.stamp + (this.midstep ? 0 : 1), 3 == Xa.type && (Xa.kinematicDelaySleep = !0), Xa.component.sleeping && this.really_wake(Xa, !1))
									}
								}
							}
							z.sleeping && (z.sleeping = !1, this.s_arbiters.inlined_add(z));
							h = z
						} else if (Ha) {
						var nb = z;
						nb.next = oa.zpp_pool;
						oa.zpp_pool = nb;
						h = null
					} else h = z;
					else h = z
				}
			}
			return h
		},
		MRCA_chains: function(a, b) {
			this.inlined_MRCA_chains(a,
				b)
		},
		inlined_MRCA_chains: function(a, b) {
			this.mrca1.inlined_clear();
			this.mrca2.inlined_clear();
			null != a.cbSet && this.mrca1.inlined_add(a);
			null != a.body.cbSet && this.mrca1.inlined_add(a.body);
			null != b.cbSet && this.mrca2.inlined_add(b);
			null != b.body.cbSet && this.mrca2.inlined_add(b.body);
			a = a.body.compound;
			for (b = b.body.compound; a != b;)(null == a ? 0 : a.depth) < (null == b ? 0 : b.depth) ? (null != b.cbSet && this.mrca2.inlined_add(b), b = b.compound) : (null != a.cbSet && this.mrca1.inlined_add(a), a = a.compound)
		},
		__class__: Pd
	};
	var Qb = function() {
		this.next =
			this.prev = this.shape = this.aabb = null
	};
	Qb.__name__ = !0;
	Qb.prototype = {
		__class__: Qb
	};
	var Dd = function(a) {
		this.list = null;
		Ab.call(this);
		this.space = a;
		this.is_sweep = !0;
		this.sweep = this
	};
	Dd.__name__ = !0;
	Dd.__super__ = Ab;
	Dd.prototype = r(Ab.prototype, {
		__insert: function(a) {
			if (null == Qb.zpp_pool) var b = new Qb;
			else b = Qb.zpp_pool, Qb.zpp_pool = b.next, b.next = null;
			null;
			a.sweep = b;
			b.shape = a;
			b.aabb = a.aabb;
			b.next = this.list;
			null != this.list && (this.list.prev = b);
			this.list = b
		},
		__remove: function(a) {
			var b = a.sweep;
			null == b.prev ? this.list =
				b.next : b.prev.next = b.next;
			null != b.next && (b.next.prev = b.prev);
			a.sweep = null;
			b.prev = null;
			b.shape = null;
			b.aabb = null;
			b.next = Qb.zpp_pool;
			Qb.zpp_pool = b
		},
		sync_broadphase_fast: function() {
			for (var a = this.list.next; null != a;) {
				var b = a.next,
					c = a.prev;
				if (!(a.aabb.minx > c.aabb.minx)) {
					for (; null != c.prev && c.prev.aabb.minx > a.aabb.minx;) c = c.prev;
					var d = a.prev;
					d.next = a.next;
					null != a.next && (a.next.prev = d);
					null == c.prev ? (a.prev = null, this.list = a, a.next = c, c.prev = a) : (a.prev = c.prev, c.prev = a, a.prev.next = a, a.next = c)
				}
				a = b
			}
		},
		broadphase: function(a,
			b) {
			if (null != this.list) {
				this.sync_broadphase_fast();
				for (var c = this.list; null != c;) {
					for (var d = c.next, e = c.shape, f = e.body, g = c.aabb.maxx; null != d && !(d.aabb.minx > g);) {
						var m = d.shape,
							k = m.body;
						k == f || 1 == f.type && 1 == k.type || f.component.sleeping && k.component.sleeping || e.aabb.intersectY(m.aabb) && (b ? a.narrowPhase(e, m, 2 != f.type || 2 != k.type, null, !1) : a.continuousEvent(e, m, 2 != f.type || 2 != k.type, null, !1));
						d = d.next
					}
					c = c.next
				}
			}
		},
		clear: function() {
			for (; null != this.list;) this.list.shape.removedFromSpace(), this.__remove(this.list.shape)
		},
		__class__: Dd
	});
	var Xd = function() {
		this.length = 0;
		this.modified = this.pushmod = !1;
		this.head = null
	};
	Xd.__name__ = !0;
	Xd.prototype = {
		inlined_add: function(a) {
			if (null == lc.zpp_pool) var b = new lc;
			else b = lc.zpp_pool, lc.zpp_pool = b.next, b.next = null;
			null;
			b.elt = a;
			b.next = this.head;
			this.head = b;
			this.modified = !0;
			this.length++;
			return a
		},
		inlined_try_remove: function(a) {
			for (var b = null, c = this.head, d = !1; null != c;) {
				if (c.elt == a) {
					this.inlined_erase(b);
					d = !0;
					break
				}
				b = c;
				c = c.next
			}
			return d
		},
		inlined_erase: function(a) {
			var b;
			if (null == a) {
				var c =
					this.head;
				this.head = b = c.next;
				null == this.head && (this.pushmod = !0)
			} else c = a.next, b = c.next, a.next = b, null == b && (this.pushmod = !0);
			a = c;
			a.elt = null;
			a.next = lc.zpp_pool;
			lc.zpp_pool = a;
			this.modified = !0;
			this.length--;
			this.pushmod = !0;
			return b
		},
		__class__: Xd
	};
	var ac = function() {
		this.length = 0;
		this.modified = this.pushmod = !1;
		this.head = null
	};
	ac.__name__ = !0;
	ac.prototype = {
		add: function(a) {
			return this.inlined_add(a)
		},
		inlined_add: function(a) {
			if (null == bb.zpp_pool) var b = new bb;
			else b = bb.zpp_pool, bb.zpp_pool = b.next, b.next = null;
			null;
			b.elt = a;
			b.next = this.head;
			this.head = b;
			this.modified = !0;
			this.length++;
			return a
		},
		insert: function(a, b) {
			return this.inlined_insert(a, b)
		},
		inlined_insert: function(a, b) {
			if (null == bb.zpp_pool) var c = new bb;
			else c = bb.zpp_pool, bb.zpp_pool = c.next, c.next = null;
			null;
			c.elt = b;
			b = c;
			null == a ? (b.next = this.head, this.head = b) : (b.next = a.next, a.next = b);
			this.pushmod = this.modified = !0;
			this.length++;
			return b
		},
		pop: function() {
			this.inlined_pop()
		},
		inlined_pop: function() {
			var a = this.head;
			this.head = a.next;
			a.elt = null;
			a.next = bb.zpp_pool;
			bb.zpp_pool = a;
			null == this.head && (this.pushmod = !0);
			this.modified = !0;
			this.length--
		},
		pop_unsafe: function() {
			return this.inlined_pop_unsafe()
		},
		inlined_pop_unsafe: function() {
			var a = this.head.elt;
			this.pop();
			return a
		},
		remove: function(a) {
			this.inlined_try_remove(a)
		},
		inlined_try_remove: function(a) {
			for (var b = null, c = this.head, d = !1; null != c;) {
				if (c.elt == a) {
					this.inlined_erase(b);
					d = !0;
					break
				}
				b = c;
				c = c.next
			}
			return d
		},
		inlined_erase: function(a) {
			var b;
			if (null == a) {
				var c = this.head;
				this.head = b = c.next;
				null == this.head && (this.pushmod = !0)
			} else c = a.next, b = c.next, a.next = b, null == b && (this.pushmod = !0);
			a = c;
			a.elt = null;
			a.next = bb.zpp_pool;
			bb.zpp_pool = a;
			this.modified = !0;
			this.length--;
			this.pushmod = !0;
			return b
		},
		clear: function() {
			for (; null != this.head;) this.inlined_pop();
			this.pushmod = !0
		},
		iterator_at: function(a) {
			for (var b = this.head; 0 < a-- && null != b;) b = b.next;
			return b
		},
		__class__: ac
	};
	var zc = function() {
		this.length = 0;
		this.modified = this.pushmod = !1;
		this.head = null
	};
	zc.__name__ = !0;
	zc.prototype = {
		add: function(a) {
			return this.inlined_add(a)
		},
		inlined_add: function(a) {
			if (null ==
				Ta.zpp_pool) var b = new Ta;
			else b = Ta.zpp_pool, Ta.zpp_pool = b.next, b.next = null;
			null;
			b.elt = a;
			b.next = this.head;
			this.head = b;
			this.modified = !0;
			this.length++;
			return a
		},
		pop: function() {
			this.inlined_pop()
		},
		inlined_pop: function() {
			var a = this.head;
			this.head = a.next;
			a.elt = null;
			a.next = Ta.zpp_pool;
			Ta.zpp_pool = a;
			null == this.head && (this.pushmod = !0);
			this.modified = !0;
			this.length--
		},
		pop_unsafe: function() {
			return this.inlined_pop_unsafe()
		},
		inlined_pop_unsafe: function() {
			var a = this.head.elt;
			this.pop();
			return a
		},
		remove: function(a) {
			this.inlined_try_remove(a)
		},
		inlined_try_remove: function(a) {
			for (var b = null, c = this.head, d = !1; null != c;) {
				if (c.elt == a) {
					this.inlined_erase(b);
					d = !0;
					break
				}
				b = c;
				c = c.next
			}
			return d
		},
		inlined_erase: function(a) {
			var b;
			if (null == a) {
				var c = this.head;
				this.head = b = c.next;
				null == this.head && (this.pushmod = !0)
			} else c = a.next, b = c.next, a.next = b, null == b && (this.pushmod = !0);
			a = c;
			a.elt = null;
			a.next = Ta.zpp_pool;
			Ta.zpp_pool = a;
			this.modified = !0;
			this.length--;
			this.pushmod = !0;
			return b
		},
		iterator_at: function(a) {
			for (var b = this.head; 0 < a-- && null != b;) b = b.next;
			return b
		},
		__class__: zc
	};
	var kd = function() {
		this.length = 0;
		this.modified = this.pushmod = !1;
		this.head = null
	};
	kd.__name__ = !0;
	kd.prototype = {
		inlined_add: function(a) {
			if (null == La.zpp_pool) var b = new La;
			else b = La.zpp_pool, La.zpp_pool = b.next, b.next = null;
			null;
			b.elt = a;
			b.next = this.head;
			this.head = b;
			this.modified = !0;
			this.length++;
			return a
		},
		pop: function() {
			this.inlined_pop()
		},
		inlined_pop: function() {
			var a = this.head;
			this.head = a.next;
			a.elt = null;
			a.next = La.zpp_pool;
			La.zpp_pool = a;
			null == this.head && (this.pushmod = !0);
			this.modified = !0;
			this.length--
		},
		pop_unsafe: function() {
			return this.inlined_pop_unsafe()
		},
		inlined_pop_unsafe: function() {
			var a = this.head.elt;
			this.pop();
			return a
		},
		inlined_try_remove: function(a) {
			for (var b = null, c = this.head, d = !1; null != c;) {
				if (c.elt == a) {
					this.inlined_erase(b);
					d = !0;
					break
				}
				b = c;
				c = c.next
			}
			return d
		},
		erase: function(a) {
			return this.inlined_erase(a)
		},
		inlined_erase: function(a) {
			var b;
			if (null == a) {
				var c = this.head;
				this.head = b = c.next;
				null == this.head && (this.pushmod = !0)
			} else c = a.next, b = c.next, a.next = b, null == b && (this.pushmod = !0);
			a = c;
			a.elt = null;
			a.next = La.zpp_pool;
			La.zpp_pool = a;
			this.modified = !0;
			this.length--;
			this.pushmod = !0;
			return b
		},
		clear: function() {
			for (; null != this.head;) this.inlined_pop();
			this.pushmod = !0
		},
		inlined_has: function(a) {
			var b = !1;
			for (var c = this.head; null != c;) {
				if (c.elt == a) {
					b = !0;
					break
				}
				c = c.next
			}
			return b
		},
		__class__: kd
	};
	var Qd = function() {
		this.length = 0;
		this.modified = this.pushmod = !1;
		this.head = null
	};
	Qd.__name__ = !0;
	Qd.prototype = {
		add: function(a) {
			return this.inlined_add(a)
		},
		inlined_add: function(a) {
			if (null == Ua.zpp_pool) var b = new Ua;
			else b = Ua.zpp_pool, Ua.zpp_pool = b.next, b.next = null;
			null;
			b.elt = a;
			b.next = this.head;
			this.head = b;
			this.modified = !0;
			this.length++;
			return a
		},
		pop: function() {
			this.inlined_pop()
		},
		inlined_pop: function() {
			var a = this.head;
			this.head = a.next;
			a.elt = null;
			a.next = Ua.zpp_pool;
			Ua.zpp_pool = a;
			null == this.head && (this.pushmod = !0);
			this.modified = !0;
			this.length--
		},
		pop_unsafe: function() {
			return this.inlined_pop_unsafe()
		},
		inlined_pop_unsafe: function() {
			var a = this.head.elt;
			this.pop();
			return a
		},
		remove: function(a) {
			this.inlined_try_remove(a)
		},
		inlined_try_remove: function(a) {
			for (var b = null, c = this.head, d = !1; null != c;) {
				if (c.elt ==
					a) {
					this.inlined_erase(b);
					d = !0;
					break
				}
				b = c;
				c = c.next
			}
			return d
		},
		inlined_erase: function(a) {
			var b;
			if (null == a) {
				var c = this.head;
				this.head = b = c.next;
				null == this.head && (this.pushmod = !0)
			} else c = a.next, b = c.next, a.next = b, null == b && (this.pushmod = !0);
			a = c;
			a.elt = null;
			a.next = Ua.zpp_pool;
			Ua.zpp_pool = a;
			this.modified = !0;
			this.length--;
			this.pushmod = !0;
			return b
		},
		__class__: Qd
	};
	var Zd = function() {
		this.length = 0;
		this.modified = this.pushmod = !1;
		this.head = null
	};
	Zd.__name__ = !0;
	Zd.prototype = {
		inlined_add: function(a) {
			if (null == cb.zpp_pool) var b =
				new cb;
			else b = cb.zpp_pool, cb.zpp_pool = b.next, b.next = null;
			null;
			b.elt = a;
			b.next = this.head;
			this.head = b;
			this.modified = !0;
			this.length++;
			return a
		},
		pop: function() {
			this.inlined_pop()
		},
		inlined_pop: function() {
			var a = this.head;
			this.head = a.next;
			a.elt = null;
			a.next = cb.zpp_pool;
			cb.zpp_pool = a;
			null == this.head && (this.pushmod = !0);
			this.modified = !0;
			this.length--
		},
		pop_unsafe: function() {
			return this.inlined_pop_unsafe()
		},
		inlined_pop_unsafe: function() {
			var a = this.head.elt;
			this.pop();
			return a
		},
		remove: function(a) {
			this.inlined_try_remove(a)
		},
		inlined_try_remove: function(a) {
			for (var b = null, c = this.head, d = !1; null != c;) {
				if (c.elt == a) {
					this.inlined_erase(b);
					d = !0;
					break
				}
				b = c;
				c = c.next
			}
			return d
		},
		inlined_erase: function(a) {
			var b;
			if (null == a) {
				var c = this.head;
				this.head = b = c.next;
				null == this.head && (this.pushmod = !0)
			} else c = a.next, b = c.next, a.next = b, null == b && (this.pushmod = !0);
			a = c;
			a.elt = null;
			a.next = cb.zpp_pool;
			cb.zpp_pool = a;
			this.modified = !0;
			this.length--;
			this.pushmod = !0;
			return b
		},
		__class__: Zd
	};
	var ld = function() {
		this.length = 0;
		this.modified = this.pushmod = !1;
		this.head =
			null
	};
	ld.__name__ = !0;
	ld.prototype = {
		add: function(a) {
			return this.inlined_add(a)
		},
		inlined_add: function(a) {
			if (null == Ma.zpp_pool) var b = new Ma;
			else b = Ma.zpp_pool, Ma.zpp_pool = b.next, b.next = null;
			null;
			b.elt = a;
			b.next = this.head;
			this.head = b;
			this.modified = !0;
			this.length++;
			return a
		},
		insert: function(a, b) {
			return this.inlined_insert(a, b)
		},
		inlined_insert: function(a, b) {
			if (null == Ma.zpp_pool) var c = new Ma;
			else c = Ma.zpp_pool, Ma.zpp_pool = c.next, c.next = null;
			null;
			c.elt = b;
			b = c;
			null == a ? (b.next = this.head, this.head = b) : (b.next =
				a.next, a.next = b);
			this.pushmod = this.modified = !0;
			this.length++;
			return b
		},
		pop: function() {
			this.inlined_pop()
		},
		inlined_pop: function() {
			var a = this.head;
			this.head = a.next;
			a.elt = null;
			a.next = Ma.zpp_pool;
			Ma.zpp_pool = a;
			null == this.head && (this.pushmod = !0);
			this.modified = !0;
			this.length--
		},
		pop_unsafe: function() {
			return this.inlined_pop_unsafe()
		},
		inlined_pop_unsafe: function() {
			var a = this.head.elt;
			this.pop();
			return a
		},
		erase: function(a) {
			return this.inlined_erase(a)
		},
		inlined_erase: function(a) {
			var b;
			if (null == a) {
				var c = this.head;
				this.head = b = c.next;
				null == this.head && (this.pushmod = !0)
			} else c = a.next, b = c.next, a.next = b, null == b && (this.pushmod = !0);
			a = c;
			a.elt = null;
			a.next = Ma.zpp_pool;
			Ma.zpp_pool = a;
			this.modified = !0;
			this.length--;
			this.pushmod = !0;
			return b
		},
		reverse: function() {
			for (var a = this.head, b = null; null != a;) {
				var c = a.next;
				a.next = b;
				b = this.head = a;
				a = c
			}
			this.pushmod = this.modified = !0
		},
		iterator_at: function(a) {
			for (var b = this.head; 0 < a-- && null != b;) b = b.next;
			return b
		},
		__class__: ld
	};
	var md = function() {
		this.length = 0;
		this.modified = this.pushmod = !1;
		this.head =
			null
	};
	md.__name__ = !0;
	md.prototype = {
		inlined_add: function(a) {
			if (null == mc.zpp_pool) var b = new mc;
			else b = mc.zpp_pool, mc.zpp_pool = b.next, b.next = null;
			null;
			b.elt = a;
			b.next = this.head;
			this.head = b;
			this.modified = !0;
			this.length++;
			return a
		},
		pop: function() {
			this.inlined_pop()
		},
		inlined_pop: function() {
			var a = this.head;
			this.head = a.next;
			a.elt = null;
			a.next = mc.zpp_pool;
			mc.zpp_pool = a;
			null == this.head && (this.pushmod = !0);
			this.modified = !0;
			this.length--
		},
		pop_unsafe: function() {
			return this.inlined_pop_unsafe()
		},
		inlined_pop_unsafe: function() {
			var a =
				this.head.elt;
			this.pop();
			return a
		},
		__class__: md
	};
	var nd = function() {
		this.length = 0;
		this.modified = this.pushmod = !1;
		this.head = null
	};
	nd.__name__ = !0;
	nd.prototype = {
		inlined_add: function(a) {
			if (null == Rb.zpp_pool) var b = new Rb;
			else b = Rb.zpp_pool, Rb.zpp_pool = b.next, b.next = null;
			null;
			b.elt = a;
			b.next = this.head;
			this.head = b;
			this.modified = !0;
			this.length++;
			return a
		},
		pop: function() {
			this.inlined_pop()
		},
		inlined_pop: function() {
			var a = this.head;
			this.head = a.next;
			a.elt = null;
			a.next = Rb.zpp_pool;
			Rb.zpp_pool = a;
			null == this.head && (this.pushmod = !0);
			this.modified = !0;
			this.length--
		},
		pop_unsafe: function() {
			return this.inlined_pop_unsafe()
		},
		inlined_pop_unsafe: function() {
			var a = this.head.elt;
			this.pop();
			return a
		},
		inlined_erase: function(a) {
			var b;
			if (null == a) {
				var c = this.head;
				this.head = b = c.next;
				null == this.head && (this.pushmod = !0)
			} else c = a.next, b = c.next, a.next = b, null == b && (this.pushmod = !0);
			a = c;
			a.elt = null;
			a.next = Rb.zpp_pool;
			Rb.zpp_pool = a;
			this.modified = !0;
			this.length--;
			this.pushmod = !0;
			return b
		},
		__class__: nd
	};
	var ae = function() {
		this.length = 0;
		this.modified =
			this.pushmod = !1;
		this.head = null
	};
	ae.__name__ = !0;
	ae.prototype = {
		inlined_add: function(a) {
			if (null == gb.zpp_pool) var b = new gb;
			else b = gb.zpp_pool, gb.zpp_pool = b.next, b.next = null;
			null;
			b.elt = a;
			b.next = this.head;
			this.head = b;
			this.modified = !0;
			this.length++;
			return a
		},
		pop: function() {
			this.inlined_pop()
		},
		inlined_pop: function() {
			var a = this.head;
			this.head = a.next;
			a.elt = null;
			a.next = gb.zpp_pool;
			gb.zpp_pool = a;
			null == this.head && (this.pushmod = !0);
			this.modified = !0;
			this.length--
		},
		pop_unsafe: function() {
			return this.inlined_pop_unsafe()
		},
		inlined_pop_unsafe: function() {
			var a = this.head.elt;
			this.pop();
			return a
		},
		inlined_erase: function(a) {
			var b;
			if (null == a) {
				var c = this.head;
				this.head = b = c.next;
				null == this.head && (this.pushmod = !0)
			} else c = a.next, b = c.next, a.next = b, null == b && (this.pushmod = !0);
			a = c;
			a.elt = null;
			a.next = gb.zpp_pool;
			gb.zpp_pool = a;
			this.modified = !0;
			this.length--;
			this.pushmod = !0;
			return b
		},
		__class__: ae
	};
	var Fd = function() {
		this.length = 0;
		this.modified = this.pushmod = !1;
		this.head = null
	};
	Fd.__name__ = !0;
	Fd.prototype = {
		add: function(a) {
			return this.inlined_add(a)
		},
		inlined_add: function(a) {
			if (null == xa.zpp_pool) var b = new xa;
			else b = xa.zpp_pool, xa.zpp_pool = b.next, b.next = null;
			null;
			b.elt = a;
			b.next = this.head;
			this.head = b;
			this.modified = !0;
			this.length++;
			return a
		},
		insert: function(a, b) {
			return this.inlined_insert(a, b)
		},
		inlined_insert: function(a, b) {
			if (null == xa.zpp_pool) var c = new xa;
			else c = xa.zpp_pool, xa.zpp_pool = c.next, c.next = null;
			null;
			c.elt = b;
			b = c;
			null == a ? (b.next = this.head, this.head = b) : (b.next = a.next, a.next = b);
			this.pushmod = this.modified = !0;
			this.length++;
			return b
		},
		pop: function() {
			this.inlined_pop()
		},
		inlined_pop: function() {
			var a = this.head;
			this.head = a.next;
			a.elt = null;
			a.next = xa.zpp_pool;
			xa.zpp_pool = a;
			null == this.head && (this.pushmod = !0);
			this.modified = !0;
			this.length--
		},
		pop_unsafe: function() {
			return this.inlined_pop_unsafe()
		},
		inlined_pop_unsafe: function() {
			var a = this.head.elt;
			this.pop();
			return a
		},
		remove: function(a) {
			this.inlined_try_remove(a)
		},
		inlined_try_remove: function(a) {
			for (var b = null, c = this.head, d = !1; null != c;) {
				if (c.elt == a) {
					this.inlined_erase(b);
					d = !0;
					break
				}
				b = c;
				c = c.next
			}
			return d
		},
		erase: function(a) {
			return this.inlined_erase(a)
		},
		inlined_erase: function(a) {
			var b;
			if (null == a) {
				var c = this.head;
				this.head = b = c.next;
				null == this.head && (this.pushmod = !0)
			} else c = a.next, b = c.next, a.next = b, null == b && (this.pushmod = !0);
			a = c;
			a.elt = null;
			a.next = xa.zpp_pool;
			xa.zpp_pool = a;
			this.modified = !0;
			this.length--;
			this.pushmod = !0;
			return b
		},
		iterator_at: function(a) {
			for (var b = this.head; 0 < a-- && null != b;) b = b.next;
			return b
		},
		__class__: Fd
	};
	var Ed = function() {
		this.length = 0;
		this.modified = this.pushmod = !1;
		this.head = null
	};
	Ed.__name__ = !0;
	Ed.prototype = {
		add: function(a) {
			return this.inlined_add(a)
		},
		inlined_add: function(a) {
			if (null == Bb.zpp_pool) var b = new Bb;
			else b = Bb.zpp_pool, Bb.zpp_pool = b.next, b.next = null;
			null;
			b.elt = a;
			b.next = this.head;
			this.head = b;
			this.modified = !0;
			this.length++;
			return a
		},
		pop: function() {
			this.inlined_pop()
		},
		inlined_pop: function() {
			var a = this.head;
			this.head = a.next;
			a.elt = null;
			a.next = Bb.zpp_pool;
			Bb.zpp_pool = a;
			null == this.head && (this.pushmod = !0);
			this.modified = !0;
			this.length--
		},
		pop_unsafe: function() {
			return this.inlined_pop_unsafe()
		},
		inlined_pop_unsafe: function() {
			var a = this.head.elt;
			this.pop();
			return a
		},
		remove: function(a) {
			this.inlined_try_remove(a)
		},
		inlined_try_remove: function(a) {
			for (var b = null, c = this.head, d = !1; null != c;) {
				if (c.elt == a) {
					this.inlined_erase(b);
					d = !0;
					break
				}
				b = c;
				c = c.next
			}
			return d
		},
		inlined_erase: function(a) {
			var b;
			if (null == a) {
				var c = this.head;
				this.head = b = c.next;
				null == this.head && (this.pushmod = !0)
			} else c = a.next, b = c.next, a.next = b, null == b && (this.pushmod = !0);
			a = c;
			a.elt = null;
			a.next = Bb.zpp_pool;
			Bb.zpp_pool = a;
			this.modified = !0;
			this.length--;
			this.pushmod = !0;
			return b
		},
		__class__: Ed
	};
	var Cd = function() {
		this.length =
			0;
		this.modified = this.pushmod = !1;
		this.head = null
	};
	Cd.__name__ = !0;
	Cd.prototype = {
		add: function(a) {
			return this.inlined_add(a)
		},
		inlined_add: function(a) {
			if (null == Sb.zpp_pool) var b = new Sb;
			else b = Sb.zpp_pool, Sb.zpp_pool = b.next, b.next = null;
			null;
			b.elt = a;
			b.next = this.head;
			this.head = b;
			this.modified = !0;
			this.length++;
			return a
		},
		pop: function() {
			this.inlined_pop()
		},
		inlined_pop: function() {
			var a = this.head;
			this.head = a.next;
			a.elt = null;
			a.next = Sb.zpp_pool;
			Sb.zpp_pool = a;
			null == this.head && (this.pushmod = !0);
			this.modified = !0;
			this.length--
		},
		pop_unsafe: function() {
			return this.inlined_pop_unsafe()
		},
		inlined_pop_unsafe: function() {
			var a = this.head.elt;
			this.pop();
			return a
		},
		erase: function(a) {
			return this.inlined_erase(a)
		},
		inlined_erase: function(a) {
			var b;
			if (null == a) {
				var c = this.head;
				this.head = b = c.next;
				null == this.head && (this.pushmod = !0)
			} else c = a.next, b = c.next, a.next = b, null == b && (this.pushmod = !0);
			a = c;
			a.elt = null;
			a.next = Sb.zpp_pool;
			Sb.zpp_pool = a;
			this.modified = !0;
			this.length--;
			this.pushmod = !0;
			return b
		},
		__class__: Cd
	};
	var Ea = function() {
		this.next = this.elt =
			null
	};
	Ea.__name__ = !0;
	Ea.prototype = {
		__class__: Ea
	};
	var lc = function() {
		this.next = this.elt = null
	};
	lc.__name__ = !0;
	lc.prototype = {
		__class__: lc
	};
	var Oa = function() {
		this.next = this.elt = null
	};
	Oa.__name__ = !0;
	Oa.prototype = {
		__class__: Oa
	};
	var bb = function() {
		this.next = this.elt = null
	};
	bb.__name__ = !0;
	bb.prototype = {
		__class__: bb
	};
	var qa = function() {
		this.next = this.elt = null
	};
	qa.__name__ = !0;
	qa.prototype = {
		__class__: qa
	};
	var Ta = function() {
		this.next = this.elt = null
	};
	Ta.__name__ = !0;
	Ta.prototype = {
		__class__: Ta
	};
	var La = function() {
		this.next =
			this.elt = null
	};
	La.__name__ = !0;
	La.prototype = {
		__class__: La
	};
	var ha = function() {
		this.next = this.elt = null
	};
	ha.__name__ = !0;
	ha.prototype = {
		__class__: ha
	};
	var Fb = function() {
		this.next = this.elt = null
	};
	Fb.__name__ = !0;
	Fb.prototype = {
		__class__: Fb
	};
	var Wa = function() {
		this.next = this.elt = null
	};
	Wa.__name__ = !0;
	Wa.prototype = {
		__class__: Wa
	};
	var Ia = function() {
		this.next = this.elt = null
	};
	Ia.__name__ = !0;
	Ia.prototype = {
		__class__: Ia
	};
	var Ua = function() {
		this.next = this.elt = null
	};
	Ua.__name__ = !0;
	Ua.prototype = {
		__class__: Ua
	};
	var Eb = function() {
		this.next =
			this.elt = null
	};
	Eb.__name__ = !0;
	Eb.prototype = {
		__class__: Eb
	};
	var la = function() {
		this.next = this.elt = null
	};
	la.__name__ = !0;
	la.prototype = {
		__class__: la
	};
	var cb = function() {
		this.next = this.elt = null
	};
	cb.__name__ = !0;
	cb.prototype = {
		__class__: cb
	};
	var Ma = function() {
		this.next = this.elt = null
	};
	Ma.__name__ = !0;
	Ma.prototype = {
		__class__: Ma
	};
	var mc = function() {
		this.next = this.elt = null
	};
	mc.__name__ = !0;
	mc.prototype = {
		__class__: mc
	};
	var Rb = function() {
		this.next = this.elt = null
	};
	Rb.__name__ = !0;
	Rb.prototype = {
		__class__: Rb
	};
	var gb = function() {
		this.next =
			this.elt = null
	};
	gb.__name__ = !0;
	gb.prototype = {
		__class__: gb
	};
	var xa = function() {
		this.next = this.elt = null
	};
	xa.__name__ = !0;
	xa.prototype = {
		__class__: xa
	};
	var Bb = function() {
		this.next = this.elt = null
	};
	Bb.__name__ = !0;
	Bb.prototype = {
		__class__: Bb
	};
	var Sb = function() {
		this.next = this.elt = null
	};
	Sb.__name__ = !0;
	Sb.prototype = {
		__class__: Sb
	};
	var kc = function() {
		this.at_index = 0;
		this.at_ite = null;
		this.zip_length = !1;
		this._length = 0;
		this.inner = null;
		$a.call(this);
		this.at_ite = null;
		this.at_index = 0;
		this.zip_length = !0;
		this._length = 0
	};
	kc.__name__ = !0;
	kc.get = function(a, b) {
		null == b && (b = !1);
		var c = new kc;
		c.inner = a;
		c.zpp_inner.immutable = b;
		return c
	};
	kc.__super__ = $a;
	kc.prototype = r($a.prototype, {
		zpp_gl: function() {
			this.zpp_vm();
			if (this.zip_length) {
				this._length = 0;
				for (var a = this.inner.next; null != a;) this._length++, a = a.next;
				this.zip_length = !1
			}
			return this._length
		},
		zpp_vm: function() {
			this.zpp_inner.validate();
			this.inner.modified && (this.zip_length = !0, this._length = 0, this.at_ite = null)
		},
		at: function(a) {
			this.zpp_vm();
			this.zpp_inner.reverse_flag && (a = this.zpp_gl() -
				1 - a);
			if (a < this.at_index || null == this.at_ite)
				for (this.at_index = 0, this.at_ite = this.inner.next;;) break;
			for (; this.at_index != a;)
				for (this.at_index++, this.at_ite = this.at_ite.next;;) break;
			return this.at_ite.wrapper()
		},
		push: function(a) {
			this.zpp_inner.modify_test();
			this.zpp_vm();
			var b;
			if (b = null != this.zpp_inner.adder ? this.zpp_inner.adder(a) : !0) {
				if (this.zpp_inner.reverse_flag) this.inner.add(a.zpp_inner);
				else {
					var c = this.inner.iterator_at(this.zpp_gl() - 1);
					this.inner.insert(c, a.zpp_inner)
				}
				this.zpp_inner.invalidate();
				null != this.zpp_inner.post_adder && this.zpp_inner.post_adder(a)
			}
			return b
		},
		__class__: kc
	});
	var Jb = function() {
		this.user_length = 0;
		this.zip_length = !1;
		this.at_ite = this.push_ite = null;
		this.at_index = 0;
		this.dontremove = this.reverse_flag = !1;
		this._invalidate = this._validate = this.adder = this.post_adder = this.subber = null;
		this.immutable = !1;
		this.outer = null;
		this.inner = new Cb;
		this._invalidated = !0
	};
	Jb.__name__ = !0;
	Jb.get = function(a, b) {
		null == b && (b = !1);
		var c = new Jd;
		c.zpp_inner.inner = a;
		b && (c.zpp_inner.immutable = !0);
		c.zpp_inner.zip_length = !0;
		return c
	};
	Jb.prototype = {
		valmod: function() {
			this.validate();
			this.inner.modified && (this.inner.pushmod && (this.push_ite = null), this.at_ite = null, this.inner.modified = !1, this.inner.pushmod = !1, this.zip_length = !0)
		},
		modify_test: function() {},
		validate: function() {
			this._invalidated && (this._invalidated = !1, null != this._validate && this._validate())
		},
		invalidate: function() {
			this._invalidated = !0;
			null != this._invalidate && this._invalidate(this)
		},
		__class__: Jb
	};
	var Nb = function() {
		this.user_length = 0;
		this.zip_length = !1;
		this.at_ite =
			this.push_ite = null;
		this.at_index = 0;
		this.dontremove = this.reverse_flag = !1;
		this._invalidate = this._validate = this.adder = this.post_adder = this.subber = null;
		this.immutable = !1;
		this.outer = null;
		this.inner = new ac;
		this._invalidated = !0
	};
	Nb.__name__ = !0;
	Nb.get = function(a, b) {
		null == b && (b = !1);
		var c = new Md;
		c.zpp_inner.inner = a;
		b && (c.zpp_inner.immutable = !0);
		c.zpp_inner.zip_length = !0;
		return c
	};
	Nb.prototype = {
		valmod: function() {
			this.validate();
			this.inner.modified && (this.inner.pushmod && (this.push_ite = null), this.at_ite = null,
				this.inner.modified = !1, this.inner.pushmod = !1, this.zip_length = !0)
		},
		modify_test: function() {},
		validate: function() {
			this._invalidated && (this._invalidated = !1, null != this._validate && this._validate())
		},
		invalidate: function() {
			this._invalidated = !0;
			null != this._invalidate && this._invalidate(this)
		},
		__class__: Nb
	};
	var Xb = function() {
		this.user_length = 0;
		this.zip_length = !1;
		this.at_ite = this.push_ite = null;
		this.at_index = 0;
		this.dontremove = this.reverse_flag = !1;
		this._invalidate = this._validate = this.adder = this.subber = null;
		this.immutable = !1;
		this.outer = null;
		this.inner = new zc;
		this._invalidated = !0
	};
	Xb.__name__ = !0;
	Xb.get = function(a, b) {
		null == b && (b = !1);
		var c = new Od;
		c.zpp_inner.inner = a;
		b && (c.zpp_inner.immutable = !0);
		c.zpp_inner.zip_length = !0;
		return c
	};
	Xb.prototype = {
		valmod: function() {
			this.validate();
			this.inner.modified && (this.inner.pushmod && (this.push_ite = null), this.at_ite = null, this.inner.modified = !1, this.inner.pushmod = !1, this.zip_length = !0)
		},
		modify_test: function() {},
		validate: function() {
			this._invalidated && (this._invalidated = !1, null != this._validate &&
				this._validate())
		},
		invalidate: function() {
			this._invalidated = !0;
			null != this._invalidate && this._invalidate(this)
		},
		__class__: Xb
	};
	var hc = function() {
		this.user_length = 0;
		this.zip_length = !1;
		this.at_ite = this.push_ite = null;
		this.at_index = 0;
		this.dontremove = this.reverse_flag = !1;
		this._invalidate = this._validate = this.adder = this.post_adder = this.subber = null;
		this.immutable = !1;
		this.outer = null;
		this.inner = new Fd;
		this._invalidated = !0
	};
	hc.__name__ = !0;
	hc.get = function(a, b) {
		null == b && (b = !1);
		var c = new Hd;
		c.zpp_inner.inner = a;
		b &&
			(c.zpp_inner.immutable = !0);
		c.zpp_inner.zip_length = !0;
		return c
	};
	hc.prototype = {
		valmod: function() {
			this.validate();
			this.inner.modified && (this.inner.pushmod && (this.push_ite = null), this.at_ite = null, this.inner.modified = !1, this.inner.pushmod = !1, this.zip_length = !0)
		},
		modify_test: function() {},
		validate: function() {
			this._invalidated && (this._invalidated = !1, null != this._validate && this._validate())
		},
		invalidate: function() {
			this._invalidated = !0;
			null != this._invalidate && this._invalidate(this)
		},
		__class__: hc
	};
	var gc = function() {
		this.user_length =
			0;
		this.zip_length = !1;
		this.at_ite = this.push_ite = null;
		this.at_index = 0;
		this.dontremove = this.reverse_flag = !1;
		this._invalidate = this._validate = this.adder = this.post_adder = this.subber = null;
		this.immutable = !1;
		this.outer = null;
		this.inner = new Aa;
		this._invalidated = !0
	};
	gc.__name__ = !0;
	gc.get = function(a, b) {
		null == b && (b = !1);
		var c = new Kc;
		c.zpp_inner.inner = a;
		b && (c.zpp_inner.immutable = !0);
		c.zpp_inner.zip_length = !0;
		return c
	};
	gc.prototype = {
		valmod: function() {
			this.validate();
			this.inner.modified && (this.inner.pushmod && (this.push_ite =
				null), this.at_ite = null, this.inner.modified = !1, this.inner.pushmod = !1, this.zip_length = !0)
		},
		modify_test: function() {},
		validate: function() {
			this._invalidated && (this._invalidated = !1, null != this._validate && this._validate())
		},
		invalidate: function() {
			this._invalidated = !0;
			null != this._invalidate && this._invalidate(this)
		},
		__class__: gc
	};
	var ed = function() {
		this.user_length = 0;
		this.zip_length = !1;
		this.at_ite = this.push_ite = null;
		this.at_index = 0;
		this.reverse_flag = !1;
		this._invalidate = this._validate = this.adder = this.post_adder =
			this.subber = null;
		this.immutable = !1;
		this.outer = null;
		this.inner = new jd;
		this._invalidated = !0
	};
	ed.__name__ = !0;
	ed.prototype = {
		valmod: function() {
			this.validate();
			this.inner.modified && (this.inner.pushmod && (this.push_ite = null), this.at_ite = null, this.inner.modified = !1, this.inner.pushmod = !1, this.zip_length = !0)
		},
		modify_test: function() {},
		validate: function() {
			this._invalidated && (this._invalidated = !1, null != this._validate && this._validate())
		},
		invalidate: function() {
			this._invalidated = !0;
			null != this._invalidate && this._invalidate(this)
		},
		__class__: ed
	};
	var Zb = function() {
		this.user_length = 0;
		this.zip_length = !1;
		this.at_ite = this.push_ite = null;
		this.at_index = 0;
		this.dontremove = this.reverse_flag = !1;
		this._invalidate = this._validate = this.adder = this.post_adder = this.subber = null;
		this.immutable = !1;
		this.outer = null;
		this.inner = new Fc;
		this._invalidated = !0
	};
	Zb.__name__ = !0;
	Zb.get = function(a, b) {
		null == b && (b = !1);
		var c = new vd;
		c.zpp_inner.inner = a;
		b && (c.zpp_inner.immutable = !0);
		c.zpp_inner.zip_length = !0;
		return c
	};
	Zb.prototype = {
		valmod: function() {
			this.validate();
			this.inner.modified && (this.inner.pushmod && (this.push_ite = null), this.at_ite = null, this.inner.modified = !1, this.inner.pushmod = !1, this.zip_length = !0)
		},
		modify_test: function() {},
		validate: function() {
			this._invalidated && (this._invalidated = !1, null != this._validate && this._validate())
		},
		invalidate: function() {
			this._invalidated = !0;
			null != this._invalidate && this._invalidate(this)
		},
		__class__: Zb
	};
	var Wb = function() {
		this.user_length = 0;
		this.zip_length = !1;
		this.at_ite = this.push_ite = null;
		this.at_index = 0;
		this.reverse_flag = !1;
		this._validate = null;
		this.immutable = !1;
		this.outer = null;
		this.inner = new kd;
		this._invalidated = !0
	};
	Wb.__name__ = !0;
	Wb.get = function(a, b) {
		null == b && (b = !1);
		var c = new Kd;
		c.zpp_inner.inner = a;
		b && (c.zpp_inner.immutable = !0);
		c.zpp_inner.zip_length = !0;
		return c
	};
	Wb.prototype = {
		valmod: function() {
			this.validate();
			this.inner.modified && (this.inner.pushmod && (this.push_ite = null), this.at_ite = null, this.inner.modified = !1, this.inner.pushmod = !1, this.zip_length = !0)
		},
		validate: function() {
			this._invalidated && (this._invalidated = !1, null !=
				this._validate && this._validate())
		},
		__class__: Wb
	};
	var id = function() {};
	id.__name__ = !0;
	id.sqr = function(a) {
		return a * a
	};
	var Qc = function() {};
	Qc.__name__ = !0;
	var Z = function() {
		this.colour = 0;
		this.lt = this.swapped = this.data = this.prev = this.next = this.parent = null
	};
	Z.__name__ = !0;
	Z.prototype = {
		clear_with: function(a) {
			if (null != this.parent) {
				for (var b = this.parent; null != b;) b = null != b.prev ? b.prev : null != b.next ? b.next : this.clear_node(b, a);
				this.parent = null
			}
		},
		clear_node: function(a, b) {
			b(a.data);
			b = a.parent;
			null != b && (a == b.prev ?
				b.prev = null : b.next = null, a.parent = null);
			a.data = null;
			a.lt = null;
			a.swapped = null;
			a.next = Z.zpp_pool;
			Z.zpp_pool = a;
			return b
		},
		__fix_dbl_red: function(a) {
			for (;;) {
				var b = a.parent,
					c = b.parent;
				if (null == c) {
					b.colour = 1;
					break
				}
				if (b == c.prev) {
					var d = c;
					var e = c.next;
					if (a == b.prev) {
						var f = a;
						var g = b;
						var m = a.prev;
						var k = a.next;
						var l = b.next
					} else f = b, g = a, m = b.prev, k = a.prev, l = a.next
				} else f = c, m = c.prev, a == b.prev ? (g = a, d = b, k = a.prev, l = a.next, e = b.next) : (g = b, d = a, k = b.prev, l = a.prev, e = a.next);
				a = c.parent;
				null == a ? this.parent = g : a.prev == c ? a.prev =
					g : a.next = g;
				null != g && (g.parent = a);
				f.prev = m;
				null != m && (m.parent = f);
				f.next = k;
				null != k && (k.parent = f);
				g.prev = f;
				null != f && (f.parent = g);
				g.next = d;
				null != d && (d.parent = g);
				d.prev = l;
				null != l && (l.parent = d);
				d.next = e;
				null != e && (e.parent = d);
				g.colour = c.colour - 1;
				f.colour = 1;
				d.colour = 1;
				if (g == this.parent) this.parent.colour = 1;
				else if (0 == g.colour && 0 == g.parent.colour) {
					a = g;
					continue
				}
				break
			}
		},
		try_insert: function(a) {
			var b = null,
				c = null;
			if (null == this.parent) null == Z.zpp_pool ? b = new Z : (b = Z.zpp_pool, Z.zpp_pool = b.next, b.next = null), null, b.data =
				a, this.parent = b;
			else
				for (c = this.parent;;)
					if (this.lt(a, c.data))
						if (null == c.prev) {
							null == Z.zpp_pool ? b = new Z : (b = Z.zpp_pool, Z.zpp_pool = b.next, b.next = null);
							null;
							b.data = a;
							c.prev = b;
							b.parent = c;
							break
						} else c = c.prev;
			else if (this.lt(c.data, a))
				if (null == c.next) {
					null == Z.zpp_pool ? b = new Z : (b = Z.zpp_pool, Z.zpp_pool = b.next, b.next = null);
					null;
					b.data = a;
					c.next = b;
					b.parent = c;
					break
				} else c = c.next;
			else break;
			if (null == b) return c;
			null == b.parent ? b.colour = 1 : (b.colour = 0, 0 == b.parent.colour && this.__fix_dbl_red(b));
			return b
		},
		__class__: Z
	};
	var fb = function() {
		this.colour = 0;
		this.lt = this.swapped = this.data = this.prev = this.next = this.parent = null
	};
	fb.__name__ = !0;
	fb.prototype = {
		empty: function() {
			return null == this.parent
		},
		find: function(a) {
			for (var b = this.parent; null != b && b.data != a;) b = this.lt(a, b.data) ? b.prev : b.next;
			return b
		},
		find_weak: function(a) {
			for (var b = this.parent; null != b;)
				if (this.lt(a, b.data)) b = b.prev;
				else if (this.lt(b.data, a)) b = b.next;
			else break;
			return b
		},
		remove: function(a) {
			a = this.find(a);
			this.remove_node(a)
		},
		remove_node: function(a) {
			if (null !=
				a.next && null != a.prev) {
				for (var b = a.next; null != b.prev;) b = b.prev;
				var c = a.data;
				a.data = b.data;
				b.data = c;
				null != this.swapped && this.swapped(a.data, b.data);
				a = b
			}
			b = null == a.prev ? a.next : a.prev;
			if (1 == a.colour)
				if (null != a.prev || null != a.next) b.colour = 1;
				else if (null != a.parent)
				for (c = a.parent;;) {
					c.colour++;
					c.prev.colour--;
					c.next.colour--;
					var d = c.prev;
					if (-1 == d.colour) {
						this.__fix_neg_red(d);
						break
					} else if (0 == d.colour) {
						if (null != d.prev && 0 == d.prev.colour) {
							this.__fix_dbl_red(d.prev);
							break
						}
						if (null != d.next && 0 == d.next.colour) {
							this.__fix_dbl_red(d.next);
							break
						}
					}
					d = c.next;
					if (-1 == d.colour) {
						this.__fix_neg_red(d);
						break
					} else if (0 == d.colour) {
						if (null != d.prev && 0 == d.prev.colour) {
							this.__fix_dbl_red(d.prev);
							break
						}
						if (null != d.next && 0 == d.next.colour) {
							this.__fix_dbl_red(d.next);
							break
						}
					}
					if (2 == c.colour)
						if (null == c.parent) c.colour = 1;
						else {
							c = c.parent;
							continue
						}
					break
				}
			c = a.parent;
			null == c ? this.parent = b : c.prev == a ? c.prev = b : c.next = b;
			null != b && (b.parent = c);
			a.parent = a.prev = a.next = null;
			a.data = null;
			a.lt = null;
			a.swapped = null;
			a.next = fb.zpp_pool;
			fb.zpp_pool = a
		},
		__fix_neg_red: function(a) {
			var b =
				a.parent;
			if (b.prev == a) {
				var c = a.prev,
					d = a.next,
					e = d.prev,
					f = d.next;
				c.colour = 0;
				a.colour = b.colour = 1;
				a.next = e;
				null != e && (e.parent = a);
				a = b.data;
				b.data = d.data;
				d.data = a;
				null != this.swapped && this.swapped(b.data, d.data);
				d.prev = f;
				null != f && (f.parent = d);
				d.next = b.next;
				null != b.next && (b.next.parent = d);
				b.next = d
			} else c = a.next, d = a.prev, e = d.next, f = d.prev, c.colour = 0, a.colour = b.colour = 1, a.prev = e, null != e && (e.parent = a), a = b.data, b.data = d.data, d.data = a, null != this.swapped && this.swapped(b.data, d.data), d.next = f, null != f && (f.parent =
				d), d.prev = b.prev, null != b.prev && (b.prev.parent = d), b.prev = d;
			null != d && (d.parent = b);
			b = c;
			null != b.prev && 0 == b.prev.colour ? this.__fix_dbl_red(b.prev) : null != b.next && 0 == b.next.colour && this.__fix_dbl_red(b.next)
		},
		__fix_dbl_red: function(a) {
			for (;;) {
				var b = a.parent,
					c = b.parent;
				if (null == c) {
					b.colour = 1;
					break
				}
				if (b == c.prev) {
					var d = c;
					var e = c.next;
					if (a == b.prev) {
						var f = a;
						var g = b;
						var l = a.prev;
						var k = a.next;
						var n = b.next
					} else f = b, g = a, l = b.prev, k = a.prev, n = a.next
				} else f = c, l = c.prev, a == b.prev ? (g = a, d = b, k = a.prev, n = a.next, e = b.next) : (g =
					b, d = a, k = b.prev, n = a.prev, e = a.next);
				a = c.parent;
				null == a ? this.parent = g : a.prev == c ? a.prev = g : a.next = g;
				null != g && (g.parent = a);
				f.prev = l;
				null != l && (l.parent = f);
				f.next = k;
				null != k && (k.parent = f);
				g.prev = f;
				null != f && (f.parent = g);
				g.next = d;
				null != d && (d.parent = g);
				d.prev = n;
				null != n && (n.parent = d);
				d.next = e;
				null != e && (e.parent = d);
				g.colour = c.colour - 1;
				f.colour = 1;
				d.colour = 1;
				if (g == this.parent) this.parent.colour = 1;
				else if (0 == g.colour && 0 == g.parent.colour) {
					a = g;
					continue
				}
				break
			}
		},
		insert: function(a) {
			if (null == fb.zpp_pool) var b = new fb;
			else b =
				fb.zpp_pool, fb.zpp_pool = b.next, b.next = null;
			null;
			b.data = a;
			if (null == this.parent) this.parent = b;
			else
				for (a = this.parent;;)
					if (this.lt(b.data, a.data))
						if (null == a.prev) {
							a.prev = b;
							b.parent = a;
							break
						} else a = a.prev;
			else if (null == a.next) {
				a.next = b;
				b.parent = a;
				break
			} else a = a.next;
			null == b.parent ? b.colour = 1 : (b.colour = 0, 0 == b.parent.colour && this.__fix_dbl_red(b));
			return b
		},
		__class__: fb
	};
	var Ee = 0;
	Array.prototype.indexOf && (fa.indexOf = function(a, b, c) {
		return Array.prototype.indexOf.call(a, b, c)
	});
	String.prototype.__class__ =
		String;
	String.__name__ = !0;
	Array.__name__ = !0;
	var Fe = {
			__name__: ["Int"]
		},
		Ge = {
			__name__: ["Dynamic"]
		},
		je = Number;
	je.__name__ = ["Float"];
	var ke = Boolean;
	ke.__ename__ = ["Bool"];
	var He = {
			__name__: ["Class"]
		},
		Ie = {},
		Gd = {};
	lb.curTime = 0;
	F.__toStr = {}.toString;
	Na.paused = !1;
	A.font = "NotCourierSans";
	A.fonts = ["NotCourierSansBold"];
	A.gaSessionNum = -1;
	A.curNumRounds = 0;
	A.totalGames = new Tb(0);
	A.maxScore = new Tb(0);
	A.score = new Tb(0);
	A.newMax = !1;
	P.ANY_SHAPE = new Va;
	P.ANY_BODY = new Va;
	P.ANY_COMPOUND = new Va;
	P.ANY_CONSTRAINT = new Va;
	M._Constraint =
		0;
	M._Interactor = 0;
	M._CbType = 0;
	M._CbSet = 0;
	M._Listener = 0;
	H.WAKE = 1;
	H.PROPS = 2;
	H.ANGDRAG = 4;
	H.ARBITERS = 8;
	ia.CB_PLAYER = new Va;
	ia.CB_PROTECTOR = new Va;
	ia.CB_OBSTACLE = new Va;
	ia.obstacleMaterial = new rc(0, .1, .2, .05, .0001);
	ia.protectorMaterial = new rc(0, .1, .2, .003, .0001);
	G.langId = 0;
	G.langs = ["en", "ru"];
	G.txtGameName = ["Rise Up!", "Rise Up!", "Rise Up!", "Rise Up!", "Rise Up!"];
	G.txtGetExtraLife = ["Get Extra Life", "\u041f\u043e\u043b\u0443\u0447\u0438\u0442\u044c \u0435\u0449\u0435 \u043e\u0434\u043d\u0443 \u0436\u0438\u0437\u043d\u044c",
		"Uzyska\u0107 dodatkowe \u017cycie", "Ottieni vita extra", "Extra \u00e9letet kap"
	];
	G.txtSCORE = ["SCORE", "\u041e\u0427\u041a\u0418", "SCORE", "SCORE", "SCORE"];
	G.txtLEVEL = ["LEVEL", "\u0423\u0420\u041e\u0412\u0415\u041d\u042c", "LEVEL", "LEVEL", "LEVEL"];
	G.txtBest = ["Best", "\u0420\u0435\u043a\u043e\u0440\u0434", "Best", "Best", "Best"];
	G.txtNewBest = ["New Best", "\u041d\u043e\u0432\u044b\u0439 \u0440\u0435\u043a\u043e\u0440\u0434", "New Best", "New Best", "New Best"];
	Gc.maxScore = "best";
	Gc.gamesPlayed = "gamesnum";
	Pa.startColor =
		7522536;
	Ca.levels = [
		[{
			obType: 1,
			x: 60,
			y: 0,
			w: 120,
			my: 30,
			n: 4,
			dx: 120,
			rn: 2,
			drmy: 50
		}, {
			obType: 1,
			x: 120,
			y: 90,
			w: 24,
			my: 30,
			n: 3,
			dx: 120,
			rn: 2,
			drmy: 50
		}, {
			obType: 1,
			x: 60,
			y: 180,
			w: 120,
			my: 30,
			n: 4,
			dx: 120,
			rn: 2,
			drmy: 50
		}, {
			obType: 1,
			x: 60,
			y: 0,
			w: 24,
			my: 55,
			n: 4,
			dx: 120,
			rn: 2,
			dry: 180
		}, {
			obType: 1,
			x: 120,
			y: 90,
			w: 120,
			my: 55,
			n: 3,
			dx: 120
		}],
		[{
			obType: 0,
			x: 240,
			y: 0,
			w: 36,
			my: 30,
			n: 4,
			dx: -40,
			dy: 40,
			rot: 45,
			rn: 4,
			drx: 40,
			dry: 40
		}, {
			obType: 0,
			x: 240,
			y: 0,
			w: 36,
			my: 55,
			n: 4,
			dx: -40,
			dy: 40,
			rn: 4,
			drx: 40,
			dry: 40
		}, {
			obType: 0,
			x: 240,
			y: 0,
			w: 36,
			my: 80,
			n: 4,
			dx: -40,
			dy: 40,
			rot: 45,
			rn: 4,
			drx: 40,
			dry: 40
		}],
		[{
			obType: 1,
			x: 180,
			y: 0,
			w: 24,
			my: 30,
			n: 4,
			dx: 40,
			rn: 2,
			dry: 80
		}, {
			obType: 1,
			x: 200,
			y: 40,
			w: 24,
			my: 30,
			n: 3,
			dx: 40
		}, {
			obType: 1,
			x: 200,
			y: 0,
			w: 24,
			my: 55,
			n: 3,
			dx: 40,
			rn: 2,
			dry: 80
		}, {
			obType: 1,
			x: 180,
			y: 40,
			w: 24,
			my: 55,
			n: 4,
			dx: 40
		}, {
			obType: 1,
			x: 180,
			y: 0,
			w: 24,
			my: 80,
			n: 4,
			dx: 40,
			rn: 2,
			dry: 80
		}, {
			obType: 1,
			x: 200,
			y: 40,
			w: 24,
			my: 80,
			n: 3,
			dx: 40
		}],
		[{
			obType: 1,
			x: 200,
			y: 0,
			w: 24,
			my: 20,
			n: 10,
			dy: 60,
			rn: 2,
			dry: 730
		}, {
			obType: 1,
			x: 280,
			y: 30,
			w: 24,
			my: 20,
			n: 10,
			dy: 60,
			rn: 2,
			dry: 670
		}],
		[{
			obType: 0,
			x: 100,
			y: 0,
			w: 36,
			my: 30,
			n: 10,
			dx: 8,
			dy: 36,
			rn: 2,
			dry: 360,
			drx: 220
		}, {
			obType: 0,
			x: 380,
			y: 0,
			w: 36,
			my: 30,
			n: 10,
			dx: -8,
			dy: 36,
			rn: 2,
			dry: 360,
			drx: -220
		}, {
			obType: 1,
			x: 240,
			y: 40,
			w: 80,
			my: 30
		}],
		[{
			obType: 0,
			x: 120,
			y: 0,
			w: 36,
			my: 30,
			n: 2,
			dx: 240,
			dynType: 1
		}, {
			obType: 0,
			x: 120,
			y: 36,
			w: 36,
			my: 30,
			n: 20,
			dy: 36,
			rn: 2,
			drx: 240
		}, {
			obType: 0,
			x: 120,
			y: 756,
			w: 36,
			my: 30,
			n: 6,
			dx: 24,
			dy: 36
		}, {
			obType: 0,
			x: 360,
			y: 756,
			w: 36,
			my: 30,
			n: 5,
			dx: -24,
			dy: 36
		}, {
			obType: 1,
			x: 240,
			y: 40,
			w: 200,
			my: 30
		}],
		[{
			obType: 2,
			x: 60,
			y: 50,
			w: 160,
			h: 20,
			rot: 30,
			my: 20,
			n: 7,
			dy: 200,
			dynType: 1
		}, {
			obType: 2,
			x: 420,
			y: 50,
			w: 160,
			h: 20,
			rot: -30,
			my: 20,
			n: 7,
			dy: 200,
			dynType: 1
		}, {
			obType: 2,
			x: 240,
			y: 0,
			w: 140,
			h: 10,
			my: 20,
			n: 7,
			dy: 200
		}, {
			obType: 1,
			x: 160,
			y: 35,
			w: 60,
			my: 20,
			n: 7,
			dy: 200,
			rn: 2,
			drx: 160
		}],
		[{
			obType: 2,
			x: 240,
			y: 65,
			w: 240,
			h: 10,
			my: 30,
			n: 7,
			dy: 180
		}, {
			obType: 1,
			x: 240,
			y: 0,
			w: 120,
			my: 30,
			n: 7,
			dy: 180
		}],
		[{
			obType: 2,
			x: 170,
			y: 35,
			w: 140,
			h: 10,
			my: 30,
			n: 7,
			dy: 180,
			rn: 2,
			drx: 140
		}, {
			obType: 1,
			x: 240,
			y: 0,
			w: 60,
			my: 30,
			n: 7,
			dy: 180
		}],
		[{
			obType: 2,
			x: 120,
			y: 35,
			w: 240,
			h: 10,
			my: 30,
			n: 2,
			dx: 240,
			rn: 30,
			dry: 35
		}]
	];
	Ca.tutLevel = [{
		obType: 0,
		x: 240,
		y: 0,
		w: 36,
		my: 50
	}, {
		obType: 0,
		x: 222,
		y: 36,
		w: 36,
		my: 50,
		n: 2,
		dx: 36
	}, {
		obType: 0,
		x: 204,
		y: 72,
		w: 36,
		my: 50,
		n: 3,
		dx: 36
	}, {
		obType: 0,
		x: 240,
		y: 72,
		w: 36,
		my: 65
	}, {
		obType: 0,
		x: 222,
		y: 36,
		w: 36,
		my: 65,
		n: 2,
		dx: 36
	}, {
		obType: 0,
		x: 204,
		y: 0,
		w: 36,
		my: 65,
		n: 3,
		dx: 36
	}, {
		obType: 0,
		x: 240,
		y: 72,
		w: 36,
		my: 80
	}, {
		obType: 0,
		x: 222,
		y: 36,
		w: 36,
		my: 80,
		n: 2,
		dx: 36
	}, {
		obType: 0,
		x: 204,
		y: 0,
		w: 36,
		my: 80,
		n: 3,
		dx: 36
	}];
	Ca.nextLevels = [];
	R.worldLinearDrag = .1;
	R.worldAngularDrag = .1;
	T.lastNoAd = 0;
	T.lastYesAd = 0;
	T.shareUsed = !1;
	T.sharesUrls = ["https://play.google.com/store/apps/details?id\x3dcom.mokogames.stickman.riseup.escape\x26referrer\x3dutm_source%3Dsh%26utm_medium%3Dlink%26utm_term%3Dsh%26utm_content%3Dlink%26utm_campaign%3Dshw",
		"http://m.mokogames.com/en"
	];
	T.shareUsed2 = !1;
	l.scaleFactor = 1;
	l.scale = 1;
	l.dx = 0;
	l.dy = 0;
	mb.active = !0;
	ya.bgColor = 16777215;
	ya.midColor = 14540253;
	ya.progressColor = 10066329;
	oc.skipLoad = !1;
	u.assetsPrefix = "";
	u.textScaleForSmooth = 2;
	u.CLICK = ["click", "tap"];
	u.MOUSE_DOWN = ["mousedown", "touchstart"];
	u.MOUSE_UP = ["mouseup", "touchend", "mouseupoutside", "touchendoutside", "touchcancel"];
	u.MOUSE_MOVE = ["mousemove", "touchmove"];
	n.epsilon = 1e-8;
	n.fluidAngularDragFriction = 2.5;
	n.fluidAngularDrag = 100;
	n.fluidVacuumDrag = .5;
	n.fluidLinearDrag =
		.5;
	n.collisionSlop = .2;
	n.collisionSlopCCD = .5;
	n.distanceThresholdCCD = .05;
	n.staticCCDLinearThreshold = .05;
	n.staticCCDAngularThreshold = .005;
	n.bulletCCDLinearThreshold = .125;
	n.bulletCCDAngularThreshold = .0125;
	n.dynamicSweepLinearThreshold = 17;
	n.dynamicSweepAngularThreshold = .6;
	n.angularCCDSlipScale = .75;
	n.arbiterExpirationDelay = 6;
	n.staticFrictionThreshold = 2;
	n.elasticThreshold = 20;
	n.sleepDelay = 60;
	n.linearSleepThreshold = .2;
	n.angularSleepThreshold = .4;
	n.contactBiasCoef = .3;
	n.contactStaticBiasCoef = .6;
	n.contactContinuousBiasCoef =
		.4;
	n.contactContinuousStaticBiasCoef = .5;
	n.constraintLinearSlop = .1;
	n.illConditionedThreshold = 2E8;
	g.internal = !1;
	Da.UCbSet = new Ec;
	Da.VCbSet = new Ec;
	Da.WCbSet = new Ec;
	Da.UCbType = new Aa;
	Da.VCbType = new Aa;
	Da.WCbType = new Aa;
	E.internal = !1;
	E.COL = 1;
	E.FLUID = 4;
	E.SENSOR = 2;
	aa.internal = !1;
	q.flowpoly = new jd;
	q.flowsegs = new jd;
	null == g.BodyType_STATIC && (g.BodyType_STATIC = new X, g.internal = !1);
	var Je = g.BodyType_STATIC;
	null == g.BodyType_DYNAMIC && (g.BodyType_DYNAMIC = new X, g.internal = !1);
	var Ke = g.BodyType_DYNAMIC;
	null == g.BodyType_KINEMATIC &&
		(g.BodyType_KINEMATIC = new X, g.internal = !1);
	db.types = [null, Je, Ke, g.BodyType_KINEMATIC];
	da.internal = !1;
	wa.tmpaabb = new V;
	Jb.internal = !1;
	Nb.internal = !1;
	Xb.internal = !1;
	hc.internal = !1;
	gc.internal = !1;
	ed.internal = !1;
	Zb.internal = !1;
	Wb.internal = !1;
	cc.main()
})("undefined" != typeof console ? console : {
	log: function() {}
}, "undefined" != typeof window ? window : exports, "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this);