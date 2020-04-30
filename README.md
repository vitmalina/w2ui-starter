# w2ui-starter

If you are using w2ui and looking for a small, non-oppininated way to organize your code - look no further. This repository is small, modular, easily extensible boiler plate to build apps with w2ui.

The purpose of this repository is to be a starting point and give structure to your project. It is primarely a front-end framework and does not care what server side language you use. I have included static json files for you to play with. The front-end code is completely separated from the back-end code. All communication is done passing JSON files.

I have included latest jQuery and w2ui in the `src/libs` folder. You are welcome to add any other library you want. I often include some charting library (D3 usually), Monaco, and formely Underscore or Lodash. In the past I have used it with ReactJS, RivetsJS, VueJS and many other libraries. However, I would not recomment including any major framework such as Angular, Ember, Flux, etc. as they work better when they take over your application logic completely, though it is up to you.

## File Structure

Clone github repository and open /src folder. This is where all front-end code is. You will find the following strucutre:

```
/app                - all front-end code is here
    /home           - sample module
    /icons          - svg files for icons and generated icon font
    /main           - layout and main menus
        modules.js  - config for all modules
        start.js    - starting point
/libs               - JS libraries that you want to use
index.html          - starting point
```

Open index.html in your browser and enjoy

## Gulp

You will find gulfile.js in the project that configured to compile you LESS files, icon-font and bundle up your application. If you run gulp without params it will compile LESS files in place. You can also run

```
gulp dev       # start watching .less and .svg files
gulp build     # bundles project into /build folder
```