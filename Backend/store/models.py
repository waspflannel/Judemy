from django.db import models
from userauths.models import User,Profile
from vendor.models import Vendor
from shortuuid.django_fields import ShortUUIDField
from django.utils.text import slugify
from django.dispatch import receiver
from django.db.models.signals import post_save
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

    
    def course_rating(self):
        #get the course rating from review model
        course_rating = Review.objets.filter(course=self).aggregate(avg_rating = models.Avg("rating"))
        return course_rating['avg_rating']

    #when a review is saved it triggers the receiver which triggers the save
    #the save is overrided so it saves a new rating wich calls course_rating() which uses
    #aggregate function to calcualte the average.
    def save(self , *args , **kwargs):
        self.rating = self.course_rating()
        super(Course , self).save(*args,**kwargs)

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
    cart_id = models.CharField(max_length=1000,null=True , blank=True)
    date = models.DateTimeField(auto_now_add= True)

    def __str__(self) -> str:
        return f"{self.cart_id} - {self.course.title}"


class CartOrder(models.Model):
    PAYMENT_STATUS = (
            ("paid" , "Paid"),
            ("pending" , "Pending"),
            ("processing" , "Processing"),
            ("cancelled" , "Cancelled"),
    )
    vendor = models.ManyToManyField(Vendor , blank= True)
    buyer = models.ForeignKey(User , on_delete=models.SET_NULL , null= True ,blank=True)
    tax = models.DecimalField(default=0.00,max_digits=12,decimal_places=2)
    total = models.DecimalField(default=0.00,max_digits=12,decimal_places=2)
    payment_status = models.CharField(choices=PAYMENT_STATUS , max_length= 100 , default="pending")


    #coupons
    initial_total = models.DecimalField(default=0.00 , max_digits=12 , decimal_places=2)
    saved = models.DecimalField(default=0.00 , max_digits=12 , decimal_places=2)

    #user info
    full_name = models.CharField(max_length=100 , null=True , blank= True)
    email = models.CharField(max_length=100 , null=True , blank= True)
    mobile = models.CharField(max_length=100 , null=True , blank= True)

    address = models.CharField(max_length=100 , null=True , blank= True)
    city = models.CharField(max_length=100 , null=True , blank= True)
    province = models.CharField(max_length=100 , null=True , blank= True)

    #order id
    oid = ShortUUIDField(unique= True , length = 10 , alphabet = "abcdefg12345")
    date = models.DateTimeField(auto_now_add= True)

    def __str__(self) -> str:
        return self.oid

class CartOrderItem(models.Model):
    order = models.ForeignKey(CartOrder , on_delete= models.CASCADE)
    vendor = models.ForeignKey(Vendor,on_delete=models.CASCADE)
    course = models.ForeignKey(Course , on_delete=models.CASCADE)
    qty = models.PositiveIntegerField(default=0)
    price = models.DecimalField(default=0.00 , max_digits=12 , decimal_places=2)
    sub_total = models.DecimalField(default=0.00 , max_digits=12 , decimal_places=2)
    tax = models.DecimalField(default=0.00,max_digits=12,decimal_places=2)
    total = models.DecimalField(default=0.00,max_digits=12,decimal_places=2)
    country = models.CharField(max_length=100 , null= True , blank= True)

    #coupons 
    initial_total = models.DecimalField(default=0.00 , max_digits=12 , decimal_places=2)
    saved = models.DecimalField(default=0.00 , max_digits=12 , decimal_places=2)

    oid = ShortUUIDField(unique= True , length = 10 , alphabet = "abcdefg12345")
    date = models.DateTimeField(auto_now_add= True)

    def __str__(self) -> str:
        return self.oid


class CourseFaq(models.Model):
    user = models.ForeignKey(User , on_delete=models.CASCADE)
    course = models.ForeignKey(Course , on_delete= models.CASCADE)
    email = models.EmailField(null=True , blank= True)
    question = models.CharField(max_length= 1000)
    answer = models.TextField(null= True , blank= True)
    active = models.BooleanField(default = False)
    date = models.DateTimeField(auto_now_add= True)

    def __str__(self) -> str:
        return self.question


class Review(models.Model):
    RATING = (
            (1, "1 Star"),
            (2 , "2 Star"),
            (3 , "3 Star"),
            (4 , "4 Star"),
            (5 , "5 Star"),
    )
    user = models.ForeignKey(User , on_delete=models.CASCADE)
    course = models.ForeignKey(Course , on_delete= models.CASCADE)
    review = models.TextField()
    reply = models.TextField(null = True , blank = True)
    rating = models.IntegerField(default = None , choices=RATING)
    active = models.BooleanField(default = False)
    date = models.DateTimeField(auto_now_add= True)

    def __str__(self) -> str:
        return self.course.title

    #when we serialize the review we pass in the profile of the rater
    def profile(self):
        return Profile.objects.get(user = self.user)


#when a a review is posted
@receiver(post_save , sender = Review)
def update_courset_rating(sender,instance,**kwargs):
    #update the course 
    if instance.course:
        instance.course.save()
    
class Wishlist(models.Model):
    user = models.ForeignKey(User , on_delete=models.CASCADE)
    course = models.ForeignKey(Course , on_delete= models.CASCADE)
    date = models.DateTimeField(auto_now_add= True)

    def __str__(self) -> str:
        return self.course.title


class Notification(models.Model):
    user = models.ForeignKey(User , on_delete=models.CASCADE)
    vendor = models.ForeignKey(Vendor , on_delete=models.CASCADE)
    order = models.ForeignKey(CartOrder , on_delete=models.SET_NULL , null = True , blank =True)
    order_item = models.ForeignKey(CartOrderItem , on_delete=models.SET_NULL , null = True , blank =True)
    seen = models.BooleanField(default= False)
    date = models.DateTimeField(auto_now_add= True)

    def __str__(self) -> str:
        if self.order:
            return self.order.oid
        else:
            return f"Notification - {self.pk}"
    
class Coupon(models.Model):
    vendor = models.ForeignKey(Vendor , on_delete=models.CASCADE)
    used_by = models.ManyToManyField(User , blank=True)
    code = models.CharField(max_length=1000)
    discount = models.IntegerField(default=1)
    active = models.BooleanField(default = False)
    date = models.DateTimeField(auto_now_add= True)

    def __str__(self) -> str:
        return self.code
    


