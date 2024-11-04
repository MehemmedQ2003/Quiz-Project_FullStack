from django.shortcuts import render
from rest_framework import viewsets
from .models import *
from .serializers import *
from rest_framework.response import Response

class SurahViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Surah.objects.all()
    serializer_class = SurahSerializer

    def retrieve(self, request, *args, **kwargs):
        surah = self.get_object()
        ayahs = Ayah.objects.filter(surah=surah)
        ayah_serializer = AyahSerializer(ayahs, many=True)
        surah_data = SurahSerializer(surah).data
        surah_data['ayahs'] = ayah_serializer.data
        return Response(surah_data)
    
class AyahViewSet(viewsets.ModelViewSet):
    queryset = Ayah.objects.all()
    serializer_class = AyahSerializer
    
class EsmaulHusnaViewSet(viewsets.ModelViewSet):
    queryset = EsmaulHusna.objects.all()
    serializer_class = EsmaulHusnaSerializer
    
    
class QuestionCategoryViewSet(viewsets.ModelViewSet):
    queryset = QuestionCategory.objects.all()
    serializer_class = QuestionCategorySerializer

    def retrieve(self, request, *args, **kwargs):
        category = self.get_object()
        questions = Question.objects.filter(category=category)
        question_serializer = QuestionCategorySerializer(questions, many=True)
        category_data = QuestionCategorySerializer(category).data
        category_data['questions'] = question_serializer.data
        return Response(category_data)
    

class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer