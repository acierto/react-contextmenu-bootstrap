import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MenuIcon from './menu-icon';
import {MenuIconLabel} from './menu-icon-label';

export default class MenuItem extends Component {
    static propTypes = {
        className: PropTypes.string,
        handleClick: PropTypes.func,
        handleClosingSubMenu: PropTypes.func,
        href: PropTypes.string,
        hrefTarget: PropTypes.string,
        label: PropTypes.string,
        menuIconDescriptor: PropTypes.shape({
            menuIconClass: PropTypes.string,
            menuIconLabelClass: PropTypes.string.isRequired,
            menuIconPath: PropTypes.string
        }).isRequired,
        title: PropTypes.string
    };

    static defaultProps = {href: '#', hrefTarget: '_self'};

    render() {
        const {
            handleClick,
            handleClosingSubMenu,
            href,
            hrefTarget,
            className,
            label,
            title,
            menuIconDescriptor: {
                menuIconClass,
                menuIconLabelClass,
                menuIconPath
            }
        } = this.props;

        const linkProps = {
            className,
            href,
            onClick: handleClick,
            onMouseOver: handleClosingSubMenu,
            tabIndex: -1,
            target: hrefTarget,
            title
        };

        const menuIconLabelProps = {label, menuIconLabelClass, title};

        const menuIconProps = {menuIconClass, menuIconPath};

        return <a {...linkProps}>
            <MenuIcon {...menuIconProps}/>
            <MenuIconLabel {...menuIconLabelProps}/>
        </a>;
    }
}