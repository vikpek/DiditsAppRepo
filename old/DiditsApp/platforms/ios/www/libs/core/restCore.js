/**
 * Created with JetBrains AppCode.
 * User: vikpek
 * Date: 13.07.13
 * Time: 15:21
 * To change this template use File | Settings | File Templates.
 */
var restCore = {
    postUserDidit: function postUserDidit(user_didit) {
        $.ajax({
                type: "POST",
                url: localStorage.diditsUrl + '/userdiditmasks',
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                headers: {
                    Accept: "application/json",
                    Authorization: "Basic " + localStorage.baseCode
                },
                data: JSON.stringify(user_didit),
                success: function (data) {
                    console.log("Successful POST request: " + JSON.stringify(data));
                },
                error: function (error) {
                    console.log("status: " + error.status);

                    if (error.status == 201) {
                        alert("Successfully achieved Didit!");
                    } else {
                        alert("Server connection error!");
                        console.log("Failed POST request: " + JSON.stringify(error));
                    }
                    history.back();
                }
            }
        );
    }
};
