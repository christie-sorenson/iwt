angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
      $scope.loginData = {};
    }, 1000);
  };
})

.controller('BookmarksCtrl', function($scope, $ionicListDelegate, $ionicModal, $timeout) {
  function closeOptions() {
    $scope.showDelete = false;
    $scope.showReorder = false;
    $ionicListDelegate.closeOptionButtons();
  }

  $scope.openBrowser = function(url) {
      var options = {
        location: 'yes',
        clearcache: 'yes',
        toolbar: 'no',
        hidden: 'yes'
      };

      /* Change _system to _blank for inAppBrowser usage */
      window.open(encodeURI(url), '_system', options);
   }

  $scope.showDelete = false;
  $scope.showReorder = false;
  $scope.listCanSwipe = true;

  $scope.formData = {};
  $scope.bookmarks = [
    { title: 'PINT', id: 1, rank: 1 , url: 'https://www.PINT.com', desc: 'web', tag: 'fav'},
    { title: 'Yahoo', id: 2, rank: 2 , url: 'https://www.yahoo.com', desc: 'search', tag: 'fav'},
    { title: 'Google', id: 3, rank: 3, url: 'https://www.google.com', desc: 'search', tag: 'fav'},
    { title: 'Apple', id: 4, rank: 4, url: 'https://www.apple.com', desc: 'hardware', tag: 'fav'},
    { title: 'Facebook', id: 5, rank: 5, url: 'https://www.facebook.com', desc: 'social media', tag: 'fav'},
    { title: 'Microsoft', id: 6, rank: 6, url: 'https://www.microsoft.com', desc: 'software', tag: 'fav'},
    { title: 'Amazon', id: 7, rank: 7, url: 'https://www.amazon.com', desc: 'eCommerce', tag: 'fav'},
    { title: 'TradeKing', id: 8, rank: 8, url: 'https://www.tradeking.com', desc: 'trading%252Ffinance', tag: 'fav'},
    { title: 'RobinHood', id: 9, rank: 9, url: 'https://www.robinhood.com', desc: 'trading%252Ffinance', tag: 'fav'},
    { title: 'Medium', id: 10, rank: 2, url: 'https://www.medium.com', desc: 'publishing platform', tag: 'read'},
    { title: 'Reddit', id: 11, rank: 1, url: 'https://www.reddit.com', desc: 'discussion', tag: 'read'}
  ];

  /* get $scope.bookmarks as data from REST call and use this to filter by tag
    data.reduce(function(result, current) {
      result[current.tag] = result[current.tag] || [];
      result[current.tag].push(current);
      return result;
    }, []);
  */
  //desc = str_replace("%2F", "%252F", desc); translate '/' in description to be url encoded

  $scope.info = function(item) {
    if (event.type !== 'click') {
      return;
    }
    $ionicListDelegate.closeOptionButtons();

    item.desc = item.desc || 'No Description';

    var message = 'Url: ' + item.url + 
        '\nDescription: ' + item.desc + 
        '\nPosition: ' + item.rank;

    var btnText = 'Done';

    alert(message, null, item.title, btnText);
  };

  $scope.moveItem = function(item, fromIndex, toIndex, HARDCODE) {
    var i = fromIndex;
    var j = toIndex;

    /* for Demo purposes, upon deletion, reorder will not work correctly
    * Data will be restructured so that each divider is dynamic and
    * can be reordered/deleted by itself
    */
    if(HARDCODE) {
      i += 9;
      j += 9;
    }

    var x = $scope.bookmarks[i].rank;
    var y = $scope.bookmarks[j].rank;
    $scope.bookmarks[i].rank = y;
    $scope.bookmarks[j].rank = x;

    var z = $scope.bookmarks[j];
    $scope.bookmarks[j] = $scope.bookmarks[i];
    $scope.bookmarks[i] = z;

    //var message = "From: " + i + " to: " + j; 
    //alert(message);

    $scope.bookmarks = orderByFilter(items, "+rank", true);
  };

  $scope.onItemDelete = function(item) {
    var index = $scope.bookmarks.indexOf(item);
    $scope.bookmarks.splice($scope.bookmarks.indexOf(item), 1);

    for(var x = index; x < Object.keys($scope.bookmarks).length; x++)
        $scope.bookmarks[x].rank--;

    $ionicListDelegate.closeOptionButtons();
  };

  $scope.toggleReorder = function() {
    $scope.showReorder = !$scope.showReorder;
  };
  
  $scope.search = function() {
    closeOptions();
    $scope.modalSearch.show();
  };
  
  $scope.emptyModal = function() {
    $scope.formData = {};
  };

  $scope.closeSearch = function() {
    $scope.modalSearch.hide();
  };

  $scope.addItem = function() {
    closeOptions();
    $scope.modalAddPage.show();
  };

  $scope.closeAddPage = function() {
    $scope.modalAddPage.hide();
  };

  $scope.onEdit = function(bookmark, index) {
    closeOptions();
    $scope.formData.title = bookmark.title;
    $scope.formData.url = bookmark.url;
    $scope.formData.desc = bookmark.desc;
    $scope.formData.tag = bookmark.tag;
    $scope.formData.index = index;
    $scope.modalEditPage.show();
  }

  $scope.closeEditPage = function() {
    $scope.formData.title = {};
    $scope.modalEditPage.hide();
  }

  $scope.doEdit = function() {
    var index = $scope.formData.index - 1;

    $scope.bookmarks[index].title = $scope.formData.title;
    $scope.bookmarks[index].url = $scope.formData.url;
    $scope.bookmarks[index].desc = $scope.formData.desc;
    $scope.bookmarks[index].tag = $scope.formData.tag;
    $scope.closeEditPage();
  }

  $scope.doAdd = function() {
    console.log('Adding Item', $scope.formData);
    $scope.bookmarks.push($scope.formData);

    $timeout(function() {
      $scope.closeAddPage();
    }, 500);
  };

  $scope.$on('modal.hidden', function() {
    $scope.emptyModal();
  });

  $ionicModal.fromTemplateUrl('templates/search.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalSearch = modal;
  });

  $ionicModal.fromTemplateUrl('templates/addPage.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalAddPage = modal;
  });

  $ionicModal.fromTemplateUrl('templates/editPage.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalEditPage = modal;
  });

})

.controller('BookmarkCtrl', function($scope, $stateParams) {
  $scope.data = JSON.parse($stateParams.item);
})

.controller('BrowseCtrl', function($scope) {
  window.open(encodeURI("http://www.pint.com"), '_blank', 'hidden=yes');
});
