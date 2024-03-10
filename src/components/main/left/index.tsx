import * as React from 'react';

import {updateStyle} from '../../../utils/slotSheet';

import Block from '../../base/Block';

import sheet from './styles';

import Teaser from './teaser/index';

let style = null;

export default class extends React.Component<any> {

	componentWillMount() {
		const {
			locator,
		} = this.props;

		style = updateStyle(style, locator, sheet(locator));
	}

	render() {
		const {
			items,
			transform,
			locator,
		} = this.props;

		return (
			<Block className={transform('wrapper wrapper_frame')}>
				{items.map((item, index) => (
					<Teaser
						item={item}
						index={index}
						transform={transform}
						locator={locator}
						key={index}
					/>
				))}
			</Block>
		);
	}
}
