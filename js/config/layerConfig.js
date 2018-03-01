define([
    "require",
    "esri/layers/FeatureLayer"

], function (require, FeatureLayer) {

    return {

        layers: [
            new FeatureLayer({
                url: 'http://services.arcgis.com/P8Cok4qAP1sTVE59/arcgis/rest/services/ALG_ADMLEVEL2/FeatureServer',
                title: 'Algeria Cities',
                popupEnabled: true,
                outFields: ['*'],
                popupTemplate: {
                    title: "{FIRST_NAME}"
                }
            })

        ]

    }
});