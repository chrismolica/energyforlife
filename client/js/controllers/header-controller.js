
var navbar_state_height = [225, 50];
var navbar = $('.navbar');
var navbar_collapse = $('.navbar-collapse');
var scroll_pos = 0;

var toggleState = false;

angular.module('profile').
    controller('HeaderController',['$scope', '$resource', function($scope, $resource){
        var toggle_button = $('.navbar-toggle');
        $scope.toggle_state = false;
        //$scope.getDatetime = new Date().getMilliseconds();

        this.toggle = function(state){
            //$scope.getDatetime = new Date().getMilliseconds();
            //console.log('toggle_states: scope_state='+ $scope.toggle_state +': toggleState='+toggleState+'DATE:'+ $scope.getDatetime);
            if(scroll_pos < 100){
                $scope.toggle_state = !toggleState;
                toggle_state($scope.toggle_state);
            }else{
                $('html, body').animate({scrollTop: 0}, 'slow');
                toggle_state(true);
                toggleState = true;
                $scope.toggle_state = true;
            }
        }
    }]);

function toggle_state(event_state){
    toggleState = event_state;
    if(event_state){
        navbar.css({'min-height': navbar_state_height[0]});
        navbar_collapse.show();
    }else{
        navbar.css({'min-height': navbar_state_height[1]});
        navbar_collapse.hide();
    }
}

//navbar_collapse.show();

//DETECT SCROLL DIRECTION

var lastScrollTop = 0;
$(window).scroll(function(event){
    var st = $(this).scrollTop();
    if (st > lastScrollTop){
        $(document).trigger('scrollDown');
    } else {
        $(document).trigger('scrollUp');
    }
    lastScrollTop = st;
});
$(document).on('scrollDown', function(){
    toggle_state(false);
});
$(document).on('scrollUp', function() {
    if (scroll_pos > 100) {
        if (!toggleState) {
            toggle_state(false);
        }
    }else{
        toggle_state(false);
    }
});

//$(function () {
//    $(window).scroll(function () {
//        scroll_pos = $(this).scrollTop();
//        if ($(this).scrollTop() > 100) {
//            if(!toggleState){
//                toggle_state(false);
//            }
//        }else{
//            //console.log('TOGGLE STATE:'+toggle_state);
//            if(toggleState){
//                toggle_state(true);
//            }
//        }
//    });
//});

$('.nav-item').on('click', function(){
    toggleState = false;
});

