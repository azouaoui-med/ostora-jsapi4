define([
    "dojo/i18n!js/config/nls/local",
    "esri/layers/FeatureLayer"

], function (i18n, FeatureLayer) {

    return {
        // the feature layers needs to be published in 10.3 or higher version of arcgis server
        sources: [{
                featureLayer: new FeatureLayer({
                    url: "http://services.arcgis.com/P8Cok4qAP1sTVE59/arcgis/rest/services/ALG_ADMLEVEL2/FeatureServer/0",
                    outFields: ["*"]
                }),
                searchFields: ["FIRST_NAME"],
                displayField: "FIRST_NAME",
                exactMatch: false,
                outFields: ["*"],
                name: i18n.algeria,
                placeholder: i18n.algeria,
                maxResults: 4,
                maxSuggestions: 4,
                suggestionsEnabled: true,
                minSuggestCharacters: 0
            }

        ],
        getSources() {
            return this.srouces;
        }

    }
});