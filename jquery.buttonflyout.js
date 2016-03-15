/**
* @name jquery-button-flyout
* @function $.fn.buttonFlyout
* @version 0.5.2
* @author Ian McBurnie <ianmcburnie@hotmail.com>
* @requires jquery-next-id
* @requires jquery-common-keydown
* @requires jquery-focusable
* @requires jquery-focus-exit
* @desc converts a button + * into a button + popup flyout and handles all
* hide/show behaviour.
* @fires {object} buttonFlyoutClose - the button flyout has closed
* @fires {object} buttonFlyoutOpen - the button flyout has opened
*/
(function ($, window, document, undefined) {

    $.fn.buttonFlyout = function buttonFlyout(options) {

        options = options || {};

        return this.each(function onEach() {
            var $this = $(this);
            var $button = $this.find('> button');
            var $overlay = $this.find('> *:last-child');

            // update ARIA states on show
            function openButtonFlyout(e) {
                $button.attr('aria-expanded', 'true');
                $overlay.attr('aria-hidden', 'false');
                // if desired, set focus on first interactive element
                if (options.focusManagement === true) {
                    $overlay.focusable().first().focus();
                }
                $this.trigger('buttonFlyoutOpen');
            }

            // update ARIA states on hide
            function closeButtonFlyout(e) {
                $button.attr('aria-expanded', 'false');
                $overlay.attr('aria-hidden', 'true');
                $this.trigger('buttonFlyoutClose');
            }

            // assign next id in sequence if one doesn't already exist
            $this.nextId('button-flyout');

            // when overlay loses focus, hide overlay
            $this.focusExit().on('focusExit', function onOverlayFocusExit(e) {
                closeButtonFlyout();
            });

            // assign id to overlay and hide element
            $overlay
                .prop('id', $this.prop('id') + '-overlay')
                .attr('aria-hidden', 'true');

            // the button controls the overlay's expanded state
            $button
                .attr('aria-controls', $overlay.prop('id'))
                .attr('aria-expanded', 'false');

            $button.on('click', function onButtonClick(e) {
                if ($overlay.attr('aria-hidden') === 'true') {
                    openButtonFlyout();
                } else {
                    closeButtonFlyout();
                }
            });

            // when focus is inside flyout, esc key must close flyout
            $overlay.commonKeyDown().on('escapeKeyDown', function onEscKeyDown(e) {
                closeButtonFlyout();
                $button.focus();
            });

        });
    };

}(jQuery, window, document));
