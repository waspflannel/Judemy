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
]