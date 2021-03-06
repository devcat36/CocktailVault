from django.db import models


class Ingredient(models.Model):
    name = models.CharField(max_length=50)
    hasKind = models.BooleanField(default=False)
    kind = models.CharField(max_length=50, blank=True)
    image = models.URLField(max_length=200)


class CocktailIngredient(models.Model):
    cocktail = models.ForeignKey('Cocktail', on_delete=models.CASCADE)
    ingredient = models.ForeignKey('Ingredient', on_delete=models.CASCADE)
    amount = models.CharField(max_length=50, blank=True)


class Cocktail(models.Model):
    name = models.CharField(max_length=50)
    instructions = models.TextField()
    image = models.URLField(max_length=200)


class User(models.Model):
    username = models.CharField(max_length=640)
    inventory = models.ManyToManyField('Ingredient', blank=True)
