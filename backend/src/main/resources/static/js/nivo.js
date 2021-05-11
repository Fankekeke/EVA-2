"function" !== typeof Object.create && (Object.create = function(f) {
	function g() {}
	g.prototype = f;
	return new g
});
(function(f, g, k) {
	var l = {
		init: function(a, b) {
			this.$elem = f(b);
			this.options = f.extend({}, f.fn.owlCarousel.options, this.$elem.data(), a);
			this.userOptions = a;
			this.loadContent()
		},
		loadContent: function() {
			function a(a) {
				var d, e = "";
				if("function" === typeof b.options.jsonSuccess) b.options.jsonSuccess.apply(this, [a]);
				else {
					for(d in a.owl) a.owl.hasOwnProperty(d) && (e += a.owl[d].item);
					b.$elem.html(e)
				}
				b.logIn()
			}
			var b = this,
				e;
			"function" === typeof b.options.beforeInit && b.options.beforeInit.apply(this, [b.$elem]);
			"string" === typeof b.options.jsonPath ?
				(e = b.options.jsonPath, f.getJSON(e, a)) : b.logIn()
		},
		logIn: function() {
			this.$elem.data("owl-originalStyles", this.$elem.attr("style"));
			this.$elem.data("owl-originalClasses", this.$elem.attr("class"));
			this.$elem.css({
				opacity: 0
			});
			this.orignalItems = this.options.items;
			this.checkBrowser();
			this.wrapperWidth = 0;
			this.checkVisible = null;
			this.setVars()
		},
		setVars: function() {
			if(0 === this.$elem.children().length) return !1;
			this.baseClass();
			this.eventTypes();
			this.$userItems = this.$elem.children();
			this.itemsAmount = this.$userItems.length;
			this.wrapItems();
			this.$owlItems = this.$elem.find(".owl-item");
			this.$owlWrapper = this.$elem.find(".owl-wrapper");
			this.playDirection = "next";
			this.prevItem = 0;
			this.prevArr = [0];
			this.currentItem = 0;
			this.customEvents();
			this.onStartup()
		},
		onStartup: function() {
			this.updateItems();
			this.calculateAll();
			this.buildControls();
			this.updateControls();
			this.response();
			this.moveEvents();
			this.stopOnHover();
			this.owlStatus();
			!1 !== this.options.transitionStyle && this.transitionTypes(this.options.transitionStyle);
			!0 === this.options.autoPlay &&
				(this.options.autoPlay = 5E3);
			this.play();
			this.$elem.find(".owl-wrapper").css("display", "block");
			this.$elem.is(":visible") ? this.$elem.css("opacity", 1) : this.watchVisibility();
			this.onstartup = !1;
			this.eachMoveUpdate();
			"function" === typeof this.options.afterInit && this.options.afterInit.apply(this, [this.$elem])
		},
		eachMoveUpdate: function() {
			!0 === this.options.lazyLoad && this.lazyLoad();
			!0 === this.options.autoHeight && this.autoHeight();
			this.onVisibleItems();
			"function" === typeof this.options.afterAction && this.options.afterAction.apply(this, [this.$elem])
		},
		updateVars: function() {
			"function" === typeof this.options.beforeUpdate && this.options.beforeUpdate.apply(this, [this.$elem]);
			this.watchVisibility();
			this.updateItems();
			this.calculateAll();
			this.updatePosition();
			this.updateControls();
			this.eachMoveUpdate();
			"function" === typeof this.options.afterUpdate && this.options.afterUpdate.apply(this, [this.$elem])
		},
		reload: function() {
			var a = this;
			g.setTimeout(function() {
				a.updateVars()
			}, 0)
		},
		watchVisibility: function() {
			var a = this;
			if(!1 === a.$elem.is(":visible")) a.$elem.css({
					opacity: 0
				}),
				g.clearInterval(a.autoPlayInterval), g.clearInterval(a.checkVisible);
			else return !1;
			a.checkVisible = g.setInterval(function() {
				a.$elem.is(":visible") && (a.reload(), a.$elem.animate({
					opacity: 1
				}, 200), g.clearInterval(a.checkVisible))
			}, 500)
		},
		wrapItems: function() {
			this.$userItems.wrapAll('<div class="owl-wrapper">').wrap('<div class="owl-item"></div>');
			this.$elem.find(".owl-wrapper").wrap('<div class="owl-wrapper-outer">');
			this.wrapperOuter = this.$elem.find(".owl-wrapper-outer");
			this.$elem.css("display", "block")
		},
		baseClass: function() {
			var a = this.$elem.hasClass(this.options.baseClass),
				b = this.$elem.hasClass(this.options.theme);
			a || this.$elem.addClass(this.options.baseClass);
			b || this.$elem.addClass(this.options.theme)
		},
		updateItems: function() {
			var a, b;
			if(!1 === this.options.responsive) return !1;
			if(!0 === this.options.singleItem) return this.options.items = this.orignalItems = 1, this.options.itemsCustom = !1, this.options.itemsDesktop = !1, this.options.itemsDesktopSmall = !1, this.options.itemsTablet = !1, this.options.itemsTabletSmall = !1, this.options.itemsMobile = !1;
			a = f(this.options.responsiveBaseWidth).width();
			a > (this.options.itemsDesktop[0] || this.orignalItems) && (this.options.items = this.orignalItems);
			if(!1 !== this.options.itemsCustom)
				for(this.options.itemsCustom.sort(function(a, b) {
						return a[0] - b[0]
					}), b = 0; b < this.options.itemsCustom.length; b += 1) this.options.itemsCustom[b][0] <= a && (this.options.items = this.options.itemsCustom[b][1]);
			else a <= this.options.itemsDesktop[0] && !1 !== this.options.itemsDesktop && (this.options.items = this.options.itemsDesktop[1]),
				a <= this.options.itemsDesktopSmall[0] && !1 !== this.options.itemsDesktopSmall && (this.options.items = this.options.itemsDesktopSmall[1]), a <= this.options.itemsTablet[0] && !1 !== this.options.itemsTablet && (this.options.items = this.options.itemsTablet[1]), a <= this.options.itemsTabletSmall[0] && !1 !== this.options.itemsTabletSmall && (this.options.items = this.options.itemsTabletSmall[1]), a <= this.options.itemsMobile[0] && !1 !== this.options.itemsMobile && (this.options.items = this.options.itemsMobile[1]);
			this.options.items > this.itemsAmount &&
				!0 === this.options.itemsScaleUp && (this.options.items = this.itemsAmount)
		},
		response: function() {
			var a = this,
				b, e;
			if(!0 !== a.options.responsive) return !1;
			e = f(g).width();
			a.resizer = function() {
				f(g).width() !== e && (!1 !== a.options.autoPlay && g.clearInterval(a.autoPlayInterval), g.clearTimeout(b), b = g.setTimeout(function() {
					e = f(g).width();
					a.updateVars()
				}, a.options.responsiveRefreshRate))
			};
			f(g).resize(a.resizer)
		},
		updatePosition: function() {
			this.jumpTo(this.currentItem);
			!1 !== this.options.autoPlay && this.checkAp()
		},
		appendItemsSizes: function() {
			var a =
				this,
				b = 0,
				e = a.itemsAmount - a.options.items;
			a.$owlItems.each(function(c) {
				var d = f(this);
				d.css({
					width: a.itemWidth
				}).data("owl-item", Number(c));
				if(0 === c % a.options.items || c === e) c > e || (b += 1);
				d.data("owl-roundPages", b)
			})
		},
		appendWrapperSizes: function() {
			this.$owlWrapper.css({
				width: this.$owlItems.length * this.itemWidth * 2,
				left: 0
			});
			this.appendItemsSizes()
		},
		calculateAll: function() {
			this.calculateWidth();
			this.appendWrapperSizes();
			this.loops();
			this.max()
		},
		calculateWidth: function() {
			this.itemWidth = Math.round(this.$elem.width() /
				this.options.items)
		},
		max: function() {
			var a = -1 * (this.itemsAmount * this.itemWidth - this.options.items * this.itemWidth);
			this.options.items > this.itemsAmount ? this.maximumPixels = a = this.maximumItem = 0 : (this.maximumItem = this.itemsAmount - this.options.items, this.maximumPixels = a);
			return a
		},
		min: function() {
			return 0
		},
		loops: function() {
			var a = 0,
				b = 0,
				e, c;
			this.positionsInArray = [0];
			this.pagesInArray = [];
			for(e = 0; e < this.itemsAmount; e += 1) b += this.itemWidth, this.positionsInArray.push(-b), !0 === this.options.scrollPerPage && (c = f(this.$owlItems[e]),
				c = c.data("owl-roundPages"), c !== a && (this.pagesInArray[a] = this.positionsInArray[e], a = c))
		},
		buildControls: function() {
			if(!0 === this.options.navigation || !0 === this.options.pagination) this.owlControls = f('<div class="owl-controls"/>').toggleClass("clickable", !this.browser.isTouch).appendTo(this.$elem);
			!0 === this.options.pagination && this.buildPagination();
			!0 === this.options.navigation && this.buildButtons()
		},
		buildButtons: function() {
			var a = this,
				b = f('<div class="owl-buttons"/>');
			a.owlControls.append(b);
			a.buttonPrev =
				f("<div/>", {
					"class": "owl-prev",
					html: a.options.navigationText[0] || ""
				});
			a.buttonNext = f("<div/>", {
				"class": "owl-next",
				html: a.options.navigationText[1] || ""
			});
			b.append(a.buttonPrev).append(a.buttonNext);
			b.on("touchstart.owlControls mousedown.owlControls", 'div[class^="owl"]', function(a) {
				a.preventDefault()
			});
			b.on("touchend.owlControls mouseup.owlControls", 'div[class^="owl"]', function(b) {
				b.preventDefault();
				f(this).hasClass("owl-next") ? a.next() : a.prev()
			})
		},
		buildPagination: function() {
			var a = this;
			a.paginationWrapper =
				f('<div class="owl-pagination"/>');
			a.owlControls.append(a.paginationWrapper);
			a.paginationWrapper.on("touchend.owlControls mouseup.owlControls", ".owl-page", function(b) {
				b.preventDefault();
				Number(f(this).data("owl-page")) !== a.currentItem && a.goTo(Number(f(this).data("owl-page")), !0)
			})
		},
		updatePagination: function() {
			var a, b, e, c, d, g;
			if(!1 === this.options.pagination) return !1;
			this.paginationWrapper.html("");
			a = 0;
			b = this.itemsAmount - this.itemsAmount % this.options.items;
			for(c = 0; c < this.itemsAmount; c += 1) 0 === c % this.options.items &&
				(a += 1, b === c && (e = this.itemsAmount - this.options.items), d = f("<div/>", {
					"class": "owl-page"
				}), g = f("<span></span>", {
					text: !0 === this.options.paginationNumbers ? a : "",
					"class": !0 === this.options.paginationNumbers ? "owl-numbers" : ""
				}), d.append(g), d.data("owl-page", b === c ? e : c), d.data("owl-roundPages", a), this.paginationWrapper.append(d));
			this.checkPagination()
		},
		checkPagination: function() {
			var a = this;
			if(!1 === a.options.pagination) return !1;
			a.paginationWrapper.find(".owl-page").each(function() {
				f(this).data("owl-roundPages") ===
					f(a.$owlItems[a.currentItem]).data("owl-roundPages") && (a.paginationWrapper.find(".owl-page").removeClass("active"), f(this).addClass("active"))
			})
		},
		checkNavigation: function() {
			if(!1 === this.options.navigation) return !1;
			!1 === this.options.rewindNav && (0 === this.currentItem && 0 === this.maximumItem ? (this.buttonPrev.addClass("disabled"), this.buttonNext.addClass("disabled")) : 0 === this.currentItem && 0 !== this.maximumItem ? (this.buttonPrev.addClass("disabled"), this.buttonNext.removeClass("disabled")) : this.currentItem ===
				this.maximumItem ? (this.buttonPrev.removeClass("disabled"), this.buttonNext.addClass("disabled")) : 0 !== this.currentItem && this.currentItem !== this.maximumItem && (this.buttonPrev.removeClass("disabled"), this.buttonNext.removeClass("disabled")))
		},
		updateControls: function() {
			this.updatePagination();
			this.checkNavigation();
			this.owlControls && (this.options.items >= this.itemsAmount ? this.owlControls.hide() : this.owlControls.show())
		},
		destroyControls: function() {
			this.owlControls && this.owlControls.remove()
		},
		next: function(a) {
			if(this.isTransition) return !1;
			this.currentItem += !0 === this.options.scrollPerPage ? this.options.items : 1;
			if(this.currentItem > this.maximumItem + (!0 === this.options.scrollPerPage ? this.options.items - 1 : 0))
				if(!0 === this.options.rewindNav) this.currentItem = 0, a = "rewind";
				else return this.currentItem = this.maximumItem, !1;
			this.goTo(this.currentItem, a)
		},
		prev: function(a) {
			if(this.isTransition) return !1;
			this.currentItem = !0 === this.options.scrollPerPage && 0 < this.currentItem && this.currentItem < this.options.items ? 0 : this.currentItem - (!0 === this.options.scrollPerPage ?
				this.options.items : 1);
			if(0 > this.currentItem)
				if(!0 === this.options.rewindNav) this.currentItem = this.maximumItem, a = "rewind";
				else return this.currentItem = 0, !1;
			this.goTo(this.currentItem, a)
		},
		goTo: function(a, b, e) {
			var c = this;
			if(c.isTransition) return !1;
			"function" === typeof c.options.beforeMove && c.options.beforeMove.apply(this, [c.$elem]);
			a >= c.maximumItem ? a = c.maximumItem : 0 >= a && (a = 0);
			c.currentItem = c.owl.currentItem = a;
			if(!1 !== c.options.transitionStyle && "drag" !== e && 1 === c.options.items && !0 === c.browser.support3d) return c.swapSpeed(0), !0 === c.browser.support3d ? c.transition3d(c.positionsInArray[a]) : c.css2slide(c.positionsInArray[a], 1), c.afterGo(), c.singleItemTransition(), !1;
			a = c.positionsInArray[a];
			!0 === c.browser.support3d ? (c.isCss3Finish = !1, !0 === b ? (c.swapSpeed("paginationSpeed"), g.setTimeout(function() {
				c.isCss3Finish = !0
			}, c.options.paginationSpeed)) : "rewind" === b ? (c.swapSpeed(c.options.rewindSpeed), g.setTimeout(function() {
				c.isCss3Finish = !0
			}, c.options.rewindSpeed)) : (c.swapSpeed("slideSpeed"), g.setTimeout(function() {
					c.isCss3Finish = !0
				},
				c.options.slideSpeed)), c.transition3d(a)) : !0 === b ? c.css2slide(a, c.options.paginationSpeed) : "rewind" === b ? c.css2slide(a, c.options.rewindSpeed) : c.css2slide(a, c.options.slideSpeed);
			c.afterGo()
		},
		jumpTo: function(a) {
			"function" === typeof this.options.beforeMove && this.options.beforeMove.apply(this, [this.$elem]);
			a >= this.maximumItem || -1 === a ? a = this.maximumItem : 0 >= a && (a = 0);
			this.swapSpeed(0);
			!0 === this.browser.support3d ? this.transition3d(this.positionsInArray[a]) : this.css2slide(this.positionsInArray[a], 1);
			this.currentItem =
				this.owl.currentItem = a;
			this.afterGo()
		},
		afterGo: function() {
			this.prevArr.push(this.currentItem);
			this.prevItem = this.owl.prevItem = this.prevArr[this.prevArr.length - 2];
			this.prevArr.shift(0);
			this.prevItem !== this.currentItem && (this.checkPagination(), this.checkNavigation(), this.eachMoveUpdate(), !1 !== this.options.autoPlay && this.checkAp());
			"function" === typeof this.options.afterMove && this.prevItem !== this.currentItem && this.options.afterMove.apply(this, [this.$elem])
		},
		stop: function() {
			this.apStatus = "stop";
			g.clearInterval(this.autoPlayInterval)
		},
		checkAp: function() {
			"stop" !== this.apStatus && this.play()
		},
		play: function() {
			var a = this;
			a.apStatus = "play";
			if(!1 === a.options.autoPlay) return !1;
			g.clearInterval(a.autoPlayInterval);
			a.autoPlayInterval = g.setInterval(function() {
				a.next(!0)
			}, a.options.autoPlay)
		},
		swapSpeed: function(a) {
			"slideSpeed" === a ? this.$owlWrapper.css(this.addCssSpeed(this.options.slideSpeed)) : "paginationSpeed" === a ? this.$owlWrapper.css(this.addCssSpeed(this.options.paginationSpeed)) : "string" !== typeof a && this.$owlWrapper.css(this.addCssSpeed(a))
		},
		addCssSpeed: function(a) {
			return {
				"-webkit-transition": "all " + a + "ms ease",
				"-moz-transition": "all " + a + "ms ease",
				"-o-transition": "all " + a + "ms ease",
				transition: "all " + a + "ms ease"
			}
		},
		removeTransition: function() {
			return {
				"-webkit-transition": "",
				"-moz-transition": "",
				"-o-transition": "",
				transition: ""
			}
		},
		doTranslate: function(a) {
			return {
				"-webkit-transform": "translate3d(" + a + "px, 0px, 0px)",
				"-moz-transform": "translate3d(" + a + "px, 0px, 0px)",
				"-o-transform": "translate3d(" + a + "px, 0px, 0px)",
				"-ms-transform": "translate3d(" +
					a + "px, 0px, 0px)",
				transform: "translate3d(" + a + "px, 0px,0px)"
			}
		},
		transition3d: function(a) {
			this.$owlWrapper.css(this.doTranslate(a))
		},
		css2move: function(a) {
			this.$owlWrapper.css({
				left: a
			})
		},
		css2slide: function(a, b) {
			var e = this;
			e.isCssFinish = !1;
			e.$owlWrapper.stop(!0, !0).animate({
				left: a
			}, {
				duration: b || e.options.slideSpeed,
				complete: function() {
					e.isCssFinish = !0
				}
			})
		},
		checkBrowser: function() {
			var a = k.createElement("div");
			a.style.cssText = "  -moz-transform:translate3d(0px, 0px, 0px); -ms-transform:translate3d(0px, 0px, 0px); -o-transform:translate3d(0px, 0px, 0px); -webkit-transform:translate3d(0px, 0px, 0px); transform:translate3d(0px, 0px, 0px)";
			a = a.style.cssText.match(/translate3d\(0px, 0px, 0px\)/g);
			this.browser = {
				support3d: null !== a && 1 === a.length,
				isTouch: "ontouchstart" in g || g.navigator.msMaxTouchPoints
			}
		},
		moveEvents: function() {
			if(!1 !== this.options.mouseDrag || !1 !== this.options.touchDrag) this.gestures(), this.disabledEvents()
		},
		eventTypes: function() {
			var a = ["s", "e", "x"];
			this.ev_types = {};
			!0 === this.options.mouseDrag && !0 === this.options.touchDrag ? a = ["touchstart.owl mousedown.owl", "touchmove.owl mousemove.owl", "touchend.owl touchcancel.owl mouseup.owl"] :
				!1 === this.options.mouseDrag && !0 === this.options.touchDrag ? a = ["touchstart.owl", "touchmove.owl", "touchend.owl touchcancel.owl"] : !0 === this.options.mouseDrag && !1 === this.options.touchDrag && (a = ["mousedown.owl", "mousemove.owl", "mouseup.owl"]);
			this.ev_types.start = a[0];
			this.ev_types.move = a[1];
			this.ev_types.end = a[2]
		},
		disabledEvents: function() {
			this.$elem.on("dragstart.owl", function(a) {
				a.preventDefault()
			});
			this.$elem.on("mousedown.disableTextSelect", function(a) {
				return f(a.target).is("input, textarea, select, option")
			})
		},
		gestures: function() {
			function a(a) {
				if(void 0 !== a.touches) return {
					x: a.touches[0].pageX,
					y: a.touches[0].pageY
				};
				if(void 0 === a.touches) {
					if(void 0 !== a.pageX) return {
						x: a.pageX,
						y: a.pageY
					};
					if(void 0 === a.pageX) return {
						x: a.clientX,
						y: a.clientY
					}
				}
			}

			function b(a) {
				"on" === a ? (f(k).on(d.ev_types.move, e), f(k).on(d.ev_types.end, c)) : "off" === a && (f(k).off(d.ev_types.move), f(k).off(d.ev_types.end))
			}

			function e(b) {
				b = b.originalEvent || b || g.event;
				d.newPosX = a(b).x - h.offsetX;
				d.newPosY = a(b).y - h.offsetY;
				d.newRelativeX = d.newPosX - h.relativePos;
				"function" === typeof d.options.startDragging && !0 !== h.dragging && 0 !== d.newRelativeX && (h.dragging = !0, d.options.startDragging.apply(d, [d.$elem]));
				(8 < d.newRelativeX || -8 > d.newRelativeX) && !0 === d.browser.isTouch && (void 0 !== b.preventDefault ? b.preventDefault() : b.returnValue = !1, h.sliding = !0);
				(10 < d.newPosY || -10 > d.newPosY) && !1 === h.sliding && f(k).off("touchmove.owl");
				d.newPosX = Math.max(Math.min(d.newPosX, d.newRelativeX / 5), d.maximumPixels + d.newRelativeX / 5);
				!0 === d.browser.support3d ? d.transition3d(d.newPosX) : d.css2move(d.newPosX)
			}

			function c(a) {
				a = a.originalEvent || a || g.event;
				var c;
				a.target = a.target || a.srcElement;
				h.dragging = !1;
				!0 !== d.browser.isTouch && d.$owlWrapper.removeClass("grabbing");
				d.dragDirection = 0 > d.newRelativeX ? d.owl.dragDirection = "left" : d.owl.dragDirection = "right";
				0 !== d.newRelativeX && (c = d.getNewPosition(), d.goTo(c, !1, "drag"), h.targetElement === a.target && !0 !== d.browser.isTouch && (f(a.target).on("click.disable", function(a) {
						a.stopImmediatePropagation();
						a.stopPropagation();
						a.preventDefault();
						f(a.target).off("click.disable")
					}),
					a = f._data(a.target, "events").click, c = a.pop(), a.splice(0, 0, c)));
				b("off")
			}
			var d = this,
				h = {
					offsetX: 0,
					offsetY: 0,
					baseElWidth: 0,
					relativePos: 0,
					position: null,
					minSwipe: null,
					maxSwipe: null,
					sliding: null,
					dargging: null,
					targetElement: null
				};
			d.isCssFinish = !0;
			d.$elem.on(d.ev_types.start, ".owl-wrapper", function(c) {
				c = c.originalEvent || c || g.event;
				var e;
				if(3 === c.which) return !1;
				if(!(d.itemsAmount <= d.options.items)) {
					if(!1 === d.isCssFinish && !d.options.dragBeforeAnimFinish || !1 === d.isCss3Finish && !d.options.dragBeforeAnimFinish) return !1;
					!1 !== d.options.autoPlay && g.clearInterval(d.autoPlayInterval);
					!0 === d.browser.isTouch || d.$owlWrapper.hasClass("grabbing") || d.$owlWrapper.addClass("grabbing");
					d.newPosX = 0;
					d.newRelativeX = 0;
					f(this).css(d.removeTransition());
					e = f(this).position();
					h.relativePos = e.left;
					h.offsetX = a(c).x - e.left;
					h.offsetY = a(c).y - e.top;
					b("on");
					h.sliding = !1;
					h.targetElement = c.target || c.srcElement
				}
			})
		},
		getNewPosition: function() {
			var a = this.closestItem();
			a > this.maximumItem ? a = this.currentItem = this.maximumItem : 0 <= this.newPosX && (this.currentItem =
				a = 0);
			return a
		},
		closestItem: function() {
			var a = this,
				b = !0 === a.options.scrollPerPage ? a.pagesInArray : a.positionsInArray,
				e = a.newPosX,
				c = null;
			f.each(b, function(d, g) {
				e - a.itemWidth / 20 > b[d + 1] && e - a.itemWidth / 20 < g && "left" === a.moveDirection() ? (c = g, a.currentItem = !0 === a.options.scrollPerPage ? f.inArray(c, a.positionsInArray) : d) : e + a.itemWidth / 20 < g && e + a.itemWidth / 20 > (b[d + 1] || b[d] - a.itemWidth) && "right" === a.moveDirection() && (!0 === a.options.scrollPerPage ? (c = b[d + 1] || b[b.length - 1], a.currentItem = f.inArray(c, a.positionsInArray)) :
					(c = b[d + 1], a.currentItem = d + 1))
			});
			return a.currentItem
		},
		moveDirection: function() {
			var a;
			0 > this.newRelativeX ? (a = "right", this.playDirection = "next") : (a = "left", this.playDirection = "prev");
			return a
		},
		customEvents: function() {
			var a = this;
			a.$elem.on("owl.next", function() {
				a.next()
			});
			a.$elem.on("owl.prev", function() {
				a.prev()
			});
			a.$elem.on("owl.play", function(b, e) {
				a.options.autoPlay = e;
				a.play();
				a.hoverStatus = "play"
			});
			a.$elem.on("owl.stop", function() {
				a.stop();
				a.hoverStatus = "stop"
			});
			a.$elem.on("owl.goTo", function(b, e) {
				a.goTo(e)
			});
			a.$elem.on("owl.jumpTo", function(b, e) {
				a.jumpTo(e)
			})
		},
		stopOnHover: function() {
			var a = this;
			!0 === a.options.stopOnHover && !0 !== a.browser.isTouch && !1 !== a.options.autoPlay && (a.$elem.on("mouseover", function() {
				a.stop()
			}), a.$elem.on("mouseout", function() {
				"stop" !== a.hoverStatus && a.play()
			}))
		},
		lazyLoad: function() {
			var a, b, e, c, d;
			if(!1 === this.options.lazyLoad) return !1;
			for(a = 0; a < this.itemsAmount; a += 1) b = f(this.$owlItems[a]), "loaded" !== b.data("owl-loaded") && (e = b.data("owl-item"), c = b.find(".lazyOwl"), "string" !== typeof c.data("src") ?
				b.data("owl-loaded", "loaded") : (void 0 === b.data("owl-loaded") && (c.hide(), b.addClass("loading").data("owl-loaded", "checked")), (d = !0 === this.options.lazyFollow ? e >= this.currentItem : !0) && e < this.currentItem + this.options.items && c.length && this.lazyPreload(b, c)))
		},
		lazyPreload: function(a, b) {
			function e() {
				a.data("owl-loaded", "loaded").removeClass("loading");
				b.removeAttr("data-src");
				"fade" === d.options.lazyEffect ? b.fadeIn(400) : b.show();
				"function" === typeof d.options.afterLazyLoad && d.options.afterLazyLoad.apply(this, [d.$elem])
			}

			function c() {
				f += 1;
				d.completeImg(b.get(0)) || !0 === k ? e() : 100 >= f ? g.setTimeout(c, 100) : e()
			}
			var d = this,
				f = 0,
				k;
			"DIV" === b.prop("tagName") ? (b.css("background-image", "url(" + b.data("src") + ")"), k = !0) : b[0].src = b.data("src");
			c()
		},
		autoHeight: function() {
			function a() {
				var a = f(e.$owlItems[e.currentItem]).height();
				e.wrapperOuter.css("height", a + "px");
				e.wrapperOuter.hasClass("autoHeight") || g.setTimeout(function() {
					e.wrapperOuter.addClass("autoHeight")
				}, 0)
			}

			function b() {
				d += 1;
				e.completeImg(c.get(0)) ? a() : 100 >= d ? g.setTimeout(b,
					100) : e.wrapperOuter.css("height", "")
			}
			var e = this,
				c = f(e.$owlItems[e.currentItem]).find("img"),
				d;
			void 0 !== c.get(0) ? (d = 0, b()) : a()
		},
		completeImg: function(a) {
			return !a.complete || "undefined" !== typeof a.naturalWidth && 0 === a.naturalWidth ? !1 : !0
		},
		onVisibleItems: function() {
			var a;
			!0 === this.options.addClassActive && this.$owlItems.removeClass("active");
			this.visibleItems = [];
			for(a = this.currentItem; a < this.currentItem + this.options.items; a += 1) this.visibleItems.push(a), !0 === this.options.addClassActive && f(this.$owlItems[a]).addClass("active");
			this.owl.visibleItems = this.visibleItems
		},
		transitionTypes: function(a) {
			this.outClass = "owl-" + a + "-out";
			this.inClass = "owl-" + a + "-in"
		},
		singleItemTransition: function() {
			var a = this,
				b = a.outClass,
				e = a.inClass,
				c = a.$owlItems.eq(a.currentItem),
				d = a.$owlItems.eq(a.prevItem),
				f = Math.abs(a.positionsInArray[a.currentItem]) + a.positionsInArray[a.prevItem],
				g = Math.abs(a.positionsInArray[a.currentItem]) + a.itemWidth / 2;
			a.isTransition = !0;
			a.$owlWrapper.addClass("owl-origin").css({
				"-webkit-transform-origin": g + "px",
				"-moz-perspective-origin": g +
					"px",
				"perspective-origin": g + "px"
			});
			d.css({
				position: "relative",
				left: f + "px"
			}).addClass(b).on("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend", function() {
				a.endPrev = !0;
				d.off("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend");
				a.clearTransStyle(d, b)
			});
			c.addClass(e).on("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend", function() {
				a.endCurrent = !0;
				c.off("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend");
				a.clearTransStyle(c, e)
			})
		},
		clearTransStyle: function(a,
			b) {
			a.css({
				position: "",
				left: ""
			}).removeClass(b);
			this.endPrev && this.endCurrent && (this.$owlWrapper.removeClass("owl-origin"), this.isTransition = this.endCurrent = this.endPrev = !1)
		},
		owlStatus: function() {
			this.owl = {
				userOptions: this.userOptions,
				baseElement: this.$elem,
				userItems: this.$userItems,
				owlItems: this.$owlItems,
				currentItem: this.currentItem,
				prevItem: this.prevItem,
				visibleItems: this.visibleItems,
				isTouch: this.browser.isTouch,
				browser: this.browser,
				dragDirection: this.dragDirection
			}
		},
		clearEvents: function() {
			this.$elem.off(".owl owl mousedown.disableTextSelect");
			f(k).off(".owl owl");
			f(g).off("resize", this.resizer)
		},
		unWrap: function() {
			0 !== this.$elem.children().length && (this.$owlWrapper.unwrap(), this.$userItems.unwrap().unwrap(), this.owlControls && this.owlControls.remove());
			this.clearEvents();
			this.$elem.attr("style", this.$elem.data("owl-originalStyles") || "").attr("class", this.$elem.data("owl-originalClasses"))
		},
		destroy: function() {
			this.stop();
			g.clearInterval(this.checkVisible);
			this.unWrap();
			this.$elem.removeData()
		},
		reinit: function(a) {
			a = f.extend({}, this.userOptions,
				a);
			this.unWrap();
			this.init(a, this.$elem)
		},
		addItem: function(a, b) {
			var e;
			if(!a) return !1;
			if(0 === this.$elem.children().length) return this.$elem.append(a), this.setVars(), !1;
			this.unWrap();
			e = void 0 === b || -1 === b ? -1 : b;
			e >= this.$userItems.length || -1 === e ? this.$userItems.eq(-1).after(a) : this.$userItems.eq(e).before(a);
			this.setVars()
		},
		removeItem: function(a) {
			if(0 === this.$elem.children().length) return !1;
			a = void 0 === a || -1 === a ? -1 : a;
			this.unWrap();
			this.$userItems.eq(a).remove();
			this.setVars()
		}
	};
	f.fn.owlCarousel = function(a) {
		return this.each(function() {
			if(!0 ===
				f(this).data("owl-init")) return !1;
			f(this).data("owl-init", !0);
			var b = Object.create(l);
			b.init(a, this);
			f.data(this, "owlCarousel", b)
		})
	};
	f.fn.owlCarousel.options = {
		items: 5,
		itemsCustom: !1,
		itemsDesktop: [1199, 4],
		itemsDesktopSmall: [979, 3],
		itemsTablet: [768, 2],
		itemsTabletSmall: !1,
		itemsMobile: [479, 1],
		singleItem: !1,
		itemsScaleUp: !1,
		slideSpeed: 200,
		paginationSpeed: 800,
		rewindSpeed: 1E3,
		autoPlay: !1,
		stopOnHover: !1,
		navigation: !1,
		navigationText: ["prev", "next"],
		rewindNav: !0,
		scrollPerPage: !1,
		pagination: !0,
		paginationNumbers: !1,
		responsive: !0,
		responsiveRefreshRate: 200,
		responsiveBaseWidth: g,
		baseClass: "owl-carousel",
		theme: "owl-theme",
		lazyLoad: !1,
		lazyFollow: !0,
		lazyEffect: "fade",
		autoHeight: !1,
		jsonPath: !1,
		jsonSuccess: !1,
		dragBeforeAnimFinish: !0,
		mouseDrag: !0,
		touchDrag: !0,
		addClassActive: !1,
		transitionStyle: !1,
		beforeUpdate: !1,
		afterUpdate: !1,
		beforeInit: !1,
		afterInit: !1,
		beforeMove: !1,
		afterMove: !1,
		afterAction: !1,
		startDragging: !1,
		afterLazyLoad: !1
	}
})(jQuery, window, document);

