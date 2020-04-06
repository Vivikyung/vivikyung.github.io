from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
import collections
from datetime import datetime
from datetime import timedelta  
app = Flask(__name__)

bgs = ["/static/images/sun_icon.png", "/static/images/sun_icon.png", "/static/images/sun_cloudy.png", "/static/images/cloudy.png", "/static/images/sun_cloudy.png", "/static/images/rain.png", "/static/images/thunder.png"]

tripname = ""
outfit = []
trips = {}
currdate = ""

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/professional')
def professional():
    return render_template('professional.html')

@app.route('/hobbies')
def hobbies():
    return render_template('hobbies.html')

@app.route('/connect')
def connect():
    return render_template('connect.html')

@app.route('/full')
def full():
    return render_template('full.html')

@app.route('/reset', methods = ['GET', 'POST'])
def reset():
    global tripname
    global outfit
    global currdate
    tripname = ""
    outfit = []
    currdate = ""
    return jsonify(cleared="true")

@app.route('/makenew', methods = ['GET', 'POST'])
def makenew():
    return render_template('makenew.html', trips=trips)

@app.route('/tripinfo', methods = ['GET', 'POST'])
def saveinfo():
    global tripname
    global outfit
    global currdate
    json_data = request.get_json()
    tripname = json_data["tname"]
    startdate = datetime.strptime(json_data["startdate"], "%m/%d/%Y")
    enddate = datetime.strptime(json_data["enddate"], "%m/%d/%Y")
    currdate = json_data["startdate"]

    d = startdate
    while (d <= enddate):
        newd = {}
        newd["date"] = d.strftime("%m/%d/%Y")
        newd["day"] = weekdays[d.weekday()]
        newd["weather"] = weather[d.weekday()]
        newd["accessory"] = ""
        newd["top"] = ""
        newd["bottom"] = ""
        newd["shoes"] = ""
        outfit.append(newd)
        d = d + timedelta(days=1) 

    print(outfit)

    return jsonify(tripname=tripname)


@app.route('/overview', methods = ['GET', 'POST'])
def overview():
    return render_template('overview.html', outfit=outfit, currdate=currdate)

@app.route('/move_to_outfit', methods = ['GET', 'POST'])
def move_to_outfit():
    global outfit

    json_data = request.get_json()
    date = json_data["date"]
    typec = json_data["typec"]
    image = json_data["image"]

    for d in outfit:
        if(d["date"] == date):
            d[typec] = image

    return jsonify(outfit=outfit)

@app.route('/clear_outfit', methods = ['GET', 'POST'])
def clear_outfit():
    global outfit

    json_data = request.get_json()
    date = json_data["date"]

    for d in outfit:
        if(d["date"] == date):
            d["accessory"] = ""
            d["top"] = ""
            d["bottom"] = ""
            d["shoes"] = ""
    return jsonify(outfit=outfit)

@app.route('/clear_single', methods = ['GET', 'POST'])
def clear_single():
    global outfit

    json_data = request.get_json()
    date = json_data["date"]
    category = json_data["category"]
    print(date)
    print(category)

    for d in outfit:
        if(d["date"] == date):
            d[category] = ""

    return jsonify(outfit=outfit)

@app.route('/currentdate', methods = ['GET', 'POST'])
def currentdate():
    global currdate

    json_data = request.get_json()
    date = json_data["date"]
    currdate = date
    return jsonify(currdate=currdate)

@app.route('/accessories', methods = ['GET', 'POST'])
def accessories():
    return render_template('accessories.html', head=head, neck=neck, outfit=outfit, currdate=currdate)

@app.route('/tops', methods = ['GET', 'POST'])
def tops():
    return render_template('tops.html', outerwear=outerwear, innerwear=innerwear, outfit=outfit, currdate=currdate)

@app.route('/bottoms', methods = ['GET', 'POST'])
def bottoms():
    return render_template('bottoms.html', pants=pants, shorts=shorts, outfit=outfit, currdate=currdate)

@app.route('/shoes', methods = ['GET', 'POST'])
def shoes():
    return render_template('shoes.html', closedtoe=closedtoe, opentoe=opentoe, outfit=outfit, currdate=currdate)

@app.route('/finalize', methods = ['GET', 'POST'])
def finalize():
    global outfit
    print(outfit)
    return render_template('finalize.html', outfit=outfit)

@app.route('/savetrip', methods = ['GET', 'POST'])
def savetrip():
    global tripname
    global outfit
    global trips
    global currdate
    trips[tripname] = outfit

    tripname = ""
    outfit = []
    currdate = ""
    return jsonify(trips=trips)

@app.route('/deletetrip', methods = ['GET', 'POST'])
def deletetrip():
    global trips

    json_data = request.get_json()
    tname = json_data["tripname"]
    del trips[tname]
    
    return jsonify(trips=trips)

@app.route('/calendars', methods = ['GET', 'POST'])
def calendars():
    return render_template('yourcalendars.html', trips=trips)

@app.route('/caloverview/<tripname>')
def caloverview(tripname=None):
    return render_template('caloverview.html', tripname=tripname, trips=trips)

if __name__ == '__main__':
   app.run(debug = True)




