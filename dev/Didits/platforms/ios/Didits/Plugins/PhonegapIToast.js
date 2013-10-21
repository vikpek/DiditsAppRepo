function IToast() {
	this.durationArr = ['long', 'short', 'normal'];
	this.gravityArr  = ['bottom', 'top', 'center'];
}

IToast.prototype.show = function (message, options) {
	var data;

	if (!message || typeof message !== 'string') {
		return;
	}

	data = this.parseOptions(options);
	data.message = message;

	cordova.exec(null, null, 'PhonegapIToast', 'addToastNotification', [data]);
};

IToast.prototype.parseOptions = function (options) {
	var data = {};

	if (!options) {
		return data;
	}

	if (typeof options.duration === 'number') {
		data.durationTime = options.duration;
	} else if (this.durationArr.indexOf(options.duration) !== -1) {
		data.duration = options.duration;
	}

	if (this.gravityArr.indexOf(options.gravity) !== -1) {
		data.gravity = options.gravity;
	}

	if (typeof options.left === 'number') {
		data.left = options.left;
	}

	if (typeof options.top === 'number') {
		data.top = options.top;
	}

	return data;
};

if (typeof cordova !== 'undefined') {
    cordova.addConstructor(function () {
		if (!window.plugins) {
			window.plugins = {};
		}

		window.plugins.iToast = new IToast();
	});
}