function setCookie(cookieName, cookieValue, expires="", path="/") {
	    if (expires === "") {
        let currentDate = new Date();
        // expire cookie next year
        expires = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDay()+7)
    }
	cookie = ""
    cookie += `${cookieName}=${cookieValue};`
    cookie += `expires=${(new Date(expires)).toUTCString()};`
    cookie += `path=${path};`;
    
    document.cookie = cookie;
}
function getCookie(cookieName) {
    var key = cookieName + "=";
    var retrieveCookie = document.cookie;
    var ca = retrieveCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(key) == 0) {
            return c.substring(key.length, c.length);
        }
    }
}