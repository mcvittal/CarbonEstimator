var map;



require(["esri/map",
    "esri/arcgis/utils",
    "esri/dijit/analysis/FindNearest",
    "esri/layers/FeatureLayer",
    "esri/dijit/Legend",
    "esri/geometry/webMercatorUtils",
    "dojo/dom",
    "dojo/domReady!",
    "esri/geometry/Point",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/graphic",
    "esri/layers/GraphicsLayer",
], function(Map, arcgisUtils, FeatureLayer, Legend, FindNearest, webMercatorUtils, dom, Point, SimpleMarkerSymbol, Graphic, GraphicsLayer) {
    arcgisUtils.createMap("cd01f8056030463ebd7950e42baf6b45", "mapDiv").then(function(response) {
        map = response.map;
        var clicked = 1;
        var tmp=false;

          map.on("click", showCoordinates);

        function showCoordinates(evt) {
            console.log("hai");
            //the map is in web mercator but display coordinates in geographic (lat, long)
            var mp = webMercatorUtils.webMercatorToGeographic(evt.mapPoint);
            //display mouse coordinates
            var text = mp.x + ", " + mp.y;

            if (clicked==1) {
                dom.byId("from").innerHTML = "Start:" + text;
                clicked +=1;
            } else {
                dom.byId("to").innerHTML = "End:" + text;
                clicked +=1;
            }
            var pt = new esri.geometry.Point(mp.x, mp.y, new esri.SpatialReference({
                'wkid': 4326
            }));
            if (clicked<=3)
            {
              map.graphics.add(new esri.Graphic(
                  esri.geometry.geographicToWebMercator(pt), // geometry
                  new esri.symbol.SimpleMarkerSymbol(), // symbol
                  {
                      'title': 'Some Title...',
                      'content': 'Some content...'
                  }, // attributes
                  new esri.InfoTemplate('${title}', '${content}')
              ));
            }


        }

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
