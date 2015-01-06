/**
 * Note:
 *        1. This version requires Angular UI Bootstrap >= v0.10.0 with templates
 *      2. This version requires angular-translate for i18n support
 *
 * @see https://github.com/m-e-conroy/angular-dialog-service
 */

    //== Controllers =============================================================//

angular.module('dialogs.controllers', ['ui.bootstrap.modal', 'pascalprecht.translate'])

/**
 * Default translations in English.
 *
 * Use angular-translate's $translateProvider to provide translations in an
 * alternate language.
 *
 * $translateProvider.translations('[lang]',{[translations]});
 * To use alternate translations set the preferred language to your desired
 * language.
 * $translateProvider.preferredLanguage('[lang]');
 */
    .config(['$translateProvider', function($translateProvider) {
        $translateProvider.translations('en-US', {
            DIALOGS_ERROR: "Error",
            DIALOGS_ERROR_MSG: "An unknown error has occurred.",
            DIALOGS_CLOSE: "Close",
            DIALOGS_PLEASE_WAIT: "Please Wait",
            DIALOGS_PLEASE_WAIT_ELIPS: "Please Wait...",
            DIALOGS_PLEASE_WAIT_MSG: "Waiting on operation to complete.",
            DIALOGS_PERCENT_COMPLETE: "% Complete",
            DIALOGS_NOTIFICATION: "Notification",
            DIALOGS_NOTIFICATION_MSG: "Unknown application notification.",
            DIALOGS_CONFIRMATION: "Confirmation",
            DIALOGS_CONFIRMATION_MSG: "Confirmation required.",
            DIALOGS_OK: "OK",
            DIALOGS_YES: "Yes",
            DIALOGS_NO: "No"
        });

        $translateProvider.preferredLanguage('en-US');
    }]) // end config

/**
 * Error Dialog Controller
 */
    .controller('errorDialogCtrl', ['$scope', '$modalInstance', '$translate', 'header', 'msg', function($scope, $modalInstance, $translate, header, msg) {
        //-- Variables -----//

        $scope.header = (angular.isDefined(header)) ? header : $translate.instant('DIALOGS_ERROR');
        $scope.msg = (angular.isDefined(msg)) ? msg : $translate.instant('DIALOGS_ERROR_MSG');

        //-- Methods -----//

        $scope.close = function() {
            $modalInstance.close();
            $scope.$destroy();
        }; // end close
    }]) // end ErrorDialogCtrl

/**
 * Wait Dialog Controller
 */
    .controller('waitDialogCtrl', ['$scope', '$modalInstance', '$translate', '$timeout', 'header', 'msg', 'progress', function($scope, $modalInstance, $translate, $timeout, header, msg, progress) {
        //-- Variables -----//

        $scope.header = (angular.isDefined(header)) ? header : $translate.instant('DIALOGS_PLEASE_WAIT_ELIPS');
        $scope.msg = (angular.isDefined(msg)) ? msg : $translate.instant('DIALOGS_PLEASE_WAIT_MSG');
        $scope.progress = (angular.isDefined(progress)) ? progress : 100;

        //-- Listeners -----//

        // Note: used $timeout instead of $scope.$apply() because I was getting a $$nextSibling error

        // close wait dialog
        $scope.$on('dialogs.wait.complete', function() {
            $timeout(function() {
                $modalInstance.close();
                $scope.$destroy();
            });
        }); // end on(dialogs.wait.complete)

        // update the dialog's message
        $scope.$on('dialogs.wait.message', function(evt, args) {
            $scope.msg = (angular.isDefined(args.msg)) ? args.msg : $scope.msg;
        }); // end on(dialogs.wait.message)

        // update the dialog's progress (bar) and/or message
        $scope.$on('dialogs.wait.progress', function(evt, args) {
            $scope.msg = (angular.isDefined(args.msg)) ? args.msg : $scope.msg;
            $scope.progress = (angular.isDefined(args.progress)) ? args.progress : $scope.progress;
        }); // end on(dialogs.wait.progress)

        //-- Methods -----//

        $scope.getProgress = function() {
            return {'width': $scope.progress + '%'};
        }; // end getProgress
    }]) // end WaitDialogCtrl

/**
 * Notify Dialog Controller
 */
    .controller('notifyDialogCtrl', ['$scope', '$modalInstance', '$translate', 'header', 'msg', function($scope, $modalInstance, $translate, header, msg) {
        //-- Variables -----//

        $scope.header = (angular.isDefined(header)) ? header : $translate.instant('DIALOGS_NOTIFICATION');
        $scope.msg = (angular.isDefined(msg)) ? msg : $translate.instant('DIALOGS_NOTIFICATION_MSG');

        //-- Methods -----//

        $scope.close = function() {
            $modalInstance.close();
            $scope.$destroy();
        }; // end close
    }]) // end WaitDialogCtrl

