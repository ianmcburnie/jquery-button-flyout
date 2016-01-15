/**
* @name @ebay/jquery-button-flyout
* @function $.fn.buttonFlyout
* @version 0.2.0
* @author Ian McBurnie <ianmcburnie@hotmail.com>
* @requires @ebay/jquery-next-id
* @requires @ebay/jquery-common-keys-js
* @requires @ebay/jquery-focusable-js
* @requires @ebay/jquery-focus-exit
* @desc converts a button + * into a button + popup flyout and handles all
* hide/show behaviour.
* @fires {object} closeButtonFlyout - close the button flyout
* @fires {object} openButtonFlyout - open the button flyout
* @fires {object} toggleButtonFlyout - toggle the button flyout
* @fires {object} buttonFlyoutClose - the button flyout has closed
* @fires {object} buttonFlyoutOpen - the button flyout has opened
*/
(function ($, window, document, undefined) {

    $.fn.buttonFlyout = function buttonFlyout(options) {

        options = options || {};

        return this.each(function onEach() {
            var $this = $(this),
                $button = $this.find('> button'),
                $overlay = $this.find('> *:last-child');

            // assign next id in sequence if one doesn't already exist
            $this.nextId('button-flyout');

            // when overlay loses focus, hide overlay
            $overlay.focusExit().on('focusExit', function onOverlayFocusExit(e) {
                $this.trigger('closeButtonFlyout');
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
                $this.trigger('toggleButtonFlyout');
            });

            $this.on('toggleButtonFlyout', function onToggle(e) {
                $this.trigger($overlay.attr('aria-hidden') == 'true' ? 'openButtonFlyout' : 'closeButtonFlyout');
            });

            // update ARIA states on show
            $this.on('openButtonFlyout', function onShow(e) {
                $button.attr('aria-expanded', 'true');
                $overlay.attr('aria-hidden', 'false');
                // if desired, set focus on first interactive element
                if (options.focusManagement === true) {
                    $overlay.focusable().first().focus();
                }
                $this.trigger('buttonFlyoutOpen');
            });

            // update ARIA states on hide
            $this.on('closeButtonFlyout', function onHide(e) {
                $button.attr('aria-expanded', 'false');
                $overlay.attr('aria-hidden', 'true');
                $this.trigger('buttonFlyoutClose');
            });

            // esc key must close overlay
            $this.commonKeys().on('escape.commonKeyDown', function onEscKeyDown(e) {
                $this.trigger('closeButtonFlyout');
                $button.focus();
            });

        });
    };

}(jQuery, window, document));
