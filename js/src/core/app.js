var app = (function() {
	var self = {
		ui: {																					// Sets varibales for elements on page
			result_album_cover: $("#result_album_cover"),
			result_album_name: $("#result_album_name"),
			result_album_artist: $("#result_album_artist"),

			result_itunes_link: $("#result_itunes_link"),

			random_album: $("#random_album")
		},
		init: function() {
			this.bindEvents();
			this.getRandomAlbum();
		},
		bindEvents: function() {																// Bind actions to functions
			self.ui.random_album.bind("click", self.events.random_album);
		},
		events: {
			random_album: function(e) {															// Runs onclick of '#random_album'
				e.preventDefault();
				self.getRandomAlbum();
			}
		},
		getRandomAlbum: function() {															// Retrieves random album from iTunes method
			iTunes.get.getRandomAlbum().then(function(data) {
				var album_cover = data["im:image"][data["im:image"].length-1].label;
				var album_name = data["im:name"].label;
				var album_artist = data["im:artist"].label;
				var album_itunes_link = data["link"].attributes.href;
			
				self.ui.result_album_cover.attr("src", album_cover);							// Puts data onto page
				self.ui.result_album_name.html(album_name);
				self.ui.result_album_artist.html(album_artist);
				self.ui.result_itunes_link.attr("href", album_itunes_link);
			});

			// ERROR HANDLING SHOULD GO HERE
		}
	}
	return self;
}());
$(document).ready(function() {
	app.init();
	app.getRandomAlbum();
})
