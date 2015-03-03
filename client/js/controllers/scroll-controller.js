/* Smooth scrolling para anclas */
$(document).on('click','a.smooth', function(e){
    e.preventDefault();
    var $link = $(this);
    var anchor = $link.attr('href');
    $('html, body').stop().animate({
        scrollTop: $(anchor).offset().top
    }, 1000);
});


function scrollToID(id, speed){
    var offSet = 50;
    var targetOffset = $(id).offset().top - offSet;
    var mainNav = $('#main-nav');
    $('html,body').animate({scrollTop:targetOffset}, speed);
    if (mainNav.hasClass("open")) {
        //mainNav.css("height", "1px").removeClass("in").addClass("collapse");
        mainNav.removeClass("open");
    }
}


jQuery(document).ready(function () {
    var scroll_pos = 0;
    var navbar = $('.collapse');
    var button_state = true;
    $('.nav').on('click mousedown mouseup touchstart touchmove', 'a.has_children', function () {
        if ( $(this).next('ul').hasClass('open_t') && !$(this).parents('ul').hasClass('open_t')) {
            $('.open_t').removeClass('open_t');
            return false;
        }
        $('.open_t').not($(this).parents('ul')).removeClass('open_t');
        $(this).next('ul').addClass('open_t');
        return false;
    });
    $(document).on('click', ':not(.has_children, .has_children *)', function() {
        if( $('.open_t').length > 0 ) {
            $('.open_t').removeClass('open_t');
            $('.open_t').parent().removeClass('open');
            return false;
        }
    });


    // hide #back-top first
    $('.profile').hide();
    $("#back-top").hide();
    $('.navbar-brand-center-shrink').hide();

    $('#nav-toggle').on('click', function (event) {
        event.preventDefault();
        $('#main-nav').toggleClass("open");
    });

    $('.scroll-top').on('click', function(event) {
        event.preventDefault();
        $('html, body').animate({scrollTop:0}, 'slow');
    });

    $('.scroll-link').on('click', function(event){
        event.preventDefault();
        var sectionID = $(this).attr("data-id");
        scrollToID('#' + sectionID, 750);
    });


    $('.nav-item').on('click', function(){
        $('.collapse').hide();
    });

    //$('.navbar-toggle').on('click',function(event){
    //    console.log($(this).attr('collapse'));
    //    console.log('event registered');
    //    console.log('scroll current'+$(this).scrollTop());
    //    button_state = scrollToggle(true, scroll_pos);
    //});




    //$(function () {
    //    $(window).scroll(function () {
    //        scroll_pos = $(this).scrollTop();
    //        console.log(scroll_pos+', '+button_state);
    //        if ($(this).scrollTop() > 100) {
    //            toggle_scrollbar(true);
    //            if(button_state === true){
    //                console.log('toggle reset');
    //                button_state = scrollToggle(false, scroll_pos);
    //            }
    //        } else {
    //           toggle_scrollbar(false);
    //            if(button_state === false){
    //                console.log('toggle reset');
    //                button_state = scrollToggle(true, scroll_pos);
    //            }
    //        }
    //    });


    //    // scroll body to 0px on click
    //    $('#back-top a').click(function () {
    //        $('body,html').animate({
    //            scrollTop: 0
    //        }, 500);
    //        return false;
    //    });
    //});

});

// WOW Activate
new WOW().init();

jQuery(document).ready(function() { // makes sure the whole site is loaded
    $('#status').fadeOut(); // will first fade out the loading animation
    $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
    $('body').delay(350).css({'overflow':'visible'});
})


// full-width-checkbox
$("[name='full-width-checkbox']").bootstrapSwitch();




function toggle_scrollbar(state){
    if(state){
        $('.donate-button').css({'padding': '8% 5%'});
        $('#back-top').fadeIn();
        $('.expand').addClass('shrink').removeClass('expand');
        $('.navbar-brand-center').hide();
        $('.navbar-brand-center-shrink').show();
    }else{
        $('.donate-button').css({'padding': '11% 5%'});
        $('#back-top').fadeOut();
        $('.shrink').addClass('expand').removeClass('shrink');
        $('.navbar-brand-center-shrink').hide();
        $('.navbar-brand-center').show();
    }
}