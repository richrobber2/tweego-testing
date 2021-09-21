State.variables.WinPosX = 0;
State.variables.WinPosY = 0;
// update window position on passage init
$(document).on(":passageinit", function (event) {
  if (State.length > 0) {
    State.history[State.length - 1].variables.WinPosX = window.scrollX;
    State.history[State.length - 1].variables.WinPosY = window.scrollY;
  }
});
// scroll to the window when the passage ends
$(document).on(":passageend", function (event) {
  if (State.variables.WinPosX || State.variables.WinPosY) {
    window.scroll(State.variables.WinPosX, State.variables.WinPosY);
    State.variables.WinPosX = 0;
    State.variables.WinPosY = 0;
  }
});