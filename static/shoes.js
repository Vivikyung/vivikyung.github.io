var loadoutfit = function(day, col){
    $("#weather").html("<img src='" + day["weather"] + "' height=70px width=70px>")
    if(day["accessory"] != ""){
        var row = "<div class='row disp accessory'><img src='" + day["accessory"] + "' width=180px height=120px></div>"
        $(col).append(row)
    }
    if(day["top"] != ""){
        var row = "<div class='row disp top'><img src='" + day["top"] + "' width=240px height=240px></div>"
        $(col).append(row)
    }
    if(day["bottom"] != ""){
        var row = "<div class='row disp bottom'><img src='" + day["bottom"] + "' width=240px height=240px></div>"
        $(col).append(row)
    }
    if(day["shoes"] != ""){
        var row = "<div class='row disp shoes'><img src='" + day["shoes"] + "' width=180px height=120px></div>"
        $(col).append(row)
    }
}

var initialEntries = function(closedtoe, opentoe, outfit, currdate){
    $.each(closedtoe, function(idx, item){
        var row = "<div class='row clothing shoes'><img src='" + item.image + "' id='" + item.name + "' width=180px height=120px></div>"
        $("#closedtoe").append(row)
    })
    $.each(opentoe, function(idx, item){
        var row = "<div class='row clothing shoes'><img src='" + item.image + "' id='" + item.name + "' width=180px height=120px></div>"
        $("#opentoe").append(row)
    })
    $("#date_header").text(currdate)
    $.each(outfit, function(ix, day){
        if($("#date_header").text() == day["date"]){
            $("#day_header").text(day["day"])
            loadoutfit(day, "#date")
        }
    })
}

function makeLists(outfit){
    $("#date").empty()
    $.each(outfit, function(ix, day){
        if($("#date_header").text() == day["date"]){
            loadoutfit(day, "#date")
        }
    })
    enableDrag()
}

var move_to_outfit = function(date, typec, src){
    var imgdata = {"date":date, "typec":typec, "image":src}
    $.ajax({
        type: "POST",
        url: "move_to_outfit",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(imgdata),
        success: function(result){
            var outfitdata = result["outfit"]
            outfit = outfitdata
            makeLists(outfit)
        },
        error: function(request, status, error){
            console.log("Error")
            console.log(request)
            console.log(error)
        }
    })
}

var clear_outfit = function(date){
    var cleardata = {"date":date}
    $.ajax({
        type: "POST",
        url: "clear_outfit",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(cleardata),
        success: function(result){
            var outfitdata = result["outfit"]
            outfit = outfitdata
            makeLists(outfit)
        },
        error: function(request, status, error){
            console.log("Error")
            console.log(request)
            console.log(error)
        }
    })
}

var clear_single = function(date, cat){
    var cleardata = {"date": date, "category":cat}
    $.ajax({
        type: "POST",
        url: "clear_single",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(cleardata),
        success: function(result){
            var outfitdata = result["outfit"]
            outfit = outfitdata
            makeLists(outfit)
        },
        error: function(request, status, error){
            console.log("Error")
            console.log(request)
            console.log(error)
        }
    })
}

function enableDrag(){
    $(".clothing").hover(
        function(){$(this).addClass("moving")},
        function(){$(this).removeClass("moving")}
    )
    $(".clothing").draggable({ 
        revert: true,
        stack: ".clothing",
        
        start: function(){
            $(".dhead").addClass("droppable")
        },
        stop: function(){
            $(".dhead").removeClass("droppable")
        }
        
    })
}

var currentdate = function(date){
    var datedata = {"date":date}
    $.ajax({
        type: "POST",
        url: "currentdate",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(datedata),
        success: function(result){
            var ddata = result["currdate"]
            dday = ddata
            console.log(dday)
        },
        error: function(request, status, error){
            console.log("Error")
            console.log(request)
            console.log(error)
        }
    })
}

$(document).ready(function(){
    initialEntries(closedtoe, opentoe, outfit, currdate)
    enableDrag()
    $(".dhead").droppable({
        accept: ".clothing",
        classes: {
            "ui-droppable-hover": "readydrop"
        },
        drop: function(event, ui){
            image = ui.draggable.html()
            move_to_outfit($("#date_header").text(), "shoes", $(image).attr('src'))
        }
    })
    $("#date").on("click", ".disp img", function(){
        clear_single($("#date_header").text(), $(this)[0].parentElement.classList[2])
    })
    $("#clearbut").click(function(){
        clear_outfit($("#date_header").text())
    })
    $("#prev").click(function(){
        var newix
        $.each(outfit, function(ix, day){
            if($("#date_header").text() == day["date"]){
                if(ix > 0){
                    newix = ix-1
                }else{
                    newix = 0
                }
            }
        })
        var date = outfit[newix]["date"]
        currentdate(date)
        $("#date_header").text(date)
        $("#day_header").text(outfit[newix]["day"])
        makeLists(outfit)
    })
    $("#next").click(function(){
        var newix
        $.each(outfit, function(ix, day){
            if($("#date_header").text() == day["date"]){
                if(ix < outfit.length-1){
                    newix = ix+1
                }else{
                    newix = ix
                }
            }
        })
        var date = outfit[newix]["date"]
        currentdate(date)
        $("#date_header").text(date)
        $("#day_header").text(outfit[newix]["day"])
        makeLists(outfit)
    })
})