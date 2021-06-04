from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from django.forms.models import model_to_dict
from rest_framework.exceptions import APIException
from asgiref.sync import sync_to_async
from .models import *


def get_cocktail_ingredients(cocktail):
    return [{
            'ingredient': model_to_dict(cocktail_ingredient.ingredient),
            'amount': cocktail_ingredient.amount
            } for cocktail_ingredient in CocktailIngredient.objects.filter(cocktail=cocktail)]


def create_user(username):
    record = User(username=username)
    record.save()


@api_view(['GET'])
@permission_classes([AllowAny])
def search_recipes(request):
    try:
        term = request.GET['term']
    except:
        raise APIException('Bad Request')
    search_result = Cocktail.objects.filter(name__contains=term)
    response = [{
        **model_to_dict(cocktail),
        'ingredients': get_cocktail_ingredients(cocktail)
    } for cocktail in search_result]
    return JsonResponse(response, safe=False)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_cocktail(request):
    try:
        cocktail_id = request.GET['id']
    except:
        raise APIException('Bad Request')
    try:
        cocktail = Cocktail.objects.get(id=cocktail_id)
    except:
        raise APIException('Resource Not Found')
    response = {
        **model_to_dict(cocktail),
        'ingredients': get_cocktail_ingredients(cocktail)
    }
    return JsonResponse(response)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_ingredients(request):
    ingredients = Ingredient.objects.all()
    response = [model_to_dict(ingredient) for ingredient in ingredients]
    return JsonResponse(response, safe=False)


@sync_to_async
@api_view(['GET'])
def get_inventory(request):
    try:
        username = request._user.username
    except:
        raise APIException()
    if not User.objects.filter(username=username).exists():
        create_user(username)
    inventory = User.objects.get(username=username).inventory
    response = [model_to_dict(ingredient) for ingredient in inventory.all()]
    return JsonResponse(response, safe=False)


@sync_to_async
@api_view(['POST'])
def add_inventory_item(request):
    try:
        username = request._user.username
    except:
        raise APIException()
    if not User.objects.filter(username=username).exists():
        create_user(username)
    try:
        ingredient_id = request.POST['id']
    except:
        raise APIException('Bad Request')
    try:
        ingredient = Ingredient.objects.get(id=ingredient_id)
    except:
        raise APIException('Resource Not Found')
    inventory = User.objects.get(username=username).inventory
    inventory.add(ingredient)
    response = {'result': 'success'}
    return JsonResponse(response)


@sync_to_async
@api_view(['POST'])
def remove_inventory_item(request):
    try:
        username = request._user.username
    except:
        raise APIException()
    try:
        ingredient_id = request.POST['id']
    except:
        raise APIException('Bad Request')
    try:
        ingredient = Ingredient.objects.get(id=ingredient_id)
    except:
        raise APIException('Resource Not Found')
    inventory = User.objects.get(username=username).inventory
    inventory.remove(ingredient)
    response = {'result': 'success'}
    return JsonResponse(response)
