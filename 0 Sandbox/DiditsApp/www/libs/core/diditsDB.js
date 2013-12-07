/**
 * Created with JetBrains AppCode.
 * User: vikpek
 * Date: 13.07.13
 * Time: 16:52
 * To change this template use File | Settings | File Templates.
 */

var db = null;
var shortName = 'DiditsDB';
var version = '1.0';
var displayName = 'DiditsDB';
var maxSize = 65535;

function errorHandler(transaction, error) {
    // hack - to filter the pk unique (which are fine) statements
    if (error.code != 1 && error.code != 6) {
        console.log('Error: ' + error.message + ' code: ' + error.code);
    }
}

function successCallBack() {
//    console.log("DEBUGGING: successCallBack");
}


function nullHandler(data) {
//    console.log("DEBUGGING: nullHandler: " + data);
}

function initDB() {
    if (!window.openDatabase) {
        console.log('Databases are not supported in this browser.');
        return;
    }

    db = openDatabase(shortName, version, displayName, maxSize);

    db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS Didit(' +
            'diditId INTEGER NOT NULL PRIMARY KEY,' +
            'payload TEXT,' +
            'own BOOLEAN' +
            ')', [], nullHandler, errorHandler);
    }, errorHandler, successCallBack);
}


var diditsDB = {
    addDidits: function addDidits(didits, own) {
        initDB();
        $.each(didits, function (key, val) {
            db.transaction(function (transaction) {
                transaction.executeSql('INSERT INTO Didit(diditId, payload, own)VALUES(?, ?, ?)', [val.id, JSON.stringify(val), own], nullHandler, errorHandler);
            });
        });
    },
    findAllDidits: function findAllDidits(diditCallback) {
        initDB();
        db.transaction(function (transaction) {
            transaction.executeSql('SELECT * FROM Didit;', [],
                function (transaction, result) {
                    if (result !== null && result.rows !== null) {
                        var diditList = "[";
                        for (var i = 0; i < result.rows.length; i++) {
                            var row = result.rows.item(i);
                            var jsonPayload = JSON.parse(row.payload);
                            jsonPayload.owned  = row.own;
                            diditList = diditList + JSON.stringify(jsonPayload);
                            if (i != result.rows.length - 1) {
                                diditList = diditList + ',';
                            }
                            console.log('.');
                        }
                        diditList = diditList + ']';
                        diditCallback(JSON.parse(diditList));
                    }
                }, errorHandler);
        }, errorHandler, nullHandler);
    },
    findAllDiditsWithLimit: function findAllDiditsWithLimit(limit, diditCallback) {
        initDB();
        db.transaction(function (transaction) {
            transaction.executeSql('SELECT * FROM Didit LIMIT ?;', [limit],
                function (transaction, result) {
                    if (result !== null && result.rows !== null) {
                        var diditList = "[";
                        for (var i = 0; i < result.rows.length; i++) {
                            var row = result.rows.item(i);
                            var jsonPayload = JSON.parse(row.payload);
                            jsonPayload.owned  = row.own;
                            diditList = diditList + JSON.stringify(jsonPayload);
                            if (i != result.rows.length - 1) {
                                diditList = diditList + ',';
                            }
                        }
                        diditList = diditList + ']';
                        diditCallback(JSON.parse(diditList));
                    }
                }, errorHandler);
        }, errorHandler, nullHandler);
    },
    findOwnDidits: function findOwnDidits(diditCallback) {
        initDB();
        db.transaction(function (transaction) {
            transaction.executeSql('SELECT * FROM Didit WHERE own=?;', [true],
                function (transaction, result) {
                    if (result !== null && result.rows !== null) {
                        var diditList = "[";
                        for (var i = 0; i < result.rows.length; i++) {
                            var row = result.rows.item(i);
                            var jsonPayload = JSON.parse(row.payload);
                            jsonPayload.owned  = row.own;
                            diditList = diditList + JSON.stringify(jsonPayload);
                            if (i != result.rows.length - 1) {
                                diditList = diditList + ',';
                            }
                        }
                        diditList = diditList + ']';
                        diditCallback(JSON.parse(diditList));
                    }
                }, errorHandler);
        }, errorHandler, nullHandler);
    },
    findDiditById: function findDiditById(diditId, diditCallback) {
        initDB();
        db.transaction(function (transaction) {
            transaction.executeSql('SELECT * FROM Didit WHERE diditId=?;', [diditId],
                function (transaction, result) {
                    if (result != null && result.rows != null && result.rows.length == 1) {
                        for (var i = 0; i < result.rows.length; i++) {
                            var row = result.rows.item(i);
                            var jsonPayload = JSON.parse(row.payload);
                            jsonPayload.owned  = row.own;
                            var didit = jsonPayload;
                            diditCallback(didit);
                        }
                    } else {
                        console.log('Range dimension error for query result: ' + result.rows.length);
                    }
                }, errorHandler);
        }, errorHandler, nullHandler);
    }
}
