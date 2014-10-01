define([
    'backbone-zepto',
    'zepto',
    'lodash'
], function (
    Backbone,
    $,
    _
) {

    'use strict';

    return Backbone.View.extend({
        events: {
            'tap': 'changeSlide'
        },
        initialize: function () {
            // The `keydown` event doesn't bubble so it cannot be used with
            // Backbone's event delegation.
            _.bindAll(this, 'keydown');
            $(document).on('keydown', this.keydown);
        },
        remove: function () {
            $(document).off('keydown', this.keydown);
            Backbone.View.prototype.remove.apply(this, arguments);
        },
        keyCodeToDirection: {
            37: 'prev',
            39: 'next'
        },
        keydown: function (event) {
            if (this.keyCodeToDirection[event.keyCode] === this.options.direction) {
                this.changeSlide();
            }
        },
        render: function () {
            this.$el.html(this.options.html || '');
            return this;
        },
        changeSlide: function () {
            var method = this.options.direction + 'Slide';
            var view = this.options.appCurrentView;
            if (view && view[method]) {
                view[method]();
            } else if (view && view.subviews && view.subviews.slidesContainer && view.subviews.slidesContainer[method]) {
                view.subviews.slidesContainer[method]();
            } else {
                console.warn('No method ' + method + ' on the current app view:', this.options.appCurrentView);
            }
        }
    });

});
