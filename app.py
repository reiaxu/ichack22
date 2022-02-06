# import main Flask class and request object
from flask import Flask, request
from flask_restful import reqparse
import recipes

# create the Flask app
app = Flask(__name__)

parser = reqparse.RequestParser()
parser.add_argument("cuisines", action = "append")
parser.add_argument("diet")
parser.add_argument("intolerances", action = "append")

# wipe session
@app.route("/", methods = ["DELETE"])
def resetRestrictions():
    session.clear()
    return "ok", 201

@app.route("/return-recipes", methods = ["GET"])
def get_recipes():

    args = parser.parse_args()

    cuisines = ", ".join(args["cuisines"])
    diet = args["diet"]
    intolerances = ", ".join(args["intolerances"])

    json_data = recipes.query_recipes(cuisines, diet, intolerances)
    return json_data

if __name__ == '__main__':
    # run app in debug mode on port 5000
    app.run(debug=True, port=5000)