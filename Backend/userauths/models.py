from django.db import models
from django.contrib.auth.models import AbstractUser
from shortuuid.django_fields import ShortUUIDField
from django.db.models.signals import post_save
# Create your models here.

class User(AbstractUser):
    username = models.CharField(unique = True, max_length=20)
    email = models.EmailField(unique = True)
    fullName = models.CharField(max_length=100 , null= True , blank = True)
    phone = models.CharField(max_length=100 , null=True , blank= True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']


    def __str__(self) -> str:
        return self.email

    def save(self,  *args , **kwargs):
        usernameFromEmail , mobile = self.email.split("@")#jaden@gmail.com --> jaden
        #if user doesnt givea fullname then make the username from email their name
        if(self.fullName == "" or self.fullName == None):
            self.fullName = usernameFromEmail
        #if no username then set username to first part of email
        if(self.username == "" or self.username == None):
            self.username = usernameFromEmail

        super(User,self).save(*args , **kwargs)

class Profile(models.Model):
    #if this profile gets deleted, delete the user with it
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.FileField(upload_to="image",default="default/default-user.jpg",null=True , blank = True)
    fullName = models.CharField(max_length=100 , null= True , blank = True)
    bio = models.TextField(null=True , blank=True)
    pid = ShortUUIDField(unique = True, length = 10 , max_length = 20 , alphabet = "abcdefghik")

    def __str__(self) -> str:
        if self.fullName:
            return str(self.fullName)
        else:
            return str(self.user.fullName)

    def save(self,  *args , **kwargs):
        #if the profile fullname is empty then set it from the user model
        if self.fullName == "" or self.fullName == None:
            self.fullName = self.user.fullName
        
        super(Profile,self).save(*args,**kwargs)


#whenever the user model creates a user it gets sent here from post_save
#this function will create a Profile for the user with instance's information
def CreateUserProfile(sender , instance , created , **kwargs):
    if created:
        Profile.objects.create(user = instance)

#when the user model gets saved , same the corresponding profile aswell
def SaveUserProfile(sender,instance,**kwargs):
    instance.profile.save()#since profile is a 1-1 field it can be referenced

#calls when a user is saved
post_save.connect(CreateUserProfile , sender=User)
post_save.connect(SaveUserProfile, sender=User)
