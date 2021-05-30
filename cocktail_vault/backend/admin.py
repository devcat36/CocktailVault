from django.contrib import admin
from .models import User, Cocktail, CocktailIngredient, Ingredient


admin.site.register(User)
admin.site.register(Cocktail)
admin.site.register(CocktailIngredient)
admin.site.register(Ingredient)
