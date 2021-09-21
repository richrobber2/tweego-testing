/*
 t8n-typewriter module for SugarCube v2 */
var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.createTemplateTagFirstArg = function (g) {
    return g.raw = g;
};
$jscomp.createTemplateTagFirstArgWithRaw = function (g, h) {
    g.raw = h;
    return g;
};
Config.navigation.override = function () {
    if (State.variables.BADEND) {
        return "ArisaAwareScreen";
    }
};
Config.history.controls = !0;
Config.ui.stowBarInitially = !1;
Config.saves.autoload = !1;
Macro.add("scrolldown", {
    handler: function () {
        var g = document.scrollingElement || "html,body";
        if (0 < this.args.length) {
            switch (this.args[0]) {
                case "fast":
                case "slow":
                    var h = this.args[0];
                    break;
                default:
                    try {
                        h = Math.max(Engine.minDomActionDelay, Util.fromCssTime(this.args[0]));
                    } catch (e) {
                        return this.error(e.message);
                    }
            }
        } else {
            h = "slow";
        }
        setTimeout(function () {
            $(g).animate({
                scrollTop: $(document).height() - $(window).height()
            }, h);
        }, Engine.minDomActionDelay);
    }
});
!function () {
    var g = function () {
            function l(b, d) {
                for (var a = 0; a < d.length; a++) {
                    var c = d[a];
                    c.enumerable = c.enumerable || !1;
                    c.configurable = !0;
                    "value" in c && (c.writable =! 0);
                    Object.defineProperty(b, c.key, c);
                }
            }
            return function (b, d, a) {
                return d && l(b.prototype, d),
                a && l(b, a),
                b;
            };
        }(),
        h = function () {
            function l(b, d) {
                if (!(this instanceof l)) {
                    throw new TypeError("Cannot call a class as a function");
                }
                if (Object.defineProperties(this, {
                    node: {
                        value: b
                    },
                    childNodes: {
                        value: []
                    },
                    value: {
                        writable: !0,
                        value: ""
                    },
                    append: {
                        writable: !0,
                        value: !! d
                    },
                    abortTyping: {
                        writable: !0,
                        value: !1
                    }
                }), this.node.nodeValue && (this.value = this.node.nodeValue, this.node.nodeValue = ""), !this.node.style || "none" !== this.node.style.display) {
                    for (var a = this.node.childNodes; 0 < a.length;) {
                        this.childNodes.push(new l(a[0], !0)),
                        this.node.removeChild(a[0]);
                    }
                }
            }
            return g(l, [
                {
                    key: "finish",
                    value: function () {
                        for (this.abortTyping =! 0; this.unfurl();) {}
                    }
                }, {
                    key: "unfurl",
                    value: function (b) {
                        if (this.append && (b && b.appendChild(this.node), this.append =! 1), this.value) {
                            return this.node.nodeValue += this.value[0],
                            this.value = this.value.slice(1),
                            !0;
                        }
                        b = this.node;
                        for (var d = 0, a = this.childNodes.length; d < a; ++ d) {
                            if (this.childNodes[d].unfurl(b)) {
                                return !0;
                            }
                        }
                        return !1;
                    }
                }
            ], [{
                    key: "typeout",
                    value: function (b, d, a) {
                        function c() {
                            if (! f.abortTyping) {
                                var k = passage(),
                                    m = setInterval(function () {
                                        ! f.abortTyping && passage() === k && f.unfurl() || clearInterval(m);
                                    }, d);
                            }
                        }
                        var f = new l(b);
                        return a ? setTimeout(c, a) : c(),
                        f;
                    }
                }]),
            l;
        }(),
        e = /^t8n-typewriter-(\d+)(?:-(\d+))?$/;
    postrender["t8n-typewriter-handler"] = function (l) {
        $(document).off("keypress.t8n-typewriter");
        for (var b = this.tags, d = 0; d < b.length; ++ d) {
            var a = e.exec(b[d]);
            if (null !== a && "break" === function () {
                var c = h.typeout(l, Number(a[1]), Number(a[2]));
                return $(document).on("keypress.t8n-typewriter", function (f) {
                    32 !== f.which || f.target !== document.body && f.target !== document.documentElement || (f.preventDefault(), $(document).off("keypress.t8n-typewriter"), c.finish());
                }),
                "break";
            }()) {
                break;
            }
        }
    };
}();
var $rightUiBar = $('<div id="right-ui-bar"></div>').insertAfter("#ui-bar"),
    rightTray = $rightUiBar.append('<div id="right-ui-bar-tray"><button id="right-ui-bar-toggle" tabindex="0" title="Toggle the Right UI bar" aria-label="Toggle the Right UI bar" type="button"></button></div>'),
    rightBody = $rightUiBar.append('<div id="right-ui-bar-body"></div>');
$rightUiBar.find("#right-ui-bar-toggle").ariaClick({
    label: "Toggle the Right UI bar"
}, function () {
    let {style} = document.querySelector(":root");
    style.setProperty("--sidebarR", "inherit");
    return $rightUiBar.toggleClass("stowed");
});
postrender["Display Right Sidebar Contents"] = function (g, h) {
    setPageElement("right-ui-bar-body", "StoryRightSidebar");
};