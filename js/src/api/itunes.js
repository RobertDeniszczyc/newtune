// iTunes API method

var iTunes = (function() {
	var self = { 
		init: function() {
				this.loadCache();
		},

		localstorageName: "iTunes",
		loadCache: function() {															// Loads cache of Ajax results from localstorage
			var local_cache = localstorage.get(self.localstorageName);																								
			if (local_cache !== false && local_cache !== null) {
				self.get.cache = jQuery.parseJSON(local_cache);
			}
		},
		helpers: {
			addLargeImage: function(item, size) {
				var album_cover = item["im:image"][item["im:image"].length-1].label;
				var album_cover_large = album_cover.replace("170x170", size + "x" + size);
				item["im:image"].push({label: album_cover_large});
				return item;
			}
		},
		get: {
			cache: {},
			options: {
				urls: {
						"top100albums": "https://itunes.apple.com/gb/rss/topalbums/limit=100/explicit=true/json"
				},
				default: {					// Sets defaulty options for request
					limit: 100,
					type: "json",
					explicit: true,
					item: "topalbums"
				} 
			},
			request: function(custom) {					// Makes AJAX request

				var options = _.extend(this.options.default, custom);
				var url = "https://itunes.apple.com/gb/rss/" + options.item + "/limit=" + options.limit + "/explicit=" + options.explicit + "/" + options.type;

				console.dir(self.get.cache);
				if (self.get.cache.hasOwnProperty(url)) {
					var promise = $.Deferred();
					promise.resolve(this.cache[url]);
					return promise;
				}
				else {  

					return $.ajax({
					   type: 'GET',
					    url: url,
					    contentType: "application/json",
					    dataType: 'jsonp',
				        success: function(data) {
				            self.get.cache[url] = data;
				            localstorage.set(self.localstorageName, JSON.stringify(self.get.cache));
				        }
					});
				}
			},
			getRandomAlbum: function() {			// Sets up promose for AJAX result
				var promise = $.Deferred();
				self.get.request({item: "topalbums"}).then(function(data) {
					var albums = data.feed.entry;
					var random = _.shuffle(albums)[0];

					self.helpers.addLargeImage(random, 400);
					
					promise.resolve(random);
				});
				return promise;
			}
		}

	};

	return self;
}());
$(function() {
	iTunes.init();
});	



