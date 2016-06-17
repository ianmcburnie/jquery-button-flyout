/**
* @file jQuery plugin that creates the basic interactivity for a button flyout
* @version 0.6.0
* @author Ian McBurnie <ianmcburnie@hotmail.com>
* @requires jquery-next-id
* @requires jquery-common-keydown
* @requires jquery-focusable
* @requires jquery-focus-exit
*/
(function($, window, document, undefined) {
    /**
    * jQuery plugin that creates the basic interactivity for a button flyout
    *
    * @method "jQuery.fn.buttonFlyout"
    * @param {Object} [options]
    * @param {boolean} [options.focusManagement]
    * @param {boolean} [options.sticky]
    * @fires {object} buttonFlyoutClose - the button flyout has closed
    * @fires {object} buttonFlyoutOpen - the button flyout has opened
    * @return {jQuery} chainable jQuery class
    */
    $.fn.buttonFlyout = function buttonFlyout(options) {
        options = $.extend({
            focusManagement: false,
            sticky: false,
            isLiveRegion: false
        }, options);

        return this.each(function onEach() {
            var $this = $(this);
            var $button = $this.find('> button, > a[role=button]');
            var $overlay = $this.find('> *:last-child');
            var isAnchorTag = ($button.prop('tagName').toLowerCase() === 'a');

            /**
            * Opens the flyout
            * @method openButtonFlyout
            * @return void
            */
            function openButtonFlyout(e) {
                if ($button.attr('aria-expanded') === 'false') {
                    $button.attr('aria-expanded', 'true');
                    $overlay.attr('aria-hidden', 'false');
                    if (options.focusManagement === true) {
                        $overlay.focusable().first().focus();
                    }
                    $this.trigger('buttonFlyoutOpen');
                }
            }

            /**
            * Closes the flyout
            * @method closeButtonFlyout
            * @return void
            */
            function closeButtonFlyout(e) {
                if ($button.attr('aria-expanded') === 'true') {
                    $button.attr('aria-expanded', 'false');
                    $overlay.attr('aria-hidden', 'true');
                    $this.trigger('buttonFlyoutClose');
                }
            }

            // assign next id in sequence if one doesn't already exist
            $this.nextId('button-flyout');

            if (options.isLiveRegion === true) {
                $this.attr('aria-live', 'polite');
            }

            // sticky flyouts don't close on exit
            if (options.sticky === false) {
                $overlay.focusExit().on('focusExit', closeButtonFlyout);
                $this.focusExit().on('focusExit', closeButtonFlyout);
            }

            // assign id to overlay and hide element
            $overlay
                .prop('id', $this.prop('id') + '-overlay')
                .attr('aria-hidden', 'true');

            // the button controls the overlay's expanded state
            $button
                .attr('aria-controls', $overlay.prop('id'))
                .attr('aria-expanded', 'false');

            // the button is a toggle button
            $button.on('click', function onButtonClick(e) {
                if (isAnchorTag === true) {
                    e.preventDefault();
                }

                if ($overlay.attr('aria-hidden') === 'true') {
                    openButtonFlyout();
                } else {
                    closeButtonFlyout();
                }
            });

            if (isAnchorTag === true) {
                $button.commonKeyDown().on('spaceKeyDown', function() {
                    $button.click();
                });
            }

            // when focus is inside flyout, esc key must close flyout
            $overlay.commonKeyDown().on('escapeKeyDown', function onEscKeyDown(e) {
                $button.focus();
            });
        });
    };
}(jQuery, window, document));

/**
* The jQuery plugin namespace.
* @external "jQuery.fn"
* @see {@link http://learn.jquery.com/plugins/|jQuery Plugins}
*/

/**
* buttonFlyoutOpen event
*
* @event buttonFlyoutOpen
* @type {object}
* @property {object} event - event object
*/

/**
* buttonFlyoutClose event
*
* @event buttonFlyoutClose
* @type {object}
* @property {object} event - event object
*/
