"use strict";

var createViewModel = require("./main-view-model").createViewModel;
var cameraModule = require("camera");
var view;
var myImage;

function onNavigatingTo(args) {
  var page = args.object;
  view = page.getViewById("cse");
  myImage = page.getViewById("myImage");
  myImage.src = "https://placehold.it/150x150";
  page.bindingContext = {};
  //page.bindingContext = createViewModel();
}
exports.onNavigatingTo = onNavigatingTo;

function onAnimate(args) {
  var colors =["aqua", "black", "blue", "fuchsia", "gray", "green", "lime", "maroon",
       "navy", "olive", "purple", "red", "silver", "teal", "white", "yellow"];

  var random = Math.floor(Math.random() * 16);
  var bgcolor = colors[random];

  view.animate({
    backgroundColor: bgcolor,
    duration: 2000
  });
}
exports.onAnimate = onAnimate;

exports.tapAction = function() {
  cameraModule.takePicture().then(function(picture) {
    myImage.imageSource = picture;
  });
}


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
