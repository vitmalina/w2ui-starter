# Modules

## Create New

To create a new module, you need to do 2 things.

### 1. Create Module File
Create a folder in `src/app` directory and name it mod1. Then create a file mod1.js in that directory with the following content.
```
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

### Register Module

Add the following block of code in the `src/app/modules.js` in a way similar to other modules already there.
```
"mod1": {
    "route": "/mod1*",
    "start": "app/mod1/mod1.js"
}
```
Navigate to `index.html#/mod1` and your modules will be loaded and route event triggered.

## Assets

A module is a collection of related files (js, html, css, json, etc.) that implements a particular functionality. It should occupy its own folder where all the module files and resources are located. Below is the sample folder structure of the module that has many resources
```
/app
    /mod1
        /views                  - module resources
            /create.html
            /create.css
            /overview.html
            /overview.css
            ...
        conf.js                  - all w2ui widget configurations
        myModule.js              - main module file
```
You need to define these resources in `src/app/modules.js` in the following way:

```
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

```
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

```
app.required('modName', function () {
    // called when module and all its assets are loaded
})
```