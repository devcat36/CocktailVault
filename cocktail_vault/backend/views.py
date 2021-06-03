from django.shortcuts import render
from functools import wraps
import jwt
from django.http import JsonResponse, response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
import sys
import requests
import json
from django.forms.models import model_to_dict
from rest_framework.views import exception_handler
from rest_framework.exceptions import APIException
from .models import *


def get_userinfo_from_token(token):
    url = 'https://devcat.eu.auth0.com/userinfo'
    headers = {'Content-Type': 'application/json',
               'Authorization': 'Bearer ' + token}
    return requests.get(url, headers=headers).json()


def get_cocktail_ingredients(cocktail):
    return [{
            'ingredient': model_to_dict(cocktail_ingredient.ingredient),
            'amount': cocktail_ingredient.amount
            } for cocktail_ingredient in CocktailIngredient.objects.filter(cocktail=cocktail)]


@api_view(['GET'])
@permission_classes([AllowAny])
def search_recipes(request):
    try:
        term = request.data['term']
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
        cocktail_id = request.data['id']
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


@api_view(['GET'])
def private(request):
    print(get_userinfo_from_token(request._auth)['email'])
    return JsonResponse({'message': 'Hello from a private endpoint! You need to be authenticated to see this.'})
