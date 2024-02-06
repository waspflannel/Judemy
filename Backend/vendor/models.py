from django.db import models
from django.utils.text import slugify
from userauths.models import User
# Create your models here.

class Vendor(models.Model):
    user = models.OneToOneField(User , on_delete=models.CASCADE)
    image = models.FileField(upload_to="vendor",blank = True , null = True, default ="vendor.jpg")
    name = models.CharField(max_length=100 , help_text="Courses Name" , null= True , blank= True)
    description = models.TextField(null= True , blank= True)
    active = models.BooleanField(default= False)
    slug = models.SlugField(unique= True , max_length=500)



    
    def __str__(self) -> str:
        return str(self.name)

    def save(self,*args , **kwargs):
        if(self.slug == "" or self.slug == None):
            self.slug = slugify(self.name)

        super(Vendor , self).save(*args , **kwargs)
        
