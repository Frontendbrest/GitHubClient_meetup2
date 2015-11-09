(function () {
    angular
        .module('GitHubClient.Home', [])
        .config(homeConfig);

    function homeConfig($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/pages/home/templates/home.html',
                controller: 'HomeCtrl',
                resolve: {

                }
            });
    }
})();