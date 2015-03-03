/**
 * Created by chrismolica on 2/24/15.
 */
/**
 * Created by chrismolica on 2/24/15.
 */

angular.module('profile').
    controller('MeetupsController',['$scope', '$resource', function($scope, $resource){
        var Meetup = $resource('/api/meetups');

        this.count = 10;
        Meetup.query(function(results){
           $scope.meetuplist = results;
        });

        this.createMeetup = function(){
            var meetup = new Meetup();
            meetup.name = $scope.name;
            meetup.$save(function(result){
                console.log(result);
                $scope.meetuplist.push(result);
                $scope.name = "";
            });


        }
    }]);
