# Getting Started

Open `src/app/index.html` in the browser to see the app. The index file is minimal and provides generic structure for the applications layout, includes all necessary JS libraries and global css files.

```
<!DOCTYPE html>
<html>
<head>
    <title>My Application</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="initial-scale=1.0 maximum-scale=1.0"/>
    <!-- link rel="icon" href="app/logo.png" type="image/png" -->
    <!-- Link CSS and JS here for speed -->
    <link rel="stylesheet" type="text/css" href="libs/w2ui/w2ui.css" />
    <link rel="stylesheet" type="text/css" href="app/icons/icon-font.css" />
    <link rel="stylesheet" type="text/css" href="app/main/global.css" />
    <script type="text/javascript" src="libs/jquery/jquery-3.5.0.min.js"></script>
    <script type="text/javascript" src="libs/w2ui/w2ui.min.js"></script>
    <script type="text/javascript" src="libs/kickstart/kickstart.js"></script>
    <!-- Start here -->
    <script type="text/javascript" src="app/start.js"></script>
</head>
<body>
    <div id="app-container">
        <div id="app-toolbar"></div>
        <div id="app-header"></div>
        <div id="app-main"></div>
    </div>
</body>
</html>
```

All application logic start with `src/app/start.js` file. You can see annotated version of that file below.

```
$(function () {
    // application name
    app._conf.name = "MyApp"
    // loads module definitions
    app.define('app/modules.js')

    // loads main module
    app.require('main', function () {
        // check session, part of the main module
        var info = app.main.getSession();
        if (info == null) document.location = 'login.html';
        // init layout and top menu
        app.main.init(); // will show all panels
        app.route.init('/home'); // if no route is defined, it will open /home
    })
})
```

## App Variatble

There will be one global variable `app` that holds references to all modules loaded for your application. Remember that modules are lazy-loaded, which means they do not get all loaded on start. You may define a route pattern for the modules and it will get auto-loaded on that route pattern (one time). There are a few methods in app that are useful:

### app.\_conf
Holds information about all registered modules and whether they are loaded or not.

### app.define(module)

Defines a module and its assets. You can pass an object with module definition or a string. If it is a string it will assume it is a file path to module definitions. See /app/modules.js for a sample.

### app.require(name, callBack)

Loads a module and its assets asyncronously. The name can be a string or an array of strings. And it will load a single module or a set of modules (all asynchronously) before executing the callBack. If you need to ensure specific order in which modules should be loaded - nest app.require() in the callBack of another app.required().

### app.register(name, moduleFunction)

Registers a module with name and its corresponding moduleFunction, which holds the logic of your module.
Modules can be loaded automatically by setting up a route, if route pattern is defined in module definition. See /app/modules.js for an example.