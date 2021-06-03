from django.urls import path

from . import views

urlpatterns = [
    path('api/search_recipes', views.search_recipes),
    path('api/get_cocktail', views.get_cocktail),
    path('api/get_all_ingredients', views.get_all_ingredients),
    path('api/private', views.private)
]