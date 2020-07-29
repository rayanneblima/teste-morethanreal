var csrftoken = Cookies.get('csrftoken');

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});

$("#switch-status").on('click', function() {
    $.ajax({
        type: "PUT",
        url: '/api/project/' + proj_id + '/',
        data: {
            active: $("#switch-status").is(":checked"),
            built_slots: true,
        },
        success: function (data) {
            console.log("Updated to state: " + data.active);
        },
        error: function(xhr, status, result) {
            console.log("Something went wrong! " + xhr.responseJSON.detail )
        }
    })
})