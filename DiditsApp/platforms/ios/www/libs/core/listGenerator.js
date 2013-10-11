/**
 * Created with JetBrains AppCode.
 * User: vikpek
 * Date: 14.07.13
 * Time: 14:00
 * To change this template use File | Settings | File Templates.
 */

function generateDiditList(data) {
    $.each(data, function (key, val) {
        $('.didit-list').append(
            '<li id=' + val.id + '>' +
                '<a href="DiditDetail.html">' + badgeGenerator.getBadgeURLForDidit(val) + val.city.toUpperCase() + '                    CITY ' +
                '</a>' +
                '</li>'
        );
    });

    $('li').click(function () {
        localStorage.diditId = this.id;
    });

    $('.didit-list').listview('refresh');


}
function generateDiditListWithDistance(data_) {

    function sortByKey(array, key) {
        return array.sort(function (a, b) {
            var x = a[key];
            var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }

    var data = sortByKey(data_, 'distance');
    $.each(data, function (key, val) {
        $('.didit-list').append(
            '<li id=' + val.id + '>' +
                '<a href="DiditDetail.html">' + badgeGenerator.getBadgeURLForDidit(val) + val.city.toUpperCase() + '                    CITY ' + '</a>' + 'Distance: ~' + Math.round(val.distance) + ' km' +
                '</li>'
        );
    });

    $('li').click(function () {
        localStorage.diditId = this.id;
    });

    $('.didit-list').listview('refresh');


}

var listGenerator = {

    generateDiditListWithLimit: function generateDiditListWithLimit(limit) {
        diditsDB.findAllDiditsWithRange(limit, function (data) {
            generateDiditList(data);
        });
    },
    generateOwnDiditList: function generateOwnDiditList() {
        diditsDB.findOwnDidits(function (data) {
            generateDiditList(data);
        });
    },
    generateDiditListWithRangeAndLimit: function generateDiditListWithRangeAndLimit(range, limit, currentLat, currentLong) {
        diditsDB.findAllDiditsWithRange(limit, function (didits) {
            generateDiditList(distanceCalculator.calculateDistance(range, didits, currentLat, currentLong));

        });
    },
    generateDiditListWithRange: function generateDiditListWithRange(range, currentLat, currentLong) {
        diditsDB.findAllDidits(function (didits) {
            generateDiditListWithDistance(distanceCalculator.calculateDistance(range, didits, currentLat, currentLong));

        });
    }
};
