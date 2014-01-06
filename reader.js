$(function() {
    chrome.bookmarks.getTree(function(array) {
	var source;
	array[0].children[1].children.some(function(node) {
	    if ( node.title === "RSS" ) {
		source = node;
		return true;
	    }
	});
	if ( source === undefined ) {
	    return false;
	}
	var list = $('<ul>');
	source.children.forEach(function(node) {
	    list.append($('<li>').text(node.title + ' - ' + node.url));
	});
	$('body').append(list);
    });
});