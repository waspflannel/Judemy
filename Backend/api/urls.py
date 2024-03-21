from django.urls import path
from userauths import views as userauthViews
from store import views as storeViews
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('user/login/',userauthViews.LoginView.as_view()),
    path('user/login/refresh/',TokenRefreshView.as_view()),
    path('user/register/', userauthViews.RegisterView.as_view()),
    path('user/password-reset/<email>/', userauthViews.PasswordResetView.as_view()),
    path("user/password-change/", userauthViews.PasswordChangeView.as_view()),

    #store endpoints
    path('category/' , storeViews.CategoryListAPIView.as_view()),
    path('course/' , storeViews.CourseListAPIView.as_view()),
    path('course/<slug>' , storeViews.CourseDetailAPIView.as_view()),
    path('cart-view' , storeViews.CartAPIView.as_view()),
    path('cart-list/<int:user_id>/' , storeViews.CartListView.as_view()),

    path('cart-items/<int:cart_id>/' , storeViews.CartItemListView.as_view()),
    path('cart-delete/<str:cart_id>/<str:course_pid>/<int:user_id>/' , storeViews.CartItemDeleteAPIView.as_view()),
    path('cart-order' , storeViews.CreateOrderAPIView.as_view()),
    path('orders/<str:order_oid>/' , storeViews.CartOrderAPIView.as_view()),
    path('coupon/' , storeViews.CouponAPIView.as_view()),
    path('reviews/<course_pid>' , storeViews.ReviewListAPIView.as_view()),

    #payment endpoints
    path('stripe-checkout/<order_oid>' , storeViews.StripeCheckoutView.as_view()),
    path('payment-success/<str:order_oid>', storeViews.PaymentSuccessView.as_view()),

   
]