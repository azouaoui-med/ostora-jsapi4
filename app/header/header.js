define([
        "dojo/_base/declare",
        "dijit/_WidgetBase",
        "dijit/_TemplatedMixin",
        "dijit/_WidgetsInTemplateMixin",
        "dojo/text!app/header/header.html",
        "esri/widgets/Search",
        "dojo/domReady!"

    ],
    function (
        declare,
        _WidgetBase,
        _TemplatedMixin,
        _WidgetsInTemplateMixin,
        template,
        Search
    ) {
        return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
            templateString: template,
            startup: function () {

                var search = document.createElement("div");
                $(this.domNode).find('.searchGeo').append(search);

                var searchWidget = new Search({
                    view: this.mapView,
                    container: search
                });
                $(this.domNode).find('#toggleBaseGallery').click(function (e) {
                    e.preventDefault();

                    $(".basemapContainer").toggleClass("hidden");

                });

            }
        });
    });