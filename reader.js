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
	var items = [];
	var requests = [];
	var fromDate = new Date('2014-01-01');
	source.children.forEach(function(bookmark) {
	    var xhr = new XMLHttpRequest();
	    requests.push(xhr);
	    xhr.onreadystatechange = function() {
		if ( xhr.readyState == 4 ) {
		    $(xhr.responseText).find('item').each(function() {
			var date = new Date($(this).find('pubdate').text());
			if ( date > fromDate ) {
			    var jso = {
				title: $(this).children('title').text(),
				description: $(this).children('description').text(),
				link: $(this).children('link').text(),
				pubDate: new Date($(this).children('pubDate').text())
			    };
			    items.push(jso);
			}
		    });
		    requests.pop();
		    if ( requests.length == 0 ) {
			requestsComplete();
		    }
		}
	    };
	    xhr.open("GET", bookmark.url, true);
	    xhr.send();
	});
	function requestsComplete() {
	    items.sort(function(a, b) {
		if ( a.pubDate == b.pubDate) {
		    return 0;
		} else if ( a.pubDate < b.pubDate ) {
		    return -1;
		} else {
		    return 1;
		}
	    });
	    items.forEach(function(item) {
		$('body').append(rssItem(item));
	    });
	}
    });
});

function rssItem(jso) {
    return $('<div>')
	.append(
	    $('<h2>').append(
		$('<a>')
		    .attr('href', jso.link)
		    .html(jso.title)
	    )
	)
	.append($('<div>').html(jso.description));
}