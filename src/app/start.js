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