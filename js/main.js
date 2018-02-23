define([
    "esri/views/MapView",
    "esri/views/SceneView",
    "esri/Map",
    "esri/widgets/BasemapGallery",
    "esri/widgets/Fullscreen",
    "js/initWidgets",
    "dojo/domReady!"
], function (MapView, SceneView, Map, BasemapGallery, Fullscreen, initWidgets) {

    return {
        startup: function () {
            this.initMap();
            initWidgets.startup(this.activeView);
        },
        initMap: function () {

            $('<div/>', {
                id: 'viewDiv',
            }).appendTo('#main');

            this.mapView = new MapView({
                container: "viewDiv", // Reference to the scene div created in step 5
                map: new Map({
                    basemap: 'streets',
                    ground: "world-elevation"
                }), // Reference to the map object created before the scene
                zoom: 6, // Sets zoom level based on level of detail (LOD)
                center: [3.262939, 36.618283], // Sets center point of view using longitude,latitude
                ui: {
                    components: ["zoom", "compass", "attribution"]
                }
            });
            this.activeView = this.mapView;

            var basemapContainer = document.createElement("div");
            $(basemapContainer).addClass("basemapContainer hidden").appendTo("#main");
            //Basemap gallery
            var basemapGallery = new BasemapGallery({
                view:  this.activeView,
                container: basemapContainer
            });

            // full screen widget
            fullscreen = new Fullscreen({
                view:  this.activeView
            });
            this.activeView.ui.add(fullscreen, "top-right");



        }
    }


});