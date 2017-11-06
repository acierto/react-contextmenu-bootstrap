import R from 'ramda';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {buildSymbolicPath} from '../context-menu-service';
import {hidePreviouslyOpenedMenus} from '../context-menu-dom-manipulation';
import MenuIcon from '../menu-icon';

export default class ActionItem extends Component {
    static propTypes = {
        actionHandler: PropTypes.func.isRequired,
        ind: PropTypes.number.isRequired,
        item: PropTypes.shape({
            className: PropTypes.string.isRequired,
            disabled: PropTypes.bool,
            label: PropTypes.string.isRequired
        }).isRequired,
        menuIconLabel: PropTypes.string.isRequired,
        path: PropTypes.array.isRequired,
        symbolicPath: PropTypes.array.isRequired,
        title: PropTypes.string.isRequired
    };

    handleClosingSubMenu = () => {
        hidePreviouslyOpenedMenus(R.length(this.props.path));
    };

    render() {
        const {
            actionHandler, item, menuIconLabel, symbolicPath, title
        } = this.props;
        const {className, disabled, label} = item;

        return <li
            className={classNames({disabled})}
            data-path={buildSymbolicPath(symbolicPath, className)}>
            <a
                className={className}
                href="#"
                onClick={actionHandler(item)}
                onMouseOver={this.handleClosingSubMenu}
                tabIndex="-1"
                title={title}>
                <MenuIcon item={item}/>
                <span className={menuIconLabel}>{label}</span>
            </a>
        </li>;
    }
}