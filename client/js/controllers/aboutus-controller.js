/**
 * Created by chrismolica on 2/25/15.
 */
angular.module('profile').
    controller('InteractiveMapController',['$scope', '$resource', function($scope, $resource) {
        this.input = {};
        this.hoverstate = false;
        this.hoverIn = function(){
            this.hoverstate = true;
            console.log('HOVER IN');
        }
        this.hoverOut = function(){
            this.hoverstate = false;
            console.log('HOVER OUT');
        }

    }]);
