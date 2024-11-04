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
        


class QuestionCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionCategory
        fields = ['id', 'name', 'count_questions']
        

class QuestionSerializer(serializers.ModelSerializer):
    correct_answer = serializers.SerializerMethodField()
    category = serializers.SerializerMethodField()

    class Meta:
        model = Question
        fields = [
            'category',
            'question_text',
            'question_img',
            'answer1_text',
            'answer1_img',
            'answer2_text',
            'answer2_img',
            'answer3_text',
            'answer3_img',
            'answer4_text',
            'answer4_img',
            'correct_answer'
        ]

    def get_correct_answer(self, obj):
        answer_mapping = {
            1: 'A',
            2: 'B',
            3: 'C',
            4: 'D',
        }
        return answer_mapping.get(obj.correct_answer, None)
    
    
    def get_category(self, obj):
        return obj.category.name if obj.category else None