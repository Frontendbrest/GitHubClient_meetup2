(function() {
    angular
        .module('GitHubClient.Users')
        .factory('UserDataSvc', UserDataSvc);

    function UserDataSvc ($http, $q) {
        var rootApi = 'https://api.github.com/users/';

        return {
            getUserProfile: getUserProfile,
            checkIfProfileExists: checkIfProfileExists,
            getUserFollowers: getUserFollowers,
            getUserFollowing: getUserFollowing,
            getUserRepositories: getUserRepositories
        };

        function getUserProfile (userName) {
            return $http.get(rootApi + userName)
                .then($http.getDataFromResult);
        }

        function checkIfProfileExists (userName) {
            return _checkIfProfileExists(userName).then(function(data) {
                if(data) {
                    return $q.resolve(true);
                }
                return $q.when(true);
            });
        }

        function getUserFollowers (userName) {
            return $http.get(rootApi + userName + '/followers')
                .then(function (res) {
                    _formatUserFollowers(res.data);
                    return res.data;
                });
        }

        function getUserFollowing (userName) {
            return $http.get(rootApi + userName + '/following')
                .then(function (res) {
                    _formatUserFollowers(res.data);
                    return res.data;
                });
        }

        function getUserRepositories (userName) {
            return $http.get(rootApi + userName + '/repos')
                .then($http.getDataFromResult);
        }


        // Private functions
        function _formatUserFollowers (followers) {
            followers.forEach(function (follower) {
                follower.isActive = false;
            });
        }

        function _checkIfProfileExists (userName) {
            var deferred = $q.defer();
            $http.get(rootApi + userName).success(function (data) {
                deferred.resolve(data);
            }).error(function (errMsg) {
                deferred.reject(errMsg);
            });
            return deferred.promise;
        }
    }
})();