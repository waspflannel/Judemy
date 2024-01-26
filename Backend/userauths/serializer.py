from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.password_validation import validate_password
from userauths.models import Profile,  User


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    #static method that returns a token with the user fullName , email and username. also vendorID if user is a vendor
    @classmethod
    def get_token(cls,user):
        #call super to get base token stuff
        token = super().get_token(user) 
        #add additional info
        token['fullName'] = user.fullName
        token['email'] = user.email
        token['username'] = user.username

        try:
            token['vendorID'] = User.vendor.id
        except:
            token['vendorID'] =0

        return token

#serialize all user fields
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"

#serialize all profile fields
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'
    
    #this method embeds the user field in profile with the serialized user
    def to_representation(self,instance):
        response = super.to_representation(instance)#returns the dict of profile instance(contains all metadata)
        response['user'] = UserSerializer(instance.user).data#get the user fieldand replace it with the respective users data
        return response


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only =True , required = True , validators = [validate_password])
    password2 = serializers.CharField(write_only =True , required = True)

    class Meta:
        model = User
        fields = ['fullName' , 'email' , 'phone' , 'password','password2']

    #method that checks if passwords match
    #when you register it will run this to check passwords
    def validate(self , attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password" :"passwords do not match"})
        return attrs

    
    def create(self, validatedData):
        user = User.objects.create(
            fullName = validatedData['fullName'],
            email = validatedData['email'],
            phone = validatedData['phone']
        )
        emailUser  , mobile = user.email.split("@")
        user.username = emailUser
        user.set_password(validatedData['password'])
        user.save()
        return user