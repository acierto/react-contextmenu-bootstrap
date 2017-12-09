import R from 'ramda';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {buildSymbolicPath} from '../context-menu-service';
import {hidePreviouslyOpenedMenus} from '../context-menu-dom-manipulation';
import MenuItem from '../menu-item/menu-item';

export default class UrlItem extends Component {
    static propTypes = {
        item: PropTypes.shape({
            className: PropTypes.string.isRequired,
            disabled: PropTypes.bool,
            hrefTarget: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            menuIconDescriptor: PropTypes.shape({
                menuIconClass: PropTypes.string,
                menuIconLabelClass: PropTypes.string.isRequired,
                menuIconPath: PropTypes.string
            }),
            title: PropTypes.string,
            url: PropTypes.string.isRequired
        }).isRequired,
        onCloseMenu: PropTypes.func.isRequired,
        path: PropTypes.array.isRequired,
        symbolicPath: PropTypes.array.isRequired
    };

    onClosingSubMenu = () => {
        hidePreviouslyOpenedMenus(R.length(this.props.path));
    };

    onCloseMenu = (item) => {
        this.props.onCloseMenu(item);
    };

    render() {
        const {item, symbolicPath} = this.props;
        const {
            className, disabled, hrefTarget, label, menuIconDescriptor, title, url
        } = item;

        return <li
            className={classNames({disabled})}
            data-path={buildSymbolicPath(symbolicPath, className)}>
            <MenuItem
                className={className}
                handleClick={this.onCloseMenu}
                handleClosingSubMenu={this.onClosingSubMenu}
                href={url}
                hrefTarget={hrefTarget}
                label={label}
                menuIconDescriptor={menuIconDescriptor}
                title={title}
            />
        </li>;
    }
}