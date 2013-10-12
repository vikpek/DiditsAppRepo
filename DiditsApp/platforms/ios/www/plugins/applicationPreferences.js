cordova.define("applicationPreferences", function(require, exports, module) {
               var exec = require('cordova/exec');
               
               var ApplicationPreferences = function() {};
               
               
               ApplicationPreferences.prototype.get = function(key, successFn, errorFn) {
               exec(successFn, errorFn, 'applicationPreferences', 'getSetting', [key]);
               }
               
               ApplicationPreferences.prototype.set = function(key,value, successFn, errorFn) {
               exec(successFn, errorFn, 'applicationPreferences', 'setSetting', [key,value]);
               }
               
               var applicationPreferences = new ApplicationPreferences();
               module.exports = applicationPreferences;
               });