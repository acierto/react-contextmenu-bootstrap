# API 

## ContextMenu component

|Name|Type|Required|Description|
|---|---|---|---|
|actionHandler|PropTypes.func|false|Triggers when an _Action_ type option in context menu is selected|
|closeMenuHandler|PropTypes.func|true|Triggers when context menu is about to close|
|customActionHandler|PropTypes.func|false|Triggers when a _Custom_ type option in context menu is selected|
|composeMenu|PropTypes.func|false|Here you can compose your menu as you want to see it, all filtering, grouping, etc. has to be done here. By default there is defined a method for that, but you can always define your own|
|items|PropTypes.array|true|Initial data for menu. There are several types of items you can create: ACTION, CUSTOM, DIVIDER, SUBMENU, URL|
|show|PropTypes.bool|true|Reflects the visibility of context menu|
|target|PropTypes.object|true|Here you need to specify the element for which context menu should be opened|

### Item types

#### ACTION item type

|Name|Type|Required|Description|
|---|---|---|---|
|actionHandler|PropTypes.func|true|Triggers when an _Action_ type option in context menu is selected|
|item|Item shape|true|Contains all data about the context menu item|
|menuIconLabelClass|PropTypes.string|true||
|path|PropTypes.array|true||
|symbolicPath|PropTypes.array|true||
