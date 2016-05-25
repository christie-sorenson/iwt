// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngSanitize', 'ngAnimate'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    cache: false,
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.browse', {
    cache: false,
    url: '/browse',
    views: {
      'menuContent': {
        templateUrl: 'templates/browse.html',
        controller: 'BrowseCtrl'
      }
    }
  })

  .state('app.bookmarks', {
    cache: false,
    url: '/bookmarks',
    views: {
      'menuContent': {
        templateUrl: 'templates/bookmarks.html',
        controller: 'BookmarksCtrl'
      }
    }
  })

  .state('app.single', {
    url: '/bookmarks/:item',
    views: {
      'menuContent': {
        templateUrl: 'templates/bookmark.html',
        controller: 'BookmarkCtrl'
      }
    }
  })

  .state('app.portData', {
    url: '/portData',
    views: {
      'menuContent': {
        templateUrl: 'templates/portData.html',
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/bookmarks');
}); 

document.addEventListener('deviceready', function () {
  if (navigator.notification) { // Override default HTML alert with native dialog
      window.alert = function (message, callback, title, name) {
          navigator.notification.alert(
              message,    // message
              callback,   // callback
              title,      // title
              name        // buttonName
          );
      };
  }
}, false);