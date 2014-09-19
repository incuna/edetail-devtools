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
            if (this.options.appCurrentView && this.options.appCurrentView[method]) {
                this.options.appCurrentView[method]();
            } else {
                console.warn('No method ' + method + ' on the current app view:', this.options.appCurrentView);
            }
        }
    });

});
