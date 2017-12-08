import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class MenuIcon extends Component {
    static propTypes = {
        menuIconClass: PropTypes.string,
        menuIconPath: PropTypes.string
    };

    render() {
        const {menuIconClass, menuIconPath} = this.props;
        if (menuIconPath) {
            return <img className="menu-item-icon" src={menuIconPath}/>;
        } else if (menuIconClass) {
            return <span className={classNames('menu-item-icon', menuIconClass)}/>;
        }
        return <span className="menu-item-icon no-icons-present"/>;
    }
}