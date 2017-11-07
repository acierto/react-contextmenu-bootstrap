import R from 'ramda';
import React, {Component} from 'react';
import {Button, ButtonToolbar} from 'react-bootstrap';
import ReactJson from 'react-json-view';
import {items} from './menu-items';
import {filterFlattenSubMenus} from '../lib/context-menu-service';
import ContextMenu from '../lib/contextmenu-component';
import 'bootstrap';

import './demo.less';

export default class DemoApp extends Component {

    constructor(props) {
        super(props);
        this.state = {show: false};
    }

    handleActionHandler = (item) => {
        this.setState({selectedItem: item});
    };

    handleOnClick = () => this.setState({items, show: true});

    closeMenuHandler = () => this.setState({items, show: false});

    render() {
        const {selectedItem, show} = this.state;
        return <div className="demo-page">
            <ContextMenu
                actionHandler={this.handleActionHandler}
                closeMenuHandler={this.closeMenuHandler}
                filterFlattenSubMenus={filterFlattenSubMenus}
                itemSelected={R.F}
                hideContextMenu={R.F}
                id={'this-context-menu'}
                items={items}
                show={show}
                target={document.getElementById('show-context-menu')}
            />

            <div className="control-buttons">
                <ButtonToolbar>
                    <Button
                        bsStyle="primary"
                        id="show-context-menu"
                        onClick={this.handleOnClick}
                    >
                        Show Context Menu
                    </Button>
                </ButtonToolbar>
            </div>
            <div className="output-result">
                {selectedItem && <ReactJson src={selectedItem}/>}
            </div>
        </div>;
    }
}