var levelToText = function(level) {
	var value = "";

	for(i = 1; i < level; i++) 
		value += "|";

	if(value)
		value += " ";

	return value;
};

var processNode = function(node, level) {
	var spacing = levelToText(level);

	// print folder name
	if(!node.url && node.title) {
	    	htmlBody += "<h2>"+spacing+node.title+"</h2>";
    }

    if(node.children) {
	    var folders = [];

		node.children.forEach(function(child) {
        	if(child.url) { // print leaf nodes' URLs (folder content)
				htmlBody += "<p><a target='_blank' href="+child.url+">"
							+spacing+child.title+"</a></p>";
			} else { // otherwise it is a folder. add folder to queue
				folders.push(child);
			}
        });

	    // process the rest of the nodes (folders) in the queue
	    folders.forEach(function(child) {
	    	processNode(child, level+1);
	    });
    }
};

document.addEventListener('DOMContentLoaded', onInit, false);
var htmlBody;

function onInit() {
	chrome.bookmarks.getTree(function(itemTree){
		htmlBody = "";

		if(itemTree) {
	    	htmlBody += "<h1>Bookmarks Found, '|' indicates folder nesting</h1>";		
		} else {
	    	htmlBody += "<h1>No Bookmarks Found</h1>";		
		}
	    
	    itemTree.forEach(function(item){
			processNode(item, 0);
	    });

	    document.getElementsByTagName('body')[0].innerHTML += htmlBody;
	});
}