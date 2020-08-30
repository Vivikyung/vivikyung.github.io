from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
import collections
from datetime import datetime
from datetime import timedelta  
app = Flask(__name__)

@app.route('/')
def home():
    return render_template('simple.html')

if __name__ == '__main__':
   app.run(debug = True)




