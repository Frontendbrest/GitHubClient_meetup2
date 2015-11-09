(function () {
    angular
        .module('GitHubClient.Users')
        .controller('UserProfileCtrl', UserProfileCtrl);

    function UserProfileCtrl ($scope, initData) {
        $scope.user = initData;

        $scope.changeUserProfileId = changeUserProfileId;

        function changeUserProfileId (newId) {
            $scope.user.profile.id = newId;
        }
    }
})();