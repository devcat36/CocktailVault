from django.core import paginator
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from django.forms.models import model_to_dict
from rest_framework.exceptions import APIException
from django.core.paginator import Paginator
from django.db.models import Value
from django.db.models.functions import StrIndex
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
        page = request.GET['page']
    except:
        raise APIException('Bad Request')
    items_per_page = 20
    if term == '':
        search_result = Cocktail.objects.all().order_by('name')
    else:
        search_result = Cocktail.objects.filter(name__contains=term).annotate(
            search_index=StrIndex('name', Value(term))).order_by('search_index')
    paginated_results = Paginator(search_result, items_per_page)
    requested_page = paginated_results.page(page).object_list
    response = [{
        **model_to_dict(cocktail),
        'cocktailIngredients': get_cocktail_ingredients(cocktail)
    } for cocktail in requested_page]
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
        'cocktailIngredients': get_cocktail_ingredients(cocktail)
    }
    return JsonResponse(response)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_ingredients(request):
    ingredients = Ingredient.objects.all()
    response = [model_to_dict(ingredient) for ingredient in ingredients]
    return JsonResponse(response, safe=False)


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
