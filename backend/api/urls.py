from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'surahs', SurahViewSet)
router.register(r'ayahs', AyahViewSet)
router.register(r'esmaul-husna', EsmaulHusnaViewSet)

urlpatterns = [
    path('', include(router.urls)),
]