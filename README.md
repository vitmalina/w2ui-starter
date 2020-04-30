# w2ui-starter

If you are using w2ui and looking for a small, non-oppininated way to organize your code - look no further. This repository is small, modular, easily extensible boiler plate to build apps with w2ui.

The purpose of this repository is to be a starting point and give structure to your project. It is primarely a front-end framework and does not care what server side language you use. I have included static json files for you to play with. The front-end code is completely separated from the back-end code. All communication is done passing JSON files.

I have included latest jQuery and w2ui in the `src/libs` folder. You are welcome to add any other library you want. I often include some charting library (D3 usually), Monaco, and formely Underscore or Lodash. In the past I have used it with ReactJS, RivetsJS, VueJS and many other libraries. However, I would not recomment including any major framework such as Angular, Ember, Flux, etc. as they work better when they take over your application logic completely, though it is up to you.

## File Structure

Clone github repository and open /src folder. This is where all front-end code is. You will find the following strucutre:

```sh
/app            - all front-end code is here
  /less         - global less files
  /icons        - svg files for icons and generated icon font
  /main         - layout and main menus
    global.css  - config for all modules
    global.less - config for all modules
    modules.js  - config for all modules
    start.js    - starting point
/libs           - JS libraries that you want to use
index.html      - starting point
```

Open index.html in your browser and enjoy

## Gulp

You will find gulfile.js in the project that configured to compile you LESS files, icon-font and bundle up your application. If you run gulp without params it will compile LESS files in place. You can also run

```sh
gulp dev       # start watching .less and .svg files
gulp build     # bundles project into /build folder
```

# Getting Started

Open `src/app/index.html` in the browser to see the app. The index file is minimal and provides generic structure for the applications layout, includes all necessary JS libraries and global css files.

All application logic start with `src/app/start.js` file. You can see annotated version of that file below.

```js
$(function () {
    // application name
    app._conf.name = "MyApp"
    app.context = '../'
    var loc = String(document.location)
    if (loc.substr(0, 5) != 'file:' && loc.substr(0, 16) != 'http://localhost') app.context = ''

    // load module definitions
    app.define('app/modules.js', function () {
        // load main module
        app.require('main', function () {
            app.main.init() // will show all panels
            app.route.init('/home') // if no route is defined, it will open /home
        })
    })
})
```

## App Variatble

There will be one global variable `app` that holds references to all modules loaded for your application. Remember that modules are lazy-loaded, which means they do not get all loaded on start. You may define a route pattern for the modules and it will get auto-loaded on that route pattern (one time). There are a few methods in app that are useful:

### *app.\_conf*
Holds information about all registered modules and whether they are loaded or not.

### *app.define(module)*

Defines a module and its assets. You can pass an object with module definition or a string. If it is a string it will assume it is a file path to module definitions. See /app/modules.js for a sample.

### *app.require(name, callBack)*

Loads a module and its assets asyncronously. The name can be a string or an array of strings. And it will load a single module or a set of modules (all asynchronously) before executing the callBack. If you need to ensure specific order in which modules should be loaded - nest app.require() in the callBack of another app.required().

### *app.register(name, moduleFunction)*

Registers a module with name and its corresponding moduleFunction, which holds the logic of your module.
Modules can be loaded automatically by setting up a route, if route pattern is defined in module definition. See /app/modules.js for an example.

# Modules

## Create New

To create a new module, you need to do 2 things.

### 1. Create Module File
Create a folder in `src/app` directory and name it mod1. Then create a file `mod1.js` in that directory with the following content.
```js
app.register('mod1', function (files) {
    // private scope

    init()
    return {
        // public methods and properties
    }

    // implementation

    function init() {
        app.route.add({
            "/mod1" : function (route, params) {
                console.log('do something')
            }
        })
    }
})
```
Whatever you return in the module funtion will be available to other modules in `app.mod1[method_name]` notation. Everything else will be private for the module and only available inside the module function.

### 2. Register Module

Add the following block of code in the `src/app/modules.js` in a way similar to other modules already there.
```js
"mod1": {
    "route": "/mod1*",
    "start": "app/mod1/mod1.js"
}
```
Navigate to `index.html#/mod1` and your modules will be loaded and route event triggered.

## Assets

A module is a collection of related files (js, html, css, json, etc.) that implements a particular functionality. It should occupy its own folder where all the module files and resources are located. Below is the sample folder structure of the module that has many resources
```sh
/app
  /mod1
    /views               - module resources
      /create.html
      /create.css
      /overview.html
      /overview.css
      ...
    conf.js              - all w2ui widget configurations
    mod1.js              - main module file
```
You need to define these resources in `src/app/modules.js` in the following way:

