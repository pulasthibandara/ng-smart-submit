'use strict';

(function () {
  'use strict';

  angular.module('ngSmartSubmit', []);
})();
'use strict';

(function () {

    /**
     * 
     * decorator for ngSubmit
     * Adds smart submit functionality to the existing ngSubmit
     * directive via a decorator
     */

    angular.module('ngSmartSubmit').decorator('ngSubmitDirective', ngSubmitDecorator);

    ngSubmitDecorator.$inject = ['$delegate', '$parse', '$q'];

    function ngSubmitDecorator($delegate, $parse, $q) {

        // require controllers
        $delegate[0].require = ['?form', '?resetOnSubmit'];

        $delegate[0].compile = function ($element, attr) {
            var fn = $parse(attr['ngSubmit'], null, true);

            return function ngEventHandler(scope, element, attr, ctrls) {
                var formCtrl = ctrls[0],
                    resetCtrl = ctrls[1];

                element.on('submit', function (event) {
                    var callback = function callback(event) {

                        // set submit progress attr on form cotroller
                        formCtrl.$submitProgress = true;
                        $q.when(fn(scope, { $event: event })).then(
                        // on submit success
                        function (data) {
                            // disable submit progress attr on form cotroller
                            formCtrl.$submitProgress = false;

                            // reset form after submit
                            resetForm();
                        },
                        // on submit faliure
                        function (err) {
                            // disable submit progress attr on form cotroller
                            formCtrl.$submitProgress = false;
                        });
                    };

                    scope.$apply(callback);
                });

                // resets form
                function resetForm() {
                    if (resetCtrl !== null) {
                        resetCtrl.reset();
                        formCtrl.$setUntouched();
                        formCtrl.$setPristine();
                    }
                }
            };
        };

        return $delegate;
    }
})();
'use strict';

(function () {

    angular.module('ngSmartSubmit').directive('resetOnSubmit', resetOnSubmit);

    function resetOnSubmit() {
        return {
            restrict: 'A',
            scope: {
                options: '=resetOnSubmit'
            },
            link: function link(scope, element, attr) {},
            controller: ['$scope', resetOnSubmitCtrl]
        };

        /**
         * 
         * expose an api from directive
         * @param {angular.$scope} $scope
         */
        function resetOnSubmitCtrl($scope) {
            this.reset = function () {
                if (!$scope.options || !$scope.options.model) {
                    return;
                }

                var temp = {},
                    value = $scope.value ? $scope.value : {};

                Object.keys($scope.options.model).forEach(function (key) {
                    temp[key] = undefined;
                });

                angular.extend($scope.options.model, temp, value);
            };
        }
    }
})();