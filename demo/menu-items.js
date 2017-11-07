import R from 'ramda';
import {MenuItemTypes} from '../lib/context-menu-types';

const createSubMenus = (label, from, to, createActionsFunc) => R.map((ind) => ({
    children: createActionsFunc(ind),
    className: `submenu${ind}`,
    label: `${label} ${ind}`,
    title: `${label} ${ind}`,
    menuClassIcon: 'glyphicon glyphicon-road',
    type: MenuItemTypes.SUBMENU
}), R.range(from, to));

const createActions = (label, from, to) => R.map((ind) => ({
    action: `Action_${ind}`,
    className: `action${ind}`,
    label: `${label} ${ind}`,
    menuClassIcon: 'glyphicon glyphicon-home',
    title: `${label} ${ind}`,
    type: MenuItemTypes.ACTION
}), R.range(from, to));

const createUrls = (label, from, to) => R.map((ind) => ({
    className: `url${ind}`,
    label: `${label} ${ind}`,
    menuClassIcon: 'glyphicon glyphicon-new-window',
    target: '_blank',
    type: MenuItemTypes.URL,
    url: 'http://www.google.com'
}), R.range(from, to));

const createDivider = () => ({type: MenuItemTypes.DIVIDER});

export const items = [
    ...createActions('Action', 1, 10),
    createDivider(),
    ...createSubMenus('Menu', 11, 20, (ind) => createActions('Child Action', ind * 100, ind * 100 + 100)),
    createDivider(),
    ...createUrls('Url', 1, 10)
];