from django.contrib import admin
from .models import *

@admin.register(Surah)
class SurahAdmin(admin.ModelAdmin):
    list_display = ('name', 'number', 'ayah_count')
    search_fields = ('name',)


@admin.register(Ayah)
class AyahAdmin(admin.ModelAdmin):
    list_filter = ('surah',)
    search_fields = ('surah__name', 'number')
    
@admin.register(EsmaulHusna)
class EsmaulHusnaAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    search_fields = ('name',)
    

@admin.register(QuestionCategory)
class QuestionCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'image', 'count_questions')
    search_fields = ('name',)

    def count_questions(self, obj):
        return obj.count_questions()
    
    count_questions.short_description = 'Soru Sayısı'


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ["question_text", "answer1_text", "answer2_text", "answer3_text", "answer4_text", "correct_answer_display", 'category']
    search_fields = ["question_text"]
    list_filter = ["category"]
    
    def correct_answer_display(self, obj):
        return obj.get_correct_answer_with_text()
    
    correct_answer_display.short_description = "Düzgün Cavab"