from flask import Flask, session
from flask_restful import reqparse
import json
from BackendAPI.backendFunctions import returnRecipes
import backendFunctions

app = Flask(__name__)

#key from Flask documentation, not secret
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'

parser = reqparse.RequestParser()
parser.add_argument("title")

#get a JSON array of recipe objects, return the preferred one
@app.route("/recipe", methods=["GET"])
def promptRecipe():
    args = parser.parse_args()
    return args["title"]

if __name__ == "__main__":
    app.run()