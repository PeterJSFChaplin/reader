var bookmarks = [];
chrome.bookmarks.search({"title":"RSS"}, function(rssNodes) {
	rssNodes.forEach(function(folder) {
		bookmarks = bookmarks.concat(folder.children);
	});
});
bookmarks.forEach(function(node) {
	document.write(node.title);
});
