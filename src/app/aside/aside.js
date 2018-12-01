define([
        "dojo/_base/declare",
        "dijit/_WidgetBase",
        "dijit/_TemplatedMixin",
        "dojo/text!app/aside/aside.html",
        "dojo/i18n!app/aside/nls/local",
        "js/config/mapConfig",
        "esri/widgets/BasemapGallery",
        "esri/widgets/BasemapGallery/support/LocalBasemapsSource",
        "esri/widgets/Legend",
        "esri/widgets/LayerList",
        "esri/widgets/CoordinateConversion"

    ],
    function (
        declare,
        _WidgetBase,
        _TemplatedMixin,
        template,
        i18n,
        mapConfig,
        BasemapGallery,
        LocalBasemapsSource,
        Legend,
        LayerList,
        CoordinateConversion

    ) {
        return declare([_WidgetBase, _TemplatedMixin], {
            templateString: template,
            i18n: i18n,
            startup() {

                var basemapContainer = document.createElement("div");
                $(this.domNode).find("#basemapGallery").append(basemapContainer);

                //create basemap gallery to swith between basemaps
                var localSource = new LocalBasemapsSource({
                    basemaps: mapConfig.initBasemaps()
                });
                var basemapGallery = new BasemapGallery({
                    view: this.mapView,
                    container: basemapContainer,
                    source: localSource
                });

                basemapGallery.on("error", msg => console.log("basemap gallery error:  ", msg));

                var legendContainer = document.createElement('div');
                $(legendContainer).addClass("legend");
                $(this.domNode).find("#legend").append(legendContainer);

                //create legend widget to dispaly symbology of layers
                var legend = new Legend({
                    view: this.mapView,
                    container: legendContainer
                });

                var layers = document.createElement("div");
                $(this.domNode).find("#layerList").append(layers);

                //create layer list widget to display layers and have show/hide fonctionallity
                var layerList = new LayerList({
                    view: this.mapView,
                    container: layers,
                });

                var ccWidgetContainer = document.createElement("div");
                $(this.domNode).find("#ccWidget").append(ccWidgetContainer);


                var ccWidget = new CoordinateConversion({
                    view: this.mapView,
                    container: ccWidgetContainer,
                  });
            
            }
        });
    });