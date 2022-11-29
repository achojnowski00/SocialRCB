from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from .serializers import *

from rest_framework import generics


class NewsList(generics.ListCreateAPIView):
    queryset = News.objects.all()
    serializer_class = NewsSerializer


class ProvinceList(generics.ListCreateAPIView):
    queryset = Province.objects.all()
    serializer_class = ProvinceSerializer


class CategoryList(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer