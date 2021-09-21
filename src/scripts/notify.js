Macro.add("notify", {tags:null, handler:function() {
    $(document.body).overhang({type:this.args[0] || "info", duration:Number.parseInt(this.args[1]) || 3, easing:"swing", message:"", varedit:this.args[2]}).find(".overhang .overhang-message").empty().wiki(this.payload[0].contents);
  }});
  (function(g) {
    g.fn.overhang = function(h) {
      function e(k, m) {
        b.slideUp(a.speed, function() {
          k && a.callback(null !== m ? l.data(m) : "");
        });
      }
      var l = g(this), b = g("<div class='overhang'></div>");
      g(".overhang").remove();
      var d = {success:["#2ECC71", "#27AE60"], error:["#E74C3C", "#C0392B"], warn:["#E67E22", "#D35400"], info:["#3498DB", "#2980B9"], prompt:["#9B59B6", "#8E44AD"], confirm:["#1ABC9C", "#16A085"], blank:["#34495E", "#2C3E50"]}, a = g.extend({type:"success", message:"This is an overhang.js message!", textColor:"#FFFFFF", yesMessage:"Yes", noMessage:"No", yesColor:"#2ECC71", noColor:"#E74C3C", duration:1.5, speed:500, closeConfirm:!1, upper:!1, easing:"easeOutBounce", html:!1, callback:function() {
      }}, h);
      -1 === g.inArray(a.type, "success error warn info prompt confirm".split(" ")) && (a.type = "blank", console.log("You have entered invalid type name for an overhang message."));
      h.custom ? (a.primary = h.primary, a.accent = h.accent) : (a.primary = d[a.type][0] || "#ECF0F1", a.accent = d[a.type][1] || "#BDC3C7");
      switch(a.type) {
        case "prompt":
        case "confirm":
          a.primary = h.primary || d[a.type][0], a.accent = h.accent || d[a.type][1], a.closeConfirm = !0;
      }
      b.css("background-color", a.primary);
      b.css("border-bottom", "6px solid " + a.accent);
      h = g("<span class='overhang-message'></span>");
      h.css("color", a.textColor);
      a.html ? h.html(a.message) : h.text(a.upper ? a.message.toUpperCase() : a.message);
      b.append(h);
      var c = g("<input class='overhang-prompt-field' />");
      h = g("<button class='overhang-yes-option'>" + a.yesMessage + "</button>");
      d = g("<button class='overhang-no-option'>" + a.noMessage + "</button>");
      h.css("background-color", a.yesColor);
      d.css("background-color", a.noColor);
      if (a.closeConfirm) {
        var f = g("<span class='overhang-close'></span>");
        f.css("color", a.accent);
        "confirm" !== a.type && b.append(f);
      }
      switch(a.type) {
        case "prompt":
          b.append(c);
          l.data("overhangPrompt", null);
          c.keydown(function(k) {
            if (13 === k.keyCode) {
              l.data("overhangPrompt", c.val());
              k = "SugarCube.State.active.variables." + a.varedit + " = " + c.val();
              console.log(c.val());
              if (c.val()) {
                console.log("the version for strings");
                try {
                  Function("return (" + k + ")")();
                } catch (m) {
                  throw alert('you probably didnt put "around the text" ');
                }
              } else {
                console.log("the normal version for numbers");
                try {
                  Function("return (" + k + ")")();
                } catch (m) {
                  alert("i honestly dont know how u got this error");
                }
              }
              e(!0, "overhangPrompt");
            }
          });
          break;
        case "confirm":
          b.append(h), b.append(d), b.append(f), l.data("overhangConfirm", null), h.click(function() {
            l.data("overhangConfirm", !0);
            e(!0, "overhangConfirm");
          }), d.click(function() {
            l.data("overhangConfirm", !1);
            e(!0, "overhangConfirm");
          });
      }
      l.append(b);
      a.closeConfirm ? (b.slideDown(a.speed, a.easing), f.click(function() {
        if ("prompt" !== a.type && "confirm" !== a.type) {
          return e(!0, null), test;
        }
        e(!1, null);
      })) : b.slideDown(a.speed, a.easing).delay(1000 * a.duration).slideUp(a.speed, function() {
        e(!0, null);
      });
      return this;
    };
  })(jQuery);