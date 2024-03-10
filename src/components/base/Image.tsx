import * as React from 'react';
import * as Cid from 'smokescreen/Cid';

function imgSheet(className, width, height, src, locator) {
	const styleSheet = {}
	styleSheet['.' + className] = {
		'width': locator.calcString(width, 'px'),
		'height': locator.calcString(height, 'px'),
		'background-image': `url("${src}")`
	}
	return styleSheet;
}

export default (props) => {
	const { width, height, src, locator, className, ...otherProps } = props;

	const imgClassName = Cid();
	locator.insertSheet(imgSheet(imgClassName, width, height, src, locator));

	return (
		<div
			className={[className || '', imgClassName].join(' ').trim()}
			{...otherProps}
		></div>
	);
};
