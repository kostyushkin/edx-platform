/**
 * TODO
 */
 var edx = edx || {};

 (function( $, _ ) {
    'use strict';
    var errorView,
        el = $('#reverify-container');

    edx.verify_student = edx.verify_student || {};

    // Initialize an error view for displaying top-level error messages.
    errorView = new edx.verify_student.ErrorView({
        el: $('#error-container')
    });

    // Initialize the base view, passing in information
    // from the data attributes on the parent div.
    return new edx.verify_student.ReverifyView({
        errorModel: errorView.model,
        stepInfo: {
            'face-photo-step': {
                platformName: el.data('platform-name')
            },
            'id-photo-step': {
                platformName: el.data('platform-name')
            },
            'review-photos-step': {
                fullName: el.data('full-name'),
                platformName: el.data('platform-name')
            },
            'reverify-success-step': {
                platformName: el.data('platform-name')
            }
        }
    }).render();
})( jQuery, _ );
