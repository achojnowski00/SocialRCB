from rest_framework import status
from rest_framework import generics
from rest_framework.response import Response
from django.contrib.auth.models import User
from . import serializers
from rest_framework.permissions import IsAuthenticated


class ChangePasswordView(generics.UpdateAPIView):
    serializer_class = serializers.ChangePasswordSerializer
    model = User
    permission_classes = (IsAuthenticated,)

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            if not self.object.check_password(serializer.data.get("old_password")):
                return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            return Response({
                'message': 'Password updated'
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
