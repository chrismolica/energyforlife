/**
 * Created by chrismolica on 2/25/15.
 */
var test;
angular.module('profile').
    controller('UserSignUpController',['$scope', '$resource', '$timeout', function($scope, $resource, $timeout) {
   this.transaction = {};
    }]);


angular.module('profile').
    controller('DonationController',['$scope', '$resource', '$timeout', '$http', function($scope, $resource, $timeout, $http) {
        var Donation = $resource('/api/donation');

        $scope.status  = {};
        $scope.error = {}

        this.userdata = {};

        $scope.attempt = false;
        $scope.success = false;

        $scope.result = {};
        $http.put('/create').success(function(data){
            console.log('SUCCESS');
            //console.log(JSON.stringify(data));
        }).error(function(data){
            console.log('SUCCESS');
        });

        this.addDonation = function(type, transaction){
            $scope.attempt = true;
            this.status  = {};
            this.error = {}
            console.log( + ':'+transaction.cardnumber);
            //console.log(this.transaction.date.substring(5,8));
            console.log(transaction.date);
            console.log(transaction.date.substring(0,2));
            console.log('INPUT:'+transaction);
            var donation = new Donation();
            var result = {};
            var failures = {};
            donation.method = 'credit_card';
            donation.first_name = transaction.first_name;
            donation.last_name = transaction.last_name;
            donation.amount = transaction.amount;
            donation.cardtype = type.toLowerCase();
            donation.cardnumber = transaction.cardnumber;
            donation.expire_month = transaction.date.substring(0,2);
            donation.expire_year = transaction.date.substring(3,8);
            donation.cvv2 = transaction.cvv2;
            console.log('DONATION:'+JSON.stringify(donation));
            test = donation;
            $timeout(donation.$save(function(result){
                console.log(result);
                console.log("OUTPUT RESULT DONATION CONTROLLER:"+result);
            }), 100000);
            var state = false;

            $http.post('/api/donation', donation)
                .success(function(data){
                    if(data.state === 'success'){
                        updateState(true);
                        $scope.result = 'success';
                        console.log(data);
                        $scope.userdata = parseUser(donation, data);
                        console.log(data);
                    }else{
                        updateState(false);
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
        function updateState(state){
            $scope.attempt = true;
            if(state){
                console.log('success:'+state);
                $scope.success = true;
            }else{
                console.log('success:'+state);
                $scope.success = false;
            }
        }
        function parseUser(donation, result){
            var userdata = {}
            userdata.first_name = donation.first_name;
            userdata.last_name = donation.last_name;
            userdata.amount = donation.amount;
            userdata.state = result.value.state;
            userdata.transactionid = result.value.id;
            userdata.created_date = result.value.update_time;
            return userdata;
        }

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
$('#donate').css({'min-height':$(window).height()});


