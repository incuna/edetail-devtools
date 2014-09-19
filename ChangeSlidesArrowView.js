define([
    'backbone-zepto'
], function (
    Backbone
) {

    'use strict';

    return Backbone.View.extend({
        events: {
            'tap': 'changeSlide'
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
