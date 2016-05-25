/**
This is the script run when the browser starts up and is not associated
with any tab. Here we create a add-on icon in the add-on bar to display
the options.
*/

'use strict';

/**
* Returns the product version number
*
* @return Product version number
*/
var getProductVersion = function() {
    return "8.0.0.9098";
};

/**
* Stores configuration information
*/
var Configuration = {
    configReady: "0",
    fingerPrint : "0",
    metricsUrl: "https://pipe.skype.com/Client/2.0/",
    pushToMobileUrl: "https://c2c-p2m-secure.skype.com/p2m/v1/push",
    lookupHost: "pnrws.skype.com",
    uiId : 0
};

/**
* Queries configuration information from PNR service
*/
var queryConfig = function () {
    if (Configuration.configReady === "1") {
        // We already have configuration information
        return;
    }

    var ajaxReq = new XMLHttpRequest();
    ajaxReq.onreadystatechange = function () {
        if (ajaxReq.readyState == 4 && ajaxReq.status == 200) {
            var jsonData = JSON.parse(ajaxReq.responseText);

            if (jsonData.fp) {
                Configuration.fingerPrint = jsonData.fp;
            }
            if (jsonData.metrics_url) {
                Configuration.metricsUrl = jsonData.metrics_url;
            }
            if (jsonData.lookup_host) {
                Configuration.lookupHost = jsonData.lookup_host;
            }
            if (jsonData.pushtomobile_url) {
                Configuration.pushToMobileUrl = jsonData.pushtomobile_url;
            }
            if (jsonData.ui_id) {
                Configuration.uiId = parseInt(jsonData.ui_id);
            }
            Configuration.configReady = "1";

            // Ensure UI id is something we understand
            if (Configuration.uiId != 0 && Configuration.uiId != 1) {
                Configuration.uiId = 0;
            }
        };
    };

    ajaxReq.open("GET", "https://localhost:26143/skypectoc/v1/pnr/config", false);

    // Send the request
    ajaxReq.send();
};

/**
* Sends metrics data
*/
var postMetrics = function(event, userKVPs) {

    if ( event === "extension_state" ) {
        SkypeC2CTelemetry.post( Configuration.metricsUrl,
                        event,
                        false ,
                        {
                            Fingerprint: Configuration.fingerPrint,
                            UiId: Configuration.uiId.toString(),
                            ReferrerUrl: userKVPs.url,
                            Enabled: userKVPs.switchState ? "T" : "F"
                        }
        );
    }  else if ( event === "help_page_click" ) {
        SkypeC2CTelemetry.post( Configuration.metricsUrl,
                        event,
                        false ,
                        {
                            Fingerprint: Configuration.fingerPrint,
                            UiId: Configuration.uiId.toString(),
                            ReferrerUrl: userKVPs.url
                        }
        );
    } 
};

var openFaqTab = function() {
    chrome.tabs.create({
        url: "https://go.skype.com/skype.extension.faq"
    });
};


var firstLaunchExperience = function() {
    chrome.runtime.onInstalled.addListener(function (details) {
        //add listener for install
        if(details.reason === "install") {
            openFaqTab();
        } else {
            //add listener for update with higher version
            if(details.reason === "update") {
                var newVersion = chrome.runtime.getManifest().version;
                var newMajorVersion = parseInt(newVersion.split('.')[0], 10);
                var previousMajorVersion = parseInt(details.previousVersion.split('.')[0], 10);
                if(newMajorVersion && previousMajorVersion && (newMajorVersion > previousMajorVersion)) {
                    openFaqTab();
                }
            }
        }
        localStorage.setItem("skype_version", getProductVersion());
    });
};

var openPopupWindow = function(url, windowName, width, height, style) {
    var left = ((screen.width / 2) - (width / 2));
    var top = ((screen.height / 2) - (height / 2));
    var params = style + ', width=' + width + 'px, height=' + height + 'px, top=' + top + ', left=' + left + ',';
    var newWindow = window.open(url, windowName, params);
    newWindow.focus();
	
	return newWindow;
};

/**
* Main function where all the action starts
*/
var main = function() {

    firstLaunchExperience();

    // Register listener to receive messages
    chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {

        if ( request.op == "GET_SETTINGS_REQUEST" ) {
            var message = {};
            message.switchState = JSON.parse(window.localStorage.getItem('switchState'));
            if ( message.switchState == null ) {
                message.switchState = true;
            }

            if ( Configuration.configReady === "0" ) {
                message.switchState = false;
            }

            message.fingerPrint = Configuration.fingerPrint;
            message.metricsUrl = Configuration.metricsUrl;
            message.lookupHost = Configuration.lookupHost;
            message.pushToMobileUrl = Configuration.pushToMobileUrl;
            message.uiId = Configuration.uiId;

            sendResponse(message);
        }
        else if ( request.op == "SET_SETTINGS_REQUEST" ) {
            // Save the settings
            window.localStorage.setItem('switchState', request.switchState);
            
            // Inform all tabs about change in settings
            request.fingerPrint = Configuration.fingerPrint;
            request.metricsUrl = Configuration.metricsUrl;
            request.uiId = Configuration.uiId;

            chrome.tabs.query({}, function(tabs) {
                for (var i = 0; i < tabs.length; ++i) {
                    chrome.tabs.sendMessage(tabs[i].id, request);
                }
            });

            // Send metric
            chrome.tabs.query({active: true, lastFocusedWindow: true, windowType: "normal"}, function(tabs) {
                var data = {
                    switchState: request.switchState,
                    url: tabs[0].url.split("?")[0].split("#")[0]
                }
                postMetrics("extension_state", data);
            });
        }
    });

    // Add icon to add-on bar
    chrome.browserAction.setTitle({ title: "Skype" });

    chrome.browserAction.onClicked.addListener(function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                var activeTab = tabs[0];
                openPopupWindow('https://web.skype.com/share?' + 'url=' + encodeURIComponent(activeTab.url) + 
                                '&source=chExtension&flowId=' + guid.createRaw()
                                , 'Share on Skype', 321, 704, 'scrollbars=1, status=0, menubar=0, toolbar=0, resizable=yes')
        });

    }); 

    chrome.browserAction.setIcon({path:'c2c_48x48.png'});
    
    // Query configuration from PNR service
    queryConfig();
};

main();
