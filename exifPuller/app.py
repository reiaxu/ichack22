from http import HTTPStatus
from flask import Flask, Response, request
import re, requests

app = Flask(__name__)
lat_regex = "^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$"
long_regex = "^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$"


# callable endpoint to push exifdata along with user id to database
@app.route("/")
def pushExifData():
    args = request.args.to_dict()
    try:
        dataLat = args["lat"]
        dataLong = args["lng"]
        if not validLatLong(dataLat, dataLong):
            return Response(
                response="Invalid Latitude or Longitude Value",
                status=HTTPStatus.BAD_REQUEST,
                mimetype="text/plain",
            )
        else:
            restaurant = getNode(float(dataLat), float(dataLong))
            if restaurant == None:
                return Response(
                    response="OpenStreetMap likely overloaded, please try again later.",
                    status=HTTPStatus.SERVICE_UNAVAILABLE,
                    mimetype="text/plain",
                )
            cuisine = getCuisine(restaurant)
            responseContent = {"name": restaurant["tags"]["name"], "cuisine": cuisine}
            resp = Response(
                response=str(responseContent),
                status=HTTPStatus.OK,
                mimetype="application/json",
            )
            return resp
    except Exception as e:
        responseContent = str(e)
        return Response(
            response=responseContent,
            status=HTTPStatus.INTERNAL_SERVER_ERROR,
            mimetype="text/plain",
        )


def validLatLong(lat, long) -> bool:
    """Check if provided latitude and longitude are valid."""
    check_lat = re.search(lat_regex, lat)
    check_long = re.search(long_regex, long)
    if check_lat == None or check_long == None:
        return False
    else:
        return True


def getNode(lat, long, radius=0.0001):
    """Get node object from OpenStreetMap, recursively increasing search radius."""
    print("Search Radius:", radius)
    overpass_url = "http://overpass-api.de/api/interpreter"
    overpass_location = "{},{},{},{}".format(
        lat - radius, long - radius, lat + radius, long + radius
    )
    overpass_bar = "node['amenity'='bar']({});".format(overpass_location)
    overpass_cafe = "node['amenity'='cafe']({});".format(overpass_location)
    overpass_fast_food = "node['amenity'='fast_food']({});".format(overpass_location)
    overpass_ice_cream = "node['amenity'='ice_cream']({});".format(overpass_location)
    overpass_pub = "node['amenity'='pub']({});".format(overpass_location)
    overpass_restaurant = "node['amenity'='restaurant']({});".format(overpass_location)
    overpass_query = "[out:json];({}{}{}{}{}{});out;".format(
        overpass_bar,
        overpass_cafe,
        overpass_fast_food,
        overpass_ice_cream,
        overpass_pub,
        overpass_restaurant,
    )
    response = requests.get(overpass_url, params={"data": overpass_query})
    try:
        data = response.json()
    except:
        return None
    else:
        if len(data["elements"]) == 0:
            return getNode(lat, long, radius + 0.00005)
        else:
            return data["elements"][0]


def getCuisine(node):
    """Extract cuisine from OpenStreetMap node object."""
    try:
        cuisine = node["tags"]["cuisine"]
    except:
        cuisine = node["tags"]["amenity"]
    finally:
        return cuisine


if __name__ == "__main__":  # Run flask app in debug mode from terminal
    app.run(debug=True)
