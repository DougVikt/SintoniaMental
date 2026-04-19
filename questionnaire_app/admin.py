from django.contrib import admin
from .models import QuestionsTest

@admin.register(QuestionsTest)
class AdminQuestions(admin.ModelAdmin):
    list_display = ['id','category','type_user']