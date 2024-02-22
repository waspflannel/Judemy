from rest_framework import serializers

from store.models import CartItem,Category , Course , Gallery , Cart , CartOrder , CartOrderItem , CourseFaq , Wishlist  ,Review , Notification , Coupon
from vendor.models import Vendor
class CategorySerializer(serializers.ModelSerializer):
    class Meta: 
        model = Category
        fields = "__all__"

class GallerySerializer(serializers.ModelSerializer):
    class Meta: 
        model = Gallery
        fields = "__all__"

class CartSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Cart
        fields = "__all__"

    def __init__(self , *args , **kwargs):
        super(CartSerializer , self).__init__(*args , **kwargs)
        request = self.context.get("request")
        if request and request.method == "POST":
            self.Meta.depth =0
        else:
            self.Meta.depth = 3

class CartItemSerializer(serializers.ModelSerializer):
    class Meta: 
        model = CartItem
        fields = "__all__"

    def __init__(self , *args , **kwargs):
        super(CartItemSerializer , self).__init__(*args , **kwargs)
        request = self.context.get("request")
        if request and request.method == "POST":
            self.Meta.depth =0
        else:
            self.Meta.depth = 3

class CartOrderSerializer(serializers.ModelSerializer):

    class Meta: 
        model = CartOrder
        fields = "__all__"
    
    def __init__(self , *args , **kwargs):
        super(CartOrderSerializer , self).__init__(*args , **kwargs)
        request = self.context.get("request")
        if request and request.method == "POST":
            self.Meta.depth =0
        else:
            self.Meta.depth = 3

class CartOrderItemSerializer(serializers.ModelSerializer):
    class Meta: 
        model = CartOrderItem
        fields = "__all__"
    def __init__(self , *args , **kwargs):
        super(CartOrderItemSerializer , self).__init__(*args , **kwargs)
        request = self.context.get("request")
        if request and request.method == "POST":
            self.Meta.depth =0
        else:
            self.Meta.depth = 3

class CourseFaqSerializer(serializers.ModelSerializer):
    class Meta: 
        model = CourseFaq
        fields = "__all__"
    def __init__(self , *args , **kwargs):
        super(CourseFaqSerializer , self).__init__(*args , **kwargs)
        request = self.context.get("request")
        if request and request.method == "POST":
            self.Meta.depth =0
        else:
            self.Meta.depth = 3

class WishlistSerializer(serializers.ModelSerializer):

    class Meta: 
        model = Wishlist
        fields = "__all__"   
    
    def __init__(self , *args , **kwargs):
        super(WishlistSerializer , self).__init__(*args , **kwargs)
        request = self.context.get("request")
        if request and request.method == "POST":
            self.Meta.depth =0
        else:
            self.Meta.depth = 3

class ReviewSerializer(serializers.ModelSerializer):

    class Meta: 
        model = Review
        fields = "__all__"   

    def __init__(self , *args , **kwargs):
        super(ReviewSerializer , self).__init__(*args , **kwargs)
        request = self.context.get("request")
        if request and request.method == "POST":
            self.Meta.depth =0
        else:
            self.Meta.depth = 3

class NotificationSerializer(serializers.ModelSerializer):

    class Meta: 
        model = Notification
        fields = "__all__"   
    def __init__(self , *args , **kwargs):
        super(NotificationSerializer , self).__init__(*args , **kwargs)
        request = self.context.get("request")
        if request and request.method == "POST":
            self.Meta.depth =0
        else:
            self.Meta.depth = 3

class CouponSerializer(serializers.ModelSerializer):

    class Meta: 
        model = Coupon
        fields = "__all__"   

    def __init__(self , *args , **kwargs):
        super(CouponSerializer , self).__init__(*args , **kwargs)
        request = self.context.get("request")
        if request and request.method == "POST":
            self.Meta.depth =0
        else:
            self.Meta.depth = 3


class CourseSerializer(serializers.ModelSerializer):
    gallery = GallerySerializer(many=True,read_only = True)
    class Meta:
        model = Course
        fields = [
            'pid',
            'title',
            'instructor',
            'image',
            'description',
            'category',
            'price',
            'sale_price',
            'on_sale',
            'featured',
            'views',
            'rating',
            'vendor',
            'slug',
            'date',
            'gallery' ,
            'course_rating' ,
            'rating_count',
            ]
    #when we create an instance of courseSerailizer this runs
    def __init__(self , *args , **kwargs):
        super(CourseSerializer , self).__init__(*args , **kwargs)
        #This line retrieves the request object from the serializer's context
        request = self.context.get("request")
        #This condition checks if there is a request object and if the HTTP method is POST.
        if request and request.method == "POST":
            #When you have a model with relationships (like ForeignKey, OneToOneField, or ManyToManyField), DRF serializes these related objects along with the main object being serialized.
            #However, if those related objects also have their own related objects, DRF can continue serializing them to a certain depth.
            self.Meta.depth =0
            #For example, consider a scenario where you have a Course model that has a ForeignKey relationship with a Teacher model, 
            #and each Teacher has a ForeignKey relationship with a Department model.
            #If you serialize a Course object, by default, DRF will also serialize the related Teacher. 
            #If you set the depth to 2, DRF will additionally serialize the related Department of the Teacher.
        else:
            self.Meta.depth = 3

class VendorSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Vendor
        fields = "__all__"
    def __init__(self , *args , **kwargs):
        super(VendorSerializer , self).__init__(*args , **kwargs)
        request = self.context.get("request")
        if request and request.method == "POST":
            self.Meta.depth =0
        else:
            self.Meta.depth = 3