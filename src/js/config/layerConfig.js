define([
    "dojo/i18n!js/config/nls/local",
    "esri/layers/FeatureLayer"

], function (i18n, FeatureLayer) {

    return {
        _layers: [],
        initLayers() {
            this._layers = [

                new FeatureLayer({
                    url: 'http://services.arcgis.com/P8Cok4qAP1sTVE59/arcgis/rest/services/ALG_ADMLEVEL2/FeatureServer',
                    title: i18n.algeria,
                    popupEnabled: true,
                    outFields: ['*'],
                    opacity : 0.8,
                    popupTemplate: {
                        title: "{FIRST_NAME}"
                    }
                })

            ]
            return this._layers;
        },
        getLayers() {
            return this._layers;
        }


    }
});