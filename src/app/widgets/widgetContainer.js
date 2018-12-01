define([
        "dojo/_base/declare",
        "dijit/_WidgetBase",
        "dijit/_TemplatedMixin",
        "dojo/text!app/widgets/widgetContainer.html"

    ],
    function (
        declare,
        _WidgetBase,
        _TemplatedMixin,
        template
    ) {
        return declare([_WidgetBase, _TemplatedMixin], {
            templateString: template,
            minimizedWidget: null,
            startup: function () {

                var widgetNode = $(this.domNode);

                widgetNode.find('.widgetMaximize').click(function () {

                    widgetNode.closest('.widgetContainer').toggleClass('maximized');
                    $(this).find("i").toggleClass("fa-window-restore");

                });

                widgetNode.find('.widgetClose').click(function () {
                    widgetNode.hide();
                });

                //minimize widget and display an icon to restore it
                widgetNode.find('.widgetMinimize').click($.proxy(function () {

                    widgetNode.addClass('minimized');

                    if ($(".minimizedWidgets").length == 0) {
                        this.minimizedWidget = $('<div/>', {
                            class: 'minimizedWidgets'
                        }).appendTo('#footer');
                    }

                    this.minimizedWidget = $('<div/>', {
                        class: 'minimizedWidget',
                        html: widgetNode.find('.widgetTitle i').clone()
                    }).appendTo('.minimizedWidgets');


                    this.minimizedWidget.click($.proxy(function (e) {
                        e.preventDefault();
                        this.restoreWidget();

                    }, this));

                }, this));



                widgetNode.mousedown(function () {
                    $('.widgetContainer').css('z-index', 40);
                    widgetNode.css('z-index', 50);
                });

                widgetNode.draggable({
                    handle: ".widgetTitle",
                    containment: $("#main")
                });

                widgetNode.resizable({
                    containment: $("#main")
                });

                if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                    widgetNode.find(".widgetBody").mCustomScrollbar({
                        scrollInertia: 500
                    });
                }

            },
            restoreWidget: function () {
                $('.widgetContainer').css('z-index', 40);
                $(this.domNode).css('z-index', 50);
                $(this.domNode).removeClass('minimized');
                this.minimizedWidget.remove();

            }

        });
    });