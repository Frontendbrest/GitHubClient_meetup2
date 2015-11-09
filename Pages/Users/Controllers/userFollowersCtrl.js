(function () {
    angular
        .module('GitHubClient.Users')
        .controller('UserFollowersCtrl', UserFollowersCtrl);

    function UserFollowersCtrl ($scope, UserDataSvc, initData, isFollowers) {
        $scope.isFollowers = isFollowers;
        $scope.userFollowers = initData;

        $scope.setActiveFollower = setActiveFollower;


        // initial setup
        if($scope.userFollowers.length !== 0) {
            setActiveFollower($scope.userFollowers[0]);
        }


        function setActiveFollower(activeFollower) {
            $scope.userFollowers.forEach(function (follower) {
                follower.isActive = false;
            });
            activeFollower.isActive = true;
            $scope.activeFollower = activeFollower;
            if(!activeFollower.allRepositories) {
                // load user repos
                UserDataSvc.getUserRepositories(activeFollower.login).then(function (data) {
                    activeFollower.allRepositories = data;
                    activeFollower.filteredRepositories = data;
                });
            }
        }
    }
})();