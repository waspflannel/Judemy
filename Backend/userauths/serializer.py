from rest_framework import serializers

from userauths.models import Profile,  User

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
