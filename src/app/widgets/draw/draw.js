define([
        "dojo/_base/declare",
        "dijit/_WidgetBase",
        "dijit/_TemplatedMixin",
        "dojo/text!app/widgets/draw/draw.html",
        "dojo/i18n!app/widgets/draw/nls/local",
        "esri/widgets/Sketch/SketchViewModel",
        "esri/layers/GraphicsLayer"

    ],
    function (
        declare,
        _WidgetBase,
        _TemplatedMixin,
        template,
        i18n,
        SketchViewModel,
        GraphicsLayer

    ) {

        let graphicsLayer = new GraphicsLayer({
            title: "Graphics"
        }),
            sketchViewModel;

        return declare([_WidgetBase, _TemplatedMixin], {
            templateString: template,
            i18n: i18n,

            startup() {

                this.inherited(arguments);
                this.mapView.map.add(graphicsLayer);

                sketchViewModel = new SketchViewModel({
                    view: this.mapView,
                    layer: graphicsLayer
                });

                $(this.btn_add_point).click((e) => {
                    e.preventDefault();
                    this.createSketch('point');

                });
                $(this.btn_add_polyline).click((e) => {
                    e.preventDefault();
                    this.createSketch('polyline');

                });
                $(this.btn_add_polygon).click((e) => {
                    e.preventDefault();
                    this.createSketch('polygon');

                });
                $(this.btn_add_circle).click((e) => {
                    e.preventDefault();
                    this.createSketch('circle');

                });
                $(this.btn_add_rectangle).click((e) => {
                    e.preventDefault();
                    this.createSketch('rectangle');

                });

                $(this.btn_remove_all).click((e) => {
                    graphicsLayer.removeAll();
                })

            },
            createSketch(tool) {

                sketchViewModel.create(tool);

                sketchViewModel.on("create", (event) => {
                    if (event.state === "complete") {
                        graphicsLayer.add(event.graphic);
                    }
                });

            },

        });
    });