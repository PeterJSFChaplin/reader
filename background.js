chrome.runtime.onInstalled.addListener(function(update) {
    if ( update.reason !== "chrome_update" ) {
        chrome.bookmarks.getTree(function(array) {
            var rootNode = array[0];
            var otherBookmarks = rootNode.children[1];
            if ( ! otherBookmarks.children.some(function(node) {return node.title === "RSS"}) ) {
                chrome.bookmarks.create({
                    index: 0,
                    title: "RSS"
                });
            }
        });
    }
});