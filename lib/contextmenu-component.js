import React, {Component} from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import classNames from 'classnames';
import Q from 'q';
import RS from 'ramdasauce';
import {Overlay, Popover} from 'react-bootstrap';
import {nextId} from './id-generator';
import {MenuItemTypes} from './context-menu-types';
import RU from './ramda-utils';
import {
    hidePreviouslyOpenedMenus,
    mountUpdate,
    openSubMenu
} from './context-menu-dom-manipulation';
import './context-menu-component.less';

export default class ContextMenu extends Component {
    static propTypes = {
        customActionHandler: PropTypes.func,
        filterFlattenSubMenus: PropTypes.func,
        hideContextMenu: PropTypes.func,
        id: PropTypes.string,
        items: PropTypes.array,
        itemSelected: PropTypes.func.isRequired,
        target: PropTypes.object
    };

    state = {placement: 'bottom', show: true};

    componentWillReceiveProps({id, target}) {
        this.setState({
            id,
            show: !RS.isUndefined(target)
        });
    }

    componentDidUpdate() {
        const {items, target} = this.props;
        mountUpdate(items, this.state, target);
    }

    handleCloseMenu = () => {
        this.setState({show: false});
    };

    handleCustomAction = (item) => {
        RU.invoke(['customActionHandler'], item, this.props);
    };

    actionHandler = (item) => () => {
        Q.delay().then(() => {
            this.props.itemSelected({
                action: item.action,
                entityId: this.props.id,
                entityType: item.ciType,
                user: item.user
            });
        });

        this.handleCloseMenu();
    };

    /* eslint-disable complexity */
    buildMenuContent = ({items, path, symbolicPath}) => {
        const buildSymbolicPath = (item) => R.join('->', [...symbolicPath, item.className]);

        const noIconsPresent = R.all(R.propSatisfies(R.isNil, 'menuIcon'), items);

        const menuIconLabel = classNames({'menu-item-label': !noIconsPresent});

        const menuIcon = (item) => {
            if (item.menuIcon) {
                return <img className="menu-item-icon" src={item.menuIcon}/>;
            } else if (item.menuClassIcon) {
                return <span className={classNames('menu-item-icon', item.menuClassIcon)}/>;
            }
            return <span className="menu-item-icon no-icons-present"/>;
        };

        return R.addIndex(R.map)((item, ind) => {
            const dataPath = buildSymbolicPath(item);
            const key = ind;
            const handleOpeningSubMenu = () => {
                openSubMenu([...path, ind]);
            };
            const handleClosingSubMenu = () => {
                hidePreviouslyOpenedMenus(R.length(path));
            };
            switch (item.type) {
                case MenuItemTypes.DIVIDER:
                    return <li className="divider" key={key} role="separator"/>;
                case MenuItemTypes.SUBMENU:
                    return <li
                        className={classNames(item.className, 'dropdown-submenu', {disabled: item.disabled})}
                        data-path={dataPath}
                        key={key}
                        onMouseOver={handleOpeningSubMenu}>
                        <a href="#" tabIndex="-1" title={item.label}>
                            {menuIcon(item)}
                            <span className={menuIconLabel}>{item.label}</span>
                        </a>
                    </li>;
                case MenuItemTypes.ACTION:
                    return <li
                        className={classNames({disabled: item.disabled})}
                        data-path={dataPath}
                        key={key}>
                        <a
                            className={item.className}
                            href="#"
                            onClick={this.actionHandler(item)}
                            onMouseOver={handleClosingSubMenu}
                            tabIndex="-1"
                            title={item.ciType || item.label}>
                            {menuIcon(item)}
                            <span className={menuIconLabel}>{item.label}</span>
                        </a>
                    </li>;
                case MenuItemTypes.CUSTOM:
                    return <li
                        className={classNames({disabled: item.disabled})}
                        data-path={dataPath}
                        key={key}>
                        <a
                            href="#"
                            onClick={this.handleCustomAction(item)}
                            onMouseOver={handleClosingSubMenu}
                            tabIndex="-1"
                            title={item.label}>
                            {menuIcon(item)}
                            <span className={menuIconLabel}>{item.label}</span>
                        </a>
                    </li>;
                case MenuItemTypes.URL:
                    return <li data-path={dataPath} key={key}>
                        <a
                            className={item.className}
                            href={item.url}
                            onClick={this.handleCloseMenu}
                            onMouseOver={handleClosingSubMenu}
                            tabIndex="-1"
                            target={item.target}
                            title={item.label}>
                            {menuIcon(item)}
                            <span className={menuIconLabel}>{item.label}</span>
                        </a>
                    </li>;
                default:
                    return undefined;
            }
        }, items);
    };

    /* eslint-enable complexity */
    buildMenus = (subMenus = []) => R.map((subMenu) => {
        const {path} = subMenu;
        const uniqueId = `dropdown-menu-${R.join('-', path)}`;
        if (R.equals(path, [0])) {
            const className = classNames('dropdown-menu', 'multi-level', uniqueId);
            return <ul
                className={className}
                key={uniqueId}
                role="menu"
                style={{maxHeight: this.state.maxMenuHeight}}>
                {this.buildMenuContent(subMenu)}
            </ul>;
        }

        const className = classNames('dropdown-menu', uniqueId);
        return <ul className={className} key={uniqueId}>
            {this.buildMenuContent(subMenu)}
        </ul>;
    }, subMenus);

    overlay = () => {
        const handleTarget = () => this.props.target;
        const {items, target} = this.props;
        const {placement, show} = this.state;

        if (!RS.isNilOrEmpty(items) && target) {
            return <Overlay
                container={document.body} // eslint-disable-line no-undef
                key={nextId()}
                onHide={this.handleCloseMenu}
                placement={placement}
                rootClose={true}
                show={show}
                target={handleTarget}>
                {this.popover()}
            </Overlay>;
        }
        return null;
    };

    popover = () => {
        const subMenus = this.props.filterFlattenSubMenus(this.props.items);
        return <Popover className="context-menu" id="context-menu-popover">
            {this.buildMenus(subMenus)}
        </Popover>;
    };

    render() {
        return this.overlay();
    }
}
