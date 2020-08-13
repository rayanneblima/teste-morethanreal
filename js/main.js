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

    /* SWITCH LIVE */
    $('input:checkbox').on("click", function() {
        if($('input:checkbox').is(':checked')) {
            $('.switch-status').text('Ativado');
            $("input:checkbox").prop('checked', true);
        } else {
            $('.switch-status').text('Desativado')
            $("input:checkbox").prop('checked', false);
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


// saber qual foi clicado https://pt.stackoverflow.com/questions/11365/como-saber-se-um-elemento-foi-clicado-usando-javascript-puro

// esperar popular o container e depois fazer a busca pelo botao (async await)