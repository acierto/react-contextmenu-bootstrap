import R from 'ramda';

const createSubMenus = (label, from, to, createActionsFunc) => R.map((ind) => ({
    action: `Action_${ind}`,
    children: createActionsFunc(ind),
    className: `action${ind}`,
    label: `${label} ${ind}`,
    type: 'SUBMENU'
}), R.range(from, to));

const createActions = (label, from, to) => R.map((ind) => ({
    action: `Action_${ind}`,
    className: `action${ind}`,
    label: `${label} ${ind}`,
    type: 'ACTION'
}), R.range(from, to));

const createDivider = () => ({"type": "DIVIDER"});

export const items = [
    ...createActions('Action', 1, 10),
    createDivider(),
    ...createSubMenus('Menu', 11, 20, (ind) => createActions('Child Action', ind * 100, ind * 100 + 100))
];