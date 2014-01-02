var rssFolderExists = false;
chrome.bookmarks.search({"title":"RSS"}, function(bookmarkTreeNodes) {
	if ( bookmarkTreeNodes.length > 0 ) {
		rssFolderExists = true;
	}
});
if ( ! rssFolderExists ) {
	chrome.bookmarks.create({
		"title": "RSS",
		"index": 0
	});
};
