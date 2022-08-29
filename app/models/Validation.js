function Validation() {
    this.checkEmpty = function (inputVal, spanId, message) {
        if (inputVal.trim() != "") {
            document.getElementById(spanId).innerHTML = "";
            document.getElementById(spanId).style.display = "none";
            return true;
        }
        document.getElementById(spanId).innerHTML = message;
        document.getElementById(spanId).style.display = "block";
        return false;
    }

    this.checkStyleURL = function (inputVal, spanId, message) {
        var pattern = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
        if (inputVal.match(pattern)) {
            document.getElementById(spanId).innerHTML = "";
            document.getElementById(spanId).style.display = "none";
            return true;
        }
        document.getElementById(spanId).innerHTML = message;
        document.getElementById(spanId).style.display = "block";
        return false;
    }

    // this.checkName = function (inputVal, spanId, message, mangSP) {
    //     var isExist = false;
    //     isExist = mangSP.some(function (sp) {
    //         return sp.name.replaceAll(" ", "") === inputVal.replaceAll(" ", "");
    //     });
    //     if (isExist) {
    //         document.getElementById(spanId).innerHTML = message;
    //         document.getElementById(spanId).style.display = "block";
    //         return false;
    //     }
    //     document.getElementById(spanId).innerHTML = "";
    //     document.getElementById(spanId).style.display = "none";
    //     return true;
    // }

    this.checkNumber = function (inputVal, spanId, message) {
        var pattern = /^(\d{1,8}(\.\d{1,2})?)$/;
        if (inputVal.match(pattern)) {
            document.getElementById(spanId).innerHTML = "";
            document.getElementById(spanId).style.display = "none";
            return true;
        }
        document.getElementById(spanId).innerHTML = message;
        document.getElementById(spanId).style.display = "block";
        return false;
    }

    this.checkDropDown = function (selectId, spanId, message) {
        var indexOption = document.getElementById(selectId).selectedIndex;
        if (indexOption != 0) {
            document.getElementById(spanId).innerHTML = "";
            document.getElementById(spanId).style.display = "none";
            return true;
        }
        document.getElementById(spanId).innerHTML = message;
        document.getElementById(spanId).style.display = "block";
        return false;
    }
}
