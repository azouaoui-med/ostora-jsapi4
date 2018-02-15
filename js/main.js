define([
    "esri/views/MapView",
    "esri/Map",
    "esri/widgets/BasemapGallery",
    "js/initWidgets",
    "dojo/domReady!"
], function (MapView, Map, BasemapGallery, initWidgets) {

    return {
        mapView: null,
        startup: function () {
            this.initMap();
            initWidgets.startup(this.mapView);
        },
        initMap: function () {

            $('<div/>', {
                id: 'viewDiv',
            }).appendTo('#main');

            this.mapView = new MapView({
                container: "viewDiv", // Reference to the scene div created in step 5
                map: new Map({
                    basemap: 'streets'
                }), // Reference to the map object created before the scene
                zoom: 6, // Sets zoom level based on level of detail (LOD)
                center: [3.262939, 36.618283] // Sets center point of view using longitude,latitude
            });

            var basemapContainer = document.createElement("div");
            $(basemapContainer).addClass("basemapContainer hidden").appendTo("#main");

            var basemapGallery = new BasemapGallery({
                view: this.mapView,
                container: basemapContainer
            });

        }
    }


});