import R from 'ramda';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {buildSymbolicPath} from '../context-menu-service';
import {hidePreviouslyOpenedMenus} from '../context-menu-dom-manipulation';
import MenuIcon from '../menu-icon';

export default class UrlItem extends Component {
    static propTypes = {
        customActionHandler: PropTypes.func.isRequired,
        ind: PropTypes.number.isRequired,
        item: PropTypes.shape({
            className: PropTypes.string.isRequired,
            disabled: PropTypes.bool,
            label: PropTypes.string.isRequired
        }).isRequired,
        menuIconLabel: PropTypes.string.isRequired,
        path: PropTypes.array.isRequired,
        symbolicPath: PropTypes.array.isRequired
    };

    handleClosingSubMenu = () => {
        hidePreviouslyOpenedMenus(R.length(this.props.path));
    };

    render() {
        const {customActionHandler, item, menuIconLabel, symbolicPath} = this.props;
        const {className, disabled, label} = item;

        return <li
            className={classNames({disabled})}
            data-path={buildSymbolicPath(symbolicPath, className)}>
            <a
                href="#"
                onClick={customActionHandler(item)}
                onMouseOver={this.handleClosingSubMenu}
                tabIndex="-1"
                title={label}>
                <MenuIcon item={item}/>
                <span className={menuIconLabel}>{label}</span>
            </a>
        </li>;
    }
}