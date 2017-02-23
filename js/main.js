var map;
require(["esri/map",
    "esri/arcgis/utils",
    "esri/dijit/analysis/FindNearest",
    "esri/layers/FeatureLayer",
    // "esri/dijit/Legend",
    "dojo/domReady!"
], function(Map, arcgisUtils, FeatureLayer, Legend, FindNearest) {
    arcgisUtils.createMap("cd01f8056030463ebd7950e42baf6b45", "mapDiv").then(function(response) {
        map = response.map;
        var grt_stops = new FeatureLayer({
            url: "http://services7.arcgis.com/XOesAnDZuBW07yDr/arcgis/rest/services/GRT_Stops/FeatureServer/0"
        });
        var grt_network = new FeatureLayer({
            url: "http://services7.arcgis.com/XOesAnDZuBW07yDr/arcgis/rest/services/GRT_Route_ND/FeatureServer/0"
        });

        var findNearestStart = new FindNearest({
            portalUrl: "http://teamprototype.maps.arcgis.com",
            analysisLayer: grt_stops,
            map: response.map,
            maxCount: 1,
            nearLayer: 'PLACEHOLDER', // This is where we need to get the input from the user.
            outputLayerName: "Start Point"
        });
        var findNearestEnd = new FindNearest({
            portalUrl: "http://teamprototype.maps.arcgis.com",
            analysisLayer: grt_stops,
            map: response.map,
            maxCount: 1,
            nearLayer: 'placeholder', // This is where we need to get the input from the user.
            outputLayerName: "End Point"
        });
    });
});
/*   var legend = new Legend({
     map: map,
          layerInfos:(arcgisUtils.getLegendLayers(response))
  }, "legendDiv");
         legend.startup();
  */
