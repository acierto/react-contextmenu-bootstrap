import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {buildSymbolicPath} from '../context-menu-service';
import {openSubMenu} from '../context-menu-dom-manipulation';
import MenuItem from '../menu-item/menu-item';

export default class SubMenuItem extends Component {
    static propTypes = {
        item: PropTypes.shape({
            className: PropTypes.string.isRequired,
            disabled: PropTypes.bool,
            label: PropTypes.string.isRequired,
            menuIconDescriptor: PropTypes.shape({
                menuIconClass: PropTypes.string,
                menuIconLabelClass: PropTypes.string.isRequired,
                menuIconPath: PropTypes.string
            }),
            title: PropTypes.string
        }).isRequired,
        path: PropTypes.array.isRequired,
        symbolicPath: PropTypes.array.isRequired
    };

    handleOpeningSubMenu = () => {
        const {ind, path} = this.props;
        openSubMenu([...path, ind]);
    };

    render() {
        const {item, symbolicPath} = this.props;
        const {className, disabled, label, menuIconDescriptor, title} = item;

        return <li
            className={classNames(className, 'dropdown-submenu', {disabled})}
            data-path={buildSymbolicPath(symbolicPath, className)}
            onMouseOver={this.handleOpeningSubMenu}>
            <MenuItem
                className={className}
                label={label}
                menuIconDescriptor={menuIconDescriptor}
                title={title}
            />
        </li>;
    }
}