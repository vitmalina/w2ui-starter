# Layout

The main application layout is initialized on the start. By default all panels are defined, but only 3 are visible. The default layout is defined in `src/app/main/conf.js`. The layout is created using w2layout from w2ui library. See w2ui.com for more information.

## Common Actions

Show the right panel and render some HTML in it:
```
w2ui.app_layout.show('right');
w2ui.app_layout.html('right', '<div style="padding: 10px;">Some HTML</div>');
```

Hide right panel:
```
w2ui.app_layout.hide('right');
```

Load some HTML from a file into the right panel:
```
w2ui.app_layout.show('right');
w2ui.app_layout.load('right', 'path/to/the/file.html');
```

Chage size of the right panel and make it not resizable:
```
w2ui.app_layout.set('right', { size: 150, resizable: false });
w2ui.app_layout.show('right');
```

Display a grid in a main panel:
```
w2ui.app_layout.content('main', w2ui.grid1);
// Where grid1 is the name of the grid that you already initialized.
```
## Nested Layouts

If you need more layout panels in the defaul application layout (not common), you may create additional layouts and nest them in the ```
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