(function() {
    angular
        .module('GitHubClient.Home')
        .directive('userLoginExistsValidator', userLoginExistsValidator);

    function userLoginExistsValidator(UserDataSvc, $q) {
        return {
            require : 'ngModel',
            link : function($scope, element, attrs, ngModel) {
                ngModel.$asyncValidators.userLoginExists = function(userLogin) {
                    if(!userLogin) {
                        return $q.when(true);
                    }

                    return UserDataSvc.checkIfProfileExists(userLogin);
                };
            }
        }
    }
})();