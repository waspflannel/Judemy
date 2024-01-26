from django.urls import path
from userauths import views as userauthViews
from store import views as storeViews

urlpatterns = [
    path('user/login/',userauthViews.LoginView.as_view()),
    path('user/register/', userauthViews.RegisterView.as_view())

]