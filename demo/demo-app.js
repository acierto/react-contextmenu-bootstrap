import R from 'ramda';
import React, {Component} from 'react';
import {items} from './menu-items';
import {filterFlattenSubMenus} from '../lib/context-menu-service';
import ContextMenu from '../lib/contextmenu-component';
import 'bootstrap';

export default class DemoApp extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    handleActionHandler = (item) => {
        console.log('Selected' , item);
    };

    handleOnClick = () => this.setState({items});

    render() {
        return <div>
            <ContextMenu
                actionHandler={this.handleActionHandler}
                filterFlattenSubMenus={filterFlattenSubMenus}
                itemSelected={R.F}
                hideContextMenu={R.F}
                id={'this-context-menu'}
                items={items}
                target={document.getElementById('show-context-menu')}
            />
            <button
                id="show-context-menu"
                onClick={this.handleOnClick}
                type="button">
                Show Context Menu
            </button>
        </div>;
    }
}