(function () {
    angular
        .module('GitHubClient.Home')
        .controller('HomeCtrl', HomeCtrl);

    function HomeCtrl ($scope) {
        $scope.logInUser = logInUser;

        function logInUser(loginForm, userName) {
            if (!loginForm.$valid || loginForm.$pending) {
                console.log('$valid: ' + loginForm.$valid);
                console.log('$pending: ' + loginForm.$pending);
                return;
            }

            $scope.$emit('logInEvent', userName);
        }
    }
})();