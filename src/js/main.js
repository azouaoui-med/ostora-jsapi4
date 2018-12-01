define([
    "js/initWidgets",
    "js/config/mapConfig",
    "js/config/layerConfig",
    "js/config/searchConfig",
    "js/loader",
    "esri/widgets/ScaleBar",
    "esri/widgets/Fullscreen",
    "esri/widgets/Search",
    "dojo/domReady!"

], function (initWidgets, mapConfig, layerConfig, searchConfig, loader, ScaleBar, Fullscreen, Search) {

    return {

        mapView: null,
        startup: function () {

            this.initLanguage();

            this.initMap();

            $(window).on('load', function () {
                loader.windowLoaded = true;
                loader.onLoad();
            });

        },
        initMap: function () {


            this.mapView = mapConfig.initMapView();

            this.mapView.when(() => {

                this.initLayers();
                this.initScaleBar();
                this.initSearch();
                this.initfullScreen();

                initWidgets.startup(this.mapView);

            });

        },
        initLayers: function () {

            this.mapView.map.addMany(layerConfig.initLayers());

        },
        initSearch: function () {

            let searchWidget = new Search({
                view: this.mapView,
                sources: searchConfig.sources
            });

            this.mapView.ui.add(searchWidget, "top-right");

        },
        initScaleBar: function () {

            let scaleBar = new ScaleBar({
                view: this.mapView
            });
            this.mapView.ui.add(scaleBar, "bottom-right");
        },
        initfullScreen: function () {

            fullscreen = new Fullscreen({
                view: this.mapView
            });
            this.mapView.ui.add(fullscreen, "top-right");
        },
        initLanguage: function () {

            if (localStorage.getItem('locale') == 'ar') {
                $('body').addClass('rightToLeft');

            } else {
                $('body').removeClass('rightToLeft');
            }
        }
    }


});