(function ($) {
	"use strict";
		$.fn.meanmenu = function (options) {
				var defaults = {
						meanMenuTarget: jQuery(this), // Target the current HTML markup you wish to replace
						meanMenuContainer: 'body', // Choose where meanmenu will be placed within the HTML
						meanMenuClose: "X", // single character you want to represent the close menu button
						meanMenuCloseSize: "18px", // set font size of close button
						meanMenuOpen: "<span /><span /><span />", // text/markup you want when menu is closed
						meanRevealPosition: "right", // left right or center positions
						meanRevealPositionDistance: "0", // Tweak the position of the menu
						meanRevealColour: "", // override CSS colours for the reveal background
						meanScreenWidth: "991", // set the screen width you want meanmenu to kick in at
						meanNavPush: "", // set a height here in px, em or % if you want to budge your layout now the navigation is missing.
						meanShowChildren: true, // true to show children in the menu, false to hide them
						meanExpandableChildren: true, // true to allow expand/collapse children
						meanExpand: "+", // single character you want to represent the expand for ULs
						meanContract: "-", // single character you want to represent the contract for ULs
						meanRemoveAttrs: false, // true to remove classes and IDs, false to keep them
						onePage: false, // set to true for one page sites
						meanDisplay: "block", // override display method for table cell based layouts e.g. table-cell
						removeElements: "" // set to hide page elements
				};
				options = $.extend(defaults, options);

				// get browser width
				var currentWidth = window.innerWidth || document.documentElement.clientWidth;

				return this.each(function () {
						var meanMenu = options.meanMenuTarget;
						var meanContainer = options.meanMenuContainer;
						var meanMenuClose = options.meanMenuClose;
						var meanMenuCloseSize = options.meanMenuCloseSize;
						var meanMenuOpen = options.meanMenuOpen;
						var meanRevealPosition = options.meanRevealPosition;
						var meanRevealPositionDistance = options.meanRevealPositionDistance;
						var meanRevealColour = options.meanRevealColour;
						var meanScreenWidth = options.meanScreenWidth;
						var meanNavPush = options.meanNavPush;
						var meanRevealClass = ".meanmenu-reveal";
						var meanShowChildren = options.meanShowChildren;
						var meanExpandableChildren = options.meanExpandableChildren;
						var meanExpand = options.meanExpand;
						var meanContract = options.meanContract;
						var meanRemoveAttrs = options.meanRemoveAttrs;
						var onePage = options.onePage;
						var meanDisplay = options.meanDisplay;
						var removeElements = options.removeElements;

						//detect known mobile/tablet usage
						var isMobile = false;
						if ( (navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i)) || (navigator.userAgent.match(/Android/i)) || (navigator.userAgent.match(/Blackberry/i)) || (navigator.userAgent.match(/Windows Phone/i)) ) {
								isMobile = true;
						}

						if ( (navigator.userAgent.match(/MSIE 8/i)) || (navigator.userAgent.match(/MSIE 7/i)) ) {
							// add scrollbar for IE7 & 8 to stop breaking resize function on small content sites
								jQuery('html').css("overflow-y" , "scroll");
						}

						var meanRevealPos = "";
						var meanCentered = function() {
							if (meanRevealPosition === "center") {
								var newWidth = window.innerWidth || document.documentElement.clientWidth;
								var meanCenter = ( (newWidth/2)-22 )+"px";
								meanRevealPos = "left:" + meanCenter + ";right:auto;";

								if (!isMobile) {
									jQuery('.meanmenu-reveal').css("left",meanCenter);
								} else {
									jQuery('.meanmenu-reveal').animate({
											left: meanCenter
									});
								}
							}
						};

						var menuOn = false;
						var meanMenuExist = false;


						if (meanRevealPosition === "right") {
								meanRevealPos = "right:" + meanRevealPositionDistance + ";left:auto;";
						}
						if (meanRevealPosition === "left") {
								meanRevealPos = "left:" + meanRevealPositionDistance + ";right:auto;";
						}
						// run center function
						meanCentered();

						// set all styles for mean-reveal
						var $navreveal = "";

						var meanInner = function() {
								// get last class name
								if (jQuery($navreveal).is(".meanmenu-reveal.meanclose")) {
										$navreveal.html(meanMenuClose);
								} else {
										$navreveal.html(meanMenuOpen);
								}
						};

						// re-instate original nav (and call this on window.width functions)
						var meanOriginal = function() {
							jQuery('.mean-bar,.mean-push').remove();
							jQuery(meanContainer).removeClass("mean-container");
							jQuery(meanMenu).css('display', meanDisplay);
							menuOn = false;
							meanMenuExist = false;
							jQuery(removeElements).removeClass('mean-remove');
						};

						// navigation reveal
						var showMeanMenu = function() {
								var meanStyles = "background:"+meanRevealColour+";color:"+meanRevealColour+";"+meanRevealPos;
								if (currentWidth <= meanScreenWidth) {
								jQuery(removeElements).addClass('mean-remove');
									meanMenuExist = true;
									// add class to body so we don't need to worry about media queries here, all CSS is wrapped in '.mean-container'
									jQuery(meanContainer).addClass("mean-container");
									jQuery('.mean-container').prepend('<div class="mean-bar"><a href="#nav" class="meanmenu-reveal" style="'+meanStyles+'">Show Navigation</a><nav class="mean-nav"></nav></div>');

									//push meanMenu navigation into .mean-nav
									var meanMenuContents = jQuery(meanMenu).html();
									jQuery('.mean-nav').html(meanMenuContents);

									// remove all classes from EVERYTHING inside meanmenu nav
									if(meanRemoveAttrs) {
										jQuery('nav.mean-nav ul, nav.mean-nav ul *').each(function() {
											// First check if this has mean-remove class
											if (jQuery(this).is('.mean-remove')) {
												jQuery(this).attr('class', 'mean-remove');
											} else {
												jQuery(this).removeAttr("class");
											}
											jQuery(this).removeAttr("id");
										});
									}

									// push in a holder div (this can be used if removal of nav is causing layout issues)
									jQuery(meanMenu).before('<div class="mean-push" />');
									jQuery('.mean-push').css("margin-top",meanNavPush);

									// hide current navigation and reveal mean nav link
									jQuery(meanMenu).hide();
									jQuery(".meanmenu-reveal").show();

									// turn 'X' on or off
									jQuery(meanRevealClass).html(meanMenuOpen);
									$navreveal = jQuery(meanRevealClass);

									//hide mean-nav ul
									jQuery('.mean-nav ul').hide();

									// hide sub nav
									if(meanShowChildren) {
											// allow expandable sub nav(s)
											if(meanExpandableChildren){
												jQuery('.mean-nav ul ul').each(function() {
														if(jQuery(this).children().length){
																jQuery(this,'li:first').parent().append('<a class="mean-expand" href="#" style="font-size: '+ meanMenuCloseSize +'">'+ meanExpand +'</a>');
														}
												});
												jQuery('.mean-expand').on("click",function(e){
														e.preventDefault();
															if (jQuery(this).hasClass("mean-clicked")) {
																	jQuery(this).text(meanExpand);
																jQuery(this).prev('ul').slideUp(300, function(){});
														} else {
																jQuery(this).text(meanContract);
																jQuery(this).prev('ul').slideDown(300, function(){});
														}
														jQuery(this).toggleClass("mean-clicked");
												});
											} else {
													jQuery('.mean-nav ul ul').show();
											}
									} else {
											jQuery('.mean-nav ul ul').hide();
									}

									// add last class to tidy up borders
									jQuery('.mean-nav ul li').last().addClass('mean-last');
									$navreveal.removeClass("meanclose");
									jQuery($navreveal).click(function(e){
										e.preventDefault();
								if( menuOn === false ) {
												$navreveal.css("text-align", "center");
												$navreveal.css("text-indent", "0");
												$navreveal.css("font-size", meanMenuCloseSize);
												jQuery('.mean-nav ul:first').slideDown();
												menuOn = true;
										} else {
											jQuery('.mean-nav ul:first').slideUp();
											menuOn = false;
										}
											$navreveal.toggleClass("meanclose");
											meanInner();
											jQuery(removeElements).addClass('mean-remove');
									});

									// for one page websites, reset all variables...
									if ( onePage ) {
										jQuery('.mean-nav ul > li > a:first-child').on( "click" , function () {
											jQuery('.mean-nav ul:first').slideUp();
											menuOn = false;
											jQuery($navreveal).toggleClass("meanclose").html(meanMenuOpen);
										});
									}
							} else {
								meanOriginal();
							}
						};

						if (!isMobile) {
								// reset menu on resize above meanScreenWidth
								jQuery(window).resize(function () {
										currentWidth = window.innerWidth || document.documentElement.clientWidth;
										if (currentWidth > meanScreenWidth) {
												meanOriginal();
										} else {
											meanOriginal();
										}
										if (currentWidth <= meanScreenWidth) {
												showMeanMenu();
												meanCentered();
										} else {
											meanOriginal();
										}
								});
						}

					jQuery(window).resize(function () {
								// get browser width
								currentWidth = window.innerWidth || document.documentElement.clientWidth;

								if (!isMobile) {
										meanOriginal();
										if (currentWidth <= meanScreenWidth) {
												showMeanMenu();
												meanCentered();
										}
								} else {
										meanCentered();
										if (currentWidth <= meanScreenWidth) {
												if (meanMenuExist === false) {
														showMeanMenu();
												}
										} else {
												meanOriginal();
										}
								}
						});

					// run main menuMenu function on load
					showMeanMenu();
				});
		};
		
})(jQuery);


