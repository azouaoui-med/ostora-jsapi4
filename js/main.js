define([
    "esri/views/MapView",
    "esri/views/SceneView",
    "esri/Map",
    "esri/widgets/BasemapGallery",
    "esri/widgets/Fullscreen",
    "js/initWidgets",    
    "js/loader",    
    "config/layerConfig",
    "dojo/domReady!"
], function (MapView, SceneView, Map, BasemapGallery, Fullscreen, initWidgets,loader,layerConfig) {

    return {
        startup: function () {
            this.initMap();
            this.initLayer();
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

            // full screen widget
            fullscreen = new Fullscreen({
                view:  this.activeView
            });
            this.activeView.ui.add(fullscreen, "top-right");

            $(window).on('load', function () {
                loader.windowLoaded = true;
                if (loader.appLoaded) {
                    loader.remove();
                }
            });


        },
        initLayer: function () {

            var layers = layerConfig.layers
            for (let i = 0; i < layers.length; i++) {
                this.mapView.map.add(layers[i]);

            }
        },
    }


});