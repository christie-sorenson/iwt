"use strict";

var createViewModel = require("./main-view-model").createViewModel;
var color = require("color");
var view;

function onNavigatingTo(args) {
    var page = args.object;
    view = page.getViewById("cse");
    page.bindingContext = createViewModel();
}
exports.onNavigatingTo = onNavigatingTo;

function onAnimate(args) {
  var colors =["aqua", "black", "blue", "fuchsia", "gray", "green", "lime", "maroon",
       "navy", "olive", "purple", "red", "silver", "teal", "white", "yellow"];

  var random = Math.floor(Math.random() * 16);
  var color = colors[random];
  var textColor = color == "white" ? "black" : "white";

  view.animate({
    color: textColor,
    backgroundColor: color,
    duration: 2000
  });
}

exports.onAnimate = onAnimate;
/*
function changeColors()
    {
        var colors =["aqua", "black", "blue", "fuchsia", "gray", "green", "lime", "maroon",
             "navy", "olive", "purple", "red", "silver", "teal", "white", "yellow"];

        var random = Math.floor(Math.random() * 16);
        var timeStamp = new Date();

        var color = colors[random];
        var textColor = color == "white" ? "black" : "white";

      //  document.getElementById("cse").style.color = textColor;
      //  document.body.style.backgroundColor = color;

    }
*/
/*


  "use strict";
  var color = require("color");
  var view;
  function pageLoaded(args) {
      var page = args.object;
      view = page.getViewById("view");
  }
  exports.pageLoaded = pageLoaded;
  function onAnimate(args) {
      view.animate({
          backgroundColor: new color.Color("#3D5AFE"),
          duration: 3000
      });
  }
  exports.onAnimate = onAnimate;
  function onReset(args) {
      view.backgroundColor = new color.Color("White");
  }
  exports.onReset = onReset;
  */
