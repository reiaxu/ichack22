from importlib.metadata import metadata
from flask import Flask, session
from flask_restful import reqparse
import requests
from flask_sqlalchemy import SQLAlchemy
import backendFunctions as bf

app = Flask(__name__)

#key from Flask documentation, not secret
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'

parser = reqparse.RequestParser()
parser.add_argument("title")
parser.add_argument("restrictions", action="append")
parser.add_argument("diets", action="append")
parser.add_argument("tags", action="append")

# wipe session
@app.route("/", methods=["DELETE"])
def resetRestrictions():
    session.clear()
    return "ok", 201

# receive additional dietary restrictions
@app.route("/diet/restrictions", methods=["PUT"])
def updateRestrictions():
    args = parser.parse_args()
    newRestrictions = args["restrictions"]

    restrictions = session.get("restrictions", [])

    for newR in newRestrictions:
        restrictions.append(newR)

    session["restrictions"] = restrictions

    return {"ok": newRestrictions}, 201

# return dietary restrictions
@app.route("/diet/restrictions", methods=["GET"])
def showRestrictions():
    return {"restrictions": session.get("restrictions", [])}

# receive additional diet categories
@app.route("/diet", methods=["PUT"])
def updateDiets():
    args = parser.parse_args()
    newDiets = args["diets"]

    diets = session.get("diets", [])

    for newDiet in newDiets:
        diets.append(newDiet)

    session["diets"] = diets

    return {"ok": diets}, 201

# return diets
@app.route("/diet", methods=["GET"])
def showDiets():
    return {"diets": session.get("diets", [])}

# receive picture metadata and pass to Aadi
@app.route("/meta", methods=["PUT"])
def passOnMetadata():
    args = parser.parse_args()
    lat = args["lat"]
    lng = args["lng"]

    AadiURL = "http://172.31.26.187:5000"
    tags = requests.get(url=AadiURL, params={"lat":lat,"lng":lng})

    cuisineDict = session.get("cuisine_dict", {})

    for cuisine in tags:
        count = cuisineDict.get(cuisine, 0)
        cuisineDict[cuisine] = count+1 

    session["cuisine_dict"] = cuisineDict

    return {"ok": tags } , 201

# test roulette
@app.route("/tags", methods=["GET"])
def playRoulette():
    cuisineDict = session.get("cuisine_dict", {})
    result = bf.cuisineRoulette(cuisineDict, 2)
    
    return {"cuisines": result}


# get a JSON array of recipe summaries to suggest
@app.route("/summaries", methods=["GET"])
def promptSummaries():
    user_restrictions = session.get("restrictions", "")
    user_diets = session.get("diets", "")
    cuisineDict = session.get("cuisine_dict", {})
    user_cuisines = bf.cuisineRoulette(cuisineDict, 3)

    # request from Reia with these paramaters

# get the JSON for a specific recipe, by Id, along with specific prices
@app.route("/recipes", methods=["GET"])
def promptRecipe():
    args = parser.parse_args()
    recipe_id = args["id"]

    # request from Reia with that Id

    # send shopping list to Timothy

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
    app.run(host="0.0.0.0", debug=True)

