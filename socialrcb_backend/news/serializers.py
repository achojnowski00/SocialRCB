from rest_framework import fields, serializers

from core.user.serializers import UserSerializer
from .models import *


class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = ['id', 'title', 'shortcut', 'content', 'rso_alarm', 'rso_icon', 'valid_from', 'valid_to', 'repetition', 'longitude', 'latitude', 'water_level_value', 'water_level_warning_status_value',
                  'water_level_alarm_status_value', 'water_level_trend', 'type', 'river_name', 'location_name', 'created_at', 'updated_at', 'province_id', 'province_city', 'category']


class ProvinceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Province
        fields = ['id', 'name', 'slug']


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug']
