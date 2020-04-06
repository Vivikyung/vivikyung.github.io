function goBack(url) {
    if (confirm("Are you sure you want to leave? You'll lose all your progress.")) {
        var clear = "true"
        $.ajax({
            type: "POST",
            url: "reset",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(clear),
            success: function(result){
                console.log("Cleared")
            },
            error: function(request, status, error){
                console.log("Error")
                console.log(request)
                console.log(error)
            }
        })
        window.location = url
    }else{
        event.preventDefault()
    }
    return false;
}
$('.fire').tooltip({
    show: {effect:"none", delay:0}
});
$('[data-toggle="tooltip"]').tooltip({title: "meh", placement: "top"});   


$(document).ready(function(){
    $("img.fire") .mouseover(function () {
        $(this).attr("src", "static/images/filled_in_fire.png")
    }).mouseout(function () {
        $(this).attr("src", "static/images/blackfiree.png")
    });
})