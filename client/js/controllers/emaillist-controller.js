/**
 * Created by chrismolica on 3/1/15.
 */
/**
 * Created by chrismolica on 2/24/15.
 */
/**
 * Created by chrismolica on 2/24/15.
 */

angular.module('profile').
    controller('EmailListController',['$scope', '$resource', function($scope, $resource){
        var EmailList = $resource('/api/emailsubscriptions');

        this.count = 10;
        EmailList.query(function(results){
            $scope.emailList = results;
        });

    }]);
