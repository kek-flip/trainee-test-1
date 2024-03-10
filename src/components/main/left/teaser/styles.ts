export default locator => {
	return {
		'.mimic_left .teaser': {
			'cursor': 'pointer',
			'word-wrap': 'break-word',
			'-moz-hyphens': 'auto',
			'-webkit-hyphens': 'auto',
			'-ms-hyphens': 'auto',
			'hyphens': 'auto',
			'overflow-wrap': 'break-word',
			'margin': locator.calcString(12, 'px'),
		},

		'.mimic_left .teaser .title': {
			'font-size': locator.calcString(15, 'px'),
			'margin-bottom': locator.calcString(6, 'px'),
		},

		'.mimic_left .teaser .picture': {
			'float': 'left',
			'margin-bottom': locator.calcString(6, 'px'),
		},

		'.mimic_left .teaser .content': {
			'font-size': locator.calcString(12, 'px'),
			'margin-bottom': locator.calcString(6, 'px'),
		},

		'.mimic_left .teaser_image .content': {
			'margin-left': locator.calcString(96, 'px'),
		},

		'.mimic_left .teaser_image .contacts__item_link': {
			'padding-right': locator.calcString(10, 'px'),
		},

		'.mimic_left .teaser .warning': {
			'clear': 'both',
			'padding-top': locator.calcString(2, 'px'),
			'padding-right': locator.calcString(3, 'px'),
			'padding-bottom': locator.calcString(2, 'px'),
			'padding-left': locator.calcString(3, 'px'),
			'margin-bottom': locator.calcString(6, 'px'),
			'border': '1px solid #dddcda',
		},

		'.mimic_left .teaser .contacts': {
			'clear': 'both',
			'font-size': locator.calcString(11, 'px'),
		},

		'.mimic_left .teaser:hover .picture .picture__content': {
			'transform': 'scale(1.02)',
		},

		'.mimic_left .teaser:hover .title': {
			'text-decoration': 'underline',
		},

		'.mimic_left .teaser:hover .contacts__item_link': {
			'text-decoration': 'underline',
		},
	};
};
