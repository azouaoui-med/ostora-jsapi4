define([
        "dojo/_base/declare",
        "dijit/_WidgetBase",
        "dijit/_TemplatedMixin",
        "dijit/_WidgetsInTemplateMixin",
        "dojo/text!app/aside/aside.html",
        "esri/widgets/BasemapGallery",
        "esri/widgets/BasemapGallery/support/LocalBasemapsSource",
        "esri/widgets/Legend",
        "esri/widgets/LayerList",
        "dojo/domReady!"

    ],
    function (
        declare,
        _WidgetBase,
        _TemplatedMixin,
        _WidgetsInTemplateMixin,
        template,
        BasemapGallery,
        LocalBasemapsSource,
        Legend,
        LayerList

    ) {
        return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
            templateString: template,
            startup: function () {

                var basemapContainer = document.createElement("div");
                $(this.domNode).find("#basemapGallery").append(basemapContainer);
                //$(basemapContainer).addClass("basemapContainer").appendTo("aside.sideBar #basemapGallery");
                /*var localSource = new LocalBasemapsSource({
                    basemaps: mapConfig.basemaps
                });*/
                var basemapGallery = new BasemapGallery({
                    view: this.mapView,
                    container: basemapContainer
                    /*,
                                        source: localSource*/
                });

                var legendContainer = document.createElement('div');
                $(this.domNode).find("#legend").append(legendContainer);

                var legend = new Legend({
                    view: this.mapView,
                    container: legendContainer
                });
                var layers = document.createElement("div");
                $(this.domNode).find("#layerList").append(layers);
                var layerList = new LayerList({
                    view: this.mapView,
                    container: layers,
                });

            }
        });
    });