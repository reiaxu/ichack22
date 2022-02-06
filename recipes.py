import spoonacular as sp
import random
import json

with open('recipe_input.json', 'r') as f:
  data = json.load(f)

api = sp.API("2b86002659a7476bb0cf51f105df3682")

# multiple cuisines 
# dietary requirements and intolerances
# output: recipe with ingredients
cuisines = ", ".join(data["cuisines"])
diet = data["diet"]
intolerances = ", ".join(data["intolerances"])

response = api.search_recipes_complex(query = "", cuisine = cuisines, diet = diet, intolerances = intolerances, 
                                      instructionsRequired = True, fillIngredients = True, addRecipeInformation = True, 
                                      addNutritionInformation = True, sort = "random", number = 1)
data = response.json()

instructions = data["results"][0]["analyzedInstructions"][0]["steps"]
for i in range(len(instructions)):
    del instructions[i]["ingredients"]
    del instructions[i]["equipment"]

grocery_list = []
ingredient_list = []
ingredients = data["results"][0]["extendedIngredients"]
for i in range(len(ingredients)):
    grocery_list.append(ingredients[i]["nameClean"])
    ingredient_list.append(ingredients[i]["original"])

recipe = {"grocery list": grocery_list, "ingredients": ingredient_list, "method": instructions}

with open('recipe_output.txt', 'w') as json_file:
  json.dump(recipe, json_file, indent = 4, sort_keys = True)


# 5 recipes
# filter by healthscore

