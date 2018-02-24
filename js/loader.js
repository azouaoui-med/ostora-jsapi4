define([
    "dojo/domReady!"
], function () {

    return {
        windowLoaded: false,
        appLoaded: false,
        remove: function () {
            $(".loader").fadeOut(500,function () {
                $(".loader").remove();
            });
        }

    }


});