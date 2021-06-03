from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
import requests
from django.forms.models import model_to_dict
from rest_framework.exceptions import APIException
from asgiref.sync import sync_to_async
from .models import *


def get_userinfo_from_token(token):
    url = 'https://devcat.eu.auth0.com/userinfo'
    headers = {'Content-Type': 'application/json',
               'Authorization': 'Bearer ' + token}
    try:
        response = requests.get(url, headers=headers)
    except:
        raise APIException()
    return response.json()


def get_cocktail_ingredients(cocktail):
    return [{
            'ingredient': model_to_dict(cocktail_ingredient.ingredient),
            'amount': cocktail_ingredient.amount
            } for cocktail_ingredient in CocktailIngredient.objects.filter(cocktail=cocktail)]


def create_user(email):
    record = User(email=email)
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
def get_all_ingredients():
    ingredients = Ingredient.objects.all()
    response = [model_to_dict(ingredient) for ingredient in ingredients]
    return JsonResponse(response, safe=False)


@sync_to_async
@api_view(['GET'])
def get_inventory(request):
    token = request._auth
    email = get_userinfo_from_token(token)['email']
    if not User.objects.filter(email=email).exists():
        create_user(email)
    inventory = User.objects.get(email=email).inventory
    response = [model_to_dict(ingredient) for ingredient in inventory.all()]
    print(response)
    return JsonResponse(response, safe=False)


@sync_to_async
@api_view(['POST'])
def add_inventory_item(request):
    token = request._auth
    email = get_userinfo_from_token(token)['email']
    if not User.objects.filter(email=email).exists():
        create_user(email)
    try:
        ingredient_id = request.POST['id']
    except:
        raise APIException('Bad Request')
    try:
        ingredient = Ingredient.objects.get(id=ingredient_id)
    except:
        raise APIException('Resource Not Found')
    inventory = User.objects.get(email=email).inventory
    inventory.add(ingredient)
    response = {'result': 'success'}
    return JsonResponse(response)


@sync_to_async
@api_view(['POST'])
def remove_inventory_item(request):
    token = request._auth
    email = get_userinfo_from_token(token)['email']
    try:
        ingredient_id = request.POST['id']
    except:
        raise APIException('Bad Request')
    try:
        ingredient = Ingredient.objects.get(id=ingredient_id)
    except:
        raise APIException('Resource Not Found')
    inventory = User.objects.get(email=email).inventory
    inventory.remove(ingredient)
    response = {'result': 'success'}
    return JsonResponse(response)
