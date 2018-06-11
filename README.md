# Asynchonous loading demo

Nowadays it's common to create a website that loads a bunch of vendor scripts and css, but such features are used in a single page or two at most.

This demo features a tweak I made to [addScript](https://stackoverflow.com/questions/7718935/load-scripts-asynchronously#answer-7719185), a script I found while I researched for a solution to asynchronous loading a, very heavy, graphic library.

In `addAsset`, you'll be able to load a `css` or `js` file alike, and even have an influence on where should it be added.

See a working demo in [this pen](https://codepen.io/vagui/pen/jKyOeP).

## The script

In `addAsset` you'll only be required to add a _source_ (`src`), which is a path to your source file. Add your relative or absolute path to it and let this function figure out if it's a JS or CSS file.

The script will add the tag to the `<head>` or `<body>` section, depending of its extension.

For CSS files it will add it before the first `<link>` tag, if there isn't one it will look for a `<style>` tag and add it before it, otherwise it will just add it as the last child of `<head>`.

For JS files it will add it before the first `<script>` tag, if there isn't one it will just add it as the last child of `<body>`.


### Adding a callback

This script injects the asset when it's ready, if you want to perform an action, like initializing a dependant script, just add your `callback` function as the second parameter.

It's possible to leave it blank if you don't have the need for a `callback`, if you want to alter the order of the injection (third parameter) and you don't need  a callback, just add a `null`.

### Altering order of injection

This script injects your asset into the DOM by looking into the first relevant tag (`<link>` or `<script>`) and inserting it before it.

In scripts it's usually fine since we are adding the scripts only when they are loaded, therefore, the order in the DOM is just a matter of aesthetics if they are chained correctly between the callbacks. In other words, if there's dependency you would be sure to add the dependant script as a callback to the script which its dependant to, in the demo we use a callback to load `Bootstrap.js` only when `JQuery` is ready. As long as it's called like that, we can inject it anywhere in the DOM and it'll still work.

CSS it's another thing entirely, CSS rules overwrite themselves depending on the style-sheet order. With that on mind, you can add a `true` to the third parameter: `addLast`to inject the new asset as a last tag of `<body>` if it's a script, or as the last item on `<head>` if it's a style-sheet. This will give you a little more control on which style-sheet will have more weight.


## The demo

This demo shows how I use the `addAsset()` function, which you could copy-paste by itself.

In this demo I add a common library: `Bootstrap`, as you may know, this library consists in a `JS` and a `CSS` file. I add some timeouts to show gradually how the callbacks start to influence the code.

The blue block reflects CSS style load differences, the green block reflects CSS style (collateral damage) and JS load differences.

The demo does the following

* On `DOMContentLoaded` I check if a class exists to see if I want to inject my assets (Line 111)
* I add a timeout of three seconds to start loading my CSS, this allows me to show the initial impact of my code and how it changes when Bootstrap loads.
  * Since the script adds the new `<style>` tag before the first `<style>` or `<link>` tag as a default, then my `<style>` overwrites bootstrap's `font-family` and `font-size`. You can test it the other way around by changing *line 11* to `addAsset(stylesheetSource, functionThatFiresWhenCSSIsLoaded, true);`. You'll get `font-family: -apple-system, BlinkMacSystemFont,[blah]` and `1rem` of font-size.
  * The callback here is `functionThatFiresWhenCSSIsLoaded`, this script: logs that the CSS is loaded, changes the paragraph in the blue block and green block to reflect that the style is loaded. That's it.
* I add a timeout of six seconds to my script injection, this reduces attention loss from the CSS `<style>` injection. Meanwhile we start just with the HTML of a bootstrap carousel useless and ugly. The first script that I load here (line 16) is JQuery, since bootstrap would break if I don't have it loaded before calling it, I also add a callback to load Bootstrap afterwards.
  * The `loadBootstrap` function: logs that we loaded JQuery, requests Boostrap (line 25) with no callback (second parameter) and adds it at the end of body, after JQuery (third parameter). This last thing doesn't do anything, it only shows the JS in the order that you will add it if you wrote it statically, change *line 25* to `addAsset(scriptSource, null);` and see how it still works (explained in *Altering order of injection*).
  * Logs when all scripts are loaded and updates the text in the green block.

## Including the script in your project
For your convenience, you will find in `js/addAsset.min.js` a minified version of the script, so you can copy-paste it into your project.