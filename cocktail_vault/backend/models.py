from django.db import models


class Ingredient(models.Model):
    name = models.CharField(max_length=50)
    hasKind = models.BooleanField(default=False)
    kind = models.CharField(max_length=50, blank=True)
    image = models.ImageField(upload_to='media/ingredients')


class CocktailIngredient(models.Model):
    cocktail = models.ForeignKey('Cocktail', on_delete=models.CASCADE)
    ingredient = models.ForeignKey('Ingredient', on_delete=models.CASCADE)
    amount = models.CharField(max_length=50, blank=True)


class Cocktail(models.Model):
    name = models.CharField(max_length=50)
    instructions = models.TextField()
    image = models.ImageField(upload_to='media/cocktails')


class User(models.Model):
    email = models.CharField(max_length=320)
    inventory = models.ManyToManyField('Ingredient')
