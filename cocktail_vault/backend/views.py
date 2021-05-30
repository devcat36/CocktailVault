from django.shortcuts import render
from functools import wraps
import jwt
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
import sys
import requests
import json

def get_userinfo_from_token(token):
    url = 'https://devcat.eu.auth0.com/userinfo'
    headers = {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token}
    return requests.get(url, headers=headers).json()

@api_view(['GET'])
@permission_classes([AllowAny])
def public(request):
    return JsonResponse({'message': 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'})


@api_view(['GET'])
def private(request):
    print(get_userinfo_from_token(request._auth)['email'])
    return JsonResponse({'message': 'Hello from a private endpoint! You need to be authenticated to see this.'})