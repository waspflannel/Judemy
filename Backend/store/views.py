from django.shortcuts import render
from userauths.models import User
from store.models import CartItem,Tax ,Category , Course , Gallery , Cart , CartOrder , CartOrderItem , CourseFaq , Wishlist  ,Review , Notification , Coupon
from store.serializers import CartItemSerializer,CourseSerializer , CategorySerializer , CartSerializer  , CartOrderItemSerializer , CartOrderItemSerializer
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

    def getTaxRate(self, country):
        #get the country tax
        tax = Tax.objects.filter(country = country).first()
        #calculate tax
        if tax:
            return tax.rate/100
        else:
            return 13/100

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
            )
            cart_item.save()
            tax_rate = self.getTaxRate(country)
            cart.user = user
            cart.country = country
            cart.cart_id = user_id
            cart.sub_total = Decimal(cart.sub_total) + Decimal(cart_item.price)
            cart.tax =  Decimal(cart.sub_total) * Decimal(tax_rate)
            cart.total = cart.sub_total + cart.tax
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
                
            )
            cart.sub_total = Decimal(cart.sub_total) + Decimal(cart_item.price)
            cart_item.save()
            cart.tax =  Decimal(cart.sub_total) * Decimal(tax_rate)
            cart.total = cart.sub_total + cart.tax
            cart.save()
            return Response({'message' : 'cart Created successfully'},  status = status.HTTP_201_CREATED)


class CartListView(generics.ListAPIView):
    serializer_class = CartSerializer
    permission_classes = [AllowAny,]
    queryset = Cart.objects.all()

    def get_queryset(self):
        user_id = self.kwargs.get('user_id')

        if(user_id is not None):
            user = User.objects.get(id = user_id)
            queryset = Cart.objects.filter(user = user ,cart_id = user_id )
        
        else:
            return
        
        return queryset

class CartItemListView(generics.ListAPIView):
    serializer_class = CartItemSerializer
    permission_classes = [AllowAny,]
    queryset = CartItem.objects.all()

    def get_queryset(self):
        cart_number = self.kwargs.get('cart_id')
        if cart_number is not None:
            #get cart where cart_id is the number in url
            carts = Cart.objects.get(cart_id = cart_number)
            #get all cart items that are in the cart
            queryset = CartItem.objects.filter(cart=carts) 
            return queryset


class CartItemDeleteAPIView(generics.DestroyAPIView):
    serializer_class = CartItemSerializer
    lookup_field = 'cart'

    def get_object(self):
        cart_id = self.kwargs['cart_id']
        user_id = self.kwargs.get('user_id')
        course_pid = self.kwargs['course_pid']

        if user_id:
            carts = Cart.objects.get(cart_id = cart_id)
            courses = Course.objects.get(pid = course_pid)
            cartItemToDelete = CartItem.objects.get(cart = carts , course = courses)
            carts.sub_total = Decimal(carts.sub_total) - Decimal(courses.price)
            carts.tax = Decimal(carts.tax) - (Decimal(courses.price) * Decimal(0.13))
            carts.total = Decimal(carts.sub_total) + Decimal(carts.tax)
            carts.save()
        else:
            return
        
        return cartItemToDelete
         
