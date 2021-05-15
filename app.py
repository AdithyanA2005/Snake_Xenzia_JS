from flask import Flask
# from flask import request
from flask import render_template

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html", game=True)


# def index():
#     """
#     Use this index function if you also have a home page
#     Also import the request library from flask 
#     """
#     game = request.args.get("game")
#     print(game)

#     if game == 'Play':
#         return render_template("index.html", game="PLAY")

#     else:
#         return render_template("index.html")

app.run(debug=True, port=3000)