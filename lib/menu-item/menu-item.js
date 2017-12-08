import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MenuIcon from './menu-icon';
import {MenuIconLabel} from './menu-icon-label';

export default class MenuItem extends Component {
    static propTypes = {
        handleClick: PropTypes.func,
        handleClosingSubMenu: PropTypes.func,
        href: PropTypes.string,
        item: PropTypes.shape({
            menuClassIcon: PropTypes.string,
            menuIcon: PropTypes.string
        }).isRequired,
        menuIconLabelClass: PropTypes.string.isRequired
    };

    static defaultProps = {href: '#'};

    render() {
        const {
            handleClick, handleClosingSubMenu, href, item, menuIconLabelClass
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

        const menuIconLabelProps = {label, menuIconLabelClass, title};

        return <a {...linkProps}>
            <MenuIcon item={item}/>
            <MenuIconLabel {...menuIconLabelProps}/>
        </a>;
    }
}