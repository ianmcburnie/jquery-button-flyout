# jquery-button-flyout

<p>
    <a href="https://travis-ci.org/ianmcburnie/jquery-button-flyout"><img src="https://api.travis-ci.org/ianmcburnie/jquery-button-flyout.svg?branch=master" alt="Build Status" /></a>
    <a href='https://coveralls.io/github/ianmcburnie/jquery-button-flyout?branch=master'><img src='https://coveralls.io/repos/ianmcburnie/jquery-button-flyout/badge.svg?branch=master&service=github' alt='Coverage Status' /></a>
    <a href="https://david-dm.org/ianmcburnie/jquery-button-flyout"><img src="https://david-dm.org/ianmcburnie/jquery-button-flyout.svg" alt="Dependency status" /></a>
    <a href="https://david-dm.org/ianmcburnie/jquery-button-flyout#info=devDependencies"><img src="https://david-dm.org/ianmcburnie/jquery-button-flyout/dev-status.svg" alt="devDependency status" /></a>
</p>

jQuery plugin that creates the basic interactivity for a button that expands and collapse a flyout.

```js
$(selector).buttonFlyout(options);
```

## Deprecated

*This plugin is deprecated and no longer maintained!*.

Please use any of the following plugins instead:

* <a href="https://github.com/ianmcburnie/jquery-click-flyout">jquery-click-flyout</a>
* <a href="https://github.com/ianmcburnie/jquery-hover-flyout">jquery-hover-flyout</a>
* <a href="https://github.com/ianmcburnie/jquery-focus-flyout">jquery-focus-flyout</a>

## Install

```js
npm install jquery-button-flyout
```

## Example

Markup before plugin:

```html
<div class="flyout">
    <button type="button">Notifications</button>
    <span class="flyout__live-region" aria-live="off">
        <div class="flyout__overlay">
            <!-- flyout content -->
        </div>
    </span>
</div>
```

Execute plugin:

```js
$('.flyout').buttonFlyout();
```

Markup after plugin:

```html
<div class="flyout" id="flyout-0">
    <button type="button" aria-controls="flyout-0-overlay" aria-expanded="false">Notifications</button>
    <span class="flyout__live-region" aria-live="off">
        <div class="flyout__overlay" id="flyout-0-overlay">
            <!-- flyout content -->
        </div>
    </span>
</div>
```

'Click' event on button will now toggle aria-expanded state of button. CSS can use this state to hide/show overlay. For example:

```css
.flyout__overlay {
    display: none;
    position: absolute;
    z-index: 1;
}
.flyout__button[aria-expanded=true] ~ .flyout__live-region > .flyout__overlay {
    display: block;
}
```

## Options

* `autoCollapse` - auto collapse flyout when focus leaves the widget (default: true)
* `buttonSelector` - selector for button element (default: '.flyout__button, > button, > a[role=button]')
* `debug` - print debug statements to console (defualt: false)
* `focusManagement` - set focus to 'none, 'overlay', 'first' or an ID (default: 'none')
* `overlaySelector` - selector for overlay element (default: '.flyout__overlay')

## Events

* `flyoutCollapse` - the flyout has collapsed
* `flyoutExpand` - the flyout has expanded

## Development

Useful NPM task runners:

* `npm start` for local browser-sync development.
* `npm test` runs tests & generates reports (see reports section below)
* `npm run tdd` test driven development: watches code and re-tests after any change
* `npm run build` cleans, lints, tests and minifies

Execute `npm run` to view all available CLI scripts.

## Reports

Each test run will generate the following reports:

* `/test_reports/coverage` contains Istanbul code coverage report
* `/test_reports/html` contains HTML test report
* `/test_reports/junit` contains JUnit test report

## CI Build

https://travis-ci.org/ianmcburnie/jquery-button-flyout

## Code Coverage

https://coveralls.io/github/ianmcburnie/jquery-button-flyout?branch=master
