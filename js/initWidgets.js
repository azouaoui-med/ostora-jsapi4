define([
    "require",
    "config/widgetConfig",
    "dojo/domReady!"
], function (require, widgetConfig) {

    return {
        startup: function (view) {

            require(["app/header/header", "app/widgets/widget"], function (Header, Widget) {
                //Create header (navbar) and append it to <header id="header"></header> 
                var header = new Header();
                header.activeView = view;               
                var headerNode = $(header.domNode);
                $('#header').append(headerNode);
                header.startup();
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
                        });

                    }
                }

            });
        }
    }

});