from django.urls import path

from . import views

urlpatterns = [
    path('news/', views.NewsList.as_view(), name='news'),
    path('category/', views.CategoryList.as_view(), name='category'),
    path('province/', views.ProvinceList.as_view(), name='province'),
]