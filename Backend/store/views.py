from django.shortcuts import render
from store.models import Course , Category
from store.serializers import CourseSerializer , CategorySerializer
from rest_framework import generics
from rest_framework.permissions import AllowAny , IsAuthenticated
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