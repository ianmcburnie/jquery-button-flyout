/**
* @file jQuery plugin that creates the basic interactivity for a button that expands and collapse a flyout
* @version 0.8.0
* @author Ian McBurnie <ianmcburnie@hotmail.com>
* @requires jquery-next-id
* @requires jquery-focusable
* @requires jquery-focus-exit
*/
(function($, window, document, undefined) {
    /**
    * jQuery plugin that creates the basic interactivity for a button that expands and collapse a flyout
    *
    * @method "jQuery.fn.buttonFlyout"
    * @param {Object} [options]
    * @param {boolean} [options.focusManagement] - set focus to 'none, 'overlay', 'first' or an ID (default: 'none')
    * @param {boolean} [options.autoCollapse] - collapse overlay when focus exits widget (default: true)
    * @param {boolean} [options.buttonSelector] - css selector for button element (default: '.flyout__button')
    * @param {boolean} [options.overlaySelector] - css selector for overlay element (default: '.flyout__overlay')
    * @param {boolean} [options.debug] - print debug statements to console (default: false)
    * @fires {object} flyoutCollapse - the flyout has collapsed
    * @fires {object} flyoutExpand - the flyout has expanded
    * @return {jQuery} chainable jQuery class
    */
    $.fn.buttonFlyout = function buttonFlyout(options) {
        options = $.extend({
            autoCollapse: true,
            debug: false,
            focusManagement: 'none',
            buttonSelector: '.flyout__button, > button, > a[role=button]',
            overlaySelector: '.flyout__overlay'
        }, options);

        return this.each(function onEach() {
            var $widget = $(this);
            var $button = $widget.find(options.buttonSelector);
            var $overlay = $widget.find(options.overlaySelector);
            var isAnchorTag = $button.prop('tagName').toLowerCase() === 'a';
            var expandedVal = $button.attr('aria-expanded');

            var isExpanded = function() {
                return $button.attr('aria-expanded') === 'true';
            };

            var setFocusToOverlay = function() {
                $overlay.focus();
            };

            var setFocusToFirst = function() {
                $overlay.focusable().first().focus();
            };

            var setFocusToId = function() {
                $overlay.find('#' + options.focusManagement).focus();
            };

            var getFocusManagementBehaviour = function() {
                var func;

                switch (options.focusManagement) {
                    case 'none':
                        func = Function;
                        break;
                    case 'overlay':
                        $overlay.attr('tabindex', '-1');
                        func = setFocusToOverlay;
                        break;
                    case 'first':
                        func = setFocusToFirst;
                        break;
                    default:
                        func = setFocusToId;
                        break;
                }

                return func;
            };

            var doFocusManagement = getFocusManagementBehaviour();

            var expandFlyout = function(e) {
                if (isExpanded() === false) {
                    $button.attr('aria-expanded', 'true');
                    $overlay.attr('aria-hidden', 'false');
                    $widget.trigger('flyoutExpand');
                    doFocusManagement();
                }
            };

            var collapseFlyout = function(e) {
                if (isExpanded() === true) {
                    $button.attr('aria-expanded', 'false');
                    $overlay.attr('aria-hidden', 'true');
                    $widget.trigger('flyoutCollapse');
                }
            };

            var toggleFlyout = function(e) {
                var _void = isExpanded() ? collapseFlyout() : expandFlyout();
            };

            // ensure spacebar works on anchor tag with role=button
            var onButtonKeyDown = function(e) {
                if (e.keyCode === 32) {
                    // prevent page scroll
                    e.preventDefault();
                    toggleFlyout();
                }
            };

            var onButtonClick = function(e) {
                if (isAnchorTag === true) {
                    e.preventDefault();
                }
                toggleFlyout();
            };

            var onWidgetFocusExit = function(e) {
                collapseFlyout();
            };

            var onOverlayEscape = function(e) {
                collapseFlyout();
                setTimeout(function(e) {
                    $button.focus();
                }, 0);
            };

            // assign next id in sequence if one doesn't already exist
            $widget.nextId('button-flyout');

            // listen for focus exit if autoCollapse is true
            if (options.autoCollapse === true) {
                $widget.focusExit();
                $widget.on('focusExit', onWidgetFocusExit);
            }

            // assign id to overlay and hide element
            $overlay
                .prop('id', $widget.prop('id') + '-overlay')
                .attr('aria-hidden', 'true');

            // the button controls the overlay's expanded state
            $button
                .attr('aria-controls', $overlay.prop('id'))
                .attr('aria-expanded', 'false');

            // the button is a toggle button
            $button.on('click', onButtonClick);

            // if the button is an anchor tag (with role=button), SPACE key must trigger click
            if (isAnchorTag === true) {
                $button.on('keydown', onButtonKeyDown);
            }
        });
    };
}(jQuery, window, document));

/**
* The jQuery plugin namespace.
* @external "jQuery.fn"
* @see {@link http://learn.jquery.com/plugins/|jQuery Plugins}
*/

/**
* flyoutExpand event
*
* @event flyoutExpand
* @type {object}
* @property {object} event - event object
*/

/**
* flyoutCollapse event
*
* @event flyoutCollapse
* @type {object}
* @property {object} event - event object
*/
