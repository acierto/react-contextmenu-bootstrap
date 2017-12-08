import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MenuIcon from './menu-icon';
import {MenuIconLabel} from './menu-icon-label';

export default class MenuItem extends Component {
    static propTypes = {
        handleClick: PropTypes.func,
        handleClosingSubMenu: PropTypes.func,
        href: PropTypes.string.isRequired,
        item: PropTypes.shape({
            menuClassIcon: PropTypes.string,
            menuIcon: PropTypes.string
        }).isRequired,
        menuIconLabel: PropTypes.string.isRequired
    };

    render() {
        const {
            handleClick, handleClosingSubMenu, href, item, menuIconLabel
        } = this.props;
        const {className, label, title} = item;

        const linkProps = {
            className,
            href,
            onClick: handleClick,
            onMouseOver: handleClosingSubMenu,
            tabIndex: -1,
            title
        };

        return <a {...linkProps}>
            <MenuIcon item={item}/>
            <MenuIconLabel label={label} menuIconLabel={menuIconLabel} title={title}/>
        </a>;
    }
}