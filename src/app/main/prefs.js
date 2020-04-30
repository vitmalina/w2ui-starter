app.main.prefs = {
    data: {},

    init: function (defaults) {
        // init preferences
        try {
            this.data = localStorage.getItem(app._conf.name + '-preferences')
            this.data = JSON.parse(this.data)
        } catch (e) {
            this.data = null
        }
        if (this.data == null) {
            this.data = defaults
            localStorage.setItem(app._conf.name + '-preferences', JSON.stringify(this.data))
        }
    },

    set: function (name, value) {
        if (name == null) return
        this.data[name] = value
        localStorage.setItem(app._conf.name + '-preferences', JSON.stringify(this.data))
    },

    get: function (name) {
        if (name == null) return null
        return this.data[name]
    }
}