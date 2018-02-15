define(function (require) {

    return {
        menus: [
            {
                title: "Forms",
                type: 'simple',
                widget: {
                    title: 'Forms',
                    icon: '<i class="far fa-gem" aria-hidden="true"></i>',
                    path: 'app/widgets/forms/forms'
                }
            },
            {
                title: "Draw",
                type: 'simple',
                widget: {
                    title: 'Draw',
                    icon: '<i class="fa fa-pencil-alt" aria-hidden="true"></i>',
                    path: 'app/widgets/draw/draw'
                }
            }
        ]

    }

});