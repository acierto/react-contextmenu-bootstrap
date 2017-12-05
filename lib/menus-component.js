import R from 'ramda';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Overlay, Popover} from 'react-bootstrap';
import RU from './ramda-utils';
import {buildMenuItems} from './menu-component';
import MenuContainer from './menu-container';

import './context-menu-component.less';

export default class Menus extends Component {
    static propTypes = {
        actionHandler: PropTypes.func.isRequired,
        closeMenuHandler: PropTypes.func.isRequired,
        customActionHandler: PropTypes.func,
        maxMenuHeight: PropTypes.number.isRequired,
        overlayProps: PropTypes.object.isRequired,
        subMenus: PropTypes.array.isRequired
    };

    render() {
        const {
            actionHandler, closeMenuHandler, maxMenuHeight, overlayProps, subMenus
        } = this.props;

        return <Overlay {...overlayProps}>
            <Popover className="context-menu" id="context-menu-popover">
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
                            closeMenuHandler,
                            items,
                            path,
                            symbolicPath
                        })}
                    </MenuContainer>;
                }, subMenus)}
            </Popover>
        </Overlay>;
    }
}