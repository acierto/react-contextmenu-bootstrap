# API 

## ContextMenu component

|Name|Type|Required|Description|
|---|---|---|---|
|actionHandler|PropTypes.func|false|Triggers when an _Action_ type option in context menu is selected|
|closeMenuHandler|PropTypes.func|true|Triggers when context menu is about to close|
|customActionHandler|PropTypes.func|false|Triggers when a _Custom_ type option in context menu is selected|
|composeMenu|PropTypes.func|false|Here you can compose your menu as you want to see it, all filtering, grouping, etc. has to be done here. By default there is defined a method for that, but you can always define your own|
|items|PropTypes.array|true|Initial data for menu. There are several types of items you can create: ACTION, DIVIDER, SUBMENU, URL|
|show|PropTypes.bool|true|Reflects the visibility of context menu|
|target|PropTypes.object|true|Here you need to specify the element for which context menu should be opened|

### Item types

#### ACTION item type

You need to use this type when clicking on it some action should occur. What exactly you want to do on this action, 
you have to decide in method *actionHandler*. Based on the information which you pass in params you can distinguish
what action is triggered. 

|Name|Type|Required|Description|
|---|---|---|---|
|className|string|false|CSS class name for text|
|label|string|true|Visible text|
|menuIconClass|string|false|CSS class name for the icon|
|params|object|false|Some specific data which you want to keep, i.e. action|
|title|string|false|Displayed title on hover. Can be used if too long text is not fit, or as a description|

#### SUBMENU item type

You need this type only when you need to create a submenu for a group of items. By clicking or hovering on this item
next level of sub-menu will be opened.

|Name|Type|Required|Description|
|---|---|---|---|
|children|array|true|Array of children items|
|className|string|false|CSS class name for text|
|label|string|true|Visible text|
|menuIconClass|string|false|CSS class name for the icon|
|title|string|false|Displayed title on hover. Can be used if too long text is not fit, or as a description|

#### URL item type

You need this type when you want to redirect to a specific url page.

|Name|Type|Required|Description|
|---|---|---|---|
|className|string|false|CSS class name for text|
|label|string|true|Visible text|
|menuIconClass|string|false|CSS class name for the icon|
|title|string|false|Displayed title on hover. Can be used if too long text is not fit, or as a description|
|url|string|true|URL link where you will be redirected to|