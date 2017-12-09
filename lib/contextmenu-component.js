import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Q from 'q';
import {nextId} from './id-generator';
import Menus from './menus-component';
import {calcNewPosition} from './context-menu-dom-manipulation';
import './context-menu-component.less';

export default class ContextMenu extends Component {
    static propTypes = {
        actionHandler: PropTypes.func,
        closeMenuHandler: PropTypes.func.isRequired,
        composeMenu: PropTypes.func,
        customActionHandler: PropTypes.func,
        items: PropTypes.array.isRequired,
        placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
        show: PropTypes.bool.isRequired,
        target: PropTypes.object
    };

    static defaultProps = {placement: 'bottom'};

    state = {maxMenuHeight: 0};

    componentDidUpdate() {
        const {maxMenuHeight} = this.state;
        const {items, placement, target} = this.props;
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

    actionHandler = (item) => {
        Q.delay().then(() => {
            this.props.actionHandler(item);
        });

        this.props.closeMenuHandler();
    };

    overlay = () => {
        const {
            closeMenuHandler, customActionHandler, composeMenu, items, show, target
        } = this.props;
        const {maxMenuHeight, placement} = this.state;
        const subMenus = composeMenu(items);

        const overlayProps = {
            container: this,
            containerPadding: 20,
            key: nextId(),
            onHide: closeMenuHandler,
            placement,
            rootClose: true,
            show,
            target
        };

        const menuProps = {
            actionHandler: this.actionHandler,
            closeMenuHandler,
            customActionHandler,
            maxMenuHeight,
            overlayProps,
            subMenus
        };

        return <Menus {...menuProps}/>;
    };

    render() {
        return this.overlay();
    }
}
