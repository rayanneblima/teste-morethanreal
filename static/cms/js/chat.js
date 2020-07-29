function changeStatus(_id) {
    $.ajax({
        type: "put",
        contentType: 'application/json',
        data: JSON.stringify({"read": true}),
        url: "/api/chat/message/"+_id+"/",
        success:function(data)
        {
            //console.log("respondida");
        }
    });
}

function ShowLive(_status) {
    $.ajax({
        type: "put",
        contentType: 'application/json',
        data: JSON.stringify({"is_live_active": _status}),
        url: "/api/project/6/",
        success:function(data)
        {
            //console.log("live ");
        }
    });
}

$(document).ready(function() {
    $("#switch-status").change(function() {
        if(this.checked) {
            ShowLive(true);
        }else{
            ShowLive(false);
        }
    });
});