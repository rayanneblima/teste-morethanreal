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
            $('aside').css('width', '225px');
            $('main').css('marginLeft', '225px');
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

    /* CHECK BUTTON - MESSAGES */
    /* NOTE: VARRER O ARRAY DE MENSAGENS E RETORNAR O INDEX DO BOTAO CLICADO!*/
    $('.check-button').on("click", function() {
        if($('.check-button').hasClass('checked-button')) {
            $('.check-button').removeClass('checked-button');
            $('.message-item').removeClass('checked');
        } else {
            $('.check-button').addClass('checked-button');
            $('.message-item').addClass('checked');
        }
    });

    /* FEEDBACK BUTTON */
    $('.feedback-btn').on("mouseover", function() {
        $('.feedback-btn p').css('visibility', 'visible');
    });

    $('.feedback-btn').on("mouseleave", function() {
        $('.feedback-btn p').css('visibility', 'hidden');
    });

    /* TESTANDO ARMAZENAR MENSAGENS */
    const receberMensagens = function () {
        //event.preventDefault();
        $.ajax({
            type: "GET", 
            url: 'https://staging.mtr.center/api/chat/message/',
            contentType: 'application/json',
            dataType: 'json',
            // beforeSend: function() {
            //     console.log("Carregando..."); //Carregando
            // },
            success: function(menssagens){
                menssagens.forEach(menssagem => {
                            
                    
                });
            }

        });

    }
    receberMensagens();

})
