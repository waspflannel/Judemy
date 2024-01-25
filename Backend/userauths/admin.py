from django.contrib import admin
from userauths.models import Profile,User
# Register your models here.

class UserAdmin(admin.ModelAdmin):
    list_display = ['username' , 'fullName', 'email' , 'phone']

class ProfileAdmin(admin.ModelAdmin):
    list_display = ['fullName']
admin.site.register(User , UserAdmin)
admin.site.register(Profile , ProfileAdmin)