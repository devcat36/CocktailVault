from django.http import JsonResponse, response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from django.forms.models import model_to_dict
from rest_framework.exceptions import APIException
from django.core.paginator import Paginator
from django.db.models import Value
from django.db.models.functions import StrIndex
import random
from .models import *


def get_cocktail_ingredients(cocktail):
    return [{
            'ingredient': model_to_dict(cocktail_ingredient.ingredient),
            'amount': cocktail_ingredient.amount
            } for cocktail_ingredient in CocktailIngredient.objects.filter(cocktail=cocktail)]


def create_user(username):
    record = User(username=username)
    record.save()


def get_possessions(cocktail_ingredients, inventory):
    possessed = cocktail_ingredients.filter(ingredient__in=inventory)
    not_posssessed = cocktail_ingredients.difference(possessed)
    return {
        'possessed': [cocktail_ingredient.ingredient.id for cocktail_ingredient in possessed],
        'not_possessed': [cocktail_ingredient.ingredient.id for cocktail_ingredient in not_posssessed]
    }


@api_view(['GET'])
@permission_classes([AllowAny])
def search_recipes(request):
    items_per_page = 20
    try:
        term = request.GET['term']
        page = int(request.GET['page'])
    except:
        raise APIException('Bad Request')
    if term == '':
        search_result = Cocktail.objects.all().order_by('name')
    else:
        search_result = Cocktail.objects.filter(name__contains=term).annotate(
            search_index=StrIndex('name', Value(term))).order_by('search_index')
    paginated_results = Paginator(search_result, items_per_page)
    if not 1 <= page <= paginated_results.num_pages:
        return JsonResponse('Page Out of Range', safe=False)
    requested_page = paginated_results.page(page).object_list
    response = [{
        **model_to_dict(cocktail),
        'cocktailIngredients': get_cocktail_ingredients(cocktail)
    } for cocktail in requested_page]
    return JsonResponse(response, safe=False)


@api_view(['GET'])
def search_recipes_with_possessions(request):
    items_per_page = 20
    try:
        term = request.GET['term']
        page = int(request.GET['page'])
    except:
        raise APIException('Bad Request')
    try:
        username = request._user.username
    except:
        raise APIException()
    if not User.objects.filter(username=username).exists():
        create_user(username)

    if term == '':
        search_result = Cocktail.objects.all().order_by('name')
    else:
        search_result = Cocktail.objects.filter(name__contains=term).annotate(
            search_index=StrIndex('name', Value(term))).order_by('search_index')

    inventory = User.objects.get(username=username).inventory.all()

    search_result_list = []
    for cocktail in search_result:
        cocktail_ingredients = CocktailIngredient.objects.filter(
            cocktail=cocktail)
        search_result_list.append({
            **model_to_dict(cocktail),
            'cocktailIngredients': [{
                'ingredient': model_to_dict(cocktail_ingredient.ingredient),
                'amount': cocktail_ingredient.amount
            } for cocktail_ingredient in cocktail_ingredients],
            **get_possessions(cocktail_ingredients, inventory)
        })
    if(term == ''):
        search_result_list = sorted(
            search_result_list, key=lambda cocktail: len(cocktail['not_possessed']))

    paginated_results = Paginator(search_result_list, items_per_page)
    if not 1 <= page <= paginated_results.num_pages:
        return JsonResponse('Page Out of Range', safe=False)
    response = paginated_results.page(page).object_list
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
        'cocktailIngredients': get_cocktail_ingredients(cocktail),
    }
    return JsonResponse(response)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_cocktail_with_possessions(request):
    try:
        cocktail_id = request.GET['id']
    except:
        raise APIException('Bad Request')
    try:
        cocktail = Cocktail.objects.get(id=cocktail_id)
    except:
        raise APIException('Resource Not Found')
    try:
        username = request._user.username
    except:
        raise APIException()
    if not User.objects.filter(username=username).exists():
        create_user(username)
    cocktail_ingredients = CocktailIngredient.objects.filter(cocktail=cocktail)
    inventory = User.objects.get(username=username).inventory.all()
    response = {
        **model_to_dict(cocktail),
        'cocktailIngredients': [{
            'ingredient': model_to_dict(cocktail_ingredient.ingredient),
            'amount': cocktail_ingredient.amount
        } for cocktail_ingredient in cocktail_ingredients],
        **get_possessions(cocktail_ingredients, inventory)
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


@api_view(['GET'])
@permission_classes([AllowAny])
def get_random_cocktails(request):
    default_amount = 4
    max_amount = 10
    try:
        if 'amount' in request.GET:
            amount = int(request.GET['amount'])
        else:
            amount = default_amount
    except:
        raise APIException()    
    if not 0 < amount <= max_amount:
        raise APIException('Amount Out of Range')
    cocktails = list(Cocktail.objects.all())
    selected = random.sample(cocktails, amount)
    response = [model_to_dict(cocktail) for cocktail in selected]
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
