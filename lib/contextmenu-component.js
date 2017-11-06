import React, {Component} from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import classNames from 'classnames';
import Q from 'q';
import RS from 'ramdasauce';
import {Overlay, Popover} from 'react-bootstrap';
import {nextId} from './id-generator';
import {MenuItemTypes} from './context-menu-types';
import MenuIcon from './menu-icon';
import ActionItem from './items/action-item';
import SubMenuItem from './items/sub-menu-item';
import UrlItem from './items/url-item';
import RU from './ramda-utils';
import {
    calcNewPosition,
    hidePreviouslyOpenedMenus
} from './context-menu-dom-manipulation';
import './context-menu-component.less';

export default class ContextMenu extends Component {
    static propTypes = {
        actionHandler: PropTypes.func,
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
        const {maxMenuHeight, placement} = this.state;
        const {items, target} = this.props;
        const {
            hasStateToBeUpdated,
            newMaxMenuHeight,
            newPlacement
        } = calcNewPosition(items, maxMenuHeight, placement, target);

        if (hasStateToBeUpdated) {
            this.setState({ // eslint-disable-line react/no-did-update-set-state
                maxMenuHeight: newMaxMenuHeight,
                placement: newPlacement
            });
        }
    }

    handleCloseMenu = () => {
        this.setState({show: false});
    };

    onCustomAction = (item) => {
        RU.invoke(['customActionHandler'], item, this.props);
    };

    actionHandler = (item) => () => {
        Q.delay().then(() => {
            this.props.actionHandler(item);
        });

        this.handleCloseMenu();
    };

    /* eslint-disable complexity */
    buildMenuContent = ({items, path, symbolicPath}) => {
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
                        actionHandler={this.actionHandler}
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
                        customActionHandler={this.onCustomAction}
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
                            onClick={this.handleCloseMenu}
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
