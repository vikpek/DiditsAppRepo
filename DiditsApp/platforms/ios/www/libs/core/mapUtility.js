/**
 * Created with JetBrains AppCode.
 * User: vikpek
 * Date: 22.07.13
 * Time: 08:39
 * To change this template use File | Settings | File Templates.
 */


function initMap(callback) {
    navigator.geolocation.getCurrentPosition(
        function (pos) {
            mapKit.options.lat = pos.coords.latitude;
            mapKit.options.lon = pos.coords.longitude;
            callback();
        },
        function (err) {
            alert(err);
        });
}

function pinAdding(pins) {
    mapKit.addMapPins(pins, function () {
            console.log('adMapPins success');
        },
        function () {
            console.log('error');
        });
}

var error = function () {
    console.log('error');
};

var mapUtility = {

    displayMapForAllDidits: function displayMapForAllDidits() {
        var success = function () {
            pinGenerator.generatePinsForAllDidits(function (data) {
                pinAdding(data);
            });
        };
        mapKit.showMap(success, error);
    },
    displayMapForOwnDidits: function displayMapForOwnDidits() {
        var success = function () {
            pinGenerator.generatePinsForOwnDidits(function (data) {
                pinAdding(data);
            });
        };
        initMap(function () {
            mapKit.showMap(success, error);

        });
    },
    displayMapForNearby: function displayMapForNearby() {
        var success = function () {
            pinGenerator.generatePinsForNearby(function (data) {
                mapKit.clearMapPins();
                pinAdding(data);
            });
        };
        initMap(function () {
            mapKit.showMap(success, error);

        });
    }
};