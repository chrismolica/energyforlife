/**
 * Created by chrismolica on 2/25/15.
 */
//angular.module('profile').
//    controller('DonationController',['$scope', '$resource', '$timeout', function($scope, $resource, $timeout) {
//
//    }]);
var test;

angular.module('profile').
    controller('UserSignUpController',['$scope', '$resource', '$timeout', '$http', function($scope, $resource, $timeout, $http) {
        var Donation = $resource('/api/donation');

        this.transaction = {};
        this.attempt = false;
        $scope.result = {};
        $http.put('/create').success(function(data){
            console.log('SUCCESS');
            //console.log(JSON.stringify(data));
        }).error(function(data){
            console.log('SUCCESS');
        });

        this.addDonation = function(){
            console.log(this.transaction.toString());
            console.log('INPUT:'+this.transaction);
            this.attempt = true;
            var donation = new Donation();
            var result = {};
            donation.method = 'credit_card';
            donation.first_name = this.transaction.first_name;
            donation.last_name = this.transaction.last_name;
            donation.amount = this.transaction.amount;
            donation.cardtype = this.transaction.cardtype;
            donation.cardnumber = this.transaction.cardnumber;
            donation.expire_month = this.transaction.expire_month;
            donation.expire_year = this.transaction.expire_year;
            donation.cvv2 = this.transaction.cvv2;
            console.log('DONATION:'+JSON.stringify(donation));
            test = donation;
            $timeout(donation.$save(function(result){
                console.log(result);
                console.log("OUTPUT RESULT DONATION CONTROLLER:"+result);
            }), 100000);
            $http.post('/api/donation', donation)
                .success(function(data){
                    console.log(data);
                    $scope.result = data;
                });

        };

    }]);

