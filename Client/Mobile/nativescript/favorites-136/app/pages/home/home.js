var BasePage = require("../../shared/BasePage");
var topmost = require("ui/frame").topmost;
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var utilityModule = require("utils/utils");
var listViewModule = require("ui/list-view");

var listView = new listViewModule.ListView();

var HomePage = function() {};
var launch = function() {};
HomePage.prototype = new BasePage();
HomePage.prototype.constructor = HomePage;
var item = new ObservableArray([]);
listView.items = item;

item.push({ name: "UCSD",
              url: "https://www.ucsd.edu/"
           });
item.push({ name: "Google",
              url: "https://www.google.com"
            });
item.push({ name: "Github",
              url: "https://www.github.com"
           });
item.push({ name: "Pint",
             url: "https://www.pint.com"
           })

var pageData = new Observable();

// Place any code you want to run when the home page loads here.
HomePage.prototype.contentLoaded = function() {}

HomePage.prototype.pageLoaded = function(args) {
  var page = args.object;
  page.bindingContext = pageData;
  pageData.set("items", listView.items);
}

HomePage.prototype.launch = function(e) {
  var stuff = e.object;
  var thing = stuff.bindingContext;
  utilityModule.openUrl( thing.url );
}

module.exports = new HomePage();



//exports.pageLoaded = pageLoaded;
