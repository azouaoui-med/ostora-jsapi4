define([
    "require",
    "config/widgetConfig",
    "js/loader",
    "dojo/domReady!"
], function (require, widgetConfig, loader) {

    return {
        startup: function (view) {

            require(["app/header/header","app/aside/aside", "app/widgets/widget"], function (Header,aside, Widget) {
                //Create header (navbar) and append it to <header id="header"></header> 
                var header = new Header();
                header.activeView = view;
                var headerNode = $(header.domNode);
                $('#header').append(headerNode);
                header.startup();
                //Create aside widget and append it to #main
                var asideWidget = new aside();
                asideWidget.mapView = view;
                var asideNode = $(asideWidget.domNode);
                $('#main').append(asideNode);
                asideWidget.startup();
                //Loop throw the widgetConfig file and create the widgets with the associated link
                for (let i = 0; i < widgetConfig.menus.length; i++) {

                    if (widgetConfig.menus[i].type == 'simple') {
                        require([widgetConfig.menus[i].widget.path], function (WidgetContent) {

                            var widget = new Widget();
                            var widgetNode = $(widget.domNode);
                            widgetNode.find('.widgetTitle .widgetIcon')[0].innerHTML = widgetConfig.menus[i].widget.icon;
                            widgetNode.find('.widgetTitle .widgetText')[0].innerHTML = widgetConfig.menus[i].widget.title;

                            var widgetContent = new WidgetContent();
                            var widgetContentNode = $(widgetContent.domNode);

                            widgetNode.find('.widgetBody').append(widgetContentNode);

                            $('#main').append(widgetNode);

                            var menu = $('<li/>', {
                                class: 'nav-item',
                                html: '<a class="nav-link" href="#">' + widgetConfig.menus[i].title + '</a>'

                            }).appendTo('ul#menuList');

                            menu.click(function (e) {
                                e.preventDefault();
                                $(widget.domNode).show();
                                if (widget.minimizedWidget) {
                                    widget.restoreWidget();
                                }
                                $('.widget').css('z-index', 40);
                                $(widget.domNode).css('z-index', 50);
                            });
                            widgetContent.activeView = view;
                            widgetContent.startup();
                            widget.startup();

                            if (i >= (widgetConfig.menus.length - 1)) {
                                loader.appLoaded = true
                                if (loader.windowLoaded) {
                                    loader.remove();
                                }
                            }
                        });

                    }
                }

            });
        }
    }

});