# Toolbar

The main application toolbar is initialized on the start. You may change it to fit the needs of your application in `src/app/main/conf.js`. The toolbar is created using w2toolbar widget from w2ui library. See w2ui.com for more information.

## Common Actions

Add button to the toolbar:
```
w2ui.app_toolbar.insert('spacer1',
    { id: 'id1', type: 'button', caption: 'Button 1', icon: 'fa-star-empty' }
)
```

Add item to the User menu:
```
w2ui.app_toolbar.get('user-menu').items.push(
    { id: 'my-item', text: 'My Item', icon: 'fa-home' }
)
w2ui.app_toolbar.refresh();
```

Thought you can customize toolbar any where in the code, it is probably better to define it in the /app/conf.js because it is unlikely your main toolbar will change during the course of the application.