/**
 * Confirm Dialog Controller
 */
    .controller('confirmDialogCtrl', ['$scope', '$modalInstance', '$translate', 'header', 'msg', 'isError', function($scope, $modalInstance, $translate, header, msg, isError) {
        //-- Variables -----//
        $scope.header = (angular.isDefined(header)) ? header : $translate.instant('DIALOGS_CONFIRMATION');
        $scope.msg = (angular.isDefined(msg)) ? msg : $translate.instant('DIALOGS_CONFIRMATION_MSG');
        $scope.isError = isError;

        //-- Methods -----//

        $scope.no = function() {
            $modalInstance.dismiss('no');
        }; // end close

        $scope.yes = function() {
            $modalInstance.close('yes');
        }; // end yes
    }]); // end ConfirmDialogCtrl / dialogs.controllers

//== Services ================================================================//

angular.module('dialogs.main', ['ui.bootstrap.modal', 'dialogs.controllers'])

    .provider('dialogs', [function() {
        var b = true; // backdrop
        var k = true; // keyboard
        var w = 'dialogs-default'; // windowClass
        var copy = true; // controls use of angular.copy

        /**
         * Use Backdrop
         *
         * Sets the use of the modal backdrop.  Either to have one or not and
         * whether or not it responds to mouse clicks ('static' sets the
         * backdrop to true and does not respond to mouse clicks).
         *
         * @param    val    mixed    (true, false, 'static')
         */
        this.useBackdrop = function(val) { // possible values : true, false, 'static'
            if (angular.isDefined(val)) {
                b = val;
            }
        }; // end useStaticBackdrop

        /**
         * Use ESC Close
         *
         * Sets the use of the ESC (escape) key to close modal windows.
         *
         * @param    val    boolean
         */
        this.useEscClose = function(val) { // possible values : true, false
            if (angular.isDefined(val)) {
                k = (!angular.equals(val, 0) && !angular.equals(val, 'false') && !angular.equals(val, 'no') && !angular.equals(val, null) && !angular.equals(val, false)) ? true : false;
            }
        }; // end useESCClose

        /**
         * Use Class
         *
         * Sets the additional CSS window class of the modal window template.
         *
         * @param    val    string
         */
        this.useClass = function(val) {
            if (angular.isDefined(val)) {
                w = val;
            }
        }; // end useClass

        /**
         * Use Copy
         *
         * Determines the use of angular.copy when sending data to the modal controller.
         *
         * @param    val    boolean
         */
        this.useCopy = function(val) {
            if (angular.isDefined(val)) {
                copy = (!angular.equals(val, 0) && !angular.equals(val, 'false') && !angular.equals(val, 'no') && !angular.equals(val, null) && !angular.equals(val, false)) ? true : false;
            }
        }; // end useCopy

        this.$get = ['$modal', function($modal) {
            return {
                error: function(header, msg) {
                    return $modal.open({
                        templateUrl: '/partials/modals/dialogs-error.html',
                        controller: 'errorDialogCtrl',
                        backdrop: b,
                        keyboard: k,
                        windowClass: w,
                        resolve: {
                            header: function() {
                                return angular.copy(header);
                            },
                            msg: function() {
                                return angular.copy(msg);
                            }
                        }
                    }); // end modal.open
                }, // end error

                wait: function(header, msg, progress) {
                    return $modal.open({
                        templateUrl: '/partials/modals/dialogs-wait.html',
                        controller: 'waitDialogCtrl',
                        backdrop: b,
                        keyboard: k,
                        windowClass: w,
                        resolve: {
                            header: function() {
                                return angular.copy(header);
                            },
                            msg: function() {
                                return angular.copy(msg);
                            },
                            progress: function() {
                                return angular.copy(progress);
                            }
                        }
                    }); // end modal.open
                }, // end wait

                notify: function(header, msg) {
                    return $modal.open({
                        templateUrl: '/partials/modals/dialogs-notify.html',
                        controller: 'notifyDialogCtrl',
                        backdrop: b,
                        keyboard: k,
                        windowClass: w,
                        resolve: {
                            header: function() {
                                return angular.copy(header);
                            },
                            msg: function() {
                                return angular.copy(msg);
                            }
                        }
                    }); // end modal.open
                }, // end notify

                confirm: function(header, msg, isError) {
                    return $modal.open({
                        templateUrl: '/partials/modals/dialogs-confirm.html',
                        controller: 'confirmDialogCtrl',
                        backdrop: b,
                        keyboard: k,
                        windowClass: w,
                        resolve: {
                            header: function() {
                                return angular.copy(header);
                            },
                            msg: function() {
                                return angular.copy(msg);
                            },
                            isError: function() {
                                return isError === undefined ? true : !!isError;
                            } //is error by default
                        }
                    }); // end modal.open
                }, // end confirm

                create: function(url, ctrlr, data) {
                    return $modal.open({
                        templateUrl: url,
                        controller: ctrlr,
                        keyboard: k,
                        backdrop: b,
                        windowClass: w,
                        resolve: {
                            data: function() {
                                if (copy) {
                                    return angular.copy(data);
                                }
                                else {
                                    return data;
                                }
                            }
                        }
                    }); // end modal.open
                } // end create
            }; // end return
        }]; // end $get
    }]); // end provider
