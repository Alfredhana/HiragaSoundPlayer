// initialize DPlayer
// https://github.com/MoePlayer/DPlayer
var dp = new DPlayer({
				container: document.getElementById('dplayer'),
				screenshot: true
			});
var playButton = document.getElementById('play');
var urlBox = document.getElementById('url-box');

// Set Video with url input
playButton.addEventListener("click", function(){
		var matchedHTTP = urlBox.value.match(/http:\/\/.+/);
		var matchedHTTPS = urlBox.value.match(/https:\/\/.+/);
		if (matchedHTTP != null){
			dp.switchVideo(
			{
				url: matchedHTTP,
				pic: 'image.jpg',
				thumbnails: 'image.jpg',
			});
		}
		else if (matchedHTTPS != null){
			dp.switchVideo(
			{
				url: matchedHTTPS,
				pic: 'image.jpg',
				thumbnails: 'image.jpg',
			});
		}
})