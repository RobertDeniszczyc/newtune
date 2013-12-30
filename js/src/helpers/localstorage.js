/*  Localstorage Helper
	
*/



var localstorage = (function() {
	var self = {
		supported: -1,
		isSupported: function() {								// Checks if localstorage is supported by the browser
			if (self.supported === -1) {
				var mod = 'mod';
			    try {
			      localStorage.setItem(mod, mod);
			      localStorage.removeItem(mod);
			      self.supported = true;			 
			    } catch(e) {
			      self.supported = false;
			    }
			} 
			return self.supported;
		},
		get: function(item) {									 // Get item from localstorage
			if (self.isSupported()) {
				return localStorage.getItem(item);
			}
			else {
				return false;
			}
		},
		set: function(name, item) {								 // Sets item in localstorage
			if (self.isSupported()) {
				localStorage.setItem(name, item);
				return true;
			}
			else {
				return false;
			}
		}
	}
	return self;
}());

