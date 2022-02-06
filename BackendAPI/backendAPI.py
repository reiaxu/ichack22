from importlib.metadata import metadata
from flask import Flask, session
from flask_restful import reqparse
import json
from flask_sqlalchemy import SQLAlchemy
import backendFunctions as bf

cuisineDict = {}    # probably want to put in session 

app = Flask(__name__)

#key from Flask documentation, not secret
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'

parser = reqparse.RequestParser()
parser.add_argument("title")
parser.add_argument("restrictions", action="append")

# wipe session
@app.route("/diet", methods=["DELETE"])
def resetRestrictions():
    session.clear()
    return "ok", 201

# receive additional dietary restrictions
@app.route("/diet", methods=["POST"])
def updateRestrictions():
    args = parser.parse_args()
    newRestrictions = args["restrictions"]

    restrictions = session.get("restrictions", [])

    for newR in newRestrictions:
        restrictions.append(newR)

    session["restrictions"] = restrictions

    return {"ok": newRestrictions}, 201

# return dietary restrictions
@app.route("/diet", methods=["GET"])
def showRestrictions():
    return {"restrictions": session.get("restrictions", [])}

# receive picture metadata and pass to Aadi
@app.route("/meta", methods=["POST"])
def passOnMetadata():
    args = parser.parse_args()
    meta = args["idk"]

    # pass this shit to Aadi

    return "ok", 201

# receive a list of tags from Aadi and updates dict
@app.route("/tags", methods=["POST"])
def updateCuisines():
    args = parser.parse_args()
    tags = args["tags"]

    for cuisine in tags:
        count = cuisineDict.get(cuisine, 0)
        cuisineDict[cuisine] = count+1 

    return "ok", 201

# get a JSON array of recipe summaries to suggest
@app.route("/summaries", methods=["GET"])
def promptSummaries():
    user_restrictions = session.get("restrictions", "")
    user_cuisines = bf.cuisineRoulette(cuisineDict, 3)

    # request from Reia with these paramaters

# get the JSON for a specific recipe, by Id
@app.route("/recipes", methods=["GET"])
def promptRecipe():
    args = parser.parse_args()
    Id = args["id"]

    # request from Reia with that Id

if __name__ == "__main__":
    app.run()


