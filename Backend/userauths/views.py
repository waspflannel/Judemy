from django.shortcuts import render
from userauths.models import User,Profile
from rest_framework_simplejwt.views import TokenObtainPairView
from userauths.serializer import MyTokenObtainPairSerializer , RegisterSerializer , UserSerializer
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated , AllowAny
import shortuuid
from rest_framework import status
import random
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

#a view for resetting password
class PasswordResetView(generics.RetrieveAPIView):
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer
    
    def get_object(self):
        email = self.kwargs['email']
        user = User.objects.get(email=email)
        
        if user:
            user.oneTimePassword =generate_one_time_password()
            userPK = user.pk
             # Generate a token and include it in the reset link sent via email

            # Store the reset_token in the user model for later verification
            user.save()

            #create a link that takes us to the front end password reset page
            #with search params of otp and user pk,
            link = f"http://localhost:5173/password-reset?otp={user.oneTimePassword}&uidb64={userPK}"
            print(link)
            
        return user
    
class PasswordChangeView(generics.CreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer
    
    def create(self, request, *args, **kwargs):
        payload = request.data
    
        otp = payload['otp']
        userPK = payload['userPK']
        password = payload['password']
 
        print("otp ======", otp)
        print("userPK ======", userPK)

        print("password ======", password)
 
        user = User.objects.get(oneTimePassword=otp)
        if user:
            user.set_password(password)
            user.oneTimePassword = ""
            user.save()
 
            
            return Response( {"message": "Password Changed Successfully"}, status=status.HTTP_201_CREATED)
        else:
            return Response( {"message": "An Error Occured"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#function for generating an OTP
def generate_one_time_password():
        #get a uuid
        uuidKey = shortuuid.uuid()
        #only take first 6 characters
        uniqueKey = uuidKey[0:6]
        #return it
        return uniqueKey



    
