/**
 * Created with JetBrains AppCode.
 * User: vikpek
 * Date: 21.07.13
 * Time: 16:24
 * To change this template use File | Settings | File Templates.
 */

function constructPins(didits, callback) {
    var diditPins = [];
    for (var i = 0; i < didits.length; i++) {
        diditPins.push(
            {
                index: didits[i].id,
                diditId: didits[i].id,
                lat: didits[i].latitude,
                lon: didits[i].longitude,
                title: didits[i].city,
                snippet: didits[i].id,
                icon: mapKit.iconColors.HUE_AZURE
            }
        );
    }
    callback(diditPins);
}

var pinGenerator = {
    generatePinsForAllDidits: function generatePinsForAllDidits(pinCallback) {
        diditsDB.findAllDidits(function (didits) {
            constructPins(didits, function (diditPins) {
                pinCallback(diditPins);
            });
        });
    }, generatePinsForOwnDidits: function generatePinsForOwnDidits(pinCallback) {
        diditsDB.findOwnDidits(function (didits) {
            constructPins(didits, function (diditPins) {
                pinCallback(diditPins);
            });
        });
    }, generatePinsForNearby: function generatePinsForNearby(pinCallback) {

        navigator.geolocation.getCurrentPosition(onSuccess, onError);

        function onSuccess(position) {
            diditsDB.findAllDidits(function (didits) {
                constructPins(distanceCalculator.calculateDistance(100, didits, position.coords.latitude, position.coords.longitude), function (diditPins) {
                    pinCallback(diditPins);
                });
            });
        }

        function onError(error) {
            alert(error.message);
        }

    }
};