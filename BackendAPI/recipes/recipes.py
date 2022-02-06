import spoonacular as sp
import random
import json

# with open('recipe_input.json', 'r') as f:
#   data = json.load(f)

api = sp.API("50f9a80fe5f249dcac4eb613a159c405")

# multiple cuisines 
# dietary requirements and intolerances
# output: recipe with ingredients
# cuisines = ", ".join(data["cuisines"])
# diet = data["diet"]
# intolerances = ", ".join(data["intolerances"])

def query_recipes(cuisines_param, diet_param, intolerances_param):
    response = api.search_recipes_complex(query = "healthy", cuisine = cuisines_param, diet = diet_param, intolerances = intolerances_param, 
                                        instructionsRequired = True, fillIngredients = True, addRecipeInformation = True, 
                                        addNutritionInformation = True, sort = "random", number = 5)
    data = response.json()    

    five_recipes = []

    for j in range(len(data["results"])):
        instructions = data["results"][j]["analyzedInstructions"][0]["steps"]
        for i in range(len(instructions)):
            steps = dict((key,value) for key, value in instructions[i].items() if key == "number" or "step")

        grocery_list = []
        ingredient_list = []
        ingredients = data["results"][j]["extendedIngredients"]
        for i in range(len(ingredients)):
            grocery_list.append(ingredients[i]["nameClean"])
            ingredient_list.append(ingredients[i]["original"])

        spoonacular_id = data["results"][j]["id"]
        title = data["results"][j]["title"]
        image = data["results"][j]["image"]
        time_required = data["results"][j]["readyInMinutes"]
        servings = data["results"][j]["servings"]

        # nutrition = api.visualize_recipe_nutrition_by_id(id = spoonacular_id)

        recipe = {"no.": j + 1, "sp_id": spoonacular_id, "title": title, "image": image, 
                "time required": time_required, "servings": servings,
                "grocery list": grocery_list, "ingredients": ingredient_list, 
                "method": steps}
        five_recipes.append(recipe)
        
    return five_recipes

# with open('recipe_output.txt', 'w') as json_file:
#   json.dump(five_recipes, json_file, indent = 4, sort_keys = True)



