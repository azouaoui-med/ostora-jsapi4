define([
	"dojo/i18n!js/config/nls/local",
], function (i18n) {

	return {
		menus: [
			//simple menu
			{
				type: 'simple',
				title: i18n.Example,
				icon: '',
				widget: {
					title: i18n.Example,
					icon: '<i class="fa fa-clone"></i>',
					path: 'app/widgets/example/example'
				}
			},
			//dropdown menu
			{
				type: 'dorpdown',
				title: i18n.drawTitleMenu,
				icon: '',
				submenus: [{
					title: i18n.drawTitle,
					icon: '',
					widget: {
						title: i18n.drawTitle,
						icon: '<i class="fas fa-pencil-alt"></i>',
						path: 'app/widgets/draw/draw'
					}
				}]
			}
		]


	}
});