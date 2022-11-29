from rest_framework import serializers

from core.user.models import User
from news.models import Province


class UserSerializer(serializers.ModelSerializer):
    provinces = serializers.PrimaryKeyRelatedField(queryset=Province.objects.all(), many=True, default="")

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'newsletter', 'provinces', 'is_staff']
