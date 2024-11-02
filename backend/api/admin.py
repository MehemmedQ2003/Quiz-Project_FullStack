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