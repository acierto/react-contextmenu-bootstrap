import R from 'ramda';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const menuIconLabelClass = (items) => {
    const noIconsPresent = R.and(
        R.all(R.propSatisfies(R.isNil, 'menuIcon')),
        R.all(R.propSatisfies(R.isNil, 'menuClassIcon'))
    )(items);

    return classNames({'menu-item-label': !noIconsPresent});
};

export class MenuIconLabel extends Component {
    static propTypes = {
        label: PropTypes.string.isRequired,
        menuIconLabel: PropTypes.string.isRequired,
        title: PropTypes.string
    };

    render() {
        const {label, menuIconLabel, title} = this.props;
        return <span className={menuIconLabel} title={title}>{label}</span>;
    }
}