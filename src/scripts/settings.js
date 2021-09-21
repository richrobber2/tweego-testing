// create the root selector as g
var g = document.querySelector(":root");
// generates a random color and returns it
function randomColor() {
    var letters = "0123456789ABCDEF";
    var color = '#';
    for (var i = 0; i < 6; i++)
        color += letters[(Math.floor(Math.random() * 16))];

    return color;
}
// add random colors on passagestart to the main colors
var randomColors = function () {
    if (settings.RandomColorEveryPassage) { // is true
        // listen to passagestart event
        $(document).on(':passagestart', function (ev) {
            // set main color to random
            g.style.setProperty("--MainColor", randomColor());
            // apply random color to main
            g.style.setProperty("--main", randomColor());
        });
    }
};
Setting.addToggle("RandomColorEveryPassage", {
    label: "Change background color every passage randomly",
    default: false,
    onChange: randomColors
});


// toggleglow helper functions
var toggleglow = function () {
    // remove glow when true
    if (settings.toggleglow) {
        $("html").css("text-shadow", "none");
        // add text shadow to the html
    } else {
        $("html").css("text-shadow", "0 0 5px #c8c8c8");
    }
};
// turn text glow on or off Default is (tbd)
Setting.addToggle("toggleglow", {
    label: "turn off text glow",
    default: false,
    onInit: toggleglow,
    onChange: toggleglow
});

// add a range selector for brightness that can go from 0 to 220 the defailt is 120
//TODO make this work as i want it to
    Setting.addRange("Brightness", {
        label: "Brightness",
        min: 0,
        max: 220,
        step: 2,
        default: 120,
        // fired when the user changes the range
        onChange: function () {
            // set main color if theme is terminal
            if (settings.theme === "Terminal") {
                g.style.setProperty("--MainColor", `radial-gradient(rgba(0, 255, 0, 0.75), black ${settings.Brightness}%`)
                g.style.setProperty("--main", `radial-gradient(rgba(0, 255, 0, 0.75), black ${settings.Brightness}%`)
                // check if terminal theme is being used and if it is then send alert saying that the theme is in construction
            } else {
                function opensettings() {
                    UI.settings()
                }
                // show alert if terminal theme is used
                UI.alert("this is only used when the terminal theme is being used", {
                    top: 50
                }, opensettings)
            }
        }
    });

// default setting theme names edit these to change what is displayed to the use not that just adding it will make the logic that does things (not really sure why i am writing all this useless junk)
var settingThemeNames = ["classic", "Terminal", "Random Color", "custom"],
settingThemeHandler = function () {
    // set main color according to theme
    switch (settings.theme) {
        //only want it to apear when terminal is selected
        case "Terminal":
            brightnesss = 1
            g.style.setProperty("--MainColor", "radial-gradient(rgba(0, 255, 0, 0.75), black 120%)");
            g.style.setProperty("--main", "radial-gradient(rgba(0, 255, 0, 0.75), black 120%)");

            function opensettings() {
                UI.settings()
            }
            UI.alert("you are using a theme that is in development if u dont want this propmt then change to another one if you dont care then click ok [the side bars make the page look bad i will eventually fix it (not loliconman if u can find me come bug me about it in the discord server)]", {
                top: 50
            }, opensettings)
            break;
        case "classic":
            g.style.setProperty("--MainColor", "#06f");
            g.style.setProperty("--main", "#004e98");
            break;
        case "custom":
            alert("this is currently in the list to be added");
        case "Random Color":
            g.style.setProperty("--MainColor", randomColor());
            g.style.setProperty("--main", randomColor());
    }
};
Setting.addList("theme", {
    label: "Choose a theme.",
    list: settingThemeNames,
    default: "classic",
    onInit: settingThemeHandler,
    onChange: settingThemeHandler
});
var smokingToggle = function () {
        state.variables.Smoking = settings.Smoking ? 1 : 0;
    },
    smokingCheck = function () {
        return !0 === state.variabels.Smoking ? !0 : !1;
    };