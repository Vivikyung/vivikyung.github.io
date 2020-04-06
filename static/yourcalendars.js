var makeEntries = function(trips){
    $("#cals").empty()
    for (var key in trips){
        var outfit = trips[key]
        var start = outfit[0]["date"]
        var end = outfit[outfit.length-1]["date"]
        
        var row = '<div class="row padd"><div class="col-md-6"><button type="button" class="btn btn-block btn-info cal" id="' + key + '"">' + key + '</button></div>\
        <div class="col-md-4"><h5>' + start + ' - ' + end + '</h5></div>\
        <div class="col-md-1"></div>\
        <div class="col-md-1"><button type="button" class="btn btn-block btn-outline-danger delete" id="' + key + '">x</button></div></div>'
        $("#cals").append(row)
    }
}

function deleteItem(tname) {
    if (confirm("Are you sure you want to delete this?")) {
        var det = {"tripname":tname}
        $.ajax({
            type: "POST",
            url: "deletetrip",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(det),
            success: function(result){
                var trips = result["trips"]
                makeEntries(trips)
            },
            error: function(request, status, error){
                console.log("Error")
                console.log(request)
                console.log(error)
            }
        })
    }
    return false;
}

$(document).ready(function(){
    makeEntries(trips)
    $(".delete").click(function(){
        deleteItem($(this).attr('id'))
    })
    $(".cal").click(function(){
        url = "/caloverview/" + $(this).text()
        window.location = url;
    })
})