define([
    "require",
    "config/widgetConfig",
    "dojo/domReady!"
], function (require, widgetConfig) {

    return {
        startup: function (view) {

            require(["app/header/header", "app/widgets/widget"], function (header, widgetContainer) {
                //Create header (navbar) and append it to <header id="header"></header> 
                var headerWidget = new header();
                headerWidget.mapView = view;               
                var headerNode = $(headerWidget.domNode);
                $('#header').append(headerNode);
                headerWidget.startup();
                //Loop throw the widgetConfig file and create the widgets with the associated link
                for (let i = 0; i < widgetConfig.menus.length; i++) {
                    
                    if (widgetConfig.menus[i].type == 'simple') {
                        require([widgetConfig.menus[i].widget.path], function (widget) {

                            var widgetContainerCons = new widgetContainer();
                            var widgetContainerNode = $(widgetContainerCons.domNode);
                            widgetContainerNode.find('.widgetTitle .widgetIcon')[0].innerHTML = widgetConfig.menus[i].widget.icon;
                            widgetContainerNode.find('.widgetTitle .widgetText')[0].innerHTML = widgetConfig.menus[i].widget.title;

                            var widgetCons = new widget();
                            var widgetNode = $(widgetCons.domNode);

                            widgetContainerNode.find('.widgetBody').append(widgetNode);

                            $('#main').append(widgetContainerNode);

                            var menu = $('<li/>', {
                                class: 'nav-item',
                                html: '<a class="nav-link" href="#">' + widgetConfig.menus[i].title + '</a>'

                            }).appendTo('ul#menuList');

                            menu.click(function (e) {
                                e.preventDefault();
                                $(widgetContainerCons.domNode).show();
                                if (widgetContainerCons.minimizedWidget) {
                                    widgetContainerCons.restoreWidget();
                                }
                                $('.widget').css('z-index', 40);
                                $(widgetContainerCons.domNode).css('z-index', 50);
                            });
                            widgetCons.mapView = view;
                            widgetCons.startup();
                            widgetContainerCons.startup();
                        });

                    }
                }

            });
        }
    }

});