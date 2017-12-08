import R from 'ramda';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const menuIconLabelClass = (items) => {
    const noIconsPresent = R.and(
        R.all(R.propSatisfies(R.isNil, 'menuIcon')),
        R.all(R.propSatisfies(R.isNil, 'menuIconClass'))
    )(items);

    return classNames({'menu-item-label': !noIconsPresent});
};

export class MenuIconLabel extends Component {
    static propTypes = {
        label: PropTypes.string.isRequired,
        menuIconLabelClass: PropTypes.string.isRequired,
        title: PropTypes.string
    };

    render() {
        const {label, menuIconLabelClass: labelClass, title} = this.props;
        return <span className={labelClass} title={title}>{label}</span>;
    }
}