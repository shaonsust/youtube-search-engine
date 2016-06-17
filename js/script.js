
$(function(){
	$('#query').on('focus', function(){
		$(this).animate({
			width : '100%'
		}, 400);
	});
	
	$('#query').on('blur', function(){
		if($('#query').val()=='')
		{
			$(this).animate({
				width : '45%'
			}, 400);
		}
	});
	
	$("#search-form").submit(function(e){
		e.preventDefault();
	});
});

function search()
{
	// clear results
	$("#result").html("");
	$("#buttons").html("");
	
	// get form input
	var q = $("#query").val();
	
	// Run GET Request on API
	$.get(
			"https://www.googleapis.com/youtube/v3/search", {
				part : 'snippet, id',
				q : q,
				type : 'video',
				key : 'AIzaSyAm1w6Q8I8bZ14-jmdkUT8cUy2DSUx1THA'},
				function(data){
					var nextPageToken = data.nextPageToken;
					var prevPageToken = data.prevPageToken;
					console.log(data);
//					$("#result").html(data.items);
					
					$.each(data.items, function(i, item){
						
						//Get Result
						var output = getOutput(item);
						
						//Display results
						$("#result").append(output);
					});
					
					var buttons = getbutton(prevPageToken, nextPageToken, q);
					//Display Buttons
					$("#buttons").append(buttons);
				}
	);
}

function getOutput(item)
{
	// Build output
	var vid = item.id.videoId;
	var title = item.snippet.title;
	var description = item.snippet.description;
	var thumb = item.snippet.thumbnails.high.url;
	var channeltitle = item.snippet.channelTitle;
	var vdate = item.snippet.publishedAt;
	
	//Build Output String
	var output = '<li>' +
	'<div class = "list-left">' +
	'<img src = "'+ thumb +'">' +
	'</div>' +
	'<div class = "list-right">' +
	'<h3><a class = "fancybox fancybox.iframe" href = "http://www.youtube.com/embed/'+vid+'">'+title+'</a></h3>' +
	'<small>By <span class = "ctitle">'+ channeltitle + 'on </span>'+ vdate +'</small>' +
	'<p>'+description+'</p>' +
	'</div>' +
	'</li>' +
	'<div class = "clearfix"></div>' +
	'';
	
	return output;
}


//Build Button
function getbutton(prevPageToken, nextPageToken, q)
{
	if(!prevPageToken)
	{
		var btnoutput = '<div class = "button-container">' + 
			'<button id = "next-button" class = "paging-button" data-token = "'+nextPageToken+'" data-query = "'+q+'"' +
			'onclick = "nextpage();">Next Page</button>' +
			'</div>';
	}
	else
	{
		var btnoutput = '<div class = "button-container">' + 
		'<button id = "prev-button" class = "paging-button" data-token = "'+prevPageToken+'" data-query = "'+q+'"' +
		'onclick = "prevpage();">Prev Page</button>' +
		'<button id = "next-button" class = "paging-button" data-token = "'+nextPageToken+'" data-query = "'+q+'"' +
		'onclick = "nextpage();">Next Page</button>' +
		'</div>';
	}
	
	return btnoutput;
}

// Next Page Function
function nextpage()
{
	var token = $("#next-button").data('token');
	var q = $("#next-button").data('query');
	
	// clear results
	$("#result").html("");
	$("#buttons").html("");
	
	// get form input
	var q = $("#query").val();
	
	// Run GET Request on API
	$.get(
			"https://www.googleapis.com/youtube/v3/search", {
				part : 'snippet, id',
				q : q,
				pageToken : token,
				type : 'video',
				key : 'AIzaSyAm1w6Q8I8bZ14-jmdkUT8cUy2DSUx1THA'},
				function(data){
					var nextPageToken = data.nextPageToken;
					var prevPageToken = data.prevPageToken;
					console.log(data);
//					$("#result").html(data.items);
					
					$.each(data.items, function(i, item){
						
						//Get Result
						var output = getOutput(item);
						
						//Display results
						$("#result").append(output);
					});
					
					var buttons = getbutton(prevPageToken, nextPageToken, q);
					//Display Buttons
					$("#buttons").append(buttons);
				}
	);
}


//Prev Page Function
function prevpage()
{
	var token = $("#prev-button").data('token');
	var q = $("#prev-button").data('query');
	
	// clear results
	$("#result").html("");
	$("#buttons").html("");
	
	// get form input
	var q = $("#query").val();
	
	// Run GET Request on API
	$.get(
			"https://www.googleapis.com/youtube/v3/search", {
				part : 'snippet, id',
				q : q,
				pageToken : token,
				type : 'video',
				key : 'AIzaSyAm1w6Q8I8bZ14-jmdkUT8cUy2DSUx1THA'},
				function(data){
					var nextPageToken = data.nextPageToken;
					var prevPageToken = data.prevPageToken;
					console.log(data);
//					$("#result").html(data.items);
					
					$.each(data.items, function(i, item){
						
						//Get Result
						var output = getOutput(item);
						
						//Display results
						$("#result").append(output);
					});
					
					var buttons = getbutton(prevPageToken, nextPageToken, q);
					//Display Buttons
					$("#buttons").append(buttons);
				}
	);
}




