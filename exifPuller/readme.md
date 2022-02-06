# EXIF Location -> Cuisine Converter

Python App that responds to HTTP GET request of the format

```http
http://127.0.0.1:5000?lat={latitude}&lng={longitude}
```

and returns a JSON object of the format

```json
{"name": restaurant_name, "cuisine": restaurant_cuisine}
```

using the OpenStreetMap Overpass API
