/**
* @name @ebay/jquery-button-flyout
* @function $.fn.buttonFlyout
* @version 0.1.4
* @author Ian McBurnie <ianmcburnie@hotmail.com>
* @requires @ebay/jquery-next-id
* @requires @ebay/jquery-common-keys-js
* @requires @ebay/jquery-focusable-js
* @requires @ebay/jquery-focus-exit
* @desc converts a button + * into a button + popup flyout and handles all
* hide/show behaviour.
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
            $overlay.focusExit().on('focusexit', function onOverlayFocusExit(e) {
                $this.trigger('hide.buttonFlyout');
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
                $this.trigger('toggle.buttonFlyout');
            });

            $this.on('toggle.buttonFlyout', function onToggle(e) {
                $this.trigger($overlay.attr('aria-hidden') == 'true' ? 'show.buttonFlyout' : 'hide.buttonFlyout');
            });

            // update ARIA states on show
            $this.on('show.buttonFlyout', function onShow(e) {
                $button.attr('aria-expanded', 'true');
                $overlay.attr('aria-hidden', 'false');
                // if desired, set focus on first interactive element
                if (options.focusManagement === true) {
                    $overlay.focusable().first().focus();
                }
            });

            // update ARIA states on hide
            $this.on('hide.buttonFlyout', function onHide(e) {
                $button.attr('aria-expanded', 'false');
                $overlay.attr('aria-hidden', 'true');
            });

            // esc key must close overlay
            $this.commonKeys().on('escape.commonKeyDown', function onEscKeyDown(e) {
                $this.trigger('hide.buttonFlyout');
                $button.focus();
            });

        });
    };

}(jQuery, window, document));
