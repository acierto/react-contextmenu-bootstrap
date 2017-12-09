import R from 'ramda';
import React from 'react';
import PropTypes from 'prop-types';
import {MenuItemTypes} from './context-menu-types';

import ActionItem from './items/action-item';
import SubMenuItem from './items/sub-menu-item';
import UrlItem from './items/url-item';
import {menuIconLabelClass} from './menu-item/menu-icon-label';

/* eslint-disable complexity */
export const buildMenuItems = (props) => {
    const {
        actionHandler, closeMenuHandler, items, path, symbolicPath
    } = props;

    const transformItem = (item) => ({
        className: item.className,
        disabled: item.disabled,
        hrefTarget: item.hrefTarget,
        label: item.label,
        menuIconDescriptor: {
            menuIconClass: item.menuIconClass,
            menuIconLabelClass: menuIconLabelClass(items),
            menuIconPath: item.menuIconPath
        },
        params: item.params,
        target: item.target,
        title: item.title,
        url: item.url
    });

    return R.addIndex(R.map)((item, ind) => {
        const commonProps = {
            ind, item: transformItem(item), key: ind, path, symbolicPath
        };
        switch (item.type) {
            case MenuItemTypes.DIVIDER:
                return <li className="divider" key={ind} role="separator"/>;
            case MenuItemTypes.SUBMENU:
                return <SubMenuItem
                    {...commonProps}
                />;
            case MenuItemTypes.ACTION:
                return <ActionItem
                    actionHandler={actionHandler}
                    {...commonProps}
                />;
            case MenuItemTypes.URL:
                return <UrlItem
                    onCloseMenu={closeMenuHandler}
                    {...commonProps}
                />;
            default:
                return undefined;
        }
    }, items);
};
/* eslint-enable complexity */

buildMenuItems.propTypes = {
    actionHandler: PropTypes.func.isRequired,
    closeMenuHandler: PropTypes.func.isRequired,
    customActionHandler: PropTypes.func,
    items: PropTypes.array.isRequired,
    path: PropTypes.array.isRequired,
    symbolicPath: PropTypes.array.isRequired
};