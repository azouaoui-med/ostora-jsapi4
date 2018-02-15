define([
        "dojo/_base/declare",
        "dijit/_WidgetBase",
        "dijit/_TemplatedMixin",
        "dijit/_WidgetsInTemplateMixin",
        "dojo/text!app/widgets/draw/draw.html",
        "esri/layers/MapImageLayer",
        "esri/Basemap",
        "esri/widgets/Sketch/SketchViewModel",
        "esri/views/2d/draw/Draw",
        "esri/layers/GraphicsLayer",
        "esri/Graphic",
        "dojo/domReady!"

    ],
    function (
        declare,
        _WidgetBase,
        _TemplatedMixin,
        _WidgetsInTemplateMixin,
        template,
        MapImageLayer,
        Basemap,
        SketchViewModel,
        Draw,
        GraphicsLayer,
        Graphic
    ) {
        return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
            templateString: template,

            startup: function () {


                var tempGraphicsLayer = new GraphicsLayer();
                var view = this.mapView;
                this.mapView.map.add(tempGraphicsLayer);
                this.mapView.when(function () {

                    var sketchViewModel = new SketchViewModel({
                        view: view,
                        layer: tempGraphicsLayer,
                        pointSymbol: {
                            type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
                            style: "circle",
                            color: "yellow",
                            size: "14px",
                            outline: { // autocasts as new SimpleLineSymbol()
                                color: "red",
                                width: 1
                            }
                        },
                        polylineSymbol: {
                            type: "simple-line", // autocasts as new SimpleMarkerSymbol()
                            color: "red",
                            width: "2",
                            style: "solid"
                        },
                        polygonSymbol: {
                            type: "simple-fill", // autocasts as new SimpleMarkerSymbol()
                            color: "rgba(255,255,0, 0.6)",
                            style: "solid",
                            outline: { // autocasts as new SimpleLineSymbol()
                                color: "red",
                                width: 2
                            }
                        }
                    });
                    sketchViewModel.on("draw-complete", function (evt) {
                        // if multipoint geometry is created, then change the symbol
                        // for the graphic
                        console.log(evt);

                        if (evt.geometry.type === "multipoint") {
                            evt.graphic.symbol = {
                                type: "simple-marker",
                                style: "square",
                                color: "green",
                                size: "16px",
                                outline: {
                                    color: [255, 255, 255],
                                    width: 3
                                }
                            };
                        }
                        // add the graphic to the graphics layer
                        tempGraphicsLayer.add(evt.graphic);
                        //setActiveButton();
                    });


                    $('#btn-sketch-point').click($.proxy(function (e) {
                        sketchViewModel.create("point");
                    }, this));
                    $('#btn-sketch-line').click($.proxy(function (e) {
                        sketchViewModel.create("polyline");
                    }, this));
                    $('#btn-sketch-polygon').click($.proxy(function (e) {
                        sketchViewModel.create("polygon");
                    }, this));
                    $('#btn-sketch-reset').click($.proxy(function (e) {
                        tempGraphicsLayer.removeAll();
                        sketchViewModel.reset();
                    }, this));


                })




            }

        });
    });