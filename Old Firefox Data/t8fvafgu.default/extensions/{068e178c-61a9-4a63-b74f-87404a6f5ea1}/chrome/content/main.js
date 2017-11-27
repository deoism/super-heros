var VideoAdBlockYT = new function() {
	var self = this;

	this.observerService = null;
	this.observer = null;
	this.blockedDomains = [];
	this.regExpUrls = [
		"\\.googleadservices\\.",
		"\\.googletagservices\\.",
		"\\.googlesyndication\\.",	
		"\\&adfmt\\=",
		"watch7ad\\_",
		"\\.innovid\\.",
		"\\/adsales\\/",
		"\\/stats\\/ads",
		"ad\\d-\\w*\\.swf$",
		"\\.doubleclick\\.",
		"\\/adServer\\/",
		"\\/adserver\\/",
		"\\.fwmrm\\.net",		
		"\\/www\\-advertise\\.",
		"google\\-analytics\\.",
		"[\\=\\&\\_\\-\\.\\/\\?\\s\\%22]ad[\\=\\&\\_\\-\\.\\/\\?\\s\\%22]",
		"[\\=\\&\\_\\-\\.\\/\\?\\s\\%22]ads[\\=\\&\\_\\-\\.\\/\\?\\s\\%22]",
		"[\\=\\&\\_\\-\\.\\/\\?\\s\\%22]adid[\\=\\&\\_\\-\\.\\/\\?\\s\\%22]",
		"[\\=\\&\\_\\-\\.\\/\\?\\s\\%22]pagead[\\=\\&\\_\\-\\.\\/\\?\\s\\%22]",
		"[\\=\\&\\_\\-\\.\\/\\?\\s\\%22]pagead2[\\=\\&\\_\\-\\.\\/\\?\\s\\%22]",
		"[\\=\\&\\_\\-\\.\\/\\?\\s\\%22]googleads[\\=\\&\\_\\-\\.\\/\\?\\s\\%22]",	
		"[\\=\\&\\_\\-\\.\\/\\?\\s\\%22]adunit[\\=\\&\\_\\-\\.\\/\\?\\s\\%22]",
		"[\\=\\&\\_\\-\\.\\/\\?\\s\\%22]adhost[\\=\\&\\_\\-\\.\\/\\?\\s\\%22]",
		"\\.serving\\-sys\\.com\\/",
		"youtube\\.com\\/ptracking\\?",
		":\\/\\/.*\\.google\\.com\\/uds\\/afs",
		"\\/csi\\?v\\=\\d+\\&s\\=youtube\\&action\\=",
		"\\.atdmt\\."
	];

	this.init = function() {
		window.addEventListener("load", function() { self.onLoad(); }, false);
		window.addEventListener("unload", function() { self.onUnload(); }, false);
	};

	this.onLoad = function() {
		this.regExp = new RegExp(this.regExpUrls.join('|'), 'i');
		this.observerService = Components.classes["@mozilla.org/observer-service;1"].
			getService(Components.interfaces.nsIObserverService);
		this.setObserver();
		this.addObserver();
	};

	this.onUnload = function() {
		this.removeObserver();
	};

	this.addObserver = function() {
		try {
			this.observerService.addObserver(this.observer, "http-on-modify-request", false);
		} catch(ex) { }
	};

	this.removeObserver = function() {
		try {
			this.observerService.removeObserver(this.observer, "http-on-modify-request", false);
		} catch(ex) { }
	};

	this.isMatchingUrl = function(url) {
		return this.regExp.test(url);
	};

	this.isYoutube = function(url) {
		return url.match(/https*:\/\/(w{3}\.)*youtube.com/);
	};

	this.setObserver = function() {
		this.observer = {
			observe: function(aSubject, aTopic, aData) {
				try {
		            if (aTopic == "http-on-modify-request") {
						let url;
						aSubject.QueryInterface(Components.interfaces.nsIHttpChannel);
						url = aSubject.URI.spec;

						var originatingUrl = this.getOriginatingUrl(aSubject);

						if (!originatingUrl) { return; }
						if (self.isYoutube(originatingUrl) && self.isMatchingUrl(url)) {
							aSubject.cancel(Components.results.NS_BINDING_ABORTED);
							return;
						}
					}
				} catch(ex) { }
			},
	        QueryInterface: function(aIID) {
	            if (aIID.equals(Components.interfaces.nsISupports) || aIID.equals(Components.interfaces.nsIObserver)) {
	            	return this;
	            }
	            throw Components.results.NS_NOINTERFACE;
	        },
			getOriginatingUrl: function(aChannel) {
		        try {
		            var notificationCallbacks = 
		                aChannel.notificationCallbacks ? aChannel.notificationCallbacks : aChannel.loadGroup.notificationCallbacks;
		            if (!notificationCallbacks) { return null; }
		            var callback = notificationCallbacks.getInterface(Components.interfaces.nsIDOMWindow);
		            return callback.top.document ? 
		                gBrowser.getBrowserForDocument(callback.top.document) : null;
		        }
		        catch(ex) {	// FF 26 and above
		        	try {
		                try {
		        			var loadContext = aChannel.notificationCallbacks.getInterface(Ci.nsILoadContext);
		        		} catch(ex) { loadContext = aChannel.loadGroup.notificationCallbacks.getInterface(Ci.nsILoadContext); }

			            if (loadContext) {
			            	// FF +38
			            	if (loadContext.topFrameElement) {
			            		var topFrameElement = loadContext.topFrameElement;
			            		if (topFrameElement.currentURI && topFrameElement.currentURI.spec) {
			            			return topFrameElement.currentURI.spec;
			            		}
			            		return null;
			            	}
			            	// FF 37.* and below
			                var contentWindow = loadContext.associatedWindow; // this is the HTML window of the page that just loaded
			                var aDOMWindow = contentWindow.top
			                	.QueryInterface(Ci.nsIInterfaceRequestor)
			                	.getInterface(Ci.nsIWebNavigation)
			                	.QueryInterface(Ci.nsIDocShellTreeItem).rootTreeItem
			                	.QueryInterface(Ci.nsIInterfaceRequestor)
			                	.getInterface(Ci.nsIDOMWindow);
			                var gBrowser = aDOMWindow.gBrowser; // this is the gBrowser object of the firefox window this tab is in
			                var aTab = gBrowser._getTabForContentWindow(contentWindow.top); //this is the clickable tab xul element, the one found in the tab strip of the firefox window, aTab.linkedBrowser is same as browser var above //can stylize tab like aTab.style.backgroundColor = 'blue'; //can stylize the tab like aTab.style.fontColor = 'red';
			                if (!aTab) { return null; }
			                var browser = aTab.linkedBrowser; // this is the browser within the tab //this is what the example in the previous section gives
							
							if (!browser) { return null; }
							var originatingUrl = null;
							if (browser._contentWindow &&
								browser._contentWindow.document &&
								browser._contentWindow.document.URL) {	
								originatingUrl = browser._contentWindow.document.URL;
							}			                
			                return originatingUrl;
			            }
			            return null;
			        } catch(ex) { return null; }
		        }				
			}
		};
	};

	this.init();
};