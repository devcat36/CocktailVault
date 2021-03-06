from django.urls import path

from . import views

urlpatterns = [
    path('api/search_recipes', views.search_recipes),
    path('api/search_recipes_with_possessions', views.search_recipes_with_possessions),
    path('api/get_cocktail', views.get_cocktail),
    path('api/get_cocktail_with_possessions', views.get_cocktail_with_possessions),
    path('api/get_all_ingredients', views.get_all_ingredients),
    path('api/get_inventory', views.get_inventory),
    path('api/get_random_cocktails', views.get_random_cocktails),
    path('api/add_inventory_item', views.add_inventory_item),
    path('api/remove_inventory_item', views.remove_inventory_item)
]