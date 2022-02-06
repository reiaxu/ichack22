from importlib.metadata import metadata
from flask import Flask, session, Response
from flask_restful import reqparse
import requests, ast, json
from flask_sqlalchemy import SQLAlchemy
import backendFunctions as bf
from http import HTTPStatus
import recipes.recipes as rcp
from flask_cors import CORS, cross_origin
import json

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['CORS_SUPPORTS_CREDENTIALS'] = True

#key from Flask documentation, not secret
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'

parser = reqparse.RequestParser()
parser.add_argument("title")
parser.add_argument("restrictions", action="append")
parser.add_argument("diets", action="append")
parser.add_argument("tags", action="append")
parser.add_argument("lat")
parser.add_argument("lng")
parser.add_argument("grocery list", action="append")

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
def show_diets():
    diets = session.get("diets", [])
    resp = '{"diets": {}}'.format(diets)
    return Response(resp, status=HTTPStatus.OK, mimetype="application/json")

# receive picture metadata and pass to Aadi
@app.route("/meta", methods=["PUT"])
@cross_origin()
def passOnMetadata():
    args = parser.parse_args()
    lat = args["lat"]
    lng = args["lng"]
    print(lat, lng)

    #AadiURL = "http://172.31.26.187:5000"
    AadiURL = "https://exif.ichack.8bitsqu.id"
    tags = requests.get(url=AadiURL, params={"lat":lat,"lng":lng})

    cuisineDict = session.get("cuisine_dict", dict())
    c = json.loads(tags.text.replace("'", "\""))["cuisine"]
    cuisineDict[str(c)] = cuisineDict.get(str(c), 0) + 1
    session["cuisine_dict"] = cuisineDict
    return Response("ok", status=HTTPStatus.OK, mimetype="text/plain")

# test roulette
@app.route("/tags", methods=["GET"])
def play_roulette():
    cuisineDict = session.get("cuisine_dict", dict())
    result = bf.cuisineRoulette(cuisineDict, 2)
    resp = str((result))
    return Response(resp, status=HTTPStatus.OK, mimetype="application/json")


# get a JSON array of recipe summaries to suggest, along with prices
@app.route("/summaries", methods=["GET"])
def prompt_summaries():
    user_restrictions = session.get("restrictions", "")
    user_diets = session.get("diets", list())
    cuisineDict = session.get("cuisine_dict", dict())
    user_cuisines = bf.cuisineRoulette(cuisineDict, 3)

    cuisines = ", ".join(user_cuisines)
    if len(user_diets) > 0:
        diet = user_diets[0]
    else:
        diet = ""
    restrictions = ", ".join(user_restrictions) 
    recipeSummaries = rcp.query_recipes(cuisines, diet, restrictions)

    # save recipies by id
    recipeDict = dict()
    for recipe in recipeSummaries:
        recipeDict[recipe["sp_id"]] = recipe
    session["recipeDict"] = recipeDict

    d = {"recipes": recipeSummaries}
    resp = json.dumps(d, indent = 4, sort_keys = True)
        

    return Response(
        response=resp,
        status=HTTPStatus.OK,
        mimetype="application/json",
    )

# access saved recipes by ID
@app.route("/recipes", methods=["GET"])
def access_recipe_dict():
    args = parser.parse_args()
    recipeID = args["sp_id"]
    recipe_dict = session.get("recipeDict", dict())
    recipe_wanted = recipe_dict[recipeID]

    d = {"recipe": recipe_wanted}
    resp = json.dumps(d, indent = 4, sort_keys = True)

    return Response(
        response=resp,
        status=HTTPStatus.OK,
        mimetype="application/json",
    )

# get the price data for a specific grocery list
@app.route("/price", methods=["GET"])
def prompt_recipe():
    args = parser.parse_args()
    grocery_list = args["grocery list"]

    grocery_url = "http://146.169.190.40:4000"
    print("1")
    glist = json.dumps({"name": grocery_list})
    print("2")
    total = requests.get(url=grocery_url, params=glist)
    print("3")

    d = {"total": total}
    resp = json.dumps(d)

    return Response(
        response=resp,
        status=HTTPStatus.OK,
        mimetype="application/json"
    )

# receive feedback on a specific recipe
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

# retrieve liked recipes
@app.route("/feedback", methods=["GET"])
def retrieveGood():
    good_recipes = session.get("good", list())

    resp = json.dumps({"good":good_recipes})

    return Response(
        response=resp,
        status=HTTPStatus.OK,
        mimetype="application/json"
    )

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


    


