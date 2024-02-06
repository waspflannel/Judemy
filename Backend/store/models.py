from django.db import models
from userauths.models import User,Profile
from vendor.models import Vendor
from shortuuid.django_fields import ShortUUIDField
from django.utils.text import slugify
# Create your models here.

class Category(models.Model):
    title = models.CharField(max_length=100)
    active = models.BooleanField(default = True)
    slug = models.SlugField(unique=True)

    def __str__(self) -> str:
        return self.title


class Course(models.Model):
    STATUS = (
            ("draft" , "Draft"),
            ("disabled" , "Disabled"),
            ("in_review" , "In Review"),
            ("published" , "Published"),
            ("on_sale" , "On Sale"),
    )
    pid = ShortUUIDField(unique= True , length = 10 , alphabet = "abcdefg12345")
    title = models.CharField(max_length=100)
    instructor = models.CharField(default="admin" , max_length=20)
    image = models.FileField(upload_to="products" , default="product.jpg" , null= True , blank= True)
    description = models.TextField(null=True , blank= True)
    category = models.ForeignKey(Category , on_delete=models.SET_NULL , null= True , blank=True)
    price = models.DecimalField(decimal_places=2, max_digits=12 , default= 0.00)
    sale_price = models.DecimalField(decimal_places=2, max_digits=12 , default =0.00)
    on_sale = models.BooleanField(default=False)
    featured = models.BooleanField(default=False)
    views = models.PositiveIntegerField(default=0)
    rating = models.PositiveIntegerField(default=-0)
    vendor = models.ForeignKey(Vendor , on_delete= models.CASCADE)
    slug = models.SlugField(unique=True)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.title

    def save(self,*args , **kwargs):
        if(self.slug == "" or self.slug == None):
            self.slug = slugify(self.name)

        super(Course , self).save(*args , **kwargs)
    

class Gallery(models.Model):
    course = models.ForeignKey(Course , on_delete=models.CASCADE)
    image = models.FileField(upload_to="products" , default="product.jpg")
    active = models.BooleanField(default=True)
    date = models.DateTimeField(auto_now_add=True)
    gid = ShortUUIDField(unique = True, length = 10,alphabet = "abcdefg12345")

    def __str__(self) -> str:
        return self.course.title
    

class Cart(models.Model):
    course = models.ForeignKey(Course , on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    qty = models.PositiveIntegerField(default=0)
    price = models.DecimalField(default=0.00 , max_digits=12 , decimal_places=2)
    sub_total = models.DecimalField(default=0.00 , max_digits=12 , decimal_places=2)
    tax = models.DecimalField(default=0.00,max_digits=12,decimal_places=2)
    total = models.DecimalField(default=0.00,max_digits=12,decimal_places=2)
    country = models.CharField(max_length=100 , null= True , blank= True)
    card_id = models.CharField(max_length=1000,null=True , blank=True)
    date = models.DateTimeField(auto_now_add= True)

