import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Q from 'q';
import RS from 'ramdasauce';
import {Overlay} from 'react-bootstrap';
import {nextId} from './id-generator';
import Menus from './menus-component';
import {calcNewPosition} from './context-menu-dom-manipulation';
import './context-menu-component.less';

export default class ContextMenu extends Component {
    static propTypes = {
        actionHandler: PropTypes.func,
        closeMenuHandler: PropTypes.func.isRequired,
        customActionHandler: PropTypes.func,
        filterFlattenSubMenus: PropTypes.func,
        hideContextMenu: PropTypes.func,
        id: PropTypes.string,
        items: PropTypes.array,
        itemSelected: PropTypes.func.isRequired,
        show: PropTypes.bool.isRequired,
        target: PropTypes.object
    };

    state = {maxMenuHeight: 0, placement: 'bottom'};

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

    actionHandler = (item) => {
        Q.delay().then(() => {
            this.props.actionHandler(item);
        });

        this.props.closeMenuHandler();
    };

    overlay = () => {
        const handleTarget = () => this.props.target;
        const {closeMenuHandler, items, show, target} = this.props;
        const {placement} = this.state;

        if (!RS.isNilOrEmpty(items) && target) {
            return <Overlay
                container={document.body} // eslint-disable-line no-undef
                key={nextId()}
                onHide={closeMenuHandler}
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
        const {closeMenuHandler, customActionHandler, items, filterFlattenSubMenus} = this.props;
        const subMenus = filterFlattenSubMenus(items);
        return <Menus
            actionHandler={this.actionHandler}
            closeMenuHandler={closeMenuHandler}
            customActionHandler={customActionHandler}
            maxMenuHeight={this.state.maxMenuHeight}
            subMenus={subMenus}
        />;
    };

    render() {
        return this.overlay();
    }
}
