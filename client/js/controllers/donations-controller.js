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
        $scope.status  = {};
        $scope.error = {}


        this.attempt = false;
        $scope.result = {};
        $http.put('/create').success(function(data){
            console.log('SUCCESS');
            //console.log(JSON.stringify(data));
        }).error(function(data){
            console.log('SUCCESS');
        });

        this.addDonation = function(type){
            this.status  = {};
            this.error = {}
            console.log( + ':'+this.transaction.cardnumber);
            //console.log(this.transaction.date.substring(5,8));
            console.log(this.transaction.date);
            console.log(this.transaction.date.substring(0,2));
            console.log('INPUT:'+this.transaction);
            this.attempt = true;
            var donation = new Donation();
            var result = {};
            var failures = {};
            donation.method = 'credit_card';
            donation.first_name = this.transaction.first_name;
            donation.last_name = this.transaction.last_name;
            donation.amount = this.transaction.amount;
            donation.cardtype = type.toLowerCase();
            donation.cardnumber = this.transaction.cardnumber;
            donation.expire_month = this.transaction.date.substring(0,2);
            donation.expire_year = this.transaction.date.substring(3,8);
            donation.cvv2 = this.transaction.cvv2;
            console.log('DONATION:'+JSON.stringify(donation));
            test = donation;
            $timeout(donation.$save(function(result){
                console.log(result);
                console.log("OUTPUT RESULT DONATION CONTROLLER:"+result);
            }), 100000);
            $http.post('/api/donation', donation)
                .success(function(data){
                    //console.log("DATA STATE:");
                    //console.log(data.state);
                    //console.log("RESOURCE:");

                    if(data.state === 'success'){
                        $scope.result = 'success';
                    }else{
                        $scope.result = 'failure';
                        var fail = data.value.response.details;
                        for(var i=0;i<fail.length;i++){
                            console.log("LOG:");
                            console.log(fail[i]);
                            console.log("ISSUE:");
                            console.log(fail[i].issue);
                            get_credit_card_state(fail[i].field, fail[i].issue);
                        }
                    }
                    $scope.result = data;
                });


        };
        function get_credit_card_state(state, message){
            console.log("MESSAGE");
            console.log(message);
            console.log(state);
            switch(state){
                case 'payer.funding_instruments[0].credit_card.number':{
                    $scope.status.credit_card_state = true;
                    $scope.error.credit_card_message = message;
                    break;
                }
                case 'payer.funding_instruments[0].credit_card.cvv2':{
                    $scope.status.cvv2_state  = true;
                    $scope.error.cvv2_message = message;
                    break;
                }
            }
        }

    }]);



