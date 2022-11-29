from rest_framework import viewsets

from core.user.models import User
from core.user.serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.all()
