var EXPORTED_SYMBOLS = ["PrefMan"];

var PrefMan = new function() {
	var prefBranch = null;	
	var prefTypes = null;
	var win = null;	

	// consts
	var PRECEDING_PREF_BRANCH_STRING = "";

	var log = function(text) {
		if (win) { win.console.log(text); }
	};

	this.init = function() {
		this.setWindow();
		this.setPrefBranchByString();
		this.setPrefTypes();
	};

	this.setWindow = function() {
		var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"]
			.getService(Components.interfaces.nsIWindowMediator);
		win = wm.getMostRecentWindow(null);
	};

	this.setPrefBranchByString = function(_prefBranchString) {
		prefBranch = this.getPrefBranchByString(_prefBranchString);
	};

	this.getPrefBranchByString = function(_prefBranchString) {
		_prefBranchString = _prefBranchString ? _prefBranchString : "vidadblocker2@vidadblocker294.com.";
		return Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch(_prefBranchString);
	};

	this.setPrefTypes = function() {
		prefTypes = {
			STRING 	: prefBranch.PREF_STRING,
			INT 	: prefBranch.PREF_INT,
			BOOL 	: prefBranch.PREF_BOOL,
			INVALID : prefBranch.PREF_INVALID
		};
	};

	this.getPrefTypes = function() {
		return prefTypes;
	};

	this.isPrefExists = function(prefName) {
		return prefBranch.getPrefType(prefName) !== prefBranch.PREF_INVALID;
	};

	this.setObjectPref = function(objectName, name, value) {	// no "type" param - type is always a string
		var pref = this.getObjectPref(objectName);
		if (!pref) { pref = {}; }

		pref[name] = value;	
		pref = JSON.stringify(pref);
		this.setPref(objectName, pref);
	};

	this.getObjectPref = function(objectName) {
		var pref = this.getPref(objectName);
		if (!pref) { return false; }

		try {
			pref = JSON.parse(pref);
			return pref;
		} catch(ex) { return false; }
	};

	this.getObjectPrefNameValue = function(objectName, name) {
		var pref = this.getObjectPref(objectName);
		if (!pref || !pref.hasOwnProperty(name)) { return false; }

		return pref[name];
	};

	this.setPref = function(name, value, type, _prefBranchString) {
		var _prefBranch = null;
		if (_prefBranchString) { _prefBranch = this.getPrefBranchByString(_prefBranchString); }
		_prefBranch = _prefBranch || prefBranch;	
		type = type || _prefBranch.getPrefType(name);	
		if (type === _prefBranch.PREF_INVALID) { type = _prefBranch.PREF_STRING; }

        switch(type) {
            case _prefBranch.PREF_STRING :
                _prefBranch.setCharPref(name, value);
                return true;
            break;
            case _prefBranch.PREF_INT :
                _prefBranch.setIntPref(name, value);
                return true;
            break;
            case _prefBranch.PREF_BOOL :
                _prefBranch.setBoolPref(name, value);
                return true;
            break;
            case _prefBranch.PREF_INVALID :
                return false;
            break;
        }			
	};

	this.clearPref = function(name, _prefBranchString) {
		var _prefBranch = null;
		if (_prefBranchString) { _prefBranch = this.getPrefBranchByString(_prefBranchString); }
		_prefBranch = _prefBranch || prefBranch;

		_prefBranch.clearUserPref(name);
	};

	this.setPrefByBranchString = function(_prefBranchString, name, value, type) {
		this.setPref(name, value, type, _prefBranchString);
	};

	this.getPref = function(name, _prefBranchString) {
		var _prefBranch = null
		if (_prefBranchString) { _prefBranch = this.getPrefBranchByString(_prefBranchString); }
		_prefBranch = _prefBranch || prefBranch;
		var type = _prefBranch.getPrefType(name);
        switch(type) {
            case _prefBranch.PREF_STRING :
                return _prefBranch.getCharPref(name);
            break;
            case _prefBranch.PREF_INT :
                return _prefBranch.getIntPref(name);
            break;
            case _prefBranch.PREF_BOOL :
                return _prefBranch.getBoolPref(name);
            break;
            case _prefBranch.PREF_INVALID :            	
                return false;
            break;
        }
	};

	this.getPrefType = function(prefName) {
		return prefBranch.getPrefType(prefName);
	};

	this.getPrefTypeByBranchString = function(_prefBranchString, prefName) {
		var _prefBranch = this.getPrefBranchByString(_prefBranchString);
		if (!prefBranch) { return false; }

		return _prefBranch.getPrefType(prefName);
	};

	this.getPrefByBranchString = function(_prefBranchString, name) {
		return this.getPref(name, _prefBranchString);
	};

	this.init();
};