
from random import randrange


def cuisineRoulette(cuisineDict, n):
    if len(cuisineDict) < n :
        return cuisineDict.keys()
    else:

        keys = list(cuisineDict.keys())
        freqs = list(cuisineDict.values())
        freq_sum = sum(freqs)

        selected_keys = []

        for i in range(n):
            roulette = randrange(freq_sum)
            ctr = -1
            cumsum = 0
            while cumsum < roulette:
                ctr += 1
                cumsum += freqs[ctr]
                
            selected_keys.append(keys[ctr-1])   # God has forsaken us

        # temp impl
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