from django.shortcuts import render
from userauths.models import User,Profile
from rest_framework_simplejwt.views import TokenObtainPairView
from userauths.serializer import MyTokenObtainPairSerializer , RegisterSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated , AllowAny
# Create your views here.


#calling this view, once signed in with valid credentials
#makes a jwt token in the form of access and refresh codes that contain the users data
# The 'access' token is used for authentication in subsequent requests, while the 'refresh' token can be used to generate a new 'access' token.
class LoginView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer#calls get_token
    

class RegisterView(generics.CreateAPIView):
    allUsers = User.objects.all()
    permission_classes = (AllowAny, )
    serializer_class = RegisterSerializer

