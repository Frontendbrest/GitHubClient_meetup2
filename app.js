(function () {
    angular
        .module('GitHubClient', [
            'ngRoute',
            'ngMessages',
            'GitHubClient.Common',
            'GitHubClient.Home',
            'GitHubClient.Users'
        ]).config(appConfig);

    function appConfig($locationProvider, $provide) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        $provide.decorator('$http', function ($delegate) {
            $delegate.getDataFromResult = function (result) {
                return result.data;
            };

            return $delegate;
        });
    }
})();