from importlib.metadata import metadata
from flask import Flask, session, Response
from flask_restful import reqparse
import requests, ast, json
from flask_sqlalchemy import SQLAlchemy
import backendFunctions as bf
from http import HTTPStatus

app = Flask(__name__)

#key from Flask documentation, not secret
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'

parser = reqparse.RequestParser()
parser.add_argument("title")
parser.add_argument("restrictions", action="append")
parser.add_argument("diets", action="append")
parser.add_argument("tags", action="append")
parser.add_argument("lat")
parser.add_argument("lng")

# wipe session
@app.route("/", methods=["DELETE"])
def resetRestrictions():
    session.clear()
    return Response("ok", HTTPStatus.CREATED, mimetype="text/plain")

# receive additional dietary restrictions
@app.route("/diet/restrictions", methods=["PUT"])
def updateRestrictions():
    args = parser.parse_args()
    newRestrictions = args["restrictions"]

    restrictions = session.get("restrictions", [])

    for newR in newRestrictions:
        restrictions.append(newR)

    session["restrictions"] = restrictions

    resp = '{"restrictions": {}'.format(newRestrictions)
    return Response(resp, status=HTTPStatus.CREATED, mimetype="application/json")

# return dietary restrictions
@app.route("/diet/restrictions", methods=["GET"])
def showRestrictions():
    resp = session.get("restrictions", [])
    return Response(resp, status=HTTPStatus.OK, mimetype="application/json")

# receive additional diet categories
@app.route("/diet", methods=["PUT"])
def updateDiets():
    args = parser.parse_args()
    newDiets = args["diets"]

    diets = session.get("diets", [])

    for newDiet in newDiets:
        diets.append(newDiet)

    session["diets"] = diets

    resp = '{"diets": {}}'.format(diets)
    return Response(resp, status=HTTPStatus.CREATED, mimetype="application/json")

# return diets
@app.route("/diet", methods=["GET"])
def showDiets():
    diets = session.get("diets", [])
    resp = '{"diets": {}}'.format(diets)
    return Response(resp, status=HTTPStatus.OK, mimetype="application/json")

# receive picture metadata and pass to Aadi
@app.route("/meta", methods=["PUT"])
def passOnMetadata():
    args = parser.parse_args()
    lat = args["lat"]
    lng = args["lng"]

    AadiURL = "http://172.31.26.187:5000"
    tags = requests.get(url=AadiURL, params={"lat":lat,"lng":lng})

    cuisineDict = session.get("cuisine_dict", dict())
    c = json.loads(tags.text.replace("'", "\""))["cuisine"]
    cuisineDict[str(c)] = cuisineDict.get(str(c), 0) + 1
    session["cuisine_dict"] = cuisineDict
    return Response(status=HTTPStatus.OK)

# test roulette
@app.route("/tags", methods=["GET"])
def playRoulette():
    cuisineDict = session.get("cuisine_dict", dict())
    result = bf.cuisineRoulette(cuisineDict, 2)
    # resp = ast.literal_eval((str(result))[2:-1])
    # resp = re.sub('(b")|(")|(\\)', "", result)
    resp = str((result))
    return Response(resp, status=HTTPStatus.OK, mimetype="application/json")


# get a JSON array of recipe summaries to suggest
@app.route("/summaries", methods=["GET"])
def promptSummaries():
    user_restrictions = session.get("restrictions", "")
    user_diets = session.get("diets", list())
    cuisineDict = session.get("cuisine_dict", dict())
    user_cuisines = bf.cuisineRoulette(cuisineDict, 3)
    spoon_url = "http://172.31.26.187:5002"
    spoon_params = '{"user_restrictions": {}, "user_diets": {}, "user_cuisines": {}}'.format(
        user_restrictions, user_diets, user_cuisines
    )
    recipeSummaries = requests.get(spoon_url, params=spoon_params)
    return Response(
        response=str(recipeSummaries),
        status=HTTPStatus.OK,
        mimetype="application/json",
    )
    # request from Reia with these paramaters

# get the JSON for a specific recipe, by Id, along with specific prices
@app.route("/recipes", methods=["GET"])
def promptRecipe():
    args = parser.parse_args()
    recipe_id = args["id"]
    spoon_url = "http://172.31.26.187:5002"
    spoon_params = '{"id": {}}'.format(recipe_id)
    recipe = requests.get(spoon_url, params=spoon_params)
    return Response(
        response=str(recipe),
        status=HTTPStatus.OK,
        mimetype="application/json"
    )
    # request from Reia with that Id

    # send shopping list to Timothy

# receive feedback on a specific recipe
'''
@app.route("/feedback", methods=["PUT"])
def saveFeedback():
    args = parser.parse_args()
    feedback = args["feedback"]
    recipe_id = args["id"]

    if feedback == "good":
        goodlist = session.get("good", [])
        goodlist = goodlist.append(recipe_id)
    else:
        badlist = session.get("bad", []) 
        badlist = badlist.append(recipe_id)
'''

# save nutritional content
'''
@app.route("/feedback", methods=["POST"])
def saveNutrition():
    args = parser.parse_args()
    nutrition = args["nut"]

    weekly_nutrition = session.get("week_nut", {})
    deficiencies = bf.get_deficiencies(weekly_nutrition)
    excesses = bf.get_excesses(weekly_nutrition)
'''


if __name__ == "__main__":  # Run flask app in debug mode from terminal
    app.run(host="0.0.0.0", port=5001, debug=True)

