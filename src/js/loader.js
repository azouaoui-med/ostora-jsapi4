define([
    "dojo/domReady!"
], function () {

    return {
        windowLoaded: false,
        appLoaded: false,
        removeLoader: function () {
            $(".loader").fadeOut(500, function () {
                $(".loader").remove();
            });
        },
        onLoad: function () {
            this.removeLoader();          
            if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                $(".mScroll").mCustomScrollbar({
                    scrollInertia: 500
                });
            }

        }

    }


});