```json
"mod1": {
    "assets": [
        "app/mod1/cond.js",
        "app/mod1/views/create.html",
        "app/mod1/views/create.css",
        "app/mod1/views/overview.html",
        "app/mod1/views/overview.css"
    ],
    "route": "/mod1*",
    "start": "app/mod1/mod1.js"
}
```
All assets will be passed to the module function as first argument, which is an onbject with content of all files:

```js
app.register('mod1', function (files) {
    // private scope

    init()
    return {
        // public methods and properties
    }

    function init() {
        console.log('Assets:', assets)
    }
})
```

## Loading the Module

The module will be loaded if you follow a module route or can be loaded directly with app.require method in the following way.

```js
app.required('modName', function () {
    // called when module and all its assets are loaded
})
```

# Routes

The `app.route` module is part of the boiler plater and immediately available. There are a number of methods and events available to you.

### *app.route.add(route, callBack)*
Adds a route. You can add multiple at the same time if you pass an object to `add` method, where kye is the routes and value is its callBack

```js
app.route.add({
    // exact route
    "/home" : function (route, params) {
        console.log(route, params);
    },
    // wild card route
    "/home/*" : function (route, params) {
        console.log(route, params);
    },
    // route with variables
    "/home/:id/view/:class" : function (route, params) {
        console.log(route, params);
    }
})
```

### *app.route.get()*
Returns currnet route.

### *app.route.go(route)*
Navigate to the route and triggers change enent.

### *app.route.init([defaultRoute])*
Initializes router module and sets defaultRoute.

### *app.route.list()*
Returns all registered routes.

### *app.route.remove(route)*
Removes specified route.

### *app.route.set(route)*
Sets route silently without triggering change events.

## Events
Events are only available is you include w2ui as it takes them from w2utils.

### *app.route.on('add', callBack)*
Event that is triggered when a new route is added. Callback function will receive an event object with additional information.

### *app.route.on('remove', callBack)*
Event that is triggered when a route is removed. Callback function will receive an event object with additional information.

### *app.route.on('route', callBack)*
Event that is triggered when a route is processed. Callback function will receive an event object with additional information

## Example

Routes should be added in the main module file, however a module might not be loaded yet. You can specify a pattern for module routes in the modules.js and if a route is not yet registered, but matches module pattern, then the module will be loaded automatically.

```js
"mod1": {
    "assets": [
       ...
    ],
    "route": "/mod1*",
    "start": "app/mod1/mod1.js"
}
```
In this example, the module will be auto loaded for any route that begins with `/mod1`

# Application Layout

The main application layout is initialized on the start. By default all panels are defined, but only 3 are visible. The default layout is defined in `src/app/main/conf.js`. The layout is created using w2layout from w2ui library. See w2ui.com for more information.

## Common Actions

Show the right panel and render some HTML in it:
```js
w2ui.app_layout.show('right');
w2ui.app_layout.html('right', '<div style="padding: 10px;">Some HTML</div>');
```

Hide right panel:
```js
w2ui.app_layout.hide('right');
```

Load some HTML from a file into the right panel:
```js
w2ui.app_layout.show('right');
w2ui.app_layout.load('right', 'path/to/the/file.html');
```

Chage size of the right panel and make it not resizable:
```js
w2ui.app_layout.set('right', { size: 150, resizable: false });
w2ui.app_layout.show('right');
```

Display a grid in a main panel:
```js
w2ui.app_layout.content('main', w2ui.grid1);
// Where grid1 is the name of the grid that you already initialized.
```
## Nested Layouts

If you need more layout panels in the defaul application layout (not common), you may create additional layouts and nest them in the
```js
$().w2layout({
    name: 'other_layout',
    padding: 6,
    panels: [
        { type: 'top', size: 60, resizable: true },
        { type: 'left', size: 150, resizable: true },
        { type: 'main' },
        { type: 'right', size: 150, resizable: true }
    ]
});
w2ui.app_layout.html('main', w2ui.other_layout);
```

# Application Toolbar

The main application toolbar is initialized on the start. You may change it to fit the needs of your application in `src/app/main/conf.js`. The toolbar is created using w2toolbar widget from w2ui library. See w2ui.com for more information.

## Common Actions

Add button to the toolbar:
```js
w2ui.app_toolbar.insert('spacer1',
    { id: 'id1', type: 'button', caption: 'Button 1', icon: 'fa-star-empty' }
)
```

Add item to the User menu:
```js
w2ui.app_toolbar.get('user-menu').items.push(
    { id: 'my-item', text: 'My Item', icon: 'fa-home' }
)
w2ui.app_toolbar.refresh();
```

Thought you can customize toolbar any where in the code, it is probably better to define it in the /app/conf.js because it is unlikely your main toolbar will change during the course of the application.
