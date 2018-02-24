define([
        "dojo/_base/declare",
        "dijit/_WidgetBase",
        "dijit/_TemplatedMixin",
        "dijit/_WidgetsInTemplateMixin",
        "dojo/text!app/header/header.html",
        "esri/widgets/Search",
        "esri/views/SceneView",
        "dojo/domReady!"

    ],
    function (
        declare,
        _WidgetBase,
        _TemplatedMixin,
        _WidgetsInTemplateMixin,
        template,
        Search,
        SceneView
    ) {
        return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
            templateString: template,
            startup: function () {

                var search = document.createElement("div");
                $(this.domNode).find('.searchGeo').append(search);
                this.searchWidget = new Search({
                    view: this.activeView,
                    container: search
                });
                $(this.domNode).find('#toggleBaseGallery').click(function (e) {
                    e.preventDefault();

                    $(".basemapContainer").toggleClass("hidden");

                });

                this.mapView = this.activeView;
                this.map = this.activeView.map;
                this.sceneView = new SceneView({
                    map: this.map
                });

                $(this.domNode).find('#toggle3d').click($.proxy(function (e) {
                    e.preventDefault();
                    var container = this.activeView.container;
                    this.activeView.container = null;
                    var viewpoint = this.activeView.viewpoint.clone();
                    if (this.activeView == this.mapView) {
                        //switch to 3d
                        this.sceneView.viewpoint = viewpoint;
                        this.sceneView.container = container;
                        this.activeView = this.sceneView;
                        this.searchWidget.view = this.activeView;
                        $(this.domNode).find('#toggle3d').html('2D');


                    } else {
                        //switch to 2d
                        this.mapView.viewpoint = viewpoint;
                        this.mapView.container = container;
                        this.activeView = this.mapView;
                        this.searchWidget.view = this.activeView;
                        $(this.domNode).find('#toggle3d').html('3D');

                    }

                }, this));



            }
        });
    });