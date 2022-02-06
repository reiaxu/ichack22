from random import randrange


def cuisineRoulette(cuisineDict, n) -> list:
    sortedCuisineDict = dict(sorted(cuisineDict.items(), key=lambda item: item[1]))
    sortedCuisineList = list(sortedCuisineDict.items())
    if len(cuisineDict) < n :
        print("Sorted List", sortedCuisineList)
        return sortedCuisineList
    else:
        selected_keys = list()
        for i in range(n):
            selected_keys.append(sortedCuisineList[i][0])
        print("Selected Keys:", selected_keys)
        return selected_keys


def returnRecipes():
    return [
        {
            "title": "Spaghetti Carbonara",
            "servings": 2,
            "ingredients": [
                "1 lb spaghetti",
                "3.5 oz pancetta",
                "2 Tbsps olive oil",
                "1  egg",
                "0.5 cup parmesan cheese"
            ],
            "instructions": "Bring a large pot of water to a boil and season generously with salt. Add the pasta to the water once boiling and cook until al dente. Reserve 2 cups of cooking water and drain the pasta. "
        },
        {
            "title": "Sbaghetti Barbonara",
            "servings": 2,
            "ingredients": [
                "1 lb sbaghetti",
                "3.5 oz bancetta",
                "2 Tbsps bolive oil",
                "1  ebb",
                "0.5 cup barmesan cheese"
            ],
            "instructions": "B. "
        },
    ]