(function() {
	var a, b, c, d, e, f = function(a, b) {
			return function() {
				return a.apply(b, arguments)
			}
		},
		g = [].indexOf || function(a) {
			for(var b = 0, c = this.length; c > b; b++)
				if(b in this && this[b] === a) return b;
			return -1
		};
	b = function() {
		function a() {}
		return a.prototype.extend = function(a, b) {
			var c, d;
			for(c in b) d = b[c], null == a[c] && (a[c] = d);
			return a
		}, a.prototype.isMobile = function(a) {
			return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(a)
		}, a.prototype.createEvent = function(a, b, c, d) {
			var e;
			return null == b && (b = !1), null == c && (c = !1), null == d && (d = null), null != document.createEvent ? (e = document.createEvent("CustomEvent"), e.initCustomEvent(a, b, c, d)) : null != document.createEventObject ? (e = document.createEventObject(), e.eventType = a) : e.eventName = a, e
		}, a.prototype.emitEvent = function(a, b) {
			return null != a.dispatchEvent ? a.dispatchEvent(b) : b in (null != a) ? a[b]() : "on" + b in (null != a) ? a["on" + b]() : void 0
		}, a.prototype.addEvent = function(a, b, c) {
			return null != a.addEventListener ? a.addEventListener(b, c, !1) : null != a.attachEvent ? a.attachEvent("on" + b, c) : a[b] = c
		}, a.prototype.removeEvent = function(a, b, c) {
			return null != a.removeEventListener ? a.removeEventListener(b, c, !1) : null != a.detachEvent ? a.detachEvent("on" + b, c) : delete a[b]
		}, a.prototype.innerHeight = function() {
			return "innerHeight" in window ? window.innerHeight : document.documentElement.clientHeight
		}, a
	}(), c = this.WeakMap || this.MozWeakMap || (c = function() {
		function a() {
			this.keys = [], this.values = []
		}
		return a.prototype.get = function(a) {
			var b, c, d, e, f;
			for(f = this.keys, b = d = 0, e = f.length; e > d; b = ++d)
				if(c = f[b], c === a) return this.values[b]
		}, a.prototype.set = function(a, b) {
			var c, d, e, f, g;
			for(g = this.keys, c = e = 0, f = g.length; f > e; c = ++e)
				if(d = g[c], d === a) return void(this.values[c] = b);
			return this.keys.push(a), this.values.push(b)
		}, a
	}()), a = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (a = function() {
		function a() {
			"undefined" != typeof console && null !== console && console.warn("MutationObserver is not supported by your browser."), "undefined" != typeof console && null !== console && console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.")
		}
		return a.notSupported = !0, a.prototype.observe = function() {}, a
	}()), d = this.getComputedStyle || function(a) {
		return this.getPropertyValue = function(b) {
			var c;
			return "float" === b && (b = "styleFloat"), e.test(b) && b.replace(e, function(a, b) {
				return b.toUpperCase()
			}), (null != (c = a.currentStyle) ? c[b] : void 0) || null
		}, this
	}, e = /(\-([a-z]){1})/g, this.WOW = function() {
		function e(a) {
			null == a && (a = {}), this.scrollCallback = f(this.scrollCallback, this), this.scrollHandler = f(this.scrollHandler, this), this.resetAnimation = f(this.resetAnimation, this), this.start = f(this.start, this), this.scrolled = !0, this.config = this.util().extend(a, this.defaults), null != a.scrollContainer && (this.config.scrollContainer = document.querySelector(a.scrollContainer)), this.animationNameCache = new c, this.wowEvent = this.util().createEvent(this.config.boxClass)
		}
		return e.prototype.defaults = {
			boxClass: "wow",
			animateClass: "animated",
			offset: 0,
			mobile: !0,
			live: !0,
			callback: null,
			scrollContainer: null
		}, e.prototype.init = function() {
			var a;
			return this.element = window.document.documentElement, "interactive" === (a = document.readyState) || "complete" === a ? this.start() : this.util().addEvent(document, "DOMContentLoaded", this.start), this.finished = []
		}, e.prototype.start = function() {
			var b, c, d, e;
			if(this.stopped = !1, this.boxes = function() {
					var a, c, d, e;
					for(d = this.element.querySelectorAll("." + this.config.boxClass), e = [], a = 0, c = d.length; c > a; a++) b = d[a], e.push(b);
					return e
				}.call(this), this.all = function() {
					var a, c, d, e;
					for(d = this.boxes, e = [], a = 0, c = d.length; c > a; a++) b = d[a], e.push(b);
					return e
				}.call(this), this.boxes.length)
				if(this.disabled()) this.resetStyle();
				else
					for(e = this.boxes, c = 0, d = e.length; d > c; c++) b = e[c], this.applyStyle(b, !0);
			return this.disabled() || (this.util().addEvent(this.config.scrollContainer || window, "scroll", this.scrollHandler), this.util().addEvent(window, "resize", this.scrollHandler), this.interval = setInterval(this.scrollCallback, 50)), this.config.live ? new a(function(a) {
				return function(b) {
					var c, d, e, f, g;
					for(g = [], c = 0, d = b.length; d > c; c++) f = b[c], g.push(function() {
						var a, b, c, d;
						for(c = f.addedNodes || [], d = [], a = 0, b = c.length; b > a; a++) e = c[a], d.push(this.doSync(e));
						return d
					}.call(a));
					return g
				}
			}(this)).observe(document.body, {
				childList: !0,
				subtree: !0
			}) : void 0
		}, e.prototype.stop = function() {
			return this.stopped = !0, this.util().removeEvent(this.config.scrollContainer || window, "scroll", this.scrollHandler), this.util().removeEvent(window, "resize", this.scrollHandler), null != this.interval ? clearInterval(this.interval) : void 0
		}, e.prototype.sync = function() {
			return a.notSupported ? this.doSync(this.element) : void 0
		}, e.prototype.doSync = function(a) {
			var b, c, d, e, f;
			if(null == a && (a = this.element), 1 === a.nodeType) {
				for(a = a.parentNode || a, e = a.querySelectorAll("." + this.config.boxClass), f = [], c = 0, d = e.length; d > c; c++) b = e[c], g.call(this.all, b) < 0 ? (this.boxes.push(b), this.all.push(b), this.stopped || this.disabled() ? this.resetStyle() : this.applyStyle(b, !0), f.push(this.scrolled = !0)) : f.push(void 0);
				return f
			}
		}, e.prototype.show = function(a) {
			return this.applyStyle(a), a.className = a.className + " " + this.config.animateClass, null != this.config.callback && this.config.callback(a), this.util().emitEvent(a, this.wowEvent), this.util().addEvent(a, "animationend", this.resetAnimation), this.util().addEvent(a, "oanimationend", this.resetAnimation), this.util().addEvent(a, "webkitAnimationEnd", this.resetAnimation), this.util().addEvent(a, "MSAnimationEnd", this.resetAnimation), a
		}, e.prototype.applyStyle = function(a, b) {
			var c, d, e;
			return d = a.getAttribute("data-wow-duration"), c = a.getAttribute("data-wow-delay"), e = a.getAttribute("data-wow-iteration"), this.animate(function(f) {
				return function() {
					return f.customStyle(a, b, d, c, e)
				}
			}(this))
		}, e.prototype.animate = function() {
			return "requestAnimationFrame" in window ? function(a) {
				return window.requestAnimationFrame(a)
			} : function(a) {
				return a()
			}
		}(), e.prototype.resetStyle = function() {
			var a, b, c, d, e;
			for(d = this.boxes, e = [], b = 0, c = d.length; c > b; b++) a = d[b], e.push(a.style.visibility = "visible");
			return e
		}, e.prototype.resetAnimation = function(a) {
			var b;
			return a.type.toLowerCase().indexOf("animationend") >= 0 ? (b = a.target || a.srcElement, b.className = b.className.replace(this.config.animateClass, "").trim()) : void 0
		}, e.prototype.customStyle = function(a, b, c, d, e) {
			return b && this.cacheAnimationName(a), a.style.visibility = b ? "hidden" : "visible", c && this.vendorSet(a.style, {
				animationDuration: c
			}), d && this.vendorSet(a.style, {
				animationDelay: d
			}), e && this.vendorSet(a.style, {
				animationIterationCount: e
			}), this.vendorSet(a.style, {
				animationName: b ? "none" : this.cachedAnimationName(a)
			}), a
		}, e.prototype.vendors = ["moz", "webkit"], e.prototype.vendorSet = function(a, b) {
			var c, d, e, f;
			d = [];
			for(c in b) e = b[c], a["" + c] = e, d.push(function() {
				var b, d, g, h;
				for(g = this.vendors, h = [], b = 0, d = g.length; d > b; b++) f = g[b], h.push(a["" + f + c.charAt(0).toUpperCase() + c.substr(1)] = e);
				return h
			}.call(this));
			return d
		}, e.prototype.vendorCSS = function(a, b) {
			var c, e, f, g, h, i;
			for(h = d(a), g = h.getPropertyCSSValue(b), f = this.vendors, c = 0, e = f.length; e > c; c++) i = f[c], g = g || h.getPropertyCSSValue("-" + i + "-" + b);
			return g
		}, e.prototype.animationName = function(a) {
			var b;
			try {
				b = this.vendorCSS(a, "animation-name").cssText
			} catch(c) {
				b = d(a).getPropertyValue("animation-name")
			}
			return "none" === b ? "" : b
		}, e.prototype.cacheAnimationName = function(a) {
			return this.animationNameCache.set(a, this.animationName(a))
		}, e.prototype.cachedAnimationName = function(a) {
			return this.animationNameCache.get(a)
		}, e.prototype.scrollHandler = function() {
			return this.scrolled = !0
		}, e.prototype.scrollCallback = function() {
			var a;
			return !this.scrolled || (this.scrolled = !1, this.boxes = function() {
				var b, c, d, e;
				for(d = this.boxes, e = [], b = 0, c = d.length; c > b; b++) a = d[b], a && (this.isVisible(a) ? this.show(a) : e.push(a));
				return e
			}.call(this), this.boxes.length || this.config.live) ? void 0 : this.stop()
		}, e.prototype.offsetTop = function(a) {
			for(var b; void 0 === a.offsetTop;) a = a.parentNode;
			for(b = a.offsetTop; a = a.offsetParent;) b += a.offsetTop;
			return b
		}, e.prototype.isVisible = function(a) {
			var b, c, d, e, f;
			return c = a.getAttribute("data-wow-offset") || this.config.offset, f = this.config.scrollContainer && this.config.scrollContainer.scrollTop || window.pageYOffset, e = f + Math.min(this.element.clientHeight, this.util().innerHeight()) - c, d = this.offsetTop(a), b = d + a.clientHeight, e >= d && b >= f
		}, e.prototype.util = function() {
			return null != this._util ? this._util : this._util = new b
		}, e.prototype.disabled = function() {
			return !this.config.mobile && this.util().isMobile(navigator.userAgent)
		}, e
	}()
}).call(this);

