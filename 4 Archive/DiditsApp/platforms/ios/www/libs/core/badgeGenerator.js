/**
 * Created with JetBrains AppCode.
 * User: vikpek
 * Date: 11.08.13
 * Time: 12:31
 * To change this template use File | Settings | File Templates.
 */
var badgeGenerator = {
    getBadgeURLForDidit: function getBadgeURLForDidit(didit) {
        "use strict";

        var result = '<div style="position: relative">';


        if (didit.owned) {
            result = result + '<img style="position: absolute; width: 100px" src="../img/badges/back-owned2.png">';
            result = result + '<img style="position: relative; width: 100px" src="../img/badges/front-owned2.png">';

        } else {
            result = result + '<img style="position: absolute; width: 100px" src="../img/badges/back-not-owned2.png">';
            result = result + '<img style="position: relative; width: 100px" src="../img/badges/front-not-owned2.png">';
        }

        result = result + '</div>';
        return result;
    }
};