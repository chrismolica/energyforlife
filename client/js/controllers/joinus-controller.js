/**
 * Created by chrismolica on 2/28/15.
 */
angular.module('profile').
    controller('EmailHeaderController',['$scope', '$resource', '$timeout', function($scope, $resource, $timeout) {
        var navbar = $('.navbar');
        var Email = $resource('/api/emailsubscriptions');

        $scope.state = false;
        $scope.scrollState = false;
        $scope.subscribed = false;



        this.toggleState = function (state) {
            //console.log('toggling');
            $scope.state = state;
            if (state) {
                navbar.removeClass('push-down').addClass('push-up');
            } else {
                navbar.addClass('push-down').removeClass('push-up');
            }
        };
        function subscribe_thankyou(){
            $scope.subscribed = true;
            $timeout(function () {
                $scope.$apply(function(){
                    $scope.state = true;
                    $scope.subscribed = false;
                    navbar.removeClass('push-down').addClass('push-up');
                    console.log($scope.subscribed +' '+$scope.state+' '+$scope.scrollState);
                 });
            }, 2000);



            //$timeout(function () {
            //    $scope.$apply(function(){
            //        $scope.state = true;
            //        $scope.subscribed = false;
            //        console.log($scope.subscribed +' '+$scope.state+' '+$scope.scrollState);
            //     });
            //}, 3000);
            //console.log($scope.subscribed +' '+$scope.state+' '+$scope.scrollState);
        }

        this.addEmail = function(signup){
            console.log("ADDED EMAIL:"+signup.input.email);
            var email = new Email();
            email.email = signup.input.email;
            email.timeAdded = new Date();
            email.submited = true;
            $timeout(email.$save(function(result){
                console.log("OUTPUT RESULT:"+result.email);
                //pushEmail(result.email);
            }), 3000);
            subscribe_thankyou();
        };
        //function pushEmail(email){
        //    console.log($scope.emailList);
        //    $scope.emailList.push(email);
        //}
        function updateScrollState(state){
            $scope.$apply(function(){
                $scope.scrollState = state;
            });
        }

        $(function () {
            $(window).scroll(function () {
                scroll_pos = $(this).scrollTop();
                console.log(scroll_pos+' '+$scope.state+' '+$scope.scrollState);
                if ($(this).scrollTop() > 10 && $scope.state === false) {
                    updateScrollState(true)
                    navbar.removeClass('push-down').addClass('push-up');
                } else if ($(this).scrollTop() < 10 && $scope.state === false) {
                    navbar.addClass('push-down').removeClass('push-up');
                    updateScrollState(false);
                }
            });
        });
    }]);
angular.module('profile').
    controller('SignUpController',['$scope', '$resource', function($scope, $resource) {
        this.input = {};
    }]);
