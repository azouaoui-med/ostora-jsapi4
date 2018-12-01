define([
        "dojo/_base/declare",
        "dijit/_WidgetBase",
        "dijit/_TemplatedMixin",
        "dojo/text!app/widgets/example/example.html",
        "dojo/i18n!app/widgets/example/nls/local"

    ],
    function (
        declare,
        _WidgetBase,
        _TemplatedMixin,
        template,
        i18n,

    ) {
        return declare([_WidgetBase, _TemplatedMixin], {
            templateString: template,
            i18n: i18n,
            startup() {
                this.inherited(arguments);

            }

        });
    });