$(document).ready(function() {
       
    /* SIDE MENU TOGGLE */
    $('.aside-push').on("click", function() {
        ($('.aside-push').hasClass('on'))? closeSide() : openSide();

        function closeSide() {
            $('.aside-push').removeClass('on').addClass('off');
            $('aside').css('width', '125px');
            $('main').css('marginLeft', '125px');
        }

        function openSide() {
            $('.aside-push').removeClass('off').addClass('on');
            $('aside').css('width', '224px');
            $('main').css('marginLeft', '224px');
        }
    });

    /* FEEDBACK BUTTON */
    $('.feedback-btn').on("mouseover", function() {
        $('.feedback-btn p').css('visibility', 'visible');
    });

    $('.feedback-btn').on("mouseleave", function() {
        $('.feedback-btn p').css('visibility', 'hidden');
    })

})