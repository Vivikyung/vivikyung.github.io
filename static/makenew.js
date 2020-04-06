$(function() {
  $( ".calendar" ).datepicker({
        dateFormat: 'mm/dd/yy',
        firstDay: 1
    });
    
    $(document).on('click', '.date-picker .input', function(e){
        var $me = $(this),
                $parent = $me.parents('.date-picker');
        $parent.toggleClass('open');
    });
    
    
    $(".calendar").on("change",function(){
        var $me = $(this),
                $selected = $me.val(),
                $parent = $me.parents('.date-picker');
        $parent.find('.result').children('span').html($selected);
    });
});

var nameTaken = function(trips, tname){
    for (var key in trips){
        if(tname == key){
            return true
        }
    }
    return false
}

var trip = function(tripname, startday, startdate, endday, enddate){
    var tripinfo = {"tname": tripname, "startday": startday, "startdate": startdate, "endday": endday, "enddate": enddate}
    $.ajax({
        type: "POST",
        url: "tripinfo",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(tripinfo),
        success: function(result){
            var tname = result["tripname"]
            console.log(tname)
        },
        error: function(request, status, error){
            console.log("Error")
            console.log(request)
            console.log(error)
        }
    })
}

$(document).ready(function(){
    var initval = $("#tstart").val()
    $("#start").click(function(){
        if($("#tname").val() == ""){
            alert("Please name your trip.")
            $("#tname").focus()
        }else if(nameTaken(trips, $("#tname").val())){
            alert("Name already used for previous trip.")
            $("#tname").val("")
            $("#tname").focus()          
        }else if($("#startdate").text() == ""){
            alert("Please choose a start date.")
            $("#startdate").focus()
        }else if($("#tstart").val() < initval){
            alert("Start date must be after current date")
        }else if($("#enddate").text() == ""){
            alert("Please choose a end date.")
        }else if($("#tstart").val() > $("#tend").val()){
            alert("End date cannot be before start date.")
        }else if($("#tstart").val() == $("#tend").val()){
            alert("Trip cannot last only one day.")
        }else{
            var weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

            var startdate = new Date($(tstart).val());
            console.log(startdate)
            var startday = weekday[startdate.getDay()];
            console.log(startday)
            var enddate = new Date($(tend).val());
            console.log(enddate)
            var endday = weekday[enddate.getDay()];
            console.log(endday)

            trip($("#tname").val(), startday, $(tstart).val(), endday, $(tend).val())

            url = "/overview"
            window.location = url;
        }
    })
})