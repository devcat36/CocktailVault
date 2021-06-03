import json
from backend.models import *

# Import Ingredients
with open('./iba-cocktails/ingredients_images.json') as f:
    ingredients = json.load(f)

for i, ingredient in enumerate(ingredients):
    record = Ingredient(name=ingredient, hasKind=False,
                        kind='', image=ingredients[ingredient]['image'])
    record.save()
    if 'kind' not in ingredients[ingredient]:
        continue
    for i in range(len(ingredients[ingredient]['kind'])):
        record = Ingredient(name=ingredient, hasKind=True,
                            kind=ingredients[ingredient]['kind'][i], image=ingredients[ingredient]['kind_image'][i])
        record.save()


# Import Cocktails
with open('./iba-cocktails/recipe_images.json') as f:
    recipes = json.load(f)

for i, recipe in enumerate(recipes):
    record = Cocktail(
        name=recipe['name'], instructions=recipe['preparation'], image=recipe['image'])
    record.save()
    del record
    # Import Cocktail Ingredients
    for ingredient in recipe['ingredients']:
        print(ingredient['ingredient'])
        if 'label' not in ingredient:
            ingredient_obj = Ingredient.objects.get(
                name=ingredient['ingredient'], hasKind=False)
        else:
            ingredient_obj = Ingredient.objects.get(
                name=ingredient['ingredient'], kind=ingredient['label'])
        record = CocktailIngredient(cocktail=Cocktail.objects.get(
            name=recipe['name']), ingredient=ingredient_obj, amount=str(ingredient['amount'])+' '+ingredient['unit'])
        record.save()
