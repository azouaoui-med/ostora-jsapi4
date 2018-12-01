define([
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dojo/text!app/widgets/draw/draw.html",
    "dojo/i18n!app/widgets/draw/nls/local"
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
        editedGraphic: null,

        startup: function () {
            this.inherited(arguments);
        
        }
    });
});