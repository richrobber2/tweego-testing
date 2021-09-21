/* <<seen>> macro - Start */
setup.seenNewObservers = [];
setup.seenOldObservers = [];
Macro.add("seen", {
	tags: ["content", "hidden"],
	handler: function () {
		var vis = 0;
		if (this.args.length) {
			vis = parseFloat(this.args[0]);
			if (isNaN(vis)) {
				vis = 0;
			} else {
				vis = vis.clamp(0, 99) / 100; // Fixes problems with 99% visibility when totally visible.
			}
		}
		// reset the seen element index
		if (State.temporary.SeenElementIndex == undefined) {
			State.temporary.SeenElementIndex = 0;
		}
		// increment temporary element index
		var n = ++State.temporary.SeenElementIndex;
		// create the html
		var txt = '<span id="seen-macro-' + n + '">',
			hid = "";
		// add the hidden content
		if (this.payload.length > 1) {
			for (var i = 1; i < this.payload.length; ++i) {
				if (this.payload[i].name === "hidden") {
					hid += this.payload[i].contents;
				} else {
					txt += this.payload[i].contents;
				}
			}
		}
		if (txt === '<span id="seen-macro-' + n + '">') {
			txt += " ";
		}
		txt += '</span>';
		// add an intersection observer to the output
		$(this.output).wiki(txt);
		if (window.IntersectionObserver) {
			setup.seenNewObservers.unshift({
				index: n,
				threshold: vis,
				viscode: this.payload[0].contents,
				hidcode: hid
			});
		}
	}
});
setup.seenHandler = function (entries, observer) {
	if ($("html").attr("data-init") != "loading") {
		if (entries[0].intersectionRatio > observer.threshold) {
			if (observer.hidden) {
				observer.hidden = false;
				$.wiki(observer.viscode);
			}
		} else if (entries[0].intersectionRatio === 0) {
			if (!observer.hidden) {
				observer.hidden = true;
				$.wiki(observer.hidcode);
			}
		}
	}
};

$(document).on(":passageend", function (event) {
	while (setup.seenOldObservers.length) {
		// Clear out old observers
		setup.seenOldObservers[0].disconnect();
		setup.seenOldObservers.shift();
	}
	var obs;
	while (setup.seenNewObservers.length) {
		// Create new observers
		if (setup.seenNewObservers[0].threshold === 0) {
			obs = new IntersectionObserver(setup.seenHandler, {
				threshold: [0, 0.01, 0.99, 1]
			});
		} else {
			obs = new IntersectionObserver(setup.seenHandler, {
				threshold: [0, setup.seenNewObservers[0].threshold, 1]
			});
		}
		obs.observe($("#seen-macro-" + setup.seenNewObservers[0].index)[0]);
		obs.index = setup.seenNewObservers[0].index;
		obs.threshold = setup.seenNewObservers[0].threshold;
		obs.viscode = setup.seenNewObservers[0].viscode;
		obs.hidcode = setup.seenNewObservers[0].hidcode;
		obs.hidden = true;
		setup.seenOldObservers[0] = obs;
		setup.seenNewObservers.shift();
	}
});
/* <<seen>> macro - End */