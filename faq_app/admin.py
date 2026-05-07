from django.contrib import admin
from .models  import CategoryFaq , QuestionAnswer


admin.site.register(CategoryFaq)
@admin.register(QuestionAnswer)
class QuestionAnswerAdmin(admin.ModelAdmin):
    '''Admin View for QuestionAnswer'''
    list_display = ['question', 'category']
    ordering = ['category']

