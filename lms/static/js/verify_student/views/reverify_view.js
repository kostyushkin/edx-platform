/**
 * TODO
 */

 var edx = edx || {};

(function($, _, Backbone, gettext) {
    'use strict';

    edx.verify_student = edx.verify_student || {};

    edx.verify_student.ReverifyView = Backbone.View.extend({
        el: '#reverify-container',

        subviews: [],

        initialize: function( obj ) {
            this.errorModel = obj.errorModel || null;
            this.initializeStepViews( obj.stepInfo || {} );
            this.currentStepIndex = 0;
        },

        initializeStepViews: function( stepInfo ) {
            // var i,
            //     stepName,
            //     stepData,
            //     subview,
            //     subviewConfig,
            //     nextStepTitle,
            //     subviewConstructors,
            //     verificationModel;

            // We need to initialize this here, because
            // outside of this method the subview classes
            // might not yet have been loaded.
            subviewConstructors = {
                'face-photo-step': edx.verify_student.FacePhotoStepView,
                'id-photo-step': edx.verify_student.IDPhotoStepView,
                'review-photos-step': edx.verify_student.ReviewPhotosStepView,
                'reverify-success-step': edx.verify_student.ReverifySuccessStepView
            };

            // Create the verification model, which is shared
            // among the different steps.  This allows
            // one step to save photos and another step
            // to submit them.
            var verificationModel = new edx.verify_student.VerificationModel(),
                errorModel = this.errorModel;

            _.each(["face-photo-step", "id-photo-step", "review-photos-step", "reverify-success-step"], function(name) {
                var subviewConfig = {
                    errorModel: this.error
                }

            });

            this.subviews.push(edx.verify_student.FacePhotoStepView(stepInfo["face-photo-step"]));
            this.subviews.push(edx.verify_student.IDPhotoStepView(stepInfo["id-photo-step"]));
            this.subviews.push(edx.verify_student.ReviewPhotosStepView(stepInfo["review-photos-step"]));
            this.subviews.push(edx.verify_student.ReverifySuccessStepView(stepInfo["reverify-success-step"]));

                    subviewConfig = {
                        errorModel: this.errorModel,
                        templateName: this.displaySteps[i].templateName,
                        nextStepTitle: nextStepTitle,
                        stepData: stepData
                    };

                    // For photo verification steps, set the shared photo model
                    if ( this.VERIFICATION_VIEW_NAMES.indexOf(stepName) >= 0 ) {
                        _.extend( subviewConfig, { model: verificationModel } );
                    }

                    // Create the subview instance
                    // Note that we are NOT yet rendering the view,
                    // so this doesn't trigger GET requests or modify
                    // the DOM.
                    this.subviews[stepName] = new subviewConstructors[stepName]( subviewConfig );

                    // Listen for events to change the current step
                    this.listenTo( this.subviews[stepName], 'next-step', this.nextStep );
                    this.listenTo( this.subviews[stepName], 'go-to-step', this.goToStep );
                }
            }
        },

        render: function() {
            this.renderCurrentStep();
            return this;
        },

        renderCurrentStep: function() {
            var stepName, stepView, stepEl;

            // Get or create the step container
            stepEl = $("#current-step-container");
            if (!stepEl.length) {
                stepEl = $('<div id="current-step-container"></div>').appendTo(this.el);
            }

            // Render the subview
            // Note that this will trigger a GET request for the
            // underscore template.
            // When the view is rendered, it will overwrite the existing
            // step in the DOM.
            stepName = this.displaySteps[ this.currentStepIndex ].name;
            stepView = this.subviews[ stepName ];
            stepView.el = stepEl;
            stepView.render();
        },

        nextStep: function() {
            this.currentStepIndex = Math.min(
                this.currentStepIndex + 1,
                this.displaySteps.length - 1
            );
            this.render();
        },

        goToStep: function( stepName ) {
            var stepIndex = _.indexOf(
                _.pluck( this.displaySteps, 'name' ),
                stepName
            );

            if ( stepIndex >= 0 ) {
                this.currentStepIndex = stepIndex;
            }

            this.render();
        }
    });

})(jQuery, _, Backbone, gettext);
