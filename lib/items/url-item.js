import R from 'ramda';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {buildSymbolicPath} from '../context-menu-service';
import {hidePreviouslyOpenedMenus} from '../context-menu-dom-manipulation';
import MenuItem from '../menu-item/menu-item';

export default class UrlItem extends Component {
    static propTypes = {
        ind: PropTypes.number.isRequired,
        item: PropTypes.shape({
            className: PropTypes.string.isRequired,
            disabled: PropTypes.bool,
            label: PropTypes.string.isRequired,
            target: PropTypes.string.isRequired,
            title: PropTypes.string,
            url: PropTypes.string.isRequired
        }).isRequired,
        menuIconLabel: PropTypes.string.isRequired,
        onCloseMenu: PropTypes.func.isRequired,
        path: PropTypes.array.isRequired,
        symbolicPath: PropTypes.array.isRequired
    };

    handleClosingSubMenu = () => {
        hidePreviouslyOpenedMenus(R.length(this.props.path));
    };

    handleCloseMenu = (item) => {
        this.props.onCloseMenu(item);
    };

    render() {
        const {item, menuIconLabel, symbolicPath} = this.props;
        const {
            className, disabled, url
        } = item;

        return <li
            className={classNames({disabled})}
            data-path={buildSymbolicPath(symbolicPath, className)}>
            <MenuItem
                handleClick={this.handleCloseMenu}
                handleClosingSubMenu={this.handleClosingSubMenu}
                href={url}
                item={item}
                menuIconLabel={menuIconLabel}
            />
        </li>;
    }
}