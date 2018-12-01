define([
        "dojo/_base/declare",
        "dijit/_WidgetBase",
        "dijit/_TemplatedMixin",
        "dojo/text!app/header/header.html",
        "dojo/i18n!app/header/nls/local"

    ],
    function (
        declare,
        _WidgetBase,
        _TemplatedMixin,
        template,
        i18n,
        user
    ) {
        return declare([_WidgetBase, _TemplatedMixin], {
            templateString: template,
            i18n: i18n,
            startup: function () {

                var search = document.createElement("div");
                $(this.domNode).find('.searchGeo').append(search);

                $(this.domNode).find('#toggleBaseGallery').click(function (e) {

                    e.preventDefault();
                    $(".sideBar").toggleClass("hidden");

                });

                $(this.domNode).find('#changeLanguage').click(function (e) {

                    e.preventDefault();

                    localStorage.setItem('locale', $(this).attr("data-language"));
                    location.reload();

                });
                                
                
                $(this.domNode).find('#fullScreen').click($.proxy(function (e) {
                    e.preventDefault();

                    var elem = document.body; // Make the body go full screen.
                    this.toggleFullscreen(elem);
                    
                }, this));

            },
            toggleFullscreen: function (elem) {
                elem = elem || document.documentElement;
                if (!document.fullscreenElement && !document.mozFullScreenElement &&
                    !document.webkitFullscreenElement && !document.msFullscreenElement) {
                    if (elem.requestFullscreen) {
                        elem.requestFullscreen();
                    } else if (elem.msRequestFullscreen) {
                        elem.msRequestFullscreen();
                    } else if (elem.mozRequestFullScreen) {
                        elem.mozRequestFullScreen();
                    } else if (elem.webkitRequestFullscreen) {
                        elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
                    }
                } else {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.webkitExitFullscreen) {
                        document.webkitExitFullscreen();
                    }
                }
            }
        });
    });