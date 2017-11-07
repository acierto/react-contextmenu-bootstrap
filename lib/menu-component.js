import R from 'ramda';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import RU from './ramda-utils';
import {MenuItemTypes} from './context-menu-types';

import ActionItem from './items/action-item';
import SubMenuItem from './items/sub-menu-item';
import UrlItem from './items/url-item';
import CustomItem from './items/custom-item';

/* eslint-disable complexity */
export const buildMenuItems = (props) => {
    const onCustomAction = (item) => {
        RU.invoke(['customActionHandler'], item, props);
    };

    const {
        actionHandler, onCloseMenuHandler, items, path, symbolicPath
    } = props;

    const noIconsPresent = R.all(R.propSatisfies(R.isNil, 'menuIcon'), items);

    const menuIconLabel = classNames({'menu-item-label': !noIconsPresent});

    return R.addIndex(R.map)((item, ind) => {
        const commonProps = {
            ind, item, key: ind, menuIconLabel, path, symbolicPath
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
                    onCloseMenu={onCloseMenuHandler}
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
    onCloseMenuHandler: PropTypes.func.isRequired,
    path: PropTypes.array.isRequired,
    symbolicPath: PropTypes.array.isRequired
};