export default locator => {
	return {
		'.mimic .title': {
			'font-weight': 'bold',
			'cursor': 'pointer',
		},

		'.mimic .content': {},

		'.mimic .contacts': {},

		'.mimic .contacts__item': {
			'display': 'inline',
		},

		'.mimic .warning': {
			'font-size': locator.calcString(10, 'px'),
		},

		'.mimic .picture': {
			'overflow': 'hidden',
		},

		'.mimic .picture .picture__content': {
			'display': 'block',
			'max-width': locator.calcString(100, '%'),
			'max-height': locator.calcString(100, '%'),
			'transition': 'all 0.2s ease-in-out',
		},
	};
};
