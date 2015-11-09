(function() {
    angular
        .module('GitHubClient.Users', [])
        .config(usersConfig);

    function usersConfig ($routeProvider) {
        $routeProvider
            .when('/users/:userName', {
                templateUrl: '/pages/users/templates/userProfile.html',
                controller: 'UserProfileCtrl',
                resolve: {
                    initData: function (UserDataSvc, $route, $q) {
                        var userName = $route.current.params.userName,
                            userProfile = UserDataSvc.getUserProfile(userName),
                            userRepositories = UserDataSvc.getUserRepositories(userName);

                        return $q.all([userProfile, userRepositories]).then(function (res) {
                            return {
                                profile: res[0],
                                allRepositories: res[1]
                            }
                        });
                    }
                }
            })
            .when('/users/:userName/followers', {
                templateUrl: '/pages/users/templates/userFollowers.html',
                controller: 'UserFollowersCtrl',
                resolve: {
                    initData: function (UserDataSvc, $route) {
                        var userFollowers;
                        return UserDataSvc.getUserFollowers($route.current.params.userName)
                            .then(function (followers) {
                                userFollowers = followers;
                                if(followers.length === 0) {
                                    return [];
                                }
                                return UserDataSvc.getUserRepositories(followers[0].login);
                            })
                            .then(function (data) {
                                userFollowers[0].allRepositories = data;
                                return userFollowers;
                            })
                            .catch(function (err) {
                                return err; // just for example here
                            });
                    },
                    isFollowers: function () {
                        return true;
                    }
                }
            })
            .when('/users/:userName/following', {
                templateUrl: '/pages/users/templates/userFollowers.html',
                controller: 'UserFollowersCtrl',
                resolve: {
                    initData: function (UserDataSvc, $route) {
                        var userFollowing;
                        return UserDataSvc.getUserFollowing($route.current.params.userName)
                            .then(function (following) {
                                userFollowing = following;
                                if(following.length === 0) {
                                    return [];
                                }
                                return UserDataSvc.getUserRepositories(following[0].login);
                            })
                            .then(function (data) {
                                userFollowing[0].allRepositories = data;
                                return userFollowing;
                            })
                            .catch(function (err) {
                                return err; // just for example here
                            });
                    },
                    isFollowers: function () {
                        return false;
                    }
                }
            });
    }
})();