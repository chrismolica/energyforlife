/**
 * Created by chrismolica on 2/25/15.
 */
angular.module('profile')
    .controller('ProfileController',['$http', function($http){
        var group = this;
        this.group = group;
        this.info = [];
        $http.get('package.json').success(function(data){
            group.info = data;
        });
    }]);
angular.module('profile')
    .controller("EmailSubscription", function(){
        this.profile = {};
        this.addUser = function(user){
            this.profile = user;
        };
        this.removeUser = function(){
            this.profile = {};
        }
    });
angular.module('profile')
    .controller("SignUpController", function(){
        this.input = {};
        this.addSignUp = function(user){
            console.log('TEST');
            this.input.createdOn = Date.now();
            this.input.submited = true;
            user.addUser(this.input);
            //user = this.input;

            //product.reviews.push(this.signup);
            //this.input = {};
        };

    });