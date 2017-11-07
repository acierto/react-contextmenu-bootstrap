import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class MenuIcon extends Component {
    static propTypes = {
        item: PropTypes.shape({
            menuClassIcon: PropTypes.string,
            menuIcon: PropTypes.string
        }).isRequired
    };

    render() {
        const {item: {menuClassIcon, menuIcon}} = this.props;
        if (menuIcon) {
            return <img className="menu-item-icon" src={menuIcon}/>;
        } else if (menuClassIcon) {
            return <span className={classNames('menu-item-icon', menuClassIcon)}/>;
        }
        return <span className="menu-item-icon no-icons-present"/>;
    }
}