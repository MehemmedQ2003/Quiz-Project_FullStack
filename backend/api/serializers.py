from rest_framework import serializers
from .models import *

class SurahSerializer(serializers.ModelSerializer):
    class Meta:
        model = Surah
        fields = ['id', 'name', 'number', 'ayah_count']
        

class AyahSerializer(serializers.ModelSerializer):
    surah_name = serializers.SerializerMethodField()
    
    class Meta:
        model = Ayah
        fields = ['id', 'number', 'arabic_text', 'translation', 'surah_name']
        
    def get_surah_name(self, obj):
        return obj.surah.name