import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {buildSymbolicPath} from '../context-menu-service';
import {openSubMenu} from '../context-menu-dom-manipulation';
import MenuItem from '../menu-item/menu-item';

export default class SubMenuItem extends Component {
    static propTypes = {
        ind: PropTypes.number.isRequired,
        item: PropTypes.shape({
            className: PropTypes.string.isRequired,
            disabled: PropTypes.bool,
            label: PropTypes.string.isRequired,
            title: PropTypes.string
        }).isRequired,
        menuIconLabelClass: PropTypes.string.isRequired,
        path: PropTypes.array.isRequired,
        symbolicPath: PropTypes.array.isRequired
    };

    handleOpeningSubMenu = () => {
        const {ind, path} = this.props;
        openSubMenu([...path, ind]);
    };

    render() {
        const {item, menuIconLabelClass, symbolicPath} = this.props;
        const {className, disabled} = item;

        return <li
            className={classNames(className, 'dropdown-submenu', {disabled})}
            data-path={buildSymbolicPath(symbolicPath, className)}
            onMouseOver={this.handleOpeningSubMenu}>
            <MenuItem item={item} menuIconLabelClass={menuIconLabelClass}/>
        </li>;
    }
}