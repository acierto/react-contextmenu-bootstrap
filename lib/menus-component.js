import R from 'ramda';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Popover} from 'react-bootstrap';
import RU from './ramda-utils';
import {buildMenuItems} from './menu-component';
import MenuContainer from './menu-container';

export default class Menus extends Component {
    static propTypes = {
        actionHandler: PropTypes.func.isRequired,
        customActionHandler: PropTypes.func,
        maxMenuHeight: PropTypes.number.isRequired,
        onCloseMenuHandler: PropTypes.func.isRequired,
        subMenus: PropTypes.array.isRequired
    };

    render() {
        const {actionHandler, maxMenuHeight, onCloseMenuHandler, subMenus} = this.props;

        return <Popover className="context-menu" id="context-menu-popover">
            {RU.indexedMap((subMenu, index) => {
                const {items, path, symbolicPath} = subMenu;
                const uniqueId = `dropdown-menu-${R.join('-', path)}`;

                return <MenuContainer
                    isMultiLevel={R.equals(path, [0])}
                    key={index}
                    maxHeight={maxMenuHeight}
                    uniqueId={uniqueId}>
                    {buildMenuItems({
                        actionHandler,
                        items,
                        onCloseMenuHandler,
                        path,
                        symbolicPath
                    })}
                </MenuContainer>;
            }, subMenus)}
        </Popover>;
    }
}