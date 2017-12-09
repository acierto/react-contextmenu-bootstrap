import $ from 'jquery';
import R from 'ramda';

const MENU_WIDTH = 200;
export const MENU_ITEM_HEIGHT = 37;
export const MENU_PADDING = 12;

const openedMenu = {};

export const calcNewPosition = (items, maxMenuHeight, placement, target) => {
    const getMenuStartPoint = () => target && $(target).offset().top || 0;
    const isTopPlacement = (menuStartPoint) => {
        const space = window.innerHeight - menuStartPoint;
        const menuHeight = MENU_ITEM_HEIGHT * R.length(items) + MENU_PADDING;
        const topPartHasMoreSpaceThanBottom = menuStartPoint > window.innerHeight - menuStartPoint;
        return space < menuHeight && topPartHasMoreSpaceThanBottom;
    };
    const getMaxMenuHeight = (hasTopPlacement, menuStartPoint) =>
        -MENU_ITEM_HEIGHT + (hasTopPlacement ? menuStartPoint : window.innerHeight - menuStartPoint - MENU_PADDING);

    const menuStartPoint = getMenuStartPoint();
    const hasTopPlacement = isTopPlacement(menuStartPoint);

    const newPlacement = hasTopPlacement ? 'top' : 'bottom';
    const newMaxMenuHeight = getMaxMenuHeight(hasTopPlacement, menuStartPoint);

    return {
        hasStateToBeUpdated: placement !== newPlacement || maxMenuHeight !== newMaxMenuHeight,
        newMaxMenuHeight,
        newPlacement
    };
};

const menuSelector = (path) => $(`.dropdown-menu-${R.join('-', path)}`);

const getCurrentLevelMenu = (path) => {
    const currentMenuLevel = R.length(path) - 1;
    const currentlyOpenedMenu = openedMenu[currentMenuLevel];
    const haveToFindBySelector = R.isNil(currentlyOpenedMenu) && currentMenuLevel === 0;
    return haveToFindBySelector ? menuSelector(path) : currentlyOpenedMenu.menu;
};

export const hidePreviouslyOpenedMenus = (fromLevel) => {
    const filtered = R.pipe(
        R.keys,
        R.map(R.filter(R.lte(fromLevel))),
        R.flatten
    )(openedMenu);
    R.forEach((menuIndex) => {
        if (openedMenu[menuIndex]) {
            openedMenu[menuIndex].menu.removeClass('active');
            openedMenu[menuIndex] = undefined;
        }
    }, filtered);
};

export const openSubMenu = (path) => {
    const currentMenuPath = R.dropLast(1, path);
    const currentMenuLevel = R.length(currentMenuPath) - 1;
    const nextLevel = R.length(path) - 1;
    hidePreviouslyOpenedMenus(nextLevel);

    const currentLevelMenu = getCurrentLevelMenu(currentMenuPath);
    const windowHeight = $(window).height();
    const maxMenuHeight = windowHeight - MENU_PADDING * 2;
    const nextLevelMenu = menuSelector(path);

    const liChildIndex = R.last(path) + 1;
    const currentlySelectedItemSelector = `li:nth-child(${liChildIndex})`;
    const currentLevelMenuTopPos = currentLevelMenu.offset().top;

    const currentLevelMenuItemTopPos = currentLevelMenu.find(currentlySelectedItemSelector).offset().top;
    let nextLevelMenuHeight = nextLevelMenu.height() + MENU_PADDING;
    if (nextLevelMenuHeight > maxMenuHeight) {
        nextLevelMenu.css('height', maxMenuHeight);
        nextLevelMenu.css('overflow', 'auto');
        nextLevelMenuHeight = maxMenuHeight;
    }
    const relativeItemPosition = currentLevelMenuItemTopPos - currentLevelMenuTopPos;
    const getStartPosition = () => currentMenuLevel === 0 ?
        relativeItemPosition : relativeItemPosition + currentLevelMenu.position().top;

    const vSpaceForNextLevelMenu = windowHeight - currentLevelMenuItemTopPos - MENU_PADDING;
    const isEnoughSpaceToShowMenu = vSpaceForNextLevelMenu - nextLevelMenuHeight > 0;
    const nextLevelMenuTopPosition = getStartPosition() +
        (isEnoughSpaceToShowMenu ? 0 : vSpaceForNextLevelMenu - nextLevelMenuHeight);

    nextLevelMenu.css('top', nextLevelMenuTopPosition);

    nextLevelMenu.addClass('active');
    nextLevelMenu.css('left', nextLevel * MENU_WIDTH);
    openedMenu[nextLevel] = {
        level: currentMenuLevel,
        menu: nextLevelMenu
    };
};
