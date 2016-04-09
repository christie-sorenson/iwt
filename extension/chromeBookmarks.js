chrome.bookmarks.getTree(function(itemTree){
    itemTree.forEach(function(item){
        processNode(item);
    });
});

processNode = function(node) {
    // recursively process child nodes
    if(node.children) {
        node.children.forEach(function(child) { processNode(child); });
    }

    // print leaf nodes URLs to console
    if(node.url) {
		document.getElementsByTagName('body')[0].innerHTML += ("<a target='_blank' href=" + node.url + ">"+ node.url+"<\p>"); 
    }
}