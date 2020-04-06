var dateheads = ["#date1", "#date2", "#date3", "#date4"]
var dayheads = ["#day1", "#day2", "#day3", "#day4"]
var cols = ["#clothes1", "#clothes2", "#clothes3", "#clothes4"]
var loadfrom = 0

var loadoutfit = function(day, col){
    if(day["accessory"] != ""){
        var row = "<div class='row disp accessory'><img src='" + day["accessory"] + "' width=120px height=80px></div>"
        $(col).append(row)
    }
    if(day["top"] != ""){
        var row = "<div class='row disp top'><img src='" + day["top"] + "' width=180px height=180px></div>"
        $(col).append(row)
    }
    if(day["bottom"] != ""){
        var row = "<div class='row disp bottom'><img src='" + day["bottom"] + "' width=180px height=180px></div>"
        $(col).append(row)
    }
    if(day["shoes"] != ""){
        var row = "<div class='row disp shoes'><img src='" + day["shoes"] + "' width=120px height=80px></div>"
        $(col).append(row)
    }
    if($(col).is(':empty')){
        var row = "<div class='row disp'><h5 class='centered'>No outfit selected!</h5></div>"
        $(col).append(row)
    }
}

var initialEntries = function(outfit){
    for(var i=0; i<4; i++){
        if(i >= outfit.length){
            break
        }
        $(dateheads[i]).text(outfit[i]["date"])
        $(dayheads[i]).text(outfit[i]["day"])
        loadoutfit(outfit[i], cols[[i]])
    }
    loadfrom = 4
}

$(document).ready(function(){
    var outfit = trips[tripname]
    initialEntries(outfit)
    $("#prev").click(function(){
        if(loadfrom > 0){
            console.log(loadfrom)
            for(var c=0;c<4;c++){
                $(dateheads[c]).text("")
                $(dayheads[c]).text("")
                $(cols[c]).empty()
            }
            for(var i=0; i<4; i++){
                if((loadfrom-4+i) >= outfit.length){
                    break
                }
                $(dateheads[i]).text(outfit[(loadfrom-4+i)]["date"])
                $(dayheads[i]).text(outfit[(loadfrom-4+i)]["day"])
                loadoutfit(outfit[(loadfrom-4+i)], cols[[i]])
            }
            loadfrom -= 4
        }
        if(loadfrom < 4){
            loadfrom = 4
        }
    })
    $("#next").click(function(){
        console.log(loadfrom)
        if(loadfrom < outfit.length){
            for(var c=0;c<4;c++){
                $(dateheads[c]).text("")
                $(dayheads[c]).text("")
                $(cols[c]).empty()
            }
            for(var i=0; i<4; i++){
                if((loadfrom+i) >= outfit.length){
                    break
                }
                $(dateheads[i]).text(outfit[loadfrom+i]["date"])
                $(dayheads[i]).text(outfit[loadfrom+i]["day"])
                loadoutfit(outfit[loadfrom+i], cols[[i]])
            }
            loadfrom += 4
        }
        if(loadfrom >= outfit.length){
            if(outfit.length%4 == 0){
                loadfrom = outfit.length-4
            }else{
                loadfrom = outfit.length - (outfit.length%4)
            }
        }    
    })

})