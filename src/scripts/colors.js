Macro.add('glow', {
    skipArgs: false,
    handler: function () {
        try {
            let g = document.querySelector(":root");
            g.style.setProperty("--bgglow", this.args[0]);
            g.style.setProperty("--bgtime", this.args[1]);
        } catch (ex) {
            return this.error('you got an error from the glow macro: ' + ex.message);
        }
    }
});

Macro.add('varchange', {
    skipArgs: false,
    handler: function () {
        // add code to have code dynamic have it blink when the update has not been seen
        // i will probably use the seen macro
        try {
            let {style} = document.querySelector(":root");

            // this could use some optimization but for now this works
            // change sidebar right based on the name of character name input through the arguments
            switch (this.args[0]) {
                case "arisa":
                    style.setProperty("--sidebarR", "#ff007f");
                    break;
                case "redia":
                    style.setProperty("--sidebarR", "#FF3030");
                    break
                case "suiko":
                    style.setProperty("--sidebarR", "#734f96");
                    break
                case "sara":
                    style.setProperty("--sidebarR", "#fbec5d");
                    break
                case "randy":
                    style.setProperty("--sidebarR", "#ff8243");
                    break
                case "lilith":
                    style.setProperty("--sidebarR", "#6b00b3");
                    break
                case "amber":
                    style.setProperty("--sidebarR", "#113f11");
                    break
                case "karen":
                    style.setProperty("--sidebarR", "#1E90FF");
                    break
                default:
                    style.setProperty("--sidebarR", "inherit");
                    break;
            }
        } catch (ex) {
            return this.error('you got an error from the ' + this.name + ': ' + ex.message);
        }
    }
});