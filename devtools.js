define([
    './ChangeSlidesArrowView',
    'has',
    'lodash',
    'zepto'
], function (
    ChangeSlidesArrowView,
    has,
    _,
    $
) {

    'use strict';

    return {

        DEBUG: !has('live'),

        slideArrows: function (MainRouter) {

            if (!MainRouter.setView) {
                console.warn('MainRouter must be an instance of the edetail router.');
            }

            var prev;
            var next;

            function build (options) {
                var view = new ChangeSlidesArrowView(options);
                var styles = {
                    position: 'absolute',
                    top: '50%',
                    zIndex: 100,
                    fontSize: '32px',
                    fontWeight: 'bold'
                };
                styles[options.side] = '1em';
                view.render().$el.css(styles).css();
                $(document.body).append(view.$el);
                return view;
            }

            function remove (view) {
                if (view && view.remove) {
                    view.remove();
                }
            }

            function run () {
                if (MainRouter.currentView) {
                    prev = build({
                        appCurrentView: MainRouter.currentView,
                        direction: 'prev',
                        side: 'left',
                        html: '<'
                    });
                    next = build({
                        appCurrentView: MainRouter.currentView,
                        direction: 'next',
                        side: 'right',
                        html: '>'
                    });
                }
            }

            MainRouter.on('change:view', function (view) {
                remove(prev);
                remove(next);
                run();
            });

            run();

        },

        fixTransitionEnd: function () {
            $(document).on('transitionend', function (event) {
                // Whenever transitionend triggers, trigger webkitTransitionEnd
                // on the same element so the edetail library runs correctly
                // in Chrome 36+.
                $(event.target).trigger('webkitTransitionEnd');
            });
        }

    };

});
