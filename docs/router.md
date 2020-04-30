# Routes
The `app.route` module is part of the boiler plater and immediately available. There are a number of methods and events available to you.

### app.route.add(route, callBack)
Adds a route to the routed and registeres its callBack.

### app.route.get()
Returns currnet route.

### app.route.go(route)
Navigate to the route and triggers change enent.

### app.route.init([defaultRoute])
Initializes router module and sets defaultRoute.

### app.route.list()
Returns all registered routes.

### app.route.remove(route)
Removes specified route.

### app.route.set(route)
Sets route silently without triggering change events.

## Events
Events are only available is you include w2ui as it takes them from w2utils.

### app.route.on('add', callBack)
Event that is triggered when a new route is added. Callback function will receive an event object with additional information.

### app.route.on('remove', callBack)
Event that is triggered when a route is removed. Callback function will receive an event object with additional information.

### app.route.on('route', callBack)
Event that is triggered when a route is processed. Callback function will receive an event object with additional information

## Example

Routes should be added in the main module file, however a module might not be loaded yet. You can specify a pattern for module routes in the modules.js and if a route is not yet registered, but matches module pattern, then the module will be loaded automatically.

Below is an example how to add routes:
```
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