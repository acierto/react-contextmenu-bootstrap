import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {buildSymbolicPath} from '../context-menu-service';
import {openSubMenu} from '../context-menu-dom-manipulation';
import MenuIcon from '../menu-icon';
import {MenuIconLabel} from '../menu-icon-label';

export default class SubMenuItem extends Component {
    static propTypes = {
        ind: PropTypes.number.isRequired,
        item: PropTypes.shape({
            className: PropTypes.string.isRequired,
            disabled: PropTypes.bool,
            label: PropTypes.string.isRequired,
            title: PropTypes.string
        }).isRequired,
        menuIconLabel: PropTypes.string.isRequired,
        path: PropTypes.array.isRequired,
        symbolicPath: PropTypes.array.isRequired
    };

    handleOpeningSubMenu = () => {
        const {ind, path} = this.props;
        openSubMenu([...path, ind]);
    };

    render() {
        const {item, menuIconLabel, symbolicPath} = this.props;
        const {className, disabled, label, title} = item;

        return <li
            className={classNames(className, 'dropdown-submenu', {disabled})}
            data-path={buildSymbolicPath(symbolicPath, className)}
            onMouseOver={this.handleOpeningSubMenu}>
            <a href="#" tabIndex="-1" title={label}>
                <MenuIcon item={item}/>
                <MenuIconLabel label={label} menuIconLabel={menuIconLabel} title={title}/>
            </a>
        </li>;
    }
}