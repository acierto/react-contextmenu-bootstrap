import R from 'ramda';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {buildSymbolicPath} from '../context-menu-service';
import {hidePreviouslyOpenedMenus} from '../context-menu-dom-manipulation';
import MenuItem from '../menu-item/menu-item';

export default class CustomItem extends Component {
    static propTypes = {
        customActionHandler: PropTypes.func.isRequired,
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

    onClosingSubMenu = () => {
        hidePreviouslyOpenedMenus(R.length(this.props.path));
    };

    render() {
        const {customActionHandler, item, menuIconLabelClass, symbolicPath} = this.props;
        const {className, disabled} = item;

        return <li
            className={classNames({disabled})}
            data-path={buildSymbolicPath(symbolicPath, className)}>
            <MenuItem
                handleClick={customActionHandler(item)}
                handleClosingSubMenu={this.onClosingSubMenu}
                item={item}
                menuIconLabelClass={menuIconLabelClass}
            />
        </li>;
    }
}