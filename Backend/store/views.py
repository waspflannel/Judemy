from django.shortcuts import render , redirect
from userauths.models import User
from store.models import CartItem,Tax ,Category , Course , Gallery , Cart , CartOrder  , CourseFaq , Wishlist  ,Review , Notification , Coupon
from store.serializers import CouponSerializer, CartOrderSerializer,CartItemSerializer,CourseSerializer , CategorySerializer , CartSerializer  
from rest_framework import generics , status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny , IsAuthenticated
from decimal import Decimal
import stripe
stripe.api_key = "sk_test_51OqlmVK5v9Zo4ovxK0UzJRqWPLZj2Qiqeyi932KJwdNjLHU2VH891BQXSLVdHqVhQ3tPsQrwIvrvkaJqHoz5zwz10040jri6AT"
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
                vendor = course.vendor
            )
            cart_item.save()
            tax_rate = 13/100
            tax_rate = self.getTaxRate(country)
            cart.user = user
            cart.country = country
            cart.cart_id = user_id
            cart.sub_total = Decimal(cart.sub_total) + Decimal(cart_item.course.price)
            cart.tax =  Decimal(cart.sub_total) * Decimal(tax_rate)
            cart.total = cart.sub_total + cart.tax

            print(cart.sub_total , cart.tax , cart.total)
            print("hi")
            cart.save()
            return Response({'message' : 'cart updated successfully'},  status = status.HTTP_200_OK)
        #if it doesnt make a new cart
        else:
            cart = Cart()
            tax_rate = 13/100
            tax_rate = self.getTaxRate(country)
            cart.user = user
            cart.country = country
            cart.cart_id = user_id
            cart.save()

            cart_item = CartItem.objects.create(
                cart = cart,
                course = course,
                qty =1,
                price = price,
                vendor = course.vendor
            )
            cart.sub_total = Decimal(cart.sub_total) + Decimal(cart_item.price)
            cart_item.save()
            cart.tax =  Decimal(cart.sub_total) * Decimal(tax_rate)
            cart.total = cart.sub_total + cart.tax

            print(cart.sub_total , cart.tax , cart.total)
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
         
class CreateOrderAPIView(generics.CreateAPIView):
    serializer_class = CartOrderSerializer
    queryset = CartOrder.objects.all()
    permission_classes = [AllowAny]
    
    def create(self , request):
        payload = request.data

        full_name = payload['full_name']
        email = payload['email']
        phone_number = payload['phone_number']
        address = payload['address']
        city = payload['city']
        country = payload['country']
        cart_id = payload['cart_id']
        user_id = payload['user_id']

        if user_id !=0:
            user = User.objects.get(id = user_id)

        cart = Cart.objects.get(cart_id = cart_id)
        cart_items = CartItem.objects.filter(cart = cart)
    
        order = CartOrder.objects.create(
            buyer = user,
            full_name = full_name,
            email = email,
            mobile = phone_number,
            address = address,
            city = city,
            country = country,
            tax =cart.tax,
            total = cart.total,
            initial_total = cart.sub_total,
        )
        itemList = []
        vendorList = []
        for item in cart_items:
            itemList.append(item)
            vendorList.append(item.course.vendor)

        order.cart_item.set(itemList)
        order.save()
        return Response({"message":"order created successfully","order id":order.oid})
        
class CartOrderAPIView(generics.RetrieveAPIView):
    lookup_field = 'order_oid'
    serializer_class = CartOrderSerializer
    permission_classes = [AllowAny]
    
    def get_object(self):
        order_oid = self.kwargs['order_oid']
        order = CartOrder.objects.get(oid = order_oid)
        return order

class CouponAPIView(generics.CreateAPIView):
    serializer_class = CouponSerializer
    queryset = Coupon.objects.all()
    permission_classes = [AllowAny]

    def create(self , request):
        payload = request.data
        order_oid = payload['order_oid']
        coupon_code = payload['coupon_code']
        cart_id = payload['cart_id']

        cart = Cart.objects.get(cart_id = cart_id)
        
        order = CartOrder.objects.get(oid = order_oid)
        coupon = Coupon.objects.filter(code = coupon_code).first()
        couponList = []
        if(coupon):
            order_items = CartItem.objects.filter(cart = cart , vendor = coupon.vendor)
            if(order_items):
                for item in order_items:
                    print(item)
                    if not coupon in item.coupon.all():
                        discount = item.course.price * coupon.discount /100
                        #item.price -= discount
                        couponList.append(coupon)
                        item.coupon.set(couponList)
                        order.total -= discount
                        item.save()
                        order.save()
                    else:
                        return Response({"message": "coupon already activated","icon":"warning"} , status = status.HTTP_200_OK)
                return Response({"message": "coupon activated","icon":"success"} , status = status.HTTP_200_OK)
        else:
            return Response({"message": "coupon does not exist","icon":"error"} , status = status.HTTP_200_OK)
                        

class StripeCheckoutView(generics.CreateAPIView):
    serializer_class  = CartOrderSerializer
    permission_classes = [AllowAny,]
    queryset = CartOrder.objects.all()

    def create(self):
        order_oid = self.kwargs['order_oid']
        order = CartOrder.objects.get(oid = order_oid)

        if not order:
            return Response({"message": "order not found"} , status = status.HTTP_404_NOT_FOUND)

        try:
            
            checkout_session = stripe.checkout.Session.create(
                customer_email = order.email,
                payment_method = ['card'],
                line_items = [
                    {
                        'price_data':{
                            'currency':'cad',
                            'product_data':{'name':order.full_name},
                            'unit_amount':int(order.total * 100)
                            },
                        'quantity':1,
                    }
                ],
                mode = 'payment',
                success_url ='http://localhost:5173/payment-success/' + order.oid + '?session_id={CHECKOUT_SESSION_ID}',
                cancel_url = 'http://localhost:5173/payment-failed/?session_id={CHECKOUT_SESSION_ID}'
            )

            order.stripe_session_id = checkout_session.id
            order.save()

            return redirect(checkout_session.url)
        except stripe.error.StripeError as e:
            return Response({"error" : f"something went wrong with stripe{str(e)}"})

        




