from django.db import models

class Surah(models.Model):
    name = models.CharField(max_length=255)
    number = models.IntegerField(unique=True)
    ayah_count = models.IntegerField(default=0, null=True, blank=True)

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = 'Sure'
        verbose_name_plural = 'Sureler'
    
class Ayah(models.Model):
    surah = models.ForeignKey(Surah, on_delete=models.CASCADE, related_name='ayahs')
    number = models.IntegerField()
    arabic_text = models.TextField(null=True, blank=True)
    translation = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"{self.surah.name} suresi {self.number} aye"

    class Meta:
        verbose_name = 'Aye'
        verbose_name_plural = 'Ayeler'

class EsmaulHusna(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    dua = models.TextField(null=True, blank=True)
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = 'İsim ve Sıfat'
        verbose_name_plural = 'İsim ve Sıfatlar'