(function () {
    angular
        .module('GitHubClient.Common')
        .controller('MainCtrl', MainCtrl);

    function MainCtrl ($scope, $location) {
        $scope.navLinks = [
            {
                name: 'home',
                text: 'Home',
                url: '/',
                isActive: true,
                isDisplayedForNotLoggedInUser: true
            },
            {
                name: 'profile',
                text: 'Profile'
            },
            {
                name: 'followers',
                text: 'Followers'
            },
            {
                name: 'following',
                text: 'Following'
            },
            {
                name: 'logOut',
                text: 'Log out',
                url: '/',
                floatRight: true
            }
        ];
        $scope.userIsLoggedIn = false;
        $scope.ucPopupIsActive = false;
        $scope.setActiveLink = setActiveLink;
        $scope.showUCPopup = showUnderConstructionPopup;
        $scope.hideUCPopup = hideUnderConstructionPopup;

        $scope.$on('logInEvent', function (event, userName) {
            _logInUser(userName);
            setActiveLink('profile');
        });


        // public functions
        function setActiveLink(linkName) {
            if(linkName === 'logOut') {
                _logOutUser();
                linkName = 'home';
            }
            $scope.navLinks.forEach(function (navLink) {
                navLink.isActive = navLink.name === linkName;
            });
        }

        function showUnderConstructionPopup() {
            $scope.ucPopupIsActive = true;
        }

        function hideUnderConstructionPopup() {
            $scope.ucPopupIsActive = false;
        }


        // private functions
        function _logInUser(userName) {
            $scope.navLinks[1].url = '/users/' + userName;
            $scope.navLinks[2].url = '/users/' + userName + '/followers';
            $scope.navLinks[3].url = '/users/' + userName + '/following';

            $scope.userName = userName;
            $scope.userIsLoggedIn = true;
            $location.path('users/' + userName);
        }

        function _logOutUser() {
            $scope.userIsLoggedIn = false;
            $location.path('home');
        }
    }
})();