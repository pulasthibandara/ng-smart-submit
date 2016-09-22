(() => {

    /**
     * 
     * decorator for ngSubmit
     * Adds smart submit functionality to the existing ngSubmit
     * directive via a decorator
     */

    angular.module( 'ngSmartSubmit' )
        .decorator( 'ngSubmitDirective', ngSubmitDecorator );

    ngSubmitDecorator.$inject = [ '$delegate', '$parse', '$q' ];

    function ngSubmitDecorator ( $delegate, $parse, $q ) {
        
        // require controllers
        $delegate[0].require = [ '?form', '?resetOnSubmit' ];

        $delegate[0].compile = function($element, attr) {
            var fn = $parse( attr['ngSubmit'], null, true );


            return function ngEventHandler(scope, element, attr, ctrls) {
                let formCtrl = ctrls[0],
                    resetCtrl = ctrls[1];

                element.on( 'submit' , function(event) {
                    var callback = function( event ) {

                        // set submit progress attr on form cotroller
                        formCtrl.$submitProgress = true;
                        $q.when( fn(scope, { $event:event }) )
                            .then( 
                                // on submit success
                                data => {
                                    // disable submit progress attr on form cotroller
                                    formCtrl.$submitProgress = false;
   
                                    // reset form after submit
                                    resetForm();
                                }, 
                                // on submit faliure
                                err => {
                                    // disable submit progress attr on form cotroller
                                    formCtrl.$submitProgress = false;
                                } 
                            );
                            
                    };

                    scope.$apply(callback);
                });

                // resets form
                function resetForm () {
                    if( resetCtrl !== null ) {
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