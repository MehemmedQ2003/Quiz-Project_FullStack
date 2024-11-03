from rest_framework import serializers
from .models import *

class SurahSerializer(serializers.ModelSerializer):
    class Meta:
        model = Surah
        fields = ['id', 'name', 'number', 'ayah_count']
        

class AyahSerializer(serializers.ModelSerializer):
    surah_name = serializers.SerializerMethodField()
    surah_number = serializers.SerializerMethodField()
    
    class Meta:
        model = Ayah
        fields = ['id', 'number', 'arabic_text', 'translation', 'surah_number' ,'surah_name']
        
    def get_surah_name(self, obj):
        return obj.surah.name
    
    def get_surah_number(self, obj):
        return obj.surah.number
    

class EsmaulHusnaSerializer(serializers.ModelSerializer):
    class Meta:
        model = EsmaulHusna
        fields = ['id', 'name', 'description', 'dua']