function toRad(degrees) {
    "use strict";
    return degrees * Math.PI / 180;
}

function getDistance(latitude, longitude, currentLat, currentLong, callback) {
    "use strict";
    var R = 6371; // earth surface
    var dLat = toRad((latitude - currentLat));

    var dLon = toRad((longitude - currentLong));
    var lat1 = toRad(currentLat);
    var lat2 = toRad(latitude);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;

    callback(d);
}

var distanceCalculator = {
    calculateDistance: function calculateDistance(range, data, currentLat, currentLon) {
        "use strict";
        var diditsWithinRange = [];

        $.each(data, function (key, val) {
            getDistance(val.latitude, val.longitude, currentLat, currentLon, function (distance) {
                if (distance <= range) {
                    val.distance = distance;
                    diditsWithinRange.push(val);
                }
            });
        });
        return diditsWithinRange;

    }, validateUserDidit: function validateUserDidit(user_didit, successCallback, errorCallback) {
        "use strict";

        diditsDB.findDiditById(user_didit.diditId, function (didit) {
            getDistance(didit.latitude, didit.longitude, user_didit.latitude, user_didit.longitude, function (distance) {
                if (distance <= 20) {
                    console.log("OK:" + Math.ceil(distance) + " km from the scanned Didit!");
                    successCallback();
                } else {
                    console.log("Fail:" + Math.ceil(distance) + " km from the scanned Didit!");
                    errorCallback();
                }
            });
        });

    }
};