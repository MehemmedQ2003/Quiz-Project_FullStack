from django.shortcuts import render
from rest_framework import viewsets
from .models import *
from .serializers import *

class SurahViewSet(viewsets.ModelViewSet):
    queryset = Surah.objects.all()
    serializer_class = SurahSerializer
    
class AyahViewSet(viewsets.ModelViewSet):
    queryset = Ayah.objects.all()
    serializer_class = AyahSerializer