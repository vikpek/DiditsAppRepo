/**
 * Created with JetBrains AppCode.
 * User: vikpek
 * Date: 01.08.13
 * Time: 15:28

 Idea to the offline UserDidit queue is to store user-didits
 while offline. Afterwards (when turning online) this list should be processed.

 All procedures should be available offline (like userdidit-gps validation) only
 the server transmit needs to wait.

 */


var offlineUserDiditQueue = {
    bufferUserDidit: function bufferUserDidit(user_didit) {
        "use strict";
        if (!localStorage.offlineUserDidits) {
            localStorage.offlineUserDidits = [];
        }

        localStorage.offlineUserDidits.push(user_didit);
    },
    getState: function getState() {
        "use strict";
        if (localStorage.offlineUserDidits) {
            return localStorage.offlineUserDidits.length;
        } else {
            return 0;
        }
    },
    processQueue: function processQueue() {
        "use strict";
        if (localStorage.offlineUserDidits) {
            var tmpUserDidits = localStorage.offlineUserDidits;
            for (var i = 0; i < tmpUserDidits.length; i++) {
                restCore.postUserDidit(tmpUserDidits[i]);
                // TODO remove current element from list
            }
        }
        return getState();
    }
};
