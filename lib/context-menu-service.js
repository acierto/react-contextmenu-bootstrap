import R from 'ramda';
import RU from './ramda-utils';

import {MenuItemTypes} from './context-menu-types';

const createClassName = (name) => R.reduce((acc, token) => {
    if (R.isEmpty(acc)) {
        return R.toLower(token);
    }
    return acc + RU.capitalize(token);
}, '')(name.split(' '));

export const createAction = (label, actionName, menuIcon, ciType) => ({
    action: actionName,
    ciType,
    className: createClassName(label),
    label,
    menuIcon,
    type: MenuItemTypes.ACTION
});

export const createSubmenu = (label, children, menuIcon) => ({
    children,
    className: createClassName(label),
    label,
    menuIcon,
    type: MenuItemTypes.SUBMENU
});

export const createUrl = (label, url, menuIcon, target = '_self') => ({
    className: createClassName(label),
    label,
    menuIcon,
    target,
    type: MenuItemTypes.URL,
    url
});

export const DIVIDER = {type: MenuItemTypes.DIVIDER};

const withoutChildren = R.map(R.omit(['children']));

export const filterFlattenSubMenus = (items) => {
    const sliceMenu = R.curry((path, symbolicPath, currentItems) => {
        const slicedChildren = RU.indexedMap((child, index) => child.children ? sliceMenu(
            [...path, index],
            [...symbolicPath, child.className],
            child.children
        ) : [])(currentItems);

        return [
            {items: withoutChildren(currentItems), path, symbolicPath},
            ...slicedChildren
        ];
    });

    return R.pipe(
        sliceMenu([0], []),
        R.flatten
    )(items);
};
