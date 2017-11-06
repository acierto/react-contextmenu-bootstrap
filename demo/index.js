import R from 'ramda';
import React from 'react';
import {render} from 'react-dom';

import ContextMenu from '../lib/contextmenu-component';

render(<ContextMenu
    itemSelected={R.F}
    items={[
        {
            "action": "DEPLOY_LATEST_CI_SELECT_ENV",
            "className": "deployLatest",
            "label": "Deploy latest",
            "type": "ACTION",
            "disabled": false
        }
    ]}
    target={document.getElementById('show-context-menu')}
/>, document.getElementById('root'));