import R from 'ramda';
import RU from './ramda-utils';

const withoutChildren = R.map(R.omit(['children']));

export const filterFlattenSubMenus = (items) => {
    const sliceMenu = R.curry((path, symbolicPath, currentItems) => {
        const slicedChildren = RU.indexedMap((child, index) => child.children ?
            sliceMenu([...path, index], [...symbolicPath, child.className], child.children) : [])(currentItems);

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

export const buildSymbolicPath = (symbolicPath, className) => R.join('->', [...symbolicPath, className]);