import R from 'ramda';
import React from 'react';
import PropTypes from 'prop-types';
import RU from './ramda-utils';
import {MenuItemTypes} from './context-menu-types';

import ActionItem from './items/action-item';
import SubMenuItem from './items/sub-menu-item';
import UrlItem from './items/url-item';
import CustomItem from './items/custom-item';
import {menuIconLabelClass} from './menu-icon-label';

/* eslint-disable complexity */
export const buildMenuItems = (props) => {
    const onCustomAction = (item) => {
        RU.invoke(['customActionHandler'], item, props);
    };

    const {
        actionHandler, closeMenuHandler, items, path, symbolicPath
    } = props;

    return R.addIndex(R.map)((item, ind) => {
        const commonProps = {
            ind, item, key: ind, menuIconLabel: menuIconLabelClass(items), path, symbolicPath
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
            case MenuItemTypes.CUSTOM:
                return <CustomItem
                    customActionHandler={onCustomAction}
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
    customActionHandler: PropTypes.func,
    items: PropTypes.array.isRequired,
    closeMenuHandler: PropTypes.func.isRequired,
    path: PropTypes.array.isRequired,
    symbolicPath: PropTypes.array.isRequired
};