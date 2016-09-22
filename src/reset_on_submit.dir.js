(()=>{

    angular.module( 'ngSmartSubmit' )
        .directive( 'resetOnSubmit', resetOnSubmit );

    function resetOnSubmit () {
        return {
            restrict: 'A',
            scope: {
                options: '=resetOnSubmit'
            },
            link: ( scope, element, attr ) => {

            },
            controller: [ '$scope', resetOnSubmitCtrl ]
        };


        /**
         * 
         * expose an api from directive
         * @param {angular.$scope} $scope
         */
        function resetOnSubmitCtrl ( $scope ) {
            this.reset = function () {
                if( !$scope.options || !$scope.options.model ) {
                    return;
                }

                let temp = {},
                    value = $scope.value ? $scope.value : {};

                Object.keys( $scope.options.model ).forEach( key => {
                    temp[key] = undefined;
                } );

                angular.extend( $scope.options.model, temp, value );
            };
        }
    }

})();

