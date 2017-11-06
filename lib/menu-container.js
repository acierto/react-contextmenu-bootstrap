import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class MenuContainer extends Component {
    static propTypes = {
        children: PropTypes.arrayOf(PropTypes.element).isRequired,
        isMultiLevel: PropTypes.bool.isRequired,
        maxHeight: PropTypes.number.isRequired,
        uniqueId: PropTypes.string.isRequired
    };

    render() {
        const {children, isMultiLevel, maxHeight, uniqueId} = this.props;
        return isMultiLevel ?
            <ul
                className={classNames('dropdown-menu', 'multi-level', uniqueId)}
                key={uniqueId}
                role="menu"
                style={{maxHeight}}>
                {children}
            </ul> :
            <ul
                className={classNames('dropdown-menu', uniqueId)}
                key={uniqueId}>
                {children}
            </ul>;
    }
}