(function(e) {
	var t = function(t, n) {
		var r = e.extend({}, e.fn.nivoSlider.defaults, n);
		var i = {
			currentSlide: 0,
			currentImage: "",
			totalSlides: 0,
			running: false,
			paused: false,
			stop: false,
			controlNavEl: false
		};
		var s = e(t);
		s.data("nivo:vars", i).addClass("nivoSlider");
		var o = s.children();
		o.each(function() {
			var t = e(this);
			var n = "";
			if(!t.is("img")) {
				if(t.is("a")) {
					t.addClass("nivo-imageLink");
					n = t
				}
				t = t.find("img:first")
			}
			var r = r === 0 ? t.attr("width") : t.width(),
				s = s === 0 ? t.attr("height") : t.height();
			if(n !== "") {
				n.css("display", "none")
			}
			t.css("display", "none");
			i.totalSlides++
		});
		if(r.randomStart) {
			r.startSlide = Math.floor(Math.random() * i.totalSlides)
		}
		if(r.startSlide > 0) {
			if(r.startSlide >= i.totalSlides) {
				r.startSlide = i.totalSlides - 1
			}
			i.currentSlide = r.startSlide
		}
		if(e(o[i.currentSlide]).is("img")) {
			i.currentImage = e(o[i.currentSlide])
		} else {
			i.currentImage = e(o[i.currentSlide]).find("img:first")
		}
		if(e(o[i.currentSlide]).is("a")) {
			e(o[i.currentSlide]).css("display", "block")
		}
		var u = e("<img/>").addClass("nivo-main-image");
		u.attr("src", i.currentImage.attr("src")).show();
		s.append(u);
		e(window).resize(function() {
			s.children("img").width(s.width());
			u.attr("src", i.currentImage.attr("src"));
			u.stop().height("auto");
			e(".nivo-slice").remove();
			e(".nivo-box").remove()
		});
		s.append(e('<div class="nivo-caption"></div>'));
		var a = function(t) {
			var n = e(".nivo-caption", s);
			if(i.currentImage.attr("title") != "" && i.currentImage.attr("title") != undefined) {
				var r = i.currentImage.attr("title");
				if(r.substr(0, 1) == "#") r = e(r).html();
				if(n.css("display") == "block") {
					setTimeout(function() {
						n.html(r)
					}, t.animSpeed)
				} else {
					n.html(r);
					n.stop().fadeIn(t.animSpeed)
				}
			} else {
				n.stop().fadeOut(t.animSpeed)
			}
		};
		a(r);
		var f = 0;
		if(!r.manualAdvance && o.length > 1) {
			f = setInterval(function() {
				d(s, o, r, false)
			}, r.pauseTime)
		}
		if(r.directionNav) {
			s.append('<div class="nivo-directionNav"><a class="nivo-prevNav">' + r.prevText + '</a><a class="nivo-nextNav">' + r.nextText + "</a></div>");
			e(s).on("click", "a.nivo-prevNav", function() {
				if(i.running) {
					return false
				}
				clearInterval(f);
				f = "";
				i.currentSlide -= 2;
				d(s, o, r, "prev")
			});
			e(s).on("click", "a.nivo-nextNav", function() {
				if(i.running) {
					return false
				}
				clearInterval(f);
				f = "";
				d(s, o, r, "next")
			})
		}
		if(r.controlNav) {
			i.controlNavEl = e('<div class="nivo-controlNav"></div>');
			s.after(i.controlNavEl);
			for(var l = 0; l < o.length; l++) {
				if(r.controlNavThumbs) {
					i.controlNavEl.addClass("nivo-thumbs-enabled");
					var c = o.eq(l);
					if(!c.is("img")) {
						c = c.find("img:first")
					}
					if(c.attr("data-thumb")) i.controlNavEl.append('<a class="nivo-control" rel="' + l + '"><img src="' + c.attr("data-thumb") + '" alt="" /></a>')
				} else {
					i.controlNavEl.append('<a class="nivo-control" rel="' + l + '">' + (l + 1) + "</a>")
				}
			}
			e("a:eq(" + i.currentSlide + ")", i.controlNavEl).addClass("active");
			e("a", i.controlNavEl).bind("click", function() {
				if(i.running) return false;
				if(e(this).hasClass("active")) return false;
				clearInterval(f);
				f = "";
				u.attr("src", i.currentImage.attr("src"));
				i.currentSlide = e(this).attr("rel") - 1;
				d(s, o, r, "control")
			})
		}
		if(r.pauseOnHover) {
			s.hover(function() {
				i.paused = true;
				clearInterval(f);
				f = ""
			}, function() {
				i.paused = false;
				if(f === "" && !r.manualAdvance) {
					f = setInterval(function() {
						d(s, o, r, false)
					}, r.pauseTime)
				}
			})
		}
		s.bind("nivo:animFinished", function() {
			u.attr("src", i.currentImage.attr("src"));
			i.running = false;
			e(o).each(function() {
				if(e(this).is("a")) {
					e(this).css("display", "none")
				}
			});
			if(e(o[i.currentSlide]).is("a")) {
				e(o[i.currentSlide]).css("display", "block")
			}
			if(f === "" && !i.paused && !r.manualAdvance) {
				f = setInterval(function() {
					d(s, o, r, false)
				}, r.pauseTime)
			}
			r.afterChange.call(this)
		});
		var h = function(t, n, r) {
			if(e(r.currentImage).parent().is("a")) e(r.currentImage).parent().css("display", "block");
			e('img[src="' + r.currentImage.attr("src") + '"]', t).not(".nivo-main-image,.nivo-control img").width(t.width()).css("visibility", "hidden").show();
			var i = e('img[src="' + r.currentImage.attr("src") + '"]', t).not(".nivo-main-image,.nivo-control img").parent().is("a") ? e('img[src="' + r.currentImage.attr("src") + '"]', t).not(".nivo-main-image,.nivo-control img").parent().height() : e('img[src="' + r.currentImage.attr("src") + '"]', t).not(".nivo-main-image,.nivo-control img").height();
			for(var s = 0; s < n.slices; s++) {
				var o = Math.round(t.width() / n.slices);
				if(s === n.slices - 1) {
					t.append(e('<div class="nivo-slice" name="' + s + '"><img src="' + r.currentImage.attr("src") + '" style="position:absolute; width:' + t.width() + "px; height:auto; display:block !important; top:0; left:-" + (o + s * o - o) + 'px;" /></div>').css({
						left: o * s + "px",
						width: t.width() - o * s + "px",
						height: i + "px",
						opacity: "0",
						overflow: "hidden"
					}))
				} else {
					t.append(e('<div class="nivo-slice" name="' + s + '"><img src="' + r.currentImage.attr("src") + '" style="position:absolute; width:' + t.width() + "px; height:auto; display:block !important; top:0; left:-" + (o + s * o - o) + 'px;" /></div>').css({
						left: o * s + "px",
						width: o + "px",
						height: i + "px",
						opacity: "0",
						overflow: "hidden"
					}))
				}
			}
			e(".nivo-slice", t).height(i);
			u.stop().animate({
				height: e(r.currentImage).height()
			}, n.animSpeed)
		};
		var p = function(t, n, r) {
			if(e(r.currentImage).parent().is("a")) e(r.currentImage).parent().css("display", "block");
			e('img[src="' + r.currentImage.attr("src") + '"]', t).not(".nivo-main-image,.nivo-control img").width(t.width()).css("visibility", "hidden").show();
			var i = Math.round(t.width() / n.boxCols),
				s = Math.round(e('img[src="' + r.currentImage.attr("src") + '"]', t).not(".nivo-main-image,.nivo-control img").height() / n.boxRows);
			for(var o = 0; o < n.boxRows; o++) {
				for(var a = 0; a < n.boxCols; a++) {
					if(a === n.boxCols - 1) {
						t.append(e('<div class="nivo-box" name="' + a + '" rel="' + o + '"><img src="' + r.currentImage.attr("src") + '" style="position:absolute; width:' + t.width() + "px; height:auto; display:block; top:-" + s * o + "px; left:-" + i * a + 'px;" /></div>').css({
							opacity: 0,
							left: i * a + "px",
							top: s * o + "px",
							width: t.width() - i * a + "px"
						}));
						e('.nivo-box[name="' + a + '"]', t).height(e('.nivo-box[name="' + a + '"] img', t).height() + "px")
					} else {
						t.append(e('<div class="nivo-box" name="' + a + '" rel="' + o + '"><img src="' + r.currentImage.attr("src") + '" style="position:absolute; width:' + t.width() + "px; height:auto; display:block; top:-" + s * o + "px; left:-" + i * a + 'px;" /></div>').css({
							opacity: 0,
							left: i * a + "px",
							top: s * o + "px",
							width: i + "px"
						}));
						e('.nivo-box[name="' + a + '"]', t).height(e('.nivo-box[name="' + a + '"] img', t).height() + "px")
					}
				}
			}
			u.stop().animate({
				height: e(r.currentImage).height()
			}, n.animSpeed)
		};
		var d = function(t, n, r, i) {
			var s = t.data("nivo:vars");
			if(s && s.currentSlide === s.totalSlides - 1) {
				r.lastSlide.call(this)
			}
			if((!s || s.stop) && !i) {
				return false
			}
			r.beforeChange.call(this);
			if(!i) {
				u.attr("src", s.currentImage.attr("src"))
			} else {
				if(i === "prev") {
					u.attr("src", s.currentImage.attr("src"))
				}
				if(i === "next") {
					u.attr("src", s.currentImage.attr("src"))
				}
			}
			s.currentSlide++;
			if(s.currentSlide === s.totalSlides) {
				s.currentSlide = 0;
				r.slideshowEnd.call(this)
			}
			if(s.currentSlide < 0) {
				s.currentSlide = s.totalSlides - 1
			}
			if(e(n[s.currentSlide]).is("img")) {
				s.currentImage = e(n[s.currentSlide])
			} else {
				s.currentImage = e(n[s.currentSlide]).find("img:first")
			}
			if(r.controlNav) {
				e("a", s.controlNavEl).removeClass("active");
				e("a:eq(" + s.currentSlide + ")", s.controlNavEl).addClass("active")
			}
			a(r);
			e(".nivo-slice", t).remove();
			e(".nivo-box", t).remove();
			var o = r.effect,
				f = "";
			if(r.effect === "random") {
				f = new Array("sliceDownRight", "sliceDownLeft", "sliceUpRight", "sliceUpLeft", "sliceUpDown", "sliceUpDownLeft", "fold", "fade", "boxRandom", "boxRain", "boxRainReverse", "boxRainGrow", "boxRainGrowReverse");
				o = f[Math.floor(Math.random() * (f.length + 1))];
				if(o === undefined) {
					o = "fade"
				}
			}
			if(r.effect.indexOf(",") !== -1) {
				f = r.effect.split(",");
				o = f[Math.floor(Math.random() * f.length)];
				if(o === undefined) {
					o = "fade"
				}
			}
			if(s.currentImage.attr("data-transition")) {
				o = s.currentImage.attr("data-transition")
			}
			s.running = true;
			var l = 0,
				c = 0,
				d = "",
				m = "",
				g = "",
				y = "";
			if(o === "sliceDown" || o === "sliceDownRight" || o === "sliceDownLeft") {
				h(t, r, s);
				l = 0;
				c = 0;
				d = e(".nivo-slice", t);
				if(o === "sliceDownLeft") {
					d = e(".nivo-slice", t)._reverse()
				}
				d.each(function() {
					var n = e(this);
					n.css({
						top: "0px"
					});
					if(c === r.slices - 1) {
						setTimeout(function() {
							n.animate({
								opacity: "1.0"
							}, r.animSpeed, "", function() {
								t.trigger("nivo:animFinished")
							})
						}, 100 + l)
					} else {
						setTimeout(function() {
							n.animate({
								opacity: "1.0"
							}, r.animSpeed)
						}, 100 + l)
					}
					l += 50;
					c++
				})
			} else if(o === "sliceUp" || o === "sliceUpRight" || o === "sliceUpLeft") {
				h(t, r, s);
				l = 0;
				c = 0;
				d = e(".nivo-slice", t);
				if(o === "sliceUpLeft") {
					d = e(".nivo-slice", t)._reverse()
				}
				d.each(function() {
					var n = e(this);
					n.css({
						bottom: "0px"
					});
					if(c === r.slices - 1) {
						setTimeout(function() {
							n.animate({
								opacity: "1.0"
							}, r.animSpeed, "", function() {
								t.trigger("nivo:animFinished")
							})
						}, 100 + l)
					} else {
						setTimeout(function() {
							n.animate({
								opacity: "1.0"
							}, r.animSpeed)
						}, 100 + l)
					}
					l += 50;
					c++
				})
			} else if(o === "sliceUpDown" || o === "sliceUpDownRight" || o === "sliceUpDownLeft") {
				h(t, r, s);
				l = 0;
				c = 0;
				var b = 0;
				d = e(".nivo-slice", t);
				if(o === "sliceUpDownLeft") {
					d = e(".nivo-slice", t)._reverse()
				}
				d.each(function() {
					var n = e(this);
					if(c === 0) {
						n.css("top", "0px");
						c++
					} else {
						n.css("bottom", "0px");
						c = 0
					}
					if(b === r.slices - 1) {
						setTimeout(function() {
							n.animate({
								opacity: "1.0"
							}, r.animSpeed, "", function() {
								t.trigger("nivo:animFinished")
							})
						}, 100 + l)
					} else {
						setTimeout(function() {
							n.animate({
								opacity: "1.0"
							}, r.animSpeed)
						}, 100 + l)
					}
					l += 50;
					b++
				})
			} else if(o === "fold") {
				h(t, r, s);
				l = 0;
				c = 0;
				e(".nivo-slice", t).each(function() {
					var n = e(this);
					var i = n.width();
					n.css({
						top: "0px",
						width: "0px"
					});
					if(c === r.slices - 1) {
						setTimeout(function() {
							n.animate({
								width: i,
								opacity: "1.0"
							}, r.animSpeed, "", function() {
								t.trigger("nivo:animFinished")
							})
						}, 100 + l)
					} else {
						setTimeout(function() {
							n.animate({
								width: i,
								opacity: "1.0"
							}, r.animSpeed)
						}, 100 + l)
					}
					l += 50;
					c++
				})
			} else if(o === "fade") {
				h(t, r, s);
				m = e(".nivo-slice:first", t);
				m.css({
					width: t.width() + "px"
				});
				m.animate({
					opacity: "1.0"
				}, r.animSpeed * 2, "", function() {
					t.trigger("nivo:animFinished")
				})
			} else if(o === "slideInRight") {
				h(t, r, s);
				m = e(".nivo-slice:first", t);
				m.css({
					width: "0px",
					opacity: "1"
				});
				m.animate({
					width: t.width() + "px"
				}, r.animSpeed * 2, "", function() {
					t.trigger("nivo:animFinished")
				})
			} else if(o === "slideInLeft") {
				h(t, r, s);
				m = e(".nivo-slice:first", t);
				m.css({
					width: "0px",
					opacity: "1",
					left: "",
					right: "0px"
				});
				m.animate({
					width: t.width() + "px"
				}, r.animSpeed * 2, "", function() {
					m.css({
						left: "0px",
						right: ""
					});
					t.trigger("nivo:animFinished")
				})
			} else if(o === "boxRandom") {
				p(t, r, s);
				g = r.boxCols * r.boxRows;
				c = 0;
				l = 0;
				y = v(e(".nivo-box", t));
				y.each(function() {
					var n = e(this);
					if(c === g - 1) {
						setTimeout(function() {
							n.animate({
								opacity: "1"
							}, r.animSpeed, "", function() {
								t.trigger("nivo:animFinished")
							})
						}, 100 + l)
					} else {
						setTimeout(function() {
							n.animate({
								opacity: "1"
							}, r.animSpeed)
						}, 100 + l)
					}
					l += 20;
					c++
				})
			} else if(o === "boxRain" || o === "boxRainReverse" || o === "boxRainGrow" || o === "boxRainGrowReverse") {
				p(t, r, s);
				g = r.boxCols * r.boxRows;
				c = 0;
				l = 0;
				var w = 0;
				var E = 0;
				var S = [];
				S[w] = [];
				y = e(".nivo-box", t);
				if(o === "boxRainReverse" || o === "boxRainGrowReverse") {
					y = e(".nivo-box", t)._reverse()
				}
				y.each(function() {
					S[w][E] = e(this);
					E++;
					if(E === r.boxCols) {
						w++;
						E = 0;
						S[w] = []
					}
				});
				for(var x = 0; x < r.boxCols * 2; x++) {
					var T = x;
					for(var N = 0; N < r.boxRows; N++) {
						if(T >= 0 && T < r.boxCols) {
							(function(n, i, s, u, a) {
								var f = e(S[n][i]);
								var l = f.width();
								var c = f.height();
								if(o === "boxRainGrow" || o === "boxRainGrowReverse") {
									f.width(0).height(0)
								}
								if(u === a - 1) {
									setTimeout(function() {
										f.animate({
											opacity: "1",
											width: l,
											height: c
										}, r.animSpeed / 1.3, "", function() {
											t.trigger("nivo:animFinished")
										})
									}, 100 + s)
								} else {
									setTimeout(function() {
										f.animate({
											opacity: "1",
											width: l,
											height: c
										}, r.animSpeed / 1.3)
									}, 100 + s)
								}
							})(N, T, l, c, g);
							c++
						}
						T--
					}
					l += 100
				}
			}
		};
		var v = function(e) {
			for(var t, n, r = e.length; r; t = parseInt(Math.random() * r, 10), n = e[--r], e[r] = e[t], e[t] = n);
			return e
		};
		var m = function(e) {
			if(this.console && typeof console.log !== "undefined") {
				console.log(e)
			}
		};
		this.stop = function() {
			if(!e(t).data("nivo:vars").stop) {
				e(t).data("nivo:vars").stop = true;
				m("Stop Slider")
			}
		};
		this.start = function() {
			if(e(t).data("nivo:vars").stop) {
				e(t).data("nivo:vars").stop = false;
				m("Start Slider")
			}
		};
		r.afterLoad.call(this);
		return this
	};
	e.fn.nivoSlider = function(n) {
		return this.each(function(r, i) {
			var s = e(this);
			if(s.data("nivoslider")) {
				return s.data("nivoslider")
			}
			var o = new t(this, n);
			s.data("nivoslider", o)
		})
	};
	e.fn.nivoSlider.defaults = {
		effect: "random",
		slices: 15,
		boxCols: 8,
		boxRows: 4,
		animSpeed: 500,
		pauseTime: 3e3,
		startSlide: 0,
		directionNav: true,
		controlNav: true,
		controlNavThumbs: false,
		pauseOnHover: true,
		manualAdvance: false,
		prevText: "Prev",
		nextText: "Next",
		randomStart: false,
		beforeChange: function() {},
		afterChange: function() {},
		slideshowEnd: function() {},
		lastSlide: function() {},
		afterLoad: function() {}
	};
	e.fn._reverse = [].reverse
})(jQuery)