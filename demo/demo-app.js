import R from 'ramda';
import React, {Component} from 'react';
import {Button, ButtonToolbar} from 'react-bootstrap';
import ReactJson from 'react-json-view';
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
        this.setState({selectedItem: item});
    };

    handleOnClick = () => this.setState({items});

    render() {
        const {selectedItem} = this.state;
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

            <ButtonToolbar>
                <Button
                    bsStyle="primary"
                    id="show-context-menu"
                    onClick={this.handleOnClick}
                >
                    Show Context Menu
                </Button>
            </ButtonToolbar>

            <div>
                {selectedItem && <ReactJson src={selectedItem}/>}
            </div>
        </div>;
    }
}