describe("jquery.buttonflyout.js", function() {

    jasmine.DEFAULT_TIMEOUT_INTERVAL = 500;

    var dummyEventTimeoutInterval = jasmine.DEFAULT_TIMEOUT_INTERVAL / 2;

    var dom = '<div class="flyout">'
                + '<button class="flyout__button">Notifications</button>'
                + '<div class="flyout__live-region">'
                    + '<div class="flyout__overlay">'
                        + '<h2>Flyout Title</h2>'
                        + '<p>Flyout Content</p>'
                        + '<button>Close</button>'
                    + '</div>'
                + '</div>'
            + '</div>';

    var $widget, $button, $overlay;

    var dummyEventHandlers = {
        onButtonFocus : function(e) {},
        onflyoutCollapse : function(e) {}
    };

    beforeEach(function() {
        $('body').empty().append($(dom));
        $widget = $('.flyout');
        $button = $('.flyout > button');
        $overlay = $('.flyout > div');
        $closeButton = $overlay.find('button');
    });

    it("should ensure id on container", function() {
        $widget.buttonFlyout();
        expect($widget.prop('id')).not.toBe(undefined);
    });

    it("should ensure id on overlay", function() {
        $widget.buttonFlyout();
        expect($overlay.prop('id')).not.toBe(undefined);;
    });

    it("should add aria-controls property to button", function() {
        $widget.buttonFlyout();
        expect($button.attr('aria-controls')).not.toBe(undefined);
    });

    it("should add aria-expanded state to button", function() {
        $widget.buttonFlyout();
        expect($button.attr('aria-expanded')).not.toBe(undefined);
    });

    it("should set aria-expanded state to true when opened", function() {
        $widget.buttonFlyout();
        $button.click();
        expect($button.attr('aria-expanded')).toBe("true");
    });

    it("should set aria-expanded state to true when closed", function() {
        $widget.buttonFlyout();
        $button.click().click();
        expect($button.attr('aria-expanded')).toBe("false");
    });

    it("should keep focus on button by default when clicked", function(done) {
        spyOn(dummyEventHandlers, 'onButtonFocus');

        $button.on('focus', dummyEventHandlers.onButtonFocus);

        $widget.buttonFlyout();
        $button.click();

        setTimeout(function() {
            expect(dummyEventHandlers.onButtonFocus).not.toHaveBeenCalled();
            done();
        }, dummyEventTimeoutInterval);
    });

    it("should set focus on first focusable overlay element (close button) when clicked if options.focusManagement='first'", function(done) {
        $closeButton.on('focus', done);
        $widget.buttonFlyout({focusManagement: 'first'});
        $button.click();
    });

    it("should set aria-expanded=false on focusexit", function(done) {
        $widget.buttonFlyout();
        $button.click();
        $overlay.trigger("focusExit");

        setTimeout(function() {
            expect($button.attr('aria-expanded')).toBe("false");
            done();
        }, 100);
    });

    it("should trigger flyoutExpand when opened", function(done) {
        $widget.buttonFlyout();
        $widget.on('flyoutExpand', done);
        $button.click();
    });

    it("should trigger flyoutCollapse when closed", function(done) {
        $widget.buttonFlyout();
        $widget.on('flyoutCollapse', done);
        $button.click().click();
    });

});
