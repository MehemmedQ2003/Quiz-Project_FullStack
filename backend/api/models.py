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
        
        
from django.db import models

class QuestionCategory(models.Model):
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to='category_images/')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Soru Kategorisi'
        verbose_name_plural = 'Soru Kategorileri'

    def count_questions(self):
        return self.questions.count()


class Question(models.Model):
    category = models.ForeignKey(QuestionCategory, on_delete=models.CASCADE, related_name='questions')
    question_text = models.TextField(verbose_name="Sualın mətni", blank=True, null=True)
    question_img = models.ImageField(upload_to='questions/', blank=True, null=True, verbose_name="Sualın Şəkli")
    
    answer1_text = models.CharField(max_length=255, verbose_name="Cavab A", blank=True, null=True)
    answer1_img = models.ImageField(upload_to='answers/', blank=True, null=True, verbose_name="Cavab A'nın Şəkli")
    
    answer2_text = models.CharField(max_length=255, verbose_name="Cavab B", blank=True, null=True)
    answer2_img = models.ImageField(upload_to='answers/', blank=True, null=True, verbose_name="Cavab B'nın Şəkli")
    
    answer3_text = models.CharField(max_length=255, verbose_name="Cavab C", blank=True, null=True)
    answer3_img = models.ImageField(upload_to='answers/', blank=True, null=True, verbose_name="Cavab C'nin Şəkli")
    
    answer4_text = models.CharField(max_length=255, verbose_name="Cavab D", blank=True, null=True)
    answer4_img = models.ImageField(upload_to='answers/', blank=True, null=True, verbose_name="Cavab D'nin Şəkli")

    correct_answer = models.PositiveSmallIntegerField(verbose_name="Düzgün Cavab", blank=True, null=True, choices=[
        ('A', 'A'),
        ('B', 'B'),
        ('C', 'C'),
        ('D', 'D'),
    ])

    def __str__(self):
        return f"{self.question_text} ({self.category})"
    
    class Meta:
        verbose_name = "Sual"
        verbose_name_plural = "Suallar"

    def get_correct_answer_with_text(self):
        if self.correct_answer is None:
            return "Düzgün cavab təyin edilməyib"
        
        answer_mapping = {
            1: (self.answer1_text, 'A'),
            2: (self.answer2_text, 'B'),
            3: (self.answer3_text, 'C'),
            4: (self.answer4_text, 'D'),
        }
        
        correct_text, correct_letter = answer_mapping.get(self.correct_answer, ("", ""))
        return f"{correct_letter}) {correct_text}" if correct_text else "Düzgün cavab mətn ilə yoxdur"
