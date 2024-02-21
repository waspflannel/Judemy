from django.shortcuts import render
from userauths.models import User
from store.models import CartItem,Tax ,Category , Course , Gallery , Cart , CartOrder , CartOrderItem , CourseFaq , Wishlist  ,Review , Notification , Coupon
from store.serializers import CourseSerializer , CategorySerializer , CartSerializer  , CartOrderItemSerializer , CartOrderItemSerializer
from rest_framework import generics , status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny , IsAuthenticated
from decimal import Decimal
# Create your views here.

class CategoryListAPIView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny, ]

class CourseListAPIView(generics.ListAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [AllowAny,]

class CourseDetailAPIView(generics.RetrieveAPIView):
    serializer_class = CourseSerializer
    permission_classes = [AllowAny,]

    #override get object so it needs slug
    def get_object(self):
        slug = self.kwargs['slug']
        return Course.objects.get(slug=slug)


class CartAPIView(generics.ListCreateAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = [AllowAny,]

    def create(self,request , *args , **kwargs):
        #get payload info
        payload = request.data
        course_id = payload['course_id']
        user_id = payload['user_id']
        #qty = payload['qty']
        price = payload['price']
        country = payload['country']
        cart_id = payload['cart_id']

        course = Course.objects.get(pid=course_id)

        #get user info
        if(user_id != "undefined"):
            user = User.objects.get(id = user_id)
        else:
            user = None
        #get the country tax
        tax = Tax.objects.filter(country = country).first()
        #calculate tax
        if tax:
            tax_rate = tax.rate/100
        else:
            tax_rate = 13/100
        
        #check to see if a cart already exists
        cart = Cart.objects.filter(cart_id = user_id).first()
        courseExists = CartItem.objects.filter(course=course , cart = cart).first()
        #if it does update it
        if(cart):
            if(courseExists):
                return Response({'message' : 'Item Already in cart'},  status = status.HTTP_200_OK)
            cart_item = CartItem.objects.create(
                cart = cart,
                course = course,
                qty =1,
                price = price,
                sub_total = Decimal(price)
            )
            cart_item.save()

            cart.user = user
            cart.tax =  Decimal(cart_item.price) * Decimal(tax_rate)
            cart.country = country
            cart.cart_id = user_id
            cart.total = cart_item.sub_total + cart.tax
            cart.save()
            return Response({'message' : 'cart updated successfully'},  status = status.HTTP_200_OK)
        #if it doesnt make a new cart
        else:
            cart = Cart()
            cart.user = user
            cart.country = country
            cart.cart_id = user_id
            cart.save()

            cart_item = CartItem.objects.create(
                cart = cart,
                course = course,
                qty =1,
                price = price,
                sub_total = Decimal(price)
            )
            cart_item.save()
            cart.tax =  Decimal(cart_item.price) * Decimal(tax_rate)
            cart.total = cart_item.sub_total + cart.tax
            cart.save()
            return Response({'message' : 'cart Created successfully'},  status = status.HTTP_201_CREATED)

