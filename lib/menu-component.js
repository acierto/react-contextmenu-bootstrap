import R from 'ramda';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import RU from './ramda-utils';
import {MenuItemTypes} from './context-menu-types';
import {hidePreviouslyOpenedMenus} from './context-menu-dom-manipulation';

import ActionItem from './items/action-item';
import SubMenuItem from './items/sub-menu-item';
import UrlItem from './items/url-item';
import MenuIcon from './menu-icon';

/* eslint-disable complexity */
export const buildMenuItems = (props) => {
    const onCustomAction = (item) => {
        RU.invoke(['customActionHandler'], item, props);
    };

    const {
        actionHandler, onCloseMenuHandler, items, path, symbolicPath
    } = props;

    const buildSymbolicPath = (item) => R.join('->', [...symbolicPath, item.className]);

    const noIconsPresent = R.all(R.propSatisfies(R.isNil, 'menuIcon'), items);

    const menuIconLabel = classNames({'menu-item-label': !noIconsPresent});

    return R.addIndex(R.map)((item, ind) => {
        const dataPath = buildSymbolicPath(item);
        const key = ind;
        const handleClosingSubMenu = () => {
            hidePreviouslyOpenedMenus(R.length(path));
        };
        switch (item.type) {
            case MenuItemTypes.DIVIDER:
                return <li className="divider" key={key} role="separator"/>;
            case MenuItemTypes.SUBMENU:
                return <SubMenuItem
                    ind={ind}
                    item={item}
                    key={ind}
                    menuIconLabel={menuIconLabel}
                    path={path}
                    symbolicPath={symbolicPath}
                />;
            case MenuItemTypes.ACTION:
                return <ActionItem
                    actionHandler={actionHandler}
                    ind={ind}
                    item={item}
                    key={ind}
                    menuIconLabel={menuIconLabel}
                    path={path}
                    symbolicPath={symbolicPath}
                    title={item.ciType || item.label}
                />;
            case MenuItemTypes.CUSTOM:
                return <UrlItem
                    customActionHandler={onCustomAction}
                    ind={ind}
                    item={item}
                    menuIconLabel={menuIconLabel}
                    path={path}
                    symbolicPath={symbolicPath}
                />;
            case MenuItemTypes.URL:
                return <li data-path={dataPath} key={key}>
                    <a
                        className={item.className}
                        href={item.url}
                        onClick={onCloseMenuHandler}
                        onMouseOver={handleClosingSubMenu}
                        tabIndex="-1"
                        target={item.target}
                        title={item.label}>
                        <MenuIcon item={item}/>
                        <span className={menuIconLabel}>{item.label}</span>
                    </a>
                </li>;
            default:
                return undefined;
        }
    }, items);
};
/* eslint-enable complexity */

buildMenuItems.propTypes = {
    actionHandler: PropTypes.func.isRequired,
    customActionHandler: PropTypes.func,
    items: PropTypes.array.isRequired,
    onCloseMenuHandler: PropTypes.func.isRequired,
    path: PropTypes.array.isRequired,
    symbolicPath: PropTypes.array.isRequired
};